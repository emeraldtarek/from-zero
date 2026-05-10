import Anthropic from "@anthropic-ai/sdk";

type MessageParam = {
  role: "user" | "assistant";
  content: string | Array<unknown>;
};

export const DEFAULT_MODEL =
  process.env.LITHIUM_MODEL ?? "claude-sonnet-4-5-20250929";

export type Provider = "anthropic-api" | "claude-code-sdk";

export function detectProvider(): Provider {
  if (process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY.length > 0) {
    return "anthropic-api";
  }
  return "claude-code-sdk";
}

export function authConfigured(): boolean {
  return !!(
    process.env.ANTHROPIC_API_KEY ||
    process.env.CLAUDE_CODE_OAUTH_TOKEN
  );
}

let _client: Anthropic | null = null;
function getAnthropic(): Anthropic {
  if (_client) return _client;
  _client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
  return _client;
}

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

export type ToolCallEvent = {
  type: "tool_call";
  name: string;
  input: unknown;
  result?: unknown;
};

export type StreamEvent =
  | { type: "delta"; text: string }
  | { type: "tool_call"; name: string; input: unknown; result?: unknown }
  | { type: "done"; full_text: string; provider: Provider; tool_events: ToolCallEvent[] }
  | { type: "error"; message: string };

export type StreamOptions = {
  system: string;
  history: ChatTurn[];
  user_message: string;
  page_context?: { title: string; slug: string; content: string } | null;
  signal?: AbortSignal;
  tools?: AnthropicTool[];
};

export type AnthropicTool = {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
  // For the Claude Agent SDK path: a flat ZodRawShape that defines the tool's
  // arguments. Keeps a single typed source of truth for both call paths.
  zod_shape?: Record<string, unknown>;
  // Server-side handler for the tool. Async, returns serializable result.
  handler: (input: unknown) => Promise<unknown>;
};

const MAX_TOOL_ITERATIONS = 4;

function buildSystemPrompt(opts: StreamOptions): string {
  let system = opts.system;
  if (opts.page_context) {
    system += `\n\n# Current page the learner is reading\n`;
    system += `Title: ${opts.page_context.title}\nSlug: ${opts.page_context.slug}\n\n`;
    system += `Verbatim content (Markdown):\n\n---\n${opts.page_context.content}\n---\n`;
  }
  return system;
}

// -------------------- Anthropic API streaming --------------------

export async function* streamAnthropicAPI(
  opts: StreamOptions,
): AsyncGenerator<StreamEvent, void, void> {
  const client = getAnthropic();
  const system = buildSystemPrompt(opts);
  const messages: MessageParam[] = opts.history.map((t) => ({
    role: t.role,
    content: t.content,
  }));
  messages.push({ role: "user", content: opts.user_message });

  const tools = (opts.tools ?? []).map((t) => ({
    name: t.name,
    description: t.description,
    input_schema: t.input_schema as never,
  }));
  const toolHandlers = new Map(
    (opts.tools ?? []).map((t) => [t.name, t.handler]),
  );

  let full_text = "";
  const tool_events: ToolCallEvent[] = [];

  for (let iteration = 0; iteration < MAX_TOOL_ITERATIONS; iteration++) {
    const stream = client.messages.stream(
      {
        model: DEFAULT_MODEL,
        max_tokens: 4096,
        system,
        messages: messages as never,
        tools: tools.length ? (tools as never) : undefined,
      },
      { signal: opts.signal },
    );

    for await (const ev of stream) {
      if (
        ev.type === "content_block_delta" &&
        "delta" in ev &&
        ev.delta &&
        (ev.delta as { type: string }).type === "text_delta"
      ) {
        const t = (ev.delta as { text: string }).text;
        full_text += t;
        yield { type: "delta", text: t };
      }
    }
    const final = await stream.finalMessage();

    // Append assistant turn (with all blocks) to messages
    messages.push({ role: "assistant", content: final.content as never });

    const toolUses = final.content.filter(
      (b) => (b as { type: string }).type === "tool_use",
    ) as Array<{ type: "tool_use"; id: string; name: string; input: unknown }>;
    if (toolUses.length === 0) {
      yield {
        type: "done",
        full_text,
        provider: "anthropic-api",
        tool_events,
      };
      return;
    }

    const tool_results: { type: "tool_result"; tool_use_id: string; content: string; is_error?: boolean }[] = [];
    for (const tu of toolUses) {
      const handler = toolHandlers.get(tu.name);
      let result_text = "";
      let is_error = false;
      let result: unknown;
      try {
        result = handler ? await handler(tu.input) : { error: "Unknown tool" };
        result_text = JSON.stringify(result);
      } catch (err) {
        is_error = true;
        result = { error: String(err) };
        result_text = JSON.stringify(result);
      }
      tool_events.push({ type: "tool_call", name: tu.name, input: tu.input, result });
      yield { type: "tool_call", name: tu.name, input: tu.input, result };
      tool_results.push({
        type: "tool_result",
        tool_use_id: tu.id,
        content: result_text,
        is_error: is_error || undefined,
      });
    }

    messages.push({ role: "user", content: tool_results as never });
  }

  yield {
    type: "done",
    full_text,
    provider: "anthropic-api",
    tool_events,
  };
}

// -------------------- Claude Agent SDK (Claude Code subscription) --------------------
//
// Uses the SDK's in-process MCP server feature so tool use works on the
// subscription path as well as the direct API path.
// Tools land in Claude as `mcp__lithium__<tool-name>`.

const SDK_SERVER_NAME = "lithium";

type SDKToolBlock = { type: "tool_use"; id: string; name: string; input: unknown };
type SDKToolResultBlock = {
  type: "tool_result";
  tool_use_id: string;
  content: Array<{ type: string; text?: string }> | string;
  is_error?: boolean;
};
type SDKContentBlock =
  | { type: "text"; text: string }
  | SDKToolBlock
  | SDKToolResultBlock
  | { type: string };

export async function* streamClaudeCodeSDK(
  opts: StreamOptions,
): AsyncGenerator<StreamEvent, void, void> {
  let mod: typeof import("@anthropic-ai/claude-agent-sdk");
  try {
    mod = await import("@anthropic-ai/claude-agent-sdk");
  } catch {
    yield {
      type: "error",
      message:
        "Could not load @anthropic-ai/claude-agent-sdk. Install Claude Code locally or set ANTHROPIC_API_KEY.",
    };
    return;
  }
  const { query, tool, createSdkMcpServer } = mod as unknown as {
    query: (args: {
      prompt: string | AsyncIterable<unknown>;
      options?: Record<string, unknown>;
    }) => AsyncIterable<unknown>;
    tool: (
      name: string,
      description: string,
      schema: Record<string, unknown>,
      handler: (args: Record<string, unknown>) => Promise<unknown>,
    ) => unknown;
    createSdkMcpServer: (args: {
      name: string;
      version: string;
      tools: unknown[];
    }) => unknown;
  };

  const system = buildSystemPrompt(opts);

  // Build MCP tools from the AnthropicTool-shaped definitions.
  const tool_events: ToolCallEvent[] = [];
  const sdkTools: unknown[] = [];
  const allowedTools: string[] = [];
  for (const t of opts.tools ?? []) {
    const sdkName = `${t.name}`;
    allowedTools.push(`mcp__${SDK_SERVER_NAME}__${sdkName}`);
    // The SDK's `tool()` helper requires a Zod shape (object literal of Zod
    // schemas, not a wrapped z.object()). Tools without a zod_shape are
    // skipped on this path.
    if (!t.zod_shape) continue;
    sdkTools.push(
      tool(sdkName, t.description, t.zod_shape, async (args) => {
        let result: unknown;
        try {
          result = await t.handler(args);
        } catch (err) {
          result = { error: String(err) };
        }
        return {
          content: [{ type: "text", text: JSON.stringify(result) }],
        };
      }),
    );
  }

  const mcpServer = sdkTools.length
    ? createSdkMcpServer({
        name: SDK_SERVER_NAME,
        version: "1.0.0",
        tools: sdkTools,
      })
    : null;

  // Build a streaming-input async generator that reproduces the conversation
  // history as one preamble user message followed by the new user message.
  // (The SDK does not accept `assistant` turns in input mode; we fold history
  // into a single transcript message so the model still has the context.)
  const transcript = opts.history
    .map((t) => (t.role === "user" ? `User: ${t.content}` : `Assistant: ${t.content}`))
    .join("\n\n");

  const composedUserMessage = transcript
    ? `Previous conversation in this session:\n\n${transcript}\n\n---\n\nNew message:\n${opts.user_message}`
    : opts.user_message;

  async function* messages() {
    yield {
      type: "user" as const,
      message: { role: "user" as const, content: composedUserMessage },
    };
  }

  let full_text = "";
  const pendingToolInputs = new Map<string, { name: string; input: unknown }>();
  let sawAuthError = false;

  try {
    const q = query({
      prompt: messages(),
      options: {
        systemPrompt: system,
        ...(mcpServer
          ? { mcpServers: { [SDK_SERVER_NAME]: mcpServer }, allowedTools }
          : { allowedTools: [] }),
        maxTurns: opts.tools?.length ? 6 : 1,
      },
    });

    for await (const raw of q) {
      const m = raw as {
        type: string;
        message?: { content?: SDKContentBlock[] };
      };
      if (m.type === "assistant" && m.message?.content) {
        let textBlockIdx = 0;
        for (const block of m.message.content) {
          if (block.type === "text") {
            const text = (block as { text: string }).text ?? "";
            if (/Invalid API key|Please run \/login|Not logged in/i.test(text)) {
              sawAuthError = true;
              continue;
            }
            if (!text) continue;
            // Separate consecutive text blocks (which arrive as whole chunks
            // from the SDK rather than streamed tokens) with a paragraph break
            // so the rendered Markdown doesn't run sentences together.
            const sep = full_text && (textBlockIdx > 0 || !full_text.endsWith("\n")) ? "\n\n" : "";
            const out = sep + text;
            full_text += out;
            yield { type: "delta", text: out };
            textBlockIdx++;
          } else if (block.type === "tool_use") {
            const tu = block as SDKToolBlock;
            // Strip the SDK's mcp__lithium__ prefix for nicer UI labels.
            const friendly = tu.name.replace(/^mcp__[^_]+__/, "");
            pendingToolInputs.set(tu.id, { name: friendly, input: tu.input });
          }
        }
      } else if (m.type === "user" && m.message?.content) {
        for (const block of m.message.content) {
          if (block.type === "tool_result") {
            const tr = block as SDKToolResultBlock;
            const pending = pendingToolInputs.get(tr.tool_use_id);
            const name = pending?.name ?? "tool";
            const input = pending?.input ?? {};
            let result: unknown = tr.content;
            if (Array.isArray(tr.content)) {
              const textOut = tr.content
                .map((c) => (c.type === "text" ? c.text ?? "" : ""))
                .join("");
              try {
                result = JSON.parse(textOut);
              } catch {
                result = textOut;
              }
            }
            tool_events.push({ type: "tool_call", name, input, result });
            yield { type: "tool_call", name, input, result };
          }
        }
      }
    }

    if (sawAuthError && !full_text) {
      yield {
        type: "error",
        message:
          "No Claude credentials found. Either (a) set ANTHROPIC_API_KEY in web/.env.local, OR (b) run `claude setup-token` and put CLAUDE_CODE_OAUTH_TOKEN in web/.env.local, then restart `npm run dev`.",
      };
      return;
    }
    yield { type: "done", full_text, provider: "claude-code-sdk", tool_events };
  } catch (err) {
    const msg = String(err);
    if (/exited with code|Invalid API key|Not logged in|process exited/i.test(msg)) {
      yield {
        type: "error",
        message:
          "No Claude credentials found. Either (a) set ANTHROPIC_API_KEY in web/.env.local, OR (b) run `claude setup-token` and put CLAUDE_CODE_OAUTH_TOKEN in web/.env.local, then restart `npm run dev`.",
      };
      return;
    }
    yield { type: "error", message: msg };
  }
}

// -------------------- Public dispatcher --------------------

export async function* streamChat(
  opts: StreamOptions,
): AsyncGenerator<StreamEvent, void, void> {
  const provider = detectProvider();
  if (provider === "anthropic-api") {
    yield* streamAnthropicAPI(opts);
  } else {
    yield* streamClaudeCodeSDK(opts);
  }
}
