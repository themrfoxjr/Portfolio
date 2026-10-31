const PLANS = [
  // residential
  { id: 'res-5606-family-room', cat: 'residential', title: 'Family room addition', sheet: 'A-101', alt: 'Floor plan, site plan and foundation plan for a family room and sun room addition' },
  { id: 'res-5606-garage',      cat: 'residential', title: 'Detached garage', sheet: 'GA-101', alt: 'Garage floor plan, elevations and concrete notes' },
  { id: 'res-waller-lower',     cat: 'residential', title: 'Interior remodel — lower level', sheet: 'A-101', alt: 'Demolition, main floor and second floor plans for a two-storey interior remodel' },
  { id: 'res-waller-upper',     cat: 'residential', title: 'Interior remodel — upper levels', sheet: 'A-102', alt: 'Existing and proposed plans for the upper floors of a house remodel' },
  { id: 'res-lockwood-remodel', cat: 'residential', title: 'Interior remodel and egress window', sheet: 'A-101', alt: 'Floor plans with a new egress window and reconstructed framing' },
  { id: 'res-keystone-iso',     cat: 'residential', title: 'Two-storey residence — isometric', sheet: 'A-102', alt: 'Isometric view of a two-storey house with scope of work and room schedule' },
  { id: 'res-keystone-elev',    cat: 'residential', title: 'Two-storey residence — elevations', sheet: 'A-201', alt: 'Front and rear elevations with material legend' },
  { id: 'res-lee-kitchen',      cat: 'residential', title: 'Kitchen reconfiguration', sheet: 'A-1.0', alt: 'Demolition and proposed kitchen layouts' },
  { id: 'res-lyons-kitchen',    cat: 'residential', title: 'Kitchen casework layout', sheet: 'A-2', alt: 'Kitchen cabinet elevation with dimensions' },
  { id: 'res-ashbury-rail',     cat: 'residential', title: 'Guardrail and stair detail', sheet: 'A-301', alt: 'Stair and guardrail assembly drawing with railing options' },
  { id: 'res-birchwood-kitchen',cat: 'residential', title: 'Kitchen demolition plan', sheet: 'A-102', alt: 'Kitchen demolition plan with cabinet removal notes' },

  // commercial
  { id: 'com-pilsen-hall',      cat: 'commercial', title: 'Assembly hall renovation — Pilsen', sheet: 'A-101', alt: 'Renovated floor plan of an assembly hall' },
  { id: 'com-pilsen-existing',  cat: 'commercial', title: 'Existing conditions — level 1', sheet: 'A-102', alt: 'Existing conditions plan of an assembly hall with finish schedule' },
  { id: 'com-bellwood-hall',    cat: 'commercial', title: 'Assembly hall renovation — Bellwood', sheet: 'A-102', alt: 'First floor plan of an assembly hall renovation' },
  { id: 'com-zion-hall',        cat: 'commercial', title: 'Assembly hall renovation — Zion', sheet: 'A-101', alt: 'Floor plan and wall type legend for an assembly hall' },
  { id: 'com-antioch-hall',     cat: 'commercial', title: 'Assembly hall renovation — Antioch', sheet: 'A-101', alt: 'Floor plan of an assembly hall with general and lighting notes' },
  { id: 'com-addison-hall',     cat: 'commercial', title: 'Assembly hall remodel — Addison', sheet: 'A-101', alt: 'Floor plan with wall dimensions and insulation plan' },
  { id: 'com-channahon-hall',   cat: 'commercial', title: 'Assembly hall — new floor plan', sheet: 'A-101', alt: 'New floor plan for a single-storey assembly hall' },
  { id: 'com-auditorium-plan',  cat: 'commercial', title: 'Auditorium renovation', sheet: 'A-102', alt: 'Auditorium floor plan with wall type legend' },
  { id: 'com-assembly-hall',    cat: 'commercial', title: 'Regional assembly hall — egress and wayfinding', sheet: 'A-001', alt: 'Colour-coded seating, egress and wayfinding plan' },
  { id: 'com-harlem-hall',      cat: 'commercial', title: 'Assembly hall — auditorium plan', sheet: 'A-101', alt: 'Auditorium, platform, foyer and classroom plan' },
  { id: 'com-tenant-buildout',  cat: 'commercial', title: 'Warehouse tenant build-out', sheet: 'A-1.0', alt: 'Ground floor dimension plan for a warehouse tenant build-out' },
  { id: 'com-michigan-ave',     cat: 'commercial', title: 'Assembly hall — existing and proposed', sheet: 'A-001', alt: 'Existing and proposed main floor plans side by side' },
  { id: 'com-roosevelt-concept',cat: 'commercial', title: 'Mixed-use concept — 0.41 acre site', sheet: 'SK-1', alt: 'Site concept with zoning analysis and building footprint' },
  { id: 'com-amigas-elev',      cat: 'commercial', title: 'Restaurant renovation — front elevation', sheet: 'A-201', alt: 'Proposed front elevation of a restaurant' },
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
