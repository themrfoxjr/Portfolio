# Portfolio

Static site for Carlos Zorrilla — architectural design and project leadership.

No build step. Plain HTML, CSS and JavaScript.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Structure

```
index.html          single page: hero, project index, drawing archive, built work, about, contact
css/style.css       all styling
js/main.js          drawing data + gallery filtering + lightbox
images/plans/       full-size drawings (JPEG, 1800 px on the long edge)
images/photos/      built-work photographs and study boards (JPEG, 1600 px)
images/thumbs/      gallery thumbnails (JPEG, 700 px on the long edge)
docs/               plan archive catalog (CSV + Markdown) of the source drawing dump
```

## Adding a drawing

1. Put the full image in `images/plans/` and a thumbnail in `images/thumbs/`, using the same
   file name.
2. Add one entry to the `PLANS` array in `js/main.js`:
   `{ id: 'res-my-project', cat: 'residential', title: '…', sheet: 'A-101', alt: '…' }`.
   `cat` is `residential` or `commercial`.

The counts on the filter buttons update themselves from the `PLANS` list, and a filter with
nothing in it shows an empty-state message rather than a blank panel.

## Built work

The stories under `#built` are plain markup in `index.html` — one `<article class="story">` per
project, with a `<figure>` per image. Any image in `.story-media` opens in the lightbox, so no
JavaScript change is needed to add one.

## Publishing

Pushing to `main` and enabling GitHub Pages (Settings → Pages → Deploy from branch → `main` / root)
serves the site at `https://<user>.github.io/Portfolio/`.
