# 09 — States of Matter and Solutions

## Prerequisite check

You've absorbed `01–08`. You know about atoms, bonds, ions, and the role of
electrostatics in chemistry.

## Rigorous statement

The familiar **states of matter** are differentiated by the energy and
ordering of their constituent particles:

| State | Particle motion | Particle order | Density | Compressibility |
|-------|-----------------|----------------|---------|-----------------|
| **Solid** | Vibrate about fixed positions | Long-range order (crystal) or short-range only (amorphous) | High | Very low |
| **Liquid** | Translate, rotate, vibrate | Short-range order, no long-range | Comparable to solid | Low |
| **Gas** | Translate freely, mostly | Disordered | Very low | High |
| **Plasma** | Mostly ionized; electrons free | Disordered | Variable | Variable |

Plus several less-everyday states (Bose-Einstein condensates, supercritical
fluids, liquid crystals, glasses) that occasionally show up in
high-temperature or high-pressure isotope-separation processes.

A **solution** is a *homogeneous mixture* in which one substance (the
**solute**) is dispersed at the molecular or ionic level into another (the
**solvent**). For ions in water — the dominant case for the lithium
project — the solute particles are individual ions (or ion clusters), each
surrounded by a hydration shell.

## Plain-English unpacking

You already know solid / liquid / gas intuitively. The non-obvious part for
the lithium project is what happens when you **dissolve** an ionic
compound in a liquid solvent:

1. The solvent molecules (water) penetrate the crystal lattice.
2. Each surface ion is pulled out of the lattice by water's polar tug.
3. The ion is surrounded by a structured shell of water molecules
   (hydration shell).
4. The dissolved ion can now move around independently.

For the dissolution to happen, the energy released by hydration must
exceed the lattice energy of the original crystal. If hydration energy >
lattice energy → soluble. If not → insoluble. This is why some lithium
salts dissolve readily (LiCl: very soluble — 84.5 g/100 mL water at 25 °C)
and others don't (Li₂CO₃: only 1.3 g/100 mL).

## What "dissolved" means at the molecular level

When you drop a lithium chloride crystal into water, here's the molecular-
level story:

```
[Step 1: Dry crystal]
... Li⁺ Cl⁻ Li⁺ Cl⁻ ...                    (perfect ionic lattice)
... Cl⁻ Li⁺ Cl⁻ Li⁺ ...
... Li⁺ Cl⁻ Li⁺ Cl⁻ ...

[Step 2: Water surrounds the surface]
[H₂O molecules orient O-toward-Li⁺ and H-toward-Cl⁻]

[Step 3: Surface Li⁺ tugged out by water]
... Cl⁻ Cl⁻ Li⁺ ...
[Li⁺ now surrounded by 4-6 water molecules pointing O at it]

[Step 4: Continued dissolution]
[Water molecules form a continuous medium of hydrated Li⁺ and hydrated Cl⁻]
```

The dissolved Li⁺ is *not* a bare lithium ion floating in water. It's a
**hydrated complex**: roughly Li(H₂O)₄⁺ or Li(H₂O)₆⁺ depending on
concentration and temperature, with additional looser layers of water
beyond the first.

The hydrated Li⁺ has effective radius ~3.4 Å, compared to bare Li⁺ at
0.76 Å. **Most separation methods see the hydrated Li⁺, not the bare
ion.** The hydration shell is essentially "part of" the species you're
trying to separate.

## Concentrations and the language of solution chemistry

Several conventions for expressing how much solute is in a solvent. Get
comfortable with all of them; literature switches.

| Quantity | Symbol | Definition | Common units |
|----------|--------|------------|--------------|
| Molarity | $M$ | mol of solute / liter of solution | mol/L (M) |
| Molality | $m$ | mol of solute / kg of solvent | mol/kg (m) |
| Mass fraction | $w$ | mass of solute / mass of solution | dimensionless or % |
| Mole fraction | $x$ | mol of solute / total mol | dimensionless |
| Parts per million | ppm | mass of solute / mass of solution × 10⁶ | mg/kg |
| Parts per billion | ppb | × 10⁹ | μg/kg |

Brines (lithium-rich salt waters) are typically described in mg/L or g/L
of dissolved Li, often in the range 100 to 2000 mg/L for economically
viable sources.

In separation processes, you often track concentrations through stages
and watch how they evolve. For isotope work, you track the **isotope
ratio** (Li-6/Li-7) in addition to total concentration.

## Saturation, solubility, and supersaturation

Every solute has a **solubility limit** at a given temperature: the
maximum concentration that can dissolve. Beyond that, additional solute
won't go into solution and stays as a solid (the solution is
**saturated**).

Solubility is temperature-dependent. For most ionic salts, hotter water
dissolves more — but not always. Li₂CO₃ is famously *less* soluble in
hot water than in cold (1.5 g/100mL at 0 °C, 0.7 g/100mL at 100 °C),
because its dissolution is slightly endothermic enough that Le Chatelier
flips the temperature dependence. This counter-intuitive solubility is
why lithium carbonate is sometimes precipitated by *heating* a lithium
solution rather than cooling it.

**Supersaturation** is the metastable state of having more solute
dissolved than equilibrium allows. It collapses to the saturation level
when crystal nucleation is triggered. Industrial crystallizers
deliberately create supersaturation to grow crystals on demand.

## Activity, ionic strength, and why "ideal" solution thermodynamics breaks down

In dilute solutions, you can treat ion concentration as the variable
that drives equilibrium. In real-world brines (concentrated electrolytes,
sometimes >5 M), ions interact with each other, and the *thermodynamic
driver* is **activity** $a$, not concentration $c$:

$$ a_i = \gamma_i c_i $$

The **activity coefficient** $\gamma_i$ accounts for these inter-ion
interactions. It's modeled by Debye-Hückel theory at low concentrations,
extended Debye-Hückel for moderate, Pitzer equations for concentrated.

For our purposes, you need to know:
- In dilute solutions, $\gamma \approx 1$ and concentration is fine.
- In concentrated brines, $\gamma$ can be significantly different from 1
  (sometimes much less, sometimes more), and any quantitative
  thermodynamic prediction must use activities.
- Isotopic separation factors *can* depend on activity coefficients,
  which means they can depend on the bulk-salt environment in non-
  obvious ways. Surprising results in the literature often trace to
  activity-coefficient effects.

## Aqueous chemistry: pH, acids, bases (briefly)

Water spontaneously self-ionizes:
$$ \text{H}_2\text{O} \rightleftharpoons \text{H}^+ + \text{OH}^- $$
with equilibrium constant $K_w = 10^{-14}$ at 25 °C. So pure water has
$[\text{H}^+] = [\text{OH}^-] = 10^{-7}$ M, and the **pH** = $-\log_{10}
[\text{H}^+]$ = 7.

- Acids release H⁺ when dissolved (HCl → H⁺ + Cl⁻; very strong acid).
- Bases consume H⁺ or release OH⁻ (LiOH → Li⁺ + OH⁻; strong base).
- The **pKa** of an acid quantifies its dissociation strength.

Most isotope-separation processes operate in a controlled pH window
(often quite alkaline, e.g., LiOH in COLEX). Why? Because the *speciation*
of dissolved lithium changes with pH (e.g., Li⁺ vs. LiOH⁰ vs. LiOH₂⁻),
and different speciations have different separation behavior. We will
see this in the methods chapter.

## Phase equilibria — the conceptual root of all separations

A general principle: when two phases (solid/liquid, liquid/liquid,
liquid/gas) are in contact at equilibrium, a solute distributes between
them according to the **distribution coefficient** $K_d = c_1/c_2$.
This $K_d$ depends on temperature, pressure, the chemical environment of
both phases, and the *isotope* of the solute (slightly!).

If $K_d$ is even slightly different for two isotopes, repeated equilibration
(many stages, like a column) can amplify the difference into a usable
separation. **Every column-style separation in chemistry is an instance of
this principle**: feed in a mixture, run it through a phase-equilibrium
gradient, collect enriched material at one end.

This is the conceptual frame that lets ion exchange, distillation, solvent
extraction, and chromatography all look the same in a process-engineering
diagram. It's also why the "**separation factor α**" (the ratio of $K_d$s
for two isotopes) is the universal currency of isotope-separation
literature.

## Common misconceptions

- **"Solid water is more dense than liquid water."** False. Ice floats
  because hydrogen-bonding forces an open lattice that's less dense than
  the disordered liquid.
- **"Salts always dissolve more in hotter water."** Mostly true, but
  Li₂CO₃, Ce₂(SO₄)₃, and a few others go the wrong way. Don't assume.
- **"Concentration and activity are the same thing."** They're equal
  only in the dilute limit. Real industrial solutions are often
  concentrated enough that the distinction matters.
- **"Pure water is a good conductor."** Pure water is a *terrible*
  conductor (resistivity ~18 MΩ·cm). It's the dissolved ions that make
  ordinary water conduct.
- **"A saturated solution is the most ions you can possibly get into
  solution."** Not in special conditions — supersaturation is real and
  stable for non-trivial periods, especially with careful temperature
  control or in the absence of nucleation seeds.

## Connection to next

You now have everything you need to talk about real chemistry. The final
chemistry-fundamentals file zooms in on **lithium** itself: its position
on the periodic table, its specific properties, where it's found, and why
it has shown up as the focal element of the energy economy of the 21st
century.

## Self-check questions

1. Why does ice float? Why is that a useful property for life on Earth?
2. A lithium-bearing brine contains 1500 mg/L of Li⁺. How many *moles* of
   Li per liter is that? (Atomic weight Li = 6.94 g/mol.)
3. Why is lithium carbonate less soluble in hot water than cold? What
   does this tell you about the sign of the dissolution enthalpy?
4. Pure water conducts electricity poorly, but adding even a small amount
   of LiCl makes it conduct well. Explain in one sentence at the
   particle level.
5. In a column where two phases (e.g., aqueous and amalgam) are in
   contact, the ratio of Li-6 to Li-7 in each phase differs slightly at
   equilibrium. The separation factor α = 1.05. If you run this 50 times
   in series (a 50-stage cascade), roughly how enriched can you get the
   Li-6 in one end relative to the other? (Use the multiplicative-stage
   rule.)
