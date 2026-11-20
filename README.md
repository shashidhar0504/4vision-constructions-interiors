# Image folder

Drop real photographs here using the file names the site expects. Until a file exists, the site shows a branded placeholder panel instead of a broken image.

| File | Used for |
| --- | --- |
| `hero/hero-living-room.jpg` | Homepage hero (full-width, landscape, 2400px+ wide recommended) |
| `services/<slug>.jpg` | Service cards: `space-planning`, `false-ceiling`, `electrical-work`, `modular-furniture`, `modular-kitchen`, `wardrobes-storage`, `painting-finishing`, `decor-styling` |
| `projects/<slug>.jpg` | Gallery items, one per slug in `src/data/content.ts` (for example `living-room-demo.jpg`) |

Use only photographs you have the right to publish. Images currently referenced in `src/data/content.ts` are placeholders for your own photography. Replace them with actual 4VISION completed projects as soon as they are available, and update the `isDemo` flag to `false` for those items.
