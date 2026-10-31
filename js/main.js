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

let inGallery = true;

function show(src, alt, caption) {
  lbImg.src = src;
  lbImg.alt = alt;
  lbCap.textContent = caption;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.lb-close').focus();
}

function openAt(i) {
  current = i;
  inGallery = true;
  const p = visible[current];
  show(`images/plans/${p.id}.jpg`, p.alt, `${p.title} — ${p.sheet}`);
}

// Photographs and study boards open at full size too.
document.querySelectorAll('.story-media img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    inGallery = false;
    const cap = img.closest('figure')?.querySelector('figcaption')?.textContent ?? '';
    show(img.currentSrc || img.src, img.alt, cap);
  });
});

function closeLb() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function step(d) {
  if (!inGallery) return;
  current = (current + d + visible.length) % visible.length;
  openAt(current);
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
