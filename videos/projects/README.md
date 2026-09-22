# Project Videos

Short demo clips for project case studies.

## Guidelines

- **Format:** MP4 (H.264 + AAC) — plays natively in every browser
- **Size:** keep each clip under ~8 MB; 20–60 seconds is ideal
- **Naming:** lowercase, no spaces — e.g. `cabling-rack-timelapse.mp4`
- **Optional poster:** a matching `.jpg` frame (same name) shows before play,
  e.g. `cabling-rack-timelapse.jpg`

## How to reference

In `data/projects.json`:

```json
{
  "video": "videos/projects/cabling-rack-timelapse.mp4"
}
```

The case-study modal shows a **Video Demo** button only when this field is
set, and embeds a player (with the poster image) inside the case study.
