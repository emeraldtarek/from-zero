# 03 — Ion Separation in Water Treatment (the bridge to lithium)

## Prerequisite check

You've read `01-fundamentals.md` and `02-treatment-types-and-methods.md`.
You know what unit operations are, what dissolution and hydration mean,
and what a "treatment train" looks like.

This is the **load-bearing file** of this folder. Read carefully. Almost
every method in `03-lithium-isotope-separation/` is a variant of
something in this file.

## What "ion separation in water treatment" actually means

When dissolved ions are the target — water softening, demineralization,
desalination, brine processing, lithium recovery — water treatment uses a
small but powerful family of **ion-handling unit operations**:

1. **Ion exchange** (replace one ion with another via a solid resin).
2. **Membrane processes** (MF / UF / NF / RO — let some species through,
   block others, by size and charge).
3. **Electrodialysis** (ED / EDR — drive ions through ion-selective
   membranes with an electric field).
4. **Capacitive deionization** (CDI / MCDI — adsorb ions onto charged
   porous electrodes).
5. **Selective sorbents** (e.g., **lithium ion sieves** — manganese
   oxide, titanium oxide).
6. **Liquid-liquid extraction** (transfer ion from aqueous to organic
   phase via a selective extractant).

All six show up in the lithium-isotope-separation literature, sometimes
with the same equipment used for ordinary water treatment, sometimes with
modified materials. The chemistry of each is what we unpack below.

---

## 1. Ion exchange (IEX)

### Principle
A polymer bead carrying fixed ionic groups exchanges its mobile counter-
ion for a target ion in solution. Cation-exchange beads exchange
cations; anion-exchange beads exchange anions. The reaction is reversible:

$$ \text{R-SO}_3^- \cdot \text{Na}^+ + \text{Li}^+ \rightleftharpoons \text{R-SO}_3^- \cdot \text{Li}^+ + \text{Na}^+ $$

(R is the polymer backbone; SO₃⁻ is the fixed sulfonic-acid group of a
strong-acid cation resin.)

### Resin classification

| Type | Fixed group | Counter-ion | pH range | Regenerated with |
|------|-------------|-------------|----------|------------------|
| **Strong-acid cation (SAC)** | –SO₃⁻ | H⁺ or Na⁺ | full | HCl, H₂SO₄, NaCl |
| **Weak-acid cation (WAC)** | –COO⁻ | H⁺ | pH > 6 | acid |
| **Strong-base anion (SBA)** | –NR₃⁺ (quaternary amine) | OH⁻ or Cl⁻ | full | NaOH |
| **Weak-base anion (WBA)** | –NHR (tertiary amine) | Cl⁻ | acidic | NH₃ or Na₂CO₃ |

Typical exchange capacities: SAC 1.8–2.0 meq/mL; SBA 1.2–1.4 meq/mL.

### Selectivity coefficient and selectivity sequence

The **selectivity coefficient** $K_{AB}$ between two ions $A$ and $B$ is
defined by the equilibrium:

$$ K_{AB} = \frac{[A]_\text{resin} [B]_\text{solution}}{[B]_\text{resin} [A]_\text{solution}} $$

It tells you the resin's preference. For an SAC resin (8% DVB
crosslink), the values relative to H⁺ are approximately:

| Ion | Selectivity vs. H⁺ |
|-----|---------------------|
| Fe³⁺ | ~40 |
| Ca²⁺ | ~4.06 |
| Mg²⁺ | ~3.1 |
| K⁺ | ~2.0 |
| Na⁺ | ~1.56 |
| H⁺ | 1.0 (reference) |
| **Li⁺** | **~0.89** |

**Read that table again.** Lithium is at the **bottom** of the
selectivity series — *less* preferred than H⁺ on a standard SAC resin.
In a multi-ion brine, conventional ion-exchange resin will preferentially
hold Ca, Mg, K, Na — and let Li slip through. **This is exactly the
opposite of what you'd want for Li recovery from brines** using
conventional resin.

It's also why specialty sorbents (λ-MnO₂ ion sieves, see below) had to
be invented — they work by *steric* selectivity, not electrostatic
selectivity, and they can favor Li⁺ even in brines where Na/K/Mg/Ca are
orders of magnitude more concentrated.

### Selectivity drivers
1. **Higher charge is preferred** (3+ > 2+ > 1+) → ions with higher
   charge bind harder.
2. **Smaller hydrated radius is preferred among same-charge ions**
   → Cs⁺ > K⁺ > Na⁺ > Li⁺ on SAC because Li⁺'s tight hydration
   shell makes it effectively *bigger* in solution than the bare-ion
   trend would predict.
3. **Polarizability** also matters at second order.

### Regeneration
When the resin reaches its exchange capacity, it must be regenerated.
Pass a concentrated solution of the preferred counter-ion through; high
concentration drives the equilibrium back; mobilized target ions exit
in the regenerant stream as a concentrated brine. This is also how
isotope-separation columns are sometimes operated — fill the column
with one isotope, displace it with another, watch the small per-stage
α accumulate over many bed volumes.

### What it's used for
- **Water softening** (Na-form SAC removes Ca, Mg in exchange for Na).
- **Full demineralization** (H-form SAC + OH-form SBA in series → DI water).
- **Specialty applications**: nitrate removal, arsenic removal, nuclear
  decontamination, and (in modified form) lithium recovery and isotope
  separation.

### Bridge to lithium isotope separation
- Conventional organic SAC resin shows a *very* small α(⁷Li/⁶Li) of
  about 1.002–1.005 — too small to be industrially useful in a single
  column, but the basis of academic *displacement chromatography*
  separations that demonstrate the principle.
- Inorganic ion-exchangers (β-MnO₂, λ-MnO₂ — see "Lithium ion sieves"
  below) show α(⁶Li/⁷Li) ≈ 1.02–1.05, comparable to COLEX. Same hardware
  category (ion-exchange column), different chemistry (crystal-
  chemistry size-sieving rather than electrostatic exchange).

---

## 2. Membrane processes

### Hierarchy by size cutoff

| Process | Pore size | Pressure | Mechanism | Rejects |
|---------|-----------|----------|-----------|---------|
| **MF** | 0.1–10 µm | 0.1–2 bar | Size exclusion | Bacteria, protozoa, large colloids |
| **UF** | 0.01–0.1 µm | 1–5 bar | Size exclusion | Viruses, MW > 10,000 Da |
| **NF** | 0.001–0.01 µm | 5–20 bar | Size + Donnan exclusion | Divalent ions, NOM, partial monovalent |
| **RO** | 0.0001–0.001 µm | 10–80 bar | Solution-diffusion | Virtually all dissolved species (95–99.7% NaCl rejection) |

The first two (MF, UF) are particle filtration. The interesting ones for
ion separation are NF and RO.

### Nanofiltration (NF)
- Operates in a transition zone between size and charge effects.
- Membranes are typically thin-film composite (TFC) polyamide, with
  their dense top layer slightly negatively charged at neutral pH.
- **Donnan exclusion**: divalent anions (SO₄²⁻) repelled more strongly
  than monovalent (Cl⁻) by the negatively charged membrane → NF
  rejects sulfate while passing chloride.
- For cations: divalent (Ca²⁺, Mg²⁺) rejected more than monovalent
  (Na⁺, Li⁺, K⁺) — NF can be used as a "softener" while passing some
  monovalent salt.

### Reverse osmosis (RO)
- The polyamide active layer is so dense that water and ions transport
  by **solution-diffusion**: dissolve into the polymer matrix, diffuse
  across, re-emerge on the permeate side.
- Modern thin-film composite RO membranes reject 99–99.7% of NaCl.
- Drives the world's seawater desalination industry.

### Concentration polarization, fouling, scaling
Real-world membranes face three problems:
1. **Concentration polarization**: rejected solutes pile up against the
   membrane surface, raising local osmotic pressure and reducing flux.
2. **Fouling**: organics, biofilm, and colloids deposit on the surface.
3. **Scaling**: sparingly-soluble salts (CaCO₃, CaSO₄, SiO₂) precipitate
   as feed gets concentrated.

Mitigation: pretreatment, anti-scalants, periodic cleaning, recovery
limits.

### Bridge to lithium
- Standard RO does **not** distinguish between Li⁺ and other cations,
  and does not distinguish Li-6 from Li-7 — rejection is similar for
  all dissolved ions. So RO is a *bulk concentration* tool, not an
  isotope-separation tool.
- NF and **monovalent-selective NF** (a newer category) can favor Li⁺
  over Mg²⁺ in brines, useful for the *element-level* purification
  step before any isotope separation.
- Polymer-inclusion membranes (PIMs) and supported liquid membranes
  doped with crown-ether carriers are an active research area for
  Li-6/Li-7 separation. The "membrane" provides a thin selective barrier
  with crown ether as the isotope-discriminating chemistry.

---

## 3. Electrodialysis (ED) and electrodialysis reversal (EDR)

### Architecture

A **cell pair** in an ED stack: a cation-exchange membrane (CEM, lets +
through, blocks −) plus an anion-exchange membrane (AEM, the opposite),
sandwiching a "dilute" compartment between two "concentrate"
compartments. Stack many cell pairs (typically 100–600) between an
anode and cathode. Apply a DC voltage.

```
Anode  | C - D - C - D - C - D - ... - C |  Cathode
       AEM  CEM AEM CEM AEM CEM        CEM

Where C = concentrate compartment, D = dilute compartment
```

Cations in the dilute compartment migrate toward the cathode, pass
through the CEM into the next concentrate compartment, get blocked by
the AEM beyond. Anions go the other way. Net result: dilute streams get
desalted; concentrate streams get enriched.

### Electrode reactions
- Cathode: $2 e^- + 2 \text{H}_2\text{O} \rightarrow \text{H}_2 + 2 \text{OH}^-$
- Anode: $\text{H}_2\text{O} \rightarrow 2 \text{H}^+ + \frac{1}{2} \text{O}_2 + 2 e^-$
  (or, with chloride present, $2 \text{Cl}^- \rightarrow \text{Cl}_2 + 2 e^-$)

These produce H₂ and O₂ (or Cl₂) which must be vented; electrode streams
are typically isolated from process streams.

### Current efficiency

$$ \eta = \frac{z F Q_d (C_{d,\text{in}} - C_{d,\text{out}})}{N I} $$

where $z$ is the ion's charge, $F$ is Faraday's constant, $Q_d$ is dilute-
stream flow, $N$ is the number of cell pairs, $I$ is the current.
Commercial stacks target $\eta > 80\%$. Below that, you have water
splitting, shunt currents, or back-diffusion.

### Limiting current density
At high current, ion concentration at the membrane surface (in the
dilute compartment) approaches zero and water splitting takes over —
H₂O → H⁺ + OH⁻. Operating above the *limiting current density* (LCD)
damages membranes and is bad practice.

### EDR (the "R")
Periodically reversing the polarity flips which compartments are
"dilute" vs. "concentrate," sweeping scale-forming ions back into the
dilute side and avoiding scale buildup. Commercial workhorses for
brackish water and high-recovery applications.

### ED vs RO
- ED is more energy-efficient at *low* TDS (energy scales with TDS
  removed, not volume pumped).
- RO is more efficient at high TDS.
- ED can handle scaling-prone waters that RO can't.

### Bridge to lithium
- **Selective ED with monovalent-selective CEMs** is the leading
  membrane-based method for separating Li⁺ from Mg²⁺ in brines (the
  feed-prep step before any Li-6 enrichment).
- **ELEX (ELectroExchange / electromigration)** is a proposed mercury-
  free successor to COLEX that uses an electric field instead of an
  amalgam to drive isotope fractionation. Single-stage α is small
  (< 1.01) but the chemistry is benign.
- Faraday's law sets the minimum energy and the throughput of any ED-
  based isotope separator. **This is one of the central numbers of the
  field**: how much electrical energy per unit of separative work.

---

## 4. Capacitive deionization (CDI / MCDI)

### Principle
Two porous carbon electrodes; apply 0.8–1.4 V. Cations migrate to the
negative electrode and adsorb in the **electric double layer (EDL)** at
the carbon surface; anions go to the positive electrode. Reverse the
polarity and the ions are released back into a small volume of
concentrate brine.

### MCDI (membrane CDI)
Add an ion-exchange membrane in front of each electrode to prevent
co-ion expulsion during charging — improves charge efficiency and salt
removal.

### Faradaic / pseudocapacitive electrodes
Rather than passive double-layer adsorption, use materials that
*intercalate* the target ion (e.g., MnO₂, λ-MnO₂ ion sieves,
Prussian-blue analogs) for higher capacity and selectivity. Sometimes
called **electrochemical selective ion exchange (ESIX)** or hybrid CDI.

### Energy
0.1–1.0 kWh/m³ for low-TDS feeds (< 2,000 mg/L). Becomes impractical at
seawater TDS; capacity is limited by electrode surface area.

### Bridge to lithium
- **Conventional CDI** has poor selectivity between Li⁺ and Na⁺/K⁺.
- **Faradaic CDI with λ-MnO₂ electrodes**: highly selective for Li⁺
  via crystal-chemical sieving — and emerging research suggests these
  electrodes show small but real isotope discrimination too. **The
  battery-electrode-as-isotope-separator concept** (e.g., Yang group
  at Columbia, Banerjee group at Texas A&M) is one of the hottest
  current research directions in Li-6/Li-7 separation. We'll meet it
  again.

---

## 5. Selective ED and monovalent-selective membranes

### The selectivity problem
Standard cation-exchange membranes don't strongly distinguish Li⁺ from
Mg²⁺. In fact, the divalent Mg²⁺ is *preferentially absorbed* into the
membrane matrix by sheer Coulombic strength.

### Monovalent-selective CEMs
Composite membranes with a thin surface layer that adds steric or
electrostatic discrimination:

1. **Polycation surface layer** (polyethylenimine, polyaniline,
   quaternized chitosan): positively charged thin film repels the
   divalent cation more than the monovalent → Mg²⁺ rejected, Li⁺
   passes.
2. **Polyamide dense surface layer** (analogous to NF active layer):
   steric and dehydration effects. Mg²⁺'s much larger hydrated radius
   (0.43 nm vs. Li⁺'s 0.38 nm) and much higher hydration energy
   (−1921 kJ/mol vs. Li⁺'s −519 kJ/mol) mean a dense layer is harder
   for Mg²⁺ to traverse.

### Performance benchmarks
- Unmodified CEM Li/Mg permselectivity: ~1.5
- Selemion CSO / Neosepta CIMS (commercial PC-CEMs): 2–5
- Lab thin-film PEI-modified CEMs: > 5
- Optimized lab cells: 5.2 at 2.12 mA/cm² (Desalination 2024)

### Why this matters for the lithium project
**Element-level Li/Mg separation** is the *upstream* feed-prep step
before any isotope-level separation. Most lithium brines are ~10–100×
more Mg than Li by mass, and you have to strip out the Mg before you
can run any isotope-discriminating process — otherwise the Mg dominates
the chemistry.

The same physical reasoning (charge, hydrated radius, hydration energy)
that drives monovalent-selective ED *also* drives the small isotope
effects that lithium-isotope-separation methods rely on. The numbers are
just much smaller. Internalizing the analogy now will save you confusion
later.

---

## 6. Forward osmosis (briefly)

A semi-permeable membrane between a feed (low osmotic pressure) and a
**draw solution** (high osmotic pressure) lets water flow naturally
from feed to draw, no applied pressure. Then you regenerate the draw
solution (typically by RO or thermal evaporation) to recover clean
water. Niche use cases: brine pre-concentration before crystallization,
osmotic membrane bioreactors. Mostly tangential to the lithium project.

---

## 7. Lithium ion sieves (selective sorbents)

This is the **single most important section** of this file for the
lithium project, even though "ion sieve" sounds esoteric. λ-MnO₂ and
its cousins are the dominant industrial chemistry for Li recovery from
brines, and they are the bridge to several proposed isotope-separation
schemes.

### λ-MnO₂ (lithium manganese oxide ion sieve)

#### Synthesis
1. Make spinel Li₁.₆Mn₁.₆O₄ (LMO) by solid-state reaction at ~400 °C.
2. Treat with dilute acid → Li⁺ leaches out → leaves behind H₁.₆Mn₁.₆O₄
   (HMO, also called λ-MnO₂).
3. The empty 3D tunnel structure has tunnel diameter ~0.76 Å —
   *exactly* matched to the Li⁺ ionic radius.

#### Selectivity mechanism
Crystallographic size matching. Li⁺ fits the tunnels; Na⁺ (larger), K⁺
(much larger), Mg²⁺, Ca²⁺ (different geometry) do not. Selectivity is
overwhelmingly geometric, not just electrostatic.

#### Performance
- Adsorption capacity: 20–35 mg Li/g sorbent.
- Selectivity: Li⁺ >> Na⁺, K⁺, Mg²⁺, Ca²⁺.
- Best uptake at high pH (>10).
- Industrial use: packed columns, brine in → load Li → elute with
  dilute acid → Li-rich concentrate → carbonate precipitation → product.

#### Variants
- **Lithium titanium oxide (H₂TiO₃, LTO)**: better stability than LMO
  (Mn dissolution is the LMO weak point); similar Li uptake and
  selectivity.
- **Aluminum hydroxide-based (LiCl·2Al(OH)₃·nH₂O)**: used in some
  commercial brine-recovery operations (Livent / Albemarle).

### Bridge to lithium isotope separation

- **Element selectivity (Li vs Na, K, Mg, Ca)**: large, industrial.
- **Isotope selectivity (Li-6 vs Li-7)**: small but measurable.
  Inorganic ion sieves show α(⁶Li/⁷Li) ≈ 1.02–1.05 — comparable to
  COLEX. The same crystal-chemical mechanism that distinguishes Li
  from other elements also (subtly) distinguishes Li isotopes via
  zero-point energy differences in Li-O vibrational modes within the
  tunnel.
- **Electrochemical intercalation into LMO** (the ESIX concept,
  Section 4 above) is one of the most-watched current research
  directions: same sorbent, but driven by an applied voltage rather
  than equilibrium, with isotope discrimination potentially enhanced by
  kinetic effects.

---

## 8. Liquid-liquid extraction (LLX) — the COLEX precursor

### Principle
Two immiscible phases (aqueous + organic) in contact. A solute
distributes between them according to its partition coefficient
$D = c_\text{org}/c_\text{aq}$. Selectivity comes from chemistry that
makes the *target* partition strongly into one phase.

### Standard extractants for lithium-handling
- **Tributyl phosphate (TBP)**: classic Li-from-brine extractant.
  Phosphoryl-O coordinates Li⁺. Limited Li/Mg selectivity; some
  extractant loss to aqueous.
- **Crown ethers**: cyclic polyethers with ring-cavity sized to specific
  ions. **12-crown-4** has cavity ~1.2 Å, matching Li⁺. Selective for
  Li⁺ over larger cations.
- **Ionic liquids (ILs)**: room-temperature molten salts; tunable
  properties; combined with crown ethers for synergy.
- **Calixarenes** and other macrocyclic ligands.

### Bridge to lithium isotope separation
**Crown-ether LLX is the leading post-COLEX candidate** for
industrial-scale Li-6/Li-7 separation:

- Per-stage α(⁶Li/⁷Li): 1.03–1.057 (Cui et al. 2021, ion-pair B12C4
  / B15C5 systems).
- Mechanism: zero-point-energy difference in Li-O vibrations within the
  crown cavity → ⁶Li⁺ slightly prefers one phase over the other.
- Engineering challenge: **distribution coefficient $D_\text{Li}$ is
  very low** (10⁻⁵ for naive 12C4) — meaning huge volumes of organic
  phase per unit Li. Cui et al.'s ion-pair strategy with FeCl₃ as a
  Lewis acid raised $D_\text{Li}$ to 54 while keeping α at 1.038–1.049,
  a major advance.

This is exactly the chemistry COLEX used (mercury amalgam was acting as
an "extractant" with α ≈ 1.05) — but using a non-toxic organic
extractant instead of mercury. Whether it can be scaled to industrial
throughputs remains an open question.

---

## The summary mapping table — water treatment ↔ Li isotope separation

This table is the whole point of the file. Memorize the categories.

| Water-treatment unit operation | Li isotope separation analog | Mechanism | Per-stage α | Status |
|--------------------------------|-----------------------------|-----------|--------------|--------|
| LLX (crown ether or amalgam) | **COLEX** (mercury amalgam) | ⁶Li affinity for amalgam phase | ~1.05 | Abandoned (Hg toxicity) |
| LLX (crown ether) | Crown-ether LLX | Cavity-size + zero-point energy in Li-O | 1.03–1.057 | Active research; low $D_\text{Li}$ |
| Ion-exchange column (organic SAC) | Displacement chromatography | Differential exchange equilibrium | 1.002–1.005 | Proof-of-concept; very long columns |
| Ion-exchange column (inorganic Li sieve) | β-MnO₂ / λ-MnO₂ column | Crystal-chemical size + isotope ZPE | ~1.02–1.05 | Active research |
| Electrodialysis | ELEX / electromigration | Differential ⁶Li⁺ vs ⁷Li⁺ mobility | < 1.01 | Research; complex setup |
| CDI + Faradaic LMO electrode | ESIX / electrochemical intercalation | Selective Li⁺ insertion + kinetic isotope effect | Promising; not fully characterized | Hot research direction |
| Distillation | Liquid lithium / LiCl distillation | Vapor-pressure isotope effect | ~1.001–1.01 | Niche / academic |

The general principles you should walk away with:

1. **All these methods sit on the same engineering framework**:
   per-stage α, cascade arithmetic, mass + charge balance, energy
   per separative work.
2. **The chemistry is what changes**: from "Li-Hg amalgam vs. LiOH"
   (COLEX) to "Li⁺ in a crown-ether cavity vs. Li⁺ in water" (crown
   LLX) to "Li⁺ in λ-MnO₂ tunnel vs. Li⁺ in solution" (LMO column /
   ESIX) to "Li⁺ migrating through a CEM under applied field" (ELEX).
3. **Per-stage α values are small** (1.001–1.06) for any chemistry-
   based Li isotope method, vs. very large (>>10) for element-level
   methods like crystal sieving with λ-MnO₂. Cascading is what closes
   the gap.

## Common misconceptions

- **"Ion exchange is selective."** Selective by *element*, mostly
  controlled by charge and hydration; very weakly selective by
  *isotope*. Don't confuse these.
- **"RO can desalinate isotopes."** No. RO is bulk-rejection of any
  dissolved species; it has effectively zero isotope discrimination.
- **"Electrodialysis just moves ions in a straight line."** Real ED
  has water-splitting limits, concentration polarization, fouling,
  back-diffusion. Engineering-grade ED is sophisticated.
- **"Lithium ion sieves separate Li-6 from Li-7."** They primarily
  separate Li from *other elements*. Their isotope effect is real but
  small (α ~1.02–1.05) and an active research target.
- **"Membranes are passive filters."** Modern selective membranes are
  active in their selectivity logic — surface charge, dehydration
  energy cost, dielectric exclusion, ligand decoration. They're not
  just sieves; they're ion-recognition surfaces.
- **"COLEX worked, so it's solved."** It worked in a regulatory
  environment that no longer exists. Mercury contamination at Y-12
  Oak Ridge is a Superfund-tier legacy. *No* current US program could
  re-license a COLEX plant. Reproducing its α with non-toxic chemistry
  is the central task.

## Connection to next folder

You now have:
- The chemistry to read any sentence about ions, atoms, isotopes,
  bonds, and solutions (`01-chemistry-fundamentals/`).
- The engineering vocabulary of water treatment in general
  (`02-water-treatment/01-`, `02-`).
- The ion-handling unit operations and their mapping to lithium
  isotope separation (this file).

The next folder, `03-lithium-isotope-separation/`, is the deep dive on
the actual problem: physics of isotope separation, every method in
detail, current research, and the industrial / geopolitical context.

You're ready.

## Self-check questions

1. Why is Li⁺ at the *bottom* of the SAC ion-exchange selectivity
   series? Use hydration arguments.
2. NF and RO both reject NaCl, but NF passes more Cl⁻ than RO. What
   does this tell you about NF's mechanism vs. RO's?
3. In an ED stack with 100 cell pairs operating at 1 A, how many moles
   of monovalent ion are moved per second? (Use Faraday's law:
   F = 96,485 C/mol.) Why does cell-pair count matter?
4. λ-MnO₂ has a tunnel diameter ~0.76 Å. Why is this number not
   coincidental for Li⁺ selectivity, and what does it predict about
   selectivity vs. Na⁺ (radius 1.02 Å) vs. K⁺ (1.38 Å)?
5. The COLEX α of ~1.05 is the gold standard for current Li-6/Li-7
   separation R&D. Crown-ether LLX achieves α = 1.038–1.049. The
   challenge isn't the α — it's $D_\text{Li}$ (distribution coefficient
   into organic phase). What's the practical engineering consequence
   of low $D_\text{Li}$?
