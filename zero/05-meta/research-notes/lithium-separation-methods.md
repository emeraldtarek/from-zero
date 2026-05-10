# Lithium-6 / Lithium-7 Isotope Separation: Comprehensive Research Notes

**Prepared:** 2026-05-10  
**Purpose:** Curriculum research for a 5-file educational series on Li-6/Li-7 isotope separation  
**Scope:** Problem space (why separate), physics principles, all known separation methods, industrial/geopolitical context  
**Primary sources:** NIST, TRANSAT/EU Horizon 2020 reports, Giegerich & Day (KIT), Ward et al. (arXiv 2605.04707, 2026), World Nuclear Association, DOE/ORNL, ISIS-Online, PMC reviews, NEI Magazine

---

## PART A: WHY SEPARATE Li-6 FROM Li-7

### A.1 Nuclear Fusion: Li-6 and Tritium Breeding

**The core nuclear reaction:**

```
n + ⁶Li → ⁴He + T + 4.785 MeV    [exoergic; thermal/epithermal neutrons]
n + ⁷Li → ⁴He + T + n' − 2.5 MeV  [endoergic; requires >2.5 MeV threshold; produces secondary neutron]
```

The ⁶Li reaction is strongly preferred at fusion-relevant neutron energies. The neutron cross-section for ⁶Li is ~940 barns at thermal energies; for ⁷Li it is ~45 millibarns. The ⁷Li reaction does contribute some secondary neutrons useful for blanket neutron multiplication, but the primary breeding reaction is ⁶Li.

**Why enrichment is required:**

Natural lithium is 7.59% ⁶Li / 92.41% ⁷Li (NIST, see Section B.1). At natural abundance, the tritium breeding ratio (TBR) achievable with technically feasible blanket geometries is insufficient. Blanket concepts must have TBR > 1.0 to maintain a self-sustaining tritium fuel cycle, and in practice > ~1.1 to account for losses (radioactive decay at T½ = 12.33 yr, plasma processing inefficiency, neutron absorption by structural materials). This requires ⁶Li enrichment to:

- Solid breeder concepts (ceramic pebble bed): **30–60% ⁶Li enrichment**
- Liquid breeder concepts (lithium-lead eutectic, PbLi): **60–90% ⁶Li enrichment**

Source: Giegerich et al., *Fusion Engineering and Design* 149 (2019) 111339 (TRANSAT project, KIT).

**ITER's Test Blanket Module (TBM) program:**

ITER will be the first fusion device to test tritium breeding in a real fusion environment. Four TBM concepts are being evaluated (water-cooled lithium-lead / Europe; water-cooled ceramics / Japan; helium-cooled ceramics / China; helium-cooled ceramic pebbles / Europe-Korea). The ITER TBM program requires approximately **200 kg of 90% enriched lithium** for EU testing. Source: TRANSAT D1.2 Report (Giegerich, KIT, 2019); NEI Magazine (2025).

**DEMO and commercial reactor requirements (quantitative):**

From Giegerich et al. (2019), using the Water-Cooled Lithium-Lead (WCLL) blanket design for a 2 GW_fusion DEMO device:
- Total PbLi inventory: 844 m³ ≈ 8,200 tonnes of eutectic PbLi
- Lithium mass fraction in PbLi: 6.4 × 10⁻³
- Pure ⁶Li required: **~52 tonnes per 2 GW_fus device** (26 t/GW_fus)
- Annual consumption of ⁶Li: ~112 kg/(full-power year × GW_fus) [tritium production consumes 2 g ⁶Li per 1 g T]

From Ward et al. (arXiv:2605.04707, May 2026):
- **~100 tonnes of ⁶Li per GW_th reactor**, accounting for standby/reprocessing blanket inventory
- Annual consumption: ~100 kg/yr per GW_th — only ~0.1% of total inventory
- This inventory-to-consumption ratio means **financing the upfront capital cost dominates** over variable fuel cost. At 7% interest rate, financing cost is ~70× annual consumption cost.

**Implication:** A single EU-DEMO-scale device would require more enriched ⁶Li than any current enrichment facility can supply. No existing commercial facility can meet even DEMO-scale demand. Source: Ward et al. 2026; TRANSAT D1.2.

**Current ⁶Li price:** As of April 2019, market price for small quantities was approximately €53,000/kg for 95% enriched ⁶Li (Eurisotop price: €5,000 per 100g for 95% metal). By comparison, the 1982 ORNL estimate for COLEX production cost was ~€1,000/kg for 90% enriched. Today's price reflects effectively zero supply rather than actual production cost. Source: Giegerich et al. 2019.

**Fusion startup landscape (2026):**

The fusion industry spent ~$434M on supply chains in 2024 (up from ~$250M in 2023). Companies requiring ⁶Li include Commonwealth Fusion Systems (SPARC/ARC), Kyoto Fusioneering (blanket systems), Tokamak Energy (ST40), TAE Technologies, Helion Energy, and many others. ITER itself does not require substantial ⁶Li (it uses deuterium-tritium from existing tritium stockpiles), but DEMO and commercial plants do.

---

### A.2 Nuclear Fission: Li-7 Applications

**Pressurized Water Reactors (PWRs):**

Li-7 as LiOH (lithium-7 hydroxide monohydrate, 99.95% purity) is added to PWR primary coolant at ~2.2 ppm as a pH stabilizer. The pH is maintained at 6.9–7.4 to minimize corrosion of steam generators, counteract boric acid (boron is used for reactivity control). US fleet: ~65 PWRs, each requiring ~2–4 kg Li-7/yr on average, or up to ~300 kg/yr total US consumption when resin bed manufacturing is included. World demand: ~1 tonne/yr. Price circa 2013: ~$10,000/kg. Source: DOE/Reister presentation, September 2013.

**Why must it be Li-7 and not natural lithium?** Because Li-6 has a thermal neutron cross-section of ~940 barns; any Li-6 present will absorb neutrons and produce tritium (T) as a coolant contamination byproduct. Tritium in coolant creates radioactive contamination and handling difficulties. Hence isotopic purity > 99.95% Li-7 is required for PWRs.

**Supply vulnerability (2013 crisis):**

In 2012–2013, China stopped exporting Li-7 due to domestic demand growth (new PWR construction; building a salt-cooled test reactor requiring 99.995% Li-7). Russia (TVEL/NCCP Novosibirsk) remains the major supplier, providing up to 80% of world requirements. DOE in 2013 planned to set aside 200 kg Li-7 in reserve; the GAO (GAO-13-716, September 2013) recommended DOE take on stewardship of the Li-7 supply chain.

**Molten Salt Reactors (MSRs) — Li-7 for FLiBe:**

FLiBe (lithium fluoride – beryllium fluoride, 2:1 mixture LiF:BeF₂) is the preferred coolant and/or fuel carrier salt for MSRs. Properties: melting point 459°C, very low vapor pressure, excellent heat transfer, low neutron absorption (when using Li-7). For MSR applications, Li-7 purity requirements are extreme:

- Minimum: **99.99% Li-7**
- Target: **99.995% Li-7** (some designs require this or higher)

Source: Round-robin analysis (*Nuclear Engineering and Design*, 2024); IAEA MSR Status report (STI-DOC-010-489); World Nuclear Association.

Tens of tonnes of pure Li-7 per reactor. With large-scale MSR deployment, world demand could reach **250 tonnes/yr Li-7**. Source: World Nuclear Association (2024).

Current Li-7 production (NCCP Novosibirsk) is from mercury-based electrolysis of LiCl. Equipment modernization in 2013 doubled Li-7 output capacity. This is the dominant global supply; most of the non-Russian world has no domestic Li-7 enrichment capability.

---

### A.3 Nuclear Weapons History (Declassified Context)

Li-6 deuteride (⁶LiD) is the solid thermonuclear fuel used in the secondary stage of hydrogen bombs. Li-6 in the weapon absorbs neutrons from the fission primary to produce tritium in situ; the tritium fuses with deuterium, producing the bulk of yield. This is the so-called "dry" thermonuclear design (no liquid tritium required), enabling compact weaponization.

**Castle Bravo (March 1, 1954):** Used ⁶LiD; partially because of the higher-than-expected contribution of ⁷Li to tritium production (an effect not fully modeled), the yield was 15 Mt instead of the predicted 4–6 Mt. This was the largest US nuclear test and the largest US accidental radiological release.

**US production (1952–1963):** The Y-12 National Security Complex in Oak Ridge, TN, used the COLEX process to produce 442 tonnes of enriched lithium hydroxide (~100 tonnes of ⁶Li) using approximately 11,000 tonnes of mercury. Three processes were tested at Y-12 in the early 1950s: OREX (organic exchange), ELEX (electrical exchange), and COLEX (column exchange). COLEX was selected as most efficient. Source: Giegerich et al. 2019; DOE declassified reports.

**Other nation programs:** UK (Operation Crystal, 1950s); France; Russia (continuous via COLEX/ELEX to present); China (COLEX-based, present); Israel, North Korea, South Africa (all confirmed or assessed as having built COLEX-type plants). The ISIS report (Albright et al., 2017) documented North Korea's lithium-6 plant at Hungnam Chemical Complex, procured in 2012 via China.

**Note on classification:** Many details of US COLEX operations remain classified or not documented. This is why historical process parameters are imprecisely known even to researchers trying to revive the technology.

---

### A.4 Scientific Applications

**Li-6 in neutron detectors:**  
Cerium-activated ⁶Li aluminosilicate glass scintillators exploit the high thermal neutron cross-section (~940 barns) of ⁶Li. The reaction ⁶Li(n,α)T produces a triton and an alpha particle detectable via scintillation. Applications: homeland security (portal monitors), oil well logging, neutron radiography, research reactor instrumentation. The enriched-⁶Li glass provides much higher sensitivity than natural-lithium glass. *Nature Communications Physics* (2025): composite detector of ⁶Li glass particles in organic matrix.

**Li-7 in NMR spectroscopy:**  
⁷Li has nuclear spin I = 3/2, making it NMR-active (relatively broad lines due to quadrupolar relaxation). ⁶Li has spin I = 1 — narrower lines in ⁶Li NMR. Enriched ⁶Li is used in NMR studies of lithium coordination chemistry, solvation, and solid-state Li-ion diffusion. In materials science, ⁶Li NMR resolves local Li environments in battery electrodes (solid electrolyte interphase, SEI studies; isotopic labeling to track Li transport — see Battistella et al., *ACS Energy Letters*, 2026 for depth-resolved ⁶Li fractionation in batteries).

**Lithium isotopes as geochemical tracers:**  
The large relative mass difference (~16.7%) produces measurable fractionation in geological and biological processes. δ⁷Li values (deviation from IRMM-016 standard, 7Li/6Li = 12.33) are used to trace:
- Silicate weathering rates and continental denudation
- Seawater chemistry (seawater δ⁷Li ≈ +30.8‰; has increased ~9‰ over the Cenozoic)
- Hydrothermal systems
- Biological uptake (Li isotopes fractionate during clay mineral formation, ion exchange)

**Li-7 as biological tracer:**  
Emerging research on isotope-specific pharmacology: ⁶Li and ⁷Li may have different biological effects due to their different nuclear spin properties and quantum mechanical effects on enzyme kinetics. This remains speculative and largely unreplicated, but is noted in the literature (PMC12477244, 2025).

---

### A.5 Battery-Grade Lithium: The Critical Clarification

**Standard lithium-ion batteries use natural-abundance lithium. Isotope separation is NOT required.**

The lithium in EV batteries (LiCoO₂, LiFePO₄, NMC cathodes; graphite anodes) is processed from natural ores/brines with no isotopic enrichment step. Li-6 vs. Li-7 content does not affect battery electrochemical performance in a way that justifies the enormous cost of isotope separation. The natural Li abundance is sufficient.

**The potential source of confusion:** The World Nuclear Association notes that battery lithium "enhanced proportion of Li-6 improves performance, utilizing chemically-pure tails from enriching Li-7." This is a niche, unverified claim for specialty applications; it does not represent the mainstream battery industry.

**Tails from Li-7 enrichment:** Depleted lithium (low ⁶Li content, 1–4%) is produced as a byproduct of Li-6 enrichment. Enriched Li-7 (96–99.9%+ ⁷Li) is the product primarily sought by the fission industry. The depleted Li-6 tails are a separate product. Neither involves the battery manufacturing sector.

**Why this matters for the curriculum:** When students hear about "lithium demand," they should distinguish three streams: (1) natural lithium for batteries/ceramics (no isotopic work needed); (2) enriched Li-7 for PWRs and MSRs (fission demand, small volume, high purity); (3) enriched Li-6 for fusion breeding blankets (large future demand, currently no viable supply). These are entirely separate markets with different supply chains.

---

## PART B: PHYSICS OF ISOTOPE SEPARATION

### B.1 Isotopic Abundances and Atomic Masses (NIST)

From NIST Physical Reference Data (https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=Li):

| Isotope | Atomic Mass (u) | Isotopic Abundance | Nuclear Spin |
|---------|----------------|-------------------|--------------|
| ⁶Li | 6.0151228874(16) | 0.0759(4) = 7.59 ± 0.04% | I = 1+ |
| ⁷Li | 7.0160034366(45) | 0.9241(4) = 92.41 ± 0.04% | I = 3/2− |

Standard atomic weight: [6.938, 6.997] (range notation indicating natural variation in terrestrial materials; individual samples span this range due to geological fractionation).

**Note on range:** The 0.0759 abundance is the IUPAC/NIST standard for "normal" materials. However, terrestrial lithium can range from about 1.9% to 7.8% ⁶Li depending on geological history (Wikipedia: Isotopes of Lithium). Large amounts of Li-6 have been separated from natural sources for weapons programs, leaving residual material enriched in ⁷Li.

**Mass difference:** Δm = 7.0160 − 6.0151 = 1.0009 u  
**Fractional mass difference:** Δm/m_avg ≈ 1.001/6.517 ≈ 15.4% (using mean mass); often quoted as ~16.7% (Δm/m₆ = 1.001/6.015 = 16.6%)

This is a *large* fractional mass difference by isotope separation standards (compare: ²³⁵U/²³⁸U Δm/m ≈ 1.3%). This is why lithium isotopes are, in principle, easier to separate than uranium isotopes — yet in practice, because lithium cannot be easily volatilized into a gaseous compound (unlike UF₆), many of the high-throughput uranium enrichment methods do not apply.

---

### B.2 Why the Chemistry Is Almost Identical

Li-6 and Li-7 are the same element: both have 3 protons, identical electron configuration [He] 2s¹. Chemical properties (ionization energy, ionic radius, bond lengths) are determined by the electron cloud. The tiny differences that enable separation arise from:

**1. Zero-point energy (ZPE) differences:**  
In quantum mechanics, the ground-state vibrational energy of a bound system is E_ZPE = ½hν, where ν ∝ 1/√(reduced mass). The lighter isotope (⁶Li) has higher ZPE and therefore weaker effective binding in condensed phases and crystal lattices. This produces **equilibrium isotope fractionation**: ⁶Li tends to concentrate in phases with weaker bonding (lower ZPE advantage is retained) and ⁷Li in phases with stronger bonding.

**2. Kinetic isotope effects (KIE):**  
Lighter species diffuse faster, react faster, and migrate through membranes faster. ⁶Li ions have higher mobility than ⁷Li ions in solution and through ionic conductors (by the ratio √(7/6) ≈ 1.08 for classical diffusion — actual ratios are modified by solvation shells which are largely identical, so the effect is smaller than the √mass ratio suggests).

**3. Nuclear spin differences:**  
⁶Li (spin I = 1) and ⁷Li (spin I = 3/2) have different nuclear magnetic moments and quadrupolar moments. These affect NMR spectra (enabling selective detection) and in principle affect hyperfine-structure-resolved laser transitions. The nuclear spin difference is *the* key to AVLIS: hyperfine structure shifts of atomic energy levels differ between the isotopes, allowing selective photoionization.

**4. Nuclear volume / field shift effects:**  
The slightly different nuclear charge radius and volume of ⁶Li vs. ⁷Li produces a very small shift in atomic energy levels beyond the purely mass-dependent effect. This "field shift" or "nuclear volume effect" is negligible for most chemical processes but is measurable spectroscopically and is relevant for ultra-high-precision laser methods.

**Important distinction:** Mass-dependent fractionation obeys the rule that heavier isotopes accumulate in the thermodynamically more "stable" (stronger-bonded) phase. For lithium specifically, this often means ⁷Li concentrates in the aqueous phase (more strongly solvated) and ⁶Li in the organic or metallic phase — which is consistent with the COLEX observation that ⁶Li prefers mercury amalgam over aqueous LiOH.

---

### B.3 The Separation Factor α and Cascade Theory

**Definition:** For a two-phase system enriching ⁶Li:

α = (⁶Li/⁷Li)_enriched_phase / (⁶Li/⁷Li)_depleted_phase

α > 1 means the enriched phase (typically product) has a higher ⁶Li/⁷Li ratio. α is a thermodynamic equilibrium constant that depends on temperature and the nature of the two phases.

**Key α values by method (confirmed experimental data):**

| Method | α (per stage) | Conditions | Status |
|--------|--------------|------------|--------|
| COLEX (Li-amalgam/LiOH aq.) | 1.050–1.060 | 0–25°C | Industrial (defunct in US; active in Russia/China) |
| COLEX (TRANSAT data at 0°C) | 1.059 | 0°C | Demonstrated |
| Crown ether 12-crown-4/CHCl₃-LiI-H₂O | 1.057 | 0°C | Lab scale |
| Crown ether cryptand [2B,1,1] | 1.045–1.047 | 0°C, LiI/LiBr/LiCl | Lab scale |
| B15C5 ion-pair strategy (Cui 2021) | 1.038–1.049 | 273K, B12C4/B15C5 | Lab scale |
| Anthraquinone crown ether (Echegoyen) | ~1.6 | — | Lab-only, impractical scale |
| Anthraquinone crown+cryptand (Chen) | 1.04–1.18 | — | Lab-only |
| Graphite intercalation (electrochemical) | 1.007–1.025 | 25°C | Lab scale |
| Graphite intercalation (chemical) | ~1.023 | 25°C | Lab scale |
| Electrodialysis (Teflon/ionic liquid, 3mm) | ~1.15 | 0.01% Li transfer | Lab scale |
| Electromigration (NH₄Cl catholyte) | 1.674 | — | Lab scale (single pass, not cascade) |
| Ion exchange (MnO₂) | 1.026 | — | Lab scale |
| Ion exchange resin (high crosslink 90%) | ε ≈ 0.0069 (α≈1.007) | — | Lab scale |
| Crown ether membrane (PSF-g-AB15C5) | 1.0232 per stage | — | Lab scale |
| Liquid ammonia (two-phase) | α = 1.009 ± 0.002 | <200K | Lab, unproven at scale |
| AVLIS (laser ionization) | Very high (~tens to >>10) | — | Lab/prototype |

Note: High α values (like 1.674 in electromigration) are often single-pass laboratory results in highly optimized conditions not translatable to cascaded industrial processes.

**The Cascade Principle:**

Because single-stage α is small (typically 1.02–1.07 for practical methods), many stages in series (a cascade) are required to achieve high enrichment. For COLEX going from natural abundance (7.59% ⁶Li) to 90% ⁶Li enrichment using α ≈ 1.055:

- The number of ideal equilibrium stages N required is on the order of ln[(P/W)·(1−W)/(1−P)] / ln(α) where P = product enrichment, W = feed enrichment. For the numbers above, N ≈ 50–100+ theoretical stages.
- A "square cascade" (equal flow at each stage) or tapered cascade minimizes total flow × stage count.

**Separative Work Units (SWU):**

SWU is the measure of isotope separation effort (introduced by Paul Dirac, 1941). For uranium enrichment, SWU have a well-established market price (~$97/SWU average long-term contract in 2024; ~$188/SWU spot). SWU calculations for lithium follow the same thermodynamic framework but the numerical results differ due to different starting abundance. The SWU framework gives the minimum thermodynamic work required regardless of process. For enriching 1 tonne of natural Li to 90% ⁶Li (discarding tails at 1% ⁶Li), the SWU requirement is large, making energy cost significant.

**Temperature dependence of α:**  
For the COLEX system (Li-amalgam vs. LiOH-aq.), α increases as temperature decreases. At 0°C, α ≈ 1.059; at 25°C it is slightly lower. This is consistent with the general thermodynamic principle that equilibrium isotope fractionation increases at lower temperature (ZPE effects are proportionally larger). Accordingly, processes are often designed to operate at reduced temperature.

---

## PART C: EXISTING SEPARATION METHODS

### C.1 COLEX (Column Exchange — Mercury Amalgam)

**Principle:**  
Li-6 has a thermodynamically higher affinity for mercury amalgam than Li-7 (due to ZPE differences in the Li-Hg bond). The COLEX process exploits this in a counter-current column:
- Downward flowing lithium-mercury amalgam (Li-Hg, ~0.25–0.5 wt% Li)
- Upward flowing aqueous lithium hydroxide (LiOH) solution
- At each theoretical plate, ⁶Li partitions into the amalgam phase, ⁷Li into the aqueous phase
- At the top: LiOH solution enriched in ⁷Li is electrolyzed; ⁷Li recovered as metal
- At the bottom: ⁶Li-enriched amalgam is decomposed electrolytically; Hg recycled

**Separation factor:** α ≈ 1.050–1.059 at 0–25°C (COLEX system: Li(Hg)/LiOH-aq.)  
**Products:** Both ⁶Li (enriched) and ⁷Li (enriched tails from the column top) are usable.  
**Energy:** Electrolysis of LiOH consumes substantial energy; Hg pumping also energy-intensive.

**History — US Y-12 (Oak Ridge, 1952–1963):**

- Three processes tested: OREX (organic exchange), ELEX (electrical exchange), COLEX. COLEX selected as most efficient.
- Production period: 1952–1963 at Y-12 National Security Complex, Oak Ridge, TN
- Total production: 442 tonnes of enriched lithium hydroxide (~100 tonnes of ⁶Li at 40–95.5% enrichment levels). Enrichment levels were 95.5%, 60%, or 40% depending on application.
- Mercury used: **~11,000 tonnes total** (over the 11-year operating period)
- Mercury lost: **~330 tonnes** (released to waste streams, evaporation, or spills) — about 3% of total inventory
- This represents the largest single-site mercury contamination event in US history
- The East Fork Poplar Creek and surrounding Watts Bar Reservoir received the bulk of contamination
- The ORNL/OSTI publication (2010) documents 11 million kilograms of mercury used at Y-12; approximately 330 tonnes lost. Source: *Science of the Total Environment* (2010); OSTI biblio/1037053.

**Cessation in the US:**  
COLEX operations at Y-12 ceased in 1963. Primary reasons: (1) adequate ⁶Li stockpile had been built; (2) mercury contamination concerns; (3) health and safety concerns for workers. The DOE declared it banned. The US became a net seller of enriched Li-6 from the 1970s through the 1980s, distributing excess inventory.

**Contamination legacy:**  
Buildings 9201-4 and related structures at Y-12 hold residual mercury in floors, soils, and building materials. Active cleanup programs continue as of 2021. ANS/Y-12 cleanup project recovers and reuses mercury from building demolition (ANS News, January 2021).

**Current active COLEX programs:**

- **Russia:** TVEL/Novosibirsk Chemical Concentrates Plant (NCCP), Novosibirsk. Uses mercury-based electrolysis of LiCl. Produces Li-7 hydroxide monohydrate to 99.95% purity; supplies ~80% of world Li-7 demand. Equipment modernization in 2013 doubled Li-7 output. This is the principal global supply for Li-7 for PWR use. NCCP also produces Li metal for catalysts and granulated LiCl.
- **China:** Widely believed to maintain COLEX capacity for military ⁶Li production. However, reportedly buying Li-7 from Russia for civilian reactor use (WNA). The LinkedIn post from a fusion industry source (Nov 2025) states "no clean industrial-scale [alternative] yet" in China, suggesting continued COLEX or ELEX reliance.
- **North Korea:** ISIS report (Albright et al., March 2017): Assessed to have built a COLEX-type plant at Hungnam Chemical Complex near Hamhung. Evidence: 2012 procurement of metric-tonne quantities of mercury and tens of kg of LiOH from China. Plant likely producing tens of kg ⁶Li/yr. In 2016 North Korea attempted to sell Li-6 metal online (UN Panel of Experts report, February 2017), suggesting it was producing more than needed for weapons.

**Proposed modernization — ICOMAX (KIT):**  
Giegerich et al. (2019) propose the "Improved COlumn-based Mercury Amalgam eXchange" (ICOMAX) process. Key improvements over 1950s COLEX:
- Fully sealed/leak-tight equipment (no open columns or vessels)
- Modern monitoring and control systems
- Zero atmospheric mercury discharge designed in from the start
- Still uses mercury, but with modern regulatory compliance possible
- KIT has established a dedicated mercury laboratory (HgLab Karlsruhe) for experimental development
- Proposed development timeline: lab scale → technical scale → pilot plant → production plant; production available ~2040–2045 for DEMO

**Environmental regulation concern:** The Minamata Convention on Mercury (2013 entry into force; signed by China, Russia, US) aims to phase out new mercury mining and many mercury-containing products. This creates regulatory headwinds for any new COLEX/ICOMAX facility. China's domestic mercury production (~90% of global supply) is controlled but continues. Source: Ward et al. 2026.

**Mercury scaling problem (Ward et al. 2026):**  
From the Y-12 data: ~11,000 tonnes Hg used for ~100 tonnes ⁶Li over 11 years → ~300–1,000 tonnes Hg per tonne of ⁶Li per year produced.  
To enable DEMO-scale deployment: one DEMO plant blanket = ~50 tonnes ⁶Li → requires ~3,000–10,000 tonnes Hg during construction period.  
Current global annual mercury production: ~2,000 tonnes/yr.  
**Therefore: scaling mercury-based enrichment to commercial fusion deployment would require mercury production 3 orders of magnitude larger than current global output.** This makes COLEX/ICOMAX fundamentally not scalable to full fusion deployment, even if individual DEMO reactors could be supplied.

**Status summary:** Demonstrated at industrial scale (historical). Proven process. Only method confirmed to work at scale. Cannot scale to meet fusion-era demand. Environmentally problematic. Geopolitically concentrated (Russia/China).

---

### C.2 Electromagnetic Separation (Calutron/EMIS)

**Principle:**  
Ionize lithium (typically via thermionic emission or electron bombardment of Li vapor at ~700°C). Accelerate ions to known energy in an electric field. Bend the ion beam with a uniform magnetic field (cyclotron motion: radius r = mv/qB, so m₆ and m₇ separate). Collect the two isotope beams at different positions.

**Performance:**  
Very high separation factor in a single pass (effectively infinite α — the two isotopes are fully resolved). However:
- Throughput is extremely low (grams to hundreds of grams per year per machine)
- Equipment is large and expensive (large electromagnets, high vacuum)
- Energy consumption is very high
- No cascade needed (full separation in one pass), but cannot be cascaded to increase throughput

**History:**  
Calutrons were developed at Y-12 from the Manhattan Project (uranium isotope separation). After 1959, ORNL took over calutron operations in Building 9204-3 for stable isotope production across the periodic table, including ⁶Li for research. US calutron operations for actinide enrichment shut down in 1979. ORNL's new Enriched Stable Isotope Production Facility (ESIP, opened 2019) uses a modernized electromagnetic isotope separator for small quantities of many isotopes.

**Declared lithium production:** Calutron-produced ⁶Li was available from ORNL for research-scale quantities. Not viable for tonnes-scale production.

**Status:** Demonstrated, operational (small scale). Use case: research quantities, highly specialized isotopes. Not a candidate for industrial ⁶Li supply for fusion.

---

### C.3 Laser-Based Methods

#### C.3.1 AVLIS (Atomic Vapor Laser Isotope Separation)

**Principle:**  
1. Lithium metal is vaporized (electron beam at ~700°C; vapor pressure ~10⁻³ torr at operating temp)
2. An atomic Li vapor stream passes through a laser interaction zone
3. Tuned laser(s) selectively photoionize ⁶Li atoms by exploiting the hyperfine structure difference between ⁶Li (spin 1) and ⁷Li (spin 3/2). The isotope shift in the first D-line transition (2S₁/₂ → 2P₁/₂) is ~10 GHz — large enough for selective excitation with narrow-linewidth dye lasers.
4. The ionized ⁶Li⁺ ions are deflected by an electromagnetic field and collected; neutral ⁷Li continues straight through.

**Performance:**  
Very high single-pass enrichment is achievable. For lithium (at ~700°C), photo-ionization can be highly selective in one pass, sufficient for PWR-grade Li-7 production in a single stage. Source: WNA.

**Limitations for Li-6 production specifically (WNA):**  
"Several features of AVLIS mean that pure Li-6 is not produced." This likely refers to: (1) photorecombination of ⁶Li⁺ with electrons producing some neutral ⁶Li that escapes; (2) collisional charge exchange; (3) the difficulty of tuning for Li-6 vs. Li-7 when both are optically similar. The system works better for Li-7 production (majority species, can afford less-selective process).

**Industrial development:**  
AVLIS was developed primarily for uranium at Lawrence Livermore National Laboratory (LLNL). Large-scale U-AVLIS operations began in 1986; DOE selected AVLIS as best potential technology. The program was later cancelled in favor of gas centrifuges for uranium. The technology platform (tunable dye lasers or modern fiber/solid-state lasers, vapor generation, ion collection) is adaptable to lithium.

**Current commercial interest:**  
Hexium (Austin, TX): emerged from stealth in April 2025 with $12M seed funding (MaC Venture Capital + Refactor Ventures). Building a first-of-a-kind demonstration AVLIS facility for lithium enrichment. CEO Charlie Jarrott claims domestic supply of both Li-6 and Li-7 achievable within 3–5 years with AVLIS. NRC licensing activities underway (NRC document ML25323A275, September 2025). Source: Power Technology (April 2025); NEI Magazine (November 2025); NRC licensing docs.

**MAGNIS variant:**  
Magnetically Activated and Guided Isotope Separation uses optical pumping (not full ionization) to put ⁶Li atoms into magnetically-deflectable states, then separates with a magnetic gradient. Less proven than full AVLIS.

**Status:** Lab/prototype demonstrated. Commercial AVLIS for Li is not yet proven at scale. High α per stage. Energy-intensive (laser systems). Equipment complexity. Promising for high-enrichment production in moderate quantities.

#### C.3.2 MLIS (Molecular Laser Isotope Separation)

Uses vibrational-state-selective infrared excitation of Li-containing molecules (e.g., Li₂ dimers or organo-lithium compounds) to selectively dissociate the ⁶Li species. Less developed for lithium than for uranium (where it is being commercialized by GE-Hitachi as SILEX for ²³⁵U enrichment). The scarcity of suitable gaseous Li compounds (LiF, LiCl have very high boiling points) limits practical options.

**Status:** Speculative/early research for lithium. Not demonstrated at any meaningful scale.

#### C.3.3 Two-Step Laser Photoionization

Uses two dye lasers simultaneously: one to excite the ⁶Li to an intermediate level, a second to photoionize the excited species. Both isotopes are ultimately ionized in separate pulses; time-of-flight (TOF) spectroscopy separates by mass. Research-scale demonstration only.

**Status:** Research tool, not a process method.

---

### C.4 Chemical Exchange — Non-Mercury Methods

#### C.4.1 Crown Ether Liquid–Liquid Extraction

**Principle:**  
Crown ethers are macrocyclic polyethers with ring cavities that selectively complex metal cations. The cavity size must match the cation diameter. Key property: the solvation environments of ⁶Li⁺ and ⁷Li⁺ differ slightly when complexed by crown ethers in organic solvent vs. aqueous phase, creating a small but real isotope fractionation.

**Phase system:** Aqueous LiX solution (X = Cl, I, or other anion) in contact with immiscible organic solvent containing dissolved crown ether. Li⁺ partitions between phases; ⁶Li preferentially enters the organic (crown ether) phase; ⁷Li stays in aqueous phase.

**Key crown ethers studied:**
- **12-crown-4 (12C4):** Small cavity; highest α (1.057 at 0°C for 12C4/CHCl₃/LiI-H₂O) but very low distribution coefficient D_Li ≈ 2.0 × 10⁻⁵ — too little Li transfers per stage to be practical
- **Benzo-15-crown-5 (B15C5):** Intermediate cavity; α ≈ 1.02–1.04; better D_Li (~10⁻²–10⁻³)
- **Dicyclohexano-18-crown-6 (DC18C6):** Large cavity; high D_Li but lower α
- **Ion-pair strategy (Cui et al. 2021):** Adding FeCl₃ (Lewis acid) to form [FeCl₄]⁻ counter-anion dramatically increases D_Li. For B15C5: D_Li = 54 achieved (unprecedented); α = 1.038 for B15C5, α = 1.049 for B12C4, in dichloroethane at 273K.
- **Anthraquinone crown ethers / cryptands (Echegoyen, Chen):** Very high α values (up to 1.6, and 1.04–1.18) measured in electrochemical reduction conditions. These use the reduced radical anion form of the complexant to achieve exceptional fractionation. Lab-only, not practical at scale.

**Scale-up challenges:**
- Crown ethers are expensive (e.g., DC18C6 is costly to synthesize at scale)
- Loss of crown ether during extraction (CE dissolves partially in aqueous phase)
- Low D_Li means large volumes of solvent per unit of product
- Many crown ethers have moderate toxicity / environmental concerns
- Chlorinated solvents (CHCl₃, DCE) are environmentally regulated

**Immobilized crown ethers:**  
To reduce CE loss: Liu et al. (2016) grafted NH₂-B15C5 onto mesoporous silica SBA-15 for solid-phase extraction. Yan et al. synthesized polysulfone-graft-AB15C5 (PSF-g-AB15C5) polymer; separation factors 1.010–1.031 depending on solvent. This strategy converts the liquid-liquid system to a solid-liquid system compatible with column chromatography.

**SINAP centrifugal extraction (China):**  
The Shanghai Institute of Applied Physics (under CAS) developed a centrifugal extraction method using crown ether/organic-aqueous systems in centrifugal contactors (mixing-settling stages with centrifugal force). Counter-current extraction achieved **99.99% Li-7 purity** at laboratory/demonstration scale. No clean industrial-scale facility confirmed publicly. Source: WNA; National Academies report on advanced reactor fuel cycles; LinkedIn post (Nov 2025).

**University of Manchester (UKAEA FIP contract 2023):**  
£1.5M contract to demonstrate "Viable Process for Li-6 Enrichment to Support Tritium Breeding" using crown ether solvent extraction (batchwise tests scaled to continuous counter-current operation). Source: UKAEA announcement, December 14, 2023.

**Status:** Lab-demonstrated α comparable to COLEX. Main obstacles: cost, CE loss, low D_Li, solvent hazards. Most technically competitive non-mercury alternative but not yet at industrial scale. Consensus in multiple reviews (TRANSAT, PMC/Badea 2023, Ward 2026) identifies crown ether method as "2nd best" after amalgam. Assessment: could work for DEMO-scale supply if cost reduced; not obviously scalable to full fusion deployment without further innovation.

#### C.4.2 Liquid Ammonia Chemical Exchange

**Principle:**  
Below 200 K (≈ −73°C), lithium metal dissolves in liquid ammonia to form two coexisting phases of different Li concentration. Li-6 is slightly enriched in the more concentrated metallic phase (α = 1.009 ± 0.002 — very small). Counter-current column operation proposed for scaling.

**Challenges:** Very low α, cryogenic operation required (expensive), not experimentally demonstrated at technical scale for lithium specifically (only lab measurements of the fractionation factor). High energy penalty for refrigeration.

**Status:** Academic interest only. Not a viable industrial candidate.

---

### C.5 Ion Exchange Chromatography / Displacement Chromatography

**Principle:**  
Cation exchange resins (sulfonated polystyrene-divinylbenzene, zeolites, inorganic materials) preferentially bind ⁶Li over ⁷Li due to slightly stronger interaction with the smaller/lighter isotope. In displacement chromatography (preferred over elution for throughput), a "displacer" compound pushes a band of Li through the column; isotopes separate within the band over a long column path.

**Key materials and separation factors:**
- MnO₂ ion exchanger: α = 1.026 (6Li enriched in solid phase)
- Biphasic zeolite ([Li₀.₀₈(NH₄)₀.₉₂]A and [Li₀.₃₃(NH₄)₀.₆₇]A): Demonstrated ⁶Li accumulation in zeolite (differential elution mechanism)
- Standard sulfonated Styr-DVB resin (50% cross-link): α ≈ 1.006–1.007 (ε ≈ 0.006)
- High cross-link (90% DVB) resin: ε ≈ 0.0069 (α ≈ 1.007)
- Cryptand [2B,1,1] resin: α = 1.045–1.047 at 0°C (LiCl, LiBr, LiI)
- PSF-g-AB15C5 polymer (solid-supported crown ether): α = 1.021–1.031 depending on solvent

**Taylor and Urey (1937):** First reported cation exchange method for Li isotope separation — establishing that ion exchange can work but is slow and of small effect per stage.

**Fujine et al.:** Demonstrated continuous displacement chromatography at laboratory scale; estimated construction and unit costs for a 100 kg ⁶Li/yr plant.

**HETP and column design:**  
Height Equivalent to a Theoretical Plate (HETP) must be minimized; depends on grain size, flow rate, diffusion constants in resin and eluent, temperature. Lower temperature: higher α but lower diffusion (slower kinetics). Trade-offs define optimal operating conditions.

**Status:** Lab demonstrated. Small α per stage requires very long columns or very many stages. Eco-friendly (water-based, reusable resin). Low throughput per column volume. Multiple review papers classify this as 3rd-best option after COLEX and crown ethers. Not near industrial scale.

---

### C.6 Membrane Methods

#### C.6.1 Polymer Inclusion Membranes (PIMs)

PIMs incorporate crown ethers (e.g., B15C5) in a polymer matrix (cellulose triacetate or similar) as a carrier. Li⁺ ions transport across the membrane via the carrier molecule; ⁶Li transports preferentially. Lab demonstrations: single-stage α ≈ 1.02–1.03.

**University of Bristol/Frazer-Nash LEPDOS project (UKAEA FIP, 2023):** Focus on "plasma-based technologies" for lithium enrichment, but Frazer-Nash also working on membrane approaches.

**Lithium isotope separation using 15-Crown-5 ether system and PIM membranes (Iordache et al., *Materials*, 2025):** Four-stage tandem membrane chromatography achieved ⁶Li relative abundance increase from 7.60% to 7.80% (0.20% absolute enrichment), demonstrating cumulative effect.

**Status:** Lab scale. Eco-friendly. Moderate α. Scalability unclear — large membrane area required for industrial production.

#### C.6.2 Nanofiltration Membranes

Positively charged nanofiltration membranes (interfacial polymerization, polyamide or similar) show some Li isotope selectivity in addition to Li/Mg separation. Recent review (*Nanomaterials*, 2025, PMC40648675) covers advances in positively charged NF for lithium. Note: Most NF membrane work is aimed at elemental Li separation from Mg²⁺ in brines (for natural Li production) — NOT isotope separation. The isotope-specific selectivity of NF membranes is small and not the primary application.

**Status:** Not demonstrated for isotope-grade separations. Potential synergy with Li brine processing for natural Li, not a near-term isotope separation route.

#### C.6.3 Ionic Liquid-Impregnated Organic Membranes (ILIOM / electrodialysis)

Hoshino & Terai developed ionic liquid (PP13-TFSI: N-methyl-N-propylpiperidinium bis(trifluoromethanesulfonyl)imide)-impregnated porous Teflon film. Used in electrodialysis cells with Nafion 324 overcoat. Achieved α ≈ 1.15 at 0.01% Li transfer rate (3mm Teflon); smaller (1–2mm) gave α ≈ 1.05. Source: PMC/Badea 2023, Section 2.2.2.

**Solid ceramic electrolyte (La₀.₅₇Li₀.₂₉TiO₃):** Separation factor not calculated but ⁶Li activation energy ~5% lower than ⁷Li (quantum effect), Arrhenius temperature dependence confirmed.

**Status:** Lab. High α achievable in electrodialysis but very low flux. Not scalable without orders-of-magnitude improvement in membrane permeability.

---

### C.7 Electrochemical Methods

#### C.7.1 Mercury Cathode Electrolysis (ELEX)

One of the three original processes tested at Y-12. Li⁺ ions selectively deposit as ⁶Li into mercury cathode (same thermodynamic preference as COLEX). Today used at NCCP Russia for Li-7 production (by depleting ⁶Li into the amalgam). The mercury is recycled. This is effectively COLEX but with electrolysis as the primary driving force rather than column exchange.

**Status:** Industrial (Russia); same mercury constraints as COLEX.

#### C.7.2 Electrochemical Intercalation into Graphite

Lithium-ion batteries operate by Li intercalation into graphite anodes. The ⁶Li isotope is preferentially intercalated into graphite (lighter species enters the tighter lattice interstices, consistent with ZPE arguments). Yanase, Hayama, Oi (*Z. Naturforsch.* 2003): single-stage α = 1.007–1.025 at 25°C (electrochemical); chemical insertion into graphite: α ≈ 1.023 at 25°C.

**Practical implications:**  
- Battery recycling streams are slightly enriched in ⁷Li in the electrolyte (⁶Li preferentially goes to graphite)
- If battery graphite could be processed in bulk to recover intercalated Li, it would yield mildly enriched ⁶Li — but the α per stage is far too small for practical enrichment
- The intercalation mechanism has been proposed as a potential enrichment pathway ("battery-style" electrochemical separators), but no practical scale-up has been demonstrated

**High-efficiency electrodeposition work (2026):**  
Sciencedirect article (S2213343726000606, Feb 2026): "High-efficiency lithium isotope separation via electrodeposition — predominantly driven by kinetic isotope effect during interfacial charge transfer." Indicates continued active research in optimizing electrochemical methods.

**Status:** Lab demonstrated. α too low for practical large-scale use without many cascade stages.

#### C.7.3 Electromigration

Different ionic mobilities of ⁶Li⁺ and ⁷Li⁺ in solution/membrane under electric field. In aqueous: strong hydration shell makes isotope effect small. In non-aqueous (ionic liquid + crown ether systems): larger effect.

Wang et al. (multiple papers, 2020–2023): Using ionic liquid [C₈MIm][NTf₂] + benzo-15-crown-5, maximum δ⁷Li fractionation = −21.5‰ vs. L-SVEC. Best system (NH₄Cl catholyte): α = 1.674 (single passage — this is per-run enrichment, not a per-stage equilibrium α). With different crown ether (4-nitrobenzo-15-crown-5), further optimization. Source: PMC/Badea 2023.

**Key challenge:** Multiple roles of crown ether (phase transfer, selective chelation, dehydration, retention) make optimization complex. Experimental setup complexity. Low throughput. The high α values reported are for individual experiments, not cascaded production.

**Electrophoresis:**  
Motion of Li⁺ ions through a viscous ionic conductor (e.g., solid-state Li-ion superconductor, SSLISC) under electric field. CIEMAT (Spain) designed an electrophoretic cell prototype and plant layout (n parallel series in m packed lines). The "electrophoresis in liquid bath" concept uses liquid metallic Li as feed material and SSLISC as separating medium.

**Status:** Research/prototype. No industrial demonstration. "Eco-friendly" approach with favorable sustainability profile.

---

### C.8 MOF and Nano-Porous Materials

**MOF-based lithium isotope separation:**  
Metal-organic frameworks have angstrom-scale tuneable pore structures. The pore confinement affects vibrational frequencies of guest Li⁺ ions differently for ⁶Li and ⁷Li (ZPE-based selectivity in confined spaces). Seven MOF types studied (d2cc02421g, RSC *ChemComm* 2022): effects on Li adsorption and isotope separation investigated.

**Sustainable lithium extraction by responsive MOFs (PMC, Feb 2024):** MOF membranes showing high Li selectivity — primarily aimed at Li/Na/K/Mg separation in brines, but the selective confinement mechanism in principle applies to isotopes.

**INIS-IAEA record b3ntk-gfw30:** "Lithium extraction by emerging metal-organic framework-based membranes" — channel membranes for Li-ion separation.

**Current status:** Demonstrated Li adsorption and isotope fractionation in MOFs at lab scale. The angstrom-scale selectivity is real but: (1) α values not yet reported as definitively better than crown ether systems; (2) material synthesis at scale is expensive; (3) regeneration and stability under repeated cycling needs demonstration.

**COF (Covalent Organic Frameworks) with crown ethers (Zhong et al., *CCS Chemistry*, 2024):** Radiation-assisted synthesis of crown ether-modified COFs for Li adsorption and isotope separation. First such study; shows the field is broadening to 2D/3D porous frameworks.

**Status:** Emerging, promising. Not yet near industrial application for isotope separation. May prove more relevant to Li extraction from brines (natural Li, not isotope separation) than to isotope-grade enrichment.

---

### C.9 Biological / Biomimetic Methods

**Microalgae:**  
Pearson (Kyoto Fusioneering) et al. (*Microorganisms*, 2021): "The Upcoming ⁶Li Isotope Requirements Might Be Supplied by a Microalgal Enrichment Process." Argued that microalgae could fractionate Li isotopes via selective uptake (biological isotope fractionation is known for Ca, Mg, etc.). Exploratory study (*PMC*, 2023): determined feasibility in principle for isotopic fractionation of Li through microalgae-mediated process.

**Bangor University LiME project (UKAEA FIP, December 2023):** £contract (one of six) to "Identify optimum microbe for rapid and efficient ⁶Li removal; assess total Li uptake into microbe vs. enrichment efficiency; use laboratory scale techniques to provide data on enrichment efficiency (ICPMS)." This is the world's first funded program for biological Li isotope separation.

**Sakaguchi & Tomita:** Earlier bacterial enrichment work — some microorganisms (Arthrobacter nicotianae) show Li isotope fractionation.

**Ward et al. (2026):** Note this approach "appears to score well on scalability, affordability and environmental impact" but "nuclear biotechnology is in its infancy." Included as a legitimate emerging alternative.

**Status:** Highly speculative at industrial scale. Proof-of-concept fractionation demonstrated in microorganisms but α values, throughput, and scalability unknown. Not a near-term solution.

---

### C.10 Distillation

**Liquid metallic lithium distillation:**  
Lithium boils at ~1330°C. The vapor pressure difference between ⁶Li and ⁷Li isotopologues is very small (α ≈ 1.001–1.005). Tested in the 1950s at small scale. Not developed further due to high temperature requirement, energy intensity, and extremely low α.

**LiCl distillation:**  
Similar limitations. No significant development path identified in the literature.

**Status:** Tested historically, abandoned. Not viable for large-scale enrichment.

---

## PART D: INDUSTRIAL AND GEOPOLITICAL CONTEXT

### D.1 Historical Production — US, USSR, China

**United States:**
- 1949: ORNL Materials Chemistry Division initiates Li isotope separation R&D
- 1952–1963: Y-12 Oak Ridge, COLEX process. ~100 tonnes ⁶Li produced. US becomes largest ⁶Li producer in history.
- 1963: US stops Li-6 enrichment. DOE stops stockpiling.
- 1963–1985: US is net exporter/seller of enriched Li from accumulated stockpile.
- By mid-1980s: Stockpile was ~42,000 tonnes of lithium hydroxide (WNA figure). Stockpile held at Portsmouth, Ohio (K-25) and Oak Ridge.
- 2013: DOE plans 200 kg Li-7 reserve; GAO recommends DOE stewardship role for Li-7.

**Current US position:**
- No domestic Li isotope enrichment capability
- Dependent on Russia (and effectively China) for Li-7 for PWR fleet
- Russia-Ukraine war (from 2022) and geopolitical tensions make Russian supply strategically unreliable
- UKAEA and various US programs (DOE, private sector) racing to develop alternatives
- Hexium (AVLIS) most prominent US commercial entrant as of 2025–2026

**Russia:**
- TVEL/NCCP Novosibirsk: continuous COLEX/electrolysis operation, producing Li-7 for export
- ~80% of world Li-7 supply; price ~$10,000/kg (2013 figure; likely higher post-2022)
- Russia also produces ⁶Li for military programs
- Russia's Li-7 export capacity and willingness post-Ukraine war uncertain

**China:**
- Maintains some COLEX capacity for ⁶Li (military)
- Building MSR infrastructure requiring 99.995% Li-7 → significant domestic demand
- SINAP development of centrifugal extraction (centrifugal contactors + crown ether, demonstrated 99.99% Li-7 in lab)
- China reportedly buying Li-7 from Russia for civilian reactor program
- As of 2012–2013, had reportedly stopped exporting Li-7 due to domestic demand (DOE/Reister 2013)
- China is ~90% of global mercury production (Ward 2026) — critical dependency for COLEX operations

**Other historical programs:**
- UK (Operation Crystal, 1950s): operated Li-6 enrichment for thermonuclear weapons program
- France: historical program; details classified
- South Africa: Pilot COLEX plant in 1970s for nuclear weapons program
- Israel, India, Pakistan: assessed but details scarce

---

### D.2 Current Supply Situation and Inventories

**US DOE stockpile:**  
The US has an existing stockpile of both enriched Li-6 (from Y-12 production 1952–1963) and depleted Li-7 tails, held at Y-12/Oak Ridge and K-25/Portsmouth. The exact quantities are not publicly released. WNA states that the stockpile allowed the US to be a net seller from the 1970s through mid-1980s.

**Current world commercial Li-6 supply:**  
Near-zero for commercial purposes. The ~$53,000/kg price (2019 Eurisotop price) reflects this scarcity — the material is available in small quantities from research stockpiles, not new production. Ward et al. (2026): "Global enrichment capacity [for ⁶Li] is near negligible."

**ITER TBM timeline:**  
The ITER TBM program's ~200 kg ⁶Li requirement is currently "unclear whether sufficient Li-6 will be available" (TRANSAT D1.2, 2019). ITER is now expected to achieve first plasma in the late 2020s (revised timeline); the TBM requirement is a near-term challenge.

**DEMO timeline and Li-6 requirement:**  
EU DEMO: targeted commissioning ~2050 (recent roadmaps accelerating this). Li-6 supply for DEMO blanket (~52 tonnes) must begin being procured and produced ~10 years before commissioning. This means production capacity must be available by ~2040. Giegerich's ICOMAX development plan targets production capability by ~2040–2045. Ward et al. (2026) argue this plan is already insufficient for commercial-scale fusion deployment.

---

### D.3 Fusion Industry Demand Drivers

**ITER:** The multinational tokamak (Cadarache, France) is not a power plant; it will not require large ⁶Li for its main blanket (uses beryllium/tungsten blanket for shielding). The TBM modules require ~200 kg Li-6 for testing purposes.

**DEMO:** Both EU-DEMO (EUROfusion) and the UK STEP (Spherical Tokamak for Energy Production) program require ~60+ tonnes ⁶Li/GW_el. STEP aims for commissioning in the 2040s.

**Private fusion companies:**  
Commonwealth Fusion Systems (SPARC, ~2025 target first plasma; ARC commercial plant), Tokamak Energy, TAE, Helion, Zap Energy, First Light Fusion, General Fusion, and others. All DT fusion concepts using breeding blankets need ⁶Li. Some non-burning approaches (Helion uses field-reversed configuration, potentially different fuel cycle). Reactor inventories of tens of tonnes are typical.

NEI Magazine (Nov 2025): investor MaC Venture Capital sees "path to several hundred million in revenue [for lithium enrichers] now, growing to billions when commercial fusion arrives." Current demand from experimental reactors is sufficient to justify private investment in enrichment.

---

### D.4 Recent R&D Investments

**UK (UKAEA Fusion Industry Programme, 2023):**  
£7.4M awarded in December 2023 to 5 organizations across 6 contracts for lithium fuel cycle development:
1. **Bangor University — LiME** (Lithium Isotope Microorganism Enrichment): biological separation
2. **Frazer-Nash + University of Bristol — LEPDOS** (Lithium Enrichment Prototype Project): plasma-based technologies
3. **University of Bristol — CENTRAL**: centrifugation adapted for Li isotope enrichment (Urenco partnership)
4. **University of Bristol — LIBRA**: ⁶LiD as tritium breeding material testing
5. **University of Edinburgh**: tritium extraction from molten salt
6. **University of Manchester**: Li-6 enrichment by solvent extraction/crown ethers

Source: UK Government press release, December 14, 2023; UKAEA FIP page.

**UK government total fusion commitment:**  
£2.5 billion planned spending on fusion R&D (2025–2026 through STEP program and National Fusion Laboratory), per *Research Professional News* (April 2026).

**US:**
- Hexium: $12M seed (April 2025), AVLIS-based, Austin TX, NRC licensing in progress
- DOE Isotope Program: ongoing funding for Li-7 stewardship and production research
- NNSA: holds Li-7 stockpile at Y-12
- DOE Nuclear Energy ADVANCE Act (2024): funds advanced nuclear including MSR fuel cycle work

**EU:**
- TRANSAT (Horizon 2020, grant 754586): 4-year project (2017–2021) to develop viable Li enrichment for fusion; led by KIT; delivered ICOMAX process proposal and experimental work at HgLab Karlsruhe
- EUROfusion: funding for blanket technology including Li materials and tritium breeding
- The University of Bristol group (Pearson et al.) is among the most active academic groups globally on Li enrichment for fusion

**China:**
- SINAP (Shanghai Institute of Applied Physics, CAS): developing centrifugal extraction for Li-7 (99.99% demonstrated in lab)
- China National Fusion Program: large-scale investment in CFETR (Chinese Fusion Engineering Test Reactor), a post-ITER device requiring enriched Li-6 breeding blankets
- ITER contribution: China developing helium-cooled ceramics TBM

**Japan:**
- Kyoto Fusioneering (Richard Pearson, co-founder): developing tritium breeding blanket systems; published proliferation/supply analysis with University of Bristol team
- ITER contribution: water-cooled ceramics TBM

---

### D.5 Non-Proliferation Considerations

Enriched ⁶Li is a **controlled substance** under export control laws in most nuclear states. Any concentration above natural abundance is export-controlled, since ⁶Li is the raw material for thermonuclear weapons (via in-pile or in-weapon tritium production).

Ward et al. (2026) identify this as a compounding challenge for commercial fusion:
- All lithium enriched above natural levels is currently export-controlled
- Scaling fusion industry globally requires distributing enriched Li-6 to many countries, some not NPT-compliant
- Proposed solution: define a "fusion-grade" vs. "weapons-grade" Li-6 distinction, analogous to LEU vs. HEU for uranium (where 20% ²³⁵U is the LEU/HEU boundary)
- Embedding Li-6 in chemical forms difficult to extract (FLiBe, PbLi mixtures) as a safeguard measure

The non-proliferation challenge is particularly acute because ⁶Li enrichment capacity has dual-use character: a facility designed to produce 90% ⁶Li for fusion could also produce weapons-grade ⁶Li. This mirrors the uranium enrichment dual-use problem.

---

### D.6 Natural Lithium Supply Chain (Context — NOT Isotope Separation)

For completeness: the natural (unenriched) lithium supply chain is separate from isotope separation.

**Sources (natural lithium):**
- **Brine operations** (Chile Atacama, Argentina Salar del Hombre Muerto, USA Salton Sea): evaporation ponds, lower cost (~$4,000/t LCE), multi-year extraction
- **Hard-rock mining** (Australia — spodumene: Greenbush, Mount Marion): higher cost (~$7,000/t LCE), faster to develop
- **Sedimentary clay deposits** (USA Nevada McDermitt Caldera, Thacker Pass): emerging; hectorite clay lithium
- **Global reserves** (USGS 2022): ~89 million tonnes identified; Bolivia (21 Mt), Argentina (19 Mt), Chile (9.8 Mt), USA (9.1 Mt), Australia (7.3 Mt)

**Relevance to isotope separation:**  
The natural lithium feed used in COLEX or any other isotope separation process is a relatively small fraction of world production. Even at DEMO scale (~52 tonnes pure ⁶Li from 52/0.076 ≈ 684 tonnes natural Li), the feed requirement is negligible relative to the millions of tonnes being produced for batteries. The natural Li supply chain is not a constraint on isotope separation programs.

---

## KEY ALPHA VALUES SUMMARY TABLE

| Method | α (single stage) | Phase | T | Notes |
|--------|-----------------|-------|---|-------|
| COLEX (Li-Hg/LiOH) | 1.050–1.059 | liquid/liquid | 0–25°C | Industrial, Hg |
| 12-crown-4/CHCl₃ | 1.057 | liquid/liquid | 0°C | Very low D_Li |
| B15C5 ion-pair (Cui 2021) | 1.038–1.049 | liquid/liquid | 273K | Lab only |
| Anthraquinone-crown | 1.04–1.6 | electrochemical | — | Lab only, impractical |
| Cryptand [2B,1,1]/halide | 1.045–1.047 | solid/liquid | 0°C | Lab only |
| PSF-g-AB15C5 polymer | 1.021–1.031 | solid/liquid | RT | Immobilized CE |
| Graphite intercalation | 1.007–1.025 | solid/liquid | 25°C | Battery electrode |
| MnO₂ ion exchange | 1.026 | solid/liquid | — | Lab |
| Ion exchange resin (high XL) | ~1.007 | solid/liquid | — | Lab |
| Liquid ammonia | 1.009 | liquid/liquid | <200K | Lab only |
| AVLIS laser | >>10 per pass | gas | ~700°C | Not yet industrial |
| Electrodialysis (IL membrane) | ~1.15 | membrane | RT | 0.01% Li transfer |
| Electromigration | 1.674 (single run) | liquid | RT | Not cascade α |

---

## GAPS AND CAVEATS IN THE RESEARCH

1. **Classified data:** Many COLEX process parameters from Y-12 remain classified or were not documented. Actual mercury inventory, column design, and processing details are imprecisely known even to modern researchers (Giegerich explicitly notes this).

2. **Russian/Chinese programs:** Active COLEX/ELEX operations in Russia and China are not publicly documented in open literature. Estimates of their production capacity are inferences from procurement data, satellite imagery, and indirect evidence.

3. **Li inventory quantification:** The exact size of the US DOE ⁶Li and ⁷Li stockpiles is not publicly disclosed. WNA's "42,000 tonnes of lithium hydroxide" stockpile figure (mid-1980s) is the most specific public number.

4. **AVLIS for lithium specifically:** Most AVLIS literature concerns uranium. The lithium AVLIS system is distinct (different wavelengths, different vapor generation, simpler because Li has fewer isotopes). Published data on Li-AVLIS α and throughput are sparse in open literature; Hexium has not yet published performance data from its demonstration facility.

5. **MOF/COF isotope separation α values:** The porous materials literature reports adsorption data and some isotope fractionation, but rigorous α values for cascaded separations with MOFs/COFs have not been established.

6. **Biological fractionation factors:** The LiME project (Bangor/UKAEA) and related work may produce α values but no data published as of mid-2026.

7. **SINAP centrifugal extraction:** "99.99% Li-7" is cited by WNA but the primary source is not an open academic publication; the process details are not available in the open literature.

8. **Ward et al. (2026) is a preprint:** The arXiv:2605.04707 paper (May 7, 2026) is not yet peer-reviewed. Its quantitative arguments (mercury scaling, cost analysis) are consistent with the peer-reviewed literature but should be treated as the current frontier analysis, not finalized.

---

## KEY SOURCES

1. NIST Physical Reference Data: https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=Li
2. Giegerich, T. et al., "Development of a viable route for lithium-6 supply of DEMO and future fusion power plants," *Fusion Engineering and Design* 149 (2019) 111339 [KIT/TRANSAT]
3. Giegerich, T. (KIT), TRANSAT D1.2 Report: "Report on the assessment of a viable route for the separation of lithium isotopes," 2019-02-21 [Horizon 2020 grant 754586]
4. Ward, S.H., Pearson, R.J., Scott, T., Lopes Cardozo, N.J., "Lithium enrichment threatens to curb fusion deployment," arXiv:2605.04707 [physics.soc-ph] May 7, 2026
5. Badea, S.L., Niculescu, V.C., Iordache, A.M., "New Trends in Separation Techniques of Lithium Isotopes: A Review of Chemical Separation Methods," *Materials* 16(10) (2023) 3817. PMC10222844
6. World Nuclear Association, "Lithium," August 2024. https://world-nuclear.org/information-library/current-and-future-generation/lithium
7. Reister, R. (DOE/NE), "Li-7 Supply," presentation September 19, 2013. DOE Office of Science.
8. US GAO, "Stewardship of Lithium-7 Is Needed to Ensure a Stable Supply," GAO-13-716, September 2013.
9. ORNL/OSTI publication: "History of mercury use and environmental contamination at the Oak Ridge Y-12 National Security Complex," *Science of the Total Environment*, 2010. OSTI 1037053.
10. Albright, D. et al. (ISIS), "North Korea's Lithium 6 Production for Nuclear Weapons," March 17, 2017.
11. UKAEA government announcement, "UKAEA awards £7.4m to develop lithium technologies for fusion," December 14, 2023. https://www.gov.uk/government/news/ukaea-awards-74m-to-develop-lithium-technologies-for-fusion
12. He, X. et al., "Progress and Perspectives of Lithium Isotope Separation," *ChemPhysChem* (Feb 7, 2025). DOI: 10.1002/cphc.202400999
13. Ault, T. et al., "Lithium Isotope Enrichment: Feasible Domestic Enrichment Alternatives," UC Berkeley UCBTH-12-005, May 2012. https://fhr.nuc.berkeley.edu/wp-content/uploads/2014/10/12-005_NE-170_Lithium-Enrichment.pdf
14. ITER, "Tritium Breeding," https://www.iter.org/machine/supporting-systems/tritium-breeding
15. Iordache, A.M. et al., "Lithium Isotope Separation Using the 15-Crown-5 Ether System and PIMs," *Materials* 18(9):2016 (2025).
16. Paun, N. et al., "An Overview of Methods for Lithium Separation," *Energies* (2024). https://www.energ-en.ro/assets/pdfsc/1850c4adc284d3bdcf9f173e570b5a6a.pdf
17. NEI Magazine, "Enriched lithium and advanced nuclear," November 2025. https://www.neimagazine.com/analysis/enriched-lithium-and-advanced-nuclear
18. Pearson, R.J. et al., "The Upcoming ⁶Li Isotope Requirements Might Be Supplied by a Microalgal Enrichment Process," *Microorganisms* 9(8):1753 (2021).
19. Yanase, S., Hayama, W., Oi, T., "Lithium Isotope Effect Accompanying Electrochemical Intercalation of Lithium into Graphite," *Z. Naturforsch.* 58a (2003).
20. Zhong, S. et al., "Radiation-assisted synthesis of crown ether-modified COFs for lithium isotope separation," *CCS Chemistry* (2024). DOI: 10.31635/ccschem.024.202303787
