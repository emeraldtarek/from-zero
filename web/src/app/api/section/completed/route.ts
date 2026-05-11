import { NextRequest } from "next/server";
import { ensureSeeded } from "@/lib/content-loader";
import { listCompletedSections } from "@/lib/section-completion";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  ensureSeeded();
  const page_slug = req.nextUrl.searchParams.get("page_slug");
  if (!page_slug) {
    return Response.json({ error: "page_slug required" }, { status: 400 });
  }
  return Response.json({ completed: listCompletedSections(page_slug) });
}
