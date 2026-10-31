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

// Drawing sets: one entry per project, in the order they appear on the page.
const SETS = [
  {
    name: 'keystone',
    title: '9456 Keystone Ln — Skokie',
    blurb: 'Second-storey addition and basement finish. The whole permit set in order: demolition and framing, floor and kitchen plans, all four elevations, sections, wall details, and the electrical, plumbing and mechanical sheets.',
    sheets: [
      { file: 'keystone-p01', sheet: 'G-001', label: 'Cover and scope of work' },
      { file: 'keystone-p02', sheet: 'G-002', label: 'Site plan' },
      { file: 'keystone-p03', sheet: 'D-1',   label: 'Demolition plan' },
      { file: 'keystone-p04', sheet: 'A0',    label: 'Basement plan' },
      { file: 'keystone-p05', sheet: 'A1',    label: 'Floor plans' },
      { file: 'keystone-p06', sheet: 'A2',    label: 'Kitchen plan' },
      { file: 'keystone-p07', sheet: 'A6-1',  label: 'Elevations — front' },
      { file: 'keystone-p08', sheet: 'A6-2',  label: 'Elevations — north' },
      { file: 'keystone-p09', sheet: 'A6-3',  label: 'Elevations — south' },
      { file: 'keystone-p10', sheet: 'A6-4',  label: 'Elevations — west' },
      { file: 'keystone-p11', sheet: 'A8',    label: 'Detail sections' },
      { file: 'keystone-p12', sheet: 'A9',    label: 'Building sections' },
      { file: 'keystone-p13', sheet: 'A10',   label: 'Wall sections' },
      { file: 'keystone-p14', sheet: 'A11',   label: 'Wall sections, enlarged' },
      { file: 'keystone-p16', sheet: 'A16',   label: 'Reflected ceiling plan' },
      { file: 'keystone-p17', sheet: 'E0',    label: 'Basement electrical plan' },
      { file: 'keystone-p18', sheet: 'E1',    label: 'Electrical plans' },
      { file: 'keystone-p19', sheet: 'P1',    label: 'Plumbing diagrams' },
      { file: 'keystone-p20', sheet: 'S1',    label: 'First floor framing plan' },
      { file: 'keystone-p21', sheet: 'S2',    label: 'Second floor framing plan' },
      { file: 'keystone-p22', sheet: 'M1',    label: 'HVAC plan' },
      { file: 'keystone-p23', sheet: 'SP1',   label: 'Sprinkler plan' },
      { file: 'keystone-p24', sheet: 'A12',   label: 'Gable and reveal details' },
      { file: 'keystone-p25', sheet: 'A13',   label: 'Overhang details' },
    ],
  },
  {
    name: 'waller',
    title: '851 N Waller — Chicago',
    blurb: 'Interior remodel of a two-storey house: a new basement stair, a new egress window, and a full electrical, plumbing and mechanical package alongside the architectural sheets.',
    sheets: [
      { file: 'waller-p01',  sheet: 'G-001',  label: 'Cover sheet' },
      { file: 'waller-p02',  sheet: 'AD101',  label: 'Demolition plan' },
      { file: 'waller-p03',  sheet: 'A-101',  label: 'Basement floor plan' },
      { file: 'waller-p04',  sheet: 'AN101',  label: 'Basement and first floor ceiling plan' },
      { file: 'waller-p05',  sheet: 'A-601',  label: 'Window and door schedules' },
      { file: 'waller-p06',  sheet: 'P-001',  label: 'General notes, schedules and details' },
      { file: 'waller-p07',  sheet: 'P-101',  label: 'Condensate, waste and vent plans' },
      { file: 'waller-p08',  sheet: 'P-102',  label: 'Domestic water and gas plan' },
      { file: 'waller-p09',  sheet: 'E-001',  label: 'General notes' },
      { file: 'waller-p10',  sheet: 'EL101',  label: 'Lighting and power plan' },
      { file: 'waller-p11',  sheet: 'M-001',  label: 'General notes and schedules' },
      { file: 'waller-p12',  sheet: 'M-101',  label: 'Ductwork plan' },
    ],
  },
  {
    name: 'lockwood',
    title: '422 N Lockwood — Chicago',
    blurb: 'Interior remodel with a new egress window and window well, drawn through to the mechanical, electrical and plumbing sheets.',
    sheets: [
      { file: 'lockwood-p01', sheet: 'G-001', label: 'Cover sheet' },
      { file: 'lockwood-p02', sheet: 'A-101', label: 'Basement floor plan' },
      { file: 'lockwood-p03', sheet: 'AN101', label: 'Basement and first floor ceiling plan' },
      { file: 'lockwood-p04', sheet: 'A-601', label: 'Window and door schedules' },
      { file: 'lockwood-p06', sheet: 'P-101', label: 'Condensate, waste and vent plans' },
      { file: 'lockwood-p07', sheet: 'P-102', label: 'Domestic water and gas plan' },
      { file: 'lockwood-p08', sheet: 'M-001', label: 'General notes and schedules' },
      { file: 'lockwood-p09', sheet: 'M-101', label: 'Ductwork plan' },
      { file: 'lockwood-p10', sheet: 'E-001', label: 'General notes' },
      { file: 'lockwood-p11', sheet: 'EL101', label: 'Lighting and power plan' },
    ],
  },
  {
    name: 'kenton',
    title: 'Kenton — floor and garage plans',
    blurb: 'Floor plan plus two options for a detached garage, with the structural sheet for the framing over.',
    sheets: [
      { file: 'kenton-04-a101-p01',        sheet: 'A-101',   label: 'Floor plan' },
      { file: 'kenton-01-structure-p01',   sheet: 'A-101 S', label: 'Structural floor plan' },
      { file: 'kenton-02-garage-ga101-p01', sheet: 'GA-101',  label: 'Garage floor plan' },
      { file: 'kenton-03-garage-ga102-p01', sheet: 'GA-102',  label: 'Garage plan, second option' },
    ],
  },
  {
    name: 'davis',
    title: 'Davis — floor plan',
    blurb: 'Floor plan sheet from a residential remodel.',
    sheets: [
      { file: 'davis-p01', sheet: 'A-101', label: 'Floor plan' },
    ],
  },
  {
    name: 'brookwood',
    title: '1711 Brookwood Dr — residential remodel',
    blurb: 'Demolition and proposed floor plans for the first and second levels.',
    sheets: [
      { file: 'brookwood-p01', sheet: 'A-101', label: 'Demolition and proposed plans' },
    ],
  },
  {
    name: 'ashbury',
    title: '713 N Ashbury — exterior stair',
    blurb: 'Guardrail and handrail detail for an exterior stair: treated posts, aluminium spindles and concrete anchors.',
    sheets: [
      { file: 'ashbury-p01', sheet: 'Detail', label: 'Guardrail and handrail' },
    ],
  },
];

const sheetUrl = (s, thumb) =>
  `images/sets/${s.set}/${thumb ? 'thumbs/' : ''}${s.file}.jpg`;

function renderSets() {
  const host = document.getElementById('sets');
  if (!host) return;

  SETS.forEach(set => {
    const list = set.sheets.map(sh => ({
      src: sheetUrl({ set: set.name, file: sh.file }),
      alt: `Sheet ${sh.sheet} — ${sh.label}`,
      cap: `${set.title.split(' — ')[0]} — ${sh.sheet} · ${sh.label}`,
    }));

    const block = document.createElement('div');
    block.className = 'set';

    const head = document.createElement('div');
    head.className = 'set-head';
    head.innerHTML = `
      <div>
        <h3>${set.title}</h3>
        <p>${set.blurb}</p>
      </div>
      <p class="set-count">${set.sheets.length} ${set.sheets.length === 1 ? 'sheet' : 'sheets'}</p>`;

    const strip = document.createElement('ol');
    strip.className = 'set-strip';
    strip.setAttribute('aria-label', `${set.title} sheet set`);

    set.sheets.forEach((sh, i) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <figure>
          <button type="button" data-i="${i}" aria-label="Open sheet ${sh.sheet}, ${sh.label}">
            <img src="${sheetUrl({ set: set.name, file: sh.file }, true)}" alt="Sheet ${sh.sheet} — ${sh.label}" loading="lazy" width="520" height="347">
          </button>
          <figcaption class="tag"><strong>${sh.sheet}</strong><span>${sh.label}</span></figcaption>
        </figure>`;
      strip.appendChild(li);
    });

    strip.addEventListener('click', e => {
      const btn = e.target.closest('button[data-i]');
      if (btn) openSeq(list, Number(btn.dataset.i));
    });

    block.appendChild(head);
    block.appendChild(strip);
    host.appendChild(block);
  });
}

renderSets();

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
