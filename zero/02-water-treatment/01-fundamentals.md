# 01 — Water Treatment Fundamentals

## Prerequisite check

You've absorbed `01-chemistry-fundamentals/`. You know what ions are, what
"dissolved" means, what hydration is. You don't need anything else.

## Rigorous statement

**Water treatment** is the set of physical, chemical, and biological
**unit operations** applied to a raw water stream to bring it to a
specified quality target. The quality target depends entirely on the
end use, which gives rise to several distinct **categories** of water
treatment, each with its own regulatory framework, economics, and process
toolkit.

A **unit operation** (a term coined in process engineering by
Arthur D. Little at MIT, 1915) is a discrete physical or chemical
transformation applied to a process stream — characterized by its own
governing equations, independently optimizable, and applicable regardless
of the surrounding process context. Sedimentation is a unit operation;
ion exchange is a unit operation; reverse osmosis is a unit operation.
A water-treatment plant is a *sequence* of unit operations — a "treatment
train" — chosen to bring feed water to product specs.

The analytical bedrock of every water-treatment unit operation is **mass
balance** and (for any unit handling charged species) **charge balance**.
At steady state, atoms in equals atoms out plus accumulation; charges in
equals charges out. These conservation principles, plus the local
equilibrium or transport law of the unit (Henry's law, Stokes' law,
solution-diffusion, Donnan equilibrium, Nernst-Planck), are how engineers
predict and design water-treatment systems.

## The categories of water treatment

Different feeds, different targets, different toolkits.

| Category | Feed TDS (mg/L) | Driver | Notes |
|----------|------------------|--------|-------|
| **Drinking water** | 50–1,000 | Public health (pathogens, chemicals) | SDWA in US; WHO globally |
| **Municipal wastewater** | mixed | Environmental protection | NPDES permits; treats sewage to receiving-water standards |
| **Industrial process water** | 50–5,000 | Process reliability (boilers, cooling, products) | Quality target depends entirely on the industry |
| **Desalination** (seawater / brackish) | 1,000–45,000 | Augment fresh water supply | RO-dominated worldwide |
| **Produced water** (oil & gas) | 3,000–300,000 | Reuse or compliant disposal | Some of the world's most challenging waters |
| **Brine processing / ZLD** (mining, lithium recovery) | 50,000–350,000 | Resource recovery; zero liquid discharge | Where lithium-from-brines and isotope separation start |

**TDS** = Total Dissolved Solids, in mg/L. The mass of dissolved
material per liter. Seawater is ~35,000 mg/L (3.5%); a lithium brine in
the Atacama can be tens to hundreds of thousands of mg/L.

For our project, the relevant categories are mostly **brine processing**
(where lithium is initially recovered from natural brines) and the
specialized **isotope-separation** processes that follow. But every
category teaches techniques and unit operations that someone has, at some
point, tried to retarget at the Li-6/Li-7 problem.

## Key parameters of water quality

A vocabulary list. Skim once; refer back as needed.

### Physical
- **Turbidity** (NTU): cloudiness. Surrogate for particulate / pathogen risk.
  Drinking water target: < 1 NTU; ideally < 0.3 NTU.
- **TDS** (mg/L): dissolved-solid mass per liter. Measured gravimetrically
  (evaporate at 180 °C, weigh residue) or estimated from conductivity.
- **Conductivity** (µS/cm or mS/cm): electrical conductance per length.
  Roughly proportional to TDS at fixed composition: TDS ≈ conductivity ×
  0.64 for typical groundwater. Easier to measure than TDS.
- **Color, odor, taste**: aesthetic criteria; often regulated as secondary
  standards.

### Chemical
- **pH**: a measure of [H⁺]. pH = −log₁₀[H⁺]. Drinking water target: 6.5–8.5.
  Affects coagulant chemistry, disinfectant speciation, corrosion,
  precipitation. **pH is one of the most consequential variables in any
  water-treatment process** — change pH and the whole equilibrium picture
  shifts.
- **Hardness** (mg/L as CaCO₃): concentration of divalent metal cations,
  primarily Ca²⁺ and Mg²⁺. Hard water (>150 mg/L) scales pipes and
  boilers. Softening = removing hardness.
- **Alkalinity** (mg/L as CaCO₃): buffering capacity, primarily from
  HCO₃⁻ and CO₃²⁻. Determines how much acid or base the water can
  absorb without big pH swings.
- **BOD** (Biochemical Oxygen Demand): how much O₂ microbes consume
  digesting the organics. Wastewater quality metric.
- **COD** (Chemical Oxygen Demand): O₂ equivalent of *all* oxidizable
  material. Higher than BOD; faster to measure.
- **Specific contaminants**: heavy metals (Pb, As, Hg, Cr⁶⁺), nitrate,
  fluoride, PFAS, disinfection byproducts (DBPs).
- **Ions of interest** for the lithium project: **Li⁺**, Na⁺, K⁺, Ca²⁺,
  Mg²⁺ on the cation side; SO₄²⁻, Cl⁻, HCO₃⁻ on the anion side.

### Biological
- **Pathogens**: bacteria (E. coli), viruses, protozoa (Giardia,
  Cryptosporidium). Removed/inactivated by filtration + disinfection.

## A brief historical arc

Useful context, because half the technology is older than your
grandparents and the other half is newer than you'd expect.

| Era | Event | Significance |
|-----|-------|--------------|
| ~1500 BC | Egyptians use alum to clarify water | First chemical treatment on record |
| 1804 | Thom slow sand filter, Scotland | First modern engineered filter |
| 1854 | John Snow links cholera to a London pump | Epidemiological birth of public-health engineering |
| 1880s | Pasteur's germ theory | Microbiological framework for disinfection |
| 1908 | First US chlorination, Jersey City | Massive typhoid/cholera reduction; chlorine becomes the workhorse |
| 1914 | First US federal bacteriological drinking-water standards | Federal oversight begins |
| 1953–1963 | **COLEX program at Y-12 Oak Ridge** | Mercury-amalgam Li-6 enrichment for thermonuclear weapons (this is your direct historical link to the lithium project) |
| 1960s–70s | Reverse osmosis matured; first commercial RO desalination | Membranes go from lab to industry |
| 1974 | Safe Drinking Water Act (US) | Modern federal regulatory framework |
| 1990s | Cryptosporidium outbreaks (Milwaukee 1993: 400,000 ill) | Drives membrane adoption (chlorine alone insufficient) |
| 2000s onward | Membrane bioreactors, advanced oxidation, electrochemical processes, monovalent-selective NF/ED | Current frontier |

For the lithium project, three pieces of this history matter:

1. **COLEX (Y-12 Oak Ridge, 1953–1963)** is the historical workhorse of
   industrial Li-6 enrichment. Mercury contamination at Oak Ridge — among
   the worst environmental cleanups in DOE history — is the reason COLEX
   was retired in the US. Replicating COLEX's separation factor with
   non-toxic chemistry is one of the central goals of current research.
2. **Membrane technology** (post-1960s RO; post-2010s monovalent-selective
   ED and NF) gave us the hardware for repurposed isotope-separation
   experiments.
3. **Lithium recovery from brines** (commercial-scale since the 1990s in
   the Atacama) gave us the entire vocabulary of brine processing, ion
   sieves (λ-MnO₂), and feed-pretreatment that any modern Li-6 program
   would build on.

## The unit-operation concept (and why it matters)

In industrial water treatment, the standard sequence for drinking water
is:

```
raw water →  coagulation → flocculation → sedimentation → filtration → disinfection → distribution
```

Each arrow is a unit operation (or process). Each is independently
optimizable. Each has its own governing equations. The whole train is the
*system*.

For brackish or seawater desalination:

```
raw water → MF/UF pretreatment → RO → post-treatment (remineralization)
```

For deionized industrial water:

```
raw water → filtration → SAC ion exchange → SBA ion exchange → mixed-bed polishing
```

For brine-based lithium recovery (the upstream of any Li-6 program):

```
raw brine → solar evaporation (concentration) → boron/Mg removal → Li sorbent column (λ-MnO₂) →
elution → Li₂CO₃ precipitation → product
```

The point is: **water treatment is modular**. You compose unit operations
the way you compose functions in software. This is the conceptual
inheritance that lithium isotope separation builds on.

A real isotope-separation plant might look like:

```
Li-bearing solution → pretreatment → cascade of N stages of [chemical-exchange / membrane / electrochemical]
                                  → enriched-product side; depleted-tails side → recycle
```

The **stage** is the atomic unit. **Cascading** stages multiplies a
small per-stage separation factor α into a usable product. The cascade
concept is the hardest thing to grasp from first principles, and it's the
beating heart of any isotope-separation process. We'll meet it again.

## Mass balance and charge balance — the analytical bedrock

Every unit operation, no matter how exotic, is constrained by the
conservation laws.

**Mass balance** on a control volume at steady state:

$$ Q_\text{in} \cdot C_\text{in} = Q_\text{out} \cdot C_\text{out} + Q_\text{waste} \cdot C_\text{waste} $$

where $Q$ = volumetric flow (m³/s) and $C$ = concentration (mg/L or mol/L).

**Charge balance** (electroneutrality) in any bulk aqueous phase:

$$ \sum z_i [M_i^{z_i+}] = \sum z_j [A_j^{z_j-}] $$

For ion-handling operations (ion exchange, electrodialysis), charge
balance dictates which ions can move and in what stoichiometry.

**Faraday's law** connects electric current to molar ion flux:

$$ \text{moles of monovalent ion moved} = \frac{\text{coulombs passed}}{F}, \quad F = 96{,}485 \text{ C/mol} $$

So 1 ampere flowing for 1 second moves $\frac{1}{96{,}485}$ moles of a
+1 ion across a charge-selective barrier. This is how electrodialysis is
*sized* in practice.

These three equations — mass balance, charge balance, Faraday — show up
constantly in lithium-separation literature. Internalize them now.

## Common misconceptions

- **"Water treatment is just adding chlorine."** It is a multi-stage
  industrial process. Chlorine is one tool among dozens.
- **"Pure water is what we want at the tap."** No — pure (deionized)
  water is corrosive and tastes terrible. Drinking water is *finished*
  water with controlled mineral content (≈100–500 mg/L TDS).
- **"All separation problems are hardness."** Hardness is divalent
  cations (Ca, Mg). Lithium separation is a different problem with
  different physics, even though the *equipment* may be similar.
- **"Reverse osmosis can do everything."** RO removes ~99% of dissolved
  ions, but it doesn't *select* between them — Li-6 and Li-7 (or even
  Li⁺ and Na⁺) come out at roughly equal rejection. RO is desalination
  hardware, not isotope-separation hardware.
- **"You can always use the same hardware for any salt water."**
  Compositions matter enormously: a brine with high boron, magnesium,
  or organics will foul or scale equipment optimized for clean brackish
  feeds. Real plants spend most of their engineering on
  **pretreatment**.

## Connection to next

You now know what water treatment is, what its categories are, and how
engineers talk about it. The next file (`02-`) gives you a tour of
the *non-ion* unit operations — coagulation, sedimentation, filtration,
disinfection — for vocabulary completeness. The file after that (`03-`)
is the load-bearing one: it covers ion-handling unit operations
(ion exchange, membranes, electrodialysis, lithium sorbents, crown-ether
extraction) and explicitly bridges them to lithium isotope separation.

## Self-check questions

1. What's the difference between a "unit operation" and a "unit
   process," and why does the distinction matter for engineers?
2. List the typical drinking-water treatment train. Why is each step
   in that order?
3. Brine-based lithium recovery operates on feeds with 50,000+ mg/L TDS.
   Why doesn't a typical drinking-water plant just process those
   directly?
4. The COLEX process is your historical bridge to Li-6 enrichment.
   What was the mechanism (one sentence) and why was it abandoned?
5. Faraday's law says 96,485 coulombs move 1 mole of a monovalent ion
   across a charge-selective barrier. Estimate the current required to
   move 1 mole of Li⁺ per minute through an electrodialysis cell. (You
   don't need a precise answer — just the order of magnitude.)
