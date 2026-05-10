# Water Treatment: Doctoral-Level Research Notes
## Purpose: Background for Lithium Isotope Separation Curriculum

**Compiled:** 2026-05-10  
**Scope:** Fundamentals, unit operations, ion-handling technologies, bridge to Li-6/Li-7 project  
**Primary sources:** EPA archive, Wikipedia (electrodialysis), ACS/PMC journal articles, Veolia/DuPont technical literature, COLEX process literature, Badea et al. 2023 (PMC10222844)

---

## PART A: WATER TREATMENT FUNDAMENTALS

### A.1 Definition and Scope

"Water treatment" is the set of physical, chemical, and biological unit operations applied to a raw water stream to bring it to a specified quality target. The quality target differs radically by end use, which produces distinct treatment categories:

| Category | Typical Input TDS (mg/L) | Key Driver | Regulatory Framework (US) |
|---|---|---|---|
| Drinking water (surface / ground) | 50–1,000 | Public health (pathogens, chemicals) | Safe Drinking Water Act (SDWA) 1974 + 1986/1996 amendments; EPA MCLs |
| Municipal wastewater | Mixed | Environmental protection (receiving waterbody) | Clean Water Act (CWA); NPDES permits |
| Industrial process water | 50–5,000 | Process reliability (boiler, cooling, product quality) | Effluent Guidelines (CWA §304) |
| Desalination (seawater/brackish) | 1,000–45,000 | Fresh water supply augmentation | State permits; no federal standard |
| Produced water (oil/gas) | 3,000–300,000 | Reuse/disposal compliance | EPA UIC (underground injection); state rules |
| Brine processing (mining, ZLD) | 50,000–350,000 | Resource recovery; discharge prohibition | Site-specific permits |

**Source:** TDS ranges for produced water: Duke Law Review (Challenges of Beneficially Reusing Produced Water, 2024); produced water TDS 3,000–300,000 mg/L confirmed by Texas Tech institutional review.

### A.2 Regulatory Drivers

**Drinking water (SDWA, 1974):**  
The Safe Drinking Water Act authorized EPA to set Maximum Contaminant Levels (MCLs) — enforceable upper limits — and MCLGs (goals, non-enforceable) for physical, chemical, radiological, and microbiological parameters. The 1962 Public Health Service standards (28 substances) were the precursor. As of 2024, EPA regulates >90 contaminants. The Stage 1 and Stage 2 Disinfectants and Disinfection Byproducts Rules (DBPR) specifically regulate trihalomethanes (TTHMs) at 80 µg/L and haloacetic acids (HAA5) at 60 µg/L.

**Municipal wastewater (CWA, NPDES):**  
The National Pollutant Discharge Elimination System (NPDES) under the Clean Water Act requires permits specifying effluent limits on BOD, TSS, nutrients (N, P), pathogens, and industrial constituents. Effluent Guidelines (technology-based) set national floors; water quality-based limits can be more stringent for sensitive receiving waters.

**Industrial:**  
EPA Effluent Guidelines (40 CFR Part 400 onward) define technology-based limits by industry category. Publicly Owned Treatment Works (POTWs) impose pretreatment standards (40 CFR Part 403) on industrial dischargers.

### A.3 Historical Arc

| Era | Event | Significance |
|---|---|---|
| ~4000 BC | Sanskrit/Greek writings on boiling, charcoal, sunlight for water | Earliest documented treatment methods |
| 1500 BC | Egyptian use of alum to coagulate suspended solids | First chemical treatment record |
| 1804 | Robert Thom slow sand filter, Scotland | First modern engineered filter |
| 1829 | James Simpson slow sand filter, London Chelsea Waterworks | First large-scale municipal slow sand filter |
| 1854 | Dr. John Snow links cholera to contaminated Broad Street pump | Epidemiological proof of waterborne disease |
| 1880s | Pasteur's germ theory | Microbiological framework for contamination |
| 1908 | First US chlorination at Jersey City, NJ | Chlorine becomes primary disinfectant; massive typhoid/cholera reduction |
| 1914 | US Public Health Service first federal bacteriological drinking water standards | Federal oversight begins |
| 1925/1946/1962 | PHS standards revised; 28 substances by 1962 | Steady expansion of regulated parameters |
| 1970s | Membrane development for reverse osmosis; ozonation advancements | Physical separation replaces sole reliance on chemicals |
| 1974 | SDWA enacted | Modern federal framework |
| 1980s–90s | Cryptosporidium outbreaks (Milwaukee 1993: 400,000 ill) | Chlorine-resistant pathogens drive membrane adoption |
| 1996 | SDWA amendments add source water protection, operator training | Systemic view |
| 2000s–present | Membrane bioreactors (MBR), advanced oxidation, electrochemical processes, nanofiltration for micropollutants | Current frontier |

**Source:** EPA-816-F-00-006, "The History of Drinking Water Treatment," February 2000 (EPA Archive). CDC/National Academy of Engineering named water treatment one of the top public health achievements of the 20th century.

### A.4 The Unit Operation Concept

In process engineering (originating with Arthur D. Little, 1915 MIT), a **unit operation** is a discrete physical or chemical transformation applied to a process stream, characterized by its own governing equations, independently optimizable, and applicable regardless of the surrounding process context. 

**Classification:**
- **Unit operations** (physical/mechanical): screening, sedimentation, filtration, centrifugation, aeration, distillation, membrane separation
- **Unit processes** (chemical/biological): coagulation (chemical destabilization), precipitation, disinfection, biological oxidation, ion exchange (chemical equilibrium-based)

Water treatment is inherently a sequential train of unit operations because no single operation addresses all contaminants simultaneously. A typical drinking water plant runs: **coagulation → flocculation → sedimentation → filtration → disinfection**. Industrial plants may add softening, activated carbon, ion exchange, or membrane polishing.

**Why the sequence matters:** Each unit operation has an optimal inlet water quality range. Suspended solids must be removed before membrane filtration (fouling). Organic matter must be reduced before chlorination (DBP formation). This "treatment train" logic is the conceptual backbone of water treatment engineering (Crittenden et al., *MWH's Water Treatment: Principles and Design*, 3rd ed., Wiley 2012).

### A.5 Key Parameters

**Physical:**
- **Turbidity** (NTU): light scattering by suspended particles; drinking water MCL = 1 NTU (surface water post-filtration), target ≤ 0.3 NTU. Surrogate for pathogen risk.
- **Total Dissolved Solids (TDS)** (mg/L): gravimetric measure of dissolved inorganic/organic constituents after evaporation at 180°C. Drinking water secondary standard: 500 mg/L (aesthetic).
- **Conductivity** (µS/cm or mS/cm): electrochemical surrogate for TDS; approximately TDS (mg/L) = conductivity (µS/cm) × 0.64 (varies by ion composition).
- **Color**, odor, taste: secondary aesthetic standards.

**Chemical:**
- **pH**: controls carbonate chemistry, disinfectant speciation (HOCl vs. OCl⁻), corrosion, precipitation reactions. Drinking water target: 6.5–8.5.
- **Hardness** (mg/L as CaCO₃): concentration of divalent cations, primarily Ca²⁺ and Mg²⁺. Hard water: >150 mg/L. Causes scale in pipes/boilers. Softening treatment target.
- **Alkalinity** (mg/L as CaCO₃): buffering capacity, primarily from HCO₃⁻, CO₃²⁻, OH⁻. Important for coagulant chemistry and corrosion control.
- **BOD** (Biochemical Oxygen Demand, mg/L): oxygen consumed by microbial degradation of organics over 5 days at 20°C (BOD₅). Wastewater quality metric. Typical secondary treatment effluent: BOD₅ < 30 mg/L.
- **COD** (Chemical Oxygen Demand, mg/L): oxygen equivalent of all oxidizable material (chemical oxidation with K₂Cr₂O₇). Higher than BOD; more rapid. Ratio COD/BOD indicates biodegradability.
- **Specific contaminants**: heavy metals (Pb, As, Hg, Cr⁶⁺), nitrate (MCL: 10 mg/L as N), fluoride (MCL: 4 mg/L), PFAS (new MCLs 2024: PFOA 4 ng/L), DBPs.
- **Ions of interest**: Na⁺, K⁺, Ca²⁺, Mg²⁺, Li⁺, SO₄²⁻, Cl⁻, HCO₃⁻, NO₃⁻.

**Biological:**
- **Pathogens**: bacteria (E. coli, Salmonella), viruses (norovirus, hepatitis A), protozoa (Giardia, Cryptosporidium). Total coliform rule and E. coli rule (SWTR, IESWTR).
- **Turbidity** doubles as a pathogen surrogate.

### A.6 Mass and Charge Balance as Analytical Bedrock

**Mass balance** (conservation of matter) on a control volume (unit operation):

$$\text{Accumulation} = \text{In} - \text{Out} + \text{Generation} - \text{Consumption}$$

At steady state (accumulation = 0):

$$Q_{in} \cdot C_{in} = Q_{out} \cdot C_{out} + Q_{waste} \cdot C_{waste}$$

where Q = volumetric flow (m³/s or m³/d), C = concentration (mg/L or mol/L). For physical separations with no generation or consumption, this simplifies to a straightforward split-factor equation.

**Charge balance** (electroneutrality in solution): the sum of positive charges (cations × valence) must equal the sum of negative charges (anions × valence) in any bulk aqueous phase:

$$\sum z_i \cdot [M_i^{z_i+}] = \sum z_j \cdot [A_j^{z_j-}]$$

In ion exchange and electrodialysis, charge balance governs which ions migrate and in what stoichiometry. In electrochemical processes, Faraday's law connects current (charge flow rate) to molar flux of ions: 1 mole of monovalent ion per 96,485 coulombs (1 Faraday).

**Water recovery** in membrane systems: R = Q_permeate / Q_feed. Typical RO: 50–85%. Concentrate/brine stream carries rejected solids.

---

## PART B: TREATMENT UNIT OPERATIONS

### B.1 Coagulation and Flocculation

**Principle:** Natural surface waters contain colloidal particles (1 nm – 1 µm) stabilized by negative surface charge (zeta potential, typically −20 to −40 mV). Brownian motion keeps them suspended. Coagulation neutralizes surface charge; flocculation aggregates the destabilized particles.

**Four destabilization mechanisms** (DLVO theory + empirical):
1. **Double-layer compression** (ionic strength increase): added electrolytes compress the electrical double layer, reducing repulsion.
2. **Adsorption and charge neutralization**: coagulant cations (Al³⁺, Fe³⁺) adsorb directly onto particle surfaces.
3. **Sweep/enmeshment flocculation**: metal hydroxide precipitates (Al(OH)₃, Fe(OH)₃) form a voluminous floc that physically entraps particles.
4. **Polymer bridging**: long-chain polymers adsorb onto multiple particles simultaneously.

**Coagulants:**
- Alum (aluminum sulfate, Al₂(SO₄)₃·18H₂O): most common, optimal pH 6–8, forms Al(OH)₃.
- Ferric sulfate/ferric chloride: broader pH range (5–9), denser/stronger floc.
- Polyaluminum chloride (PACl): pre-hydrolyzed, lower sludge, better low-temperature performance.
- Cationic polymers: supplement or replace inorganic coagulants; lower sludge volumes.

**Rapid mix** (coagulation): G (velocity gradient) ~700–1000 s⁻¹, contact time 1–2 min.  
**Slow mix** (flocculation): G ~20–80 s⁻¹, contact time 20–40 min; too high G breaks flocs.

**What it removes:** Turbidity, NOM (natural organic matter), microorganisms, colloidal metals. Enhanced coagulation (higher dose, lower pH) removes DBP precursors.

**Limitations:** Chemical sludge (biosolids) requiring disposal; pH sensitivity; adds dissolved ions (sulfate, residual Al³⁺); not effective against dissolved species.

### B.2 Sedimentation / Clarification

**Principle:** Gravity settling of particles based on Stokes' law:

$$v_s = \frac{(\rho_p - \rho_w) g d_p^2}{18 \mu}$$

where v_s = settling velocity, ρ_p = particle density, ρ_w = water density, g = gravity, d_p = particle diameter, µ = dynamic viscosity.

**Types:**
- **Conventional clarifiers**: horizontal flow, surface overflow rate (SOR) typically 20–40 m/d for flocculated water.
- **Tube settlers / lamella plates**: inclined surfaces increase effective settling area, reduce footprint by 4–8× vs. conventional.
- **Dissolved Air Flotation (DAF)**: for low-density particles/algae; air bubbles adhere to particles, float to surface for skimming.

**What it removes:** Coagulated particles, flocs, large suspended solids.  
**Byproduct:** Sludge (water content 95–99%); requires thickening and dewatering.

### B.3 Filtration

**Rapid Sand Filtration (RSF):**  
- Particle removal through straining, interception, settling (within bed), and adsorption onto media.
- Sand grain size 0.5–1.5 mm, bed depth 0.6–0.9 m, filtration rate 5–15 m/h.
- Backwashing required when headloss exceeds limit (~2.5–3 m). Backwash water: 2–5% of treated water.
- Removes: floc particles, turbidity, microorganisms (with prior coagulation).

**Multimedia Filtration:**  
- Anthracite (top, coarse), sand (middle), garnet (bottom, fine) in stratified layers.
- Coarser-to-finer depth allows more solids storage, longer filter runs.

**Slow Sand Filtration (SSF):**  
- Flow rate: 0.1–0.3 m/h (10–30× slower than RSF).
- Biological action (Schmutzdecke — biological mat on surface) provides pathogen removal and organic degradation.
- No coagulation required; effective for turbidity < 10 NTU.
- Advantage: simple, no chemicals; disadvantage: large land area, cold-climate limitations.

**Granular Activated Carbon (GAC):**  
- Adsorption of NOM, trace organics, taste/odor compounds, some pesticides.
- Empty Bed Contact Time (EBCT) typically 5–20 min.
- Breakthrough curve analysis determines regeneration cycle (thermal or steam).
- BET surface area: 500–1,500 m²/g (activated carbon).

**Limitations of filtration:** Does not remove dissolved species (ions, small molecules); effective only for particulates and adsorbable organics.

### B.4 Disinfection

**Purpose:** Inactivation (not necessarily removal) of pathogens. CT concept: C (disinfectant concentration, mg/L) × T (contact time, minutes) gives log-inactivation credit.

**Chlorine (Cl₂):**  
- Dissolved as HOCl (effective) and OCl⁻ (less effective); ratio depends on pH: pKa = 7.5.
- At pH 7: ~50% HOCl, 50% OCl⁻. At pH 6: ~90% HOCl.
- CT for 3-log Giardia inactivation: ~55 mg·min/L (HOCl at 5°C, pH 7).
- **Disinfection byproducts (DBPs):** Reaction of Cl₂ with NOM produces Trihalomethanes (THMs, primarily chloroform, CHCl₃) and Haloacetic Acids (HAAs). EPA Stage 2 DBPR: TTHMs ≤ 80 µg/L, HAA5 ≤ 60 µg/L. DBP formation is the primary driver for switching to alternative disinfectants.

**Chloramine (NH₂Cl):**  
- Formed by adding NH₃ after Cl₂. More stable (longer residual), lower DBP formation.
- Less effective for Cryptosporidium. Can form NDMA (N-nitrosodimethylamine) with some precursors.

**Ozone (O₃):**  
- Powerful oxidant (E° = +2.07 V); rapid inactivation of Cryptosporidium (CT ~1 mg·min/L for 3-log).
- Generates bromate (BrO₃⁻) from bromide-containing waters (MCL: 10 µg/L).
- No residual; requires secondary disinfection with Cl₂ or chloramine.
- Also used for taste/odor control and NOM oxidation (ozonation + biological filtration = BAC).

**UV Radiation:**  
- Disrupts DNA at 254 nm (mercury lamp) or broad UV-C (LPUV, MLSS, or UV-LED).
- Effective against Cryptosporidium and Giardia at fluences of 10–40 mJ/cm².
- No chemical addition; no DBPs; no residual. Requires pre-treatment for turbidity < 1 NTU.

**Peracetic Acid (PAA):**  
- Emerging disinfectant in wastewater; low DBP formation; biodegradable.
- Not yet widely used in drinking water.

### B.5 Aeration / Stripping

**Principle:** Gas-liquid mass transfer governed by Henry's law: at equilibrium, the partial pressure of a gas above a solution is proportional to its dissolved concentration (p = H·C, where H = Henry's law constant). High-H compounds (volatile) favor transfer from water to air.

**Air stripping applications:**
- Removal of VOCs (chloroform, TCE, PCE, benzene) from groundwater.
- Ammonia removal from wastewater (ammonia stripping; high pH required to shift NH₄⁺ → NH₃).
- CO₂ and H₂S removal from groundwater.

**Equipment:** Packed towers (countercurrent air–water), diffused aeration basins, spray nozzles, cascade aerators.

**Limitation:** Henry's constant must be sufficiently high (H > ~10⁻⁵ atm·m³/mol). Ammonia has a relatively small H, so air:water ratios of 300–500:1 are needed for effective stripping. Transfer efficiency drops at low temperatures.

### B.6 Adsorption (Activated Carbon, Zeolites)

**Activated Carbon (AC):**  
- Source materials: coal, coconut shell, wood. Activation (steam or CO₂ at 800–1,000°C) creates porous structure.
- Surface areas: 500–1,500 m²/g (BET method).
- Adsorption isotherms (Freundlich or Langmuir) describe equilibrium between solution concentration and adsorbent loading.
- GAC (granular) used in fixed beds; PAC (powdered) added to coagulation basin.
- Removes: NOM, taste/odor (geosmin, 2-MIB), pesticides, pharmaceuticals, some heavy metals.
- Regeneration: thermal (at 800°C furnace) loses ~5–10% capacity per cycle. Steam regeneration for some VOCs.

**Zeolites:**  
- Crystalline aluminosilicates with regular microporous structure (pore diameter 0.3–1.0 nm).
- Natural zeolites (clinoptilolite) and synthetic (A, X, Y types).
- Ion exchange capability (Si/Al ratio determines charge density and selectivity).
- Used for: ammonium removal (clinoptilolite; selectivity: NH₄⁺ > K⁺ > Na⁺), heavy metal removal, radionuclide capture (Sr-90, Cs-137 from nuclear wastewater).
- Unlike organic resins, zeolites are thermally stable and radiation-resistant.

**Breakthrough curve:** Effluent concentration rises from zero as adsorption sites saturate. Breakpoint (typically defined at 10% of inlet C) determines when bed must be taken offline for regeneration.

**Empty Bed Contact Time (EBCT):** Volume of adsorbent bed / volumetric flow rate. Typical GAC: 5–30 min EBCT.

### B.7 Distillation (Multi-Effect / Multi-Stage Flash)

**Multi-Stage Flash (MSF):**  
- Heated seawater enters a series of stages at successively lower pressures; water "flashes" into steam.
- Steam condenses on heat exchange tubes, producing distillate.
- Energy consumption: 13.5–25.5 kWh/m³ (thermal equivalent ~10–16 kWh_thermal/m³ + ~3–5 kWh_electric/m³).
- **Source:** ASEE Peer conference, Environmental Impact Cost Analysis, 2024.
- Historically dominant in Gulf states; robust to high-TDS seawater (>45,000 mg/L TDS); tolerant of scaling.

**Multiple Effect Distillation (MED):**  
- Steam from first effect (evaporator) serves as heat source for next effect at lower pressure.
- Electrical consumption: < 1.0 kWh/m³ (Veolia technical literature); total energy lower than MSF.
- More energy efficient than MSF; increasingly competitive with RO for thermal energy-rich sites.

**Role in water treatment:** Thermal desalination produces high-purity distillate but is capital and energy intensive. Modern seawater desalination has largely shifted to RO (lower energy ~3–5 kWh/m³), but MSF/MED persist where cheap heat is available (co-generation plants).

**Byproduct:** Concentrated brine at 2× feed salinity (for once-through); disposal is a significant environmental challenge.

### B.8 Chemical Precipitation

**Lime softening (hardness removal):**  
Carbonate hardness (Ca(HCO₃)₂) removed by adding Ca(OH)₂ (lime):

$$Ca^{2+} + 2HCO_3^- + Ca(OH)_2 \rightarrow 2CaCO_3 \downarrow + 2H_2O$$

Non-carbonate hardness (CaSO₄, MgSO₄) requires soda ash (Na₂CO₃):

$$Ca^{2+} + Na_2CO_3 \rightarrow CaCO_3 \downarrow + 2Na^+$$

Magnesium removal requires raising pH > 11:

$$Mg^{2+} + 2OH^- \rightarrow Mg(OH)_2 \downarrow$$

Achievable hardness: ~30–50 mg/L as CaCO₃ (theoretical solubility limit ~17 mg/L). **Source:** WVU Lime Softening fact sheet; MRWA Chapter 16.

**Heavy metal precipitation:**  
- pH adjustment to form metal hydroxide precipitates (Pb(OH)₂, Cu(OH)₂, Zn(OH)₂).
- Sulfide precipitation (Na₂S or NaHS): very low solubilities for CdS, PbS, HgS (Ksp ~ 10⁻²⁸ for HgS). More effective at lower concentrations than hydroxide precipitation.
- Carbonate precipitation: CaCO₃ trapping of heavy metals.

**Byproduct:** Calcium carbonate sludge (lime softening residual); metal hydroxide sludge requiring TCLP testing for disposal classification.

**Limitations:** Cannot efficiently remove trace levels of many metals; not effective for dissolved species that don't precipitate; pH must be carefully managed to avoid re-dissolution.

---

## PART C: ION-HANDLING AND MEMBRANE TECHNOLOGIES

### C.1 Ion Exchange Resins

**Principle:**  
Ion exchange resins are cross-linked polymer matrices (typically styrene-divinylbenzene copolymer, with 4–12% DVB crosslink controlling swelling and rigidity) bearing covalently attached functional groups that carry a fixed charge. Counter-ions (mobile ions of opposite charge) are held in the resin by electrostatic attraction and can exchange with ions in the surrounding solution.

**General exchange reaction (cation exchanger, sodium form, regeneration with H⁺):**

$$R-SO_3^-Na^+ + Ca^{2+} \rightleftharpoons R-SO_3^-Ca^{2+/2} + Na^+$$

**Types by functional group:**

| Type | Fixed Group | Counter-ion | pH Range | Typical Regenerant |
|---|---|---|---|---|
| Strong Acid Cation (SAC) | –SO₃H (sulfonic acid) | H⁺ or Na⁺ | Full range (1–14) | H₂SO₄ or HCl (H-form); NaCl (Na-form) |
| Weak Acid Cation (WAC) | –COOH (carboxylic acid) | H⁺ | pH > 6 only | HCl or H₂SO₄ |
| Strong Base Anion (SBA) | –N(CH₃)₃⁺ (quaternary amine) | OH⁻ or Cl⁻ | Full range | NaOH |
| Weak Base Anion (WBA) | –NH₂, –NHR (tertiary/secondary amine) | Cl⁻ | Acidic conditions | NH₃ or Na₂CO₃ |

**SAC resins** (demineralization, softening): capacity 1.8–2.0 meq/mL. SBA resins: 1.2–1.4 meq/mL. **Source:** Axeon Water technical documentation.

**Selectivity and separation factor:**  
Ion exchange selectivity is governed by ionic charge (higher valence preferred), hydrated ionic radius (smaller hydrated radius preferred), and polarizability. The **selectivity coefficient** (K_ij^B, where B is a reference ion) is defined:

$$K_{AB} = \frac{[A]_{resin} \cdot [B]_{solution}}{[B]_{resin} \cdot [A]_{solution}}$$

For strong acid cation resin (8% DVB crosslink), approximate selectivity order and relative values vs. H⁺:

| Ion | Selectivity Coefficient vs. H⁺ |
|---|---|
| Fe³⁺ | ~40 |
| Ca²⁺ | ~4.06 |
| Mg²⁺ | ~3.1 |
| K⁺ | ~2.0 |
| Na⁺ | ~1.56 |
| H⁺ | 1.0 (reference) |
| Li⁺ | ~0.89 |

**Source:** Dow/Dupont selectivity coefficient documentation; Lenntech Dowex technical fact sheet (selectivity coefficient for Na vs H = 1.56, Ca vs H = 4.06 cited).

**Critical note:** Li⁺ has the *lowest* selectivity of all common cations on conventional SAC resin (K < 1 vs. H⁺), which means it is the hardest to retain and the easiest to displace. This is a directly relevant fact for the parent project.

The **separation factor α** between two competing ions A and B is related to selectivity coefficients:

$$\alpha_{A/B} = \frac{K_{AH}}{K_{BH}}$$

**Selectivity sequence (SAC resin):** Fe³⁺ > Cr³⁺ > Al³⁺ > Ca²⁺ > Mg²⁺ > K⁺ > Na⁺ > H⁺ > Li⁺  
**Source:** SCI/IEX Resin Selection paper (SOCI 2012 conference): "Cation Resin selectivity: Fe > Ca > Mg > K > Na > H. Sodium leaks first."

**Regeneration cycle:** When resin reaches exchange capacity (exhaustion), it is regenerated by passing a concentrated solution of the preferred counter-ion (HCl or H₂SO₄ for H-form, NaCl for Na-form). Regenerant concentration drives the equilibrium back. Volume of regenerant: typically 2–4 bed volumes at 5–10% concentration.

**Industrial applications:**
- **Water softening:** Na-form SAC, removes Ca²⁺/Mg²⁺, regenerates with NaCl brine.
- **Full demineralization (deionization):** H-form SAC + OH-form SBA in series (or mixed bed): removes all ions to produce DI water (conductivity < 1 µS/cm).
- **Nitrate removal:** SBA selective for NO₃⁻.
- **Arsenic removal:** SBA or specialty chelating resins.
- **Nuclear decontamination:** selective resins for Cs, Sr, actinides.

**Limitations:** Resin is exhausted by all ions in feed (not selective in multi-ion systems unless specialty resins used); regeneration produces high-TDS brine requiring disposal; limited by ion concentrations and interference.

### C.2 Membrane Processes

**Classification by size-exclusion hierarchy:**

| Process | Pore Size | Operating Pressure | Mechanism | Rejects |
|---|---|---|---|---|
| Microfiltration (MF) | 0.1–10 µm | 0.1–2 bar | Size exclusion | Bacteria, protozoa, large colloids |
| Ultrafiltration (UF) | 0.01–0.1 µm | 1–5 bar | Size exclusion | Viruses, macromolecules (MW > 10,000 Da) |
| Nanofiltration (NF) | 0.001–0.01 µm | 5–20 bar | Size exclusion + Donnan exclusion | Divalent ions (Ca²⁺, Mg²⁺, SO₄²⁻), NOM; partial monovalent removal |
| Reverse Osmosis (RO) | 0.0001–0.001 µm | 10–80 bar | Solution-diffusion | Virtually all dissolved species |

**Source:** Multiple sources confirm pore hierarchy; TWDB Texas report, Safewater.org, and manufacturer specs.

**MF and UF mechanism — size exclusion:**  
Water and solutes smaller than pore size pass through; larger particles are rejected. Transport is primarily convective (pressure-driven). UF is used as pretreatment before RO or NF.

**NF mechanism — combined:**  
NF operates in a transition zone: size exclusion for larger molecules, but **Donnan exclusion** (charge effects) also plays a role. Divalent anions (SO₄²⁻) are rejected more strongly than monovalent (Cl⁻) due to stronger electrostatic repulsion by the negatively charged polyamide membrane surface. This gives NF its characteristic "softening" capability — removes hardness (Ca²⁺, Mg²⁺, SO₄²⁻) while passing much of the monovalent salt (NaCl).

**RO mechanism — solution-diffusion:**  
No true "pores" in the conventional sense. Transport occurs by dissolution of water into the membrane polymer matrix, diffusion across, and re-evaporation on the permeate side. Solutes (ions) have much lower diffusion rates through the dense polyamide layer. Salt rejection: 95–99.8% for NaCl, with modern thin-film composite (TFC) polyamide membranes achieving 99–99.7%. **Source:** Spiral-wound TFC elements achieving NaCl rejection 98–99% at 30–45% recovery: Eisenberg & Middlebrooks (ScienceDirect); manufacturer data sheets confirm >99.5% for SWRO membranes.

**Transmembrane pressure (TMP) and flux:**  
Net water flux J = A(ΔP – Δπ), where A = water permeability, ΔP = applied pressure, Δπ = osmotic pressure difference (Van't Hoff: π = iMRT). Seawater osmotic pressure: ~27 bar. Brackish water: 2–8 bar.

**Concentration polarization:**  
Rejected solutes accumulate at the membrane surface (boundary layer), increasing local concentration above bulk feed. This increases local osmotic pressure, reduces effective driving force, and promotes scaling/fouling. Managed by crossflow velocity (tangential to membrane), spacers, and anti-scalants.

**Fouling types:**
- Colloidal/particulate fouling: MF/UF pretreatment upstream
- Organic fouling: NOM adsorption; controlled by coagulation + oxidation pretreatment
- Biofouling: biofilm formation; chlorine (except polyamide membranes, which are Cl-intolerant)
- Scaling: inorganic precipitates (CaCO₃, CaSO₄, SiO₂); controlled by anti-scalants, acid dosing, and limiting recovery

**Membrane materials:**
- **Polyamide (PA) thin-film composite (TFC):** Standard for NF/RO; >91% of spiral-wound module sales. Chlorine-intolerant (oxidizes amide bonds). **Source:** Scispace PDF, "Polyamide spiral wound membranes control RO/NF market sales with 91% share."
- **Cellulose acetate (CA):** Earlier generation; chlorine-tolerant but hydrolyzes at extreme pH; lower flux/rejection than PA TFC.
- **Ceramic:** Al₂O₃, ZrO₂, SiC; for MF/UF; thermally stable, chemical-resistant, backwashable; high cost limits to specialty applications (oily water, harsh conditions).

**Modules:**
- **Spiral-wound:** Standard for NF/RO; flat membrane sheets wound around a permeate collection tube; high packing density; standard elements 4" and 8" diameter (4040 and 8040).
- **Hollow-fiber:** Bundles of fine fibers; high surface area; used for MF/UF; can be backwashed; sensitive to particulates.
- **Plate-and-frame, tubular:** Specialty/high-fouling applications.

**Water recovery:** RO systems: 50–85% for brackish water; 35–50% for seawater. Concentrate (brine) stream: 15–50% of feed flow at 2–10× feed TDS.

### C.3 Electrodialysis (ED) and Electrodialysis Reversal (EDR)

**Principle:**  
ED applies a direct electrical potential across a stack of alternating cation exchange membranes (CEMs) and anion exchange membranes (AEMs). Under the applied electric field:
- Cations migrate toward the cathode, passing through CEMs (which pass cations, block anions) but stopped by AEMs.
- Anions migrate toward the anode, passing through AEMs (which pass anions, block cations) but stopped by CEMs.

Result: alternating dilute (desalted) compartments and concentrate compartments. Ion flux is driven by electrical energy, not pressure.

**Stack architecture:**  
Multiple cell pairs (one CEM + one AEM = one cell pair) between anode and cathode. Commercial stacks: 100–600 cell pairs. Feed, dilute, and concentrate streams flow in parallel through their respective compartments. **Source:** Wikipedia/Electrodialysis; WaterTAP documentation.

**Electrode reactions:**  
- Cathode: 2e⁻ + 2H₂O → H₂(g) + 2OH⁻  
- Anode: H₂O → 2H⁺ + ½O₂(g) + 2e⁻ (or 2Cl⁻ → Cl₂(g) + 2e⁻)  
Electrode streams are typically separate from process streams to manage these reactions.

**Current efficiency:**  
$$\eta = \frac{z \cdot F \cdot Q_d \cdot (C_{d,in} - C_{d,out})}{N \cdot I}$$

where z = ion charge, F = Faraday constant (96,485 A·s/mol), Q_d = dilute stream flow, C = concentration, N = number of cell pairs, I = current. Desirable η > 80% in commercial stacks. Low efficiency indicates water splitting, shunt currents, or back-diffusion. **Source:** Wikipedia/Electrodialysis technical specification section.

**Limiting current density (LCD):**  
At high current, the ion concentration at the membrane surface in the dilute compartment approaches zero (Nernst boundary layer depletion). Operating above LCD causes water splitting (H₂O → H⁺ + OH⁻), membrane damage, and scaling. LCD is the maximum safe operating current density. **Source:** PMC8003458, Desalination journal article on LCD measurement.

**ED vs. RO:**  
- ED is more energy-efficient for low-to-moderate TDS waters (< 10,000 mg/L); energy scales with TDS removed, not volume pumped.
- RO becomes more efficient for higher-salinity feeds. For ZLD brine concentration near saturation, ED can process concentrations too high for RO.
- ED produces no hydraulic pressure stress on membranes; can handle scaling-prone waters better than RO.

**Applications (ED):** Brackish water desalination, nitrate reduction, deionization, industrial process water, food processing, acid/base production.

**EDR (Electrodialysis Reversal):**  
Polarity of the applied voltage is reversed periodically (every 15–20 minutes). This causes scale-forming ions to migrate back from the concentrate compartment to the dilute compartment, preventing scale buildup on membrane surfaces. EDR handles waters with high scaling potential (carbonates, sulfates) without adding acid or anti-scalant chemicals. **Source:** WaterTechnologies (Veolia) EDR product page; ResearchGate publication on EDR brackish water desalination.

**Applications (EDR):** Brackish water desalination, water reuse, high-recovery systems (up to 95%), applications where scaling is the primary fouling mechanism.

### C.4 Capacitive Deionization (CDI) and Membrane-CDI (MCDI)

**Principle:**  
CDI exploits the electric double layer (EDL) formed at porous carbon electrode surfaces. When a voltage (typically 0.8–1.4 V) is applied across two porous carbon electrodes:
- Cations migrate to and adsorb onto the negatively charged cathode via EDL (electrostatic attraction).
- Anions migrate to and adsorb onto the anode.
- The feed water is desalted as ions are electrosorbed.

When electrodes are saturated, polarity is reversed (or short-circuited), releasing stored ions into a concentrated brine stream. The cycle (charge → desalt / discharge → concentrate) is inherently batch.

**Electrode materials:** Activated carbon cloth, carbon aerogels, carbon nanotubes, graphene composites. BET surface areas: 1,000–2,000 m²/g. Pseudocapacitive materials (Faradaic, e.g., Na₂Mn₅O₁₀) can intercalate Na⁺ ions for higher capacity.

**MCDI:**  
Ion exchange membranes placed in front of each electrode restrict co-ion expulsion during charging, improving charge efficiency and desalination performance. MCDI achieves higher salt removal per unit energy than CDI. **Source:** PMC12570255 (NIH review, 2025).

**Energy efficiency:**  
CDI energy consumption: ~0.1–1.0 kWh/m³ for waters < 2,000 mg/L TDS, making it competitive for brackish/low-salinity applications. For seawater (>35,000 mg/L), CDI is impractical due to electrode saturation capacity limits. **Source:** ACS EST review (2018, DOI: 10.1021/acs.est.8b04858); MDPI IJERPH 2022 energy review.

**Limitations:**  
- Best suited for TDS < 5,000 mg/L; capacity limited by electrode surface area.
- Selectivity between ions of same charge is limited (all cations compete for cathode sites).
- Long-term electrode fouling by NOM and oxidation limits lifetime.

**Relevance for ion separation:** CDI selectivity between different cations (e.g., Li⁺ vs. Na⁺) is generally poor in conventional CDI. Faradaic (intercalation) electrodes (e.g., LMO, λ-MnO₂) offer highly selective Li⁺ uptake — this bridges CDI into the selective lithium extraction domain.

### C.5 Selective Electrodialysis and Monovalent-Selective Membranes

**The selectivity problem in standard ED:**  
Standard CEMs have little or no selectivity between monovalent cations (Li⁺, Na⁺, K⁺) and divalent cations (Mg²⁺, Ca²⁺). In fact, divalent ions (Mg²⁺) are *preferentially absorbed* into the negatively charged membrane matrix due to higher charge density, even though Li⁺ has higher mobility inside the membrane.

**Monovalent-selective CEMs (MCEMs):**  
To enable selective Li⁺ / Mg²⁺ separation in ED, two approaches produce composite membranes with a surface thin film:

1. **Polycation (PC) surface layer** (e.g., polyethylenimine, polyaniline, quaternized chitosan): positively charged layer on the solution-facing surface. Electrostatic repulsion excludes divalent Mg²⁺ more than monovalent Li⁺ (like-charge repulsion; Mg²⁺ has double the charge). Commercial examples: Selemion CSO (AGC, Japan), Neosepta CIMS (ASTOM, Japan).

2. **Polyamide (PA) dense surface layer** (analogous to NF membrane active layer): steric and dehydration effects. Mg²⁺ has a larger hydrated radius (0.43 nm vs. 0.38 nm for Li⁺) and much higher hydration energy (−1921 kJ/mol vs. −519 kJ/mol for Li⁺). The dense PA layer is more restrictive for Mg²⁺.

**Key quantitative benchmarks:**
- Unmodified CEM Li/Mg permselectivity: ~1.5
- Selemion CSO / CIMS (PC-CEM): permselectivity of Li/Mg ~2–5
- Lab-fabricated PEI surface thin film: higher permselectivity > 5
- Monovalent selective CEMs in optimized ED: permselectivity of 5.2 at 2.12 mA/cm² (Monovalent selective ion exchange membranes, Desalination 2024)

**Source:** Pubs.acs.org (DOI: 10.1021/acs.est.3c08956, "Membrane Design Principles for Ion-Selective Electrodialysis: An Analysis for Li/Mg Separation," ES&T 2024); ScienceDirect 2025 (Desalination, monovalent selective CEM permselectivity 5.2 data).

**NF membranes in ED configuration:**  
Nanofiltration membranes (thin-film composite PA on porous uncharged support) can replace CEMs in ED stacks. NF membranes exclude Mg²⁺ via stronger Donnan exclusion (divalent), steric hindrance, and dielectric effects. Energy consumption similar to CEM-based ED. Advantage: lower membrane cost.

**Critical observation (from ACS ES&T analysis):** The key physical parameters distinguishing Li⁺ from Mg²⁺ that membrane design exploits are:
- **Charge difference** (1+ vs. 2+): Donnan exclusion scales with valence.
- **Hydrated radius** (0.38 nm Li⁺ vs. 0.43 nm Mg²⁺): steric hindrance in dense films.
- **Hydration energy** (−519 vs. −1921 kJ/mol): energy cost to strip hydration shell and enter membrane.

### C.6 Forward Osmosis (FO)

**Principle:**  
FO uses a concentrated "draw solution" (DS) on one side of a semi-permeable membrane to create a natural osmotic pressure gradient that pulls water from the feed (lower osmotic pressure) through the membrane into the draw side. No applied hydraulic pressure required. Net driving force = Δπ (osmotic pressure difference), not ΔP.

**Draw solution requirements:** High osmotic pressure (high solubility), readily regenerable, non-toxic. Common draw solutes: ammonium bicarbonate (thermally decomposable), NaCl, MgCl₂, specialized polymer draw agents.

**FO vs. RO:** FO inherently concentrates feed solution without high pressure. However, draw solution must be regenerated to recover clean water — typically via RO or thermal distillation. FO alone does not produce clean water; it is a concentration step, not a standalone desalination technology.

**Applications in water treatment:**  
- Pre-concentration of high-fouling feeds (e.g., landfill leachate, difficult brines) before thermal evaporation.
- Osmotic membrane bioreactors (OMBR) for wastewater treatment.
- Brine concentration (pairing FO with crystallization for ZLD applications).
- Proposed for desalination in combination with thermal draw solution regeneration.

**Limitation:** Internal concentration polarization within the membrane support layer is severe; actual water flux much lower than osmotic pressure difference predicts. Draw solute reverse flux (DS leaking into feed) degrades feed quality.

### C.7 Selective Adsorption: Lithium Ion-Sieve Sorbents

These are **bridging domain materials** — developed primarily for lithium recovery from brines, not isotope separation, but they are highly relevant as adjacent technology.

**λ-MnO₂ (lithium manganese oxide ion sieve):**  
- Precursor: spinel Li₁.₆Mn₁.₆O₄ (LMO) synthesized by solid-state reaction and heated at ~400°C.
- Treatment with acid removes Li⁺ from crystal lattice, leaving a three-dimensional tunnel structure (λ-MnO₂ or H₁.₆Mn₁.₆O₄, abbreviated HMO).
- The tunnel diameter is ~0.76 Å (Li+ ionic radius: 0.76 Å), providing crystallographic size exclusion for selective Li⁺ re-insertion.
- Adsorption capacity: 20–35 mg Li/g typical; some optimized forms reach 35 mg/g.
- Selectivity: Li⁺ >> Na⁺, K⁺, Mg²⁺, Ca²⁺ due to size-matching.
- pH dependence: maximum adsorption at pH > 10 (alkaline medium favors Li⁺ uptake). **Source:** GCRIS IYTE thesis.

**Lithium titanium oxide (LTO, H₂TiO₃):**  
- Better chemical stability than LMO (manganese dissolution problem).
- Layered structure; Li⁺ site diameter ~0.72 Å.
- Adsorption capacities: 20–35 mg Li/g.

**Industrial deployment:** Packed columns; adsorption (Li-loading) cycle from brine → desorption with dilute acid → Li-rich eluate → Li₂CO₃ precipitation.

**Limitation (relevant to isotope separation):** These materials select Li⁺ over other elements, but they do not distinguish ⁶Li from ⁷Li — the mass difference (1 amu, ~14%) is detectable only by mass spectrometry or specialized quantum mechanical effects. Isotope separation requires additional stages.

**LMO + CDI (Electrochemical Li Intercalation):**  
λ-MnO₂ can be used as a Faradaic electrode in CDI (ESIX — Electrochemical Selective Ion Exchange). Upon charge, Li⁺ is electrochemically intercalated into the LMO lattice; upon discharge, it is released into a concentrated eluate. This combines electrical driving force with crystal-chemical selectivity. **Source:** UTS OPUS repository, metal-based adsorbents review.

### C.8 Solvent Extraction (Liquid-Liquid Extraction, LLX) in Brine Processing

**Principle:**  
LLX (also called solvent extraction or liquid-liquid extraction) distributes a target solute between two immiscible liquid phases (typically aqueous and organic). Selectivity arises from differences in partitioning coefficients (D = C_organic / C_aqueous) between target and matrix ions.

**Tributyl Phosphate (TBP):**  
- Classic extractant for Li from high-Mg brines (Li/Mg separation is critical for brine lake processing).
- TBP forms Li-TBP solvation complexes (Li⁺ is coordinated to phosphoryl oxygen atoms).
- **Limitation:** TBP has limited Li/Mg selectivity; loss of extractant to aqueous phase.
- Typically used in combination with ionic liquids or co-extractants.

**Crown Ethers:**  
- Macrocyclic polyethers with cavity sizes matched to specific ion diameters.
- 12-crown-4 (12C4): cavity diameter ~1.2 Å — matches Li⁺ (0.76 Å ionic radius); smaller than Na⁺ (1.02 Å).
- Separation factor α (⁶Li/⁷Li) using crown ethers: **comparable to COLEX method** (α ~1.03–1.057 per stage for isotope separation); much higher than typical water treatment ion exchange (which focuses on element-level, not isotope-level, selectivity. **Source:** Badea et al. 2023, PMC10222844; Nishizawa et al. data cited therein.
- Distribution coefficient DLi: very low for small-cavity crown ethers (10⁻⁵ for 12C4); higher for 15C5 (10⁻²–10⁻³).
- **Ion-pair strategy** (Cui et al. 2021): FeCl₃ as Lewis acid + B12C4/B15C5 achieves DLi = 54 (unprecedented), α(⁶Li/⁷Li) = 1.038–1.049. **Source:** PMC10222844 citing Cui et al. 2021.

**Ionic Liquids (ILs):**  
- Room-temperature molten salts with negligible vapor pressure; tunable properties.
- Cannot distinguish ⁶Li from ⁷Li alone; must be combined with crown ethers.
- TBP + IL systems show improved Li/Mg selectivity vs. TBP alone. **Source:** ScienceDirect 2025, DOI S138358662032013X.

**Process configuration:** Counter-current mixer-settler cascades or pulsed columns; multiple equilibrium stages needed because single-stage α values are small (isotope separation) or moderate (elemental separation).

---

## PART D: CONNECTION TO THE PARENT PROJECT — BRIDGE TO LITHIUM ISOTOPE SEPARATION

### D.1 The Core Challenge

Lithium has two stable isotopes: ⁶Li (natural abundance 7.59%) and ⁷Li (92.41%). The mass difference is only ~14% relative (Δm = 1 amu), far smaller than any chemical property difference exploitable by standard separation. No bulk water treatment technology separates isotopes as designed — they operate at the element level.

However, the **mechanisms and equipment** of water treatment ion handling have been adapted, proposed, or demonstrated for ⁶Li/⁷Li separation:

### D.2 COLEX Process (Historical Industrial Standard)

**Unit operation adapted:** Liquid-liquid extraction column (comparable to LLX counter-current column in industrial brine processing).

**Mechanism:** Aqueous LiOH flowing upward, Li-Hg amalgam flowing downward. ⁶Li preferentially partitions into the amalgam (higher affinity for Hg); ⁷Li enriches in the hydroxide phase. The COLEX process ran at the Y-12 Oak Ridge plant from 1955 to 1963, producing enriched ⁶Li (7.5% → 30–90%) for weapons and reactor programs. **Source:** Wikipedia/COLEX; PMC10222844.

**Abandonment reason:** Mercury environmental toxicity; Hg waste generation. Compliance with environmental regulations made continuation impossible.

### D.3 Ion Exchange Chromatography (Active Research Direction)

**Unit operation adapted:** Fixed-bed ion exchange column (same hardware as water softening/demineralization).

**Mechanism:** ⁶Li⁺ and ⁷Li⁺ have slightly different exchange equilibria on ion exchange resins (strong acid cation exchangers, e.g., Dowex 50W-X8, Amberlite IR-120). The heavier ⁷Li is slightly more tightly bound. Single-stage separation factor α(⁷Li/⁶Li) ≈ 1.002–1.005 on conventional organic resins; ≈1.02–1.05 on inorganic ion exchangers selective for Li (β-MnO₂ type). **Source:** ResearchGate publication on 7Li/6Li on inorganic ion-exchangers; OSTI biblio 4015317; Brazilian Journal of Radiation Sciences 2024.

**Displacement chromatography:** One isotope forms a migrating band; as it travels down a long column, the isotopes separate due to cumulative small α. Commercial columns would require hundreds of theoretical plates (analogous to distillation). Eco-friendly (reusable resin), but low separation factor requires very long columns or many cycles.

**Enrichment on inorganic exchangers:** β-MnO₂ and λ-MnO₂ ion sieves (same sorbent as used for Li recovery from brines) show higher α values for ⁶Li/⁷Li than organic resins, due to tighter crystal-chemical size selectivity. This is a key bridging point: the LMO sorbents used in brine Li recovery (Section C.7) also show isotope preference.

### D.4 Electrodialysis (Emerging Direction)

**Unit operation adapted:** Electrodialysis stack (same hardware as water desalination/deionization).

**Mechanism:** Isotope fractionation through differential migration rates of ⁶Li⁺ vs. ⁷Li⁺ under an electric field. ⁶Li⁺ migrates slightly faster (lighter mass → higher mobility in some solvents/membranes). δ⁷Li fractionation observed in electromigration experiments: up to −21.5‰ vs. L-SVEC reference per Wang et al. **Source:** PMC10222844 citing Wang et al. electromigration data.

**Selective ED for Li/Mg separation** (distinct from isotope separation but domain-adjacent): Monovalent-selective CEMs enable efficient ED-based separation of Li⁺ from Mg²⁺ in brines — this is the elemental separation step that must precede isotope separation. **Source:** ACS ES&T 2024 (DOI: 10.1021/acs.est.3c08956).

**ELEX process (electrochemical exchange):** Proposed mercury-free successor to COLEX; uses electrochemical driving force rather than amalgam chemistry. Complex experimental setup; relatively low separation factors compared to crown ether methods. **Source:** PMC10222844 abstract and Section 2.2.

### D.5 Crown Ether Solvent Extraction (Leading Post-COLEX Candidate)

**Unit operation adapted:** Liquid-liquid extraction (same as industrial solvent extraction in hydrometallurgy).

**Mechanism:** Crown ethers (primarily 12-crown-4, benzo-15-crown-5 and derivatives) show per-stage α(⁶Li/⁷Li) ≈ 1.03–1.057, comparable to COLEX. The separation arises from different solvation energies of ⁶Li⁺ vs. ⁷Li⁺ in the crown ether cavity (quantum-mechanical zero-point energy difference in M–O vibration — lighter isotope has higher zero-point energy and partitions differently).

**Challenge:** Very low DLi (distribution coefficient) for high-selectivity crown ethers; large volumes of organic solvent needed; loss of expensive crown ether during extraction.

**State of art:** Ion-pair strategy (Cui et al. 2021) achieves DLi = 54 while maintaining α = 1.038–1.049 — a major advance, potentially enabling practical process design. **Source:** PMC10222844 Section 2.1 and Table 1.

### D.6 Summary Mapping Table

| Water Treatment Unit Operation | Li Isotope Separation Adaptation | Mechanism | Separation Factor α per stage | Status |
|---|---|---|---|---|
| Liquid-liquid extraction column | COLEX process (mercury amalgam) | ⁶Li affinity for Hg | ~1.05 | Abandoned (Hg toxicity) |
| Solvent extraction (crown ethers) | Crown ether LLX for ⁶Li/⁷Li | Cavity size solvation energy difference | 1.03–1.057 | Active research; low DLi problem |
| Ion exchange fixed bed (SAC resin) | Displacement chromatography on organic resin | Differential exchange equilibrium | 1.002–1.005 | Research; requires very long columns |
| Ion exchange (inorganic Li sieve) | β-MnO₂ / λ-MnO₂ column | Crystal-chemical size sieve + isotope preference | ~1.02–1.05 | Research |
| Electrodialysis | ELEX / electromigration | Differential ionic mobility ⁶Li > ⁷Li | < 1.01 | Research; complex setup |
| Capacitive deionization + LMO electrode | Electrochemical selective intercalation (ESIX) | Faradaic Li⁺ intercalation into λ-MnO₂ lattice | Not established for isotopes | Research stage |

### D.7 Critical Conceptual Transitions for the Learner

1. **Element separation ≠ isotope separation.** Water treatment ion exchange and membranes achieve element-level selectivity (Li vs. Na vs. Mg) but not isotope-level (⁶Li vs. ⁷Li). The learner must clearly understand why: chemical and physical differences between isotopes are orders of magnitude smaller than between different elements.

2. **Cascade necessity.** Because per-stage α values are small (1.002–1.057), many equilibrium stages in series (cascade) are required — the same principle as enrichment cascades in uranium isotope separation. A separation factor of 1.02 means ~100 stages for modest enrichment (calculated from N ≈ ln(enrichment)/ln(α)).

3. **The bridge to lithium:** The most directly relevant water treatment technologies are:
   - Ion exchange (same equipment, adapted selectivity)
   - Liquid-liquid extraction (same unit operation, adapted extractants)
   - Electrodialysis (same stack configuration, exploiting mobility differences)

4. **Monovalent-selective membranes** developed for Li/Mg water treatment separation are directly being researched for integration into isotope-separation schemes, since elemental purification (Li from Mg/Na/K) is a mandatory upstream step before isotope enrichment.

---

## APPENDIX: KEY QUANTITATIVE ANCHORS

| Parameter | Value | Source |
|---|---|---|
| Chlorine first use as primary disinfectant (US) | Jersey City, NJ, 1908 | EPA Archive 2000 |
| SDWA enacted | 1974 (amended 1986, 1996) | EPA |
| Drinking water turbidity MCL | 1 NTU (target ≤0.3 NTU post-filtration) | EPA MCL |
| Drinking water TDS secondary standard | 500 mg/L | EPA |
| THMs (TTHM) MCL | 80 µg/L | EPA Stage 2 DBPR |
| HAA5 MCL | 60 µg/L | EPA Stage 2 DBPR |
| Strong acid cation resin capacity | 1.8–2.0 meq/mL | Axeon Water |
| Strong base anion resin capacity | 1.2–1.4 meq/mL | Axeon Water |
| SAC selectivity: Ca vs. H⁺ | 4.06 | Dow/Lenntech |
| SAC selectivity: Na vs. H⁺ | 1.56 | Dow/Lenntech |
| Li⁺ selectivity (SAC) vs. H⁺ | ~0.89 (below H⁺) | SCI/IEX document |
| RO membrane salt rejection (polyamide TFC) | 99–99.7% NaCl | Viomi/Alibaba/TWDB |
| RO seawater energy consumption | 3–5 kWh/m³ | Literature |
| MSF energy consumption | 13.5–25.5 kWh/m³ | ASEE Peer |
| MED electrical consumption | < 1.0 kWh/m³ electrical | Veolia |
| CDI energy (low-TDS, < 2000 mg/L) | 0.1–1.0 kWh/m³ | ACS EST 2018 |
| Produced water TDS range | 3,000–300,000 mg/L | Duke Law / TTU |
| Li⁺ hydrated radius | 0.38 nm | ACS ES&T 2024 |
| Mg²⁺ hydrated radius | 0.43 nm | ACS ES&T 2024 |
| Li⁺ hydration energy | −519 kJ/mol | ACS ES&T 2024 |
| Mg²⁺ hydration energy | −1921 kJ/mol | ACS ES&T 2024 |
| Unmodified CEM Li/Mg permselectivity | ~1.5 | Desalination 2024 |
| Selemion CSO / modified CEM Li/Mg permselectivity | ~5.2 at 2.12 mA/cm² | Desalination 2024 |
| Crown ether α(⁶Li/⁷Li) per stage | 1.03–1.057 (12C4, 0°C) | Badea et al. 2023 |
| COLEX α(⁶Li/⁷Li) | ~1.05 (comparable to CE) | PMC10222844 |
| DLi (ion-pair strategy, B15C5) | 54 | Cui et al. 2021, cited in PMC10222844 |
| λ-MnO₂ Li adsorption capacity | 20–35 mg Li/g | GCRIS IYTE; UTS OPUS |
| LMO Li⁺ sieve tunnel diameter | ~0.76 Å (matches Li+ ionic radius) | Literature |
| ⁶Li natural abundance | 7.59% | Standard isotope data |
| ⁷Li natural abundance | 92.41% | Standard isotope data |
| ⁷Li/⁶Li international standard (L-SVEC) | 12.33 ± 0.03 | Badea et al. 2023 |
| Current efficiency ED commercial stacks | >80% (target) | Wikipedia/Electrodialysis |
| Faraday constant | 96,485 A·s/mol | SI |

---

*Research notes compiled from: EPA Archive (2000), PMC10222844 (Badea et al. Materials 2023), ACS ES&T 2024 (DOI:10.1021/acs.est.3c08956), Wikipedia/Electrodialysis, WaterTAP 1.2.0 documentation, ScienceDirect/Desalination 2024, Veolia/Axeon/DuPont technical literature, ASEE Peer environmental cost analysis, GCRIS IYTE institutional repository, UTS OPUS metal adsorbents review, OSTI/ORNL COLEX documentation, TTU/Duke Law produced water reports.*
