import { NextRequest } from "next/server";
import { z } from "zod";
import {
  addChatMessage,
  addProgressLog,
  addQA,
  getOrCreateChatSession,
  getChatSession,
  listChatMessages,
  updateConceptStatus,
  upsertGlossaryEntry,
} from "@/lib/repos";
import { ensureSeeded, getPageBySlug } from "@/lib/content-loader";
import {
  listConceptsByPhase,
  listGlossary,
} from "@/lib/repos";
import {
  getSection,
  renderOutlineMarkdown,
  searchCorpus,
} from "@/lib/corpus-index";
import { streamChat, type AnthropicTool } from "@/lib/llm";
import {
  TUTOR_SYSTEM_PROMPT,
  TUTOR_TOOL_SCHEMAS,
  TUTOR_TOOL_ZOD,
} from "@/lib/tutor-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  message: z.string().min(1),
  page_slug: z.string().nullable().optional(),
  concept_slug: z.string().nullable().optional(),
  session_id: z.number().nullable().optional(),
});

function buildTools(ctx: { sessionId: number; page_slug?: string | null }): AnthropicTool[] {
  return [
    {
      ...TUTOR_TOOL_SCHEMAS.get_corpus_outline,
      zod_shape: TUTOR_TOOL_ZOD.get_corpus_outline.shape as unknown as Record<string, unknown>,
      handler: async (input) => {
        const data = input as {
          phase_id?: string | null;
          max_level?: number | null;
          include_summaries?: boolean | null;
        };
        const md = renderOutlineMarkdown({
          phase_id: data.phase_id ?? undefined,
          maxLevel: data.max_level ?? 2,
          summaryLen: data.include_summaries === false ? 0 : 80,
        });
        return { ok: true, outline_markdown: md, byte_length: md.length };
      },
    },
    {
      ...TUTOR_TOOL_SCHEMAS.get_section,
      zod_shape: TUTOR_TOOL_ZOD.get_section.shape as unknown as Record<string, unknown>,
      handler: async (input) => {
        const data = input as { slug: string };
        const r = getSection(data.slug);
        return r;
      },
    },
    {
      ...TUTOR_TOOL_SCHEMAS.search_corpus,
      zod_shape: TUTOR_TOOL_ZOD.search_corpus.shape as unknown as Record<string, unknown>,
      handler: async (input) => {
        const data = input as { query: string; limit?: number | null };
        const hits = searchCorpus(data.query, data.limit ?? 8);
        return { ok: true, hits };
      },
    },
    {
      ...TUTOR_TOOL_SCHEMAS.list_glossary,
      zod_shape: TUTOR_TOOL_ZOD.list_glossary.shape as unknown as Record<string, unknown>,
      handler: async (input) => {
        const data = input as { prefix?: string | null };
        const rows = listGlossary(data.prefix ?? undefined);
        return {
          ok: true,
          terms: rows.map((r) => ({
            term: r.term,
            symbol: r.symbol,
            units: r.units,
            short_definition: r.definition.slice(0, 140),
          })),
        };
      },
    },
    {
      ...TUTOR_TOOL_SCHEMAS.list_concepts,
      zod_shape: TUTOR_TOOL_ZOD.list_concepts.shape as unknown as Record<string, unknown>,
      handler: async (input) => {
        const data = input as {
          phase_id?: string | null;
          status?: "todo" | "exposed" | "comfortable" | "solid" | null;
        };
        const rows = listConceptsByPhase(data.phase_id ?? undefined);
        const filtered = data.status
          ? rows.filter((c) => c.status === data.status)
          : rows;
        return {
          ok: true,
          concepts: filtered.map((c) => ({
            slug: c.slug,
            label: c.label,
            section: c.section,
            status: c.status,
          })),
        };
      },
    },
    {
      ...TUTOR_TOOL_SCHEMAS.add_glossary_term,
      zod_shape: TUTOR_TOOL_ZOD.add_glossary_term.shape as unknown as Record<string, unknown>,
      handler: async (input) => {
        const data = input as {
          term: string;
          definition: string;
          symbol?: string | null;
          units?: string | null;
          example?: string | null;
          see_also?: string | null;
        };
        const row = upsertGlossaryEntry({
          term: data.term,
          definition: data.definition,
          symbol: data.symbol ?? null,
          units: data.units ?? null,
          example: data.example ?? null,
          see_also: data.see_also ?? null,
          source_page: ctx.page_slug ?? null,
        });
        return { ok: true, id: row.id, term: row.term };
      },
    },
    {
      ...TUTOR_TOOL_SCHEMAS.append_qa,
      zod_shape: TUTOR_TOOL_ZOD.append_qa.shape as unknown as Record<string, unknown>,
      handler: async (input) => {
        const data = input as {
          question: string;
          answer: string;
          concept_slug?: string | null;
        };
        const row = addQA({
          question: data.question,
          answer: data.answer,
          page_slug: ctx.page_slug ?? null,
          concept_slug: data.concept_slug ?? null,
          session_id: ctx.sessionId,
        });
        return { ok: true, id: row.id };
      },
    },
    {
      ...TUTOR_TOOL_SCHEMAS.mark_concept_status,
      zod_shape: TUTOR_TOOL_ZOD.mark_concept_status.shape as unknown as Record<string, unknown>,
      handler: async (input) => {
        const data = input as {
          concept_slug: string;
          status: "todo" | "exposed" | "comfortable" | "solid";
          notes?: string | null;
        };
        const next = updateConceptStatus(data.concept_slug, data.status, data.notes ?? null);
        return next ? { ok: true, slug: next.slug, status: next.status } : { ok: false, error: "concept not found" };
      },
    },
    {
      ...TUTOR_TOOL_SCHEMAS.append_progress_log,
      zod_shape: TUTOR_TOOL_ZOD.append_progress_log.shape as unknown as Record<string, unknown>,
      handler: async (input) => {
        const data = input as {
          log_date: string;
          summary: string;
          details?: string | null;
          promoted_concepts?: string | null;
        };
        const row = addProgressLog({
          log_date: data.log_date,
          summary: data.summary,
          details: data.details ?? null,
          promoted_concepts: data.promoted_concepts ?? null,
        });
        return { ok: true, id: row.id };
      },
    },
  ];
}

export async function POST(req: NextRequest) {
  try {
    ensureSeeded();
  } catch (err) {
    console.error("seed error", err);
  }

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await req.json());
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const session =
    body.session_id != null
      ? getChatSession(body.session_id) ??
        getOrCreateChatSession({
          page_slug: body.page_slug ?? null,
          concept_slug: body.concept_slug ?? null,
          fallback_title: body.message.slice(0, 50),
        })
      : getOrCreateChatSession({
          page_slug: body.page_slug ?? null,
          concept_slug: body.concept_slug ?? null,
          fallback_title: body.message.slice(0, 50),
        });

  // Persist user message
  addChatMessage({
    session_id: session.id,
    role: "user",
    content: body.message,
    page_slug: body.page_slug ?? null,
    concept_slug: body.concept_slug ?? null,
  });

  // Build context
  const page = body.page_slug ? getPageBySlug(body.page_slug) : null;
  const phaseConcepts = page ? listConceptsByPhase(page.phase_id) : [];
  const conceptsBlock = phaseConcepts.length
    ? `\n\n# Concepts available to mark on this phase\nUse these EXACT slugs as the \`concept_slug\` argument to \`mark_concept_status\`. Do not invent slugs.\n\n` +
      phaseConcepts
        .map((c) => `- \`${c.slug}\` (${c.status}) — ${c.label}`)
        .join("\n")
    : "";

  // PageIndex-style corpus outline. Lean: H1 only with first-sentence
  // summaries (~2 KB). The model can call `get_corpus_outline(max_level=2)` to
  // drill into a phase, or `get_section(slug)` to fetch any section verbatim.
  const outlineMd = renderOutlineMarkdown({ maxLevel: 1, summaryLen: 140 });
  const outlineBlock = `\n\n# Corpus outline (table of contents)\nEvery page in the curriculum, slug → one-sentence summary. The current learner-visible page is included verbatim above; for ANY OTHER page or section, call:\n- \`get_corpus_outline({ phase_id?, max_level: 2 | 3 })\` to expand a phase down to subsections,\n- \`search_corpus(query)\` to find sections by keyword,\n- \`get_section(slug)\` to fetch verbatim Markdown of any node.\nDo NOT guess slugs — the outline + search are authoritative.\n\n${outlineMd}`;

  const systemWithConcepts = TUTOR_SYSTEM_PROMPT + outlineBlock + conceptsBlock;
  const history = listChatMessages(session.id);
  // The user message we just added is the last one; remove it from history.
  const history_for_llm = history
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(0, -1)
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

  const tools = buildTools({
    sessionId: session.id,
    page_slug: body.page_slug ?? null,
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      let assistantText = "";
      const toolEvents: Array<{ name: string; input: unknown; result?: unknown }> = [];

      function send(obj: Record<string, unknown>) {
        controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));
      }

      send({ type: "session", session_id: session.id });

      try {
        for await (const ev of streamChat({
          system: systemWithConcepts,
          history: history_for_llm,
          user_message: body.message,
          page_context: page
            ? { title: page.title, slug: page.slug, content: page.content }
            : null,
          tools,
        })) {
          if (ev.type === "delta") {
            assistantText += ev.text;
            send({ type: "delta", text: ev.text });
          } else if (ev.type === "tool_call") {
            toolEvents.push({ name: ev.name, input: ev.input, result: ev.result });
            send({ type: "tool_call", name: ev.name, input: ev.input, result: ev.result });
          } else if (ev.type === "error") {
            send({ type: "error", message: ev.message });
          } else if (ev.type === "done") {
            // persist assistant message with tool events
            addChatMessage({
              session_id: session.id,
              role: "assistant",
              content: assistantText,
              page_slug: body.page_slug ?? null,
              concept_slug: body.concept_slug ?? null,
              tool_calls: toolEvents.length ? JSON.stringify(toolEvents) : null,
            });
            send({ type: "done", provider: ev.provider, tool_events: toolEvents });
          }
        }
      } catch (err) {
        send({ type: "error", message: String(err) });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
