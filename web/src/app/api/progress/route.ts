import { NextRequest } from "next/server";
import { z } from "zod";
import { addProgressLog, listProgressLogs } from "@/lib/repos";
import { ensureSeeded } from "@/lib/content-loader";

export const runtime = "nodejs";

export async function GET() {
  ensureSeeded();
  return Response.json({ logs: listProgressLogs() });
}

const PostBody = z.object({
  log_date: z.string().min(1),
  summary: z.string().min(1),
  details: z.string().nullable().optional(),
  promoted_concepts: z.string().nullable().optional(),
});

export async function POST(req: NextRequest) {
  ensureSeeded();
  const data = PostBody.parse(await req.json());
  const row = addProgressLog({
    log_date: data.log_date,
    summary: data.summary,
    details: data.details ?? null,
    promoted_concepts: data.promoted_concepts ?? null,
  });
  return Response.json({ log: row });
}
