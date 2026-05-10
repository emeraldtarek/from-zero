# 03 — Electric Charge

## Prerequisite check

You've absorbed `02-atomic-structure.md`. You know that protons carry charge
+1, electrons carry charge −1, and a neutral atom has equal numbers of each.

## Rigorous statement

**Electric charge** is a fundamental, conserved property of certain
elementary particles. It comes in two signs (positive and negative) and is
quantized: every observed free charge is an integer multiple of the
**fundamental charge** $e = 1.602 \times 10^{-19}$ coulomb (C).

Charges interact via the **electromagnetic force**, captured at rest by
Coulomb's law:

$$ F = k \frac{q_1 q_2}{r^2}, \qquad k = 8.99 \times 10^9 \text{ N·m}^2/\text{C}^2 $$

- If $q_1$ and $q_2$ have the **same sign** (both + or both −), $F$ is
  positive: the particles **repel** each other.
- If they have **opposite signs**, $F$ is negative: the particles **attract**.
- The force falls off as $1/r^2$ — double the distance, force drops to
  one-quarter.

**Charge is conserved**: the total net charge of a closed system never
changes. You can move charges, you can pair them off, you can ionize an atom
— but the universe's bookkeeping always balances.

## Plain-English unpacking

Charge is to electromagnetism what mass is to gravity — a fundamental
property of stuff that determines how it interacts via a particular force.
But unlike mass (always positive, always attractive), charge has *two signs*
and the force can go either way: like charges push apart, opposite charges
pull together.

Almost every chemical phenomenon you'll meet — bonds, ions, dissolution,
acid-base reactions, electrochemistry, isotope separation columns — is, at
some level, **a story about charges arranging themselves to lower their
energy.** Negative electrons want to be near positive nuclei; positive ions
in solution want to be near negative ones; molecules orient their charges to
fit; equilibrium constants reflect electrostatic energies.

Once you internalize this, half of "chemistry" becomes "applied
electrostatics."

## Concrete picture

Imagine two billiard balls on a frictionless table.

- If both have a +1 charge and you hold them 1 cm apart, then let go: they
  fly apart. The force pushing them ($F = k q^2 / r^2$) is enormous on
  the atomic scale.
- If one is +1 and the other is −1: they snap together.
- If you double the distance: the force on each ball drops to a quarter.
- If you quadruple the charge on one ball: the force quadruples.

Now realize: this is happening **inside every atom, all the time, between
every pair of charged particles**. The net result of all those vector forces
is what determines the atom's shape, the molecule's geometry, the crystal's
structure.

## Worked example: how strong is electrostatics?

Two protons, separated by a typical atomic distance of $r = 10^{-10}$ m.

$$ F_{\text{em}} = \frac{(8.99 \times 10^9)(1.6\times10^{-19})^2}{(10^{-10})^2} \approx 2.3 \times 10^{-8} \text{ N} $$

That's a tiny number in everyday units — but the proton itself only has mass
~$1.67 \times 10^{-27}$ kg. The acceleration that force produces is
$F/m \approx 1.4 \times 10^{19}$ m/s². At that scale, electromagnetic forces
are *colossal* compared to gravity. The same calculation for gravitational
attraction between the two protons gives a force $\sim 10^{-44}$ N — roughly
10³⁶ times smaller. Gravity is utterly irrelevant inside an atom.

## Where charge shows up in chemistry

A non-exhaustive map:

- **Atomic structure**: nucleus (+) and electrons (−) bound by Coulomb
  attraction.
- **Ionization**: removing an electron from a neutral atom requires energy
  to fight the +/− attraction. The amount of energy is the **ionization
  energy**, an empirical property tabulated for every element.
- **Ions**: atoms or molecules with a net charge (more or fewer electrons
  than protons). Cations (+), anions (−). The lithium project is largely
  about handling Li⁺.
- **Ionic bonding**: the electrostatic attraction between a cation and an
  anion (e.g., Na⁺ and Cl⁻ in NaCl).
- **Polar covalent bonds**: when two atoms share electrons unequally (e.g.,
  in H₂O, O hogs the shared electrons; H is left partially +). The molecule
  has a **dipole moment**.
- **Hydrogen bonds**: the special case of dipole-dipole interaction
  between H bonded to O/N/F and another O/N/F. Drives liquid water's weird
  properties.
- **pH**: a measure of the concentration of H⁺ (more precisely H₃O⁺) ions
  in solution. pH is just an electrostatic story.
- **Electrochemistry**: anything where electrons flow under a voltage —
  batteries, electroplating, electrolysis, electrodialysis. Voltage is the
  energy per unit charge; current is rate of charge flow.
- **Solvation**: ions are stabilized in water because water molecules orient
  their dipoles to surround the ion's charge. Without that stabilization,
  Na⁺ and Cl⁻ wouldn't separate at all.
- **Selective ion extraction**: crown ethers and ionic-liquid extractants
  used in lithium separations exploit *the fit* between an ion's charge,
  size, and the electrostatic environment of the cavity.

If you ever feel lost reading a chemistry paper, ask: *who has charge here,
and what are the charges trying to do?* The answer is usually 80% of the
explanation.

## Coulomb's law as the secret to "energy minimization"

You'll hear the phrase **"systems minimize their energy"** constantly.
Coulomb's law gives this concrete meaning. The electrostatic potential
energy of two charges is:

$$ U = k \frac{q_1 q_2}{r} $$

- Two like charges have $U > 0$, and the system can lower its energy by
  pushing them apart (large $r$).
- Two opposite charges have $U < 0$, and the system can lower its energy by
  pulling them together (small $r$).
- The "system" is happy when total $U$ is at its lowest value consistent
  with quantum-mechanical constraints.

Quantum mechanics adds a constraint: electrons can't all just collapse onto
the nucleus, because of the Pauli exclusion principle and quantum kinetic
energy ("zero-point energy"). The ground-state structure of every atom is a
truce between Coulomb attraction (wants electrons close) and quantum kinetic
energy / Pauli exclusion (won't let them get arbitrarily close). The truce
gives us the periodic table.

## Common misconceptions

- **"Charge is created or destroyed in chemical reactions."** No. Charge is
  conserved. If you see a charge appear, look for an equal and opposite
  charge appearing somewhere else.
- **"Positive charge means a positively charged particle moves."** Not
  always. In metals, current flows because electrons (negative) move; we
  *describe* it as if positive charge moved the other way out of historical
  convention (Ben Franklin's mistake). In ionic solutions, positive ions
  really do move one way and negative ions the other.
- **"A neutral atom has no electric effect."** Not quite. A neutral atom
  can still have a *dipole moment* (separation of + and − within it),
  giving it weak electrostatic interactions even though net charge is zero.
  This is the basis of van der Waals forces.
- **"Coulomb's law applies inside molecules unchanged."** Approximately yes,
  but at very short distances and high speeds (i.e., inside atoms),
  quantum-mechanical effects dominate. The classical Coulomb potential is
  the input to quantum-mechanical Schrödinger equations; it doesn't tell
  you about, say, electron orbitals directly.

## Connection to next

You now understand the *language* of chemistry: charges arranging to
minimize energy. Next, we use this language to define the **element**: a
species characterized by its proton count, organized into the periodic
table according to how its electrons stack into shells.

## Self-check questions

1. Two ions, +1 and −1, are 0.3 nm apart. Compute their Coulomb potential
   energy in joules and in electron-volts. (Useful conversion:
   1 eV = $1.602 \times 10^{-19}$ J.)
2. Why is the gravitational force between two protons negligible compared
   to the electrostatic force? Quote a rough order-of-magnitude ratio.
3. If you remove an electron from a hydrogen atom, where does the electron
   go and what's the net charge of the remaining ion?
4. Salt (NaCl) dissolves in water, producing Na⁺ and Cl⁻ ions that move
   independently. Why doesn't the Na⁺ just snap back to the Cl⁻
   electrostatically?
5. Inside a polar molecule (say H₂O) the electrons sit closer to oxygen
   than to hydrogen. Sketch the partial charges on each atom and predict
   which end of the molecule a free Na⁺ ion would prefer.
