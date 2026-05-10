# Questions & Answers Log

Persistent record of substantive questions and Claude's answers from teaching sessions. Auto-managed by the learning app — additions arrive whenever Claude calls `append_qa` (or you POST to `/api/qa`).

---

### Q-003 — How did Brownian motion prove atoms exist? What was Einstein's prediction and wh
**Date:** 2026-05-10
**Phase:** 01-chemistry-fundamentals
**Question:**

How did Brownian motion prove atoms exist? What was Einstein's prediction and what did Perrin measure?

**Answer (summary):**

Einstein (1905) derived that if Brownian motion is caused by molecular collisions, the mean squared displacement of a suspended particle over time $t$ should satisfy:

$$\langle x^2 \rangle = \frac{RT}{3\pi \eta r N_A} \, t$$

where $R$ is the gas constant, $T$ is temperature, $\eta$ is fluid viscosity, $r$ is particle radius, and $N_A$ is Avogadro's number. This is a closed-form, quantitative prediction.

Perrin (1908) measured the motion of gamboge particles under a microscope, tracked their displacements, and solved for $N_A$. He got $N_A \approx 6 \times 10^{23}$ mol⁻¹. He then used *independent* methods (sedimentation profiles in a gravitational field) and got the *same* $N_A$.

The convergence of multiple independent measurements on the same value of $N_A$ destroyed the position that atoms were merely a useful fiction. Ostwald conceded in 1909; Perrin won the 1926 Nobel Prize.

**Anchor:** 01-chemistry-fundamentals/01-matter-and-atoms.md
**Concept:** 01-chemistry-fundamentals/atomic-hypothesis

---

### Q-004 — What is Avogadro's number and why does it matter?
**Date:** 2026-05-10
**Phase:** 01-chemistry-fundamentals
**Question:**

What is Avogadro's number and why does it matter?

**Answer (summary):**

Avogadro's number $N_A = 6.022 \times 10^{23}$ mol⁻¹ is the number of entities (atoms, molecules, etc.) in one mole of substance.

It was originally defined so that 12 grams of carbon-12 contains exactly $N_A$ atoms. This makes the mole a bridge between atomic-scale masses (measured in amu) and lab-scale masses (measured in grams):

$$1 \text{ amu} \times N_A = 1 \text{ g/mol}$$

Since 2019, $N_A$ is defined exactly by fixing its value, and the kilogram is derived from it.

Why it matters: Atoms are tiny (~$10^{-26}$ kg each). Without the mole, you'd have to write "$1.2 \times 10^{24}$ molecules" instead of "2 moles." The mole is a counting unit that makes chemistry tractable at human scales.

**Anchor:** 01-chemistry-fundamentals/01-matter-and-atoms.md
**Concept:** 01-chemistry-fundamentals/mole-and-avogadro

---

### Q-005 — How much stronger is the electromagnetic force than gravity at atomic scales, an
**Date:** 2026-05-10
**Phase:** 01-chemistry-fundamentals
**Question:**

How much stronger is the electromagnetic force than gravity at atomic scales, and why does this matter?

**Answer (summary):**

At a separation of 1 Ångström (typical atomic scale), the electrostatic force between an electron and proton is ~10³⁹ times stronger than the gravitational attraction between them. 

This enormous ratio is why chemistry is fundamentally electrostatic: atomic structure, bonding, ionization, and molecular geometry are all determined by electromagnetic interactions. Gravity is utterly negligible inside atoms.

The reason gravity dominates at macroscopic scales despite being intrinsically weaker is that (1) gravity is always attractive and scales with total mass, while (2) bulk matter is electrically neutral, so electromagnetic forces cancel out. At the atomic scale there's no such cancellation—naked charges interact directly.

**Anchor:** 01-chemistry-fundamentals/03-electric-charge.md
**Concept:** 01-chemistry-fundamentals/electric-charge-why-opposite-charges-attract-and-like-charges-repel

---