# Lithium Isotope Separation (Li-6 / Li-7)

This is the **destination** of the entire `zero/` project. By the end of
this folder you should be able to:

- Read any contemporary paper on Li-6/Li-7 separation end-to-end and either
  summarize it accurately or pinpoint your specific gap.
- Have a substantive conversation with your friend about her work — what
  the field knows, what's contested, what the open problems are.
- Sit down with Claude and **co-author a separation-strategy proposal**
  that is non-trivial.

## Reading order

| # | File | What it covers |
|---|------|----------------|
| 1 | `01-why-separate-li6-li7.md` | Every application driving demand: fusion (the dominant driver), fission (Li-7 for PWRs and MSRs), declassified weapons history, neutron detection, scientific tracers, and the critical "battery lithium is **not** isotope-separated" clarification |
| 2 | `02-physics-of-isotope-separation.md` | The physics: Born-Oppenheimer, zero-point energy, kinetic isotope effect, separation factor α, cascade theory, separative work units (SWU). Lithium-specific: natural abundance, mass difference, nuclear-spin asymmetry |
| 3 | `03-existing-methods.md` | **The big one.** Every Li-6/Li-7 separation method humanity has invented or proposed: COLEX, electromagnetic, AVLIS, distillation, crown-ether LLX, ion exchange, membrane methods, electrochemical methods, MOF/COF, plasma centrifuge, biological |
| 4 | `04-current-research.md` | The 2020–2026 research frontier: who is publishing, what they are claiming, which directions are hot, which are blocked |
| 5 | `05-industrial-and-geopolitical-context.md` | Y-12 / Oak Ridge legacy, Russian / Chinese supply chain, fusion-startup demand, Ward et al. (2026) on mercury-scalability, the financing-dominates-consumption insight, US strategic vulnerability |

## How this folder relates to the others

- `01-chemistry-fundamentals/` gives you the *language* (atoms, isotopes,
  ions, bonds, solutions).
- `02-water-treatment/` gives you the *engineering vocabulary* (unit
  operations, ion handling, membranes, electrodialysis).
- This folder applies both to the specific problem of separating two
  isotopes that differ by ~17% in mass and almost nothing in chemistry.

If you find yourself confused by a sentence here, the unblocking move is
almost always to step back into the prior folders — the chemistry of
charge density, the engineering of cascades, the physics of
solution-diffusion through a membrane.

## A note on calibration

The lithium-isotope-separation field has a **status problem**: a great
many published methods report exciting per-stage α values in laboratory
conditions but have never been demonstrated at any pilot scale. As you
read, distinguish three levels:

1. **Laboratory α** — measured in glassware on a small batch. Often
   over-reports what scales.
2. **Bench-scale α** — measured in a small but engineering-realistic
   apparatus.
3. **Pilot-scale α** — measured in a continuous, hour-or-day-running
   process at meaningful throughput.

Today, **only COLEX has ever demonstrated pilot-to-industrial scale**
for Li-6 enrichment, and COLEX is no longer politically licensable in
most jurisdictions. *Every other method we will discuss is either
pre-pilot or has been demonstrated only at very small scale.* Keep that
mental scoreboard while reading.

## A note on the user's friend

The user's friend is doing her post-doctoral research on this exact
problem at an Ivy-League US university. We do not know which group
specifically, but the most active US Ivy/elite groups publishing on
Li-6/Li-7 separation in 2025–2026 are at Columbia (Yuan Yang's group,
SEAS) — primarily on electrochemical intercalation methods. Texas A&M
(Banerjee group, non-Ivy but also elite) and Marathon Fusion (San
Francisco, ARPA-E-funded plasma-centrifuge startup) are the other
US-based heavy hitters. Whatever her specific work, it almost certainly
belongs to one of the methodological families we'll cover in
`03-existing-methods.md` and `04-current-research.md`.
