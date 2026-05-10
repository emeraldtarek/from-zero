#!/usr/bin/env node
/**
 * Standalone MCP server exposing the Lithium learning-corpus navigation tools
 * to any MCP client (Claude Code, Claude Desktop, the official inspector, etc.).
 *
 * The server reads the same SQLite DB that the Next.js app writes to —
 * `web/data/lithium.db` by default, override with LITHIUM_DB_PATH.
 *
 * Tools (mirrors the in-app tools):
 *   - get_corpus_outline({ phase_id?, max_level?, include_summaries? })
 *   - get_section({ slug })
 *   - search_corpus({ query, limit? })
 *   - list_glossary({ prefix? })
 *   - list_concepts({ phase_id?, status? })
 *
 * Run:
 *   npm run mcp                 # stdio transport
 *
 * Register with Claude Code (~/.claude/settings.json or .claude.json):
 *   {
 *     "mcpServers": {
 *       "lithium-corpus": {
 *         "command": "tsx",
 *         "args": ["/abs/path/to/web/scripts/mcp-server.ts"],
 *         "env": { "LITHIUM_CONTENT_DIR": "/abs/path/to/zero",
 *                  "LITHIUM_DB_PATH": "/abs/path/to/web/data/lithium.db" }
 *       }
 *     }
 *   }
 */
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  getSection,
  renderOutlineMarkdown,
  searchCorpus,
} from "../src/lib/corpus-index";
import { listGlossary, listConceptsByPhase } from "../src/lib/repos";
import { ensureSeeded } from "../src/lib/content-loader";

ensureSeeded();

const server = new McpServer(
  { name: "lithium-corpus", version: "0.1.0" },
  {
    instructions:
      "Navigate the Lithium learning corpus (chemistry → water-treatment → lithium-isotope-separation). Always start with `get_corpus_outline` to see what's available; use `get_section` to fetch verbatim Markdown for any node, `search_corpus` to find sections by keyword, and `list_glossary`/`list_concepts` to inspect the learner's persisted state.",
  },
);

server.registerTool(
  "get_corpus_outline",
  {
    title: "Get corpus outline",
    description:
      "Return the curriculum's table-of-contents tree as compact Markdown. Defaults: H1 + H2, with one-sentence summaries. Pass max_level=3 to include H3 subsections, or phase_id to scope to one phase.",
    inputSchema: {
      phase_id: z.string().optional(),
      max_level: z.number().int().min(1).max(6).optional(),
      include_summaries: z.boolean().optional(),
    },
  },
  async ({ phase_id, max_level, include_summaries }) => {
    const md = renderOutlineMarkdown({
      phase_id,
      maxLevel: max_level ?? 2,
      summaryLen: include_summaries === false ? 0 : 80,
    });
    return {
      content: [{ type: "text", text: md }],
    };
  },
);

server.registerTool(
  "get_section",
  {
    title: "Get section",
    description:
      "Fetch the verbatim Markdown of a corpus node by slug. On miss, the response includes a `did_you_mean` list of similar slugs.",
    inputSchema: {
      slug: z.string(),
    },
  },
  async ({ slug }) => {
    const r = getSection(slug);
    if (!r.ok) {
      return {
        content: [
          {
            type: "text",
            text:
              `Section "${slug}" not found.\n\nDid you mean:\n` +
              r.did_you_mean
                .map((d) => `  - ${d.slug} — ${d.title} (${d.reason})`)
                .join("\n"),
          },
        ],
        isError: true,
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `# ${r.title}\n\n_(slug: ${r.slug}, file: ${r.page_slug}, lines ${r.line_start}-${r.line_end}, ${r.word_count} words)_\n\n${r.content}`,
        },
      ],
    };
  },
);

server.registerTool(
  "search_corpus",
  {
    title: "Search corpus",
    description:
      "FTS5-backed search across node titles, summaries, and verbatim section text. BM25-ranked with Porter stemming. Returns ranked hits with score + summary snippet.",
    inputSchema: {
      query: z.string(),
      limit: z.number().int().min(1).max(20).optional(),
    },
  },
  async ({ query, limit }) => {
    const hits = searchCorpus(query, limit ?? 8);
    const text = hits.length
      ? hits
          .map(
            (h) =>
              `[${h.score}] \`${h.slug}\` — ${h.title}${h.summary ? `\n  ${h.summary.slice(0, 160)}` : ""}`,
          )
          .join("\n\n")
      : `(no hits for "${query}")`;
    return { content: [{ type: "text", text }] };
  },
);

server.registerTool(
  "list_glossary",
  {
    title: "List glossary terms",
    description:
      "Return the glossary terms persisted by the learner (term + symbol + units + short definition).",
    inputSchema: {
      prefix: z.string().optional(),
    },
  },
  async ({ prefix }) => {
    const rows = listGlossary(prefix ?? undefined);
    const text = rows.length
      ? rows
          .map((r) => {
            const sym = r.symbol ? ` (${r.symbol}${r.units ? `, ${r.units}` : ""})` : "";
            return `**${r.term}**${sym} — ${r.definition.slice(0, 200)}`;
          })
          .join("\n\n")
      : "(glossary is empty)";
    return { content: [{ type: "text", text }] };
  },
);

server.registerTool(
  "list_concepts",
  {
    title: "List knowledge-tracker concepts",
    description:
      "List concept slugs (with current status) from the learner's knowledge tracker. Filter by phase_id and/or status.",
    inputSchema: {
      phase_id: z.string().optional(),
      status: z.enum(["todo", "exposed", "comfortable", "solid"]).optional(),
    },
  },
  async ({ phase_id, status }) => {
    const rows = listConceptsByPhase(phase_id);
    const filtered = status ? rows.filter((c) => c.status === status) : rows;
    const text = filtered.length
      ? filtered
          .map((c) => `- [${c.status}] \`${c.slug}\`${c.section ? `  (${c.section})` : ""}\n  ${c.label}`)
          .join("\n")
      : "(no concepts match)";
    return { content: [{ type: "text", text }] };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("[mcp-server] fatal:", err);
  process.exit(1);
});
