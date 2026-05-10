# 07 — Ions and Ionization

## Prerequisite check

You've absorbed `01–06`. Especially: electrons live in shells; the outermost
(valence) electrons drive chemistry; charge attracts/repels per Coulomb's
law; isotopes share electron configurations.

This is the **other load-bearing concept of the lithium project**.

## Rigorous statement

An **ion** is an atom or molecule that has a net electric charge — i.e., its
total electron count differs from its total proton count.

- **Cation** (pronounced "CAT-ion"): positive ion. Has fewer electrons than
  protons. Formed by *losing* one or more electrons.
- **Anion** (pronounced "ANN-ion"): negative ion. Has more electrons than
  protons. Formed by *gaining* one or more electrons.

The **ionization energy** ($IE_n$) of an atom is the energy required to
remove the $n$-th electron from a gas-phase neutral atom. The first
ionization energy ($IE_1$) is the energy to make X → X⁺ + e⁻; the second
($IE_2$) is X⁺ → X²⁺ + e⁻; and so on. Each successive electron is harder
to remove because the remaining ion is more positively charged.

The **electron affinity** ($EA$) is the energy released when a neutral atom
gains an electron in the gas phase: X + e⁻ → X⁻ + EA. It's a *negative*
number when energetically favorable.

For lithium specifically:
- $IE_1$(Li) = 5.39 eV — the energy to remove the lone 2s electron and
  leave behind Li⁺.
- $IE_2$(Li) = 75.6 eV — *enormously* larger because removing a *second*
  electron means breaking into the inner 1s shell. **This is why lithium
  effectively only makes Li⁺**, never Li²⁺.

## Plain-English unpacking

If you tear an electron off a hydrogen atom, you have a bare proton — a
hydrogen *ion* (or "proton" in chemistry slang). H⁺.

If you tear an electron off a lithium atom, you get Li⁺ — a tiny dense ion
with charge +1.

If you give an extra electron to a chlorine atom, you get Cl⁻.

These charged species are everywhere in chemistry. **Most of the chemistry
that happens in water — and almost all of the chemistry relevant to the
lithium separation problem — happens between ions, not between neutral
atoms.**

When you dissolve table salt (NaCl) in water, the crystal breaks apart into
free Na⁺ and Cl⁻ ions. Each ion is surrounded by a shell of water molecules
(its **hydration shell**) that stabilizes it. The ions can move
independently. Salt water conducts electricity because of these mobile ions.

When you dissolve lithium hydroxide (LiOH) in water, you get free Li⁺ and
OH⁻ ions, each with its own hydration shell. The chemistry of Li-6 vs. Li-7
in this aqueous environment is the kind of scenario where separation
methods get tested.

## Why ions form (energetics)

Forming an ion costs energy (you have to supply $IE$ to make the cation, or
absorb $-EA$ when forming an anion). So ions only form spontaneously when
*something else* gives back more energy than the ionization cost.

In the gas phase, you usually have to supply energy from outside (heat,
electric discharge, light). In solution, the energy comes from **ion
solvation**: water molecules orient their dipoles around an ion, lowering
its energy by tens to hundreds of kJ/mol. The hydration energy of Li⁺ is
about –520 kJ/mol — that's a huge stabilization that more than pays for the
ionization.

This is also why lithium is unreactive as Li(s) until you put it in water,
where it reacts vigorously: $\text{2Li} + \text{2H}_2\text{O} \rightarrow
\text{2Li}^+ + \text{2OH}^- + \text{H}_2 + \text{heat}$. The *full* reaction
is energetically favorable because the products (solvated Li⁺, OH⁻, H₂)
have lower total energy than the starting materials (Li metal, water),
mostly thanks to the strong hydration of Li⁺ and OH⁻.

## How ions are characterized

Three properties matter most for the lithium-separation literature:

### 1. Ionic radius

The effective size of the ion. Cations are smaller than their parent atoms
(losing electrons shrinks the cloud; the remaining electrons are pulled in
harder). Anions are larger than their parent atoms (extra electron, more
inter-electron repulsion). Standard reference: the **Shannon ionic radii**
(Shannon, 1976), tabulated for every common ion in every coordination
geometry.

For our problem:
- Li⁺ (6-coordinate, in solution): 0.76 Å — *very small*.
- Na⁺: 1.02 Å.
- K⁺: 1.38 Å.
- Cs⁺: 1.67 Å.

Li⁺'s small size gives it the highest **charge density** of any common
metal cation — its +1 charge is concentrated into a tiny volume. Charge
density is the variable that controls hydration strength, ion-exchange
selectivity, and crown-ether binding.

### 2. Charge

For most common metal ions, charge in aqueous solution is determined by the
group number and ionization-energy structure of the parent atom. Group 1:
+1. Group 2: +2. Group 13 (Al, Ga, In): +3. Transition metals: variable
(Fe²⁺ vs Fe³⁺, Cu⁺ vs Cu²⁺).

Lithium effectively only has +1 in normal chemistry.

### 3. Hydration shell / hydration number

When an ion is dissolved in water, it pulls in a shell of water molecules
that orient with their oxygens toward the cation (or hydrogens toward an
anion). The number of water molecules in the **first hydration shell** is
the **hydration number**.

For Li⁺, the first hydration shell typically has ~4 water molecules in a
tight tetrahedral arrangement, plus a looser second shell. The whole
hydrated Li⁺ — Li(H₂O)₄⁺ or Li(H₂O)₆⁺, depending on conditions — is
substantially larger than the bare Li⁺ ion: hydrated radius ≈ 3.4 Å vs
bare 0.76 Å.

This matters for any separation technique that probes ion size — membranes,
crown-ether complexation, ion-exchange resins. Sometimes you're "seeing"
the hydrated ion, sometimes the bare ion, sometimes a partially-stripped
intermediate.

## Ions in solution: activity, mobility, conductivity

Three more properties that show up in separation literature:

- **Activity** $a$: roughly, the "effective concentration" of an ion. In
  dilute solutions $a \approx c$ (the molar concentration), but at higher
  concentrations ions interact and $a < c$. Activity coefficients $\gamma =
  a/c$ are tabulated and modeled (Debye-Hückel theory, Pitzer equations).
  All "real" thermodynamic equilibrium constants use activities, not raw
  concentrations.
- **Ionic mobility** $u$: the speed at which an ion moves under unit
  applied electric field. Smaller hydrated ions don't always move faster —
  Li⁺ has a *lower* mobility than K⁺ in water because Li⁺ drags around a
  larger hydration shell. (Counterintuitive but real.)
- **Ionic conductivity** $\Lambda$: the contribution of an ion species to
  the solution's ability to carry electrical current. Direct product of
  charge × concentration × mobility.

For lithium isotope separation, all three matter:
- Activity differences between Li-6 and Li-7 are *part* of the equilibrium
  isotope effect.
- Mobility differences (very subtle) are what some electrochemical methods
  exploit.
- Conductivity is what you measure to track ion concentrations through a
  process.

## Ionization in different contexts

The word "ionize" gets used in several contexts. Don't conflate them.

| Context | Mechanism | Energy scale |
|---------|-----------|-------------|
| Gas-phase ionization | Apply enough energy to strip an electron from a neutral atom | eV |
| Dissolution in water (e.g., NaCl → Na⁺ + Cl⁻) | Water molecules solvate the lattice ions, breaking the crystal | < eV (paid back by hydration) |
| Acid dissociation (e.g., HCl → H⁺ + Cl⁻ in water) | Bond heterolysis aided by solvation | varies; pKa scale |
| Plasma | Many electrons stripped, very hot | thousands of K, many eV |
| Mass spectrometry ionization | Electron impact / electrospray / MALDI / etc. | tens of eV typical |

For the lithium project, the relevant kind of "ionization" is mostly *the
already-ionized state of lithium in aqueous solution*: dissolve a lithium
salt (LiCl, LiOH, Li₂CO₃) and you have free Li⁺ ions. You don't need to
"ionize" anything; the ion is the starting material.

## Why we isolate ions / isotopes

Tarek, you asked specifically: "what are ions, why do they exist in nature,
how do you isolate atoms/ions and why you would do that?" Here is the
direct answer:

- **Why ions exist in nature**: in any environment with a polar solvent
  (water, especially), ionic compounds spontaneously dissociate because the
  solvation energy of the ions exceeds the lattice energy of the crystal.
  The oceans contain ~10²² kg of dissolved ionic material; geological brines
  are even more concentrated. Ions are everywhere.
- **How we isolate them**:
  1. *Precipitation*: change conditions (pH, temperature, add another ion)
     so that the target ion forms an insoluble salt that you can filter
     out. (E.g., adding Na₂CO₃ to a Li⁺ solution precipitates Li₂CO₃.)
  2. *Ion exchange*: pass the solution through a resin that swaps your
     target ion for a different one bound to the resin. The target gets
     concentrated on the resin; you regenerate by washing with a stronger
     solution.
  3. *Solvent extraction*: shake the aqueous solution with an immiscible
     organic phase containing a selective extractant; the ion partitions
     into the organic phase.
  4. *Membrane processes*: use a selective barrier that lets some ions
     through and not others.
  5. *Electrochemical*: apply a voltage; ions migrate to electrodes per
     their charge.
  6. *Crystallization / evaporation*: concentrate to the point where the
     desired ionic compound precipitates.
- **Why we isolate them**: any time we want to use an ion (or compound
  containing it) for a downstream purpose — a battery cathode, a
  pharmaceutical, a fertilizer, a fuel-cycle component. For the lithium
  project specifically, we want to isolate **just the Li-6 form** from the
  natural mix, because Li-6 is uniquely useful for fusion fuel breeding.

## Common misconceptions

- **"Ions are atoms in some excited state."** No. Ions are atoms (or
  molecules) with a different electron count. They're a stable
  configuration in their own right, not transient excitations.
- **"Ionic compounds are weird; covalent ones are normal."** They're just
  different bonding extremes. Many compounds are partially ionic, partially
  covalent.
- **"You can ionize anything to any charge state with enough energy."**
  Eventually you can — astrophysical plasmas have multiply-ionized iron
  (Fe²⁵⁺) — but for chemistry purposes, only certain charge states are
  *stable* in normal environments. Li⁺ is stable; Li²⁺ is essentially
  impossible to make in solution.
- **"Hydration is just water sticking to the ion."** It's a structured,
  energetically-deep, kinetically-dynamic shell, with first-shell waters
  that exchange on timescales of nanoseconds and exert ~hundreds of
  kJ/mol of binding energy. It is one of the most important real
  phenomena in solution chemistry.

## Connection to next

You now know what ions are and how they live in solution. Next up:
**chemical bonding** — the four major bond types (ionic, covalent,
metallic, hydrogen + van der Waals) — which formalize what's actually
happening when ions attract and atoms share electrons.

## Self-check questions

1. Why is the second ionization energy of lithium roughly 14× the first?
   What does this tell you about the *electronic* structure of Li and Li⁺?
2. The hydration energy of Li⁺ is about –520 kJ/mol; for Cs⁺ it's about
   –260 kJ/mol. Why is Li⁺ hydrated so much more strongly, given they have
   the same charge?
3. In water, Li⁺ has *lower* electrical mobility than K⁺ even though Li⁺
   is a smaller bare ion. Resolve the apparent paradox.
4. A sample of LiCl is dissolved in water. Sketch the structure around a
   Li⁺ ion (orientations of water molecules) and around a Cl⁻ ion. Why do
   they differ?
5. To extract Li⁺ from a brine, you want a method that targets ions of a
   specific size, charge, and hydration character. List three properties
   of Li⁺ you might exploit to discriminate it from other +1 cations
   (Na⁺, K⁺) that are typically present at higher concentration.
