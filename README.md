# Kory's Grok Dashboard

A simple static dashboard listing your Grok Bots and Projects, with dedicated research/documentation index pages for each bot.

## Structure
- `index.html` — Main dashboard
- `bots/` — Individual bot research pages
  - `g-bot.html`
  - `ai-tools-scout.html`
  - `shot-director.html`
- `css/style.css` — Dark theme styles
- `js/search.js` — Client-side semantic search (Transformers.js)
- `js/gallery.js` — Opens research-page image thumbnails full-size
- `assets/images/` — Web-optimized stills and character sheets (thumbnails in `thumbs/`)

## Features
- Bot and project cards
- **Semantic search** across all research (client-side Transformers.js)
  - First load downloads ~30MB model (cached afterward)
  - Searches by meaning: try "orbit faces", "character sheet", "4K editing", "lighting prompt"
  - Runs entirely in your browser (no backend); serve over HTTP because of ES modules

## How to use
`js/search.js` is an ES module and loads Transformers.js from a CDN, so the site needs to be served over HTTP (opening `index.html` as a local file will break search).

From this folder:

```
python -m http.server
```

Then open http://localhost:8000 in your browser.

1. Click any bot card to see its research and documentation index.
2. Use the search bar on the dashboard to search research by meaning.
3. The site is fully static once served; search runs in the browser (first load downloads ~30MB, then cached).

## Current Bots
- **G Bot** — Video generation & storyboard work
- **AI Tools Scout** — Morning AI creative tools briefs
- **Shot Director** — Cinematography prompt coaching

Last updated: November 22, 2026
