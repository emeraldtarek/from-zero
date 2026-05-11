import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });
import Anthropic from "@anthropic-ai/sdk";

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const oauth = process.env.CLAUDE_CODE_OAUTH_TOKEN;

  console.log("ANTHROPIC_API_KEY:", apiKey ? "set" : "—");
  console.log("CLAUDE_CODE_OAUTH_TOKEN:", oauth ? "set" : "—");

  const client = new Anthropic({
    apiKey: apiKey,
    authToken: !apiKey && oauth ? oauth : undefined,
    defaultHeaders: !apiKey && oauth ? { "anthropic-beta": "oauth-2025-04-20" } : undefined,
  });

  try {
    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 40,
      messages: [{ role: "user", content: "Reply with the single word 'ok'." }],
    });
    const text =
      msg.content[0]?.type === "text" ? msg.content[0].text.trim() : "(non-text)";
    console.log("Haiku replied:", text);
    console.log(
      "input/output tokens:",
      msg.usage.input_tokens,
      "/",
      msg.usage.output_tokens,
    );
  } catch (err) {
    console.log("ERR:", String(err).slice(0, 400));
  }
}

main();
