# Water Treatment

This is the **engineering container** that surrounds the lithium isotope
problem. Almost every Li-6/Li-7 separation method we'll meet in
`03-lithium-isotope-separation/` is either:

1. A repurposed water-treatment unit operation, or
2. A new variant of one of those unit operations.

Ion exchange columns, membrane stacks, electrodialysis, capacitive
deionization, liquid-liquid extraction, lithium ion sieves — all of these
were invented (or refined to maturity) for ordinary water treatment.
Lithium isotope separation borrows the hardware and tweaks the chemistry.

So you cannot really understand isotope-separation literature without
understanding the unit-operation vocabulary it presumes. That's what this
folder is for.

---

## Reading order

| # | File | What you'll know after |
|---|------|------------------------|
| 1 | `01-fundamentals.md` | What water treatment is, who it's for, the language of treatment trains, how engineers talk about water quality |
| 2 | `02-treatment-types-and-methods.md` | The non-ion methods (coagulation, sedimentation, filtration, disinfection, distillation) — for vocabulary completeness |
| 3 | `03-ion-separation-in-water-treatment.md` | **The load-bearing file**. Ion exchange, membranes, electrodialysis, CDI, lithium sorbents, crown ethers — and how they pre-figure isotope separation |

You can skim `02-` lightly if pressed for time; you cannot skim `03-`.

## Why this layer matters for the lithium project

When you read a paper that says *"a 5-stage cascade of monovalent-selective
electrodialysis cells achieved per-stage separation factor α = 1.04"*, you
need to know:

- What an "ED cell" is (pair of ion-selective membranes between electrodes).
- What "monovalent-selective" means (favors +1 over +2 cations).
- What a "cascade" is (multiple stages in series, multiplying α).
- What "α" means (ratio of isotope ratios in product vs. feed).

`01-` and `02-` give you the first three; `03-` gives you all four
plus the bridge to isotope-specific applications.

## Pedagogical connection to the chemistry folder

- Chemistry's **states of matter and solutions** become operational here as
  "the feed stream" and "the permeate stream."
- Chemistry's **ions and ionization** become the *workpiece* of every unit
  operation in `03-`.
- Chemistry's **bonding and hydration** explain why one ion gets selected
  over another at a membrane.

If you find yourself confused by a sentence in this folder, the answer is
almost always one folder back.
