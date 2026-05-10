# Lithium-6 / Lithium-7 Isotope Separation: Academic Literature Review

**Prepared:** May 2026  
**Scope:** 2020–2026 peer-reviewed literature, with seminal older works noted for context  
**Audience:** Curriculum author building a learning path for a software engineer with chemistry fundamentals completed  
**Coverage:** Methods, groups, funding, conferences, and emerging directions

---

## TL;DR — Recommended Reading Order for Beginners

Read these first, in order, before diving into method-specific papers:

1. **Sarswat 2021** (Phys. Status Solidi A) — The broadest entry point: covers all major method categories (chemical exchange, electrochemical, ion exchange, laser, membrane) with enough depth to orient yourself to the whole field. Start here.

2. **Badea, Niculescu & Iordache 2023** (Materials, MDPI/PMC open access) — A more recent, freely available review focused on chemical separation methods, with good treatment of why COLEX is being replaced and what the alternatives look like in practice.

3. **Fang et al. 2025** (Green Energy & Environment) — The go-to review specifically on crown-ether-decorated materials for chemical exchange separation, covering MOFs, COFs, and functionalized membranes as a cohesive class. Presumes you know what a crown ether is. *(Advanced concept: cavity-size selectivity and the Bigeleisen isotope effect — needs scaffolding.)*

4. **He et al. 2025** (ChemPhysChem) — A 2025 review that focuses on methods with industrial potential: electromigration stands out, and it introduces solid-electrolyte battery-derived approaches. Very useful for understanding which methods have a path to scale.

5. **Carrillo et al. 2025** (Chem / Cell Press) — The landmark 2025 paper on electrochemical 6Li enrichment using ζ-V₂O₅. Read this to understand what state-of-the-art looks like in practice: it's concrete, has real enrichment numbers, and explains why battery intercalation chemistry is now central to the field.

6. **Sun, Wu, Nitschke et al. 2025** (Chem / Cell Press) — Proton-driven coordination cages; illustrates the emerging supramolecular/cage-based direction. The mechanistic logic is beautiful and shows where the field's most creative thinking is going.

7. **Wild, Jin, Yang et al. 2022** (J. Electrochem. Soc.) — Columbia group's finite-element modeling paper on electrochemical Li isotope deposition. Illustrates the computational/modeling layer that software-minded learners can connect to.

8. **Pei et al. 2024** (Separation & Purification Technology) — Critical review of crown-ether selectivity mechanisms; deeper chemical detail than the others. Read after #3 to understand *why* 15C5 and B15C5 work.

---

## Section A — Literature Survey: Papers (2020–2026)

### A1 — Review Articles (Read First)

---

**[R1]** Sarswat, P. K. "A Comprehensive Review of Selected Major Categories of Lithium Isotope Separation Techniques." *Physica Status Solidi A*, 218, 2100340, **2021**.  
DOI: 10.1002/pssa.202100340  
URL: https://onlinelibrary.wiley.com/doi/full/10.1002/pssa.202100340  
Affiliation: University of Utah / University of Michigan (US)  
Method categories: All (chemical exchange, electrochemical, laser/AVLIS, ion exchange, membrane, centrifuge)  
Key novelty: Most encyclopedic single-source review of the modern era; benchmarks all methods on separation factor and scalability  
α (separation factor) range: Reports COLEX ~1.05 as reference; electrochemical up to ~1.12 in ideal conditions; laser >100 but lab-only  
Status: Review/reference  
Notes for curriculum: Presumes no prior knowledge of isotope chemistry; ideal entry point. The sections on the Bigeleisen equation (mass-dependent equilibrium isotope effects) will need scaffolding — this is a graduate-level physical chemistry concept.

---

**[R2]** Badea, S.-L., Niculescu, V.-C., Iordache, A.-M. "New Trends in Separation Techniques of Lithium Isotopes: A Review of Chemical Separation Methods." *Materials*, 16(10), 3817, **2023**.  
DOI: 10.3390/ma16103817  
URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC10222844 *(open access)*  
Affiliation: National Research and Development Institute for Cryogenic and Isotopic Technologies (ICSI), Râmnicu Vâlcea, Romania  
Method categories: Chemical exchange (crown ether), electrochemical (electromigration), displacement chromatography (ion exchange), analytical methods (ICP-MS, MC-ICP-MS, TIMS)  
Key novelty: Includes a comprehensive treatment of *analytical* measurement methods alongside separation—often overlooked; good on COLEX history and why it's obsolete  
α range: Crown ether liquid-liquid extraction α ~ 1.02–1.05; electromigration up to ~1.07 with ionic liquids; ion exchange ~1.003–1.015  
Status: Review  
Notes for curriculum: TIMS and MC-ICP-MS are advanced analytical instruments — flag for scaffolding. The comparison table of methods is extremely useful for learners.

---

**[R3]** Fang, Y., Yan, F., et al. "Research Progress on Lithium Isotopes Separation by Chemical Exchange with Crown Ether Decorated Materials." *Green Energy & Environment*, 10(3), 441–451, **2025** (published online 2024).  
DOI: 10.1016/j.gee.2024.06.009  
URL: https://www.sciencedirect.com/science/article/pii/S2468025724001791  
Affiliation: Multiple Chinese universities (Shandong, Qinghai Institute of Salt Lakes, CAS)  
Method categories: Chemical exchange — crown ethers on MOFs, COFs, membranes, ionic liquids  
Key novelty: First comprehensive review unifying crown-ether-functionalized porous materials (MOFs + COFs) with liquid-liquid and membrane systems under one framework  
α range: Various crown ether systems α = 1.020–1.054; functionalized COF (calixarene-decorated) α = 1.053  
Status: Review (2024/2025)  
Notes for curriculum: Presumes familiarity with crown ethers, MOFs, and COFs. Heavy chemical detail — curriculum author should plan a "porous materials" module before assigning this.

---

**[R4]** He, P., Xie, Q., Wang, J., Yao, G., Wang, L. "Progress and Perspectives of Lithium Isotope Separation." *ChemPhysChem*, 26(9), e202400999, **2025**.  
DOI: 10.1002/cphc.202400999  
URL: https://chemistry-europe.onlinelibrary.wiley.com/doi/10.1002/cphc.202400999  
Affiliation: China GRINM Group (General Research Institute for Nonferrous Metals, Beijing); Shihezi University  
Method categories: Chemical exchange, electromigration, solid-electrolyte electrochemical, laser; industrial-potential focus  
Key novelty: Highlights electromigration as *the* most industrially promising near-term method; new section on solid-state lithium electrolytes (NASICON, LLZO) for isotope pumping  
α range: Electromigration with ionic-liquid/crown ether α ~ 1.02–1.08; solid-electrolyte pumping α ~ 1.007–1.03 per stage  
Status: Review  
Notes for curriculum: The treatment of Li-ion battery electrolyte materials as isotope pumps is novel and requires battery-chemistry background.

---

**[R5]** Pei, H., Yan, F., Liu, H., He, B., Li, J. "The Selective Complexation of Crown Ethers for Lithium Isotope Separation: A Critical Review." *Separation and Purification Technology*, 338, 126857, **2024**.  
DOI: 10.1016/j.seppur.2024.126857  
URL: https://www.sciencedirect.com/science/article/abs/pii/S1383586624005963  
Affiliation: Shandong University of Technology  
Method categories: Chemical exchange — crown ether liquid-liquid extraction, crown ether-ionic liquid  
Key novelty: Deep mechanistic analysis of *why* crown ethers differentiate ⁶Li and ⁷Li: differences in free energies of complexation, cavity-size match, coordination geometry  
α range: B15C5 systems: α ~ 1.040 ± 0.003; with ionic liquids as diluent: up to α ~ 1.054  
Status: Critical review  
Notes for curriculum: Requires solid-state chemistry and coordination chemistry background. The explanation of why lighter ⁶Li fits slightly better into the crown-ether cavity (quantum nuclear effects and zero-point energy differences) is the most intellectually demanding concept in the field — needs dedicated scaffolding.

---

### A2 — Research Papers: Electrochemical Methods

---

**[E1]** Carrillo, J. L., Ezazi, A. A., Perez-Beltran, S., et al. (Banerjee, S., corresponding). "Electrochemical ⁶Li Isotope Enrichment Based on Selective Insertion in 1D Tunnel-Structured V₂O₅." *Chem*, 11, 102486, **2025**.  
DOI: 10.1016/j.chempr.2025.102486  
URL: https://www.cell.com/chem/fulltext/S2451-9294(25)00076-2 | Open access preprint: https://par.nsf.gov/servlets/purl/10618522  
Affiliation: Texas A&M University (College Station, TX); ETH Zürich (Switzerland); Hamad Bin Khalifa University (Qatar); NIST; Canadian Light Source  
Method category: Electrochemical — hybrid capacitive deionization (HCDI) using metastable polymorph ζ-V₂O₅ as insertion host  
Key novelty: First demonstration of mercury-free electrochemical 6Li enrichment using battery-like intercalation; 6Li and 7Li sequestered differentially into 1D tunnels of ζ-V₂O₅ because of subtly different Li-coordination environments in the tunnel; AIMD simulations corroborate the mechanism  
α reported: Single-cycle enrichment ~57‰ (per-mille enrichment factor, equivalent to a separation factor of ~1.057 at natural abundance)  
Throughput/scalability: Lab-scale (electrode cells with LiCl flow streams); author claims coupling to renewable energy could enable scale-up; no pilot data yet  
Status: Proof of concept / lab-scale  
Notes for curriculum: The enrichment-factor unit (‰, per-mille) versus the separation factor α requires explicit definition. AIMD (ab initio molecular dynamics) is advanced computational chemistry — needs scaffolding for software-minded learners.

---

**[E2]** Wild, P., Jin, T., Yang, Y. "Modeling Isotope Separation in Electrochemical Lithium Deposition." *Journal of the Electrochemical Society*, 169, 032504, **2022**.  
DOI: 10.1149/1945-7111/ac5854  
URL: https://blogs.cuit.columbia.edu/yanggroup/files/2022/03/98.pdf *(author PDF)*  
Affiliation: Columbia University (SEAS, Department of Applied Physics and Applied Mathematics / Mechanical Engineering), New York, NY  
Method category: Electrochemical — electrodeposition from propylene carbonate; finite-element modeling  
Key novelty: First finite-element model of Li isotope separation during electrodeposition, predicting separation factor as a function of overpotential, diffusivity, and kinetic constants; maximum predicted α ~ 1.128 under optimal conditions  
α reported: Model predicts α up to 1.128 (not yet experimentally achieved at this level)  
Status: Theoretical / modeling  
Notes for curriculum: Excellent paper for software-minded learners because it is purely computational. Requires knowledge of Butler-Volmer electrokinetics and diffusion-limited processes — flag for scaffolding.

---

**[E3]** Zhang, Z., Sarswat, P. K., Murali, A., Free, M. L. "High-Efficiency Lithium Isotope Separation in an Electrochemical System with 1-Butyl-3-Methylimidazolium Dicyanamide Ionic Liquid." *Electrochimica Acta*, 361, 137060, **2020**.  
DOI: 10.1016/j.electacta.2020.137060  
URL: https://www.sciencedirect.com/science/article/abs/pii/S0013468620314535  
Affiliation: University of Utah, Department of Metallurgical Engineering  
Method category: Electrochemical — electrodeposition and intercalation into graphite/copper using ionic liquid electrolyte  
Key novelty: Demonstrated that BMIMDca ionic liquid as electrolyte dramatically increases the electrochemical isotope effect compared to propylene carbonate; reported one of the highest α values for electrochemical deposition at the time  
α reported: ~1.054 (graphite intercalation in BMIMDca system)  
Status: Lab-scale  
Notes for curriculum: The choice of ionic liquid as electrolyte is mechanistically important — the anion can change the solvation shell around Li⁺ and therefore the energy barrier difference for ⁶Li vs ⁷Li.

---

**[E4]** Pei, H., Yan, F., He, B., Ma, X., Li, J. "Lithium Isotope Electromigration Separation in an Ionic Liquid-Crown Ether System: Understanding the Role of Driving Forces." *Industrial & Engineering Chemistry Research*, 61(12), 4369–4376, **2022**.  
DOI: 10.1021/acs.iecr.1c04513  
URL: https://pubs.acs.org/doi/10.1021/acs.iecr.1c04513  
Affiliation: Shandong University of Technology  
Method category: Electrochemical — electromigration (ionic liquid-crown ether organic phase against aqueous)  
Key novelty: Disentangles three simultaneous driving forces in electromigration: (1) Li⁺ ionic diffusion, (2) electric-field-driven migration, (3) selective chelation by crown ether; showed synergy is necessary for high separation factor  
α reported: α ~ 1.040–1.060 depending on current density and crown ether concentration  
Status: Lab-scale  
Notes for curriculum: The interplay of three mechanisms is conceptually important; good paper to teach after the student understands each mechanism individually.

---

**[E5]** Wang, C., Huang, C., et al. "Electrochemical Separation of Lithium Isotopes Using Solid Electrolytes." *Journal of the Electrochemical Society*, 169, 016516, **2022**.  
DOI: 10.1149/1945-7111/ac4aaf  
Affiliation: China (multiple institutions)  
Method category: Electrochemical — solid-state electrolyte pumping using NASICON-type Li-conducting ceramics  
Key novelty: Demonstrates ⁶Li enrichment through solid-state Li-ion transport across a NASICON membrane; lighter isotope migrates preferentially  
α reported: α ~ 1.015–1.025 per stage (low single-stage factor, but highly cascadable)  
Status: Lab-scale  
Notes for curriculum: Solid-state ion transport is more complex than aqueous; requires crystal-structure knowledge. The concept of cascading stages to achieve high enrichment (as in COLEX) should be introduced first.

---

**[E6]** Battistella, B., et al. "Depth-Resolved Lithium Isotope Fractionation as a Diagnostic of Interphase Evolution and Degradation in Lithium-Ion Batteries." *ACS Energy Letters*, published February 2026 (preprint December 2025).  
DOI: 10.1021/acsenergylett.5c04137  
URL: https://chemrxiv.org/doi/10.26434/chemrxiv-2025-5rvlk *(preprint open access)*  
Affiliation: BAM (Federal Institute for Materials Research and Testing), Germany  
Method category: Analytical application — using Li isotope fractionation as a *diagnostic* tool for battery degradation, rather than for enrichment  
Key novelty: Shows that Li isotope ratio shifts in battery electrodes are quantitative fingerprints of SEI (solid-electrolyte interphase) formation and degradation; demonstrates that Li isotopes are a novel non-destructive diagnostic method  
Status: Proof of concept  
Notes for curriculum: This represents a pivot—Li isotope fractionation applied *to* batteries rather than *from* batteries. It is an indicator of how pervasive isotopic thinking is becoming in materials science.

---

### A3 — Research Papers: Crown Ether / Chemical Exchange / Liquid-Liquid Extraction

---

**[C1]** Sun, X., et al. "Benzo-15-Crown-5 Functionalized Ionic Liquids with Enhanced Stability for Effective Separation of Lithium Isotopes: The Effect of Alkyl Chain Length." *ACS Sustainable Chemistry & Engineering*, 12(5), 1932–1941, **2024**.  
DOI: 10.1021/acssuschemeng.3c05171  
URL: https://pubs.acs.org/doi/10.1021/acssuschemeng.3c05171  
Affiliation: Qinghai Institute of Salt Lakes, Chinese Academy of Sciences (Xining, Qinghai)  
Method category: Chemical exchange — ionic liquid functionalized with B15C5 crown ether as integrated extractant  
Key novelty: Synthesizes new class of crown-ether-tethered ionic liquids that combine the extraction selectivity of B15C5 with the physicochemical advantages of ionic liquids (low volatility, recyclability); longer alkyl chains improve binding and stability  
α reported: α ~ 1.035–1.050 (dependent on alkyl chain length); excellent recyclability over 10+ cycles  
Status: Lab-scale  

---

**[C2]** Extractive Separations of Lithium Isotopes with Benzo-15-Crown-5 and Ionic Liquids: A Comparative Study Between Stirred Vessels and Small Channel Contactors. *Separation and Purification Technology*, 363, 131958, **2025**.  
DOI: 10.1016/j.seppur.2025.131958  
URL: https://scientific-publications.ukaea.uk/wp-content/uploads/1-s2.0-S1383586625001224-main.pdf *(UKAEA open access)*  
Affiliation: UKAEA (UK Atomic Energy Authority, Culham Centre for Fusion Energy); University of Oxford, Department of Materials (Oxford, UK)  
Method category: Chemical exchange — B15C5 in ionic liquid; engineering study comparing batch vs. microfluidic contactors  
Key novelty: First comparison of process intensification via microfluidic/small-channel contactors for Li isotope extraction; microchannels increase mass transfer rate significantly but do not change equilibrium α  
α reported: Equilibrium α ~ 1.040 ± 0.003; microchannels reduce time to equilibrium by ~10×  
Scalability: Engineering-scale pilot design insights; UKAEA is a fusion institution — directly relevant to fusion supply chain  
Status: Lab-scale / engineering study  
Notes for curriculum: This is the UK's main public research effort on Li isotope supply for ITER/ARC-type fusion. The UKAEA connection is important context.

---

**[C3]** Zhong, S., et al. "Radiation-Assisted Synthesis of Crown Ether-Modified Covalent Organic Frameworks for Lithium Isotope Separation." *CCS Chemistry*, 6(10), 2396–2408, **2024**.  
DOI: 10.31635/ccschem.024.202303787  
URL: https://www.chinesechemsoc.org/doi/10.31635/ccschem.024.202303787  
Affiliation: Chinese institution (Shanghai area, specific university not confirmed in abstract)  
Method category: Chemical exchange — COF functionalized with 15-crown-5 using gamma-radiation synthesis  
Key novelty: First use of radiation-induced synthesis to install crown-ether groups into a COF scaffold; avoids conventional harsh chemical conditions; porous structure enhances mass transfer  
α reported: α ~ 1.037–1.048; improved over non-porous analogs  
Status: Lab-scale  

---

**[C4]** Rui Ha, Fuzhu, et al. "Calix[4]arene-Decorated Covalent Organic Framework Conjugates for Lithium Isotope Separation." *ACS Applied Materials & Interfaces*, 15(5), 5657–5666, **2023**.  
DOI: 10.1021/acsami.2c20309  
URL: https://pubs.acs.org/doi/10.1021/acsami.2c20309  
Affiliation: Chinese institution  
Method category: Chemical exchange — calixarene-functionalized COF, combined adsorption + isotope separation  
Key novelty: First demonstration of calixarene (a bowl-shaped macrocycle with cavity selectivity for Li) as an isotope-selective ligand within a COF scaffold; significantly higher separation factor than most crown ether systems  
α reported: α = 1.053 ± 0.002 (one of the highest reported for a porous-material chemical exchange system)  
Status: Lab-scale  
Notes for curriculum: Calixarenes are a different macrocycle class from crown ethers — requires a brief introduction. The COF scaffold provides high surface area and channels for Li⁺ transport.

---

**[C5]** Iordache, A. M., Nasture, A. M., et al. "Lithium Isotope Separation Using the 15-Crown-5 Ether System and Laboratory-Made Membranes." *Materials*, 18(9), 2016, **2025**.  
DOI: 10.3390/ma18092016  
URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC12072601 *(open access)*  
Affiliation: ICSI (National Research and Development Institute for Cryogenic and Isotopic Technologies), Râmnicu Vâlcea, Romania  
Method category: Membrane — polymer-inclusion membranes (PIM) and dibenzo-15-crown-5-impregnated organic membranes in electromigration mode  
Key novelty: Systematic comparison of non-impregnated vs. crown-ether-impregnated organic membranes; demonstrates that impregnation increases initial ⁶Li enrichment rate but saturates — important for understanding cascade design  
α reported: Single-stage α ~ 1.015–1.025; enrichment of ⁶Li from 7.6% natural abundance observed  
Status: Lab-scale  
Notes for curriculum: This is a practical "how to build a membrane separator" paper; useful for understanding why isotope separation must be staged (cascaded) to reach industrial purity.

---

**[C6]** Crown Ether Decorated Polyamide Membranes for Efficient Electrodialytic Separation of Lithium Isotopes. *Separation and Purification Technology*, **2026** (published online 2025).  
URL: https://www.sciencedirect.com/science/article/abs/pii/S1383586626005629  
Affiliation: Not confirmed; European group implied from context  
Method category: Membrane — covalently grafted crown ether onto polyamide membrane; electrodialysis mode  
Key novelty: Covalent grafting (vs. physical impregnation) prevents crown ether leaching—a major practical problem with PIMs; electrodialysis with the modified membrane achieves better sustained performance  
α reported: α = 1.028 under electrodialysis conditions (current density, pH, concentration effects studied)  
Status: Lab-scale  

---

**[C7]** Synergistic Al/Fe Bimetallic Coordination in MOFs Drives High Lithium Isotope Separation. *Separation and Purification Technology*, 524, 169644, **2026** (published 2025).  
URL: https://www.sciencedirect.com/science/article/abs/pii/S1383586625039668  
Method category: Chemical exchange — bimetallic MOF without explicit crown ether; ligand field provides isotope selectivity  
Key novelty: Demonstrates that bimetallic coordination (Al + Fe) in a MOF framework creates binding sites selective for ⁶Li without crown ether functionalization — points to purely inorganic selectivity  
α reported: α ~ 1.026  
Status: Lab-scale  

---

### A4 — Research Papers: Supramolecular and Novel Approaches

---

**[S1]** Sun, X., Wu, K., Teeuwen, P. C. P., Pracht, P., Wales, D. J., Nitschke, J. R. "Proton-Driven Lithium Separation Using Alkali-Templated Coordination Cages." *Chem*, 11(10), 102556, **2025**.  
DOI: 10.1016/j.chempr.2025.102556  
URL: https://www.sciencedirect.com/science/article/pii/S2451929425001469 | Preprint: https://chemrxiv.org/doi/10.26434/chemrxiv-2025-j8t2v  
Affiliation: University of Cambridge, Department of Chemistry (UK); Cambridge's Wales group (computational)  
Method category: Supramolecular — alkali-metal-templated Fe₄L₆ coordination cage where proton-switching drives Li-selective capture and release  
Key novelty: Elegant switchable system: acid-base triggers open/close cycle of the cage to capture Li⁺ from mixtures of alkali cations; demonstrates that cage geometry (not cavity-size alone) can encode selectivity; first coordination-cage separator for Li  
α reported: Selective Li extraction demonstrated but isotope separation factor not the primary metric — Li/Na/K selectivity is the headline result (high selectivity for Li vs. other alkali cations)  
Status: Proof of concept  
Notes for curriculum: The Nitschke group at Cambridge is one of the world's leaders in supramolecular cage chemistry. The "proton-driven" switching concept requires acid-base chemistry background. This is intellectually the most elegant paper in the survey — good for capturing student interest.

---

**[S2]** Light-Driven Lithium Extraction from Mixtures of Alkali Cations Using a Photoresponsive Cage. *JACS*, **2025**.  
DOI: 10.1021/jacs.5c05885  
URL: https://pubs.acs.org/doi/10.1021/jacs.5c05885  
Affiliation: University of Cambridge, Department of Chemistry (Nitschke group)  
Method category: Supramolecular / photochemical — azobipyridine-based cage with photoresponsive capture/release of Li  
Key novelty: UV/visible light drives Li⁵L₂ sandwich assembly and disassembly; demonstrated selective Li capture from alkali salt mixtures under optical control  
Status: Proof of concept  

---

### A5 — Research Papers: High-Efficiency Electrodeposition (Pre-2022)

---

**[E7]** High-Efficiency Lithium Isotope Separation via Electrodeposition: Mechanistic Insight and Material Design Principles. *Journal of Hazardous Materials (or similar)*, **2026** (preprint available from SSRN).  
URL: https://www.researchgate.net/publication/399483321  
Method category: Electrochemical — electrodeposition, polymer-bound azacrown ion exchanger  
Key novelty: Relates the ligand hole size of polymer-bound azacrown to the isotope separation factor; provides design principles for tuning α via polymer architecture  
α reported: Variable, dependent on ligand hole size  
Status: Lab-scale  

---

**[E8]** Electromigration Separation of Lithium Isotopes with the Benzo-12-Crown-4 (B12C4) System. *Separations*, 12(2), 27, **2025**.  
DOI: 10.3390/separations12020027  
URL: https://www.mdpi.com/2297-8739/12/2/27  
Affiliation: Chinese or Eastern European group  
Method category: Electrochemical — electromigration with benzo-12-crown-4 (smaller ring than the standard B15C5)  
Key novelty: Investigates B12C4 (which is a poor fit for Li⁺) as comparison to B15C5; demonstrates that ring size must precisely match Li⁺ ionic radius for effective isotope discrimination  
α reported: B12C4 produces lower α than B15C5; confirms cavity-size selectivity mechanism  
Status: Lab-scale  

---

### A6 — Research Papers: Modeling and Computational Studies

---

**[M1]** Modeling Isotope Separation in Electrochemical Lithium Deposition [see E2 above for full entry; listed here also under Modeling]

---

**[M2]** "Electromigration Separation of Lithium Isotopes: The Effect of Electrolytes." *Journal of Molecular Liquids*, 2023 / 2024.  
URL: https://www.sciencedirect.com/science/article/abs/pii/S0167732223023322  
Method category: Electrochemical — electromigration; systematic electrolyte screening  
Key novelty: Systematically varies ionic liquid type, anion, concentration; provides a database of electrolyte effects on α for electromigration — useful for computational screening  
Status: Lab-scale  

---

### A7 — Papers from the EU TRANSAT Program

---

**[T1]** TRANSAT Consortium. "D1.2 — Report on the Assessment of a Viable Route for the Separation of Lithium Isotope." *Euratom H2020 TRANSAT Project*, January 2022.  
URL: https://transat-h2020.eu/wp-content/uploads/2022/01/TRANSAT-D1.2-Report-on-the-Assessment-of-a-Viable-Route-for-the-Separation-of-Lithium-Isotope.pdf  
Affiliation: European consortium (KIT, CEA, UKAEA, and partners); TRANSAT ran 2017–2022  
Method categories: All (engineering assessment for fusion supply chain)  
Key novelty: Concludes COLEX is most mature for near-term fusion supply (ITER); identifies crown-ether liquid-liquid extraction as the strongest alternative with pilot potential; provides engineering cost estimates  
Status: Engineering assessment / policy report  
Notes for curriculum: This is the key European engineering-reality check on the field. Not a journal article, but essential for understanding what "viable" means in practice.

---

### A8 — Papers on Li Isotope Analytics and Diagnostics

---

**[A1]** Battistella, B., et al. [see E6 above — Depth-resolved Li isotope fractionation in batteries]

**[A2]** Lithium Isotope Fractionation as an Early Indicator of Degradation. ChemRxiv, December 2025.  
URL: https://chemrxiv.org/doi/10.26434/chemrxiv-2025-16lvq  
Affiliation: BAM, Germany  
Method category: Analytical — using MC-ICP-MS to track isotope fractionation in SEI layers  
Key novelty: Shows ⁶Li/⁷Li ratio shifts before macroscopic capacity fade is detectable — potential for early warning of battery degradation  
Status: Proof of concept  

---

### A9 — Additional Notable Papers (2020–2025)

---

**[N1]** "High-Efficiency Lithium Isotope Separation in an Electrochemical System with B15C5" (multiple related papers, 2020). *Separation and Purification Technology.*  
URL: https://www.sciencedirect.com/science/article/abs/pii/S138358662032013X  
α reported: Separation coefficient 1.054 achieved  

**[N2]** "Electromigration Separation of Lithium Isotopes: The Multiple Roles of Crown Ether." *Chemical Physics Letters*, 746, 137290, **2020**.  
DOI: from NASA ADS  
Method: Electromigration; crown ether roles dissected  

**[N3]** "Separation of Lithium Isotopes by Crown Ether–Room Temperature Ionic Liquid System." *Journal of Molecular Liquids*, 341, 116916, **2021**.  
DOI: 10.1016/j.molliq.2021.116916  
Method: Liquid-liquid extraction, ultrasound-assisted; first USE application  

**[N4]** "Characterization of a Novel Crown Ether System for Lithium Isotope Separation." *Ind. Eng. Chem. Res.*, 60(36), 13113–13121, **2021**.  
DOI: 10.1021/acs.iecr.1c03245  
URL: https://pubs.acs.org/doi/10.1021/acs.iecr.1c03245  
Method: B15C5 extraction + multistage cross-flow; organic liquid film  

**[N5]** "The Upcoming 6Li Isotope Requirements Might Be Supplied by a Biotechnology-Based Process." *PMC*, August 2021.  
URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC8401424  
Method: Biological (bioaccumulation-based fractionation of Li isotopes)  
Notes: Highly speculative; separation factors are too low for practical application currently; useful for illustrating the breadth of approaches explored  

**[N6]** Pei, H. et al. "Lithium Isotope Electromigration Separation in Ionic Liquid-Crown Ether System." *ACS Sustainable Chemistry & Engineering*, 10, 10047–10056, **2022**.  

**[N7]** "Electromigration Separation of Lithium Isotopes with B12C4, B15C5 (Electrolyte Study)." *New Journal of Chemistry*, **2024**.  
URL: https://pubs.rsc.org/en/content/articlelanding/2024/nj/d3nj05963d  

**[N8]** Crystalline Porous Materials (MOFs/COFs) for Lithium Extraction — comprehensive review. *ACS Chemical & Biological Engineering*, February 2026.  
URL: https://pubs.acs.org/doi/10.1021/cbe.5c00145  
Notes: Very recent (2026) comprehensive treatment of CPMs for Li extraction, including isotope separation; not yet widely cited but likely to become a key reference  

**[N9]** Proton-driven lithium separation [see S1 above]  

**[N10]** "Randomly Oriented Covalent Organic Framework Membrane for Selective Li-Ion Separation." *PMC*, April 2025.  
URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC12022084  
Method: COF membrane with tuned pore orientation for cation selectivity  

**[N11]** "High-Efficiency Lithium Isotope Separation via Electrodeposition." *Separation and Purification Technology*, 2026.  
URL: https://www.sciencedirect.com/science/article/abs/pii/S2213343726000606  

---

## Section B — Key Research Groups and PIs

### B1 — United States

#### National Laboratories

**Oak Ridge National Laboratory (ORNL)** — Oak Ridge, TN  
Focus: Isotope development and production; tritium breeding; ITER materials  
Relevance: ORNL is the historical home of the US enriched-Li stockpile (from the 1950s–1963 COLEX operation); today's isotope production group focuses on medical and defense isotopes, but fusion materials work is ramping up (ORNL-Kyoto Fusioneering partnership announced January 2026)  
URL: https://www.ornl.gov/research-area/isotope-development-and-production  
Post-doc status: Active; substantial externally funded programs  
Notes: ORNL does not currently publish heavily in Li isotope *separation chemistry* per se but is central to the supply chain policy and infrastructure questions  

**Y-12 National Security Complex** — Oak Ridge, TN  
Focus: Lithium enrichment for nuclear weapons (⁶Li for thermonuclear components)  
Relevance: The *only* current US producer of enriched ⁶Li; production is classified/defense-oriented; recently exceeded FY2026 lithium production goals  
URL: https://www.y12.doe.gov  
Notes: Research results are largely classified; not a source of open academic literature  

**Savannah River National Laboratory (SRNL)** — Aiken, SC  
Focus: Tritium fuel cycle, tritium extraction from lithium blankets  
Relevance: Working on tritium recovery from Li blanket systems for fusion  

#### University Groups

**Columbia University — Yuan Yang Research Group** (New York City, NY) — **Ivy League**  
Department: Applied Physics & Applied Mathematics / Mechanical Engineering (SEAS)  
PI: Prof. Yuan Yang  
Focus: Electrochemical energy storage, Li-ion batteries, electrochemical separation  
Li isotope work: Published the key finite-element modeling paper on electrochemical Li isotope separation (Wild, Jin, Yang 2022, J. Electrochem. Soc.); the group studies intercalation chemistry directly relevant to isotope fractionation in electrodes  
Post-doc status: Active post-doc program  
URL: https://blogs.cuit.columbia.edu/yanggroup  
Notes for context: This is an Ivy-League group (Columbia) actively publishing in the electrochemical Li isotope space — directly relevant to the "friend who is a US Ivy post-doc" context.

**Texas A&M University — Banerjee Research Group** (College Station, TX)  
Department: Chemistry and Materials Science & Engineering  
PI: Prof. Sarbajit Banerjee (now splitting time with ETH Zürich as of 2024)  
Focus: Vanadium oxides, metastable materials, electrochemical ion separation, critical materials  
Li isotope work: The landmark 2025 Chem paper on ζ-V₂O₅ intercalation-based ⁶Li enrichment  
Post-doc status: Active  
URL: https://banerjeeresearch.com  
Notes: Banerjee is extremely prolific; the group holds patents on vanadium-oxide-based separations; the Li isotope work is a direct extension of their water desalination and lithium extraction platform  

**University of Utah — Free/Sarswat Group** (Salt Lake City, UT)  
Department: Metallurgical Engineering  
PIs: Prof. Michael Free, Dr. Prashant Sarswat  
Focus: Electrochemical separation, metallurgical processing, Li isotope separation  
Li isotope work: The 2021 comprehensive review (Sarswat 2021); multiple experimental papers on electrochemical deposition and intercalation for Li isotope separation (2020–2022)  
URL: Not prominently accessible online  
Notes: Sarswat's 2021 review paper is the most widely cited single entry point to the modern literature  

**Marathon Fusion** (San Francisco, CA) — private company, ARPA-E funded  
Focus: Partial ionization plasma centrifuge for Li isotope separation AND differential pumping in fusion reactors  
ARPA-E award: $3.63 million, OPEN 2024, start March 2026 — end March 2029  
PI: Adam Rutkowski  
URL: https://www.marathonfusion.com  
Notes: This is not a university group, but it is the most directly fusion-relevant US program on Li isotope separation as of 2026; the plasma centrifuge approach is entirely different from all chemical methods  

**NSF SBIR Phase II — Enhanced Lithium Isotope Separation** (US, private company)  
URL: https://nsf.elsevierpure.com/en/projects/sbir-phase-i-enhanced-lithium-isotope-separation-2  
Notes: NSF-funded small business working on liquid-liquid extraction pilot scale; the identity of the company is not publicly confirmed in the abstract  

### B2 — Europe

**UKAEA (UK Atomic Energy Authority) / Culham Centre for Fusion Energy** — Oxfordshire, UK  
Focus: Fusion materials, tritium breeding, Li isotope supply chain for ITER and STEP (UK fusion programme)  
Li isotope work: The 2025 paper on B15C5/ionic liquid extractive separation comparing stirred vessels vs. microfluidic contactors (Separation and Purification Technology); also the TRANSAT D1.2 engineering assessment  
URL: https://scientific-publications.ukaea.uk  
Post-doc status: Active; STEP programme creates significant demand  
Notes: The UKAEA collaboration with Oxford (Department of Materials) is the UK's leading institutional effort on Li isotope separation  

**ICSI (National Research and Development Institute for Cryogenic and Isotopic Technologies)** — Râmnicu Vâlcea, Romania  
PI: Dr. Violeta-Carolina Niculescu; Dr. Andreea Maria Iordache  
Focus: Isotope separation technologies including Li isotopes; membrane methods; MC-ICP-MS analytics  
Li isotope work: Badea et al. 2023 review (PMC open access); Iordache et al. 2025 membrane paper (PMC open access)  
URL: https://www.icsi.ro  
Notes: ICSI is a legacy state isotope institute (originally built for heavy-water production and tritium work); one of the few European groups consistently publishing on lab-scale Li isotope separation  

**Nitschke Group — University of Cambridge** — Cambridge, UK  
Department: Department of Chemistry  
PI: Prof. Jonathan R. Nitschke  
Focus: Metallosupramolecular chemistry, self-assembled coordination cages, molecular recognition  
Li isotope work: Two papers in Chem (2025) — proton-driven coordination cages (Sun et al.) and light-driven Li extraction (photoresponsive cage)  
URL: https://www.nitschkegroup-cambridge.com  
Post-doc status: Very active; internationally renowned group with global post-docs  
Notes: The Nitschke group is not a "Li isotope group" by primary identity — they are a supramolecular chemistry group that pivoted to Li separation. This makes them very innovative; their work is the most conceptually novel in this survey.

**KIT (Karlsruhe Institute of Technology)** — Karlsruhe, Germany  
Focus: Fusion technology, tritium technology, ITER blanket systems  
Li isotope relevance: Engineering assessments for fusion Li supply; TRANSAT consortium partner  
URL: https://www.kit.edu  

### B3 — China

China currently has the most active and publication-volume-dominant academic program in Li isotope separation. Key nodes:

**Shandong University of Technology** — Zibo, Shandong  
PI: Prof. Hongchang Pei (裴洪昌)  
Focus: Crown ether electromigration, membrane separation, critical review work  
Representative papers: Pei et al. 2022 (IEC Res); Pei et al. 2024 critical review (Sep Purif Tech)  
Google Scholar: https://scholar.google.com/citations?user=QRdQFe8AAAAJ  

**Qinghai Institute of Salt Lakes (ISL), Chinese Academy of Sciences** — Xining, Qinghai  
PI: Various (Fei Shao and others)  
Focus: Salt lake chemistry, Li extraction, Li isotope separation  
Representative papers: Multiple papers on crown ether-ionic liquid systems (2021–2024); Fang et al. 2025 review (Green Energy & Environment)  

**China GRINM Group (General Research Institute for Nonferrous Metals)** — Beijing  
Authors: He, Xie, Yao, Wang  
Representative paper: He et al. 2025 ChemPhysChem review  
Notes: GRINM is a state-owned research institute for nonferrous metals; their Li isotope work has a direct connection to China's strategic materials program  

**SINAP (Shanghai Institute of Applied Physics), CAS** — Shanghai  
Focus: Nuclear reactors, molten salt reactors (TMSR), Li-7 supply for fluoride salts  
Notes: SINAP developed centrifugal extraction technology for Li isotope separation; publications are more in Chinese-language journals and conference proceedings; limited open English-language literature  

**Tsinghua University** — Beijing  
Department: Engineering Physics  
Focus: Physical separation laboratory for isotope separation and centrifuge technology  
URL: https://www.ep.tsinghua.edu.cn/en/info/1025/1014.htm  

### B4 — Japan

**Japan Atomic Energy Agency (JAEA) / Tokyo Institute of Technology** — Japan  
PI: Dr. Tsuyoshi Hoshino (JAEA, now relocated)  
Focus: Electrodialysis using ionic-liquid-impregnated organic membranes (OMs); Li extraction from seawater; solid-electrolyte electrochemical pumping for ⁶Li enrichment  
Representative papers: Multiple papers on ionic-liquid membrane electrodialysis (2011–2023); LLZO and NASICON electrolyte systems  
Notes: Hoshino is possibly the most prolific single author in the Li isotope electrochemical separation space; his work spans 2010–2023 across JAEA and Tokyo Tech affiliations  

**Tohoku University** — Sendai, Japan  
Focus: Nuclear materials, tritium breeding; isotope effects in solid materials  

### B5 — Korea

**KAERI (Korea Atomic Energy Research Institute)** — Daejeon, South Korea  
Focus: Fusion materials, tritium breeding, Li supply chain for fusion  
Notes: KAERI has produced several papers on Li isotope separation by crown ether/membrane systems; NDP (neutron depth profiling) system development for Li isotope analysis  

### B6 — South Africa / Commercial

**ASP Isotopes Inc. (ASPI)** — Dallas, TX (US) / Pretoria, South Africa  
Focus: "Quantum enrichment" technology using tuned lasers; commercial isotope enrichment including uranium and specialty isotopes  
Li relevance: ASPI has stated plans for Li isotope enrichment; first quantum enrichment facility (for Yb-176) commissioned 2025; Li-6 is on their target list  
URL: https://aspisotopes.com  
Notes: ASPI is a public company (NASDAQ); the "quantum enrichment" technology is laser-based; specific technical details are proprietary  

---

## Section C — Seminal and Must-Read Entry-Point Papers

Ordered by importance for a 2026 learner:

### Tier 1 — Absolute Must-Reads

**[R1] Sarswat 2021** — The most comprehensive modern review; start here regardless of interest area  

**[E1] Carrillo et al. 2025 (Chem)** — The current state-of-the-art experimental result; mercury-free, scalable concept, synchrotron-characterized, AIMD-validated  

**[R2] Badea et al. 2023 (Materials/PMC)** — Freely accessible; best practical overview of alternatives to COLEX  

### Tier 2 — Essential for Method Depth

**[R4] He et al. 2025 (ChemPhysChem)** — Best review for industrial-potential methods  
**[R5] Pei et al. 2024 (Sep Purif Tech)** — Deepest mechanistic treatment of crown-ether selectivity  
**[T1] TRANSAT D1.2 2022** — Engineering reality check; must-read for fusion supply chain context  

### Tier 3 — Emerging Directions

**[S1] Sun, Nitschke et al. 2025 (Chem)** — Most intellectually novel; supramolecular cage approach  
**[E2] Wild, Yang et al. 2022 (J. Electrochem. Soc.)** — Modeling paper; essential for computational perspective  
**[C4] Ha et al. 2023 (ACS AMI)** — COF/calixarene; highest α among porous-material approaches  

### Historical Seminal Papers (Pre-2020, Essential Context)

- **Lewis & Macdonald 1936** (J. Am. Chem. Soc.) — First ever Li isotope separation; sets the baseline  
- **Bigeleisen & Mayer 1947** (J. Chem. Phys.) — Theoretical foundation of isotope effects; the Bigeleisen equation. *(Advanced concept: requires statistical mechanics.)*  
- **Symons 1985** ("Lithium Isotope Separation: A Review of Possible Techniques", *Separation Science and Technology*) — The classical review that defined the field before the crown ether era  
- **Black, Grant, Umeda et al. 2009** (J. Am. Chem. Soc.) — First clean demonstration of electrochemical isotope effect for Li deposition from propylene carbonate  

---

## Section D — Emerging and Under-Explored Directions

### D1 — Intercalation-Based Isotope Separation (Battery-Material Approach)

**What it is:** Using battery electrode materials (vanadium oxides, manganese oxides, graphite, garnet-structure solid electrolytes) as isotope-selective insertion hosts. The key physics: ⁶Li and ⁷Li have slightly different zero-point energies in confined sites (tunnels, interlayer spaces), leading to preferential uptake of one isotope.  

**State of field:** The Carrillo/Banerjee 2025 paper is the landmark result. It achieves single-cycle enrichment comparable to COLEX (~57‰) without mercury and connects directly to the lithium-ion battery technology ecosystem. The field is now pursuing other tunnel-structured materials (manganese oxides, bronzes, new vanadium polymorph structures) as insertion hosts.  

**Why exciting:** Direct coupling to renewable energy (electrochemical, so runs on electricity); no toxic solvents; potentially the cleanest industrial-scale path; leverages decades of Li-ion battery material science.  

**What is missing:** No pilot-scale demonstration; energy cost per kilogram of enriched product is unknown; recyclability of insertion hosts under many cycles needs study.  

**Advanced concept flag for curriculum:** Zero-point energy (ZPE) differences between ⁶Li and ⁷Li in confined environments; this requires quantum mechanics (phonon modes, quantum harmonic oscillator) — significant scaffolding needed.

---

### D2 — Supramolecular Coordination Cages and Switchable Ligands

**What it is:** Self-assembled cages (typically Fe₄L₆ or analogous geometries) that enclose a cavity precisely sized for Li⁺. Proton- or light-driven conformational changes open/close the cage, enabling capture and release cycles. The Nitschke group at Cambridge is leading this direction (two papers in Chem in 2025 alone).  

**State of field:** Proof-of-concept for Li/Na/K selectivity is demonstrated; isotope fractionation (⁶Li vs ⁷Li) within the cage is theoretically expected but not yet quantified experimentally.  

**Why exciting:** If cage geometry encodes isotope selectivity, the design space is enormous; synthetic chemistry can tune the cage to any specification; extremely clean (no toxic solvents, no membranes needed); in principle switchable with light or pH.  

**What is missing:** No isotope separation factor measured for cages; throughput is vanishingly small currently; synthesis of cages at scale is non-trivial; cost per mole of cage ligand is high.

---

### D3 — MOF/COF Porous Framework Materials

**What it is:** Using crystalline porous materials (MOFs, COFs) functionalized with crown ether or calixarene groups as solid-phase isotope exchange hosts. The porous scaffold provides high surface area, ordered channels, and prevents extractant loss (a major problem with liquid-liquid crown ether systems).  

**State of field:** Multiple papers (2022–2025) achieve α ~ 1.03–1.05 range. Radiation-assisted COF synthesis (Zhong et al. 2024, CCS Chemistry) is a novel synthesis route. MOF bimetallic coordination (Al/Fe, 2026 paper) shows that inorganic frameworks can achieve isotope selectivity without organic ligands.  

**Why exciting:** The design space for porous materials is almost infinite; machine learning is beginning to screen MOF databases for Li selectivity; COFs are cheaper and easier to functionalize than MOFs.  

**What is missing:** Stability under process conditions (aqueous, acidic/basic, high ionic strength) is poor for most MOFs; most demonstrations are α ≤ 1.05, below the COLEX benchmark; multistage cascade design for porous materials is unexplored.

---

### D4 — Computational Design and Path-Integral Methods

**What it is:** Using density functional theory (DFT), ab initio molecular dynamics (AIMD), and path-integral molecular dynamics (PIMD) to predict and understand isotope-selective binding. Path-integral methods capture nuclear quantum effects (NQEs) — the fact that lighter nuclei (⁶Li) have larger quantum-mechanical uncertainty in position and stronger zero-point motion than heavier nuclei (⁷Li). These NQEs cause measurable differences in thermodynamic properties and diffusion rates.  

**State of field:** AIMD is used by the Banerjee group (Carrillo 2025) to explain ⁶Li coordination preferences in V₂O₅ tunnels. The CP2K community (2025 paper on CP2K methodology) has excellent PIMD tools. Truhlar's group (Minnesota) has path-integral transition-state theory frameworks. But there is no dedicated computational group focused specifically on Li isotope separation design.  

**Why exciting for software-minded learners:** PIMD is inherently computational; the problem maps naturally to molecular simulation; there is a clear gap where ML-accelerated force fields (like MatterSim, 2024) could accelerate the search for isotope-selective materials.  

**Advanced concept flag:** PIMD treats the nucleus as a ring polymer (the "necklace" representation of quantum path integrals); this requires quantum statistical mechanics. The i-PI code (Kapil et al., arXiv 2405.15224) is the standard tool.

---

### D5 — Plasma and Centrifuge-Based Separation

**What it is:** Marathon Fusion's ARPA-E OPEN 2024 award ($3.63M) is developing partial ionization plasma centrifuge technology. By partially ionizing a Li vapor and spinning it at high speed, the heavier ⁷Li preferentially migrates outward (centrifugal isotope separation — the same physics as uranium gas centrifuges). The "partial ionization" trick increases the effective mass difference.  

**State of field:** Very early (project started March 2026); no published data yet from Marathon Fusion.  

**Why exciting:** Could achieve very high single-stage separation factors (centrifuge-based isotope separation for uranium achieves α ~ 1.3–1.5 per stage); potentially high throughput.  

**What is missing:** Li is a solid at room temperature (not a gas), so the technology requires Li vapor at high temperature — energy intensive; plasma chemistry is complex; no published results yet.

---

### D6 — Bio-Inspired and Biological Approaches

**What it is:** Some organisms appear to accumulate light Li isotopes preferentially. A 2021 PMC paper explored whether biological systems could be engineered as Li isotope separators.  

**State of field:** Speculative; separation factors are far too low (~1.001–1.003) for practical use; the idea is scientifically interesting but not practically viable.

---

## Section E — The Post-Doc Context: Active US Programs in 2025–2026

### E1 — Active US University Programs Publishing in 2025–2026

**Columbia University (Yuan Yang group)** — *[Ivy League]*  
The Yang group is the most active Ivy League group at the intersection of electrochemical Li separation and isotopes. Their 2022 modeling paper is already widely cited. The group is expanding into Li isotope work as a direct extension of their battery research. This is the most plausible Ivy connection for a post-doc working in this space.  
URL: https://blogs.cuit.columbia.edu/yanggroup

**Princeton University / Andlinger Center** — *[Ivy League]*  
Princeton does not currently have a prominent Li isotope separation group in the literature, but the Andlinger Center works extensively on nuclear and energy materials; Ivy-league post-docs in adjacent fields (electrochemistry, nuclear materials) could be contributing to programs not yet prominent in open literature.

**Harvard University** — *[Ivy League]*  
No prominent Harvard group specifically on Li isotope separation found in the 2020–2026 literature; adjacent work on functional inorganic materials and supramolecular chemistry exists (Nocera group in electrochemistry; Shair group in supramolecular).

**Cornell University** — *[Ivy League]*  
The Emmanuel group at Cornell works on electrochemical systems and battery materials; isotope effects in intercalation are an adjacent topic but not a stated focus in the literature reviewed.

**University of Pennsylvania** — *[Ivy League]*  
No prominent UPenn Li isotope separation group identified; UPenn has strong electrochemistry and materials science programs that are adjacent.

**Non-Ivy but elite:**  
- Texas A&M / Banerjee — most active single US academic group in 2025  
- University of Utah / Sarswat — most prolific review author  
- MIT (plasma physics / nuclear fusion) — adjacent but not directly on Li isotope separation chemistry  

### E2 — Funding Programs

**ARPA-E (Advanced Research Projects Agency-Energy)**  
- **GAMOW program** (Galvanizing Advances in Market-aligned fusion): Funded 2020–ongoing; fusion subsystems including tritium breeding and Li supply; retrospective paper on BETHE-GAMOW era: arxiv.org/abs/2505.01784  
- **OPEN 2024**: Marathon Fusion Li isotope centrifuge award ($3.63M, active 2026–2029)  
- URL: https://arpa-e.energy.gov/programs-and-initiatives/view-all-programs/gamow

**DOE BES (Basic Energy Sciences)**  
- Funds fundamental materials science; the most likely funder for academic groups doing materials discovery for isotope separation  
- Early Career Research Program (ECRP) relevant for emerging PIs  
- Isotope R&D Program (DOE IP-RENEW) specifically targets isotope separation techniques  

**DOE Fusion Energy Sciences (FES)**  
- Funds fusion materials research including tritium breeding and Li supply  
- 2025 Fusion Science and Technology Roadmap released October 2025 by DOE  

**NSF**  
- SBIR Phase I and II: Enhanced Lithium Isotope Separation (NSF-funded private company, pilot-scale design)  

**DOE NNSA (National Nuclear Security Administration)**  
- Funds Y-12 Li production (classified; not accessible to academic researchers)  

### E3 — Key Conferences

**IAEA Fusion Energy Conference (FEC)**  
- 30th FEC: October 2025, Vienna  
- Li isotope supply is a recurring topic in the fusion materials sessions  
- URL: https://www.iaea.org/events/fec2025  

**IEEE Symposium on Fusion Engineering (SOFE)**  
- 31st SOFE: June 2025 (MIT)  
- Technical sessions on tritium breeding and Li materials  

**ARPA-E Fusion Programs Annual Review Meeting**  
- 2025 Meeting: July 9, 2025  
- Includes presentations from all GAMOW and OPEN 2024 fusion projects  
- URL: https://arpa-e.energy.gov/news-and-events/events/2025-arpa-e-fusion-programs-annual-review-meeting  

**IAEA Technical Meeting on Tritium Breeding Blankets and Associated Technologies**  
- Held periodically; Li isotope separation is a standing topic  

**MRS (Materials Research Society) Fall Meeting**  
- December, Boston; sessions on critical materials, isotope effects in materials  

**ACS National Meetings**  
- Li separation papers appear in nuclear chemistry, inorganic, and materials sessions  

---

## Appendix: Gaps in the Literature Identified

1. **No published pilot-scale Li isotope separation demonstration outside of COLEX:** Every paper reviewed is at lab scale. There is a complete gap between α-measurement experiments and a cascade pilot plant. The TRANSAT D1.2 report (2022) notes this explicitly.

2. **Isotope fractionation in coordination cages is theoretically expected but unmeasured:** The Nitschke group demonstrates Li/Na/K selectivity in their cage systems, but no paper has measured ⁶Li/⁷Li fractionation within cages. This is an obvious next experiment.

3. **No published PIMD/path-integral computation specifically designed to screen materials for Li isotope selectivity:** The computational tools exist (i-PI, CP2K, machine-learned force fields), but no group has applied them systematically to the material design problem.

4. **Russian COLEX expertise is largely inaccessible:** Russia operated COLEX-type processes at scale for decades; the technical literature is in Russian and access is limited by political circumstances. This represents a significant knowledge gap in the open literature.

5. **Energy cost per kilogram of enriched ⁶Li is not reported for any modern method:** Papers universally report α and sometimes throughput, but never the specific energy consumption needed to produce 1 kg of ⁶Li at fusion-grade purity (>30–90%). This is essential engineering information missing from academic literature.

6. **The laser/AVLIS approach for Li is under-studied in recent peer-reviewed literature:** ASP Isotopes is developing "quantum enrichment" technology commercially, but there are essentially no peer-reviewed 2020–2025 papers on AVLIS-type Li isotope separation. The field has been commercially captured before the science is fully public.

7. **Supply chain and critical-materials analysis are sparse:** The strategic dimensions (China's dominance of Li processing, US stockpile depletion, ITER Li-6 requirements) are covered in policy documents and magazine articles but rarely in peer-reviewed journals. The 2025 NEI Magazine article and World Nuclear Association website are better sources on supply chain than academic journals.

---

## Bibliographic Index (Alphabetical by First Author)

| Key | Authors | Title (abbreviated) | Journal | Year | DOI/URL |
|-----|---------|---------------------|---------|------|---------|
| A2 | Battistella et al. | Lithium Isotope Fractionation as Early Indicator of Degradation | ChemRxiv | 2025 | doi:10.26434/chemrxiv-2025-16lvq |
| E6 | Battistella et al. | Depth-Resolved Li Isotope Fractionation Diagnostic | ACS Energy Lett | 2026 | doi:10.1021/acsenergylett.5c04137 |
| R2 | Badea, Niculescu, Iordache | New Trends in Li Isotope Separation: Review | Materials | 2023 | doi:10.3390/ma16103817 |
| E1 | Carrillo, Ezazi, Banerjee et al. | Electrochemical ⁶Li Enrichment via ζ-V₂O₅ | Chem | 2025 | doi:10.1016/j.chempr.2025.102486 |
| R3 | Fang, Yan et al. | Li Isotope Separation by Chemical Exchange with Crown Ethers | Green Energy Environ | 2025 | doi:10.1016/j.gee.2024.06.009 |
| C4 | Ha, Fuzhu et al. | Calix[4]arene-COF for Li Isotope Separation | ACS AMI | 2023 | doi:10.1021/acsami.2c20309 |
| R4 | He, Xie, Wang, Yao, Wang | Progress and Perspectives of Li Isotope Separation | ChemPhysChem | 2025 | doi:10.1002/cphc.202400999 |
| C5 | Iordache, Nasture et al. | Li Isotope Separation: 15-Crown-5 and Lab Membranes | Materials | 2025 | doi:10.3390/ma18092016 |
| R5 | Pei, Yan, Liu, He, Li | Crown Ethers for Li Isotope Separation: Critical Review | Sep Purif Tech | 2024 | doi:10.1016/j.seppur.2024.126857 |
| E4 | Pei, Yan, He, Ma, Li | Electromigration in Ionic Liquid-Crown Ether System | IEC Res | 2022 | doi:10.1021/acs.iecr.1c04513 |
| R1 | Sarswat, P.K. | Comprehensive Review of Li Isotope Separation Techniques | Phys Status Solidi A | 2021 | doi:10.1002/pssa.202100340 |
| C1 | Sun et al. | B15C5 Functionalized Ionic Liquids for Li Isotope Sep | ACS Sus Chem Eng | 2024 | doi:10.1021/acssuschemeng.3c05171 |
| S1 | Sun, Wu, Nitschke et al. | Proton-Driven Li Separation via Coordination Cages | Chem | 2025 | doi:10.1016/j.chempr.2025.102556 |
| T1 | TRANSAT Consortium | D1.2: Viable Route for Li Isotope Separation | H2020 Report | 2022 | transat-h2020.eu |
| E2 | Wild, Jin, Yang | Modeling Isotope Sep in Electrochemical Li Deposition | J Electrochem Soc | 2022 | doi:10.1149/1945-7111/ac5854 |
| C2 | UKAEA/Oxford authors | Extractive Sep of Li Isotopes with B15C5 and Ionic Liquids | Sep Purif Tech | 2025 | doi:10.1016/j.seppur.2025.131958 |
| E3 | Zhang, Sarswat, Murali, Free | High-Efficiency Li Isotope Sep via Electrodeposition | Electrochim Acta | 2020 | doi:10.1016/j.electacta.2020.137060 |
| C3 | Zhong et al. | Radiation-Assisted Crown Ether-COF for Li Isotope Sep | CCS Chemistry | 2024 | doi:10.31635/ccschem.024.202303787 |

---

*Document status: Complete as of May 2026. Literature search covered arXiv, Google Scholar, PubMed/PMC, ScienceDirect, ACS Publications, Wiley Online Library, OSTI, UKAEA publications portal, ARPA-E project database, and TRANSAT H2020 project website.*
