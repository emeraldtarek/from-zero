import path from "node:path";

export const PROJECT_ROOT = path.resolve(process.cwd());
export const CONTENT_DIR = path.resolve(
  PROJECT_ROOT,
  process.env.LITHIUM_CONTENT_DIR ?? "../zero",
);
export const DB_PATH = path.resolve(
  PROJECT_ROOT,
  process.env.LITHIUM_DB_PATH ?? "./data/lithium.db",
);

export const LEARNING_DIR = path.join(CONTENT_DIR, "04-learning");
export const META_DIR = path.join(CONTENT_DIR, "05-meta");
export const KNOWLEDGE_TRACKER_PATH = path.join(
  LEARNING_DIR,
  "knowledge-tracker.md",
);
export const QA_PATH = path.join(LEARNING_DIR, "questions-and-answers.md");
export const GLOSSARY_PATH = path.join(LEARNING_DIR, "glossary.md");
export const PROGRESS_LOG_PATH = path.join(META_DIR, "progress-log.md");

export const PHASE_DIRS = [
  { id: "00-context", title: "Context", number: 0 },
  { id: "01-chemistry-fundamentals", title: "Chemistry Fundamentals", number: 1 },
  { id: "02-water-treatment", title: "Water Treatment", number: 2 },
  { id: "03-lithium-isotope-separation", title: "Lithium Isotope Separation", number: 3 },
] as const;

export type PhaseId = (typeof PHASE_DIRS)[number]["id"];
