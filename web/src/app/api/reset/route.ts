/**
 * Wipe all learner-tracking state — glossary, Q&A, progress logs, concept
 * promotions, chat sessions/messages — and reset the live Markdown mirrors
 * by re-bootstrapping them from their `*.example.md` templates.
 *
 * Preserves the curriculum (`pages`), the navigation index (`corpus_node`,
 * `corpus_fts`), and the LLM-written summaries (`summary_cache`). These are
 * derived from the source corpus, not learner state.
 *
 * Requires an explicit `{ confirm: "RESET" }` body so a stray GET / curl
 * can't accidentally wipe things. The UI button sends this.
 */
import { NextRequest } from "next/server";
import fs from "node:fs";
import { getDb } from "@/lib/db";
import { bootstrapUserData } from "@/lib/content-loader";
import {
  GLOSSARY_PATH,
  KNOWLEDGE_TRACKER_PATH,
  PROGRESS_LOG_PATH,
  QA_PATH,
} from "@/lib/paths";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { confirm?: string };
  if (body?.confirm !== "RESET") {
    return Response.json(
      { error: "confirmation required: pass { confirm: \"RESET\" }" },
      { status: 400 },
    );
  }

  const db = getDb();
  const counts = {
    chat_messages: 0,
    chat_sessions: 0,
    qa: 0,
    progress_logs: 0,
    glossary: 0,
    concepts_demoted: 0,
  };

  const tx = db.transaction(() => {
    counts.chat_messages = (db.prepare("SELECT COUNT(*) AS n FROM chat_messages").get() as { n: number }).n;
    counts.chat_sessions = (db.prepare("SELECT COUNT(*) AS n FROM chat_sessions").get() as { n: number }).n;
    counts.qa = (db.prepare("SELECT COUNT(*) AS n FROM qa").get() as { n: number }).n;
    counts.progress_logs = (db.prepare("SELECT COUNT(*) AS n FROM progress_logs").get() as { n: number }).n;
    counts.glossary = (db.prepare("SELECT COUNT(*) AS n FROM glossary").get() as { n: number }).n;
    counts.concepts_demoted = (db
      .prepare("SELECT COUNT(*) AS n FROM concepts WHERE status<>'todo'")
      .get() as { n: number }).n;

    db.prepare("DELETE FROM chat_messages").run();
    db.prepare("DELETE FROM chat_sessions").run();
    db.prepare("DELETE FROM qa").run();
    db.prepare("DELETE FROM progress_logs").run();
    db.prepare("DELETE FROM glossary").run();
    db.prepare(
      "UPDATE concepts SET status='todo', promoted_at=NULL, notes=NULL, updated_at=datetime('now')",
    ).run();
  });
  tx();

  const removed: string[] = [];
  for (const p of [
    GLOSSARY_PATH,
    KNOWLEDGE_TRACKER_PATH,
    QA_PATH,
    PROGRESS_LOG_PATH,
  ]) {
    try {
      if (fs.existsSync(p)) {
        fs.unlinkSync(p);
        removed.push(p);
      }
    } catch {
      // ignore — bootstrap below will try to recreate from .example.md
    }
  }

  const boot = bootstrapUserData();

  return Response.json({
    ok: true,
    wiped: counts,
    files_removed: removed.length,
    files_bootstrapped: boot.created.length,
  });
}
