/**
 * Marking a page or a section "completed" — the one-way progress action
 * exposed inline next to every heading on the reader page.
 *
 * Side effects on first mark:
 *   1. Persist a section_completion row (idempotent — re-marking is a no-op).
 *   2. Call Haiku to extract load-bearing glossary terms from the section
 *      text and upsert each into the glossary.
 *   3. For page-level marks (section_anchor === null), promote every concept
 *      whose section maps to this page → "solid".
 *   4. Append a one-line progress-log entry.
 *
 * If Anthropic auth is missing, glossary extraction is skipped silently —
 * the completion still records, concepts still promote, log still writes.
 */
import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { CONTENT_DIR } from "./paths";
import {
  getDb,
  type ConceptRow,
  type SectionCompletionRow,
} from "./db";
import {
  addProgressLog,
  updateConceptStatus,
  upsertGlossaryEntry,
} from "./repos";
import { getConceptsForPage } from "./page-concept-map";
import { getPageBySlug } from "./content-loader";

const HAIKU_MODEL = "claude-haiku-4-5-20251001";

function buildAnthropic(): Anthropic | null {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const oauth = process.env.CLAUDE_CODE_OAUTH_TOKEN;
  if (!apiKey && !oauth) return null;
  return new Anthropic({
    apiKey,
    authToken: !apiKey && oauth ? oauth : undefined,
    defaultHeaders:
      !apiKey && oauth
        ? { "anthropic-beta": "oauth-2025-04-20" }
        : undefined,
  });
}

/**
 * Slice the markdown of a section identified by its rehype-slug id. If
 * `anchor` is null, returns the whole page.
 */
function sliceSection(
  page_slug: string,
  anchor: string | null,
): { title: string; content: string } | null {
  const page = getPageBySlug(page_slug);
  if (!page) return null;
  if (!anchor) {
    return { title: page.title, content: page.content };
  }
  // Look up via corpus_node — it already has the line ranges.
  const node = getDb()
    .prepare(
      "SELECT * FROM corpus_node WHERE page_slug = ? AND slug = ?",
    )
    .get(page_slug, `${page_slug}#${anchor}`) as
    | { slug: string; title: string; file: string; line_start: number; line_end: number }
    | undefined;
  if (!node) {
    return null;
  }
  const abs = path.join(CONTENT_DIR, node.file);
  if (!fs.existsSync(abs)) return null;
  const fileText = fs.readFileSync(abs, "utf8");
  const lines = fileText.split(/\r?\n/);
  const content = lines.slice(node.line_start - 1, node.line_end).join("\n");
  return { title: node.title, content };
}

const EXTRACTION_SYSTEM = `You extract load-bearing glossary terms from a chemistry / physics curriculum section.

Output STRICT JSON: an array (max 6 entries). No prose, no markdown, no preamble. If nothing qualifies, output [].

Each entry:
  {
    "term": "string (1-4 words, the name as it should appear)",
    "definition": "1-2 sentences. Include units if applicable.",
    "symbol": "string or null (e.g., 'N_A', 'α', 'k')",
    "units": "string or null (e.g., 'mol⁻¹', 'kg', 'unitless')",
    "see_also": "string or null (comma-separated related terms)"
  }

Rules:
- Only include named constants, formulas, defined units, named effects/principles, or load-bearing concepts.
- DO NOT include filler vocabulary ("substance", "thing", "important", "matter" if too generic).
- DO NOT include terms that are merely mentioned in passing without a definition or quantitative anchor.
- Prefer fewer high-quality entries over many shallow ones.`;

type ExtractedTerm = {
  term: string;
  definition: string;
  symbol?: string | null;
  units?: string | null;
  see_also?: string | null;
};

async function extractTerms(
  title: string,
  content: string,
): Promise<ExtractedTerm[]> {
  const client = buildAnthropic();
  if (!client) return [];
  // Cap content to keep token cost predictable.
  const trimmed = content.length > 8000 ? content.slice(0, 8000) + "…" : content;
  try {
    const msg = await client.messages.create({
      model: HAIKU_MODEL,
      max_tokens: 1200,
      system: EXTRACTION_SYSTEM,
      messages: [
        {
          role: "user",
          content: `Section title: "${title}"\n\nSection content:\n\n${trimmed}\n\nReturn the JSON array now.`,
        },
      ],
    });
    const text =
      msg.content[0]?.type === "text" ? msg.content[0].text.trim() : "";
    // Strip any code-fence wrapping if the model added one despite instructions.
    const jsonText = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```\s*$/i, "")
      .trim();
    if (!jsonText.startsWith("[")) return [];
    const parsed = JSON.parse(jsonText) as unknown;
    if (!Array.isArray(parsed)) return [];
    const out: ExtractedTerm[] = [];
    for (const raw of parsed) {
      if (
        raw &&
        typeof raw === "object" &&
        typeof (raw as { term?: unknown }).term === "string" &&
        typeof (raw as { definition?: unknown }).definition === "string"
      ) {
        const r = raw as Record<string, unknown>;
        out.push({
          term: String(r.term).trim(),
          definition: String(r.definition).trim(),
          symbol: typeof r.symbol === "string" ? r.symbol : null,
          units: typeof r.units === "string" ? r.units : null,
          see_also: typeof r.see_also === "string" ? r.see_also : null,
        });
      }
    }
    return out;
  } catch (err) {
    console.error("[completion] extraction failed", err);
    return [];
  }
}

export type CompleteResult = {
  ok: true;
  already: boolean;
  completion: SectionCompletionRow;
  glossary_added: number;
  concepts_promoted: number;
  log_added: boolean;
};

export type CompleteError = { ok: false; error: string };

export async function markComplete(
  page_slug: string,
  section_anchor: string | null,
): Promise<CompleteResult | CompleteError> {
  const db = getDb();
  const existing = db
    .prepare(
      "SELECT * FROM section_completion WHERE page_slug = ? AND (section_anchor IS ? OR section_anchor = ?)",
    )
    .get(page_slug, section_anchor, section_anchor) as
    | SectionCompletionRow
    | undefined;
  if (existing) {
    return {
      ok: true,
      already: true,
      completion: existing,
      glossary_added: 0,
      concepts_promoted: 0,
      log_added: false,
    };
  }

  const sec = sliceSection(page_slug, section_anchor);
  if (!sec) {
    return { ok: false, error: "section not found" };
  }

  // 1) Extract + persist glossary terms
  const terms = await extractTerms(sec.title, sec.content);
  let glossary_added = 0;
  for (const t of terms) {
    if (!t.term || !t.definition) continue;
    try {
      upsertGlossaryEntry({
        term: t.term,
        definition: t.definition,
        symbol: t.symbol ?? null,
        units: t.units ?? null,
        see_also: t.see_also ?? null,
        source_page: page_slug,
      });
      glossary_added++;
    } catch (err) {
      console.error("[completion] glossary upsert failed", t.term, err);
    }
  }

  // 2) Promote concepts (page-level only)
  let concepts_promoted = 0;
  const promoted_slugs: string[] = [];
  if (section_anchor == null) {
    const conceptsForPage: ConceptRow[] = getConceptsForPage(page_slug);
    for (const c of conceptsForPage) {
      if (c.status === "solid") continue;
      updateConceptStatus(c.slug, "solid", "auto-promoted on page completion");
      concepts_promoted++;
      promoted_slugs.push(c.slug);
    }
  }

  // 3) Insert completion record
  const sideEffects = {
    glossary_added,
    concepts_promoted,
    promoted_slugs,
    extracted_terms: terms.map((t) => t.term),
  };
  const r = db
    .prepare(
      `INSERT INTO section_completion (page_slug, section_anchor, section_title, side_effects)
       VALUES (?, ?, ?, ?)`,
    )
    .run(
      page_slug,
      section_anchor,
      sec.title,
      JSON.stringify(sideEffects),
    );
  const completion = db
    .prepare("SELECT * FROM section_completion WHERE id = ?")
    .get(r.lastInsertRowid) as SectionCompletionRow;

  // 4) Append progress log
  const today = new Date().toISOString().slice(0, 10);
  const what = section_anchor
    ? `Completed section "${sec.title}" on page ${page_slug}`
    : `Completed page "${sec.title}" (${page_slug})`;
  const details = [
    glossary_added ? `Added ${glossary_added} glossary terms.` : null,
    concepts_promoted ? `Promoted ${concepts_promoted} concepts to solid.` : null,
  ]
    .filter(Boolean)
    .join(" ");
  addProgressLog({
    log_date: today,
    summary: what,
    details: details || null,
    promoted_concepts: promoted_slugs.length ? promoted_slugs.join(", ") : null,
  });

  return {
    ok: true,
    already: false,
    completion,
    glossary_added,
    concepts_promoted,
    log_added: true,
  };
}

export function listCompletedSections(page_slug: string): SectionCompletionRow[] {
  return getDb()
    .prepare(
      "SELECT * FROM section_completion WHERE page_slug = ? ORDER BY completed_at ASC",
    )
    .all(page_slug) as SectionCompletionRow[];
}

export function isPageCompleted(page_slug: string): boolean {
  return (
    !!(getDb()
      .prepare(
        "SELECT 1 FROM section_completion WHERE page_slug = ? AND section_anchor IS NULL",
      )
      .get(page_slug))
  );
}

/**
 * Anchor ids the reader should render as ✓ Completed.
 *
 * Includes explicit per-section completions PLUS, if the whole page has
 * been marked complete, every H2/H3 anchor on that page — so the inline
 * pills next to each heading flip in lockstep with the page-level button.
 * The page-completion → section-completion implication lives here in
 * the read layer (no DB duplication needed).
 */
export function getCompletedAnchors(page_slug: string): Set<string> {
  const db = getDb();
  const explicit = db
    .prepare(
      "SELECT section_anchor FROM section_completion WHERE page_slug = ? AND section_anchor IS NOT NULL",
    )
    .all(page_slug) as Array<{ section_anchor: string }>;
  const anchors = new Set<string>(explicit.map((r) => r.section_anchor));
  if (isPageCompleted(page_slug)) {
    const nodes = db
      .prepare(
        "SELECT slug FROM corpus_node WHERE page_slug = ? AND level >= 2",
      )
      .all(page_slug) as Array<{ slug: string }>;
    for (const n of nodes) {
      const i = n.slug.indexOf("#");
      if (i > 0) anchors.add(n.slug.slice(i + 1));
    }
  }
  return anchors;
}
