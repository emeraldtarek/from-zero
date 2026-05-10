# Chemistry Fundamentals: Research Notes for Curriculum Authorship

**Compiled:** 2026-05-10  
**Purpose:** Doctoral-level reference backing for a 10-file introductory chemistry curriculum targeting Li-6/Li-7 isotope separation as the culminating application.  
**Audience:** Curriculum author — not the learner. Dense with citations, numbers, and pedagogical flags.

---

## Table of Contents

1. Matter and Atoms
2. Atomic Structure (Nucleus, Protons, Neutrons, Electrons)
3. Electric Charge
4. Elements and the Periodic Table
5. Atomic Mass
6. Isotopes (deep treatment)
7. Ions and Ionization (deep treatment)
8. Chemical Bonding Basics
9. States of Matter and Solutions
10. Lithium Specifically

---

## 1. Matter and Atoms

### Rigorous Definition

**Matter** (operational definition, used in introductory and advanced physical chemistry alike): anything that possesses mass and occupies volume. OpenStax Chemistry 2e states: "Matter is defined as anything that occupies space and has mass, and it is all around us." [OpenStax Chemistry 2e, 1.2 — https://openstax.org/books/chemistry-2e/pages/1-2-phases-and-classification-of-matter]

The more physically precise statement at the graduate level (Atkins' Physical Chemistry, 11th ed.) frames matter as composed of **atoms** — the smallest units that retain the chemical identity of an element — which themselves consist of a nucleus and electrons. The key concept: "all matter is made up of atoms" per Dalton's atomic theory (1808), and atoms of a given element are identical in their chemical behavior (though not necessarily in mass — see Isotopes).

**Pure substance:** a material with a fixed, uniform composition (invariant throughout the sample). Divided into:
- **Elements:** pure substances composed of one type of atom only; cannot be decomposed by ordinary chemical means.
- **Compounds:** pure substances formed from two or more elements in fixed mass ratios; can be decomposed into constituent elements by chemical reactions.

**Mixture:** two or more substances combined in variable proportions, physically separable; no new chemical bonds formed. [Purdue University General Chemistry — https://www.chem.purdue.edu/gchelp/atoms/elements.html]

### Historical/Experimental Basis

- **Democritus (~430 BCE):** Proposed that matter is discontinuous at small scale — composed of indivisible particles (*atomos*). Philosophical, not experimental.
- **John Dalton (1803–1808):** Published *A New System of Chemical Philosophy* (1808). His atomic theory postulates:
  1. All matter is composed of indivisible atoms.
  2. All atoms of a given element are identical in mass and properties.
  3. Atoms of different elements differ in mass and properties.
  4. Atoms combine in simple integer ratios to form compounds.
  5. In chemical reactions, atoms are rearranged, not created or destroyed.
  Basis: Law of Conservation of Mass (Lavoisier), Law of Definite Proportions (Proust), Law of Multiple Proportions (Dalton's own experiments). [LibreTexts, Dalton's Atomic Theory — https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Atomic_Theory/Dalton's_Atomic_Theory/Postulates_of_Dalton's_Atomic_Theory]

### Common Misconceptions

- **Misconception:** "Atoms are the smallest things that exist." Correction: Atoms are the smallest units that retain chemical identity of an element, but they are divisible into protons, neutrons, and electrons. This distinction is introduced in Dalton's own framework and then explicitly overturned by Thomson (1897).
- **Misconception:** "Atoms are solid spheres." Correction: atoms are overwhelmingly empty space; the nucleus is ~1/100,000th the diameter of the atom (see Section 2).

### Quantitative Anchors

- Atomic scale: atom diameters range roughly 50–600 pm (picometers); 1 pm = 10⁻¹² m.
- The typical atomic diameter is ~0.1–0.5 nm (1–5 Å).
- The **mole** (SI base unit): 1 mol = exactly 6.022 140 76 × 10²³ entities (**Avogadro constant**, exact value by 2019 SI redefinition). [NIST CODATA 2022 wallet card — https://physics.nist.gov/cuu/pdf/wallet_2022.pdf]
- Avogadro's hypothesis (1811): equal volumes of gases at the same T and P contain equal numbers of molecules. First quantitative determination of N_A: Loschmidt (1865), from kinetic theory. Modern value established via X-ray crystallography and silicon sphere experiments (XRCD method). [Scientific American — https://www.scientificamerican.com/article/how-was-avogadros-number]

### Best Pedagogical Sources

- Atkins' Physical Chemistry (Atkins & de Paula), Chapters 0–1: "The Properties of Gases" and background material on atomic theory.
- Feynman Lectures on Physics, Vol. 1, Chapter 1: "Atoms in Motion" — opens with "If, in some cataclysm, all scientific knowledge were to be destroyed…" — ideal rhetorical hook for the learner.
- LibreTexts General Chemistry: https://chem.libretexts.org

### Bridge to Next Topic

Understanding that atoms are the smallest chemically-meaningful units sets up the question: *What is inside an atom?* → leads directly to atomic structure (protons, neutrons, electrons, nucleus).

---

## 2. Atomic Structure (Nucleus, Protons, Neutrons, Electrons)

### Rigorous Definitions

- **Nucleus:** a tiny, dense, positively charged core at the center of an atom, containing **protons** and (for all elements except hydrogen-1) **neutrons**. Rutherford (1911) established the nuclear model experimentally. The nucleus occupies roughly (1/100,000)³ of the atom's volume but contains >99.97% of the atom's mass.
- **Proton (p):** a positively charged nucleon. Atomic number Z = number of protons; this uniquely defines the element.
- **Neutron (n):** a neutral (uncharged) nucleon; adds to nuclear mass without changing atomic number.
- **Electron (e⁻):** a negatively charged particle that occupies the space around the nucleus. In a neutral atom, number of electrons = Z.
- **Nucleon:** collective term for proton or neutron.
- **Nuclide:** a nucleus with a specific Z and specific neutron number N.

### Historical/Experimental Basis

**J.J. Thomson — Cathode Ray Experiment (1897):**  
Thomson measured the charge-to-mass ratio (e/m) of cathode rays using electric and magnetic field deflections. He determined e/m = 1.76 × 10¹¹ C/kg and concluded cathode rays consist of universal negatively charged particles ("corpuscles," now called electrons) lighter than any known atom. Announced April 30, 1897 at the Royal Institution. Nobel Prize in Physics 1906. [APS Physics — https://www.aps.org/apsnews/2000/10/discovery-of-the-electron; St Andrews research paper — https://research-repository.st-andrews.ac.uk/bitstream/handle/10023/4991/PhysicsEducation1997postprint.pdf]  
Thomson's "plum pudding model" (1904): negative electrons embedded in a diffuse positive charge cloud.

**Rutherford — Geiger-Marsden Gold Foil Experiment (1909–1911):**  
Alpha particles (He nuclei) fired at gold foil. Expected under Thomson's model: slight deflections only. Observed: most alphas pass straight through, but ~1 in 8,000 deflected by more than 90°, and some nearly 180°. Rutherford's famous quote: "It was almost as incredible as if you fired 15-inch shells at tissue paper and they came back and hit you." Published formally 1911 in Philosophical Magazine. Conclusion: the atom is mostly empty space with a tiny, massive, positively charged nucleus. [LibreTexts — https://chem.libretexts.org/Bookshelves/Introductory_Chemistry/Introductory_Chemistry_(CK-12)/04%3A_Atomic_Structure/4.14%3A_Gold_Foil_Experiment; Wikipedia Rutherford model — https://en.wikipedia.org/wiki/Rutherford_model]

**Robert Millikan — Oil Drop Experiment (1909–1913):**  
Measured elementary charge directly by balancing gravitational force on charged oil droplets against an electric field. First published result (1913): e = 1.592 × 10⁻¹⁹ C (slightly low, due to incorrect air viscosity data — a famous case of experimenter bias). Modern accepted value: e = 1.602 176 634 × 10⁻¹⁹ C (exact by 2019 SI definition). Nobel Prize 1923. [APS Physics News — https://www.aps.org/apsnews/2006/08/robert-millikan-oil-drop-results; Wikipedia — https://en.wikipedia.org/wiki/Oil_drop_experiment]

**Rutherford — Discovery of Proton (1917):**  
Bombarded nitrogen nuclei with alpha particles; detected fast protons. Concluded the proton is a constituent of all nuclei.

**Chadwick — Discovery of Neutron (1932):**  
Irène and Frédéric Joliot-Curie observed penetrating radiation when beryllium was hit by alpha particles; they thought it was gamma radiation. Chadwick showed the radiation could eject protons from paraffin wax with momenta inconsistent with massless photons; he deduced a neutral particle with mass ≈ proton mass. Published February 17, 1932 in *Nature*. Nobel Prize 1935. [APS Physics History — https://www.aps.org/apsnews/2007/05/may-1932-chadwick-discovery-neutron; Wikipedia — https://en.wikipedia.org/wiki/Discovery_of_the_neutron]

### Common Misconceptions

- **Misconception:** "Electrons orbit the nucleus like planets orbit the sun." Correction: The planetary model (Bohr, 1913) was an early useful approximation but is wrong. Electrons occupy probabilistic wave functions (orbitals) described by quantum mechanics; there are no defined circular orbits. Rutherford himself "did not discuss the organization of electrons" — the orbital picture came from Bohr. [Wikipedia Rutherford model — https://en.wikipedia.org/wiki/Rutherford_model]
- **Misconception:** "The nucleus is like a shrunken ball at the center of the atom." Correction: The nucleus is astonishingly small — nuclear radius ≈ 1–10 fm (femtometers, 10⁻¹⁵ m) vs. atomic radius ≈ 50–300 pm (10⁻¹⁰ m). Gold nucleus radius ≈ 7 fm; gold atom radius ≈ 144 pm. Ratio ≈ 20,000:1 in radius, so ~10¹³:1 in volume.
- **Misconception:** "Neutrons don't matter — they're just neutral filler." Correction: neutrons are critical to nuclear stability (they dilute proton-proton electrostatic repulsion via the strong nuclear force) and are what distinguish isotopes from each other.

### Quantitative Anchors (All from NIST CODATA 2022)

Source for all values: [NIST CODATA 2022 wallet card — https://physics.nist.gov/cuu/pdf/wallet_2022.pdf]

| Particle | Mass (kg) | Mass (u, amu) | Charge |
|---|---|---|---|
| Proton (p) | 1.672 621 925 95(52) × 10⁻²⁷ kg | 1.007 276 u | +e |
| Neutron (n) | 1.674 927 498 04(95) × 10⁻²⁷ kg | 1.008 665 u | 0 |
| Electron (e⁻) | 9.109 383 7139(28) × 10⁻³¹ kg | 5.485 799 × 10⁻⁴ u | −e |
| 1 atomic mass unit (u) | 1.660 539 068 92(52) × 10⁻²⁷ kg | 1 u (by definition) | — |

- **Proton-to-electron mass ratio:** mp/me = 1836.152 673 426(32) — protons are ~1836 times heavier than electrons.
- **Elementary charge:** e = 1.602 176 634 × 10⁻¹⁹ C (exact, 2019 SI redefinition)
- **Bohr radius** (characteristic atomic length): a₀ = 5.291 772 105 44(82) × 10⁻¹¹ m ≈ 52.9 pm
- Nuclear radius approximation: r ≈ r₀ × A^(1/3), where r₀ ≈ 1.2 fm and A is mass number.

### Best Pedagogical Sources

- Feynman Lectures on Physics, Vol. 1, Ch. 1–2 (atoms in motion, basic physics).
- MIT OCW 5.111: Principles of Chemical Science — lectures on atomic structure.
- LibreTexts, Introductory Chemistry (CK-12), Chapter 4: Atomic Structure.
- Original Rutherford paper: E. Rutherford, "The Scattering of α and β Particles by Matter and the Structure of the Atom," *Phil. Mag.* 21 (1911) 669–688.

### Bridge to Next Topic

The proton is positively charged (+e). The electron is negatively charged (−e). The neutron is neutral. This demands a treatment of **electric charge** as a physical quantity before we can say why opposite charges attract and like charges repel — which underpins why atoms are electrically neutral, why ions form, and why the Coulomb interaction governs chemistry.

---

## 3. Electric Charge

### Rigorous Definition

**Electric charge** is a fundamental intrinsic property of matter that determines electromagnetic interactions. It is quantized in units of the elementary charge e = 1.602 176 634 × 10⁻¹⁹ C (exact, 2019 SI). The SI unit is the **coulomb (C)**. There are two types: positive (+) and negative (−). Like charges repel; opposite charges attract via the **Coulomb force**:

F = k × q₁q₂/r²

where k = 1/(4πε₀) = 8.988 × 10⁹ N·m²/C², ε₀ = 8.854 187 8188(14) × 10⁻¹² F/m (vacuum electric permittivity, CODATA 2022).

Charge is **conserved** in all physical processes: the total charge of an isolated system is constant. Charge is also **quantized**: observable charges are integer multiples of e (at the level of chemistry; quarks carry fractional charges but are never observed free).

### Historical/Experimental Basis

- **Coulomb (1785):** Torsion balance experiments established the inverse-square law for electric force.
- **Faraday (1833):** Electrolysis experiments showed that a fixed quantity of charge (now called the faraday, F = N_A × e = 96 485.332 12 C/mol) deposits a mole of monovalent ions. This was the first hint that charge might be quantized.
- **Millikan (1909–1913):** Directly measured the elementary charge (see Section 2). [Wikipedia Oil Drop — https://en.wikipedia.org/wiki/Oil_drop_experiment]

### Common Misconceptions

- **Misconception:** "Positive charges move in conductors." Correction: In metallic conductors, the charge carriers are electrons (negative). "Conventional current" flows from + to − by historical convention (Franklin's choice), opposite to actual electron flow. In chemistry this matters because ions move in solution (both positive and negative carriers).
- **Misconception:** "Charge is created in chemical reactions." Correction: Charge is always conserved. In redox chemistry, electrons transfer between species; the total charge of all products = total charge of all reactants.

### Quantitative Anchors

- e = 1.602 176 634 × 10⁻¹⁹ C (exact)
- Faraday constant: F = N_A × e = 96 485.332 12 C/mol
- Charge of a proton: +1.602 176 634 × 10⁻¹⁹ C
- Charge of an electron: −1.602 176 634 × 10⁻¹⁹ C
- A neutral atom has exactly equal numbers of protons and electrons.

### Bridge to Next Topic

Having established that protons carry +e and electrons carry −e, and that atoms are electrically neutral (protons = electrons in count), we can now discuss the full organizational power of proton count: the **atomic number Z**, the organizing principle of the periodic table.

---

## 4. Elements and the Periodic Table

### Rigorous Definition

**Chemical element:** a pure substance that cannot be decomposed into simpler substances by ordinary chemical means. At the atomic level, an element consists entirely of atoms with the same number of protons (same atomic number Z). IUPAC recommends defining an element by its atomic number.

**Periodic Table:** an arrangement of elements in order of increasing atomic number, organized in rows (periods) and columns (groups/families) such that elements in the same column exhibit related chemical and physical properties (the **periodic law**). The modern form has 118 confirmed elements (as of 2023). [IUPAC Atomic Weights — https://iupac.qmul.ac.uk/AtWt]

**Moseley's Law (1913–1914):** Henry Moseley showed by X-ray spectroscopy that atomic number Z (number of protons), not atomic mass, is the true ordering principle of the periodic table. This resolved anomalies in Mendeleev's mass-ordered table (e.g., Ar/K inversion).

### Historical/Experimental Basis

**Mendeleev (1869):**  
Dmitri Mendeleev published the first periodic classification by arranging 63 known elements in order of increasing atomic weight and identifying repeating patterns in properties (periodic law). Crucially, he left gaps for undiscovered elements and correctly predicted properties of gallium (eka-aluminium, discovered 1875), scandium (eka-boron, 1879), and germanium (eka-silicon, 1886). This predictive power is what distinguishes the *system* from mere cataloguing. [Science History Institute — https://www.sciencehistory.org/stories/magazine/mendeleevs-legacy-the-periodic-system; Wikipedia History — https://en.wikipedia.org/wiki/History_of_the_periodic_table]

Lothar Meyer developed a nearly simultaneous but less complete periodic system. Priority dispute resolved in favor of Mendeleev due to his 1869 publication date and the bolder predictions.

**Noble Gases Crisis (1894–1900):**  
Lord Rayleigh and William Ramsay discovered argon (1894), helium (1895), neon, krypton, xenon (1898), and radon (1900). This required a new Group 0 (now Group 18) to be inserted, demonstrating the table's adaptability.

**Moseley (1913–1914):**  
Used characteristic X-ray frequencies to measure Z directly. Established the ordering by atomic number rather than mass. Predicted four missing elements (Z=43, 61, 72, 75). [Wikipedia History of Periodic Table — https://en.wikipedia.org/wiki/History_of_the_periodic_table]

### Common Misconceptions

- **Misconception:** "The periodic table is ordered by atomic mass." Correction: It is ordered by atomic number Z. In most cases mass and Z increase together, but inversions occur (Ar/K, Co/Ni, Te/I) precisely because isotopic abundances, not integer proton counts, determine mass.
- **Misconception:** "Groups 1–18 are a modern addition; Mendeleev's table is 'old.'" Correction: The structure of the modern table (long form, with d- and f-block) is a 20th-century development, but the underlying periodic law is Mendeleev's 1869 insight.

### Quantitative Anchors

- 118 elements confirmed (element 118, Oganesson, confirmed 2002).
- Period 1: H, He (2 elements)
- Period 2: Li through Ne (8 elements)
- Lithium is in Period 2, Group 1 (alkali metals), Z = 3.
- The periodic table has 18 columns (groups) in the modern IUPAC numbering.

### Best Pedagogical Sources

- IUPAC: https://iupac.org (authoritative source for element nomenclature, atomic weights).
- Royal Society of Chemistry: Interactive Periodic Table at www.rsc.org/periodic-table
- Mendeleev's original 1869 paper: *Über die Beziehungen der Eigenschaften zu den Atomgewichten der Elemente*, Zeitschrift für Chemie (1869).

### Bridge to Next Topic

The arrangement of elements by Z reveals that most elements exist as mixtures of atoms with different masses (isotopes). To understand **atomic mass** — the number printed under each element's symbol — we need to understand how mass is assigned to atoms and how naturally-occurring isotope mixtures affect this assignment.

---

## 5. Atomic Mass

### Rigorous Definitions

**Atomic mass unit (u, or Da):** 1 u = exactly (1/12) × mass of one carbon-12 atom. Numerical value: 1.660 539 068 92(52) × 10⁻²⁷ kg. [NIST CODATA 2022 — https://physics.nist.gov/cuu/pdf/wallet_2022.pdf]

**Isotopic mass** (also "exact atomic mass" or "relative isotopic mass"): the mass of one specific isotope expressed in unified atomic mass units (u). Not an integer because of the nuclear **mass defect** — the binding energy of the nucleus reduces the total mass below the sum of constituent nucleon masses.

**Mass number (A):** the integer count of protons + neutrons in a nucleus. Always an integer; distinct from isotopic mass.

**Standard atomic weight** (also "atomic weight," "relative atomic mass," A_r): the weighted average of the isotopic masses of all naturally occurring isotopes of an element, weighted by their natural isotopic abundance. This is the number printed on the periodic table under each element's symbol. Defined and published by IUPAC/CIAAW. [IUPAC Atomic Weights page — https://iupac.qmul.ac.uk/AtWt]

**Formula:** A_r(E) = Σᵢ [m(ⁱE) × f(ⁱE)]  
where m(ⁱE) is the isotopic mass and f(ⁱE) is the fractional abundance of isotope i.

### Historical/Experimental Basis

**Prout's Hypothesis (1815):** All atomic masses are integer multiples of the hydrogen mass. Nearly true, not exactly — discrepancy due to (1) binding energy defect and (2) isotope mixtures.

**Dumas, Cannizzaro, Lothar Meyer (1858–1860):** Standardized atomic weight measurements using gas density and chemical combining ratios. Cannizzaro's 1858 pamphlet clarified the hydrogen-based scale.

**Francis William Aston — Mass Spectrograph (1919):**  
Aston built the first mass spectrograph at the Cavendish Laboratory in Cambridge in 1919, completing it in August 1919. He immediately confirmed that neon has isotopes of mass 20 and 22 (observed by Thomson in 1912 but not proven as isotopes). By 1935 Aston had measured the exact masses of 212 isotopes. Nobel Prize in Chemistry 1922 "for his discovery, by means of his mass spectrograph, of isotopes in a large number of non-radioactive elements." [Cavendish Lab — https://cudl.lib.cam.ac.uk/view/PH-CAVENDISH-P-00655; Chemistry World — https://www.chemistryworld.com/features/the-discovery-of-mass-spectrometry/4016197.article]

Aston's "whole number rule": isotopic masses are very close to whole numbers; the small deviations (the **packing fraction**) encode the nuclear binding energy.

### Common Misconceptions

- **Misconception:** "Atomic mass = mass number." Correction: Mass number is an integer (count of nucleons); isotopic mass is a decimal (reflects binding energy; 12C is exactly 12.000 u by definition, but all other nuclides deviate). Standard atomic weight is a further average over isotope mixtures.
- **Misconception:** "The atomic weight on the periodic table is the mass of 'the' atom of that element." Correction: It is the *weighted average* over all naturally-occurring isotopes. No single atom has exactly that mass.
- **Misconception (important for lithium!):** The standard atomic weight of lithium is reported as an *interval* [6.938, 6.997] by IUPAC (2009 revision) rather than a single value, because the natural isotopic composition of lithium varies significantly depending on source (geological, industrial, commercial samples depleted in ⁶Li due to past weapons programs). [NIST Lithium — https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=Li; Wikipedia Isotopes of Lithium — https://en.wikipedia.org/wiki/Isotopes_of_lithium]

### Quantitative Anchors

- 1 u = 1.660 539 068 92(52) × 10⁻²⁷ kg
- 1 mol of ¹²C atoms = exactly 12 g (by historical convention, maintained approximately by 2019 SI redefinition)
- Mass defect: nuclear binding energy = (Σ individual nucleon masses − actual nuclear mass) × c²
- Example: ⁴He nucleus has mass 4.002 602 u; but 2p + 2n = 2(1.007276) + 2(1.008665) = 4.031882 u; mass defect = 0.029280 u = 28.3 MeV binding energy (~7 MeV/nucleon).

### Best Pedagogical Sources

- NIST Physical Reference Data: https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl
- IUPAC/CIAAW: https://ciaaw.org (Commission on Isotopic Abundances and Atomic Weights)
- Wisc-Madison OChem resource: https://wisc.pb.unizin.org/minimisgenchem/chapter/m2q3-isotopes-and-mass-spectrometry

### Bridge to Next Topic

Now that we know that atoms of the same element can have different numbers of neutrons (and therefore different masses), we are ready for **isotopes** — the key conceptual unit for the entire Li-6/Li-7 separation project.

---

## 6. Isotopes (Deep Treatment)

### Rigorous Definition

**Isotopes:** distinct nuclear species (*nuclides*) of the same chemical element. They have the same atomic number Z (same number of protons) but different numbers of neutrons N, and therefore different mass numbers A = Z + N. NIST/NIDC: "Isotopes are atoms of the same element that have the same number of protons (i.e., atomic number, 'Z') but a different number of neutrons, meaning that their mass number, 'A', varies." [NIDC — https://www.isotopes.gov/isotope-basics]

### Notation

Standard AZE notation: ᴬ_ZE, e.g., ⁶₃Li and ⁷₃Li. Since Z is determined by E (element symbol), the abbreviated form ⁶Li and ⁷Li is standard. Hyphen notation: lithium-6 and lithium-7. IUPAC recommends ⁶Li, ⁷Li style.

### How We Know: Mass Spectrometry

A mass spectrometer separates ions by mass-to-charge ratio (m/z) using:
1. **Ionization** of the sample (gas-phase ions formed).
2. **Acceleration** through an electric potential.
3. **Deflection** in a magnetic field (path radius r = mv/(qB), so r ∝ m/q for fixed B and v).
4. **Detection** — counting ions at each m/z.

The peak positions give isotopic masses; the peak heights (intensities) give the relative abundances. Fractional abundance (f_i) is determined from the ratio of peak intensity for isotope i to total intensity.

Aston's 1919 mass spectrograph was the proof-of-concept. Modern instruments achieve mass accuracy to parts per billion. [NIDC basics — https://www.isotopes.gov/isotope-basics]

**Fractional abundance calculation:**  
Standard atomic weight A_r = Σᵢ (f_i × m_i), where Σ f_i = 1.  
For lithium: A_r = (0.0759)(6.015 123) + (0.9241)(7.016 003) = 0.456 + 6.484 = 6.940 u ≈ 6.941 u (matches NIST value).

### Natural Isotopic Abundances (NIST Data)

Source: [NIST Isotopic Compositions for Lithium — https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=Li]

| Isotope | Isotopic Mass (u) | Natural Abundance (mole fraction) |
|---|---|---|
| ⁶Li | 6.015 122 8874(16) u | 0.0759(4) — i.e., 7.59 ± 0.04% |
| ⁷Li | 7.016 003 4366(45) u | 0.9241(4) — i.e., 92.41 ± 0.04% |

**Important caveat:** The Wikipedia article on isotopes of lithium (citing CIAAW 2009) gives the *range* of natural variation: ⁶Li spans [1.9%, 7.8%] and ⁷Li spans [92.2%, 98.1%] due to:
(a) natural geological fractionation in minerals/brines.
(b) industrial depletion of ⁶Li from nuclear weapons programs (depleted Li-7 stockpiles sold commercially have contaminated the reference pool).
The NIST "standard" values 7.59% / 92.41% represent the "normal" natural terrestrial sample but are not universal. [Wikipedia Isotopes of Lithium — https://en.wikipedia.org/wiki/Isotopes_of_lithium]

**Other naturally-occurring isotopes (representative examples):**
- Hydrogen: ¹H (99.985%), ²H/D (0.015%), ³H/T (trace, radioactive)
- Carbon: ¹²C (98.93%), ¹³C (1.07%), ¹⁴C (trace, radioactive)
- Oxygen: ¹⁶O (99.76%), ¹⁷O (0.04%), ¹⁸O (0.20%)

### Nuclear Stability Rules (How Many Stable Isotopes Exist)

[LibreTexts Nuclear Chemistry 21.2 — https://chem.libretexts.org/Courses/Heartland_Community_College/HCC%3A_Chem_162/21%3A_Nuclear_Chemistry/21.2%3A_Patterns_of_Nuclear_Stability]

- ~339 naturally-occurring isotopes, of which ~250 are stable (half-life > 10× age of Earth).
- Stable nuclei lie along a **band of stability** ("peninsula of stability" in the N vs. Z chart).
- For light nuclei (Z < 20): stable N/Z ≈ 1 (roughly equal neutrons and protons).
- For heavy nuclei: N/Z increases toward ~1.5 as electrostatic repulsion between protons requires more neutrons (which provide attractive strong-force without adding repulsion).
- All nuclides with Z > 83 (bismuth) are radioactive.
- **Magic numbers** of nucleons (2, 8, 20, 50, 82, 126) confer extra stability (analogous to noble-gas electron configurations in chemistry).
- **Even-even nuclei** (even Z, even N) are most stable: 166 of 279 stable nuclides are even-even. Only 6 stable nuclei have both odd Z and odd N.

**For lithium specifically:** ⁶Li (Z=3, N=3) and ⁷Li (Z=3, N=4) are both stable — the only two stable lithium isotopes. Note that both have anomalously low binding energy per nucleon (⁶Li: 5,332.3 keV/nucleon; ⁷Li: 5,606.4 keV/nucleon) compared to neighboring elements He (~7,074 keV/nucleon for ⁴He) and Be (~6,463 keV/nucleon for ⁹Be). This makes both isotopes efficiently destroyed in stellar interiors by proton reactions, and their cosmic synthesis requires non-equilibrium conditions (Big Bang nucleosynthesis and cosmic-ray spallation). [Wikipedia Isotopes of Lithium — https://en.wikipedia.org/wiki/Isotopes_of_lithium]

### Radioactive Decay Modes (Brief, for Context)

- **Alpha decay:** nucleus emits ⁴He nucleus (α); Z → Z−2, A → A−4.
- **Beta-minus decay (β⁻):** neutron → proton + electron + antineutrino; Z → Z+1, A unchanged.
- **Beta-plus decay (β⁺):** proton → neutron + positron + neutrino; Z → Z−1, A unchanged.
- **Gamma emission:** nucleus relaxes from excited state by emitting a photon; Z and A unchanged.
- **Electron capture:** inner-shell electron captured by nucleus; proton → neutron; Z → Z−1.

⁸Li (Z=3, N=5): undergoes β⁻ decay, half-life 838.7 ms. ⁹Li: β⁻ decay, half-life 178.2 ms. ¹¹Li: β⁻ decay + neutron emission, half-life 8.75 ms; this is a halo nucleus (two loosely-bound "halo" neutrons).

### Why Isotopes of the Same Element Have Nearly Identical Chemistry

This is a deep point for the curriculum: if isotopes are "different atoms," why do they behave almost identically chemically?

**The Born-Oppenheimer Approximation** (Born & Oppenheimer, 1927): The molecular wavefunction can be factored into an electronic part and a nuclear part because electrons move ~1836× faster than nuclei. In the electronic Schrödinger equation, the nuclear masses appear **only** in the kinetic energy term — and at zeroth order (the BO approximation), nuclear mass is treated as infinite, so the electronic Hamiltonian is mass-independent. The **potential energy surface** — which governs molecular geometry, bond lengths, and chemical reactions — is therefore **identical** for all isotopologues (molecules differing only in isotope composition) to BO approximation. [Wikipedia Born-Oppenheimer — https://en.wikipedia.org/wiki/Born%E2%80%93Oppenheimer_approximation; LibreTexts — https://chem.libretexts.org/Courses/Pacific_Union_College/Quantum_Chemistry/09%3A_Chemical_Bonding_in_Diatomic_Molecules/9.01%3A_The_Born-Oppenheimer_Approximation_Simplifies_the_Schr%C3%B6dinger_Equation_for_Molecules]

The **reduced mass** (μ = m₁m₂/(m₁+m₂)) of the bond does change with isotope substitution. This affects:
1. **Zero-point energy (ZPE):** E_ZPE = (1/2)hν = (h/2)√(k/μ). Heavier isotope → larger μ → smaller ν → lower ZPE. Lower ZPE means heavier isotope's bond is *more stable* (harder to break).
2. **Vibrational frequencies:** ν ∝ 1/√μ. Heavier isotopes have lower vibrational frequencies.

These small mass-dependent effects are exploited in isotope separation (see kinetic/equilibrium isotope effects below).

### Kinetic Isotope Effect (KIE)

[LibreTexts KIE — https://chem.libretexts.org/Bookshelves/Inorganic_Chemistry/Map%3A_Inorganic_Chemistry_(Housecroft)/10%3A_Hydrogen/10.03%3A_Isotopes_of_Hydrogen/10.3B%3A_Kinetic_Isotope_Effects; Bigeleisen & Goeppert-Mayer, J. Chem. Phys. 15, 261 (1947)]

**Definition:** The KIE is the ratio of rate constants for a reaction involving a light vs. heavy isotopologue, k_H/k_D (for H/D substitution, the most dramatic case).

**Mechanism:** Heavier isotope → lower ZPE → larger energy gap to transition state → slower reaction.

**Order of magnitude for H/D:** kH/kD ≈ 2–7 at room temperature (primary KIE when the isotope-substituted bond is broken in the rate-limiting step). Rule of thumb for heavy atoms (e.g., ⁶Li/⁷Li): maximum isotope effect ≈ √(m_heavy/m_light). For Li: √(7/6) = 1.080 — so at most ~8% rate difference per step.

**For ⁶Li/⁷Li:** The mass difference is only 1 amu on a base of 6–7 amu (fractional change ~14–17%), so the KIE is real but modest. It is responsible for measurable fractionation in geological and biological systems.

### Equilibrium Isotope Effect (EIE)

The EIE describes differential partitioning of isotopes between two phases/chemical environments at equilibrium. The equilibrium constant K for an isotope exchange reaction differs from 1 because of the different ZPEs and vibrational partition functions.

Example: if ⁶Li prefers to stay in solution while ⁷Li prefers to concentrate in an adsorbed/amalgam phase (or vice versa), the system can be used for separation. The exact direction depends on the bonding environment and temperature.

### The Separation Factor α

The **separation factor** α quantifies the efficacy of a single equilibration step for isotope separation:

α = (x_A / (1 - x_A)) / (x_B / (1 - x_B))

where x_A and x_B are the mole fractions of the desired isotope in the two coexisting phases (A and B). For Li-6/Li-7 separation:

- COLEX process (Hg amalgam / LiOH solution): α ≈ **1.040–1.050** [Berkeley NE-170 report — https://fhr.nuc.berkeley.edu/wp-content/uploads/2014/10/12-005_NE-170_Lithium-Enrichment.pdf gives 1.042]
- Ion-exchange methods: α ≈ 1.01–1.02 per stage [TRANSAT project — https://transat-h2020.eu/wp-content/uploads/2022/01/TRANSAT-D1.2-Report-on-the-Assessment-of-a-Viable-Route-for-the-Separation-of-Lithium-Isotope.pdf]
- Vacuum distillation: theoretical maximum ≈ √(7/6) ≈ 1.080 (square root of mass ratio, from Graham's law analog)

Because α is close to 1, **cascade** operations (many stages) are required to achieve significant enrichment — exactly like uranium enrichment.

### Isotope Variation in Samples: Important Warning for Curriculum

The IUPAC Commission on Isotopic Abundances and Atomic Weights (CIAAW) changed the standard atomic weight of lithium in 2009 from a single value to an interval [6.938, 6.997] precisely because commercial lithium samples are contaminated by depleted Li from nuclear weapons programs (enriched ⁶Li was extracted; the depleted Li remainder, enriched in ⁷Li, was sold). This means a student cannot reliably use the "atomic mass of Li = 6.941" as a universal constant in isotope calculations. [Wikipedia Isotopes of Lithium — https://en.wikipedia.org/wiki/Isotopes_of_lithium, citing Coplen et al. 2002; Holden 2010]

### Best Pedagogical Sources

- NIDC (National Isotope Development Center): https://www.isotopes.gov/isotope-basics
- IAEA: http://www.iaea.org/newscenter/news/what-are-isotopes
- LibreTexts Nuclear Chemistry: https://chem.libretexts.org (Chapter 21)
- Bigeleisen, J., Goeppert-Mayer, M.: "Calculation of Equilibrium Constants for Isotopic Exchange Reactions," *J. Chem. Phys.* 15, 261 (1947) — the foundational paper on isotope effects.
- Khan Academy: https://www.khanacademy.org/science/ap-chemistry-beta/...mass-spectrometry-of-elements

### Bridge to Next Topic

Isotopes of the same element have the same number of protons (same Z) and the same electron configuration. By contrast, **ions** have different numbers of electrons from protons — they carry a net charge. Moving from isotopes to ions shifts the focus from the nucleus to the electron cloud.

---

## 7. Ions and Ionization (Deep Treatment)

### Rigorous Definitions

**Ion:** an atom or molecule that has a net electric charge due to a difference between the number of protons and the number of electrons. An atom becomes an ion by gaining or losing one or more electrons.
- **Cation:** positive ion (lost electrons); more protons than electrons.
- **Anion:** negative ion (gained electrons); more electrons than protons.

**Ionization energy (IE, or ionization potential):** the minimum energy required to remove an electron from an isolated neutral gaseous atom (or from a gaseous ion in successive ionization):  
X(g) → X⁺(g) + e⁻    ΔE = IE₁ (first ionization energy)  
Units: kJ/mol or eV (1 eV = 96.485 kJ/mol).

**Electron affinity (EA):** the energy change when an electron is added to a neutral gaseous atom:  
X(g) + e⁻ → X⁻(g)    ΔE = −EA (usually exothermic, so EA > 0 for most nonmetals)

### Historical/Experimental Basis

Ionization energies are determined from:
1. **Spectroscopy:** the Rydberg formula gives ionization energies of hydrogen-like atoms from spectral line series (Balmer, Lyman, etc.). For multi-electron atoms: photoelectron spectroscopy (PES).
2. **Mass spectrometry:** threshold ionization methods.
3. **Electron impact:** collide electrons with atoms, measure threshold voltage for ion formation.

### Lithium Ionization Energies (Specific Values)

| Ionization Event | Energy |
|---|---|
| Li(g) → Li⁺(g) + e⁻ (1st IE) | 520.2 kJ/mol (5.39 eV) |
| Li⁺(g) → Li²⁺(g) + e⁻ (2nd IE) | 7,298 kJ/mol (75.6 eV) |
| Li²⁺(g) → Li³⁺(g) + e⁻ (3rd IE) | 11,815 kJ/mol |

[periodictable.com — https://periodictable.com/Properties/A/IonizationEnergies.an.html]

The enormous jump from 1st to 2nd IE (factor ~14) confirms that Li's one valence electron (2s¹) is much more easily removed than the core electrons (1s²) — the core electrons are much closer to the nucleus and much more tightly bound.

### Ionic Radii — Shannon's Effective Ionic Radii

The definitive table is: R.D. Shannon, "Revised Effective Ionic Radii and Systematic Studies of Interatomic Distances in Halides and Chalcogenides," *Acta Cryst.* A32, 751–767 (1976). [Full PDF — https://pxrd.ucoz.ru/Radios_ionicos_de_Shannon_5291.pdf]

Shannon's radii are coordination-number dependent. For Li⁺:

| Coordination Number | Shannon Ionic Radius (Li⁺) |
|---|---|
| 4-coordinate (tetrahedral) | 59 pm (0.59 Å) |
| 6-coordinate (octahedral) | 76 pm (0.76 Å) |
| 8-coordinate | 92 pm (0.92 Å) |

For comparison, the **atomic radius** of lithium metal: ~152 pm (metallic radius); covalent radius ~128 pm; Van der Waals radius ~182 pm.

The dramatic shrinkage from Li atom (152 pm) to Li⁺ (76 pm, 6-coord.) — a factor of two in radius — results from removal of the entire 2s shell; the ion retains only the 1s² core pulled tightly inward by Z=3 nuclear charge.

[WebElements periodic table notes on Li sizes — https://www.webelements.com/lithium/atom_sizes.html]

**Why this matters for Li-6/Li-7 separation:** Li⁺ is the smallest singly-charged alkali metal cation. Its tiny size drives its anomalous chemistry (high charge density, strong solvation, covalent character in bonds) — and isotopic differences in solvation shell structure between ⁶Li⁺ and ⁷Li⁺ are what drive equilibrium isotope effects that enable separation.

### Hydration / Solvation Shells

When ions dissolve in water (or other polar solvents), solvent molecules organize around the ion in **solvation shells** (specifically **hydration shells** in water). [Wikipedia Solvation Shell — https://en.wikipedia.org/wiki/Solvation_shell]

For a cation like Li⁺: the electronegative oxygen atoms of water molecules point toward the cation, driven by ion-dipole interactions. The first solvation shell of Li⁺ contains typically **4–6 water molecules** (coordination number depends on concentration and temperature). The first shell is tightly bound; second and outer shells are progressively more loosely organized.

Li⁺ has one of the largest **hydration enthalpies** of all monovalent cations: ΔH_hyd(Li⁺) ≈ −515 kJ/mol, because its small ionic radius concentrates the +1 charge density, exerting strong ion-dipole forces on nearby water molecules. Compare: Na⁺ ≈ −405 kJ/mol, K⁺ ≈ −321 kJ/mol.

The **hydration number** (number of tightly-bound first-shell waters) for Li⁺ ≈ 4 (primary), 12–14 total in extended shell. For ⁶Li⁺ vs. ⁷Li⁺, the hydration shell structure is subtly different (heavier isotope has slightly lower ZPE in the Li–O stretching mode), which creates the equilibrium isotope effect exploited in separation.

### Ionic Conductivity and Mobility

In solution, ions carry electric current by moving toward electrodes of opposite charge. **Ionic conductivity** (λ) and **mobility** (u = drift velocity / electric field) are related by:

λ = |z| × F × u

where z is ion charge, F is Faraday constant, u is ionic mobility.

Counter-intuitively: among alkali cations, **Li⁺ has the lowest molar ionic conductivity in aqueous solution** despite being smallest (λ° for Li⁺ = 38.7 S·cm²/mol; Na⁺ = 50.1; K⁺ = 73.5). Reason: Li⁺'s tight hydration shell makes its *effective hydrated radius* large (~240 pm) compared to K⁺'s hydrated radius (~200 pm). The "bare" small ion becomes a large hydrated complex.

### Activity Coefficients

Real ionic solutions deviate from ideal behavior because ions interact electrostatically with each other. The **activity** a of an ion is:

a = γ × [C]

where [C] is the molar concentration and **γ is the activity coefficient** (dimensionless; γ = 1 for ideal behavior, γ < 1 for most electrolytes at moderate concentration, due to ion-ion attractions).

The **Debye-Hückel limiting law** (for dilute solutions): log γ± = −A|z₊z₋|√I, where I = ionic strength = (1/2)Σ cᵢzᵢ². Activity coefficients matter when calculating real equilibria in ionic solutions. For isotope separation calculations, the ratio of activity coefficients of ⁶Li⁺ vs. ⁷Li⁺ is extremely close to 1 (the mass difference barely affects electrostatic interactions) but is not exactly 1, contributing to the EIE.

### Ions in Solution as Quasi-Particles

From a rigorous physical chemistry perspective, ions in solution are not bare point charges but complex dynamic entities: the ion plus its solvation shell can be treated as a quasi-particle with an **effective hydrodynamic radius** (Stokes radius), effective mass (ion + coordinated solvent), and characteristic exchange dynamics for coordinated solvent molecules. Li⁺ water exchange rate ≈ 10⁷ s⁻¹ (fast but slower than K⁺ due to stronger binding). [AIP J. Chem. Phys. water exchange — https://pubs.aip.org/aip/jcp/article/152/22/224106/1018095]

### Common Misconceptions

- **Misconception:** "The smallest ion moves fastest in solution." Correction: Hydrated ionic radius dominates transport, not bare ionic radius. Li⁺ moves *slower* than K⁺ in water.
- **Misconception:** "Anions are just negative versions of cations." Correction: Anion hydration is structurally different — water molecules point their H atoms toward anions (H-bond donors) rather than O atoms. Solvation enthalpy follows different trends.

### Best Pedagogical Sources

- Atkins' Physical Chemistry, Ch. 20: "Ions in Solution"
- Purdue Chem: https://chemed.chem.purdue.edu/genchem/topicreview/bp/ch7/ie_ea.html
- Shannon (1976): canonical ionic radii reference — Acta Cryst. A32, 751.
- Database of ionic radii: http://abulafia.mt.ic.ac.uk/shannon

### Bridge to Next Topic

Ions form when atoms gain or lose electrons. Whether atoms gain, lose, or share electrons in chemical combinations is governed by **electronegativity** and the energetics of bonding — the next topic.

---

## 8. Chemical Bonding Basics

### Rigorous Definitions

**Chemical bond:** an attractive interaction between atoms or ions sufficiently strong to permit a stable aggregate (molecule, lattice, or complex) to be characterized.

Three principal types:

**Ionic bond:** electrostatic attraction between oppositely charged ions, formed when one atom transfers one or more electrons to another. Typically between metals (low IE, readily lose electrons) and nonmetals (high EA, readily gain electrons). Electronegativity difference (ΔEN) > ~1.7 (Pauling scale) conventionally indicates ionic character dominant (though the boundary is a continuum, not a sharp cutoff).

**Covalent bond:** electrons are *shared* between two atoms rather than transferred. Occurs when ΔEN is small (< ~0.4 nonpolar; 0.4–1.7 polar covalent). Energy described by potential energy curve with equilibrium bond length and dissociation energy.

**Metallic bond:** electrons are delocalized across a lattice of cations; gives rise to electrical conductivity, malleability.

**Electronegativity (EN, Pauling scale):** "The ability of an atom in a particular molecule to attract electrons to itself." Pauling defined it via bond dissociation energies: EN values range from F (3.98, most electronegative) to Cs (0.79, least).

For lithium: EN(Li) = 0.98 (Pauling scale). Li forms ionic bonds with most nonmetals (e.g., LiF, LiCl, Li₂O) but shows anomalous covalent character for an alkali metal due to its high charge density (see Section 10).

### Electron Configuration and the Valence Shell

**Aufbau principle:** electrons fill orbitals from lowest energy upward.  
**Hund's rule:** within a subshell, electrons occupy orbitals singly before pairing.  
**Pauli exclusion principle:** no two electrons in an atom can have the same four quantum numbers.

Lithium (Z=3): 1s² 2s¹  
- Core electrons: 1s² (helium-like core, tightly bound)
- Valence electron: one 2s¹ electron (determines chemistry)

### Common Misconceptions

- **Misconception:** "Ionic bonds are 100% ionic and covalent bonds are 100% covalent." Correction: all bonds exist on a continuum of ionic/covalent character. Even "ionic" LiF has ~8% covalent character by quantum-chemical analysis.
- **Misconception:** "Lewis dot structures tell you the full structure of a molecule." Correction: Lewis structures are a bookkeeping tool for electron count, not a quantum mechanical description. They do not capture bond angles (need VSEPR/geometry), bond lengths, or electron delocalization.

### Bridge to Next Topic

Chemical behavior is strongly influenced by the **state of matter** — gas, liquid, or solid — and by whether substances are in **solution**. The behavior of lithium as a metal, Li⁺ as an ion in brine, and Li compounds in industrial processing all depend on these concepts.

---

## 9. States of Matter and Solutions

### Rigorous Definitions

**State of matter (phase):** a form of matter characterized by (a) the degree of ordering of constituent particles and (b) the balance between cohesive inter-particle interactions and thermal kinetic energy.

- **Solid:** particles (atoms, molecules, ions) in fixed positions with long-range order (crystals) or short-range order (amorphous). Incompressible, defined shape, defined volume.
- **Liquid:** particles in contact (short-range interactions, no long-range order). Defined volume but takes the shape of its container. Flows; surface tension present.
- **Gas:** particles widely separated, negligible inter-particle interactions (ideal gas approximation). Fills any container; highly compressible.
- **Plasma:** ionized gas at high temperature; electrons dissociated from nuclei. Fourth fundamental state (not usually relevant at intro level).

Phase transitions are thermodynamically defined by equality of Gibbs free energies of coexisting phases.

[State of matter Wikipedia — https://en.wikipedia.org/wiki/State_of_matter; Purdue — https://www.chem.purdue.edu/gchelp/atoms/states.html]

### Solutions and the Dissolution of Ionic Compounds

A **solution** is a single-phase, homogeneous mixture. In an ionic **electrolyte solution** (e.g., LiOH dissolved in water):
1. The crystal lattice breaks apart (**lattice energy** absorbed).
2. Ions are stabilized by solvation shells (**hydration energy** released).
3. Net dissolution is favorable (ΔG_sol < 0) if hydration energy > lattice energy for that compound.

LiOH: highly soluble in water; Li⁺ is heavily hydrated due to its high charge density.

**Concentration:** moles of solute per liter of solution (molarity, M, mol/L).  
**Activity vs. concentration:** at high ionic strength, activity a = γ[C] where γ < 1 (Debye-Hückel). In dilute solutions γ → 1 and a ≈ [C].

### Relevance to Lithium Separation

The COLEX process operates with lithium dissolved in two coexisting liquid phases: an **aqueous LiOH solution** and a **mercury amalgam** (liquid Li-Hg). Phase equilibration between these two liquid states, driven by differential affinity of ⁶Li⁺ vs. ⁷Li⁺ for each phase, is the operational mechanism of isotope separation. [Wikipedia COLEX — https://en.wikipedia.org/wiki/COLEX_process]

---

## 10. Lithium Specifically

### Position on the Periodic Table

- **Symbol:** Li  
- **Atomic number:** Z = 3  
- **Period:** 2 (second row of the periodic table)  
- **Group:** 1 (alkali metals, Group IA in old notation)  
- **Neighbors:** Hydrogen above (H, Z=1) in the group; Beryllium (Be, Z=4) to the right; Sodium (Na, Z=11) below in the group.  
- **Electron configuration:** [He] 2s¹ or written out fully: 1s² 2s¹  
- **Valence electron count:** 1 (the 2s¹ electron)

### Physical Properties (Elemental Lithium)

- Lightest of all metals; lightest solid element at standard conditions.
- Density: 0.534 g/cm³ (floats on water; also floats on most oils, stored in mineral oil due to reactivity).
- Melting point: 180.5°C; boiling point: 1330°C (highest m.p. and b.p. among alkali metals — another anomaly).
- Appearance: silvery-white metal, soft but harder than other alkali metals.
- Covalent radius: ~128 pm; metallic radius: ~152 pm; ionic radius (Li⁺, 6-coordinate): 76 pm.

### Why Lithium is the "Weird" Alkali Metal — The Diagonal Relationship

Lithium is anomalous among alkali metals in several respects, summarized as the **diagonal relationship** — lithium chemically resembles magnesium (Z=12, Group 2, Period 3) more than it resembles its own Group 1 neighbors (Na, K, Rb, Cs). [LibreTexts Barron — https://chem.libretexts.org/Bookshelves/Inorganic_Chemistry/Chemistry_of_the_Main_Group_Elements_(Barron)/03%3A_Group_1_-_The_Alkali_Metals/3.03%3A_The_Anomalous_Chemistry_of_Lithium; Wikipedia Diagonal Relationship — https://en.wikipedia.org/wiki/Diagonal_relationship]

**Root cause:** Li⁺'s ionic radius (76 pm, 6-coord.) and Li's charge density (+1/76 pm) are very close to Mg²⁺ (72 pm, 6-coord., +2/72 pm = similar ionic potential). Moving one step to the right and one step down in the periodic table roughly cancels the changes in size and electronegativity.

**Specific anomalies of lithium vs. other alkali metals:**

1. **Normal oxide only:** Li burns in excess O₂ to give Li₂O (lithium oxide) — just the normal oxide. Na gives Na₂O₂ (peroxide), K/Rb/Cs give superoxides (MO₂). This parallels Mg, which also forms only MgO. [Wikipedia Diagonal Relationship — https://en.wikipedia.org/wiki/Diagonal_relationship]

2. **Stable nitride:** Li₃N is the only stable Group 1 nitride formed directly from the elements at room temperature. All Group 2 metals also form nitrides. No other alkali metal forms a stable room-temperature nitride.

3. **Sparingly soluble salts:** Li₂CO₃, Li₃PO₄, and LiF are sparingly soluble in water, paralleling Mg (MgCO₃, Mg₃(PO₄)₂, MgF₂ are insoluble). Other alkali metal fluorides, carbonates, and phosphates are highly soluble.

4. **Covalent/organometallic character:** LiCH₃ (methyllithium) and other organolithium compounds are among the most useful synthetic reagents precisely because Li–C bonds have significant *covalent* character, unlike the fully ionic organosodium/organopotassium species. Grignard reagents (Mg-based) have similar covalent character — again, Li behaves like Mg.

5. **Deliquescent chloride:** LiCl absorbs moisture from air and is soluble in alcohols — unusual for an "ionic" Group 1 chloride, and similar to MgCl₂·6H₂O.

6. **Higher melting point, hardness:** Li is harder and has higher melting/boiling points than other alkali metals (relatively — it is still very soft by metals standards), consistent with its smaller size meaning the metallic bonding is stronger.

**Charge density perspective:** Li⁺ has charge density (z/r, using ionic radius) of +1/76 pm ≈ 0.013 pm⁻¹. Mg²⁺: +2/72 pm ≈ 0.028 pm⁻¹. Na⁺: +1/102 pm ≈ 0.0098 pm⁻¹. The high charge density of Li⁺ drives: strong solvation in polar solvents, high lattice energies for Li salts, tendency toward covalency, and the anomalous properties above. [Anomalous behavior of Li — http://mycollegevcampus.com/sjcet/notes/353CH81_DAY-III.pdf]

### Natural Occurrence of Lithium

Lithium is not found as a free metal in nature (too reactive). It occurs in:

1. **Brine deposits** (subsurface salt brines in closed-basin lake systems, especially in the Atacama / Andean altiplano region: Chile, Bolivia, Argentina, known as the "Lithium Triangle"). Brines are pumped up and evaporated in solar ponds to concentrate Li.

2. **Spodumene** (LiAlSi₂O₆): a pyroxene mineral in pegmatite rocks. Major hard-rock mining in Australia (Pilbara region), Zimbabwe, Canada.

3. **Other lithium-bearing minerals:** petalite (LiAlSi₄O₁₀), lepidolite (K(Li,Al)₃(Al,Si,Rb)₄O₁₀(F,OH)₂), amblygonite (LiAlFPO₄). 

4. **Seawater:** Li ≈ 0.17 ppm — in principle extractable but currently uneconomic.

5. **Cosmological abundance:** Li is the third element created in Big Bang nucleosynthesis (~5×10⁻¹⁰ of all primordial baryonic matter as ⁷Li). However, stellar processing efficiently destroys lithium, making it less abundant cosmically than neighboring elements C, N, O. [Wikipedia Isotopes of Lithium — https://en.wikipedia.org/wiki/Isotopes_of_lithium]

Top producers (2022): Australia (hard rock, spodumene), Chile (brine), China. [Wikipedia Li production — https://en.wikipedia.org/wiki/List_of_countries_by_lithium_production]

### Industrial Uses

1. **Lithium-ion batteries:** largest and fastest-growing use. Li⁺ intercalates reversibly into electrode materials (graphite anode, LiCoO₂/LiFePO₄/NMC cathode). Electric vehicles, consumer electronics.

2. **Ceramics and glass:** LiO₂ added to glass increases thermal shock resistance (Pyrex-type glasses); used in cookware, telescopes.

3. **Lubricating greases:** lithium soap greases; ~70% of all lubricating grease uses lithium.

4. **Mental health pharmacology:** Li⁺ (as Li₂CO₃ or LiCl) is the first-line mood stabilizer for bipolar disorder.

5. **Thermonuclear weapons:** ⁶Li in lithium deuteride (⁶LiD) reacts with neutrons to produce tritium (³H), which fuses with deuterium. This is the booster/secondary stage of hydrogen bombs. [COLEX Wikipedia — https://en.wikipedia.org/wiki/COLEX_process]

6. **Nuclear fusion reactors (ITER, DEMO):** ⁶Li enrichment required in the tritium breeding blanket. D + T → ⁴He + n; T is bred from ⁶Li + n → ⁴He + T. Target enrichment: 30–90% ⁶Li (vs. natural 7.59%). No current industrial-scale ⁶Li production outside China and Russia.

7. **Nuclear reactor coolant (PWR/MSR):** highly enriched ⁷Li (>99.9%) used in pressurized water reactors as pH buffer (LiOH) in primary coolant, chosen precisely because ⁷Li has very low neutron capture cross-section (~45 millibarns) vs. ⁶Li (~940 barns). [Wikipedia Isotopes of Lithium — https://en.wikipedia.org/wiki/Isotopes_of_lithium]

### Li-6 / Li-7 Isotopic Data (Verified from NIST and Multiple Sources)

**NIST Official Values** (from https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=Li):

| Isotope | Isotopic Mass (Da) | Fractional Abundance | 
|---|---|---|
| ⁶Li | 6.015 122 8874(16) u | 0.0759(4) = **7.59 ± 0.04%** |
| ⁷Li | 7.016 003 4366(45) u | 0.9241(4) = **92.41 ± 0.04%** |

**Standard atomic weight of Li:** [6.938, 6.997] (IUPAC interval, due to natural variation and industrial depletion of ⁶Li)

**Important cross-check:** Some older sources cite ⁶Li = 7.5% and ⁷Li = 92.5%, or even 7.4%/92.6% (rounded). The NIST value 7.59% is the more precise current standard for "normal" terrestrial lithium. The curriculum should use 7.59% / 92.41% with NIST as primary citation and note the real-world variation caveat.

**Nuclear properties (key for separation motivation):**

| Property | ⁶Li | ⁷Li |
|---|---|---|
| Neutron capture cross-section (thermal) | ~940 barns | ~0.045 barns (~45 millibarns) |
| Reaction with thermal neutrons | ⁶Li + n → ⁴He + ³H (tritium) | Essentially transparent to slow neutrons |
| Nuclear spin | I = 1 | I = 3/2 |
| Nuclear quadrupole moment | Smallest nonzero of any stable nucleus | Larger |

⁶Li's large neutron absorption cross-section (~940 barns) vs. ⁷Li's tiny value (~45 millibarns) is a factor of ~20,000 difference. This is the entire reason for isotope separation: ⁶Li must be enriched for tritium breeding, and ⁷Li must be enriched to remove ⁶Li from reactor coolant (where ⁶Li would produce tritium via neutron capture).

### The Li-6/Li-7 Separation Problem (Bridge to Parent Project)

**The challenge:** Natural Li is 7.59% ⁶Li. To achieve 30–90% ⁶Li enrichment for fusion blankets, starting from natural Li, requires a separation factor α ≈ 1.04 per stage (COLEX process). To go from 7.59% to, say, 30% ⁶Li enrichment requires solving the cascade equation:

Number of stages N ≈ ln[(x_P/x_F) × ((1-x_F)/(1-x_P))] / ln(α)

where x_P = product enrichment fraction, x_F = feed fraction. For x_F = 0.0759, x_P = 0.30, α = 1.042: N ≈ ln(0.30/0.0759 × 0.9241/0.70) / ln(1.042) ≈ ln(5.19) / 0.0411 ≈ 40 stages.

This explains why COLEX operated as a cascade column (counter-current flow) with many theoretical stages, and why the process used 24 million pounds of mercury and ran for 8 years (1955–1963) at Y-12 (Oak Ridge). [COLEX Wikipedia — https://en.wikipedia.org/wiki/COLEX_process; Berkeley NE-170 — https://fhr.nuc.berkeley.edu/wp-content/uploads/2014/10/12-005_NE-170_Lithium-Enrichment.pdf]

**Current status:** China is currently the world's only industrial-scale ⁶Li enricher. New mercury-free approaches under development include:
- Crown-ether extraction (ion-exchange chromatography)
- Electrochemical methods (vanadium oxide selective intercalation, reported 2025 by ETH Zürich/Texas A&M: selective trapping of ⁶Li⁺ in ζ-V₂O₅). [Wikipedia citing Cell 2025 — https://en.wikipedia.org/wiki/Isotopes_of_lithium]
- Laser isotope separation (AVLIS, selective photoionization)

---

## Appendix: Key Numerical Constants (NIST CODATA 2022)

All from: [https://physics.nist.gov/cuu/pdf/wallet_2022.pdf]

| Quantity | Symbol | Value | Units |
|---|---|---|---|
| Speed of light in vacuum | c | 299 792 458 (exact) | m/s |
| Planck constant | h | 6.626 070 15 × 10⁻³⁴ (exact) | J·Hz⁻¹ |
| Elementary charge | e | 1.602 176 634 × 10⁻¹⁹ (exact) | C |
| Avogadro constant | N_A | 6.022 140 76 × 10²³ (exact) | mol⁻¹ |
| Boltzmann constant | k_B | 1.380 649 × 10⁻²³ (exact) | J/K |
| Atomic mass unit | u | 1.660 539 068 92(52) × 10⁻²⁷ | kg |
| Electron mass | m_e | 9.109 383 7139(28) × 10⁻³¹ | kg |
| Proton mass | m_p | 1.672 621 925 95(52) × 10⁻²⁷ | kg |
| Neutron mass | m_n | 1.674 927 498 04(95) × 10⁻²⁷ | kg |
| Proton/electron mass ratio | m_p/m_e | 1836.152 673 426(32) | dimensionless |
| Bohr radius | a₀ | 5.291 772 105 44(82) × 10⁻¹¹ | m |
| Molar gas constant | R | 8.314 462 618 ... (exact) | J·mol⁻¹·K⁻¹ |
| Faraday constant | F | 96 485.332 12 ... | C/mol |
| Fine-structure constant | α | 7.297 352 5643(11) × 10⁻³ | dimensionless |

Numbers in parentheses are 1σ uncertainties in the last two digits. Values marked "exact" have zero uncertainty (defined constants in 2019 SI).

---

## Appendix: Key Authoritative Source List

| Domain | Source | URL |
|---|---|---|
| Fundamental constants | NIST CODATA 2022 | https://physics.nist.gov/cuu/Constants |
| Isotopic abundances | NIST Isotopic Compositions | https://physics.nist.gov/cgi-bin/Compositions |
| Atomic weights | IUPAC / CIAAW | https://ciaaw.org |
| Ionic radii | Shannon (1976), Acta Cryst. A32 | https://pxrd.ucoz.ru/Radios_ionicos_de_Shannon_5291.pdf |
| Shannon database | Abulafia | http://abulafia.mt.ic.ac.uk/shannon |
| Physical chemistry text | Atkins' Physical Chemistry 11th ed. | — |
| Intro chemistry text | OpenStax Chemistry 2e | https://openstax.org/books/chemistry-2e |
| LibreTexts chemistry | LibreTexts | https://chem.libretexts.org |
| Isotope basics | NIDC | https://www.isotopes.gov/isotope-basics |
| KIE theory | Bigeleisen & Goeppert-Mayer, J. Chem. Phys. 15, 261 (1947) | — |
| Li isotope separation | Wikipedia COLEX | https://en.wikipedia.org/wiki/COLEX_process |
| Li isotopes | Wikipedia Isotopes of Lithium | https://en.wikipedia.org/wiki/Isotopes_of_lithium |
| Nuclear stability | LibreTexts Chem 162, Ch. 21.2 | https://chem.libretexts.org/Courses/Heartland_Community_College |
| Li anomalous chemistry | LibreTexts Barron Inorganic Ch. 3.3 | https://chem.libretexts.org/Bookshelves/Inorganic_Chemistry/Chemistry_of_the_Main_Group_Elements_(Barron) |
| Feynman Lectures | Caltech | https://www.feynmanlectures.caltech.edu |
| Rutherford experiment | LibreTexts | https://chem.libretexts.org/Bookshelves/Introductory_Chemistry/Introductory_Chemistry_(CK-12)/04%3A_Atomic_Structure/4.14%3A_Gold_Foil_Experiment |
| Oil drop experiment | Wikipedia | https://en.wikipedia.org/wiki/Oil_drop_experiment |
| Born-Oppenheimer | Wikipedia | https://en.wikipedia.org/wiki/Born%E2%80%93Oppenheimer_approximation |
| Li-6 enrichment process | Berkeley NE-170 | https://fhr.nuc.berkeley.edu/wp-content/uploads/2014/10/12-005_NE-170_Lithium-Enrichment.pdf |

---

*End of research notes. Compiled from NIST, IUPAC, Wikipedia (cross-referenced), LibreTexts, and web searches. All numerical values from NIST CODATA 2022 unless otherwise stated.*
