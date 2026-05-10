import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { DB_PATH } from "./paths";

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;
  const dir = path.dirname(DB_PATH);
  fs.mkdirSync(dir, { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.pragma("synchronous = NORMAL");
  migrate(db);
  _db = db;
  return db;
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      phase_id TEXT NOT NULL,
      phase_number INTEGER NOT NULL,
      file_order INTEGER NOT NULL,
      title TEXT NOT NULL,
      relative_path TEXT NOT NULL,
      content TEXT NOT NULL,
      content_hash TEXT NOT NULL,
      word_count INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_pages_phase ON pages(phase_id, file_order);

    CREATE TABLE IF NOT EXISTS concepts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      phase_id TEXT NOT NULL,
      section TEXT,
      label TEXT NOT NULL,
      sort_order INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'todo',
      promoted_at TEXT,
      notes TEXT,
      page_slug TEXT,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_concepts_phase ON concepts(phase_id, sort_order);
    CREATE INDEX IF NOT EXISTS idx_concepts_status ON concepts(status);

    CREATE TABLE IF NOT EXISTS glossary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      term TEXT UNIQUE NOT NULL COLLATE NOCASE,
      slug TEXT UNIQUE NOT NULL,
      definition TEXT NOT NULL,
      symbol TEXT,
      units TEXT,
      example TEXT,
      see_also TEXT,
      source_page TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS qa (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      page_slug TEXT,
      concept_slug TEXT,
      session_id INTEGER,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      starred INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_qa_page ON qa(page_slug);
    CREATE INDEX IF NOT EXISTS idx_qa_concept ON qa(concept_slug);
    CREATE INDEX IF NOT EXISTS idx_qa_session ON qa(session_id);

    CREATE TABLE IF NOT EXISTS progress_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      log_date TEXT NOT NULL,
      summary TEXT NOT NULL,
      details TEXT,
      promoted_concepts TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_progress_logs_date ON progress_logs(log_date);

    CREATE TABLE IF NOT EXISTS chat_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      page_slug TEXT,
      concept_slug TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      page_slug TEXT,
      concept_slug TEXT,
      tool_calls TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id, created_at);

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS corpus_node (
      slug TEXT PRIMARY KEY,
      page_slug TEXT NOT NULL,
      phase_id TEXT NOT NULL,
      phase_number INTEGER NOT NULL,
      file TEXT NOT NULL,
      parent_slug TEXT,
      level INTEGER NOT NULL,
      title TEXT NOT NULL,
      line_start INTEGER NOT NULL,
      line_end INTEGER NOT NULL,
      sort_order INTEGER NOT NULL,
      summary TEXT,
      word_count INTEGER NOT NULL DEFAULT 0,
      content_hash TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_corpus_node_phase ON corpus_node(phase_id, sort_order);
    CREATE INDEX IF NOT EXISTS idx_corpus_node_page ON corpus_node(page_slug, line_start);
    CREATE INDEX IF NOT EXISTS idx_corpus_node_parent ON corpus_node(parent_slug);
  `);
}

export type PageRow = {
  id: number;
  slug: string;
  phase_id: string;
  phase_number: number;
  file_order: number;
  title: string;
  relative_path: string;
  content: string;
  content_hash: string;
  word_count: number;
  updated_at: string;
};

export type ConceptStatus = "todo" | "exposed" | "comfortable" | "solid";

export type ConceptRow = {
  id: number;
  slug: string;
  phase_id: string;
  section: string | null;
  label: string;
  sort_order: number;
  status: ConceptStatus;
  promoted_at: string | null;
  notes: string | null;
  page_slug: string | null;
  updated_at: string;
};

export type GlossaryRow = {
  id: number;
  term: string;
  slug: string;
  definition: string;
  symbol: string | null;
  units: string | null;
  example: string | null;
  see_also: string | null;
  source_page: string | null;
  created_at: string;
  updated_at: string;
};

export type QARow = {
  id: number;
  question: string;
  answer: string;
  page_slug: string | null;
  concept_slug: string | null;
  session_id: number | null;
  created_at: string;
  starred: number;
};

export type ProgressLogRow = {
  id: number;
  log_date: string;
  summary: string;
  details: string | null;
  promoted_concepts: string | null;
  created_at: string;
};

export type ChatSessionRow = {
  id: number;
  title: string;
  page_slug: string | null;
  concept_slug: string | null;
  created_at: string;
  updated_at: string;
};

export type ChatMessageRow = {
  id: number;
  session_id: number;
  role: "user" | "assistant" | "system";
  content: string;
  page_slug: string | null;
  concept_slug: string | null;
  tool_calls: string | null;
  created_at: string;
};

export type CorpusNodeRow = {
  slug: string;
  page_slug: string;
  phase_id: string;
  phase_number: number;
  file: string;
  parent_slug: string | null;
  level: number;
  title: string;
  line_start: number;
  line_end: number;
  sort_order: number;
  summary: string | null;
  word_count: number;
  content_hash: string;
  updated_at: string;
};
