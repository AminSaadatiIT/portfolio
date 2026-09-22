# Project Photos

This folder holds real project photos.

## Structure (one folder per category, matching paths used in `data/projects.json`)

```
images/projects/
├── cabling/       ← structured cabling photos (racks, patch panels, cable runs)
├── cctv/          ← camera installations, NVR rooms, positioning shots
├── server-room/   ← rack installs, UPS, cooling, cable management
└── fiber/         ← fusion splicing, ODF, OTDR work
```

## Guidelines

- **Format:** JPG (photos) or WebP — keep each image under ~300 KB for fast loading
- **Naming:** lowercase, no spaces — e.g. `cabling/patch-panel-a.jpg`, `cctv/nvr-room-01.jpg`
- **Sizes:** cover images ≈ 1200×700px; gallery images ≈ 1000×700px
- **Diagrams:** put network topology / rack diagrams in the same category folder
  (PNG or SVG), e.g. `cabling/topology-floor-plan.png`

## How to reference

In `data/projects.json` use **relative paths** (GitHub Pages safe):

```json
{
  "cover":   "images/projects/cabling/cover.jpg",
  "gallery": [
    "images/projects/cabling/rack-front.jpg",
    "images/projects/cabling/patch-panel.jpg"
  ],
  "diagram": "images/projects/cabling/topology.png"
}
```

If a photo is missing, the card automatically falls back to the built-in
SVG placeholder for that category — the site never shows a broken image.

## Videos

Short demo clips go in `videos/projects/` (MP4, H.264, under ~8 MB each).
Reference them with the `video` field in `projects.json`.
