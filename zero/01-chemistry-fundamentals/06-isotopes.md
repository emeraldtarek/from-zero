# 06 — Isotopes

## Prerequisite check

You've absorbed `01–05`. Especially: $Z$ defines the element, $A = Z+N$ is
the mass number, atomic weight is a population average over isotopes, and
nuclear binding energy is what holds nucleons together.

This is the **load-bearing concept of the lithium project**. Read slowly.

## Rigorous statement

**Isotopes** are atoms of the *same element* (same proton count $Z$) that
differ in their *neutron count* $N$, and therefore in their mass number
$A = Z + N$.

Notation: $^{A}_{Z}X$ — for example $^{6}_{3}\text{Li}$ ("lithium-6") and
$^{7}_{3}\text{Li}$ ("lithium-7"). Often the $Z$ subscript is dropped since
the element symbol already encodes it: just $^{6}\text{Li}$, $^{7}\text{Li}$.

Each combination of $Z$ and $N$ defines a **nuclide**. Isotopes are the
subset of nuclides that share $Z$. There are roughly 250 stable nuclides and
~3000 known unstable (radioactive) ones. Most elements have multiple
isotopes; some (like fluorine, F) have only one stable isotope; some
(like xenon, Xe) have nine.

## Plain-English unpacking

Same element. Same chemistry to a very good approximation. Different mass.
Different nuclear behavior.

That short sentence is the entire isotopes story. Everything else in this
file is unpacking what each piece means and why it leads to a separation
problem worth a doctoral career.

### "Same element, same chemistry to a very good approximation"

Chemistry is electrons rearranging. Two isotopes of the same element have:
- Same proton count → same nuclear charge → same electron count in neutral
  atoms → same electron configuration → same orbitals.

So they react with the same partners, form the same bonds, dissolve in the
same solvents. To 99%+ precision, lithium-6 and lithium-7 are
chemically interchangeable. You can substitute one for the other in
biological systems (mostly), in batteries, in industrial processes — and
the only thing that changes is the mass.

This near-identity is exactly what makes separation hard.

### "Different mass, different nuclear behavior"

Different $N$ → different nuclear mass → different nuclear binding → in
many cases, different radioactive stability.

The mass difference is the *only* handle we have for separating isotopes
without invoking nuclear reactions. Every separation method we will study —
COLEX, distillation, lasers, electrochemistry, membranes — is fundamentally
a way to amplify the tiny chemical or physical effects that come from this
mass difference.

## Why isotopes exist (from nuclear physics)

A neutron is roughly the same mass as a proton but has zero charge. From the
nucleus's point of view, neutrons are *helpful*:

- Each neutron contributes binding (via the strong force, just like protons
  do) without contributing to electrostatic repulsion.
- More neutrons let you build a bigger nucleus while keeping the strong-vs-
  Coulomb truce intact.

For light elements (Z ≤ 20 or so), stable nuclei tend to have $N \approx Z$.
For heavier elements, you need progressively more neutrons to dilute the
proton-proton Coulomb repulsion. By the time you're at uranium (Z=92), the
stable form is U-238 (N=146, so N/Z ≈ 1.59).

For each element there is a **valley of stability** — a band of $(Z, N)$
combinations that are stable or close to stable. Outside the valley, nuclei
are unstable and decay back toward it. The decay modes:

- **Alpha decay** (heavy nuclei): emit a $^4\text{He}$ nucleus. Z and N
  each drop by 2, A drops by 4.
- **Beta-minus decay**: a neutron turns into a proton + electron + (anti)neutrino.
  Z increases by 1, A unchanged. (Happens when nucleus has too many neutrons.)
- **Beta-plus decay / electron capture**: a proton turns into a neutron.
  Z decreases by 1, A unchanged. (Too many protons.)
- **Gamma emission**: nucleus shed excess energy as a photon. Z, A unchanged.
- **Spontaneous fission** (very heavy nuclei): nucleus splits into two
  smaller nuclei plus neutrons.

Lithium has only two stable isotopes: Li-6 and Li-7. Lithium-3, -4, -5,
-8, -9, -10, -11, -12 are all known but radioactive with half-lives ranging
from microseconds to milliseconds. They are made in laboratories or in
cosmic-ray spallation events and decay before you can use them.

## Why isotopes have *almost* identical chemistry — but not exactly

The first-order picture (identical electrons → identical chemistry) is what
you should hold most of the time. But there are second-order effects, and
they are *exactly* what isotope separation exploits. Three you should know:

### 1. Mass-dependent vibrational frequencies

In a chemical bond, two atoms vibrate against each other. The vibrational
frequency $\nu$ depends on the **reduced mass** $\mu$ of the pair:

$$ \nu = \frac{1}{2\pi} \sqrt{\frac{k}{\mu}}, \qquad \mu = \frac{m_1 m_2}{m_1 + m_2} $$

where $k$ is the bond force constant. Lighter atoms vibrate faster. A C-H
bond has higher vibrational frequency than a C-D bond (deuterium is twice as
heavy as protium). This isotope dependence carries over into the **zero-point
energy**, the lowest possible vibrational energy, which is
$\frac{1}{2}h\nu$. Heavier isotopes have lower zero-point energy, hence
slightly stronger bonds, hence slight differences in equilibrium constants
and reaction rates.

For Li-6 vs. Li-7, the relative mass difference is ~17%, so reduced-mass
effects are non-negligible. A Li-6–O bond has higher vibrational frequency
and higher zero-point energy than a Li-7–O bond, leading to a slight
preference for Li-7 in the more strongly-bound site (or sometimes Li-6,
depending on the system). This drives the **chemical isotope-exchange
equilibrium** at the heart of COLEX and related processes.

### 2. Kinetic isotope effect (KIE)

Because lighter isotopes vibrate faster and have weaker bonds, reactions
that involve breaking a bond to that atom proceed faster for the lighter
isotope. Quantitatively, transition-state theory predicts:

$$ \frac{k_\text{light}}{k_\text{heavy}} \sim \exp\left(\frac{(h\nu_\text{light} - h\nu_\text{heavy})}{2k_B T}\right) $$

For H/D the KIE can be 6–7 (huge); for Li-6/Li-7, it's typically 1.01–1.05
per stage. Small per-stage but cumulative over many stages.

### 3. Nuclear spin and laser methods

Li-6 has nuclear spin $I=1$; Li-7 has $I=3/2$. This makes their NMR signals
distinguishable, but more importantly, in laser-based isotope separation
(AVLIS), the *isotope shift* in atomic spectral lines — small differences
in wavelength caused by nuclear mass and nuclear-volume effects — lets you
selectively excite and ionize only one isotope. The Li-6 / Li-7 isotope
shift in the 670.8 nm 2S→2P transition is roughly 10 GHz, easily resolved
with modern tunable lasers.

## The natural abundance ratio of lithium

| Isotope | Natural abundance | Atomic mass (u) | Nuclear spin |
|---------|-------------------|-----------------|--------------|
| **Li-6** | **7.59%** | 6.01512288742 | 1 |
| **Li-7** | **92.41%** | 7.01600343659 | 3/2 |

The 7.59% / 92.41% ratio is what nature gives you for free. Li-6 enrichment
takes that 7.59% and pushes it up — for fusion blankets, target enrichments
are 30–90%; for some research applications, 99%+.

The natural abundance ratio is set by Big Bang nucleosynthesis (Li-7) plus
later cosmic-ray spallation reactions and stellar processes; the small Li-6
component primarily comes from cosmic-ray-induced nuclear reactions in the
interstellar medium. Lithium has the most "anomalous" abundance pattern of
any light element — its observed cosmic abundance is several times lower
than Big Bang nucleosynthesis predicts, an anomaly known as the
**cosmological lithium problem**, still unresolved.

## Isotopes in the wild — a broader tour

For your domain literacy, a brief tour of why people care about isotopes
generally:

| Application | Isotopes used | Why |
|-------------|---------------|-----|
| Carbon dating | C-14 / C-12 | Radioactive, half-life 5730 years, dates organic material |
| Geological dating | U-238/Pb-206, K-40/Ar-40, Rb-Sr | Long half-lives, dates rocks |
| Medical imaging | Tc-99m (gamma emitter), F-18 (PET) | Short-lived, low-dose, useful decay modes |
| Cancer therapy | I-131, Lu-177, Ac-225 | Targeted radiation killing |
| Nuclear power (fission) | U-235, Pu-239 | Fissile (split when hit by thermal neutron) |
| Nuclear power (fusion) | D, T, **Li-6** | D+T fusion + Li-6 breeding tritium |
| NMR / structural biology | H-1, C-13, N-15 | Spin-active nuclei |
| Stable-isotope tracing | C-13, N-15, O-18, S-34 | Track mass through metabolism / ecosystems |
| Climate paleoarchive | O-16/O-18 in ice cores | Record past temperatures |

For the lithium project, the pivotal application is **fusion**: Li-6 is the
target species, mostly because of the reaction
$\text{Li-6} + n \rightarrow \text{T} + \alpha + 4.78\ \text{MeV}$. Fusion
reactors burn deuterium-tritium fuel; tritium is extraordinarily rare on
Earth (a few kg total, half-life 12.3 years), so fusion reactors must
*breed* their own tritium from Li-6 in a "breeding blanket" surrounding the
plasma. This is *the* reason Li-6 is strategically important. We will return
to this in `03-lithium-isotope-separation/01-why-separate-li6-li7.md`.

## Common misconceptions

- **"Isotopes are radioactive."** Not necessarily. Most stable atoms have
  multiple stable isotopes. Carbon's stable isotopes are C-12 and C-13;
  C-14 is the famous radioactive one. Lithium's stable isotopes are both
  non-radioactive (Li-6 and Li-7).
- **"Isotopes have different chemistry."** Almost identical first-order
  chemistry. Differences are second-order (zero-point energy, kinetic
  effects). The chemistry of Li-6 is *not measurably different* from Li-7
  in most contexts — that's the whole problem.
- **"Heavier isotopes always behave the same way as lighter ones."** Their
  *equilibrium* behavior is shifted in well-understood ways (heavier
  generally prefers more strongly-bound sites in equilibrium reactions).
  Their *kinetic* behavior is shifted too (lighter reacts faster). The
  signs and magnitudes depend on the specific system.
- **"Isotope separation is just a matter of using a centrifuge."** That
  works for uranium, where the molecule UF₆ has substantial mass and the
  centrifuge can build up a meaningful separation per stage. For lithium,
  the molecules are much lighter and the relative mass difference, while
  larger, doesn't translate well to centrifuges. Lithium is its own
  separation problem.
- **"Once you know the natural abundance you can predict the cost of
  enrichment."** Not really. Cost depends on the *separation factor* of the
  chosen process, throughput, energy use, environmental constraints, and
  how rare the desired isotope is to begin with. Enriching Li-6 from 7.59%
  to 90% is much harder than enriching it from 7.59% to 30%.

## Connection to next

You now understand isotopes. The next file unpacks **ions**: the *other*
load-bearing concept for the lithium project, since most separation methods
operate on Li⁺ in solution rather than on neutral lithium atoms.

## Self-check questions

1. Why are the chemistries of Li-6 and Li-7 *almost* identical? What
   physical effect causes the small differences that we exploit for
   separation?
2. The natural abundance of Li-6 is 7.59% — barely 1 atom in 13. If you
   need a sample at 90% Li-6, what's the rough enrichment factor (ratio of
   final to initial mole fractions)? About how many "ideal stages" of a
   separation column with α=1.05 would you need? (Use the rule
   $N \cdot \ln(\alpha) \approx \ln(R_\text{final}/R_\text{initial})$ where
   $R$ is the Li-6/Li-7 ratio.)
3. Why does Li-6 capture a thermal neutron to produce tritium, but Li-7
   mostly doesn't? What does this say about the importance of having mostly
   *Li-6* (not Li-7) in a fusion breeding blanket?
4. Lithium's cosmological abundance puzzle is that observed Li-7 in old
   stars is ~3× lower than Big-Bang-nucleosynthesis predicts. Speculate
   about how this could constrain physics beyond the standard model.
5. Two reactions: A + Li-6 → product, A + Li-7 → product. The bond formed
   in the product involves Li. The reaction is reversible. At equilibrium,
   does Li-6 or Li-7 preferentially end up in the product, and why? (Use
   zero-point-energy reasoning.)
