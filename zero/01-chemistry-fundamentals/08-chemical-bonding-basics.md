# 08 — Chemical Bonding Basics

## Prerequisite check

You've absorbed `01–07`. Atoms have valence electrons, charge attracts /
repels, ions form when electrons transfer.

This file is short. You don't need a doctorate in bonding theory to
understand the lithium project — you need *enough* to read papers and
follow what crown ethers, ion-exchange resins, and membrane materials are
doing.

## Rigorous statement

A **chemical bond** is a sustained electromagnetic interaction between two
or more atoms that lowers their combined energy below the energy of the
separate atoms. The four main types you'll encounter:

| Type | Mechanism | Typical strength | Where you'll see it |
|------|-----------|------------------|---------------------|
| **Ionic bond** | Electron(s) transfer; resulting cation and anion attract electrostatically | 400–4000 kJ/mol (lattice energies) | NaCl, LiOH, MgO, ionic salts |
| **Covalent bond** | Two atoms share a pair of electrons | 150–1000 kJ/mol | H₂O, CO₂, organic molecules, polymers |
| **Metallic bond** | Many atoms share a "sea" of delocalized electrons | 100–800 kJ/mol | metals (Li, Cu, Fe), alloys |
| **Hydrogen bond** | Electrostatic attraction between H bonded to O/N/F and another O/N/F lone pair | 5–30 kJ/mol | water, DNA, proteins, alcohols |
| **van der Waals (London)** | Instantaneous-dipole / induced-dipole | 0.1–10 kJ/mol | noble gases liquid, geckos sticking, weak adsorption |

Real bonds are often "in-between" — a polar covalent bond like O-H is
partially ionic, partially covalent. Don't get bogged down in
classification; understand the spectrum.

## Plain-English unpacking

Every bond is the answer to the same question: *can these atoms lower their
energy by being together?* If yes, they bond. The "how" of the binding
gives you the type:

- **Ionic**: one atom gives up an electron to another; the resulting
  oppositely-charged ions stick together by Coulomb's law.
- **Covalent**: two atoms each give up an electron to a *shared* orbital
  between them. The shared electron pair lowers both atoms' energy
  simultaneously.
- **Metallic**: lots of atoms pool their valence electrons into a delocalized
  sea. The atoms become positive ions sitting in a negative electron fluid.
- **Hydrogen bond**: a special kind of polar interaction between a partially-
  positive H (because it's bonded to a strongly electron-withdrawing O, N,
  or F) and another atom's lone pair. Shorter and stronger than ordinary
  van der Waals, but weaker than covalent.

## Why the same atoms can bond different ways

Whether two atoms bond ionically or covalently depends on their
**electronegativity difference**.

Electronegativity (Pauling scale): how strongly an atom holds onto shared
electrons. F has the highest electronegativity (3.98); Cs has the lowest
metal value (~0.79). Lithium's electronegativity is 0.98.

- Difference > ~1.7 → predominantly **ionic** (e.g., NaCl: ΔEN = 2.23)
- Difference < ~0.5 → predominantly **covalent** (e.g., C-H: ΔEN = 0.35)
- Between → **polar covalent** with partial ionic character (e.g., O-H:
  ΔEN = 1.24 — the asymmetry is what makes water polar and gives it
  hydrogen bonds)

When a Li atom meets a Cl atom: Li (EN 0.98) and Cl (EN 3.16). ΔEN = 2.18,
solidly ionic. They form Li⁺Cl⁻.

When a Li atom meets an O in water: Li (0.98), O (3.44). ΔEN = 2.46. The
Li-O bond in LiOH is highly ionic — Li-OH exists as essentially Li⁺ and
OH⁻ in solution.

## Ionic compounds in detail (because the lithium project is full of them)

An ionic compound (Li₂CO₃, LiOH, LiCl, LiNO₃, LiF) is a crystal lattice of
alternating cations and anions held together by electrostatics. Properties
follow:

- **High melting point**, because you have to overcome the entire 3D
  electrostatic network to liquefy.
- **Hard but brittle**, because shifting layers brings like-charges
  next to each other and the crystal cracks.
- **Conduct electricity when molten or dissolved**, because the ions
  become mobile.
- **Soluble in polar solvents** (water especially), because solvation
  stabilizes the dispersed ions.

The **lattice energy** is the energy required to separate the ionic
crystal into gas-phase ions:

$$ U_\text{lattice} \propto \frac{|q_+ q_-|}{r_+ + r_-} $$

So smaller ions and higher charges → larger lattice energy. LiF has a
huge lattice energy because Li⁺ and F⁻ are both small. LiI is much
weaker because I⁻ is large. This affects solubility: **LiF is barely
soluble in water; LiI is highly soluble.** Counter-intuitive at first,
but follows directly from the energetics.

## Covalent and the role of orbitals

In a covalent bond, two atoms share electrons by allowing their atomic
orbitals to overlap. The mathematical machinery (molecular orbital theory)
is its own subject. For our purposes, three things matter:

1. **σ bonds** (sigma): the orbital overlap is along the bond axis. Strong,
   single, the "default" covalent bond.
2. **π bonds** (pi): the overlap is sideways (above and below the bond
   axis). Forms double or triple bonds in conjunction with a σ.
3. **Polar vs. nonpolar covalent**: a polar covalent bond has a dipole
   moment because the shared electrons sit closer to the more
   electronegative atom.

Water (H–O–H) is the canonical polar covalent molecule. Its bent geometry
(~104.5°) and partial charges give it a strong dipole moment, which is the
ultimate reason water can solvate ions. Without water's polar covalent
character, ions wouldn't dissolve, and most of the lithium-separation
literature wouldn't exist.

## Metallic bonding (because lithium is a metal)

Lithium in its elemental form is a soft, silvery metal. The "metallic"
character means: each Li atom contributes its lone valence electron to a
delocalized "sea" of electrons; the resulting Li⁺ cores sit in this sea
and are bonded to it. Metallic bonding explains:

- **Electrical conductivity** (the electrons are free to move under an
  applied field).
- **Thermal conductivity** (electrons carry heat).
- **Malleability and ductility** (you can shift atomic planes without
  breaking directional bonds).
- **Metallic luster** (electrons can absorb and re-emit visible light).

Lithium metal has the lowest density of any solid element under standard
conditions (0.534 g/cm³, less than half of water). It also has the lowest
melting point among the alkali metals (~180.5°C — high for an alkali, but
low compared to most metals).

## Hydrogen bonds and van der Waals (briefly, because they matter for water)

**Hydrogen bonds** explain almost every "weird" property of water:
- High boiling point (100°C) compared to similar-mass molecules (CH₄
  boils at –162°C, H₂S at –60°C). Water "should" be a gas at room
  temperature; H-bonds keep it liquid.
- Ice floats on water, because the hydrogen-bonded crystal structure of
  ice is *more open* (less dense) than the loosely-bonded liquid.
- High specific heat (hard to heat up).
- Strong solvent for polar things and ions.

**Van der Waals (London dispersion)** forces are weak attractions between
all atoms and molecules due to fluctuating electron clouds creating
instantaneous dipoles. They're the "background" attraction that lets liquid
nitrogen and noble gases liquefy at all. They're crucial for adsorption
phenomena in chromatography, gas separation, and some ion-extraction
processes.

## Coordination compounds (a brief but useful detour)

The lithium-separation literature is full of "coordination chemistry"
language, especially around crown ethers, cryptands, and ionic-liquid
extractants. The basic idea:

A **coordination compound** consists of a central metal ion (the cation —
Li⁺ here) surrounded by **ligands** that donate lone-pair electrons into
empty orbitals of the metal. The ligands "coordinate" with the cation. The
result is a complex with often-distinctive geometry (tetrahedral,
octahedral, etc.) and properties.

For Li⁺:
- Water can act as a ligand: Li(H₂O)₄⁺ or Li(H₂O)₆⁺ in solution.
- **Crown ethers** (cyclic polyether molecules with O atoms pointing
  inward) wrap around small cations and provide multiple coordinating O
  donors. The crown ether **12-crown-4** has a central cavity ~1.3 Å —
  *exactly* matched to Li⁺'s 0.76 Å radius. This selectivity is the basis
  of many proposed Li-isotope-separation schemes.
- **Cryptands** are 3D enclosing structures (like crown ethers but in 3
  dimensions) — even more selective than crown ethers.

## Common misconceptions

- **"Ionic and covalent are completely separate categories."** The reality
  is a continuum. Most "real" bonds have both character.
- **"Hydrogen bonds are bonds in the same sense as covalent bonds."** No.
  They're an order of magnitude weaker. They're real and important, but
  qualitatively different from a true bond.
- **"Metallic bonding doesn't matter for chemistry."** It does — it's why
  metals can be extracted, alloyed, electroplated, and electrochemically
  manipulated. The lithium-metal anode in some battery designs relies on
  the structure of metallic bonding.
- **"Bond strength = bond length."** Roughly correlated (shorter usually
  means stronger), but not the same thing. Strength is energetic; length
  is geometric.

## Connection to next

You know how atoms stick together. The next file zooms out to **states of
matter** (where the bonds are organized into solid / liquid / gas
arrangements) and to **solutions** (the most important state of matter
for our project, since ion-separation almost always happens in solution).

## Self-check questions

1. Predict whether each compound is ionic, covalent, polar covalent, or
   metallic: LiF, CO₂, Cu, NH₃, MgCl₂, Si. Justify each in one sentence.
2. Why does LiF have a higher melting point than LiI? Use the lattice-
   energy reasoning.
3. The crown ether 12-crown-4 has a cavity radius of ~0.6 Å, while
   18-crown-6 has a cavity ~1.4 Å. Predict which crown binds Li⁺ more
   selectively and which binds K⁺ more selectively.
4. Why does water have such a high boiling point compared to molecules of
   similar molar mass (NH₃, HF, H₂S)? Give the structural reason in one
   sentence.
5. In a metallic bond, the valence electrons are delocalized. Why does
   lithium have a lower electrical conductivity than copper, given that
   both have one valence electron per atom?
