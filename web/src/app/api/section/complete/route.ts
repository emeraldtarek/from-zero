import { NextRequest } from "next/server";
import { z } from "zod";
import { ensureSeeded } from "@/lib/content-loader";
import { markComplete } from "@/lib/section-completion";
import { parseClientAuthHeader } from "@/lib/llm";

export const runtime = "nodejs";

const Body = z.object({
  page_slug: z.string().min(1),
  section_anchor: z.string().nullable().optional(),
});

export async function POST(req: NextRequest) {
  ensureSeeded();
  let data: z.infer<typeof Body>;
  try {
    data = Body.parse(await req.json());
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 400 });
  }
  const clientAuth = parseClientAuthHeader(req.headers.get("x-claude-auth"));
  const result = await markComplete(
    data.page_slug,
    data.section_anchor ?? null,
    clientAuth,
  );
  if (!result.ok) {
    return Response.json(result, { status: 404 });
  }
  return Response.json(result);
}
