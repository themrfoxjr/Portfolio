const PLANS = [
  // Add one entry per drawing. `id` is the file name without extension —
  // images/plans/<id>.jpg and images/thumbs/<id>.jpg must both exist.
  // cat: 'residential' | 'commercial'
  { id: 'com-costa-rica-dormitories', cat: 'commercial', title: 'Bible school — dormitory plan', sheet: 'A-122', alt: 'Architectural plan of dormitory rooms with furniture and finishes notes' },
  { id: 'com-costa-rica-lighting',    cat: 'commercial', title: 'Bible school — lighting plan', sheet: 'E-101', alt: 'Lighting plan with fixture symbols and legend' },
  { id: 'com-costa-rica-fire-alarm',  cat: 'commercial', title: 'Bible school — fire detection', sheet: 'EY101', alt: 'Fire detection system plan with device legends and wiring details' },
  { id: 'com-costa-rica-drainage',    cat: 'commercial', title: 'Bible school — site drainage', sheet: 'CJ103', alt: 'Site drainage plan with septic tank, grease trap and distribution details' },
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCap = document.getElementById('lb-cap');
const filters = Array.from(document.querySelectorAll('.filter'));
const indexLinks = Array.from(document.querySelectorAll('a.index-row'));

let visible = PLANS.slice();
let current = 0;

function render() {
  gallery.innerHTML = '';

  if (visible.length === 0) {
    const p = document.createElement('p');
    p.className = 'gallery-empty';
    p.textContent = 'No drawings in this set yet.';
    gallery.appendChild(p);
    return;
  }

  const frag = document.createDocumentFragment();

  visible.forEach((plan, i) => {
    const li = document.createElement('li');
    li.className = 'card';
    li.innerHTML = `
      <figure>
        <button type="button" data-i="${i}" aria-label="Open ${plan.title}">
          <img src="images/thumbs/${plan.id}.jpg" alt="${plan.alt}" loading="lazy" width="700" height="525">
        </button>
        <figcaption>
          <span class="card-title">${plan.title}</span>
          <span class="card-sheet">${plan.sheet}</span>
        </figcaption>
      </figure>`;
    frag.appendChild(li);
  });

  gallery.appendChild(frag);
}

function applyFilter(key) {
  visible = key === 'all' ? PLANS.slice() : PLANS.filter(p => p.cat === key);
  filters.forEach(btn => {
    const on = btn.dataset.filter === key;
    btn.classList.toggle('is-on', on);
    btn.setAttribute('aria-pressed', String(on));
  });
  render();
}

// Keep the counts on the filter buttons in step with the PLANS list.
filters.forEach(btn => {
  const key = btn.dataset.filter;
  const n = key === 'all' ? PLANS.length : PLANS.filter(p => p.cat === key).length;
  const badge = btn.querySelector('.count');
  if (badge) badge.textContent = String(n);
});

filters.forEach(btn => btn.addEventListener('click', () => applyFilter(btn.dataset.filter)));

indexLinks.forEach(link => link.addEventListener('click', () => {
  const f = link.dataset.filter;
  if (f) applyFilter(f);
}));

gallery.addEventListener('click', e => {
  const btn = e.target.closest('button[data-i]');
  if (!btn) return;
  openAt(Number(btn.dataset.i));
});

let seq = [], idx = 0;

function show(src, alt, caption) {
  lbImg.src = src;
  lbImg.alt = alt;
  lbCap.textContent = caption;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.lb-close').focus();
}

function openSeq(list, i) {
  seq = list;
  idx = i;
  const it = seq[idx];
  show(it.src, it.alt, it.cap);
}

// One entry per sheet in the Keystone set, in sheet order.
const KEYSTONE = [
  { p: 1,  sheet: 'G-001', label: 'Cover and scope of work' },
  { p: 2,  sheet: 'G-002', label: 'Site plan' },
  { p: 3,  sheet: 'D-1',   label: 'Demolition plan' },
  { p: 4,  sheet: 'A0',    label: 'Basement plan' },
  { p: 5,  sheet: 'A1',    label: 'Floor plans' },
  { p: 6,  sheet: 'A2',    label: 'Kitchen plan' },
  { p: 7,  sheet: 'A6-1',  label: 'Elevations — front' },
  { p: 8,  sheet: 'A6-2',  label: 'Elevations — north' },
  { p: 9,  sheet: 'A6-3',  label: 'Elevations — south' },
  { p: 10, sheet: 'A6-4',  label: 'Elevations — west' },
  { p: 11, sheet: 'A8',    label: 'Detail sections' },
  { p: 12, sheet: 'A9',    label: 'Building sections' },
  { p: 13, sheet: 'A10',   label: 'Wall sections' },
  { p: 14, sheet: 'A11',   label: 'Wall sections, enlarged' },
  { p: 16, sheet: 'A16',   label: 'Reflected ceiling plan' },
  { p: 17, sheet: 'E0',    label: 'Basement electrical plan' },
  { p: 18, sheet: 'E1',    label: 'Electrical plans' },
  { p: 19, sheet: 'P1',    label: 'Plumbing diagrams' },
  { p: 20, sheet: 'S1',    label: 'First floor framing plan' },
  { p: 21, sheet: 'S2',    label: 'Second floor framing plan' },
  { p: 22, sheet: 'M1',    label: 'HVAC plan' },
  { p: 23, sheet: 'SP1',   label: 'Sprinkler plan' },
  { p: 24, sheet: 'A12',   label: 'Gable and reveal details' },
  { p: 25, sheet: 'A13',   label: 'Overhang details' },
];

const sheetSrc = n => `images/sets/keystone/keystone-p${String(n).padStart(2, '0')}.jpg`;
const thumbSrc = n => `images/sets/keystone/thumbs/keystone-p${String(n).padStart(2, '0')}.jpg`;

const keystoneList = KEYSTONE.map(k => ({
  src: sheetSrc(k.p),
  alt: `Sheet ${k.sheet} — ${k.label}`,
  cap: `9456 Keystone Ln, Skokie — ${k.sheet} · ${k.label}`,
}));

const strip = document.getElementById('keystone-strip');
if (strip) {
  KEYSTONE.forEach((k, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <figure>
        <button type="button" data-sheet="${i}" aria-label="Open sheet ${k.sheet}, ${k.label}">
          <img src="${thumbSrc(k.p)}" alt="Sheet ${k.sheet} — ${k.label}" loading="lazy" width="520" height="347">
        </button>
        <figcaption class="tag"><strong>${k.sheet}</strong><span>${k.label}</span></figcaption>
      </figure>`;
    strip.appendChild(li);
  });

  strip.addEventListener('click', e => {
    const btn = e.target.closest('button[data-sheet]');
    if (btn) openSeq(keystoneList, Number(btn.dataset.sheet));
  });
}

function openAt(i) {
  openSeq(visible.map(p => ({
    src: `images/plans/${p.id}.jpg`,
    alt: p.alt,
    cap: `${p.title} — ${p.sheet}`,
  })), i);
}

// Photographs and study boards open at full size, with the rest of their story behind them.
document.querySelectorAll('.story-media img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const story = img.closest('.story');
    const imgs = Array.from(story.querySelectorAll('.story-media img'));
    openSeq(imgs.map(im => ({
      src: im.currentSrc || im.src,
      alt: im.alt,
      cap: im.closest('figure')?.querySelector('figcaption')?.textContent ?? '',
    })), imgs.indexOf(img));
  });
});

function closeLb() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function step(d) {
  if (!seq.length) return;
  idx = (idx + d + seq.length) % seq.length;
  const it = seq[idx];
  show(it.src, it.alt, it.cap);
}

lightbox.querySelector('.lb-close').addEventListener('click', closeLb);
lightbox.querySelector('.lb-prev').addEventListener('click', () => step(-1));
lightbox.querySelector('.lb-next').addEventListener('click', () => step(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox || e.target.tagName === 'FIGURE') closeLb(); });

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'ArrowLeft') step(-1);
});

document.getElementById('year').textContent = new Date().getFullYear();

render();
