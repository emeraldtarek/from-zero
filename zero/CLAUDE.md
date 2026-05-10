# Project: Lithium Isotope Separation — Learning Journey from Zero

This file is the master entry point for any session. Read it first. It tells you
where we are, what's done, and what's next.

---

## 1. Mission

Take Tarek (the user) from **zero chemistry knowledge** to a level where he can:
1. Comprehend literature and communications around **lithium-6 / lithium-7 isotope separation**
2. Engage substantively with his friend (a post-doc at an Ivy League US university) who is researching this exact problem
3. Collaborate with Claude to **ideate and propose separation strategies** for Li-6/Li-7

A second, parallel goal: **synthesize the entire learning approach into a reusable
Claude Code skill** for future "from-zero" learning journeys in arbitrary domains.

## 2. Phases

| # | Phase | Status | Folder |
|---|-------|--------|--------|
| 0 | Project context captured | DONE | `00-context/` |
| 1 | Chemistry fundamentals written | DONE | `01-chemistry-fundamentals/` |
| 2 | Water treatment domain written | DONE | `02-water-treatment/` |
| 3 | Li-6/Li-7 separation problem & methods written | DONE | `03-lithium-isotope-separation/` |
| 4 | Learning sessions (chemistry → water → lithium) | **ready to start** | `04-learning/` |
| 5 | Ideation on separation strategies | not started | `04-learning/` then a new folder |
| 6 | Skill synthesis post-mortem | not started | `05-meta/` |

A phase is "ready" when all of its `.md` files contain doctorate-level content,
not just stubs. The user does not start learning until phases 1–3 are ready.

## 3. File map

```
zero/
├── CLAUDE.md                                     ← you are here
├── 00-context/
│   └── project-context.md                        ← what / why / how
├── 01-chemistry-fundamentals/
│   ├── README.md                                 ← chemistry index + reading order
│   ├── 01-matter-and-atoms.md
│   ├── 02-atomic-structure.md
│   ├── 03-electric-charge.md
│   ├── 04-elements-and-periodic-table.md
│   ├── 05-atomic-mass.md
│   ├── 06-isotopes.md
│   ├── 07-ions-and-ionization.md
│   ├── 08-chemical-bonding-basics.md
│   ├── 09-states-of-matter-and-solutions.md
│   └── 10-lithium-element.md
├── 02-water-treatment/
│   ├── README.md
│   ├── 01-fundamentals.md
│   ├── 02-treatment-types-and-methods.md
│   └── 03-ion-separation-in-water-treatment.md
├── 03-lithium-isotope-separation/
│   ├── README.md
│   ├── 01-why-separate-li6-li7.md
│   ├── 02-physics-of-isotope-separation.md
│   ├── 03-existing-methods.md
│   ├── 04-current-research.md
│   └── 05-industrial-and-geopolitical-context.md
├── 04-learning/
│   ├── knowledge-tracker.md                      ← what user has learned + confidence
│   └── questions-and-answers.md                  ← Q&A log during teaching
└── 05-meta/
    ├── progress-log.md                           ← chronological work log
    └── skill-synthesis-notes.md                  ← notes toward the reusable skill
```

## 4. How to resume a session

1. Read this file (CLAUDE.md).
2. Read `00-context/project-context.md` for the why.
3. Read `04-learning/knowledge-tracker.md` to see what the user has internalized.
4. Read `05-meta/progress-log.md` for the most recent work entries.
5. Pick up from the latest "Next" line in the progress log.

## 5. Pedagogical principles (do not violate)

- **Build from absolute fundamentals**. Never skip a layer. If a concept depends
  on something the user hasn't mastered yet, teach the prerequisite first.
- **Use analogies + worked examples liberally**. Every abstract concept gets at
  least one concrete picture.
- **Doctorate-level depth, not pop-science**. The user wants rigor.
- **No filler**. Don't pad. Don't repeat. Each line should pull weight.
- **Verify understanding before moving up the abstraction ladder**. Use small
  checks ("teach it back to me", "predict what happens if…") between sections.
- **Track confidence explicitly** in `04-learning/knowledge-tracker.md`. ⏳ → 🔴 → 🟡 → ✅

## 6. User profile (load-bearing context)

- Failed undergrad Chem 101 three times — root cause was inattention, **not**
  capacity. Was top of his high-school chemistry class. Capacity is there.
- Engineering / software background (we are inside a code repository).
- Learns extremely fast when engaged.
- Wants to drop and resume at will → all knowledge persisted to `.md`.
- Friend is the domain expert; user wants to be conversant with her work and
  eventually contribute ideas.

## 7. Working ground rules

- Persist everything: research, definitions, Q&A, progress. If it's worth
  thinking about, it's worth writing down here.
- Cite sources in research files. Doctorate-level means we don't hand-wave.
- When the user is learning, prefer Socratic prompts over information dumps once
  the foundational material exists.
- When in doubt about depth vs. clarity, do both: rigorous statement first, then
  a plain-English unpacking, then an analogy.

## 8. Skill-synthesis charter

Throughout this project, capture in `05-meta/skill-synthesis-notes.md`:
- The structure of the from-zero learning journey (phases, folders, file shapes)
- The pedagogical patterns that worked
- Anti-patterns and corrections
- Reusable prompts and templates

The synthesis happens at the end. Don't finalize the skill mid-journey.
