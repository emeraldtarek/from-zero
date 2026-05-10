# Questions & Answers Log

Persistent record of substantive questions and Claude's answers from teaching sessions. Auto-managed by the learning app — additions arrive whenever Claude calls `append_qa` (or you POST to `/api/qa`).

---

_(no Q&A yet — appended as teaching sessions happen)_

### Q-006 — How do COLEX and AVLIS exploit different isotope effects, and what are the trade
**Date:** 2026-05-10
**Phase:** 03-lithium-isotope-separation
**Question:**

How do COLEX and AVLIS exploit different isotope effects, and what are the trade-offs?

**Answer (summary):**

**COLEX** (mercury amalgam) exploits **zero-point energy (ZPE) differences** in chemical bonds. At equilibrium between Li–Hg amalgam and aqueous LiOH, the heavier isotope (Li-7) has lower ZPE → preferentially occupies the phase with stronger bonds (aqueous Li–O coordination), while Li-6 prefers the amalgam. The fractional ZPE difference depends on reduced mass: larger when Li bonds to light partners (O) than heavy ones (Hg). Per-stage α ≈ 1.05–1.06; requires hundreds of cascade stages. Industrial throughput (tonnes/yr), but Hg toxicity is disqualifying.

**AVLIS** (Atomic Vapor Laser Isotope Separation) exploits the **isotope shift** in atomic spectral lines (~10 GHz at the 670.8 nm D-line), arising from finite-nuclear-mass and finite-nuclear-volume corrections to electron energy levels. A tuned laser selectively ionizes Li-6 atoms; an electric field collects the ions. Single-pass α >> 10 (no cascade needed). Clean, but throughput-limited by laser power and vapor flux (kg/yr vs. tonnes/yr for COLEX).

**Trade-off**: Equilibrium chemistry (COLEX) gives small α but high throughput and scales industrially. Laser physics (AVLIS) gives enormous α but low throughput and high capital cost. The economics depend on target purity and Li-6 market price.

**Anchor:** 03-lithium-isotope-separation/02-physics-of-isotope-separation.md
**Concept:** 03-lithium-isotope-separation/general-colex-mercury-amalgam-chemistry-history-environmental-issues

---
