import fs from "node:fs";
import path from "node:path";
import {
  GLOSSARY_PATH,
  QA_PATH,
  KNOWLEDGE_TRACKER_PATH,
  PROGRESS_LOG_PATH,
} from "./paths";
import {
  getDb,
  type ConceptRow,
  type GlossaryRow,
  type QARow,
  type ProgressLogRow,
} from "./db";

const STATUS_TO_SYMBOL: Record<string, string> = {
  todo: "⏳",
  exposed: "🔴",
  comfortable: "🟡",
  solid: "✅",
};

function ensureFile(p: string, init: string) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, init, "utf8");
  }
}

export function regenerateGlossaryFile() {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM glossary ORDER BY term COLLATE NOCASE ASC")
    .all() as GlossaryRow[];

  const lines: string[] = [];
  lines.push("# Glossary");
  lines.push("");
  lines.push(
    "Living glossary of key terms encountered during the lithium learning journey.",
  );
  lines.push(
    "This file is auto-managed by the learning app — edits will be regenerated on the next chat that adds a term. Use the app to add or edit entries.",
  );
  lines.push("");

  if (rows.length === 0) {
    lines.push("_(no terms yet — added as the chat introduces them)_");
  } else {
    lines.push(
      "| Term | Symbol | Units | Definition | See also |",
    );
    lines.push("|------|--------|-------|------------|----------|");
    for (const r of rows) {
      const def = r.definition.replace(/\n+/g, " ").trim();
      lines.push(
        `| ${r.term} | ${r.symbol ?? ""} | ${r.units ?? ""} | ${def} | ${r.see_also ?? ""} |`,
      );
    }
  }
  lines.push("");
  fs.mkdirSync(path.dirname(GLOSSARY_PATH), { recursive: true });
  fs.writeFileSync(GLOSSARY_PATH, lines.join("\n"), "utf8");
}

export function regenerateQAFile() {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM qa ORDER BY id ASC")
    .all() as QARow[];
  const lines: string[] = [];
  lines.push("# Questions & Answers Log");
  lines.push("");
  lines.push(
    "Persistent record of substantive questions and Claude's answers from teaching sessions. Auto-managed by the learning app — additions arrive whenever Claude calls `append_qa` (or you POST to `/api/qa`).",
  );
  lines.push("");
  lines.push("---");
  if (rows.length === 0) {
    lines.push("");
    lines.push("_(no Q&A yet — appended as teaching sessions happen)_");
    lines.push("");
  }
  for (const qa of rows) {
    const id = `Q-${String(qa.id).padStart(3, "0")}`;
    const date = qa.created_at.slice(0, 10);
    const phase = qa.page_slug?.split("/")[0] ?? "—";
    const anchor = qa.page_slug ? `${qa.page_slug}.md` : "—";
    lines.push("");
    lines.push(`### ${id} — ${qa.question.split("\n")[0].slice(0, 80)}`);
    lines.push(`**Date:** ${date}`);
    lines.push(`**Phase:** ${phase}`);
    lines.push(`**Question:**`);
    lines.push("");
    lines.push(qa.question.trim());
    lines.push("");
    lines.push(`**Answer (summary):**`);
    lines.push("");
    lines.push(qa.answer.trim());
    lines.push("");
    lines.push(`**Anchor:** ${anchor}`);
    lines.push(`**Concept:** ${qa.concept_slug ?? "—"}`);
    lines.push("");
    lines.push("---");
  }
  fs.mkdirSync(path.dirname(QA_PATH), { recursive: true });
  fs.writeFileSync(QA_PATH, lines.join("\n"), "utf8");
}

export function appendQAToFile(qa: QARow) {
  ensureFile(
    QA_PATH,
    `# Questions & Answers Log

Append-only record of substantive questions Tarek has asked during teaching
sessions, plus the answers (or pointers to where the answer lives in the
research files).

This is **not** a transcript. Only durable, conceptually load-bearing Q&A goes
here. Throwaway clarifications do not.

---

`,
  );
  const id = `Q-${String(qa.id).padStart(3, "0")}`;
  const date = qa.created_at.slice(0, 10);
  const phase = qa.page_slug?.split("/")[0] ?? "—";
  const anchor = qa.page_slug ? `${qa.page_slug}.md` : "—";
  const block = `
### ${id} — ${qa.question.split("\n")[0].slice(0, 80)}
**Date:** ${date}
**Phase:** ${phase}
**Question:**

${qa.question.trim()}

**Answer (summary):**

${qa.answer.trim()}

**Anchor:** ${anchor}
**Concept:** ${qa.concept_slug ?? "—"}

---
`;
  fs.appendFileSync(QA_PATH, block, "utf8");
}

export function regenerateKnowledgeTrackerFile() {
  const db = getDb();
  const concepts = db
    .prepare(
      "SELECT * FROM concepts ORDER BY phase_id ASC, sort_order ASC",
    )
    .all() as ConceptRow[];

  // Group by phase_id then by section
  const byPhase = new Map<string, Map<string, ConceptRow[]>>();
  for (const c of concepts) {
    if (!byPhase.has(c.phase_id)) byPhase.set(c.phase_id, new Map());
    const sec = c.section ?? "General";
    const phaseMap = byPhase.get(c.phase_id)!;
    if (!phaseMap.has(sec)) phaseMap.set(sec, []);
    phaseMap.get(sec)!.push(c);
  }

  const phaseLabel: Record<string, string> = {
    "01-chemistry-fundamentals": "Phase 1 — Chemistry fundamentals",
    "02-water-treatment": "Phase 2 — Water treatment",
    "03-lithium-isotope-separation": "Phase 3 — Lithium isotope separation",
  };

  const lines: string[] = [];
  lines.push("# Knowledge Tracker");
  lines.push("");
  lines.push("Living record of what Tarek has learned, with confidence levels.");
  lines.push("");
  lines.push("## Confidence legend");
  lines.push("");
  lines.push("| Symbol | Meaning |");
  lines.push("|--------|---------|");
  lines.push("| ⏳ | Not yet covered |");
  lines.push("| 🔴 | Exposed — encountered but not internalized |");
  lines.push("| 🟡 | Comfortable — understands but not yet automatic |");
  lines.push("| ✅ | Solid — can teach it back unprompted |");
  lines.push("");
  lines.push(
    'A concept is **"solid" only after Tarek has explained it back in his own words**',
  );
  lines.push(
    "(without looking at the source material) and predicted at least one consequence",
  );
  lines.push("of it correctly.");
  lines.push("");
  lines.push("---");

  for (const phaseId of [
    "01-chemistry-fundamentals",
    "02-water-treatment",
    "03-lithium-isotope-separation",
  ]) {
    const phaseMap = byPhase.get(phaseId);
    if (!phaseMap) continue;
    lines.push("");
    lines.push(`## ${phaseLabel[phaseId] ?? phaseId}`);
    for (const [section, items] of phaseMap) {
      lines.push("");
      lines.push(`### ${section}`);
      for (const c of items) {
        const sym = STATUS_TO_SYMBOL[c.status] ?? "⏳";
        lines.push(`- ${sym} ${c.label}`);
      }
    }
    lines.push("");
    lines.push("---");
  }

  lines.push("");
  lines.push("## Session log");
  lines.push("");
  lines.push("(Each teaching session adds a brief entry: date, what we covered, what stuck,");
  lines.push("what didn't, and the new confidence symbols promoted.)");
  lines.push("");
  const sessions = db
    .prepare(
      "SELECT * FROM progress_logs ORDER BY log_date DESC, id DESC LIMIT 30",
    )
    .all() as ProgressLogRow[];
  lines.push("| Date | Covered | Promoted | Notes |");
  lines.push("|------|---------|----------|-------|");
  if (sessions.length === 0) {
    lines.push("| _(no sessions yet)_ | | | |");
  } else {
    for (const s of sessions) {
      const promoted = s.promoted_concepts ?? "";
      const summary = s.summary.replace(/\n+/g, " ").slice(0, 120);
      const details = (s.details ?? "").replace(/\n+/g, " ").slice(0, 120);
      lines.push(`| ${s.log_date} | ${summary} | ${promoted} | ${details} |`);
    }
  }
  lines.push("");
  fs.mkdirSync(path.dirname(KNOWLEDGE_TRACKER_PATH), { recursive: true });
  fs.writeFileSync(KNOWLEDGE_TRACKER_PATH, lines.join("\n"), "utf8");
}

export function appendProgressLogToFile(entry: ProgressLogRow) {
  ensureFile(
    PROGRESS_LOG_PATH,
    `# Progress Log

Chronological work log. Append entries; never edit past entries except to fix
typos.

---

`,
  );
  const block = `
## ${entry.log_date} — ${entry.summary.split("\n")[0].slice(0, 80)}

**What we did:**
${entry.summary.trim()}

${entry.details ? `**Details:**\n${entry.details.trim()}\n` : ""}
${entry.promoted_concepts ? `**Promoted:** ${entry.promoted_concepts}\n` : ""}
---
`;
  fs.appendFileSync(PROGRESS_LOG_PATH, block, "utf8");
}
