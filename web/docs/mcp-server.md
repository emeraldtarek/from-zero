# Lithium corpus MCP server

The same five tools that power the in-app chat (`get_corpus_outline`,
`get_section`, `search_corpus`, `list_glossary`, `list_concepts`) are also
exposed as a standalone Model Context Protocol server, so any MCP client —
Claude Code, Claude Desktop, the official MCP inspector, custom clients —
can navigate the corpus directly.

The server reads the same SQLite DB the Next.js app writes to, so glossary
and concept-tracker state are always in sync.

## Run locally

```bash
cd web
npm run mcp        # spawns the stdio server; expects an MCP client to attach
```

For a quick smoke test that exercises every tool:

```bash
cd web
npx tsx scripts/test-mcp-server.ts
```

## Register with Claude Code

Add this to your `~/.claude.json` under `mcpServers` (or to a project's
`.claude.json`):

```json
{
  "mcpServers": {
    "lithium-corpus": {
      "command": "tsx",
      "args": ["/abs/path/to/lithium/web/scripts/mcp-server.ts"],
      "env": {
        "LITHIUM_CONTENT_DIR": "/abs/path/to/lithium/zero",
        "LITHIUM_DB_PATH": "/abs/path/to/lithium/web/data/lithium.db"
      }
    }
  }
}
```

After restart, Claude Code will see five tools prefixed with
`mcp__lithium-corpus__…`. They'll show up in `/mcp` and can be allowlisted
the usual way.

## Tools

| Tool | Args | What it returns |
|---|---|---|
| `get_corpus_outline` | `{ phase_id?, max_level? = 2, include_summaries? = true }` | Markdown tree of slugs with one-sentence summaries |
| `get_section` | `{ slug }` | Verbatim Markdown of that node, or `did_you_mean` on miss |
| `search_corpus` | `{ query, limit? = 8 }` | Ranked hits with title + summary |
| `list_glossary` | `{ prefix? }` | All persisted glossary entries |
| `list_concepts` | `{ phase_id?, status? }` | Concept-tracker entries with statuses |

## Why this exists

The same corpus-index that grounds the in-app chat is genuinely useful from
the outside. Concrete uses:

- **Reading the corpus from Claude Code** while editing the markdown source
  itself — Claude Code can use `get_section` to look up a definition without
  bouncing the user back to the browser.
- **Writing about the corpus** elsewhere (a separate Claude Code project
  drafting a paper, slides, etc.) without needing the Next.js app running.
- **Future MCP clients** that might want to ask the corpus questions
  programmatically.
