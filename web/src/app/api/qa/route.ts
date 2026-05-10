import { NextRequest } from "next/server";
import { z } from "zod";
import { addQA, listQA } from "@/lib/repos";
import { ensureSeeded } from "@/lib/content-loader";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  ensureSeeded();
  const page = req.nextUrl.searchParams.get("page") ?? undefined;
  const concept = req.nextUrl.searchParams.get("concept") ?? undefined;
  return Response.json({
    items: listQA({
      page_slug: page,
      concept_slug: concept,
    }),
  });
}

const PostBody = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  page_slug: z.string().nullable().optional(),
  concept_slug: z.string().nullable().optional(),
});

export async function POST(req: NextRequest) {
  ensureSeeded();
  const data = PostBody.parse(await req.json());
  const row = addQA({
    question: data.question,
    answer: data.answer,
    page_slug: data.page_slug ?? null,
    concept_slug: data.concept_slug ?? null,
  });
  return Response.json({ qa: row });
}
