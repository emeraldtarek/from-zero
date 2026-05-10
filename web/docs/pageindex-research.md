# PageIndex research — for the Lithium learning app

## TL;DR

- **PageIndex** turns documents into a JSON "table-of-contents tree" with LLM-written per-node summaries, then lets an agent **navigate that tree via tool calls** instead of vector search. Three tools: `get_document`, `get_document_structure`, `get_page_content(pages|line_nums)`. https://github.com/VectifyAI/PageIndex
- **For markdown the build is nearly free**: regex over `#` headers + one short LLM call per leaf for a ~200-token summary. See `pageindex/page_index_md.py`.
- **At our 22-file / ~250 KB scale a vector DB is overkill, but a PageIndex-style structural index is *just right*** — it directly fixes the four friction points and the whole outline fits in ~10 KB.
- **Don't run upstream Python or the hosted MCP**. Reimplement the idea in TypeScript (~150 LOC) inside our build pipeline. Avoid Python/Node IPC, avoid Vectify's PDF-only paid MCP, keep the index in SQLite next to glossary/QA.
- **Half-day MVP**: a `corpus_node` SQLite table built from `zero/**/*.md`, three Claude tools (`get_corpus_outline`, `get_section`, `list_glossary`), and a system prompt swap from "full page markdown" to "outline + current section".

---

## What PageIndex is

A **vectorless RAG framework**. Each document becomes a recursive JSON node:

```jsonc
{ "title": "Financial Stability", "node_id": "0006",
  "start_index": 21, "end_index": 22,
  "summary": "The Federal Reserve …",
  "nodes": [ { "title": "…", "node_id": "0007", "summary": "…" } ] }
```

For markdown the build is mechanical (`pageindex/page_index_md.py`):

1. Regex-extract every `#`/`##`/`###` → flat node list (title, level, line number).
2. Slice each node's text from its header to the next same-or-higher header.
3. Optional **thinning** — nodes under `min_token_threshold` merge into their parent.
4. Build a tree by walking the level stack.
5. **The only LLM call**: for each leaf > ~200 tokens, generate a one-paragraph `summary`. Default model `gpt-4o-2024-11-20`, pluggable via LiteLLM.

PDF mode is heavier (TOC detection, OCR), but for our markdown corpus the build is just heading parser + ~150 short LLM calls — well under $1, one-time.

The "[File System](https://pageindex.ai/blog/pageindex-filesystem)" extension stacks a *corpus-level* tree on top of per-doc trees, mirroring the "navigate phases → files → sections" model our user wants.

## How retrieval works

**There is no retrieval function** — retrieval *is* the LLM, given three tools and the tree:

1. `get_document(doc_id)` — metadata only.
2. `get_document_structure(doc_id)` — full tree **with `text` stripped** (titles + node_ids + summaries). For our corpus, ~5–10 KB.
3. `get_page_content(doc_id, "5-7" | "12,18")` — actual text for pages, or for markdown, line ranges.

The demo system prompt (`examples/agentic_vectorless_rag_demo.py`) instructs:

> Call `get_document_structure()` to identify relevant page ranges. Call `get_page_content(pages="5-7")` with **tight ranges; never fetch the whole document.**

A query becomes: outline → reasoned section pick → narrow content fetch → answer. Multiple round-trips driven by tool-use, not similarity. https://pageindex.ai/blog/pageindex-intro

## MCP integration

Two flavors at https://github.com/VectifyAI/pageindex-mcp, both PDF-centric:

- **Hosted HTTP MCP** at `https://api.pageindex.ai/mcp` (Bearer key) or `https://chat.pageindex.ai/mcp` (OAuth). Free 1000 pages, then paid.
- **"Local" stdio MCP** via `npx -y @pageindex/mcp`. The only local tool is `process_document(url)`, which uploads PDFs to Vectify's cloud and proxies everything else (see `pageindex-mcp/src/tools/process-document.ts` lines 30–82). "Local" is a misnomer.

**Latency**: indexing "0–3 minutes, ~2 s/page". Queries: 3–8 tool round-trips, dominated by Claude reasoning. **Cost**: per-query is higher than vector search because every retrieval step is an LLM turn. https://www.prafulls.me/blogs/pageindex-vectorless-rag

For our app the hosted MCP is the wrong shape — our corpus is local markdown, not user PDFs.

## Use cases — shines vs. overkill

**Shines**: long hierarchical documents exceeding context limits (financial filings, textbooks — 98.7% on FinanceBench https://github.com/VectifyAI/Mafin2.5-FinanceBench), cross-section reasoning, citation/traceability needs, no-vector-DB stacks.

**Overkill**: thousands of flat short docs (FAQs), sub-second p95 at scale, corpora without hierarchy.

**Us (22 files, 250 KB, hierarchical by design)** sit squarely in "shines" conceptually, but at this scale the full *framework* is overkill — we don't need OCR, file-system overlay, or hosted infra. We need **the idea** (TOC tree + 3 navigation tools) implemented in our stack.

## Comparison to vector RAG

The authors' pitch — "similarity ≠ relevance, retrieval needs reasoning" — is mostly fair for long, structured, professional docs. Independent commentary:

- Better accuracy and explainability, but **slower and more expensive per query** since every retrieval is an LLM call. https://pub.towardsai.net/pageindex-the-rag-framework-that-threw-out-vector-databases-and-still-hit-98-7-accuracy-d194e0549478
- HN critique: reasoning iterations grow context as the tree grows; no head-to-head benchmarks vs. Reducto/Preprocess. https://news.ycombinator.com/item?id=43548690
- Vectorless ≠ LLM-less — cost shifts from vector DB to extra Claude turns.

For a single-user learning app, ~1–3 s of extra tool round-trip is a non-issue and we never had a vector DB. The trade-off favors PageIndex's design.

## Recommended integration

**Approach A (recommended): TS-native PageIndex-style index in SQLite, three Claude tools.** Lift the *idea*, not the dependency. The markdown algorithm is ~150 LOC.

Landing zones:

- `web/scripts/build-corpus-index.ts` (new) — walk `zero/**/*.md`, parse `#` headers, slice text by line range, emit one record per node: `{file, slug, title, level, line_start, line_end, parent_slug, summary?}`. Optional Haiku call per leaf > 200 tokens for `summary`, cached by file hash.
- `web/data/corpus.sqlite` (existing) — add `corpus_node(slug PK, file, title, level, line_start, line_end, parent_slug, summary)` and `corpus_doc(file PK, phase, title, doc_summary, line_count)`. Tree via recursive CTE; no JSON-on-disk needed.
- `web/src/lib/corpus-index.ts` (new) — pure TS helpers: `getCorpusOutline()`, `getSection(slug)`, `findGlossaryTerm(term)`.
- `web/src/lib/claude-tools.ts` (existing) — add four tools:
  1. `get_corpus_outline()` → tree of `{slug, title, summary}` (drops `text`). ~5–10 KB.
  2. `get_section(slug)` → markdown text for that node only. Replaces whole-page injection.
  3. `search_corpus(query)` → optional substring/BM25 over titles + summaries.
  4. `list_glossary(prefix?)` / `list_concepts(status?)` → kills the "ask before adding" loop.
- `web/src/lib/chat-system-prompt.ts` (existing) — swap "here is the whole page" for "you're on `{slug}`. Outline: `<outline>`. Known glossary keys: `<keys>`. Call `get_section` to fetch any section."

Friction-point mapping:
1. **Whole-page injection** → outline + on-demand `get_section`; multi-page reasoning = 2–3 tool calls.
2. **Hallucinated slugs** → tools validate; unknown slug returns `{error, did_you_mean: [...]}`.
3. **No TOC reasoning** → the outline *is* the TOC.
4. **Glossary blindness** → `list_glossary()` plus inlined `known_glossary_keys`.

**Approach B**: run upstream `python3 run_pageindex.py --md_path …` at build time, store JSON, ignore Python at runtime. Pros: zero porting. Cons: Python toolchain for a 150-LOC algorithm; only their `summary` is non-trivial; still need to wire TS tools. Use only if their summary prompt is markedly better than ours.

**A wins.** We already have better-sqlite3, a build pipeline, and TS Claude tools.

## What I'd build first

Half-day vertical slice:

1. **Index** (1–2 h). Add `corpus_node` table. `scripts/build-corpus-index.ts` does steps 1–4 of the md algorithm (no LLM summaries yet — use first sentence of each section as placeholder). Verify ~150 nodes.
2. **One tool** (30 min). `get_corpus_outline()` returning `{slug, title, parent_slug, summary}[]`; wire it in.
3. **One prompt swap** (15 min). Replace `currentPageMarkdown` injection with outline + `get_section(currentSlug)` text. Keep `get_section` as a tool.
4. **Try it**. Ask "how does ion-exchange in water treatment connect to crown-ether LLX in lithium separation?" Confirm Claude calls `get_section` for both nodes and cites both slugs.
5. **Stretch**: add `list_glossary` / `list_concepts(status)`.

LLM summaries can wait — placeholder first-sentences are enough signal; backfill later via one Haiku pass.

## Open questions / things to verify

- **Outline size.** Confirm dropped-`text` outline for all 22 files stays < 15 KB. If not, fall back to per-phase outlines on demand.
- **Tool-call latency on Sonnet.** Each `get_section` is one round-trip; 2–3 extra turns for cross-phase. Measure.
- **Section granularity.** We use up to `###`. PageIndex's `min_token_threshold` default of 5000 is too aggressive for us — try 800.
- **Source of truth.** Keep slug → file/line mapping in SQLite (transactional with glossary writes), not JSON-on-disk.
- **Expose as MCP later?** Probably yes — pattern-match Vectify's tool shape so Claude Code and future clients can navigate the corpus too. https://github.com/VectifyAI/pageindex-mcp
- **Summary quality.** If quality matters, run a side-by-side: placeholder vs. our Haiku summary vs. upstream PageIndex output on three files; pick.

Sources inline.
