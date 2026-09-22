# Feature Spec — Case-Study Projects Section (as-built audit + forward spec)

> Binds to `.ulpi/design/DESIGN.md`. Re-read it first. Any value below outside the locked
> tokens is a defect to fix in code, not a license to drift.
>
> **Every screen must read as the same product if placed side by side.**

Status: the engineering build of this section is **live** (commits `8436f00`, `dc09520`).
This document (a) audits the build against the locked language, (b) specs the remaining gaps
as implementable briefs for the engineering agent.

---

## 1. User flows

### Flow A — Recruiter scans the grid (≤ 10 seconds)

**Goal:** understand what was built, by whom, with what, at what scale.
**Trigger:** nav "Projects" click, hero "View My Work", or `#projects` deep link.

```
[Land on section]
   → filter row (All / Cabling / CCTV / Server Room / Fiber / Security)
   → scan cards: cover 16:9 · YEAR tag · CATEGORY mono-label · title ·
     2-line description · metric badges · ROLE line · action buttons
   ◇ Enough info?
   ├── yes → click card anywhere → Flow B
   └── not yet → filter by discipline → rescan (animated, 300ms)
```

**Entry points:** nav link · hero CTA · footer · sticky CTA bar.
**Recruiter-first rule:** the card must answer built/role/tech/scale without a click.
Cover + YEAR + CATEGORY land in the first glance; metrics and role complete the scan.

### Flow B — Open a case study

```
[Click card OR "View Case Study"]
   → modal opens (300ms, translateY 24→0, focus → close button)
   → hero (video with poster | cover photo w/ shade gradient)
   → title + facts (CATEGORY/YEAR/ROLE/CLIENT/LOCATION labels)
   → metric band → Overview → Scope (mono) → My Role → Tech tags
   → [optional] Diagram section (hidden if no asset)
   → Gallery thumbs → Challenges / Solutions / Results cards
   ◇ Photo interest?
   ├── yes → click thumb → Flow C
   └── done → ✕ | Escape | backdrop click → close, focus returns to opener
```

### Flow C — Gallery lightbox

```
[Click thumb | "Photo Gallery" card button]
   → lightbox (200ms fade; caption "Title — n / total")
   → ‹ › buttons | ← → keys | wrap-around
   → Escape: lightbox closes first; a second Escape closes the modal beneath
   → backdrop click closes
```

### Flow D — Video demo

**Condition:** project JSON has non-empty `video`.
Card gains ▶ flag + "Video Demo" button. Click opens the case-study modal with the
video hero; playback is user-initiated (`controls`, `preload="metadata"` — no autoplay).

### Flow E — Data load (system flow)

```
[Page load]
   → instant paint from built-in defaults (never an empty grid)
   → fetch data/projects.json → re-render with case studies
   ◇ fetch ok?  ├── yes → case-study cards
   │            └── no (offline/404) → defaults stay; zero breakage
   → per-photo probe: real photo loads in, else SVG fallback / "photo pending" tile
```

---

## 2. State model (every interactive element)

### Filter bar
| state | behavior |
|---|---|
| default | pill, surface-1 bg, border-1, text-2 |
| hover | border-3, text-1 |
| **active** | accent bg, bg-1 text, 600 weight; `aria-selected="true"` |
| focus | visible keyboard focus ring |
| filtering | leaving cards animate hiding (300ms) then `display:none`; entering reverse |

### Project card
| state | behavior |
|---|---|
| default | surface bg, border-1, translateY 0 |
| hover | translateY −4px, border-3, shadow, cover scale 1.04 (600ms) |
| focus-visible | same elevation + focus ring (card is `tabindex="0"`) |
| loading (photo) | SVG category fallback shown instantly; real photo swaps on probe |
| photo missing | category SVG fallback / "photo pending" tile — never a broken image |
| reduced motion | transforms/animation off; elevation via border/shadow only |

### Case-study modal
| state | behavior |
|---|---|
| opening | 300ms slide-up, backdrop fade; body scroll locked; focus → first focusable (✕) |
| open | focus trapped (Tab wraps); Escape/backdrop/✕ close |
| no video | hero = cover image |
| video | `<video controls>` with poster; no autoplay |
| no diagram | section hidden entirely |
| gallery empty | section hidden |
| closing | focus restored to opener (card or specific button) |

### Lightbox
| state | behavior |
|---|---|
| single image | arrows hidden |
| multi | arrows visible; ←/→ keys; wrap-around; caption "n / total" |
| over modal | z-300; Escape consumption ordered lightbox → modal |

### Edge cases
| scenario | handling |
|---|---|
| JSON fetch fails | default projects persist; console warning only |
| missing cover/gallery photo | probe → fallback; missing thumb shows "photo pending" |
| refresh mid-modal | modal closes (no persistence needed); grid state resets to All |
| admin-edited projects | JSON case studies override admin list on load; admin stays for simple edits |
| slow network | defaults painted first — no spinner, no blank section |
| reduced motion | all enter/exit animations collapse to instant |

---

## 3. Component specs

### 3.1 `CaseCard`
**Purpose:** grid unit communicating one project at recruiter-glance depth.

**Anatomy (top→bottom):** cover (16:9, hover scale) → shade gradient → ▶ flag (if video) →
YEAR pill (top-right) → body: CATEGORY mono-label + location · title (display 17px) ·
2-line clamped description · metric badges (mono, amber, max 4) · ROLE line (label+value,
top border) · action row.

**Props (from projects.json):** `id, title, category, categories[], year, role, client,
location, cover, fallback, video, description, metrics[], gallery[]`.

**States:** default / hover / focus-visible / photo-loading / photo-missing — see §2.

**Responsive:** lg 3-col → md 2-col → mobile 1-col full-width. Action buttons wrap; touch ≥ 44px.

**A11y:** `<article tabindex="0" aria-label="Open case study: {title}">`; Enter on card opens;
buttons are real `<button>`s with `data-action`; card click delegation ignores button-originated
events (no double-open).

### 3.2 `CaseStudyModal`
**Purpose:** full technical narrative without leaving the page.

**Sections in order:** sticky floating ✕ · hero media · title + facts · metric band ·
Overview (+ Scope mono line) · My Role · Technologies & Standards (mono tags) ·
Technical Diagram (optional) · Project Gallery (optional) · Challenges/Solutions/Results
(3-card grid, heading colors: danger / success / info — the only non-amber chroma allowed,
reserved for meaning).

**A11y:** `role="dialog" aria-modal="true" aria-label="Project case study"`, focus trap,
restore-on-close, `aria-label` per thumb ("Enlarge photo n of m"), Escape ordering.

**Responsive:** width `min(980px, 100%)`; mobile full-bleed, hero 16/10, CSR cards stack.

### 3.3 `Lightbox`
**Purpose:** distraction-free photo inspection.
Fixed inset, near-black backdrop (92%), contained image (max-height 74vh), mono caption,
round prev/next (46px), round ✕. Keyboard: ← → Escape. Focus moves in on open, returns on close.

### 3.4 `FilterBar`
**Purpose:** discipline-scoped scanning.
Pills with `data-filter` keys: `all · cabling · cctv · rack · fiber · security`.
Single-select (`aria-selected`), animated 300ms re-flow. Category key additions require one
JSON field + one button (documented in docs/CASE-STUDY-PROJECTS.md).

### 3.5 `MetricBadge` / `TechTag` / `FactItem`
**MetricBadge:** mono 12px 600, amber text, amber-tinted bg (8%) + border (25%), pill.
**TechTag:** mono 12px, surface-2 bg, border-2, radius md — quieter than metrics by design.
**FactItem:** stacked label(mono 10px subtle, 0.1em tracking)/value — the Signature applied.

---

## 4. Gaps to implement (engineering brief)

| # | Gap | Spec |
|---|-----|------|
| G1 | Real diagram assets | `images/projects/<cat>/topology.png` (or .svg) per project; set `diagram` field. Rendered inside `.cs-figure` frame. Draw in amber/graphite on bg-2, mono labels. |
| G2 | Real photos | Replace per-category `cover.jpg` + gallery JPGs (README has compression rules). |
| G3 | Demo video | One 60–90s mp4 for the cabling project; sets `video` field; card auto-gains Video Demo. |
| G4 | Shareable case-study URL | On modal open set `history.replaceState ?project=<id>`; on load, if param present, auto-open that case study after data load; on close, strip param. Enables recruiter deep links. |
| G5 | Focus-visible ring token | Add `--focus-ring: 0 0 0 2px bg-1, 0 0 0 4px var(--primary)` to :root and use on all interactive elements for a uniform keyboard focus. |
| G6 | Existing code debt vs locked language | Remove `text-gradient` usage (gradient text is a banned cliché) — replace spans with solid accent color. Sweep hero subtitle + section copy for decorative em-dashes; keep only where grammatically required. |
| G7 | Nav length | Header nav carries 7 top-level anchors (gate target ≈ 5). Recommend: drop "Home" (logo already links it) and fold "Experience" under "About" — pending owner approval since it alters visible structure. |

## 5. Pre-Flight result

**Identity lock** ✅ tokens-only (audit found gradient-text + em-dash debt → filed as G6, not silently ignored) · one accent (amber; danger/success/info reserved for semantic CSR headings) · one radius scale (hero orbit exempt by lock) · one icon family (inline stroke SVG) · one type pairing.

**Anti-slop** ✅ no purple/blue glow, no cream, no glassmorphism, no nested cards, no numbered eyebrow markers · fonts: Inter/JetBrains Mono are the established body/data voices (not reflex-picked; Space Grotesk is the characterful display) · counterfactual test passed (patch-panel label anatomy is not a template swap) · slop test: the site reads as engineered documentation, not LLM output.

**State coverage** ✅ fetch-fail, missing photos, reduced motion, focus restore, Escape ordering, admin-override all specced.

**Accessibility** ✅ contrast ledger recorded (AA/AAA) · focus trap + restore · keyboard full path · touch ≥ 44px · focus-ring token specced (G5).

**Layout craft** ✅ ≥ 3 families (split hero+orbit / card grid / mono-fact modal / 3-card CSR / editorial timeline).

**Cognitive load** ⚠️ nav = 7 items (gate ≈ 5) → G7, owner decision required; forms already ≤ 4 fields per group; one primary action per card (View Case Study) with subordinate secondary buttons.

**Scored self-critique (0–4):** distinctiveness 3 · hierarchy 4 · consistency 4 · accessibility 3 · state coverage 4 · copy 3 (G6 em-dash debt) · restraint 4 · motion motivation 4 → **29/32**, no axis ≤ 2. Gaps G1–G7 are filed with owners, not hand-waved.

## 6. Build handoff

- **Target agent:** engineering agent (static HTML/CSS/vanilla JS; no framework, no build).
- **design_system:** bespoke — theme via the locked CSS variables in `:root` (styles.css).
  **Implement exactly this spec. Do NOT redesign or re-implement beyond it.**
- **Acceptance criteria:**
  - [ ] All flows A–E behave as specified on desktop (1280), tablet (768), mobile (390)
  - [ ] Every state in §2 has a visible, tested behavior (including fetch-fail and missing photos)
  - [ ] Focus trap + restore, Escape ordering (lightbox → modal), keyboard-only complete journey
  - [ ] All colors/typography/radii/motion from DESIGN.md tokens only; 0 off-system values
  - [ ] No horizontal overflow at 390px; touch targets ≥ 44px
  - [ ] `prefers-reduced-motion` collapses all animation
  - [ ] G4 deep link: `?project=<id>` opens the exact case study on load and share-back works
