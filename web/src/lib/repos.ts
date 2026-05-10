import {
  getDb,
  type ChatMessageRow,
  type ChatSessionRow,
  type ConceptRow,
  type ConceptStatus,
  type GlossaryRow,
  type ProgressLogRow,
  type QARow,
} from "./db";
import { slugify } from "./slug";
import {
  appendProgressLogToFile,
  appendQAToFile,
  regenerateGlossaryFile,
  regenerateKnowledgeTrackerFile,
} from "./markdown-sync";

// ---------------------- Concepts ----------------------

export function listConceptsByPhase(phase_id?: string): ConceptRow[] {
  const db = getDb();
  if (phase_id) {
    return db
      .prepare(
        "SELECT * FROM concepts WHERE phase_id = ? ORDER BY sort_order ASC",
      )
      .all(phase_id) as ConceptRow[];
  }
  return db
    .prepare("SELECT * FROM concepts ORDER BY phase_id ASC, sort_order ASC")
    .all() as ConceptRow[];
}

export function getConcept(slug: string): ConceptRow | null {
  const db = getDb();
  return (
    (db.prepare("SELECT * FROM concepts WHERE slug = ?").get(slug) as ConceptRow) ??
    null
  );
}

export function updateConceptStatus(
  slug: string,
  status: ConceptStatus,
  notes?: string | null,
): ConceptRow | null {
  const db = getDb();
  const promoted_at =
    status === "comfortable" || status === "solid"
      ? new Date().toISOString()
      : null;
  const stmt = db.prepare(`
    UPDATE concepts
    SET status = @status, notes = COALESCE(@notes, notes), promoted_at = COALESCE(@promoted_at, promoted_at), updated_at = datetime('now')
    WHERE slug = @slug
  `);
  stmt.run({ slug, status, notes: notes ?? null, promoted_at });
  const next = getConcept(slug);
  regenerateKnowledgeTrackerFile();
  return next;
}

export function statusCounts() {
  const db = getDb();
  return db
    .prepare(
      "SELECT phase_id, status, COUNT(*) AS n FROM concepts GROUP BY phase_id, status",
    )
    .all() as { phase_id: string; status: ConceptStatus; n: number }[];
}

// ---------------------- Glossary ----------------------

export function listGlossary(query?: string): GlossaryRow[] {
  const db = getDb();
  if (query) {
    const q = `%${query}%`;
    return db
      .prepare(
        "SELECT * FROM glossary WHERE term LIKE ? OR definition LIKE ? OR symbol LIKE ? ORDER BY term COLLATE NOCASE ASC",
      )
      .all(q, q, q) as GlossaryRow[];
  }
  return db
    .prepare("SELECT * FROM glossary ORDER BY term COLLATE NOCASE ASC")
    .all() as GlossaryRow[];
}

export type UpsertGlossaryInput = {
  term: string;
  definition: string;
  symbol?: string | null;
  units?: string | null;
  example?: string | null;
  see_also?: string | null;
  source_page?: string | null;
};

export function upsertGlossaryEntry(input: UpsertGlossaryInput): GlossaryRow {
  const db = getDb();
  const slug = slugify(input.term);
  const stmt = db.prepare(`
    INSERT INTO glossary (term, slug, definition, symbol, units, example, see_also, source_page)
    VALUES (@term, @slug, @definition, @symbol, @units, @example, @see_also, @source_page)
    ON CONFLICT(term) DO UPDATE SET
      definition = excluded.definition,
      symbol = COALESCE(excluded.symbol, glossary.symbol),
      units = COALESCE(excluded.units, glossary.units),
      example = COALESCE(excluded.example, glossary.example),
      see_also = COALESCE(excluded.see_also, glossary.see_also),
      source_page = COALESCE(excluded.source_page, glossary.source_page),
      updated_at = datetime('now')
  `);
  stmt.run({
    term: input.term,
    slug,
    definition: input.definition,
    symbol: input.symbol ?? null,
    units: input.units ?? null,
    example: input.example ?? null,
    see_also: input.see_also ?? null,
    source_page: input.source_page ?? null,
  });
  const row = db
    .prepare("SELECT * FROM glossary WHERE term = ?")
    .get(input.term) as GlossaryRow;
  regenerateGlossaryFile();
  return row;
}

export function deleteGlossaryEntry(id: number) {
  const db = getDb();
  db.prepare("DELETE FROM glossary WHERE id = ?").run(id);
  regenerateGlossaryFile();
}

// ---------------------- Q&A ----------------------

export function listQA(filter?: { page_slug?: string; concept_slug?: string }): QARow[] {
  const db = getDb();
  if (filter?.page_slug) {
    return db
      .prepare("SELECT * FROM qa WHERE page_slug = ? ORDER BY created_at DESC")
      .all(filter.page_slug) as QARow[];
  }
  if (filter?.concept_slug) {
    return db
      .prepare("SELECT * FROM qa WHERE concept_slug = ? ORDER BY created_at DESC")
      .all(filter.concept_slug) as QARow[];
  }
  return db.prepare("SELECT * FROM qa ORDER BY created_at DESC").all() as QARow[];
}

export type AddQAInput = {
  question: string;
  answer: string;
  page_slug?: string | null;
  concept_slug?: string | null;
  session_id?: number | null;
};

export function addQA(input: AddQAInput): QARow {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO qa (question, answer, page_slug, concept_slug, session_id)
    VALUES (@question, @answer, @page_slug, @concept_slug, @session_id)
  `);
  const result = stmt.run({
    question: input.question,
    answer: input.answer,
    page_slug: input.page_slug ?? null,
    concept_slug: input.concept_slug ?? null,
    session_id: input.session_id ?? null,
  });
  const row = db
    .prepare("SELECT * FROM qa WHERE id = ?")
    .get(result.lastInsertRowid) as QARow;
  appendQAToFile(row);
  return row;
}

export function setQAStarred(id: number, starred: boolean) {
  const db = getDb();
  db.prepare("UPDATE qa SET starred = ? WHERE id = ?").run(starred ? 1 : 0, id);
}

// ---------------------- Progress logs ----------------------

export function listProgressLogs(): ProgressLogRow[] {
  const db = getDb();
  return db
    .prepare(
      "SELECT * FROM progress_logs ORDER BY log_date DESC, id DESC",
    )
    .all() as ProgressLogRow[];
}

export type AddProgressLogInput = {
  log_date: string;
  summary: string;
  details?: string | null;
  promoted_concepts?: string | null;
};

export function addProgressLog(input: AddProgressLogInput): ProgressLogRow {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO progress_logs (log_date, summary, details, promoted_concepts)
    VALUES (@log_date, @summary, @details, @promoted_concepts)
  `);
  const r = stmt.run({
    log_date: input.log_date,
    summary: input.summary,
    details: input.details ?? null,
    promoted_concepts: input.promoted_concepts ?? null,
  });
  const row = db
    .prepare("SELECT * FROM progress_logs WHERE id = ?")
    .get(r.lastInsertRowid) as ProgressLogRow;
  appendProgressLogToFile(row);
  regenerateKnowledgeTrackerFile();
  return row;
}

// ---------------------- Chat sessions ----------------------

export function createChatSession(opts: {
  title: string;
  page_slug?: string | null;
  concept_slug?: string | null;
}): ChatSessionRow {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO chat_sessions (title, page_slug, concept_slug)
    VALUES (@title, @page_slug, @concept_slug)
  `);
  const r = stmt.run({
    title: opts.title,
    page_slug: opts.page_slug ?? null,
    concept_slug: opts.concept_slug ?? null,
  });
  return db
    .prepare("SELECT * FROM chat_sessions WHERE id = ?")
    .get(r.lastInsertRowid) as ChatSessionRow;
}

export function getOrCreateChatSession(opts: {
  page_slug?: string | null;
  concept_slug?: string | null;
  fallback_title: string;
}): ChatSessionRow {
  const db = getDb();
  if (opts.page_slug) {
    const found = db
      .prepare(
        "SELECT * FROM chat_sessions WHERE page_slug = ? ORDER BY id DESC LIMIT 1",
      )
      .get(opts.page_slug) as ChatSessionRow | undefined;
    if (found) return found;
  }
  return createChatSession({
    title: opts.fallback_title,
    page_slug: opts.page_slug ?? null,
    concept_slug: opts.concept_slug ?? null,
  });
}

export function listChatSessions(): ChatSessionRow[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM chat_sessions ORDER BY updated_at DESC")
    .all() as ChatSessionRow[];
}

export function getChatSession(id: number): ChatSessionRow | null {
  const db = getDb();
  return (
    (db.prepare("SELECT * FROM chat_sessions WHERE id = ?").get(id) as ChatSessionRow) ??
    null
  );
}

export function deleteChatSession(id: number) {
  const db = getDb();
  db.prepare("DELETE FROM chat_sessions WHERE id = ?").run(id);
}

export function listChatMessages(session_id: number): ChatMessageRow[] {
  const db = getDb();
  return db
    .prepare(
      "SELECT * FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC, id ASC",
    )
    .all(session_id) as ChatMessageRow[];
}

export function addChatMessage(input: {
  session_id: number;
  role: "user" | "assistant" | "system";
  content: string;
  page_slug?: string | null;
  concept_slug?: string | null;
  tool_calls?: string | null;
}): ChatMessageRow {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO chat_messages (session_id, role, content, page_slug, concept_slug, tool_calls)
    VALUES (@session_id, @role, @content, @page_slug, @concept_slug, @tool_calls)
  `);
  const r = stmt.run({
    session_id: input.session_id,
    role: input.role,
    content: input.content,
    page_slug: input.page_slug ?? null,
    concept_slug: input.concept_slug ?? null,
    tool_calls: input.tool_calls ?? null,
  });
  db.prepare(
    "UPDATE chat_sessions SET updated_at = datetime('now') WHERE id = ?",
  ).run(input.session_id);
  return db
    .prepare("SELECT * FROM chat_messages WHERE id = ?")
    .get(r.lastInsertRowid) as ChatMessageRow;
}
