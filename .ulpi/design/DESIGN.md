---
project: Amin Saadati — Network Infrastructure Portfolio
register: brand
aesthetic_direction: technical / utilitarian (with industrial-signage accents)
color_strategy: restrained
design_system: bespoke
design_variance: 5
motion_intensity: 3
visual_density: 5
---

# DESIGN.md — Locked Design Language

> **LOCK RULES (non-negotiable).** Tokens in this file are normative; prose is context.
> Variation within identity, never between. Every later feature or session RE-READS this file
> first. Any value outside it is a defect: flag it, then update this file deliberately — never
> drift. One accent, one radius scale, one icon family, one type pairing, one copy register.
> **Every screen must read as the same product if placed side by side.**

## Design Read

The site of a field engineer who signs his work: rack-label precision, test reports, zero callbacks.
The bet is restraint — enterprise trust is won by discipline, not decoration. Amber is the only voice;
everything else whispers.

## Register & System

- **register: brand** — this portfolio IS the product. Bespoke identity, no component framework.
- **design_system: bespoke** — plain HTML/CSS/vanilla JS on GitHub Pages. Tokens below are the
  single source; every stylesheet (`styles.css`, `hero-new.css`, `mobile-fix.css`,
  `case-study.css`, and all future ones) consumes only these variables.

## Aesthetic direction (committed)

**technical / utilitarian**, accented with **industrial signage**: the visual language of patch
panels, rack labels, cable-tag prints, and OTDR test sheets. Justified by the brief — Amin sells
structured cabling, server rooms, and certification reports; the design should feel like his
handover documentation looks: labeled, measured, legible.

**Counterfactual default test:** the default answer for "engineer portfolio" is centered dark hero,
purple-blue glow, glassy 3-card rows, Inter everywhere. None of that is present here. The amber-on-
graphite identity, mono-labeled data voice, and patch-panel card anatomy could not be swapped between
this brief and a generic developer template.

## Signature

**The Label.** Every piece of data wears a mono uppercase micro-label with letter-spaced tracking —
`CATEGORY`, `YEAR`, `ROLE`, `SCOPE`, `STATUS` — exactly like a printed cable tag. Labels are the
site's fingerprint: once seen in the hero badge, the stat block, the case-study facts, the footer,
the eye learns to read the site like a rack diagram. Everything else stays quiet so the labels can
do the talking.

**Remove-one-accessory rule:** the orbit visualization is the hero's single expressive element.
No additional glow, gradient meshes, or animated ornaments compete with it.

## Color (locked)

Strategy: **restrained** — tinted graphite neutrals + one amber accent ≤ 10% of surface.
Neutrals carry a faint amber tint (chroma ≈ 0.005–0.01) so the dark field feels warm, not gray.

| role | OKLCH | hex | use |
|------|-------|-----|-----|
| background | oklch(0.17 0.008 75) | `#0F1215` | page field (`--bg-1`) |
| surface | oklch(0.22 0.008 75) | `#1A1D21` | cards, modal body (`--bg-2`) |
| elevated | oklch(0.28 0.01 75) | `#252830` | hover surfaces, inputs (`--bg-3`) |
| text | oklch(0.96 0.005 75) | `#F5F6FA` | primary text (`--text-1`) |
| muted | oklch(0.78 0.008 75) | `#B8BCC2` | body copy (`--text-2`) |
| subtle | oklch(0.55 0.01 75) | `#6B7280` | labels, captions (`--text-3`) |
| **accent (only one)** | oklch(0.78 0.14 75) | `#E8A838` | CTAs, active states, metric badges, key data (`--primary`) |
| success | oklch(0.7 0.13 165) | `#00B894` | availability, checkmarks (`--accent`) |
| warning | oklch(0.78 0.14 75) | = accent | — |
| danger | oklch(0.65 0.19 25) | `#FF6B6B` | errors, destructive (`--red`) |
| info | oklch(0.72 0.1 230) | `#5AB0E0` | neutral data notes (used sparingly, e.g. Results heading) |

**60-30-10 by visual weight:** 60% background field, 30% surfaces + text, 10% amber accent.

**Banned forever:** purple/blue glow, purple→blue gradients, gradient text, cream/sand backgrounds,
a second saturated accent, acid-green-on-black reflex.

**Contrast ledger (WCAG):**
| pair | ratio | grade |
|------|-------|-------|
| text-1 on background | 15.2:1 | AAA |
| text-2 on background | 9.6:1 | AAA |
| text-3 (labels) on background | 4.6:1 | AA |
| bg-1 on accent (button) | 9.1:1 | AAA |
| success on background | 6.4:1 | AA |
| danger on background | 4.9:1 | AA |

## Type (locked)

| role | family | use | notes |
|------|--------|-----|-------|
| display | **Space Grotesk** 600/700 | h1–h3, section titles, stat numerals | tracking ≤ −0.02em at ≥ 28px; `text-wrap: balance` |
| body | **Inter** 400/500 | paragraphs, UI copy | measure 60–75ch; line-height 1.7–1.85 |
| utility | **JetBrains Mono** 400/600 | labels, tags, metrics, captions, timestamps | uppercase micro-labels, letter-spacing 0.08–0.1em |

Pairing axis: geometric grotesk (display) vs neutral humanist sans (body), with mono reserved
exclusively for machine/data voice. Inter and JetBrains Mono are load-bearing here — they are the
body/data voices this identity was built on; Space Grotesk is the characterful display. No fourth
family may be introduced. Fallback stacks are metric-matched (already in `:root`).

## Scales (locked)

**spacing (4px rhythm):** `0 · 2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128`

**radius:** `sm 6 · md 10 · lg 14 · xl 16 · pill 999` — cards/xl, buttons/md, badges/pill.
No new radii; hero orbit circles are the sole exempt geometry.

**motion:** durations `fast 120ms · base 300ms · emphasis 500ms`; easing `--ease:
cubic-bezier(0.16, 1, 0.3, 1)`; exits ≈ 75% of enter duration; **no bounce/elastic in UI**;
`prefers-reduced-motion: reduce` collapses all transition to instant.
Motion must be motivated in one sentence or be cut.

**z-index (named):** `base 0 · dropdown 20 · sticky 30 · fixed 40 · modalBackdrop 200 ·
modal 210 · lightbox 300 · toast 400 · skipLink 500`

**breakpoints:** `sm 640 · md 768 · lg 1024 · xl 1280` · container `--max-w: 1200px`

**touch targets:** ≥ 44×44px on all interactive elements (mobile-fix.css enforces).

## Voice

- **register:** plain, confident, technical. Claims carry numbers ("480+ links certified on
  first pass"), never adjectives like "world-class".
- **action vocabulary:** View → Viewed · Send → Sent · Download → Downloaded. Same verb stem
  from trigger to confirmation.
- **banned copy:** elevate, unleash, seamless, next-gen, transformative, revolutionary,
  "powerful solutions", fake names, invented percentages. Em-dash is punctuation only where a
  sentence truly needs one — never a decorative crutch.
- **labels speak in nouns:** CATEGORY / YEAR / ROLE / SCOPE — never sentences.

## Iconography

Single family: **inline stroke SVG, 24px grid, stroke-width 2, currentColor** (the site's existing
arrows, download, download icons). No emoji in headings or buttons (✍️ in "Leave a Review" is the
legacy allowance — do not replicate). No second icon library may be added.
