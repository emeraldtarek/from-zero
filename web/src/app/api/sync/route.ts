import { syncConceptsToDb, syncPagesToDb } from "@/lib/content-loader";
import {
  regenerateGlossaryFile,
  regenerateKnowledgeTrackerFile,
  regenerateQAFile,
} from "@/lib/markdown-sync";

export const runtime = "nodejs";

export async function POST() {
  const pages = syncPagesToDb();
  const concepts = syncConceptsToDb();
  regenerateGlossaryFile();
  regenerateKnowledgeTrackerFile();
  regenerateQAFile();
  return Response.json({ pages, concepts });
}
