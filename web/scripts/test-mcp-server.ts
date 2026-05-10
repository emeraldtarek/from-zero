/**
 * Smoke test for the lithium-corpus MCP server. Spawns it via stdio,
 * lists tools, calls each one with realistic args, and prints the responses.
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from "node:path";

async function main() {
  const root = path.resolve(__dirname, "..");
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "tsx", path.join(root, "scripts/mcp-server.ts")],
    cwd: root,
    env: process.env as Record<string, string>,
  });
  const client = new Client({ name: "test-client", version: "0.0.1" });
  await client.connect(transport);

  const meta = await client.listTools();
  console.log("\n== TOOLS ==");
  for (const t of meta.tools) {
    console.log(`  • ${t.name}  —  ${t.description?.slice(0, 80) ?? ""}`);
  }

  function show(label: string, res: unknown) {
    const r = res as { content?: Array<{ type: string; text?: string }>; isError?: boolean };
    const txt = (r.content ?? [])
      .map((c) => (c.type === "text" ? c.text ?? "" : `(${c.type})`))
      .join("\n");
    console.log(`\n== ${label}${r.isError ? " (error)" : ""} ==`);
    console.log(txt.slice(0, 800) + (txt.length > 800 ? "\n…(truncated)" : ""));
  }

  show(
    "get_corpus_outline (phase_id: 02-water-treatment, max_level: 2)",
    await client.callTool({
      name: "get_corpus_outline",
      arguments: { phase_id: "02-water-treatment", max_level: 2 },
    }),
  );

  show(
    "get_section (valid)",
    await client.callTool({
      name: "get_section",
      arguments: {
        slug: "01-chemistry-fundamentals/06-isotopes#rigorous-statement",
      },
    }),
  );

  show(
    "get_section (bad slug)",
    await client.callTool({
      name: "get_section",
      arguments: { slug: "01-chemistry-fundamentals/atomic-hypothesis" },
    }),
  );

  show(
    "search_corpus (crown ether)",
    await client.callTool({
      name: "search_corpus",
      arguments: { query: "crown ether liquid extraction", limit: 5 },
    }),
  );

  show(
    "list_glossary",
    await client.callTool({
      name: "list_glossary",
      arguments: {},
    }),
  );

  show(
    "list_concepts (status: solid)",
    await client.callTool({
      name: "list_concepts",
      arguments: { status: "solid" },
    }),
  );

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
