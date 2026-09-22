# Engineering Case-Study Portfolio — Projects Section

## Architecture

```
index.html                 → Projects section shell (filters + #projectsGrid)
                           → Case-study modal (#projectModal) + Lightbox (#lightbox)
data/projects.json         → Single source of truth for all projects (loaded via fetch)
js/app.js                  → loadCaseStudyProjects() / renderProjects() /
                             openProjectModal() / openLightbox() + focus-trap
css/case-study.css         → All card / modal / lightbox styles (theme tokens from styles.css)
images/projects/<cat>/     → Real project photos (see placement below)
videos/projects/           → Demo videos (mp4, H.264)
```

**Load order:** cards render instantly from built-in defaults, then
`loadCaseStudyProjects()` fetches `data/projects.json` and re-renders.
If the fetch fails (offline preview), defaults remain — the site never breaks.

## Modified files

| File | Change |
|------|--------|
| `index.html` | Projects section: new header, filter bar, case-study modal HTML, lightbox HTML; CSS/JS version bump |
| `css/case-study.css` | **NEW** — cards, modal, lightbox, responsive (≤768px), reduced-motion |
| `js/app.js` | JSON loader, card renderer, case-study modal builder, lightbox, action-button wiring, fixed missing `initModal` definition (was a runtime crash) |
| `data/projects.json` | **NEW** — 4 full case studies |
| `images/projects/**` | **NEW** — per-category SVG placeholders + README |
| `videos/projects/` | **NEW** — README with video guidelines |

## JSON structure (`data/projects.json`)

```json
[
  {
    "id": 1,                          // unique number (required)
    "title": "Structured Cabling Infrastructure",
    "category": "Network Infrastructure",   // shown on card + modal
    "categories": ["cabling"],        // filter keys: cabling | cctv | rack | fiber | security
    "year": "2025",
    "role": "Network Infrastructure Engineer",
    "client": "Pars Technology Co.",          // optional
    "location": "Tehran, Iran",               // optional
    "cover": "images/projects/cabling/cover.jpg",     // real photo (optional)
    "fallback": "images/projects/cabling/cover.svg",  // shown until/if photo missing
    "video": "",                              // e.g. "videos/projects/cabling-demo.mp4"
    "description": "1–2 sentence overview…",
    "scope": "12 floors · 480+ user points · MDF + 8 IDF",
    "roleDetail": "My responsibilities…",
    "metrics": ["12 Floors", "480+ Cable Links", "CAT6A", "TIA-568", "100% Certified"],
    "technologies": ["CAT6A", "Patch Panel", "Fluke DSX", "…"],
    "gallery": ["images/projects/cabling/01-rack-front.jpg", "…"],
    "diagram": "images/projects/cabling/topology.png",  // optional, hidden if empty
    "challenges": ["…"], "solutions": ["…"], "results": ["…"]
  }
]
```

## Image placement

Put real photos in the matching folder (names are what `gallery`/`cover` point to):

```
images/projects/
├── cabling/      cover.jpg, 01-rack-front.jpg, 02-patch-panel.jpg, …
├── cctv/         cover.jpg, 01-dome-install.jpg, …
├── server-room/  cover.jpg, 01-rack-row.jpg, …
└── fiber/        cover.jpg, 01-splicing.jpg, …
```

Guidelines (also in `images/projects/README.md`):
- JPG, ≤ 300 KB each, long edge ≤ 1920 px (use e.g. squoosh.app)
- `cover.jpg` = 16:9 hero. Gallery photos ≈ 4:3.
- Missing photos are fine: cards/modals show the category SVG placeholder,
  gallery slots show a "photo pending" tile. Nothing ever looks broken.

Video: MP4 (H.264 + AAC), ≤ 20 MB, 60–90 s. Set the `"video"` field and the
card automatically gains a **Video Demo** button + ▶ flag; the modal hero
becomes a player with the cover as poster.

## How to add a future project

1. Drop photos into `images/projects/<category>/`.
2. Copy any existing entry in `data/projects.json`, change `id` (next number),
   fill fields, list the new photo paths.
3. Commit + push. GitHub Pages deploys automatically (~1 min). No build step.

To add a new **filter category**: add the key to `categories` in JSON,
then one `<button class="filter-btn" data-filter="KEY">` in `index.html`.

## Behavior notes

- **Filter:** instant, animates cards; driven by `categories`, not `category`.
- **Modal:** focus-trapped, Escape/backdrop/✕ close, focus restored to opener.
- **Lightbox:** ←/→ keys, click arrows, caption "N / total", Escape closes
  lightbox first, a second Escape closes the modal.
- **Admin panel** (triple-click logo) still edits the simple project list;
  JSON case studies override it on load — keep `data/projects.json` canonical.
