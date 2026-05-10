# 01 — Why Separate Lithium-6 from Lithium-7

## Prerequisite check

You've absorbed `01-chemistry-fundamentals/` (especially the isotopes and
ions files) and `02-water-treatment/`. You know that Li-6 and Li-7 are
the two stable isotopes of lithium, naturally present at 7.59% / 92.41%,
and that they have nearly identical chemistry but different masses.

This file answers: **why does anyone care to separate them?**

## The short answer

Five drivers, in roughly decreasing order of strategic urgency:

1. **Nuclear fusion**: Li-6 is the breeding feedstock for tritium fuel.
   Every credible fusion reactor design needs enriched Li-6 in its
   breeding blanket. Demand could go from "kilograms today" to "tonnes
   per year" within a decade, and there is essentially **zero current
   commercial supply**. This is the dominant driver of 2020s research.
2. **Nuclear fission (Li-7)**: pressurized water reactors (PWRs) need
   Li-7-enriched LiOH for coolant pH control. Molten salt reactors
   (MSRs) need very-high-purity Li-7 in their FLiBe coolant.
3. **Nuclear weapons (historical)**: Li-6 deuteride was the fuel of
   thermonuclear weapons. The original COLEX programs were built for
   this purpose. Declassified context only — we will not dwell.
4. **Neutron detection (Li-6)**: Li-6 glass scintillators in homeland-
   security, oil-well-logging, and research applications.
5. **Scientific applications**: Li isotopes as geochemical / biological
   tracers; Li-6 in NMR studies; isotope tracing in battery research.

A critical clarification first, because it confuses everyone:

> **Battery-grade lithium is *natural-abundance* lithium.** Lithium-ion
> batteries do not require isotope separation. The lithium in your
> phone, your EV, your power-wall is the natural 7.59% / 92.41% mix,
> and isotope identity has no measurable effect on battery performance.

If you ever hear someone in popular media say "we need to separate
lithium isotopes for the battery industry," they are simply wrong.
Battery lithium is a commodity ion-handling problem
(brines → Li₂CO₃ → cell components), not an isotope-separation problem.
**Isotope separation is an entirely different industry, currently
serving niche nuclear and scientific applications.** This will be true
until fusion energy scales up, at which point the picture changes.

---

## 1. Nuclear fusion: the Li-6 demand driver

### The breeding reactions

A fusion reactor that runs on the **deuterium-tritium (D-T) reaction**
faces a fuel-supply problem: tritium (T = ³H, hydrogen with two neutrons)
is essentially nonexistent on Earth. Total natural inventory is tens of
kilograms; T's half-life is only 12.33 years, so it decays away. Any
sustained D-T fusion industry must *breed* its own tritium.

**The breeding reactions** happen when a high-energy neutron from the
fusion reaction strikes a lithium nucleus:

$$ n + ^6\text{Li} \rightarrow ^4\text{He} + \text{T} + 4.785 \text{ MeV} \quad \text{(exoergic)} $$
$$ n + ^7\text{Li} \rightarrow ^4\text{He} + \text{T} + n' - 2.5 \text{ MeV} \quad \text{(endoergic)} $$

The Li-6 reaction is **exoergic** (releases energy) and proceeds at
thermal/epithermal neutron energies. The Li-7 reaction is **endoergic**
(absorbs energy) and only proceeds for neutrons above ~2.5 MeV; it
produces a secondary neutron that helps with neutron multiplication, but
it is *not* the workhorse breeding reaction.

The neutron capture cross-sections quantify the difference dramatically:

| Reaction | Thermal-neutron cross section |
|----------|-------------------------------|
| Li-6(n,α)T | **~940 barns** |
| Li-7(n,n'α)T | ~45 millibarns (i.e., **20,000× smaller**) |

So the *natural* abundance ratio (7.59% Li-6) gives you a surprisingly
small fraction of all the neutron capture going through the desired
exoergic channel, especially since blankets must compete with neutron
absorption by structural materials.

### The tritium breeding ratio (TBR)

A fusion reactor's blanket is the curtain of material around the plasma
that absorbs the fusion neutrons and breeds tritium. The **tritium
breeding ratio** (TBR) is defined as:

$$ \text{TBR} = \frac{\text{tritium atoms produced per fusion event}}{\text{tritium atoms consumed per fusion event}} $$

For a self-sustaining fusion fuel cycle, **TBR > 1.0** is required.
In practice, **TBR ≥ 1.1** is the target, to cover:

- Tritium losses to radioactive decay during processing (~half-life
  12.33 years — not negligible on plant timescales)
- Tritium retained in blanket / structural materials
- Tritium losses in the fuel-purification loop
- Margin for startup of new reactors

Achieving TBR ≥ 1.1 with technically feasible blanket geometries
**requires Li-6 enrichment**:

- **Solid breeder concepts** (e.g., ceramic pebble beds of Li₂TiO₃,
  Li₄SiO₄): typically need 30–60% Li-6.
- **Liquid breeder concepts** (e.g., lithium-lead eutectic PbLi,
  lithium-fluoride salts): typically need 60–90% Li-6.

(Sources: Giegerich et al., *Fusion Engineering and Design* 149 (2019)
111339, the TRANSAT Project at KIT.)

### How much enriched Li-6 are we talking about?

Quantitative numbers, because this is where the picture becomes vivid:

- **ITER's Test Blanket Module (TBM) program** (already underway):
  ~200 kg of 90%-enriched Li-6 for EU testing alone. ITER itself runs
  on existing tritium stockpiles, not bred tritium — so the TBM is the
  *experiment* in tritium breeding.
- **DEMO** (Europe's first power-producing fusion plant, planned
  2050s): a 2 GW_fusion reactor with the Water-Cooled Lithium-Lead
  (WCLL) blanket has a PbLi inventory of ~8,200 tonnes. Lithium is
  6.4 × 10⁻³ of that mass. So pure Li-6 inventory needed:
  **~52 tonnes per 2 GW_fus device, or ~26 t/GW_fus**.
- **Annual consumption**: tritium production consumes ~2 g of Li-6
  per gram of T produced. A GW-scale device burns ~100–112 kg of Li-6
  per full-power year.

Now an important observation, from Ward et al. (arXiv 2605.04707, May
2026) — currently a preprint, but with sound underlying data:

> A GW_th fusion reactor needs ~100 tonnes of Li-6 *inventory* but
> only consumes ~100 kg/yr (~0.1% of inventory).
>
> At a 7% interest rate, the cost of *financing* the inventory is
> about **70× the cost of replacing it annually**.

This reframes Li-6 from a "fuel" into a "capital expenditure." The
economic problem is buying the initial inventory, not buying annual
top-up. And the supply side has zero commercial Li-6 enrichment
capacity worldwide today — Li-6 is being drawn down from Cold-War-era
US/Russian stockpiles (whose actual quantities are classified or
opaque).

### The fusion industry in 2026

The fusion-power industry is real. As of 2024, member companies in the
Fusion Industry Association reported roughly **$434M spent on supply
chains**, up from ~$250M in 2023. Major Li-6-consumers (current or
near-term) include:

- **Commonwealth Fusion Systems** (SPARC test reactor → ARC commercial
  plant, Massachusetts)
- **Tokamak Energy** (ST40, UK)
- **TAE Technologies** (proton-boron eventually, but D-T pathways
  exist; California)
- **Helion Energy** (D-³He fusion; doesn't need Li-6, but their
  pulsed concepts are unusual)
- **Kyoto Fusioneering** (blanket/breeder systems, Japan)
- **Marathon Fusion** (San Francisco — but this one is *building* Li-6
  enrichment, not consuming it; ARPA-E funded)
- **ITER → DEMO → EU-DEMO supply chain** (publicly funded, multi-decade)

For a learner's mental model: imagine a market that today is "tens of
kilograms per year of Li-6 traded," dominated by research and small-scale
nuclear users, with prices around **€53,000/kg** (Eurisotop, 2019, for
95% enriched Li-6), being dragged into a future where commercial fusion
might require **tonnes per year**. That step-change in demand against a
near-zero supply base is what drives the entire isotope-separation
research field today.

---

## 2. Nuclear fission: Li-7 (the other half of the story)

### Pressurized Water Reactors (PWRs)

PWRs — the dominant commercial reactor design worldwide — use boric
acid (B(OH)₃) dissolved in the primary coolant for reactivity control.
Boric acid acidifies the water; uncontrolled, this would corrode the
steam generators (mostly Inconel 600/690 tubes).

The fix: dose the coolant with **lithium hydroxide** to maintain pH
in the 6.9–7.4 window, balancing the boric acid. The PWR coolant ends
up holding ~2.2 ppm of Li⁺.

**Why Li-7 and not natural Li?** Because Li-6 has that ~940-barn
thermal-neutron cross-section. Any Li-6 in the primary coolant absorbs
neutrons and produces tritium right where you don't want it: in the
operating reactor's coolant loop. Tritium-contaminated coolant is a
radiation-handling and waste-disposal headache.

So PWR-grade LiOH must be **≥ 99.95% Li-7**.

The US has roughly **65 PWRs**, each consuming ~2–4 kg Li-7/yr (more
when you include resin manufacturing). Total US PWR-driven Li-7 demand:
**~300 kg/yr**. World demand: roughly **1 tonne/yr**.

Price (2013 reference, since transparent recent data is sparse):
~$10,000/kg for Li-7 LiOH.

The supplier today is essentially one entity: **TVEL / NCCP Novosibirsk
in Russia**, supplying up to ~80% of world demand. The remainder comes
from China (which has its own COLEX-based production for its expanding
PWR fleet) and very small US legacy stocks.

### The 2012–2013 Li-7 supply crisis

Around 2012, China stopped exporting Li-7 to focus on its own domestic
demand (new PWRs and an experimental molten salt reactor program).
This created a near-miss for the US PWR fleet, which depended on
Russia + China for Li-7.

The US Government Accountability Office issued **GAO-13-716**
(September 2013), recommending DOE take stewardship of the Li-7 supply
chain. DOE allocated 200 kg of Li-7 to a strategic reserve. The
crisis passed, but the structural vulnerability remained: **the US
has zero domestic Li-7 enrichment capability** as of 2026, having shut
down the original COLEX plants in 1963.

### Molten Salt Reactors (MSRs)

A more aggressive next-generation reactor architecture uses **FLiBe**
(2 LiF + BeF₂, melting point 459 °C) as either coolant or fuel-carrier
salt. The lithium component must be **≥ 99.99% Li-7**, and some MSR
designs target **99.995% Li-7** to keep parasitic neutron capture and
tritium production within tolerable levels.

If MSRs scale (e.g., Kairos Power's KP-FHR program in the US, the
Chinese TMSR-LF1 in Wuwei, various commercial efforts), **world Li-7
demand could reach ~250 tonnes/yr**, two orders of magnitude above
current.

So the future for *both* isotopes is "kilograms today, tonnes in 2040,"
with the demand coming from different (but overlapping) energy
technologies.

---

## 3. Nuclear weapons (historical context)

This material is purely historical / declassified context. We document
it because it explains the entire industrial history of lithium isotope
enrichment, but the project is not building weapons.

**Lithium-6 deuteride (⁶LiD)** is the solid thermonuclear fuel used in
the secondary stage of hydrogen bombs. The fission primary detonates,
its neutrons strike the ⁶Li in the secondary, producing tritium, which
fuses with the deuterium for the bulk of the yield. This "dry" design
(no liquid tritium needed) made compact, deliverable thermonuclear
weapons possible.

**Castle Bravo (March 1, 1954)**: 15 megaton yield instead of the
predicted 4–6 megatons, primarily because designers had under-estimated
the tritium contribution from Li-7 (the ⁷Li(n,n'α)T endoergic reaction
turned out to be more productive than models suggested). Largest US
nuclear test; largest US accidental radiological release.

**US production at Y-12 Oak Ridge (1952–1963)**: 442 tonnes of enriched
LiOH (containing ~100 tonnes of Li-6) using the COLEX process, which
required ~11,000 tonnes of mercury. The mercury contamination at Y-12 —
upper East Fork Poplar Creek, Bear Creek, the soil and groundwater of
hundreds of acres — is one of the largest legacy environmental
problems in DOE history. Cleanup costs run in the billions and decades.

The COLEX process was retired in 1963 when the US weapons stockpile was
considered adequate. Russia continued producing Li-6 by COLEX/ELEX
methods into the 21st century. China developed its own COLEX-based
enrichment. Israel, North Korea, and other countries with thermonuclear
programs developed COLEX or comparable methods.

The takeaway for our project: **the only industrially-demonstrated
method for enriching Li-6 was a mercury-amalgam process that we
cannot revive in the modern regulatory environment.** Reproducing
COLEX's separation factor with non-toxic chemistry is the central
practical challenge of post-COLEX isotope separation.

---

## 4. Neutron detection (Li-6)

Cerium-activated **lithium-6 aluminosilicate glass scintillators**
exploit the high thermal-neutron cross-section. The reaction is:

$$ ^6\text{Li} + n \rightarrow ^4\text{He} (2.05 \text{ MeV}) + \text{T} (2.73 \text{ MeV}) $$

The triton and the alpha particle deposit their kinetic energy in the
glass, exciting Ce³⁺ luminescence centers, which emit detectable
photons. Enriched Li-6 glass is far more sensitive than natural-Li
glass.

Applications:
- Radiation portal monitors at borders / ports (homeland security)
- Oil-well logging (downhole neutron sources for porosity / saturation)
- Neutron radiography (industrial NDT, archaeology)
- Research reactor instrumentation

Demand is small but persistent: kilograms to tens of kilograms per year
worldwide. Recent advances include composite detectors of Li-6 glass
particles dispersed in organic scintillator matrices (*Nature
Communications Physics*, 2025).

---

## 5. Scientific applications

### Li isotopes as geochemical tracers

The relatively large fractional mass difference (~17%) means Li-6 and
Li-7 fractionate measurably during many geological processes:
weathering, hydrothermal exchange, biological uptake, mineral
crystallization. The **δ⁷Li** notation (deviation per mil from the
IRMM-016 standard, where ⁷Li/⁶Li = 12.33) is a standard tool in
geochemistry.

Examples of what δ⁷Li tells us:
- **Continental weathering rates** (incongruent weathering enriches
  Li-6 in clays, Li-7 in solution).
- **Seawater chemistry over time** (modern seawater δ⁷Li ≈ +30.8‰; has
  increased ~9‰ over the Cenozoic, possibly recording weathering
  and mountain-building history).
- **Hydrothermal systems** (mid-ocean ridge fluids vs. seawater
  signatures).
- **Subduction zones** (recycling of altered oceanic crust).

This is mostly a *measurement* application — geochemists need
high-precision mass spectrometry, but they don't need to enrich the
isotopes.

### Li-6 NMR and battery science

Li-6 has nuclear spin I = 1 (vs. Li-7's I = 3/2). Quadrupolar coupling
is weaker for Li-6, giving narrower NMR lines that resolve subtle
local environments. Researchers studying battery interfaces (the
solid-electrolyte interphase, SEI) often use **Li-6-enriched samples
as isotopic labels** to track how lithium moves through electrodes.

A recent example: Battistella et al., *ACS Energy Letters* (2026), used
depth-resolved Li-6 NMR to measure isotopic fractionation in operating
battery electrodes — a kind of "isotope-tagged microscopy."

For our project, this is a small but real consumer of enriched Li-6.

### Speculative biological work

Some emerging research suggests Li-6 vs. Li-7 may have subtly different
biological effects (e.g., on the kinetics of certain enzyme-catalyzed
reactions, perhaps related to nuclear-spin-dependent chemistry). This
is at the speculative end and largely unreplicated. We mention it for
completeness; do not over-weight it.

---

## Summary table — the demand picture

| Application | Isotope | Purity needed | Demand today | Demand 2040 (projected) |
|-------------|---------|---------------|--------------|-------------------------|
| Fusion blankets (DEMO/commercial) | Li-6 | 30–90% | ~0 commercial | tens of tonnes |
| ITER TBM (testing) | Li-6 | 90% | ~200 kg | (one-time test) |
| PWR coolant | Li-7 | ≥ 99.95% | ~1 t/yr world | ~1 t/yr world (steady) |
| MSRs | Li-7 | ≥ 99.99% (often 99.995%) | ~0 commercial | up to 250 t/yr |
| Weapons (existing arsenals) | Li-6 | 95%+ | classified | classified |
| Neutron detectors | Li-6 | 90%+ | tens of kg/yr | tens of kg/yr |
| NMR / battery labels / tracers | both | varies | kg/yr | kg/yr |

The dominant uncertainty is fusion. If fusion succeeds even modestly
(say, a handful of GW-class plants by 2050), demand for enriched
Li-6 jumps by 2–3 orders of magnitude. If fusion stalls, the niche
applications can probably be served by stockpile drawdown indefinitely.

This is why the field of Li-6/Li-7 separation research, dormant for
decades, has reactivated dramatically since ~2018.

## Common misconceptions

- **"Lithium-ion batteries need isotope separation."** No. Battery Li
  is natural-abundance.
- **"Fusion already has enough Li-6 because lithium is abundant."**
  Lithium is abundant; *enriched Li-6* is not. Natural Li is 7.59%
  Li-6; enrichment to ≥30% requires industrial isotope separation.
- **"COLEX is still operating."** Not in the US since 1963. Russia
  and China still operate COLEX-derived processes; the US relies on
  legacy stockpile + foreign supply.
- **"Li-7 is the leftover from Li-6 enrichment."** Yes, but it's not
  free: the COLEX byproduct stream is also Li-7-enriched and is also
  strategically valuable (PWRs, MSRs). Both isotopes have their own
  customers.
- **"There's no rush — fusion is decades away."** The inventory
  problem is decades-long-lead-time. A 100-tonne Li-6 inventory needs
  to be built up *before* a fusion plant turns on. Fusion designers
  are already worried.

## Connection to next

You now know **why** this problem matters. The next file covers the
**physics**: why isotopes have nearly identical chemistry but not
exactly, what the small differences are, what a separation factor α
means, and how cascading converts a tiny per-stage α into a usable
product.

## Self-check questions

1. Why does a fusion reactor need to *breed* its own tritium rather
   than buying it from a supplier? (Hint: think half-life and natural
   inventory.)
2. Why is the natural-abundance Li-6 fraction (7.59%) insufficient for
   fusion blanket applications? Walk through the TBR argument.
3. Ward et al. (2026) argues that financing the Li-6 *inventory* costs
   ~70× the annual *consumption* cost. What's the implication for
   fusion plant economics, and why does this make Li-6 enrichment
   capacity strategically urgent?
4. A PWR uses LiOH-7 to control coolant pH. Why is even 0.05% Li-6
   contamination a problem, given that the PWR primary loop is at
   ~2.2 ppm Li⁺? (Estimate the daily tritium production; you'll need
   the cross-section ~940 barns and a typical PWR neutron flux of
   ~10¹⁴ n/cm²/s.)
5. Is there any scenario in which lithium-ion batteries would benefit
   from isotopically separated lithium? Defend your answer.
