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
index.html      hero, work grid, about, contact, project view, lightbox
css/style.css   all styling
js/data.js      the project list — one object per project
js/main.js      renders the grid, the project view and the lightbox
favicon.svg
images/
  sets/         drawing sheets, one folder per project, plus thumbs/
  photos/       photographs, plus thumbs/
  thumbs/       thumbnails for photographs
docs/           plan catalog of the original drawing dump
```

## Adding a project

Add one object to `PROJECTS` in `js/data.js`:

```js
{
  id: 'my-project',            // also the folder name under images/sets/
  title: 'My Project',
  location: 'Chicago',         // optional
  line: 'One sentence on what it is.',
  category: 'residential',     // or 'commercial'
  cover: 'images/sets/my-project/thumbs/p01.jpg',
  meta: '12 sheets',
  images: [
    { thumb: 'images/sets/my-project/thumbs/p01.jpg',
      full:  'images/sets/my-project/p01.jpg',
      cap:   'A-101 · Floor plan' }
  ]
}
```

Everything else — grid, filters, counts, project view, viewer — picks it up automatically.

## Publishing

Pushing to `main` publishes to GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).
