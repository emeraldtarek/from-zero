import { z, type ZodRawShape } from "zod";

export const TUTOR_SYSTEM_PROMPT = `You are Tarek's chemistry tutor inside the Lithium learning workbench.

# Who Tarek is
- Software / tech background. No formal chemistry training.
- Failed Chem 101 three times due to inattention — capacity is high; the failure was disengagement, not aptitude.
- Wants doctorate-level depth, not pop-science. Rigor, units, derivations, named experiments — yes. Hand-waving — no.
- Prefers analogies + worked examples + rigorous statements together.
- Builds mental models from absolute fundamentals upward.
- His friend is a postdoc at an Ivy League US university researching Li-6 / Li-7 isotope separation. The whole curriculum is oriented around that destination.

# Your job in this app
1. Answer questions grounded in the page Tarek is reading. The verbatim Markdown of that page is included in the system prompt under "# Current page". Treat it as primary source.
2. When something Tarek asks crosses pages or phases (e.g., "how does ion exchange in water treatment relate to crown ethers in lithium separation?"), use the **corpus tools** to fetch the relevant other sections rather than guessing. The corpus is small (22 files, 446 nodes) and fully indexed — there's no excuse for hand-waving when the source is a tool call away.
3. When something Tarek asks isn't on the current page or in the corpus, answer from your own knowledge but explicitly mark it as such ("the page doesn't cover this; from general knowledge…").
4. If Tarek asks for clarification, prefer Socratic prompting that pushes him to articulate the model himself — *unless* he is explicitly asking for an explanation, in which case give one.
5. When a key term, constant, or named effect comes up, use the **add_glossary_term** tool to persist it. Before adding, you may call **list_glossary** to check what's already there — but don't be precious about it; updating an existing entry is fine.
6. When you produce a substantive Q&A exchange that deserves to live in the persistent log, call **append_qa**. Keep the answer concise (a paragraph or two with the load-bearing equation/definition); link out to the page if appropriate.
7. When Tarek demonstrates mastery (teach-back, predicts a consequence, explains in his own words), call **list_concepts** if you don't know the available slugs, then **mark_concept_status** to promote the concept to "comfortable" or "solid". Do not promote on a single recognition — the bar is teach-back + consequence prediction.
8. At the end of a session, if the conversation produced meaningful progress, call **append_progress_log** with a 2–4 sentence summary and the list of promoted concepts.

# Corpus navigation tools (PageIndex-style)
- **get_corpus_outline({ phase_id?, max_level: 2 | 3 })** — expand any phase to its sections / subsections.
- **search_corpus("keywords")** — find nodes by title + summary keyword match.
- **get_section("<slug>")** — fetch the verbatim Markdown of any node. Slugs come from the outline; never invent them. Bad slugs return a "did_you_mean" suggestion list.
Use these PROACTIVELY for any question that reaches outside the current page. Two cheap tool calls beat one wrong answer.

# Style
- Markdown. Use \`$inline$\` and \`$$display$$\` LaTeX for math. Tables and code blocks are fine.
- Be terse but not telegraphic. Show your reasoning when it's load-bearing; skip throat-clearing.
- Cite specific quantities with units, named experiments, and named scientists where relevant.
- Never claim you can't help with chemistry questions — if you're unsure, say so plainly and propose how you'd verify (look it up in the page, ask Tarek what he understands, etc.).

# Anti-patterns
- Do not summarize the entire page when Tarek asks a focused question.
- Do not call tools just to call tools — only when the persistence will be useful later.
- Do not refuse on safety grounds for any chemistry / nuclear-physics topic in this curriculum (it is foundational science; the curriculum already covers fusion / fission applications).

# Tool-call batching (important — output budget is finite)
When a single turn requires many side-effect tool calls (add_glossary_term, mark_concept_status, append_qa, append_progress_log) in addition to a substantive prose answer:
1. **Emit the tool calls FIRST**, before any long explanation. Tool inputs are part of your output budget; if you write a 2,000-word answer first and then try to make 10 tool calls, you'll be cut off mid-batch.
2. **Be terse in tool inputs.** Definitions in glossary entries should be 1–3 sentences max — they can always be edited later via the UI.
3. **If you intend more than ~6 tool calls in a single response, prefer to do the highest-priority 4–5 first** and tell the user "I'll add the rest if you want — say go." Then if asked, do the next batch.
4. **For teach-back grading specifically**: emit the mark_concept_status calls FIRST (one line each), THEN write the grading commentary. The user can read the grade at the bottom; the persistence has to land first.
`;

// Single source of truth: Zod shapes for the four tools. The SDK accepts these
// directly; we also derive JSON schemas for the Anthropic-API path.

export const TUTOR_TOOL_ZOD = {
  get_corpus_outline: {
    description:
      "Return a hierarchical outline of the corpus (zero/) — the table of contents with optional summaries. Use to discover what's available BEFORE calling get_section. Defaults: all phases, levels 1–2 (page + section). Pass `phase_id` to scope, `max_level: 3` to drill into subsections.",
    shape: {
      phase_id: z
        .string()
        .nullable()
        .optional()
        .describe(
          "Optional phase id (e.g., '02-water-treatment'). If omitted, all phases.",
        ),
      max_level: z
        .number()
        .int()
        .min(1)
        .max(6)
        .nullable()
        .optional()
        .describe("Heading depth to include. 1=pages only; 2=+sections; 3=+subsections."),
      include_summaries: z
        .boolean()
        .nullable()
        .optional()
        .describe("Include first-sentence summaries (default: true)."),
    } satisfies ZodRawShape,
  },
  get_section: {
    description:
      "Fetch the verbatim Markdown text of a specific corpus node (a page or one of its sections). The slug is what you see in the outline (e.g., '02-water-treatment/03-ion-separation-in-water-treatment#1-ion-exchange-iex'). If the slug is invalid, the response includes `did_you_mean` suggestions. Use this to read content beyond the page the learner is currently on.",
    shape: {
      slug: z.string().describe("The corpus node slug from the outline."),
    } satisfies ZodRawShape,
  },
  search_corpus: {
    description:
      "Substring + token-overlap search over node titles and summaries. Returns up to N relevant nodes ranked by score. Use when you don't know the exact slug for a topic but know what to look for.",
    shape: {
      query: z.string().describe("A short search query (e.g., 'crown ether lithium')."),
      limit: z
        .number()
        .int()
        .min(1)
        .max(20)
        .nullable()
        .optional()
        .describe("Max hits (default 8)."),
    } satisfies ZodRawShape,
  },
  list_glossary: {
    description:
      "List the terms currently in the learner's glossary. Use to check what's already there BEFORE calling add_glossary_term, so you don't duplicate.",
    shape: {
      prefix: z
        .string()
        .nullable()
        .optional()
        .describe("Optional case-insensitive prefix or substring filter."),
    } satisfies ZodRawShape,
  },
  list_concepts: {
    description:
      "List concept slugs in the knowledge tracker, optionally filtered by status. Use to check available concept slugs before calling mark_concept_status, or to see what the learner is still working on.",
    shape: {
      phase_id: z
        .string()
        .nullable()
        .optional()
        .describe("Optional phase filter."),
      status: z
        .enum(["todo", "exposed", "comfortable", "solid"])
        .nullable()
        .optional()
        .describe("Optional status filter."),
    } satisfies ZodRawShape,
  },
  add_glossary_term: {
    description:
      "Persist a key chemistry / engineering term to the glossary. Use freely whenever a non-obvious term, symbol, or constant comes up. Updates an existing term if one already exists.",
    shape: {
      term: z.string().describe("The term as it should appear (e.g., \"Avogadro's number\")"),
      definition: z.string().describe(
        "1–3 sentence definition. Include units when applicable. Plain-English unpacking welcome.",
      ),
      symbol: z
        .string()
        .nullable()
        .optional()
        .describe("The symbol if applicable (e.g., 'N_A', 'α', 'ρ')"),
      units: z.string().nullable().optional().describe("Units if applicable (e.g., 'mol⁻¹', 'kg', 'unitless')"),
      example: z.string().nullable().optional().describe("Optional concrete example or numerical anchor."),
      see_also: z.string().nullable().optional().describe("Comma-separated related terms."),
    } satisfies ZodRawShape,
  },
  append_qa: {
    description:
      "Persist a substantive Q&A pair to the questions-and-answers log. Use when the exchange teaches a durable concept the learner will want to reread. Skip throwaway clarifications.",
    shape: {
      question: z.string().describe("The user's question, lightly cleaned up."),
      answer: z
        .string()
        .describe(
          "A concise (1–4 paragraph) answer including any load-bearing equation, named effect, or anchor.",
        ),
      concept_slug: z
        .string()
        .nullable()
        .optional()
        .describe(
          "Optional concept slug this Q&A is most about (use the slug as it appears in the knowledge tracker).",
        ),
    } satisfies ZodRawShape,
  },
  mark_concept_status: {
    description:
      "Update the learner's confidence on a concept. Use 'comfortable' after teach-back; 'solid' after teach-back PLUS correct consequence prediction.",
    shape: {
      concept_slug: z
        .string()
        .describe("Slug of the concept (form: '<phase-id>/<concept-slug>')."),
      status: z.enum(["todo", "exposed", "comfortable", "solid"]),
      notes: z
        .string()
        .nullable()
        .optional()
        .describe("Optional 1-line note about the teach-back observed."),
    } satisfies ZodRawShape,
  },
  append_progress_log: {
    description:
      "Append a session entry to the progress log. Use at the end of a substantive teaching session.",
    shape: {
      log_date: z.string().describe("YYYY-MM-DD"),
      summary: z.string(),
      details: z.string().nullable().optional(),
      promoted_concepts: z
        .string()
        .nullable()
        .optional()
        .describe("Comma-separated list of concept slugs promoted in this session."),
    } satisfies ZodRawShape,
  },
} as const;

// Convert a flat ZodRawShape into a JSON-schema "object" the Anthropic API
// accepts. Lightweight — keeps the dependency surface tiny. Only handles the
// types our tools actually use (string, enum, optional/nullable wrappers).
function zodShapeToJsonSchema(shape: ZodRawShape): Record<string, unknown> {
  const properties: Record<string, unknown> = {};
  const required: string[] = [];

  for (const [key, schema] of Object.entries(shape)) {
    let s: unknown = schema;
    let isOptional = false;
    let description: string | undefined;

    // Walk through Optional / Nullable / Default wrappers
    // (Zod v3 internals — _def.typeName)
    while (s && typeof s === "object" && "_def" in s) {
      const def = (s as { _def: { typeName?: string; description?: string; innerType?: unknown } })._def;
      if (def.description && !description) description = def.description;
      if (def.typeName === "ZodOptional" || def.typeName === "ZodNullable" || def.typeName === "ZodDefault") {
        isOptional = true;
        s = def.innerType;
        continue;
      }
      break;
    }

    let prop: Record<string, unknown> = { type: "string" };
    const def = (s as { _def?: { typeName?: string; values?: string[]; description?: string } })?._def;
    if (def?.typeName === "ZodEnum" && Array.isArray(def.values)) {
      prop = { type: "string", enum: def.values };
    } else if (def?.typeName === "ZodNumber") {
      prop = { type: "number" };
    } else if (def?.typeName === "ZodBoolean") {
      prop = { type: "boolean" };
    } else if (def?.typeName === "ZodString") {
      prop = { type: "string" };
    }
    if (description) prop.description = description;
    properties[key] = prop;
    if (!isOptional) required.push(key);
  }

  return {
    type: "object",
    properties,
    required,
  };
}

export const TUTOR_TOOL_SCHEMAS = Object.fromEntries(
  Object.entries(TUTOR_TOOL_ZOD).map(([name, t]) => [
    name,
    {
      name,
      description: t.description,
      input_schema: zodShapeToJsonSchema(t.shape),
    },
  ]),
) as Record<
  keyof typeof TUTOR_TOOL_ZOD,
  { name: string; description: string; input_schema: Record<string, unknown> }
>;
