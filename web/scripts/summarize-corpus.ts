/**
 * Generate one-sentence LLM summaries for every corpus_node and cache them by
 * content_hash so re-runs are idempotent.
 *
 * Auth: ANTHROPIC_API_KEY (preferred) or CLAUDE_CODE_OAUTH_TOKEN. Loaded from
 * web/.env.local.
 *
 * Usage:
 *   npm run summarize             # default: word_count >= 50
 *   npm run summarize -- --min 30 # smaller threshold (more nodes)
 *   npm run summarize -- --force  # ignore cache, regenerate everything
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { getDb } from "../src/lib/db";
import { CONTENT_DIR } from "../src/lib/paths";

const HAIKU_MODEL = "claude-haiku-4-5-20251001";
const DEFAULT_MIN_WORDS = 50;
const CONCURRENCY = 5;

const args = process.argv.slice(2);
const MIN_WORDS = (() => {
  const i = args.indexOf("--min");
  return i >= 0 ? Number(args[i + 1]) || DEFAULT_MIN_WORDS : DEFAULT_MIN_WORDS;
})();
const FORCE = args.includes("--force");

function buildClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const oauth = process.env.CLAUDE_CODE_OAUTH_TOKEN;
  if (!apiKey && !oauth) {
    throw new Error(
      "Set ANTHROPIC_API_KEY or CLAUDE_CODE_OAUTH_TOKEN in web/.env.local",
    );
  }
  return new Anthropic({
    apiKey,
    authToken: !apiKey && oauth ? oauth : undefined,
    defaultHeaders:
      !apiKey && oauth
        ? { "anthropic-beta": "oauth-2025-04-20" }
        : undefined,
  });
}

const SYSTEM_PROMPT = `You write a single-sentence summary of a curriculum section for a learning-app's table-of-contents outline.

Output rules — non-negotiable:
1. **One sentence only.** ≤ 30 words. End with a period.
2. **Plain prose.** No Markdown. No \`#\` headers. No bold. No bullets. No code fences. No quotes around your output.
3. **No preamble.** Do NOT say "This section…", "Summary:", "I understand…". Do NOT echo the section title.
4. **Lead with the substantive claim** — the definition, formula, named effect, decision, or process.
5. If the section is procedural, state what it instructs in one clause.

Examples of GOOD output:
"The mole is a counting unit defined so that 12 g of carbon-12 contains exactly Avogadro's number of atoms."
"Heavier isotopes have lower zero-point vibrational energy and thus slightly stronger bonds, enabling equilibrium-based isotope separation."

Examples of BAD output:
"# Summary\\n\\nMatter is..."  (has markdown header)
"This section explains how matter is composed of atoms..."  (preamble)
"**Matter** is anything with mass."  (bold markdown)`;

function cleanSummary(raw: string): string {
  let s = raw.trim();
  // Strip surrounding quotes/backticks
  s = s.replace(/^["'`]+|["'`]+$/g, "").trim();
  // Drop any leading Markdown heading lines, blank lines, or preamble
  // ("Summary:", "Here's the summary:", "Output:", etc.).
  const PREAMBLE_RE =
    /^(?:#+\s+.*?\n+|summary\s*[:\-—]\s*|here(?:'s| is)\s+.+?\n+|output\s*[:\-—]\s*|i\s+(?:understand|will).+?\n+)/i;
  while (true) {
    const before = s;
    s = s.replace(/^[#>*\-\s]*\n+/, ""); // blank/markdown decoration lines
    s = s.replace(PREAMBLE_RE, "");
    if (s === before) break;
  }
  // Take first sentence ending with . ! ?
  const m = s.match(/^([^\n]+?[.!?])(?:\s|$)/);
  if (m) s = m[1];
  // Strip leftover markdown bold/italic markers
  s = s.replace(/\*\*/g, "").replace(/(^|\s)_+(\S)/g, "$1$2").replace(/(\S)_+(\s|$)/g, "$1$2");
  // Collapse whitespace
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

async function summarize(
  client: Anthropic,
  title: string,
  text: string,
): Promise<string> {
  const trimmed = text.length > 6000 ? text.slice(0, 6000) + "…" : text;
  const msg = await client.messages.create({
    model: HAIKU_MODEL,
    max_tokens: 120,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Section title: "${title}"\n\nSection content:\n\n${trimmed}\n\n---\n\nNow output the one-sentence summary, plain prose, no markdown:`,
      },
    ],
  });
  const out = msg.content[0]?.type === "text" ? msg.content[0].text : "";
  return cleanSummary(out);
}

type NodeRow = {
  slug: string;
  title: string;
  file: string;
  line_start: number;
  line_end: number;
  content_hash: string;
  word_count: number;
};

async function main() {
  const db = getDb();

  // Find nodes that need summarization. Skip those already cached unless --force.
  const candidates = db
    .prepare(
      `SELECT slug, title, file, line_start, line_end, content_hash, word_count
         FROM corpus_node
         WHERE word_count >= ?
         ORDER BY phase_number, sort_order`,
    )
    .all(MIN_WORDS) as NodeRow[];

  let needWork: NodeRow[];
  if (FORCE) {
    needWork = candidates;
  } else {
    const cacheCheck = db.prepare(
      "SELECT 1 FROM summary_cache WHERE content_hash = ?",
    );
    needWork = candidates.filter((n) => !cacheCheck.get(n.content_hash));
  }

  console.log(
    `[summarize] candidates: ${candidates.length}, need work: ${needWork.length} (min_words=${MIN_WORDS}${FORCE ? ", forced" : ""})`,
  );
  if (needWork.length === 0) {
    console.log("[summarize] nothing to do.");
    return;
  }

  const client = buildClient();
  const cacheUpsert = db.prepare(
    `INSERT OR REPLACE INTO summary_cache (content_hash, summary, model, generated_at)
     VALUES (?, ?, ?, datetime('now'))`,
  );
  const nodeUpdate = db.prepare(
    "UPDATE corpus_node SET summary = ? WHERE content_hash = ?",
  );

  const queue = [...needWork];
  let done = 0;
  let inputTokens = 0;
  let outputTokens = 0;
  const errors: string[] = [];

  async function worker(): Promise<void> {
    while (true) {
      const n = queue.shift();
      if (!n) return;
      try {
        const abs = path.join(CONTENT_DIR, n.file);
        const fileText = fs.readFileSync(abs, "utf8");
        const lines = fileText.split(/\r?\n/);
        const sectionText = lines.slice(n.line_start - 1, n.line_end).join("\n");
        const summary = await summarize(client, n.title, sectionText);
        cacheUpsert.run(n.content_hash, summary, HAIKU_MODEL);
        nodeUpdate.run(summary, n.content_hash);
        done++;
        if (done % 10 === 0 || done === needWork.length) {
          console.log(`[summarize] ${done}/${needWork.length}`);
        }
      } catch (err) {
        errors.push(`${n.slug}: ${String(err).slice(0, 200)}`);
      }
    }
  }

  await Promise.all(
    Array.from({ length: CONCURRENCY }, () => worker()),
  );

  console.log(
    `[summarize] done. ${done} succeeded, ${errors.length} errors. ~tokens in/out: ${inputTokens}/${outputTokens}`,
  );
  for (const e of errors.slice(0, 10)) console.log("  err:", e);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
