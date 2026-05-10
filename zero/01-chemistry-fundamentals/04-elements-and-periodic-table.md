# 04 — Elements and the Periodic Table

## Prerequisite check

You've absorbed `01–03`. You know atoms have a positive nucleus and an
electron cloud, and that charge drives chemistry.

## Rigorous statement

An **element** is a substance composed entirely of atoms that all share the
same number of protons. The number of protons in the nucleus is the
**atomic number**, $Z$. **Z is the element's identity** — change Z and you
have a different element.

There are 118 confirmed elements as of 2026, numbered Z = 1 (hydrogen)
through Z = 118 (oganesson). Elements 1–94 occur naturally on Earth in
detectable amounts; elements 95–118 are synthesized in particle accelerators
and are radioactive with very short half-lives.

The **periodic table** organizes the elements in a 2D grid such that elements
with similar chemical behavior are aligned in vertical **groups** (columns)
and elements with the same number of electron *shells* are arranged in
horizontal **periods** (rows). The periodicity arises from the
quantum-mechanical structure of electron orbitals.

## Plain-English unpacking

If you take a hydrogen atom (Z=1) and add a proton, you get **helium**
(Z=2) — a completely different substance with completely different
chemistry. Add another proton: **lithium** (Z=3). Another: **beryllium**
(Z=4). And so on.

So the periodic table is a directory of every kind of "atomic brick" the
universe builds with. The table's *order* is the order in which protons get
added. Its *grouping* reflects the empirical fact, recognized long before we
knew about electrons, that elements come in *families* — sodium and
potassium behave alike, fluorine and chlorine behave alike, helium and neon
behave alike. The periodic table is the bookkeeping that organizes these
patterns, and the explanation for the patterns is **electron configuration**.

## Why proton count = identity (and neutron count doesn't)

The chemistry of an atom is determined by its electrons. In a neutral atom,
the number of electrons equals the number of protons. So Z determines the
electron count. The electrons arrange into orbitals (shells, subshells,
specific shapes), and those orbital occupancies determine *how* the atom
bonds, what charges it forms, what its melting point is, what color it
glows when heated, etc.

Neutrons live in the nucleus and don't see the electrons except via tiny
mass effects. So adding a neutron to an atom mostly leaves the chemistry
unchanged — that's a *different isotope* of the same element. (Next file.)

This is why we say **the proton count is the element's ID**: it's the
number that determines everything we typically call "chemistry."

## How elements were discovered (and why we keep finding new ones)

Elements were discovered in three big waves:

1. **Antiquity through ~1750** — gold, silver, copper, iron, lead, tin,
   mercury, sulfur, carbon, the few elements visible in nature in their
   pure form. Discovered "by being there."
2. **1750–1900** — chemical separation, electrolysis, spectroscopy. Davy
   isolated Na, K, Ca, Mg by electrolysis (1807–1808). Spectroscopy
   (Bunsen, Kirchhoff, 1860) discovered Cs and Rb from the colors of their
   flame emissions, then He on the Sun (1868) before it was found on Earth.
3. **1900–today** — most of the heavy elements (Z > 92, beyond uranium)
   were discovered by *making* them, in cyclotrons, reactors, and heavy-ion
   accelerators. **Why we keep finding new ones**: the strong nuclear force
   only just barely holds nuclei together past Z ≈ 92, so heavier nuclei are
   intrinsically unstable; we have to *manufacture* them by smashing lighter
   nuclei together at high speed and catching the brief synthesis product
   before it decays. Examples: nobelium (Z=102), seaborgium (Z=106),
   tennessine (Z=117), oganesson (Z=118).

A typical modern superheavy synthesis: fire a beam of, say, calcium-48 ions
into a target of californium-249, and very rarely the two nuclei fuse to
make a copernicium nucleus or similar. The product lives for milliseconds
to seconds. You confirm it by detecting its decay chain.

The "island of stability" hypothesis predicts there might be relatively
long-lived superheavy isotopes around Z ≈ 114–126 if you can hit the right
neutron count. Looking for it is an active research program.

## Reading the periodic table

The 2026 periodic table looks like this in shape:

```
         Group: 1  2                              13 14 15 16 17 18
Period 1: H                                                       He
Period 2: Li Be                                B  C  N  O  F  Ne
Period 3: Na Mg                                Al Si P  S  Cl Ar
Period 4: K  Ca Sc Ti V  Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr
Period 5: Rb Sr Y  Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I  Xe
Period 6: Cs Ba *  Hf Ta W  Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn
Period 7: Fr Ra ** Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og

Lanthanides (*): La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu
Actinides   (**): Ac Th Pa U  Np Pu Am Cm Bk Cf Es Fm Md No Lr
```

### Groups (columns)

Elements in the same group have the same number of *valence electrons* —
the outermost electrons that participate in bonding — and therefore behave
chemically alike.

| Group | Common name | Defining feature | Example |
|-------|-------------|------------------|---------|
| 1 | **Alkali metals** | One valence electron, easily lost to form +1 cation | Li, Na, K, Rb, Cs |
| 2 | Alkaline earth metals | Two valence electrons, easily lost to form +2 cation | Be, Mg, Ca |
| 3–12 | Transition metals | Variable oxidation states, colored compounds | Fe, Cu, Zn |
| 13 | Boron group | Three valence electrons | B, Al, Ga |
| 14 | Carbon group | Four valence electrons (covalent bond champions) | C, Si, Ge |
| 15 | Pnictogens | Five valence electrons | N, P, As |
| 16 | Chalcogens | Six valence electrons (need 2 more for octet) | O, S, Se |
| 17 | **Halogens** | Seven valence electrons (need 1 more), form −1 anions | F, Cl, Br, I |
| 18 | **Noble gases** | Full valence shell, chemically inert | He, Ne, Ar |

**Lithium is Group 1, Period 2** — the *first* alkali metal, and the third
element on the periodic table after H and He.

### Periods (rows)

Each row corresponds to filling one more *electron shell*. Period 1 has
only 2 elements (H, He) because the first shell holds at most 2 electrons.
Period 2 has 8 (Li → Ne) because the second shell adds an "s" subshell (2
electrons) and a "p" subshell (6 electrons). Periods 4–5 have 18 because the
"d" subshells (10 electrons) start filling. Periods 6–7 have 32 because the
"f" subshells (14 electrons) start filling.

This is just **counting how many electrons can fit at each energy level**.
The detail comes from quantum mechanics, but the empirical pattern was
deduced from chemistry decades before quantum theory existed (Mendeleev,
1869).

### Periodic trends (the patterns that matter for chemistry)

Across a row (left → right), $Z$ increases by 1 each step but electrons
fill the same shell, so each electron "feels" more nuclear charge
(the inner shells screen incompletely). Result:

- **Atomic radius decreases** going right (electrons pulled in tighter).
- **Ionization energy increases** going right (electrons harder to remove).
- **Electronegativity increases** going right (atom holds onto electrons
  harder).
- **Metallic character decreases** going right.

Down a column (top → bottom), each step adds an entire shell:

- **Atomic radius increases.**
- **Ionization energy decreases** (outer electrons farther, screened more).
- **Electronegativity decreases.**
- **Metallic character increases.**

These trends explain a lot of practical chemistry. Lithium, sitting at the
top of Group 1, is the *smallest* alkali metal with the *highest* ionization
energy in its group — and that smallness gives it some quirky behavior
(higher charge density, stronger hydration shell, anomalies relative to Na,
K).

## Worked example: predicting a chemistry without ever doing the experiment

Question: will sodium (Z=11) react with chlorine (Z=17)?

- Sodium has 11 electrons (configuration: 1s² 2s² 2p⁶ 3s¹). It has *one*
  electron in its outer shell, weakly held. Ionization energy = 5.14 eV.
- Chlorine has 17 electrons (configuration: 1s² 2s² 2p⁶ 3s² 3p⁵). It has
  *seven* outer electrons and is one short of a full shell. Its electron
  affinity = 3.62 eV (energy released when it gains an electron).
- Net energy if Na donates one electron to Cl: $-5.14 + (-3.62)
  = -8.76$ eV released, plus the additional ionic-bond stabilization from
  Coulombic attraction in the resulting NaCl crystal (lattice energy ~−7.9
  eV per formula unit). So very favorable — yes, they react vigorously to
  form Na⁺Cl⁻.

You just predicted table salt's existence from the periodic table.

## Common misconceptions

- **"The periodic table is a quirky historical accident."** No. The
  *original* arrangement (Mendeleev, 1869) was empirical, but it has
  survived because the quantum-mechanical structure of electron orbitals
  *is* periodic. Atomic structure forces the table on us.
- **"Element identity is the atomic mass."** It's the **proton count**.
  Atomic mass varies between isotopes; proton count doesn't.
- **"All elements occur in nature."** No — elements 95+ are essentially
  entirely synthetic. Even some of the lighter "natural" elements
  (technetium, Z=43; promethium, Z=61) are nearly extinct on Earth and
  have to be produced.
- **"Heavier always means rarer."** Roughly true at the high-Z end (very
  heavy elements are rare and mostly synthetic), but not monotonic. Iron
  (Z=26) is more abundant than lithium (Z=3) on Earth and in the universe,
  because of how stellar nucleosynthesis works (iron is the binding-energy
  peak; lighter elements get fused or captured).

## Connection to next

You know how the elements are organized and what makes one element different
from another. The next file unpacks **atomic mass** — a topic where the
distinction between *mass number*, *atomic mass*, and *atomic weight*
matters, and where the *non-integer* atomic weights on the periodic table
foreshadow isotopes.

## Self-check questions

1. Why is hydrogen (Z=1) typically placed in Group 1, even though its
   chemistry isn't really alkali-metal-like?
2. Lithium and sodium are both alkali metals. Predict, qualitatively,
   whether Li⁺ or Na⁺ will be more strongly hydrated in water — and
   explain why using the periodic-trends logic above.
3. Why are the rows (periods) of different lengths (2, 8, 8, 18, 18, 32,
   32) rather than all the same?
4. The chemistry of Cl is very similar to that of F and Br but very
   different from S. What's the structural reason?
5. The element franium (Fr, Z=87) is so unstable that the largest sample
   ever isolated was a few hundred thousand atoms. Why is it unstable, and
   why do we still know its chemistry resembles cesium's?
