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
index.html          single page: hero, project index, drawing archive, about, contact
css/style.css       all styling
js/main.js          drawing data + gallery filtering + lightbox
images/plans/       full-size drawing crops (JPEG, 1800 px on the long edge)
images/thumbs/      gallery thumbnails (JPEG, 700 px on the long edge)
docs/               plan archive catalog (CSV + Markdown) of the source drawing dump
```

## Adding a drawing

1. Put the full image in `images/plans/` and a thumbnail in `images/thumbs/`, using the same
   file name.
2. Add an entry to the `PLANS` array in `js/main.js`:
   `{ id: 'res-my-project', cat: 'residential', title: '…', sheet: 'A-101', alt: '…' }`.
3. Update the counts on the filter buttons in `index.html`.

## Publishing

Pushing to `main` and enabling GitHub Pages (Settings → Pages → Deploy from branch → `main` / root)
serves the site at `https://<user>.github.io/Portfolio/`.
