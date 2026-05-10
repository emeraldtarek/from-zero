import { NextRequest } from "next/server";
import { z } from "zod";
import { deleteGlossaryEntry, listGlossary, upsertGlossaryEntry } from "@/lib/repos";
import { ensureSeeded } from "@/lib/content-loader";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  ensureSeeded();
  const q = req.nextUrl.searchParams.get("q") ?? undefined;
  return Response.json({ entries: listGlossary(q) });
}

const PostBody = z.object({
  term: z.string().min(1),
  definition: z.string().min(1),
  symbol: z.string().nullable().optional(),
  units: z.string().nullable().optional(),
  example: z.string().nullable().optional(),
  see_also: z.string().nullable().optional(),
  source_page: z.string().nullable().optional(),
});

export async function POST(req: NextRequest) {
  ensureSeeded();
  const data = PostBody.parse(await req.json());
  const row = upsertGlossaryEntry({
    term: data.term,
    definition: data.definition,
    symbol: data.symbol ?? null,
    units: data.units ?? null,
    example: data.example ?? null,
    see_also: data.see_also ?? null,
    source_page: data.source_page ?? null,
  });
  return Response.json({ entry: row });
}

export async function DELETE(req: NextRequest) {
  ensureSeeded();
  const id = Number(req.nextUrl.searchParams.get("id"));
  if (!Number.isFinite(id)) {
    return Response.json({ error: "id required" }, { status: 400 });
  }
  deleteGlossaryEntry(id);
  return Response.json({ ok: true });
}
