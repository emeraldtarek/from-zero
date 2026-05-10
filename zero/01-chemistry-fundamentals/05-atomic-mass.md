# 05 — Atomic Mass

## Prerequisite check

You've absorbed `04-elements-and-periodic-table.md`. You know atomic number
$Z$ identifies the element, that protons and neutrons live in the nucleus,
and that electrons contribute negligibly to mass.

## Rigorous statement

Three closely-related but distinct quantities all get casually called
"atomic mass." Don't conflate them; the distinctions matter for the lithium
project.

| Term | Symbol | Meaning | Units |
|------|--------|---------|-------|
| **Mass number** | $A$ | Total count of nucleons (protons + neutrons) in *one specific* nucleus | dimensionless integer |
| **Atomic mass** (of one nuclide) | $m_a$ | Actual mass of *one specific isotope's atom* | $u$ (atomic mass units) |
| **Atomic weight** (standard atomic weight) | $A_r$ | Average mass of an atom of the element, weighted by isotopic abundance | $u$ |

**Atomic mass unit** ($u$, also written Da for Dalton):
$1\, u = 1.66054 \times 10^{-27}$ kg. Defined as exactly 1/12 the mass of a
neutral $^{12}\text{C}$ atom in its ground state. So a $^{12}\text{C}$ atom
has mass exactly 12 u; everything else is measured against that reference.

The masses of individual nucleons are:
- Proton: 1.00728 u
- Neutron: 1.00867 u
- Electron: 0.000549 u (often dropped in approximate calculations)

A neutral atom has $Z$ electrons; its mass is approximately
$Z \cdot m_p + N \cdot m_n + Z \cdot m_e - E_\text{binding}/c^2$, where
$N = A - Z$ is the neutron count and $E_\text{binding}$ is the nuclear
binding energy (which makes the actual mass slightly less than the sum of
the parts — the famous "mass defect").

## Plain-English unpacking

You already know the nucleus is essentially all the mass. So the mass of an
atom is, to leading order, just the count of protons + neutrons (each ≈1 u),
with a correction for binding energy and a tiny contribution from electrons.

But here's the wrinkle that confused you in undergrad chem: when you read
the periodic table, the number under the symbol — "Li 6.94" — is **not** the
mass of any single Li atom. It's the *average* mass of Li atoms in
naturally-occurring lithium, which is a *mixture* of Li-6 (mass 6.0151 u)
and Li-7 (mass 7.0160 u). Lithium-as-found-on-Earth is 7.59% Li-6 and
92.41% Li-7, so:

$$ A_r(\text{Li}) = 0.0759 \times 6.0151 + 0.9241 \times 7.0160 = 6.94 \text{ u} $$

That non-integer 6.94 is your fingerprint that lithium has multiple isotopes
in nature. **Every non-integer atomic weight on the periodic table is
secretly telling you the element has stable isotopes**.

This is also why the periodic table sometimes shows atomic weights as
*ranges* (e.g., for hydrogen, "[1.00784, 1.00811]") — the natural isotopic
composition can vary slightly between sources (ocean water vs. groundwater
vs. atmospheric H₂), and IUPAC formally acknowledges this.

## Concrete picture: a chemist's loose mental model

Imagine the periodic table as a directory of "boxes," one per element, each
labeled with $Z$. Inside each box is a *bag* of atoms — almost all are the
same element (same Z), but the bag contains a *mixture* of isotopes
(different N).

- Z = identity, fixed per box
- A = $Z + N$, varies inside a box
- $A_r$ = the average across the bag, weighted by abundance

When you weigh a chunk of natural lithium, you're weighing a population, not
an individual. The atomic weight 6.94 reflects the population. **The
lithium project is fundamentally about reaching into the bag and pulling out
*just* the Li-6 atoms, leaving the Li-7 behind.**

## How we measure atomic masses: the mass spectrometer

The instrument that gives us isotopic masses with extraordinary precision is
the **mass spectrometer**. The principle:

1. **Ionize** the sample (e.g., by hitting it with electrons or laser light)
   to produce charged ions.
2. **Accelerate** the ions through a known voltage $V$, giving them kinetic
   energy $\frac{1}{2}mv^2 = qV$ — so heavier ions move slower for the
   same charge.
3. **Deflect** them with a magnetic field. The Lorentz force on a charged
   ion in a magnetic field is $F = qv \times B$, which curves the path
   into a circle of radius $r = mv / (qB)$. Heavier ions curve less.
4. **Detect** where the ions land. The position encodes the mass.

Frances Aston's 1919 mass spectrograph was the first machine to demonstrate
the existence of isotopes (he showed Ne came in two flavors of mass 20 and
22 — an absolute scandal at the time). Modern instruments (TIMS, MC-ICP-MS,
SIMS) routinely measure isotope ratios to 6+ significant figures and are
the workhorses of geochemistry, cosmochemistry, biology, and isotope
production.

For the lithium project, mass spectrometry is the *measurement* tool. After
you do a separation experiment, you measure the Li-6/Li-7 ratio in your
product vs. starting material to get the **separation factor**:

$$ \alpha = \frac{(\text{Li-6}/\text{Li-7})_\text{product}}{(\text{Li-6}/\text{Li-7})_\text{feed}} $$

You will see this $\alpha$ everywhere in isotope-separation literature.

## The mole and its ergonomics

The atomic mass unit is convenient at the atomic scale but inconvenient at
the laboratory scale. A bench chemist works with grams, not yoctograms. The
**mole** bridges the two:

$$ N_A = 6.022 \times 10^{23}\ \text{mol}^{-1} $$

By construction (the mole was originally defined as the number of $^{12}$C
atoms in 12 grams of $^{12}$C), an element's atomic weight in u is
numerically the same as the mass of one mole in grams.

So:
- 1 mole of Li atoms (natural mix) weighs 6.94 g.
- 1 mole of Li-6 atoms weighs 6.0151 g.
- 1 mole of Li-7 atoms weighs 7.0160 g.

This is what makes stoichiometric calculations easy. If a chemical reaction
requires 1 mole of Li per mole of product, you weigh out 6.94 g of natural
lithium. If it requires 1 mole of Li-6 specifically, you need
6.0151 g of pure Li-6, which currently costs roughly $30,000 per gram on
the open market — for the lithium project, that fact alone explains the
economic pressure on isotope separation.

## Worked example: where does the 6.94 come from?

The 2024 IUPAC standard atomic weight for Li is 6.94 (range
[6.938, 6.997]). Compute it yourself.

- Li-6 mass = 6.01512 u, abundance = 7.59% (= 0.0759)
- Li-7 mass = 7.01600 u, abundance = 92.41% (= 0.9241)

$$ A_r = (0.0759)(6.01512) + (0.9241)(7.01600) = 0.4565 + 6.4836 = 6.940\ u $$

Now play with it. What if a sample of lithium were 50/50 Li-6/Li-7?

$$ A_r = (0.5)(6.01512) + (0.5)(7.01600) = 6.5156\ u $$

You'd notice. A mass spectrometer (or even a precise enough balance combined
with mole calculations) would reveal it instantly. **You can detect isotope
enrichment by mass alone**. This is, in fact, how separation programs
verify their output.

## Mass defect and why nuclear physics gets weird

A small but profound aside. Take a $^{12}\text{C}$ atom: 6 protons, 6
neutrons, 6 electrons. Sum of constituent masses:

$$ 6(1.00728) + 6(1.00867) + 6(0.000549) = 12.0989\ u $$

But the actual measured mass of $^{12}\text{C}$ is, by definition, exactly
12.0000 u. The missing 0.0989 u was converted to *binding energy* — the
energy released when those nucleons fused together. Via $E = mc^2$:

$$ 0.0989\ u \times 931.5\ \text{MeV}/u = 92.2\ \text{MeV} $$

That's the nuclear binding energy of carbon-12, the energy you'd have to
supply to dismantle the nucleus into free protons and neutrons. It's
~10,000,000 times bigger than typical chemical bond energies (~1–10 eV).
This enormous gap is why chemistry never disturbs nuclei — chemical reaction
energies are nowhere near enough.

For isotopes, the binding energy per nucleon varies smoothly with $A$:
peaks around iron (Z=26, A=56) at ~8.8 MeV/nucleon, and falls off on either
side. Light elements like lithium have lower binding energy per nucleon
(~5.3 MeV/nucleon for Li-6, ~5.6 for Li-7), which is exactly why fusion of
light nuclei *releases* energy (climbing toward the iron peak): the basis
of stellar nucleosynthesis and of fusion power.

## Common misconceptions

- **"Atomic weight equals mass number."** No. Mass number is a strict
  integer count for one specific nuclide. Atomic weight is a real-valued
  average across isotopes for the element as found in nature.
- **"6.94 means 6.94 protons and neutrons."** No. The mass number is
  always an integer (6 or 7 for lithium). 6.94 is a population average.
- **"Mass and energy are different things."** They are
  interconvertible via $E = mc^2$. Inside the nucleus, "mass" includes
  the binding-energy contribution.
- **"All elements have well-defined atomic weights."** Not exactly. For
  some elements (notably the radioactive ones with no stable isotopes —
  technetium, promethium, Po and beyond), the periodic table just lists
  the mass number of the most stable / most common isotope, in brackets,
  rather than a true average atomic weight.

## Connection to next

You now have everything you need to discuss **isotopes** properly:
- Same Z (same element) but different N (different mass number).
- Mass spectrometry distinguishes them.
- Atomic weights are population averages.
- Lithium-6 and Lithium-7 differ by ~17% in mass.

The next file is the load-bearing concept for the entire project.

## Self-check questions

1. Why does the periodic table list lithium's mass as 6.94 u instead of an
   integer? What would you predict if a Mars rover analyzed a Martian
   lithium sample and got 7.05 u?
2. Compute the standard atomic weight of chlorine, given:
   Cl-35 (mass 34.969 u, abundance 75.78%) and
   Cl-37 (mass 36.966 u, abundance 24.22%). Verify against the periodic
   table.
3. Why is the mass of $^{12}\text{C}$ defined as exactly 12 u rather than
   measured? What's the consequence for measuring all other masses?
4. The molar mass of natural lithium is 6.94 g/mol; of pure Li-6 it's
   6.015 g/mol. If you dissolve 100 g of natural Li metal vs. 100 g of
   pure Li-6 in identical volumes of water, how do the molar
   concentrations compare?
5. A mass spectrometer separates ions of equal charge by their
   mass-to-charge ratio. If you accelerate Li⁺ ions through a fixed
   voltage and run them through a magnetic field, why does Li-7⁺ curve
   less than Li-6⁺?
