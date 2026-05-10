# Skill Synthesis Notes

Running notes toward a reusable **"learn-a-domain-from-zero"** Claude Code
skill. Append observations as we go; do **not** finalize until after the
lithium project's post-mortem.

---

## What the skill should do (working hypothesis)

Given:
- A target domain ("lithium isotope separation", "molecular biology",
  "Solidity smart contracts", anything)
- A learner's starting point (zero / partial / specific gaps)
- A persistence root (folder)

The skill should:
1. Capture **context** (what / why / how) into a context file.
2. Decompose the target domain into a **fundamentals → domain → problem-space**
   layer cake.
3. Scaffold a folder structure that mirrors the layers.
4. Stand up a **knowledge tracker** with explicit confidence levels.
5. Stand up a **progress log** for the eventual post-mortem.
6. Run **parallel doctorate-level research** to ground each layer with cited
   material.
7. Author **modular, doctorate-level `.md` files** per layer.
8. Operate Socratically once content exists, promoting knowledge tracker
   entries from ⏳ → 🔴 → 🟡 → ✅ only when the learner can teach it back.
9. Be **resumable across sessions** via a `CLAUDE.md` master entry point.

## File-shape conventions (working)

- `CLAUDE.md` at the project root — master entry point, file map, resume
  protocol, pedagogical principles, user profile.
- `00-context/project-context.md` — what / why / how, constraints, definition
  of done.
- `0N-<layer-name>/` — one folder per layer of the cake, with `01-…`,
  `02-…` numbered files inside.
- `04-learning/knowledge-tracker.md` — concept map + confidence per-concept.
- `04-learning/questions-and-answers.md` — durable Q&A only.
- `05-meta/progress-log.md` — chronological work log (append-only).
- `05-meta/skill-synthesis-notes.md` — this file's analog.

## Pedagogical patterns to validate during the lithium run

- **Atom-up sequencing.** Does building from absolute fundamentals truly
  accelerate learning, or is some scaffolding wasted?
- **One-concept-per-file.** Modular files are easier to track but may fragment
  context; will it help or hurt?
- **Three-pass writing.** Rigorous statement → plain-English unpacking →
  analogy. Validate that each pass earns its keep.
- **Predict-then-reveal.** Before showing a derivation, ask the learner to
  predict the outcome. Hypothesized to compress retention.
- **Confidence progression discipline.** Promotion only on teach-back +
  consequence prediction. Hypothesized to prevent illusory mastery.

## Anti-patterns to flag

(Filled in as we encounter them.)

- _(none observed during scaffolding + research + authoring; teaching phase
  has not yet exercised any patterns)_

## Reusable prompts / templates

### Research-agent prompt skeleton (validated 2026-05-10)

The four research-agent prompts that worked cleanly during the lithium
kickoff shared this structure. Captured for reuse:

```
You are conducting doctorate-level reference research on **<TOPIC>** for
a learner who is starting from <ZERO|PARTIAL|GAP>. The learner <BRIEF
COGNITIVE PROFILE — capacity, blockers, learning style>. He wants
rigor, not pop-science.

Your output will be used by another instance of Claude to author a
<N>-file curriculum covering: <LIST OF SUBTOPICS>.

## Your job — research these topics deeply
<SECTIONED LIST OF SUBTOPICS, each with: rigorous definition,
historical/experimental basis, common misconceptions, quantitative
anchors, best authoritative pedagogical sources, conceptual bridges.>

For <LOAD-BEARING SUBTOPICS>, go deeper.

## Tools to use
<ORDERED PREFERENCES: jina parallel search, jina read_url, web search>

Authoritative sources to consult: <DOMAIN-SPECIFIC LIST>.

## Output
**Save your full research notes as a single markdown file at:**
`<ABSOLUTE PATH>/research-notes/<TOPIC>.md`

Cite sources inline. Include specific numerical values with units.

**Then return to the parent (in your response message) a 250–400 word
summary** of: (a) what the research notes file contains at a high level,
(b) the most important calibration points, (c) any open questions or
gaps.

Do not produce a curriculum or teaching content yourself. Output is
research notes, dense with facts, sources, and pointers.
```

This pattern produces ~8,000-word research files with citations, plus a
concise summary that integrates cleanly into the curriculum-author's
context window.

### Curriculum file shape (validated 2026-05-10)

Every file in `01-chemistry-fundamentals/`, `02-water-treatment/`, and
`03-lithium-isotope-separation/` follows the same 8-section shape:

```
# <NN> — <Title>

## Prerequisite check
<one paragraph naming the prior files / concepts assumed>

## Rigorous statement
<formal definition with units, equations, structured tables>

## Plain-English unpacking
<the same content in non-jargon>

## Concrete picture / analogy
<a mental model the learner can hold>

## Worked example / specific data
<a calculation or anchoring number>

## Common misconceptions
<bullet list of "what to NOT believe">

## Connection to next
<one paragraph priming what loads next and why>

## Self-check questions
<5 Socratic prompts; the lever for ⏳ → 🔴 → 🟡 → ✅ promotion>
```

This shape took the user's "build from blocks" mental model seriously
and gave each concept rigorous + plain + visual + applied + corrected +
linked + tested treatment.

### Master entry point pattern

`CLAUDE.md` at project root with these sections, in order:
1. Mission (one sentence)
2. Phases (table with status)
3. File map (full directory listing with one-line file purposes)
4. Resume protocol ("read these files in this order on session resume")
5. Pedagogical principles (do-not-violate list)
6. User profile (load-bearing context)
7. Working ground rules
8. Skill-synthesis charter

This file is the load-bearing context for any session resume after a
gap; the resume protocol is what makes it work in practice (untested
yet — to be validated when the user returns after a real gap).

## Open questions for the post-mortem

- Did parallel research agents save real time or just feel like they did?
- Was 10-file chemistry decomposition the right granularity, or should it have
  been 5 / 15 / something else?
- Did we underrate or overrate any specific layer's importance?
- What does "doctorate-level depth" mean operationally — and did we hit it
  consistently or just sometimes?
- How well did the resume-protocol work in practice (across genuine session
  gaps)?
