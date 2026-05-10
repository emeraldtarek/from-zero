# 02 — Atomic Structure

## Prerequisite check

You've absorbed `01-matter-and-atoms.md`. You know matter is made of atoms,
that atoms are tiny (~10⁻¹⁰ m), and that they have *structure* rather than
being solid balls.

## Rigorous statement

An atom consists of:

1. A **nucleus** — a tiny, dense, positively-charged core containing
   **protons** (charge +1, mass ≈ 1 u) and **neutrons** (charge 0, mass ≈ 1 u).
2. A diffuse cloud of **electrons** (charge −1, mass ≈ 1/1836 u) bound to
   the nucleus by the electromagnetic force.

The nucleus contains essentially all of the atom's mass (~99.95%) but
occupies only ~1/100,000 of its diameter — i.e., one *trillionth* of its
volume.

In a neutral atom, the **number of protons equals the number of electrons**;
the negative electron cloud cancels the positive nuclear charge so the atom
itself has zero net charge.

| Particle | Charge | Mass (u) | Mass (kg) | Where |
|----------|--------|----------|-----------|-------|
| Proton (p) | +1 e | 1.00728 | $1.673 \times 10^{-27}$ | nucleus |
| Neutron (n) | 0 | 1.00867 | $1.675 \times 10^{-27}$ | nucleus |
| Electron (e⁻) | −1 e | 0.000549 | $9.109 \times 10^{-31}$ | cloud |

Here `e` is the **fundamental charge**, $e = 1.602 \times 10^{-19}$ C. The
unit `u` (also written `Da` for dalton) is the **atomic mass unit**, defined
as 1/12 the mass of a carbon-12 atom — about $1.661 \times 10^{-27}$ kg.

## Plain-English unpacking

If you scaled a hydrogen atom (the simplest atom: 1 proton, 1 electron) up so
the nucleus was the size of a marble (1 cm), the electron would be a fuzzy
cloud roughly **1 km** away in every direction. The atom is **mostly empty
space**.

Where does an atom's *mass* live? Almost entirely in the nucleus. Where does
its *chemistry* live? Almost entirely in the outer electrons. This split is
why chemistry and nuclear physics are essentially different fields:

- **Chemistry** = electrons rearranging.
- **Nuclear physics / radiochemistry** = protons and neutrons rearranging.

A chemical reaction (burning, dissolving, exchanging ions) never touches the
nucleus. A nuclear reaction (fission, fusion, radioactive decay) does.

For the lithium project, both layers matter. The chemistry of Li-6 and Li-7
is *almost* identical because they have identical electron clouds. The
*difference* between them lives in the nucleus (one extra neutron in Li-7),
and that nuclear difference is what we eventually exploit to separate them.

## Concrete picture

Three useful mental pictures, each correct in different ways:

1. **The "tiny solar system"** (Bohr model, 1913): nucleus at the center,
   electrons orbit at fixed distances. *Wrong*, but historically important
   and still useful for cartoons.
2. **The "fuzzy cloud"** (orbital / wave-mechanical model, 1925+): electrons
   exist as 3D probability distributions around the nucleus. The *shape* of
   the cloud (s, p, d, f orbitals) determines the chemistry. *Right.*
3. **The "tight committee"** (the practical chemist's mental model): the
   nucleus is a fixed point with charge +Z; electrons fill levels of energy
   from low to high; the *outermost* electrons (valence electrons) decide
   how the atom behaves. *Useful.*

For the lithium project, you don't need to compute orbitals from first
principles. You need to internalize: **electrons are the chemistry**.

## Forces inside the atom

Three forces matter:

- **Electromagnetic force** — between the positive nucleus and negative
  electrons. Holds the atom together. Falls off as $1/r^2$.
- **Strong nuclear force** — between protons and neutrons. Extremely strong
  at very short range (~1 fm); zero outside that range. Holds the nucleus
  together.
- **Weak nuclear force** — responsible for some kinds of radioactive decay
  (e.g., beta decay, in which a neutron turns into a proton + electron +
  antineutrino).

The electromagnetic force has a problem in the nucleus: every proton repels
every other proton (like charges repel). What stops the nucleus from
exploding? The strong force, which is much stronger than electromagnetism at
~1 fm range. The fight between strong attraction (short-range) and
electromagnetic repulsion (longer-range) is what determines which nuclei are
stable, which are radioactive, and which can't exist at all. We'll come back
to this in the isotopes file.

Gravity is *completely* negligible at atomic scales. Two protons attract
gravitationally; the force is ~10³⁶ times weaker than their electromagnetic
repulsion. You can ignore gravity entirely in chemistry.

## Worked example: the hydrogen atom

Hydrogen has Z = 1 (one proton). A neutral hydrogen atom has 1 electron.

- Nuclear mass = ~1.00728 u (one proton)
- Electronic mass = 0.000549 u
- Total atomic mass = ~1.00794 u (close to but not exactly equal to 1)

The electron's *binding energy* in hydrogen is 13.6 electron-volts (eV) — the
energy you have to give the electron to liberate it from the proton. This is
the **ionization energy** of hydrogen. (We'll meet ionization energies again
in the periodic-trends discussion.)

The electron's average distance from the proton in the ground state is the
**Bohr radius**, $a_0 = 5.29 \times 10^{-11}$ m. This is the natural length
scale of all of chemistry. Atomic radii of other elements are within an order
of magnitude of $a_0$.

## Common misconceptions

- **"Electrons orbit like planets."** No — the orbital model is a quantum
  probability cloud. Electrons don't have definite trajectories at all. But
  the planet picture is fine for cartoons.
- **"The nucleus is a featureless ball."** No — protons and neutrons
  themselves are made of quarks, but you do not need this for chemistry.
  Treat protons and neutrons as the smallest building blocks for our
  purposes.
- **"Adding a neutron changes the chemistry."** Almost not at all. Adding a
  neutron changes the *isotope* — the chemistry stays effectively the same,
  the *mass* changes, and a few subtle dynamic properties change. This is
  the entire premise of the lithium project: we want to separate two atoms
  that are chemically near-identical.
- **"The electron orbital is empty space the electron flies through."** No —
  it's a *probability density.* The electron isn't a tiny ball flying
  around; it's a wave-like distribution. The probability density is what
  matters for chemistry.

## Connection to next

You know what's inside an atom and what holds it together. The next file
unpacks **electric charge** — what it is, why opposites attract, why charge
shows up in every chemical concept (ions, bonds, acids, electrochemistry,
isotope-separation column equilibria). Charge is the lingua franca of
chemistry.

## Self-check questions

1. Why is the atom mostly empty space, and what *does* fill the space
   between the nucleus and the visible "edge" of an atom?
2. What's the mass ratio of a proton to an electron? Why does this make
   chemistry "all about the electrons"?
3. Why don't the protons in a nucleus fly apart from electrostatic
   repulsion?
4. The atomic mass unit (u) is defined relative to carbon-12. Why was C-12
   chosen as the reference, and what's slightly weird about the proton
   having mass slightly *greater* than 1 u?
5. If chemistry is "electrons rearranging" and Li-6 and Li-7 have the same
   number of electrons, what's left to be different between them — and why
   would that difference be hard to exploit?
