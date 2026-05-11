import Anthropic from "@anthropic-ai/sdk";

type MessageParam = {
  role: "user" | "assistant";
  content: string | Array<unknown>;
};

export type ClientAuth = {
  /** sk-ant-api03-… → "api-key"; sk-ant-oat01-… → "oauth". */
  kind: "api-key" | "oauth";
  token: string;
};

export function parseClientAuthHeader(value: string | null | undefined): ClientAuth | null {
  if (!value) return null;
  const t = value.trim();
  if (!t) return null;
  return {
    token: t,
    kind: t.startsWith("sk-ant-oat") ? "oauth" : "api-key",
  };
}

export const DEFAULT_MODEL =
  process.env.LITHIUM_MODEL ?? "claude-sonnet-4-5-20250929";

export type Provider = "anthropic-api" | "claude-code-sdk" | "client-byo";

/**
 * Pick the auth source for this request. Precedence:
 *   1. Browser-provided token (`x-claude-auth` header).
 *   2. Server env (only when LITHIUM_REQUIRE_CLIENT_AUTH != "1").
 *   3. None → caller must surface the "set token in Settings" UX.
 */
export function resolveAuth(client?: ClientAuth | null):
  | { source: "client"; auth: ClientAuth }
  | { source: "server-api-key"; token: string }
  | { source: "server-oauth"; token: string }
  | { source: "none" } {
  if (client) return { source: "client", auth: client };
  const requireClient = process.env.LITHIUM_REQUIRE_CLIENT_AUTH === "1";
  if (requireClient) return { source: "none" };
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (apiKey) return { source: "server-api-key", token: apiKey };
  const oauth = process.env.CLAUDE_CODE_OAUTH_TOKEN;
  if (oauth) return { source: "server-oauth", token: oauth };
  return { source: "none" };
}

export function detectProvider(client?: ClientAuth | null): Provider {
  const r = resolveAuth(client);
  if (r.source === "client") return "client-byo";
  if (r.source === "server-api-key") return "anthropic-api";
  if (r.source === "server-oauth") return "claude-code-sdk";
  return "client-byo";
}

function makeAnthropicClient(
  source: "client" | "server-api-key" | "server-oauth",
  kindOrTokenInfo:
    | { kind: "api-key" | "oauth"; token: string }
    | { token: string },
): Anthropic {
  if (source === "client") {
    const info = kindOrTokenInfo as { kind: "api-key" | "oauth"; token: string };
    if (info.kind === "oauth") {
      return new Anthropic({
        authToken: info.token,
        defaultHeaders: { "anthropic-beta": "oauth-2025-04-20" },
      });
    }
    return new Anthropic({ apiKey: info.token });
  }
  if (source === "server-api-key") {
    return new Anthropic({ apiKey: (kindOrTokenInfo as { token: string }).token });
  }
  // server-oauth
  return new Anthropic({
    authToken: (kindOrTokenInfo as { token: string }).token,
    defaultHeaders: { "anthropic-beta": "oauth-2025-04-20" },
  });
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
  client_auth?: ClientAuth | null;
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
  const r = resolveAuth(opts.client_auth);
  if (r.source === "none") {
    yield {
      type: "error",
      message:
        "No Claude credentials. Open Settings and paste an Anthropic API key (sk-ant-api03-…) or a Claude Code OAuth token (sk-ant-oat01-…) — it's stored in your browser only.",
    };
    return;
  }
  const client =
    r.source === "client"
      ? makeAnthropicClient("client", r.auth)
      : r.source === "server-api-key"
        ? makeAnthropicClient("server-api-key", { token: r.token })
        : makeAnthropicClient("server-oauth", { token: r.token });
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
        max_tokens: 16384,
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

const MAX_AUTO_CONTINUE = 3;
const AUTO_CONTINUE_PROMPT =
  "Your previous response in this same turn was cut off. Below is what the user asked, the tool calls you already made (with their results), and any prose you streamed. Pick up exactly where you left off. Do NOT repeat tool calls you already made; do NOT re-explain things you already said.";

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

  let full_text = "";
  const pendingToolInputs = new Map<string, { name: string; input: unknown }>();
  let sawAuthError = false;

  // Run the same query/streaming loop multiple times if the model gets cut
  // off by the SDK's per-call turn budget (`error_max_turns`) or the model's
  // output-token cap (`max_tokens`). Each continuation feeds back what was
  // already done so the model can resume without repeating itself.
  async function* runOne(
    userMessage: string,
  ): AsyncGenerator<StreamEvent, { stop_reason: string | null }, void> {
    let lastStopReason: string | null = null;
    async function* messages() {
      yield {
        type: "user" as const,
        message: { role: "user" as const, content: userMessage },
      };
    }
    const q = query({
      prompt: messages(),
      options: {
        systemPrompt: system,
        ...(mcpServer
          ? { mcpServers: { [SDK_SERVER_NAME]: mcpServer }, allowedTools }
          : { allowedTools: [] }),
        // The SDK counts each assistant message (text block, tool_use, or
        // tool_result roundtrip) as one "turn". A response that batches 20+
        // tool_use blocks easily hits high turn counts. We bump generously and
        // rely on the auto-continue (below) for anything beyond.
        maxTurns: opts.tools?.length ? 60 : 4,
      },
    });

    for await (const raw of q) {
      const m = raw as {
        type: string;
        message?: { content?: SDKContentBlock[]; stop_reason?: string | null };
      };
      if (m.type === "result") {
        const r = raw as { subtype?: string };
        // The SDK signals truncation via the result subtype: "error_max_turns"
        // when our own maxTurns cap was hit, "error_max_tokens" when the model
        // hit the per-call token budget. Either is a candidate for auto-
        // continuation.
        if (
          r.subtype === "error_max_turns" ||
          r.subtype === "error_max_tokens"
        ) {
          lastStopReason = r.subtype;
        }
      }
      if (m.type === "assistant" && m.message?.content) {
        if (m.message.stop_reason && m.message.stop_reason !== "tool_use") {
          // tool_use is the SDK's natural pause-for-tool-result, not a stop.
          lastStopReason = m.message.stop_reason;
        }
        let textBlockIdx = 0;
        for (const block of m.message.content) {
          if (block.type === "text") {
            const text = (block as { text: string }).text ?? "";
            if (/Invalid API key|Please run \/login|Not logged in/i.test(text)) {
              sawAuthError = true;
              continue;
            }
            if (!text) continue;
            const sep = full_text && (textBlockIdx > 0 || !full_text.endsWith("\n")) ? "\n\n" : "";
            const out = sep + text;
            full_text += out;
            yield { type: "delta", text: out } as const;
            textBlockIdx++;
          } else if (block.type === "tool_use") {
            const tu = block as SDKToolBlock;
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
            yield { type: "tool_call", name, input, result } as const;
          }
        }
      }
    }
    return { stop_reason: lastStopReason };
  }

  try {
    const TRUNCATED = new Set([
      "max_tokens",
      "error_max_turns",
      "error_max_tokens",
    ]);
    let result = yield* runOne(composedUserMessage);
    let stop_reason = result.stop_reason;
    let continues = 0;
    while (stop_reason && TRUNCATED.has(stop_reason) && continues < MAX_AUTO_CONTINUE) {
      continues++;
      // Inject a synthetic notice so the UI shows we're auto-continuing.
      yield {
        type: "delta",
        text: `\n\n_(continuing… ${continues}/${MAX_AUTO_CONTINUE})_\n\n`,
      };
      const toolCallsSoFar = tool_events.length
        ? tool_events
            .map(
              (e, i) =>
                `${i + 1}. ${e.name}(${JSON.stringify(e.input).slice(0, 240)})`,
            )
            .join("\n")
        : "(none)";
      const proseSoFar = full_text.trim() || "(none)";
      const nextPrompt = [
        AUTO_CONTINUE_PROMPT,
        "",
        "## The user's original request:",
        opts.user_message,
        "",
        `## Tool calls you already made (${tool_events.length}):`,
        toolCallsSoFar,
        "",
        "## Prose you already streamed:",
        proseSoFar,
        "",
        "## Continue:",
        "Pick up the next tool call or sentence. Do not repeat what's listed above.",
      ].join("\n");
      result = yield* runOne(nextPrompt);
      stop_reason = result.stop_reason;
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

/**
 * Route a chat turn. Prefers the direct Anthropic SDK path whenever any
 * token (browser or server) is available — it works with both API keys
 * and OAuth tokens and supports tool use cleanly. Falls back to the
 * Claude Agent SDK only when no client auth was provided AND the only
 * server credential is a CLAUDE_CODE_OAUTH_TOKEN (whose subprocess
 * needs the env var set globally).
 */
export async function* streamChat(
  opts: StreamOptions,
): AsyncGenerator<StreamEvent, void, void> {
  const r = resolveAuth(opts.client_auth);
  if (r.source === "client" || r.source === "server-api-key") {
    yield* streamAnthropicAPI(opts);
    return;
  }
  if (r.source === "server-oauth") {
    yield* streamClaudeCodeSDK(opts);
    return;
  }
  // No auth available anywhere — surface the BYO-token UX.
  yield {
    type: "error",
    message:
      "No Claude credentials. Open Settings and paste an Anthropic API key (sk-ant-api03-…) or a Claude Code OAuth token (sk-ant-oat01-…) — it's stored in your browser only.",
  };
}
