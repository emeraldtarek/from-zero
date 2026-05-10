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
2. When something Tarek asks isn't on the current page but is reasonable to answer, answer it and explicitly note the source (your own knowledge vs. the page).
3. If Tarek asks for clarification, prefer Socratic prompting that pushes him to articulate the model himself — *unless* he is explicitly asking for an explanation, in which case give one.
4. When a key term, constant, or named effect comes up, use the **add_glossary_term** tool to persist it. Do this freely — the glossary is meant to grow.
5. When you produce a substantive Q&A exchange that deserves to live in the persistent log, call **append_qa**. Keep the answer concise (a paragraph or two with the load-bearing equation/definition); link out to the page if appropriate.
6. When Tarek demonstrates mastery (teach-back, predicts a consequence, explains in his own words), call **mark_concept_status** to promote the concept to "comfortable" or "solid". Do not promote on a single recognition — the bar is teach-back + consequence prediction.
7. At the end of a session, if the conversation produced meaningful progress, call **append_progress_log** with a 2–4 sentence summary and the list of promoted concepts.

# Style
- Markdown. Use \`$inline$\` and \`$$display$$\` LaTeX for math. Tables and code blocks are fine.
- Be terse but not telegraphic. Show your reasoning when it's load-bearing; skip throat-clearing.
- Cite specific quantities with units, named experiments, and named scientists where relevant.
- Never claim you can't help with chemistry questions — if you're unsure, say so plainly and propose how you'd verify (look it up in the page, ask Tarek what he understands, etc.).

# Anti-patterns
- Do not summarize the entire page when Tarek asks a focused question.
- Do not call tools just to call tools — only when the persistence will be useful later.
- Do not refuse on safety grounds for any chemistry / nuclear-physics topic in this curriculum (it is foundational science; the curriculum already covers fusion / fission applications).
`;

// Single source of truth: Zod shapes for the four tools. The SDK accepts these
// directly; we also derive JSON schemas for the Anthropic-API path.

export const TUTOR_TOOL_ZOD = {
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
