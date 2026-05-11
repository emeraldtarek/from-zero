# Progress Log

Chronological work log. Append entries; never edit past entries except to fix
typos. The post-mortem reads this end-to-end.

## Format

```
## YYYY-MM-DD — short heading
**What we did:**
**What we learned (about the domain or about the method):**
**Decisions made:**
**Next:**
```

---

## 2026-05-10 — kickoff & scaffolding

**What we did:**
- Captured the original brief in `00-context/project-context.md`.
- Established the master entry point in `CLAUDE.md` (mission, phases, file map,
  resume protocol, pedagogy principles, user profile, working rules).
- Scaffolded folders: `00-context/`, `01-chemistry-fundamentals/`,
  `02-water-treatment/`, `03-lithium-isotope-separation/`, `04-learning/`,
  `05-meta/`.
- Created `04-learning/knowledge-tracker.md` with the full concept map and
  confidence legend.
- Created `04-learning/questions-and-answers.md` skeleton.
- Created `05-meta/skill-synthesis-notes.md` skeleton.
- Launched four parallel doctorate-level research agents:
  - **A** — chemistry fundamentals verification + pedagogical sources
  - **B** — water treatment domain
  - **C** — Li-6/Li-7 separation problem & methods (general/industrial)
  - **D** — academic literature review (arXiv, SSRN, recent journal papers)

**What we learned (about method):**
- Two-track structure (lithium learning + skill synthesis) lands cleanly into
  `01–04` for content and `05` for meta.
- Numbered file prefixes give us deterministic reading order without forcing a
  TOC-only navigation.
- Tracking confidence per-concept (⏳ 🔴 🟡 ✅) gives the post-mortem rich data.

**Decisions made:**
- Chemistry fundamentals will be split into 10 modular files rather than one
  monolith. Easier to load context and to mark progress per-file.
- Research is delegated; foundational chemistry writing leans on Claude's
  internal knowledge plus the research agent's verification pass.
- Sources will be cited inline in research files (doctorate-level standard).

**Next:**
- Receive research outputs from agents A–D.
- Author the chemistry, water-treatment, and lithium-separation `.md` files
  using research output for grounding.
- Once all phase-1/2/3 files are populated, report ready to start Tarek's
  learning sessions.

---

## 2026-05-10 — research returned & curriculum authored

**What we did:**
- All four research agents returned. Each wrote its full notes to
  `05-meta/research-notes/` and returned a structured summary:
  - `chemistry-fundamentals.md` (~8,400 words) — Agent A
  - `water-treatment.md` (~52 KB) — Agent B
  - `lithium-separation-methods.md` (~8,700 words) — Agent C
  - `lithium-separation-literature.md` (~58 KB) — Agent D
- Authored `01-chemistry-fundamentals/` — README + 10 modular files
  (matter & atoms, atomic structure, electric charge, elements & periodic
  table, atomic mass, isotopes, ions & ionization, bonding basics, states
  & solutions, lithium-specific). Followed the canonical 8-section file
  shape (prerequisite → rigorous statement → unpacking → picture → worked
  example → misconceptions → connection → self-check questions).
- Authored `02-water-treatment/` — README + 3 files (fundamentals,
  treatment types/methods, ion-separation in water treatment). The third
  file is the load-bearing bridge to the lithium project, with the
  unit-operation ↔ Li-isotope-separation mapping table.
- Authored `03-lithium-isotope-separation/` — README + 5 files
  (why-separate, physics, existing-methods, current-research,
  industrial/geopolitical). Heavy use of agents C+D research as source
  material.
- Saved persistent memory (user profile + project context) to
  `~/.claude/projects/-Users-tarekkekhia-Desktop-repos-lithium/memory/`.

**What we learned (about the domain):**
- The lithium-separation field is in the middle of a research reactivation
  driven by fusion-industry urgency. The dominant narrative arcs are
  **(a) the COLEX phase-out** (mercury legacy at Y-12) and **(b) the
  fusion-driven demand surge**.
- **Ward et al. (May 2026 arXiv preprint)** is currently the most
  influential economic analysis: financing the Li-6 inventory dominates
  over consumption cost (~70× ratio at 7% interest), and mercury supply
  (not just toxicity) is the binding scaling constraint for any COLEX
  revival.
- **The most active US Ivy-League research group** is Columbia's Yuan
  Yang group (SEAS) on electrochemical Li-isotope deposition — likely
  cohort for the user's friend, though not confirmed.
- **The most-watched recent experimental result** is Carrillo / Banerjee
  (Texas A&M, 2025, *Chem*) on ζ-V₂O₅ electrochemical intercalation
  approaching COLEX α without mercury.
- **The Cui et al. 2021 ion-pair LLX result** (D_Li = 54 with α ≈ 1.04)
  is the keystone enabling crown-ether LLX as a credible non-mercury
  successor.

**What we learned (about method):**
- Delegating research to four parallel agents that wrote to
  `research-notes/` and returned summaries was cleanly non-overlapping
  with the curriculum-authoring work happening on the parent.
- The 8-section file shape (prerequisite / rigor / unpacking / picture /
  example / misconceptions / connection / self-check) imposed enough
  discipline to keep files comparable but enough variation to handle
  different topics.
- Knowledge-tracker entries (⏳ → 🔴 → 🟡 → ✅) with promotion-only-on-
  teach-back is the right discipline; we have not exercised it yet
  because the teaching phase has not started.

**Decisions made:**
- Wrote chemistry fundamentals from internal knowledge + research-agent
  verification (Agent A's note about Rutherford-vs-Bohr orbital
  attribution and IUPAC's atomic-weight-as-interval was already
  consistent with what was written).
- Saved Ward et al. 2026 arXiv preprint as a load-bearing source even
  though it has not yet been peer-reviewed; flagged the preprint status
  in the curriculum file itself.

**Next:**
- Begin **learning sessions** with Tarek. Recommended kickoff:
  `01-chemistry-fundamentals/01-matter-and-atoms.md`, then promote it on
  the knowledge tracker after teach-back.
- After phase 1 (chemistry) is mostly ✅, start phase 2 (water treatment)
  and phase 3 (lithium isotope separation).
- Once Tarek has comprehended phases 1–3 substantively, transition to
  the **ideation phase** — co-author at least one written separation-
  strategy proposal his friend would consider non-trivial.
- After the lithium track has progressed substantively, do a
  post-mortem and synthesize the patterns into a reusable Claude Code
  skill for "from-zero domain learning" (Track 2).
