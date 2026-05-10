import { NextRequest } from "next/server";
import { z } from "zod";
import { listConceptsByPhase, updateConceptStatus } from "@/lib/repos";
import { ensureSeeded } from "@/lib/content-loader";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  ensureSeeded();
  const phase = req.nextUrl.searchParams.get("phase") ?? undefined;
  return Response.json({ concepts: listConceptsByPhase(phase) });
}

const PatchBody = z.object({
  slug: z.string(),
  status: z.enum(["todo", "exposed", "comfortable", "solid"]),
  notes: z.string().nullable().optional(),
});

export async function PATCH(req: NextRequest) {
  ensureSeeded();
  const data = PatchBody.parse(await req.json());
  const next = updateConceptStatus(data.slug, data.status, data.notes ?? null);
  if (!next) {
    return Response.json({ error: "concept not found" }, { status: 404 });
  }
  return Response.json({ concept: next });
}
