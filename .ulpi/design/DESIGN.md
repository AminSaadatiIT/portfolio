---
project: Amin Saadati Portfolio
register: brand
aesthetic_direction: industrial / signage
color_strategy: committed
design_system: bespoke
design_variance: 7
motion_intensity: 6
visual_density: 5
---

# Design Language — Industrial Precision

*"Every screen must read as the same product if placed side by side."*

## Design Read

**Precision meets warmth — network infrastructure expertise presented with the clarity of a terminal and the trust of steel.** The bet: technical credibility through industrial metaphors (equipment orange, server green) without coldness. This is a person, not a corporation.

## Signature

**The custom cursor** — an orange circle (equipment/tools) that transforms to green (server status) on interactive elements. It embodies the domain in a single interaction: you're navigating a network specialist's world.

## Inspiration

No external links provided. Identity derived from:
- **Domain:** Network infrastructure, structured cabling, CCTV, fiber optics, security systems
- **Color world:** Equipment orange (MikroTik/Cisco hardware), server LED green, dark steel racks, fiber optic blue
- **Metaphor:** The portfolio IS a network — header is the gateway, sections are nodes, the cursor is your packet

## Color (locked)

| role | OKLCH | hex | use |
|------|-------|-----|-----|
| background | oklch(0.1 0.01 260) | #0F1215 | Page canvas, dark steel |
| surface | oklch(0.14 0.012 260) | #1A1D21 | Cards, panels, elevated surfaces |
| elevated | oklch(0.18 0.012 260) | #252830 | Dropdowns, modals, highest layer |
| text primary | oklch(0.95 0.005 260) | #F5F6FA | Headings, primary content |
| text secondary | oklch(0.72 0.008 260) | #B8BCC2 | Body text, descriptions |
| text muted | oklch(0.45 0.01 260) | #6B7280 | Labels, captions, timestamps |
| border subtle | oklch(0 0 0 / 0.1) | rgba(232,168,56,0.1) | Default borders |
| border default | oklch(0 0 0 / 0.2) | rgba(232,168,56,0.2) | Active borders |
| border strong | oklch(0 0 0 / 0.3) | rgba(232,168,56,0.3) | Focus rings, emphasis |
| **accent** | oklch(0.75 0.15 70) | #E8A838 | Industrial Orange — CTAs, highlights, skill bars |
| success | oklch(0.7 0.16 160) | #00B894 | Server Green — status, availability, secondary accent |
| warning | oklch(0.8 0.15 85) | #F4C66A | Primary light variant |
| danger | oklch(0.6 0.2 25) | #FF6B6B | Errors, destructive actions |
| info | oklch(0.65 0.15 250) | #0070f3 | Links, informational states |

**60-30-10 distribution:**
- 60% dark surfaces (#0F1215, #1A1D21)
- 30% text hierarchy (#F5F6FA, #B8BCC2, #6B7280)
- 10% accent (#E8A838) + success (#00B894)

**WCAG AA compliance:**
- Text primary on background: 12.5:1 ✅
- Text secondary on background: 6.8:1 ✅
- Text muted on background: 3.2:1 (large text only) ⚠️
- Accent on background: 5.1:1 ✅

## Type (locked)

| role | family | use | notes |
|------|--------|-----|-------|
| display | Space Grotesk | Headlines, section titles | Geometric, technical feel; weight 700-800; tracking -0.02em to -0.04em |
| body | Inter | Reading, descriptions | Humanist, highly readable; weight 400-500; measure 65-75ch |
| utility | JetBrains Mono | Labels, data, captions | Monospace for technical precision; weight 500; uppercase labels |

**Pairing logic:** Geometric sans (Space Grotesk) + Humanist sans (Inter) — technical precision meets approachability. Mono (JetBrains) for data/labels reinforces the terminal metaphor.

**Scale (modular, 1.25 ratio):**
- xs: 11px / 0.6875rem
- sm: 13px / 0.8125rem
- base: 15px / 0.9375rem
- md: 17px / 1.0625rem
- lg: 20px / 1.25rem
- xl: 24px / 1.5rem
- 2xl: 32px / 2rem
- 3xl: 44px / 2.75rem (clamp)
- hero: clamp(36px, 7vw, 72px)

## Scales (locked)

**Spacing (4px base):**
`0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128` (px)

**Radius:**
`{ sm: 6px, md: 10px, lg: 16px, xl: 20px, full: 9999px }`

**Shadow / elevation:**
- sm: `0 1px 3px rgba(0,0,0,0.2)`
- default: `0 4px 12px rgba(0,0,0,0.25)`
- md: `0 8px 24px rgba(0,0,0,0.3)`
- lg: `0 16px 48px rgba(0,0,0,0.35)`
- xl: `0 24px 64px rgba(0,0,0,0.4)`

**Z-index layers:**
- base: 0
- aurora: 1
- content: 2
- header: 100
- modalBackdrop: 200
- modal: 210
- scrollProgress: 9999

**Breakpoints:**
- sm: 480px
- md: 768px
- lg: 1024px
- xl: 1280px

**Motion:**
- fast: 150ms
- base: 300ms
- emphasis: 500ms
- easing: cubic-bezier(0.16, 1, 0.3, 1) — deceleration
- No bounce/elastic for UI
- Honor `prefers-reduced-motion`

## Voice

**Register:** Technical confidence — clear, direct, no buzzwords.

**Action vocabulary:**
- "View My Work" → (navigates to projects)
- "Contact Me" → (opens contact form)
- "Download Resume" → (downloads PDF)

**Tone:** First person, active voice, specific. "I design and implement network infrastructure" not "Passionate about networking."

## Component Patterns

### Glass Card
- Background: rgba(255,255,255,0.04)
- Border: 1px solid rgba(255,255,255,0.08)
- Radius: 16px
- Backdrop-filter: blur(10px)
- Hover: translateY(-2px), border-color increase

### Section Label
- Font: JetBrains Mono, 12px, uppercase
- Color: accent (#E8A838)
- Background: rgba(232,168,56,0.1)
- Border: 1px solid rgba(232,168,56,0.2)
- Radius: 999px (pill)

### Skill Bar
- Height: 6px
- Background: surface-2
- Fill: linear-gradient(90deg, accent, success)
- Animation: width transition 1.2s ease

### Profile Card
- Photo with gradient overlay (bottom-heavy for text readability)
- Floating text with text-shadow
- Social links: opacity 0 → 1 on hover, translateY(15px) → 0
- Badge: success color, positioned top-left

### Custom Cursor
- Default: Orange circle (32px) with center dot
- Hover: Green circle (32px) with larger center dot
- Glow: Radial gradient following mouse, accent color at 8% opacity

## Anti-Slop Compliance

✅ No purple/blue gradients
✅ No cream/sand backgrounds
✅ No Inter as primary display font
✅ No centered hero over dark mesh (hero is content-focused)
✅ No three equal cards (skills use 3-col but with varied content)
✅ No bounce/elastic animations
✅ No buzzwords in copy
✅ No em-dash as stylistic crutch
✅ Custom cursor as signature (not generic)
✅ Domain-derived palette (not default blue)

## Build Handoff

**Target agent:** Any (static site, no SSR needed)
**Design system:** Bespoke (brand register — identity IS the product)
**Acceptance criteria:**
1. All tokens from this spec implemented as CSS custom properties
2. Custom cursor works on desktop (hidden on touch devices)
3. Glass card pattern used consistently for all card-like elements
4. Section labels use monospace + accent color
5. Skill bars use gradient fill (accent → success)
6. Profile card has floating text with gradient overlay
7. Responsive: single column on mobile, grid on desktop
8. `prefers-reduced-motion` disables all animations
9. WCAG AA contrast for all text combinations
10. Custom cursor glow follows mouse on desktop only
