# 03 — Existing Methods for Li-6 / Li-7 Separation

## Prerequisite check

You've absorbed `01-` (why) and `02-` (physics). You know what α means,
what a cascade is, why most lithium methods give per-stage α in the
1.001–1.06 range, and why some physical methods (laser, electromagnetic)
can hit α >> 10 at the cost of throughput.

This is the biggest file in the project. We are going to walk every
method category that has been demonstrated, deployed, or seriously
proposed. For each method:
- **Principle** (what it exploits)
- **Mechanism** (the chemistry/physics)
- **Per-stage α** (typical, from literature)
- **Throughput / scale** (laboratory, bench, pilot, industrial)
- **Status as of 2026** (active research, abandoned, deployed)
- **Key advantages and disadvantages**

Let's go.

---

## 1. COLEX — the historical workhorse

### Principle
Lithium isotopes equilibrate between two immiscible phases — aqueous
**lithium hydroxide solution** and a **lithium-mercury amalgam**
(Li dissolved in liquid Hg). Li-6 preferentially partitions into the
amalgam phase; Li-7 enriches in the hydroxide phase.

### Chemistry
The exchange equilibrium:

$$ ^7\text{Li}_\text{(amalgam)} + ^6\text{Li}^+_\text{(aq)} \rightleftharpoons ^6\text{Li}_\text{(amalgam)} + ^7\text{Li}^+_\text{(aq)} $$

The equilibrium constant — the separation factor — is

$$ \alpha = \frac{(^6\text{Li}/^7\text{Li})_\text{amalgam}}{(^6\text{Li}/^7\text{Li})_\text{aqueous}} \approx 1.05–1.06 $$

The mechanism is the equilibrium isotope effect on the Li-Hg metallic
bond (Hg coordinates Li in the amalgam) vs. the Li-OH₂ aqueous-solvation
bond. The chemistry favors slightly tighter Li-Hg bonding (lower
zero-point energy in the amalgam phase per unit reduced mass), which
favors Li-6 in the amalgam.

### Hardware
A countercurrent chemical-exchange column with hundreds of stages.
Liquid LiOH (aqueous, dilute) flows upward through plates; liquid
Li-Hg amalgam flows downward. The two phases interpenetrate as droplets
and films, equilibrating at each plate. Product (enriched Li-6) is
extracted from the amalgam at one end; depleted product (enriched Li-7)
exits at the other.

After extraction, the Li-6 amalgam is decomposed by reaction with water
to recover Li-6 (as LiOH) and free Hg, which is recycled.

### Industrial scale and history
- **Y-12 Oak Ridge, 1953–1963**: produced **442 tonnes of enriched
  LiOH** containing ~100 tonnes of Li-6. Required ~11,000 tonnes of
  mercury inventory.
- **Mercury contamination**: 700,000+ pounds of mercury released into
  the environment around the plant during operations. Decades and
  billions of dollars of cleanup; ongoing.
- **US shutdown**: 1963, when the weapons stockpile was deemed
  adequate. Y-12 retains the mercury legacy as a Superfund-tier site.
- **Russia**: continued COLEX/ELEX production into the 21st century at
  Novosibirsk Chemical Concentrates Plant (NCCP).
- **China**: developed COLEX-based plants for its own programs.
- **Other countries** with thermonuclear programs (UK Operation
  Crystal, France, Israel, North Korea — confirmed by ISIS report in
  2017) all built COLEX-class facilities.

### Per-stage α
$\alpha \approx 1.05$ — the gold standard against which all other
chemistry-based methods are measured.

### Status (2026)
Industrially abandoned in the West. Still operated in some form by
Russia and China for their own demand. **Cannot be relicensed in the
US, EU, or any jurisdiction with modern environmental standards.**
The replacement of COLEX with non-toxic chemistry is the central
practical problem of post-COLEX research.

### Advantages / disadvantages
| Advantages | Disadvantages |
|------------|---------------|
| Demonstrated industrial scale | Mercury (toxicity, contamination, scalability per Ward et al. 2026) |
| α ≈ 1.05 — the benchmark | No modern licensing path |
| Continuous operation | Vast Hg inventory required (engineering and economic) |
| Mature engineering | Decommissioning costs are enormous |

### A critical 2026 finding
**Ward et al. (arXiv 2605.04707, May 2026, preprint)** estimate that
scaling COLEX or any mercury-based process to commercial fusion demand
would require **mercury production roughly three orders of magnitude
larger than current global Hg output**. Even setting aside toxicity,
the physical Hg supply is the binding constraint. This is the most
sobering finding in the recent literature.

---

## 2. Electromagnetic separation (the calutron)

### Principle
**Mass-charge ratio discrimination** in a magnetic field. Ionize Li
atoms, accelerate them through a known voltage, deflect with a magnetic
field; ions of different mass curve into different radii and land in
different collectors.

### Chemistry / physics
A neutral Li vapor is generated (heated metal source), then ionized by
electron impact or arc discharge to produce Li⁺. The ions are
electrostatically accelerated (typically several keV) into a uniform
magnetic field perpendicular to motion. The Lorentz force curves them
into circular paths of radius

$$ r = \frac{mv}{qB} = \frac{1}{B} \sqrt{\frac{2 m V}{q}} $$

so heavier ions have larger radii. Two collector slits at different
radii catch the Li-6 and Li-7 streams.

### Hardware
A **calutron** (CALifornia University cycLOTRON) — invented by E.O.
Lawrence at Berkeley in WWII, originally for uranium isotope separation
at Y-12. The same hardware works for lithium with appropriate ion-
source modifications.

### Per-stage α
**Very high** — single-stage separation can take 7.59% to >>99% Li-6
in one pass.

### Throughput
**Very low** — milligrams to grams per day per machine. Calutrons are
research instruments, not production tools.

### Status (2026)
Used at ORNL and other research facilities for producing high-purity
isotope samples for science and detection applications. Not viable for
commercial-scale Li-6 enrichment.

### Use cases
Producing very small (g) quantities of high-purity (>99.99%) Li-6 or
Li-7 for scientific applications (nuclear physics, mass-spec
calibration standards, NMR samples).

---

## 3. Laser-based methods

### AVLIS — Atomic Vapor Laser Isotope Separation

#### Principle
Tune a laser to the **isotope-shifted** transition of one isotope and
selectively excite/ionize *only* that isotope. The selectively-ionized
atoms are deflected by a transverse electric field and collected.

#### Mechanism
For lithium, the relevant transition is the 670.8 nm $2S_{1/2} \to
2P_{3/2}$ "lithium D-line." Li-6 and Li-7 have transitions separated
by ~10 GHz (an isotope shift coming from finite-mass and finite-volume
nuclear effects). A narrow-bandwidth tunable dye laser or
diode laser can resolve this. A high-power laser excites the chosen
isotope to an intermediate state; a second laser ionizes from there
(two-photon ionization scheme).

#### Hardware
- Lithium vapor source (oven generating Li atomic beam).
- Tunable narrow-bandwidth laser system (multiple wavelengths for
  multi-step ionization).
- Ion collection optics.

#### Per-stage α
Very high — depending on configuration, single-pass enrichment can
take 7.59% to 50–99% Li-6.

#### Throughput
Moderate — kilograms per year achievable with engineering effort,
limited by laser power, ionization cross-section, and vapor flux.

#### Status (2026)
- **Hexium** (a US-based AVLIS startup with ASP Isotopes affiliation)
  is reportedly developing AVLIS for Li-6 commercial production.
  Public information is sparse; performance data largely confidential.
- **Active research** at national laboratories (LLNL, ORNL).
- The original USEC AVLIS program for uranium was canceled in 1999;
  the technology persists for non-uranium isotopes.

#### Advantages / disadvantages
| Advantages | Disadvantages |
|------------|---------------|
| Very high α — minimal cascading | High capital cost (lasers, vacuum) |
| No toxic chemistry | Throughput-limited |
| Continuous (in principle) | Complex operation |
| Selective | Vapor handling of reactive Li |

### MLIS — Molecular Laser Isotope Separation

Variant where the laser excites a *vibrational* mode of a Li-containing
molecule (e.g., LiBr, Li₂) rather than an atomic transition. The
isotopically-selected vibrationally-excited molecules can then be
photodissociated or chemically reacted preferentially.

For lithium, MLIS is much less developed than AVLIS — atomic AVLIS
gives larger isotope shifts than vibrational MLIS for light atoms.

---

## 4. Distillation

### Principle
Vapor pressure depends slightly on isotopic mass (heavier isotope ↔
lower vapor pressure, by zero-point-energy logic). Repeated boil-
condense cycles in a distillation column give a small per-stage
isotope enrichment.

### Lithium variants
- **Liquid lithium metal distillation**: Li boils at 1330 °C. The vapor
  is slightly enriched in Li-6 (lighter, higher vapor pressure).
  Per-stage α ≈ 1.001–1.005 (extremely small).
- **LiCl molecular distillation**: similar logic with the volatile
  LiCl. Slightly larger α.

### Hardware
Conventional distillation column (with appropriate metallurgy for hot
lithium).

### Per-stage α
**Very small** (1.001–1.01).

### Status
Mostly academic; not industrially competitive for lithium because the
small α requires a column with an enormous number of stages.

### Why we mention it
Vapor-pressure isotope effects are a *general* principle of separation,
and you'll see "could be improved by a distillation polishing step" in
process flowsheets occasionally.

---

## 5. Chemical exchange (non-mercury) — the leading post-COLEX category

### Crown ether liquid-liquid extraction (LLX)

#### Principle
A **crown ether** is a cyclic polyether with oxygen donor atoms pointing
into a central cavity. The ether cavity wraps around a metal cation,
coordinating it via lone-pair donation. The cavity size determines
which cation fits best.

For lithium:
- **12-crown-4** (12C4): cavity diameter ~1.2 Å — matches Li⁺ ionic
  radius (0.76 Å) well, much smaller than Na⁺ (1.02 Å), K⁺ (1.38 Å).
  Selective for Li⁺ over other alkalis.
- **15-crown-5** (15C5): cavity ~1.7 Å — better for Na⁺.
- **18-crown-6** (18C6): cavity ~2.7 Å — better for K⁺ or larger.
- **Benzo-12-crown-4 (B12C4)**, **benzo-15-crown-5 (B15C5)**,
  dibenzo derivatives — variants with aromatic rings affecting
  hydrophobicity and solubility.

#### Mechanism for isotope discrimination
The Li-O bonds inside the crown cavity have a different effective force
constant and zero-point energy than the Li-OH₂ bonds in aqueous
hydration. The system has a non-trivial isotope preference at
equilibrium. Typically Li-6 prefers one phase, Li-7 the other,
depending on the specific crown and solvent system.

#### Per-stage α
**1.02–1.057** for various crown-ether systems. Comparable to COLEX.

#### Engineering challenge: distribution coefficient $D_\text{Li}$
The fraction of Li⁺ that goes into the organic phase per equilibration.
For naive 12C4, $D_\text{Li}$ is **~10⁻⁵** — meaning huge volumes of
organic phase per unit Li separated. Practically unworkable.

#### Cui et al. 2021 — the ion-pair breakthrough
Cui and coworkers (cited in Badea et al. 2023, PMC10222844) introduced
**FeCl₃ as a Lewis acid** combined with crown ethers (B12C4, B15C5),
achieving:

- $D_\text{Li}$ = 54 (a >10⁶× improvement over naive 12C4)
- α(⁶Li/⁷Li) = 1.038–1.049 (still in the COLEX range)

This is **the most significant engineering advance** in non-mercury
chemical exchange in the past decade. Whether it scales remains to be
demonstrated.

#### Status (2026)
- **Active research worldwide**, including in Chinese, Korean, and US
  labs.
- **No industrial pilot** yet; lab-bench demonstrations only.
- The leading single-method candidate to replace COLEX.

#### Hardware
Counter-current mixer-settler cascades or pulsed columns, identical
in form to industrial solvent-extraction plants used in
hydrometallurgy.

### Calixarene / cryptand / synthetic-cage extractants

Variants of the crown-ether concept with three-dimensional ligand
geometries (cryptands enclose the cation in a cage; calixarenes have
upper / lower rim functionality). Selectivity for Li⁺ over other alkalis
can exceed crown ethers, but isotope selectivity (α) tends to be
similar or smaller. Active area of research.

### Ionic liquids (ILs)

Room-temperature molten salts (typically organic cation + bulky anion)
with negligible vapor pressure and tunable solvent properties. Used
as the organic phase in solvent-extraction systems with crown-ether
extractants for synergy. ILs alone give negligible isotope α; combined
with crown ethers they preserve the crown's α while improving
extractant retention and reducing solvent loss.

---

## 6. Ion-exchange chromatography

### Organic ion-exchange resins (SAC type)

Conventional sulfonated polystyrene-divinylbenzene (Dowex 50W-X8,
Amberlite IR-120) cation-exchange resins show very small but real
discrimination between Li-6 and Li-7. Per-stage α ≈ **1.002–1.005**.
Required column lengths: hundreds to thousands of theoretical plates.

#### Displacement chromatography
- Load Li⁺ band onto a column.
- Push it down the column with a displacing eluent (e.g., another
  cation).
- The traveling band sharpens at the front; the small per-step α
  accumulates.
- Front edges of the band become enriched in one isotope, trailing
  edges in the other.

#### Status
Demonstrated principle; not industrially competitive due to small α
and long columns.

### Inorganic ion-exchangers — λ-MnO₂, β-MnO₂, lithium ion sieves

The same materials introduced in `02-water-treatment/03-` — manganese-
oxide spinel-derived ion sieves with crystallographic Li-selective
tunnels. Per-stage α(⁶Li/⁷Li) ≈ **1.02–1.05**, comparable to COLEX.

#### Mechanism
The Li⁺ enters tunnels of dimension ~0.76 Å, where it is coordinated
to multiple oxide oxygens. Zero-point-energy difference in Li-O
vibrations within the tunnel vs. in solution gives the isotope
preference. The crystal lattice provides far more selective and
reproducible coordination than a flexible polymer resin, which is why
α is larger than for organic SAC resins.

#### Status
Active research; used for elemental Li recovery from brines (commercial
maturity in that role); under investigation for isotope separation.

### Lithium titanium oxide (H₂TiO₃ / LTO)

Similar concept to λ-MnO₂; layered titanate structure. Better chemical
stability (Mn dissolution is the LMO weak point). α values comparable.

---

## 7. Membrane methods

### Polymer-inclusion membranes (PIMs)

A polymer matrix (e.g., PVC, CTA — cellulose triacetate) infused with
a **carrier** molecule (typically a crown ether or its derivative) and a
plasticizer. Acts as a *selective transport medium*: the crown ether
binds Li⁺ on the feed side, carries it across the membrane, releases it
on the strip side.

- Per-stage α: similar to crown-ether LLX (1.02–1.05) but kinetically
  limited.
- Advantage: low extractant loss (carrier is trapped in polymer);
  continuous operation.
- Disadvantage: low Li⁺ flux compared to LLX.
- Status: active research, no industrial demonstration.

### Supported liquid membranes (SLMs)

A microporous polymer support saturated with a liquid carrier phase
(crown-ether-in-organic-solvent). Similar concept to PIMs but with a
liquid carrier rather than polymer-immobilized. Higher flux, but
carrier loss is a long-term reliability issue.

### Nanofiltration / RO with charged surfaces

Modified NF/RO membranes with charge-functionalized surface coatings
have been proposed for isotope separation. Mass-dependent transport
coefficients are very small in solution-diffusion membranes; reported
α typically < 1.01. Mostly speculative for lithium.

### MOF / COF membranes (active research, see file 04)

Metal-organic frameworks (MOFs) and covalent-organic frameworks (COFs)
with Li-selective binding sites (often crown-ether functionalized) can
in principle combine high flux (membrane format) with high α (chemistry
of the binding site). 2023–2024 papers report α up to 1.053. Stability
of MOF/COF membranes in real process conditions is the open challenge.

---

## 8. Electrochemical methods

### ELEX (ELectroExchange)

A non-mercury successor to COLEX, using **electrochemical driving
force** instead of phase-equilibrium with an amalgam. Various
configurations exist, but the basic idea: Li⁺ migrates through a
selective electrolyte (often a polymer or solid state electrolyte)
under an applied potential; isotope discrimination comes from
mass-dependent migration rates.

- Per-stage α: typically < 1.01.
- Status: research-stage, complex experimental setup.
- Investigated at Y-12 in the 1950s as a COLEX alternative; never
  scaled.

### ESIX (Electrochemical Selective Ion eXchange)

Uses a Faradaic electrode material — most prominently λ-MnO₂ or other
intercalation hosts — as the active interface. Apply a voltage; Li⁺
is **electrochemically intercalated** into the host lattice; reverse
the polarity to release the Li⁺ into a concentrated stream.

This combines **electrical driving force** (high throughput) with
**crystal-chemical selectivity** (high α). It is one of the most
exciting current research directions:

- The Faradaic ion-pump can exceed the equilibrium α by exploiting
  kinetic isotope effects in the intercalation step.
- Battery-cathode-style electrode materials (LiFePO₄, LiCoO₂, Li₄Ti₅O₁₂)
  can be used in adapted form.
- The **Carrillo / Banerjee group at Texas A&M** published a 2025
  *Chem* paper on ζ-V₂O₅ electrochemical intercalation that achieved
  COLEX-comparable single-cycle enrichment without mercury — the
  field's most-watched recent result.
- The **Yang group at Columbia** (Yuan Yang, SEAS) published the
  foundational finite-element modeling for electrochemical Li-isotope
  deposition (Wild, Jin, Yang 2022, *J. Electrochem. Soc.*).

### Faradaic capacitive deionization (Faradaic CDI)

A close cousin of ESIX: the same intercalation electrodes in a CDI
configuration. Two intercalation electrodes alternate between charge
and discharge, capturing and releasing Li⁺ from a flowing stream.
Continuous operation is possible. Active research.

### Status (2026)
- Electrochemical methods are arguably **the hottest research direction**
  in Li-6/Li-7 separation, driven by the convergence of (a) advances
  in battery electrode materials, (b) urgency from the fusion industry,
  and (c) elimination of mercury.
- No pilot-scale plants yet, but lab demonstrations are converging on
  the COLEX α benchmark.

---

## 9. MOFs / COFs / nano-porous materials

**Metal-organic frameworks** (MOFs) and **covalent-organic frameworks**
(COFs) are crystalline porous materials with engineered pore geometry
and chemistry. By incorporating crown-ether-like, calixarene-like, or
other Li⁺-selective binding sites *into* the framework, you can
combine the *selectivity* of the binding chemistry with the *high
surface area* and *defined geometry* of a crystalline porous host.

### Recent results (2023–2024)
- α up to **1.053** for select MOF/crown-ether composites.
- Selectivity for Li⁺ over Na⁺/K⁺/Mg²⁺ is also typically good.

### Open challenges
- **Stability in real process conditions** (acidic, high-salt aqueous
  brines or organic solvents): MOF stability is the field's central
  practical limitation.
- **Membrane integration**: making thin defect-free MOF films at
  industrial scale is hard.
- **Manufacturing cost**: most MOFs are expensive at large scale today.

### Status
Vibrant academic research; no pilot-scale demonstrations yet.

---

## 10. Plasma centrifuge

### Principle
Spinning ionized gas in a magnetic field at very high angular
velocities can separate species by mass, the way a gas centrifuge
separates UF₆ — but operating in the *plasma* regime (fully ionized)
allows much higher rotational speeds (driven by E×B drift in crossed
E and B fields).

### Why this matters for lithium
Lithium doesn't have a UF₆-equivalent gas-phase compound for ordinary
gas centrifuges. A plasma centrifuge can operate on lithium ion
plasma directly, at temperatures where Li is fully ionized.

### Marathon Fusion (San Francisco)
ARPA-E-funded startup ($3.63M, OPEN 2024 program, active March 2026).
Developing a plasma-centrifuge approach for Li-6 enrichment specifically
for fusion applications. No published performance data as of mid-2026.

### Status
Industrial concept under active development; performance unknown.
Potentially **very high single-stage α** if operated in the right
regime, with throughput sufficient for commercial Li-6 production.
"Highest-risk, highest-reward" entry in the field.

---

## 11. Biological / biomimetic methods

### Microbe-mediated fractionation

Some organisms (algae, bacteria) preferentially uptake one Li isotope
in their metabolic processes — analogous to how plants discriminate
C-12 vs. C-13 in photosynthesis. The fractionation factors are small
(typically α < 1.005) but the principle is biologically robust.

**Bangor University** (UK) has UKAEA funding (announced 2023) to
investigate microbe-mediated Li-6 fractionation as a long-term
biomimetic option. Status: early research; far from any practical
demonstration.

### Biomimetic ion channels

Synthetic ion channels modeled on biological Li-uptake proteins
(if any such proteins exist with usable selectivity). Very early
exploration.

---

## Comparative summary table

| Method | Per-stage α | Throughput | Toxicity / scalability | 2026 status |
|--------|-------------|------------|------------------------|-------------|
| COLEX (Hg amalgam) | 1.05 | Industrial | Hg toxic; Hg supply limit | Phased out in West |
| Electromagnetic (calutron) | >> 10 | g/yr | Clean | Research only |
| AVLIS | >> 10 | kg–t/yr | Clean | Hexium / ASP commercializing |
| Distillation | 1.001–1.01 | Industrial in principle | Clean | Academic |
| Crown-ether LLX | 1.02–1.057 | Bench (D_Li problem) | Clean | Active research; Cui 2021 breakthrough |
| Anthraquinone CE | up to 1.6 (lab) | Lab only | Unclear | Lab curiosity |
| Calixarenes / cryptands | ~1.03 | Bench | Clean | Active research |
| Ionic liquids + CE | ~1.04 | Bench | Clean | Active research |
| Organic IEX (SAC) | 1.002–1.005 | Bench | Clean | Demonstrated; long columns |
| Inorganic IEX (λ-MnO₂) | 1.02–1.05 | Bench → industrial | Clean | Active research |
| Polymer-inclusion membranes | 1.02–1.05 | Bench | Clean | Active research |
| Supported liquid membranes | 1.02–1.05 | Bench | Clean | Active research |
| MOF / COF composites | up to 1.053 | Bench | Clean (stability concern) | Active research |
| ELEX / electromigration | < 1.01 | Bench | Clean | Lab demos |
| ESIX / Faradaic CDI | TBD; Carrillo/Banerjee 2025 ≈ COLEX | Bench → pilot | Clean | Hottest direction (Yang, Banerjee, others) |
| Plasma centrifuge | Unknown | Designed for industrial | Clean | Marathon Fusion in development |
| Microbial / biomimetic | < 1.005 | Conceptual | Clean | UKAEA/Bangor early research |

## What this table means in practice

- **No method besides COLEX has ever demonstrated industrial-scale
  Li-6 enrichment.** Every other entry is at lab to bench scale.
- **The COLEX α benchmark (~1.05)** is the de facto target for
  chemistry-based replacements. ESIX/intercalation methods are
  approaching it; crown-ether LLX is at it but with workflow
  challenges; MOF/COF approaches are emerging.
- **Laser methods (AVLIS)** offer an entirely different scaling
  regime but require capital expenditure incompatible with current
  market sizes.
- **The plasma centrifuge** is the wildcard: if Marathon Fusion's
  approach works, it could leapfrog the entire chemistry-based
  literature.

## Common misconceptions

- **"COLEX could just be replaced with crown-ether LLX."** The
  chemistry can be replaced; the *engineering throughput* is far from
  matching, primarily because of low $D_\text{Li}$ in most crown
  systems. Cui 2021 helped, but pilot-scale demonstration is needed.
- **"AVLIS is too expensive to be practical."** Maybe — but the unit
  economics of fusion-grade Li-6 (€10⁵/kg) may make AVLIS
  competitive in ways it never was for uranium.
- **"Battery materials and fusion materials are completely different
  problems."** The convergence of intercalation chemistry from
  battery science and isotope-separation from nuclear engineering is
  arguably the most important methodological development in the
  field.
- **"Plasma centrifuges are science fiction."** Plasma centrifuges
  exist; the question is whether one can be engineered for the
  specific lithium use case at meaningful throughput. Active
  development.
- **"All these methods can be combined for super-high enrichment."**
  In principle yes — a multi-method cascade (e.g., crown-ether LLX
  for first 80%, AVLIS for final polishing) is reasonable. In
  practice no one has implemented this.

## Connection to next

You now have the methods. The next file (`04-current-research.md`)
zooms in on what's being published *right now* — the specific groups,
papers, claims, and open questions of 2024–2026.

## Self-check questions

1. Why does COLEX work at α ~1.05? Walk through the zero-point-energy
   argument for why Li-6 prefers the amalgam phase.
2. The crown-ether LLX literature reports α ~1.04 (similar to COLEX),
   but no industrial plant exists. What's the engineering bottleneck,
   and how did Cui et al. (2021) attack it?
3. Why is the throughput of AVLIS limited compared to COLEX, even
   though AVLIS has much higher per-stage α?
4. The Banerjee group's 2025 ζ-V₂O₅ paper applied a *battery electrode
   material* to isotope separation. Why was this conceptual move
   significant — what's the analogy that made it possible?
5. Plasma centrifuges, if they work, could give very high single-stage
   α at industrial throughput. Why is plasma a more attractive
   medium than gas (for lithium specifically)? Hint: think about
   what gas-phase compound of lithium you'd centrifuge.
