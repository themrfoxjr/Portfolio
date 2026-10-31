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
    name: 'red-robin',
    title: 'Red Robin — Bloomington, Minnesota',
    blurb: 'Prototype restaurant, full bid set.',
    sheets: [
      { file: 'red-robin-p01', sheet: 'CS1.0', label: 'Cover sheet' },
      { file: 'red-robin-p02', sheet: 'A1.0', label: 'Architectural site plan' },
      { file: 'red-robin-p03', sheet: 'A1.1', label: 'Life safety plan' },
      { file: 'red-robin-p04', sheet: 'A2.0', label: 'Dimension plan' },
      { file: 'red-robin-p05', sheet: 'A2.1', label: 'Window, door, hardware and material schedules' },
      { file: 'red-robin-p06', sheet: 'A2.2', label: 'Floor finish and curb plan' },
      { file: 'red-robin-p07', sheet: 'A2.3', label: 'Roof plan' },
      { file: 'red-robin-p08', sheet: 'A2.4', label: 'Furnishing plan' },
      { file: 'red-robin-p09', sheet: 'A2.5', label: 'Reflected ceiling plan' },
      { file: 'red-robin-p10', sheet: 'A2.6', label: 'Decor plan and elevations' },
      { file: 'red-robin-p11', sheet: 'A2.7', label: 'Fabric plan' },
      { file: 'red-robin-p12', sheet: 'A3.0', label: 'Exterior elevations' },
      { file: 'red-robin-p13', sheet: 'A3.1', label: 'Exterior elevations' },
      { file: 'red-robin-p14', sheet: 'A4.0', label: 'Wall sections' },
      { file: 'red-robin-p15', sheet: 'A4.1', label: 'Wall sections and details' },
      { file: 'red-robin-p16', sheet: 'A4.3', label: 'Wall sections and details' },
      { file: 'red-robin-p17', sheet: 'A5.0', label: 'Dining room elevations' },
      { file: 'red-robin-p18', sheet: 'A5.1', label: 'Dining room elevations' },
      { file: 'red-robin-p19', sheet: 'A5.2', label: 'Kitchen elevations' },
      { file: 'red-robin-p20', sheet: 'A5.3', label: 'Restroom and office enlarged plans and elevations' },
      { file: 'red-robin-p21', sheet: 'A6.0', label: 'Interior sections' },
      { file: 'red-robin-p22', sheet: 'A6.1', label: 'Interior details' },
      { file: 'red-robin-p23', sheet: 'K1.0', label: 'Kitchen equipment plan' },
      { file: 'red-robin-p24', sheet: 'K1.1', label: 'Kitchen equipment schedules' },
      { file: 'red-robin-p25', sheet: 'K1.2', label: 'Kitchen equipment schedules' },
      { file: 'red-robin-p26', sheet: 'K2.0', label: 'Kitchen equipment rough-in floor plan' },
      { file: 'red-robin-p27', sheet: 'K3.0', label: 'Kitchen equipment rough-in elevations' },
      { file: 'red-robin-p28', sheet: 'K3.1', label: 'Kitchen equipment rough-in elevations' },
      { file: 'red-robin-p29', sheet: 'K3.2', label: 'Kitchen equipment rough-in elevations' },
      { file: 'red-robin-p30', sheet: 'S1.0', label: 'Foundation plan' },
      { file: 'red-robin-p31', sheet: 'S2.0', label: 'Roof framing plan' },
      { file: 'red-robin-p32', sheet: 'S3.0', label: 'Foundation details and sections' },
      { file: 'red-robin-p33', sheet: 'S4.0', label: 'Foundation details and sections' },
      { file: 'red-robin-p34', sheet: 'S5.0', label: 'Framing details and sections' },
      { file: 'red-robin-p35', sheet: 'S6.0', label: 'Framing details and sections' },
      { file: 'red-robin-p36', sheet: 'MP1.1', label: 'Mechanical and plumbing roof plan' },
      { file: 'red-robin-p37', sheet: 'H1.1', label: 'HVAC floor plan' },
      { file: 'red-robin-p38', sheet: 'H2.1', label: 'HVAC equipment schedules' },
      { file: 'red-robin-p39', sheet: 'H3.1', label: 'HVAC details' },
      { file: 'red-robin-p40', sheet: 'H4.1', label: 'Fire suppression and exhaust hood details' },
      { file: 'red-robin-p41', sheet: 'P1.1', label: 'Plumbing floor plan — waste and vent' },
      { file: 'red-robin-p42', sheet: 'P1.2', label: 'Plumbing floor plan — water and gas' },
      { file: 'red-robin-p43', sheet: 'P1.3', label: 'General plumbing notes' },
      { file: 'red-robin-p44', sheet: 'P2.1', label: 'Plumbing details' },
      { file: 'red-robin-p45', sheet: 'P3.1', label: 'Waste and vent riser diagram and plumbing details' },
      { file: 'red-robin-p46', sheet: 'P3.2', label: 'Water riser diagram and plumbing details' },
      { file: 'red-robin-p47', sheet: 'E1.1', label: 'Lighting floor plan and notes' },
      { file: 'red-robin-p48', sheet: 'E1.2', label: 'Power floor plan and notes' },
      { file: 'red-robin-p49', sheet: 'E1.3', label: 'Special systems floor plan and details' },
      { file: 'red-robin-p50', sheet: 'E1.4', label: 'Electrical roof plan' },
      { file: 'red-robin-p51', sheet: 'E2.1', label: 'Electrical symbols and notes' },
      { file: 'red-robin-p52', sheet: 'E2.2', label: 'Electrical details' },
      { file: 'red-robin-p53', sheet: 'E2.3', label: 'Electrical panel schedules and details' },
      { file: 'red-robin-p54', sheet: 'E2.4', label: 'Dimming panel diagram' },
      { file: 'red-robin-p55', sheet: 'E2.5', label: 'Panel board schedules' },
      { file: 'red-robin-p56', sheet: 'E3.1', label: 'Electrical specifications' },
      { file: 'red-robin-p57', sheet: 'MP', label: 'Mechanical and plumbing specifications' },
      { file: 'red-robin-p58', sheet: 'FP1.1', label: 'Fire protection plan' },
      { file: 'red-robin-p59', sheet: 'FP2.1', label: 'Fire protection details' },
      { file: 'red-robin-p60', sheet: 'FP3.1', label: 'Fire protection specifications' },
      { file: 'red-robin-p61', sheet: 'SP1.1', label: 'Specifications' },
      { file: 'red-robin-p62', sheet: 'SP2.1', label: 'Specifications' },
      { file: 'red-robin-p63', sheet: 'SP3.1', label: 'Specifications' },
      { file: 'red-robin-p64', sheet: 'SP4.1', label: 'Specifications' },
      { file: 'red-robin-p65', sheet: 'SP5.1', label: 'Specifications' },
      { file: 'red-robin-p66', sheet: 'SP6.1', label: 'Specifications' },
      { file: 'red-robin-p67', sheet: 'SP7.1', label: 'Specifications' },
      { file: 'red-robin-p68', sheet: 'SP8.1', label: 'Specifications' },
      { file: 'red-robin-p69', sheet: 'SP9.1', label: 'Specifications' },
      { file: 'red-robin-p70', sheet: 'SP10.1', label: 'Specifications' },
      { file: 'red-robin-p71', sheet: 'SP11.1', label: 'Specifications' },
    ],
  },
  {
    name: 'amigas',
    title: 'Amigas Restaurant — Glendale Heights',
    blurb: 'Restaurant renovation.',
    sheets: [
      { file: 'amigas-p01', sheet: 'G-001', label: 'Cover sheet' },
      { file: 'amigas-p02', sheet: 'G-002', label: 'Code compliance' },
      { file: 'amigas-p03', sheet: 'G-003', label: 'Egress plan' },
      { file: 'amigas-p04', sheet: 'A-001', label: 'Demolition plan' },
      { file: 'amigas-p05', sheet: 'A-101', label: 'Floor plan' },
      { file: 'amigas-p06', sheet: 'A-201', label: 'Exterior elevations' },
      { file: 'amigas-p07', sheet: 'A-401', label: 'Interior elevations' },
      { file: 'amigas-p08', sheet: 'AN101', label: 'Ceiling plan' },
      { file: 'amigas-p09', sheet: 'E-101', label: 'Electrical plan' },
      { file: 'amigas-p10', sheet: 'P-101', label: 'Plumbing plan' },
    ],
  },
  {
    name: 'assembly-hall',
    title: 'Assembly Hall — auditorium and video wall',
    blurb: 'Auditorium renovation, new video wall and mezzanine.',
    sheets: [
      { file: 'assembly-hall-p01', sheet: 'G-001', label: 'Cover sheet' },
      { file: 'assembly-hall-p02', sheet: 'A-101', label: 'Floor plan' },
      { file: 'assembly-hall-p03', sheet: 'A-102', label: 'Main auditorium floor plan' },
      { file: 'assembly-hall-p04', sheet: 'A-103', label: 'Video room floor plan and details' },
      { file: 'assembly-hall-p05', sheet: 'A-104', label: 'Video wall structural floor plan' },
      { file: 'assembly-hall-p06', sheet: 'A-105', label: 'Video wall side elevations' },
      { file: 'assembly-hall-p07', sheet: 'A-106', label: 'Video wall elevations and structure' },
      { file: 'assembly-hall-p08', sheet: 'A-107', label: 'Mezzanine floor plan' },
      { file: 'assembly-hall-p09', sheet: 'M-101', label: 'Video control room, new HVAC units' },
      { file: 'assembly-hall-p10', sheet: 'E-001', label: 'General notes' },
      { file: 'assembly-hall-p11', sheet: 'E-102', label: 'Cable diagram' },
      { file: 'assembly-hall-p12', sheet: 'E-601', label: 'Schedules, one line riser and details' },
      { file: 'assembly-hall-p13', sheet: 'EP101', label: 'Power and low voltage plan' },
      { file: 'assembly-hall-p14', sheet: 'EP102', label: 'Power and low voltage plan, mezzanine' },
    ],
  },
  {
    name: 'butterfield',
    title: 'Butterfield — Bellwood',
    blurb: 'Hall renovation with basement finish and new services.',
    sheets: [
      { file: 'butterfield-p01', sheet: 'G-001', label: 'Cover sheet' },
      { file: 'butterfield-p02', sheet: 'G-002', label: 'Code compliance' },
      { file: 'butterfield-p03', sheet: 'G-003', label: 'Basement egress plan' },
      { file: 'butterfield-p04', sheet: 'CD101', label: 'Site demolition plan' },
      { file: 'butterfield-p05', sheet: 'C-101', label: 'Site plan' },
      { file: 'butterfield-p06', sheet: 'CS101', label: 'Parking lot layout plan' },
      { file: 'butterfield-p07', sheet: 'CG101', label: 'Grading and utility plan' },
      { file: 'butterfield-p08', sheet: 'CP101', label: 'Site pavement and joint plan' },
      { file: 'butterfield-p09', sheet: 'C-501', label: 'Site details' },
      { file: 'butterfield-p10', sheet: 'S-001', label: 'General notes' },
      { file: 'butterfield-p11', sheet: 'S-501', label: 'Structural details' },
      { file: 'butterfield-p12', sheet: 'AD001', label: 'Basement demolition floor plan' },
      { file: 'butterfield-p13', sheet: 'A-101', label: 'Basement floor plan' },
      { file: 'butterfield-p14', sheet: 'A-102', label: 'First floor plan' },
      { file: 'butterfield-p15', sheet: 'A-103', label: 'Basement finish plan' },
      { file: 'butterfield-p16', sheet: 'A-201', label: 'Exterior elevations' },
      { file: 'butterfield-p17', sheet: 'A-202', label: 'Exterior elevations' },
      { file: 'butterfield-p18', sheet: 'A-301', label: 'Stair sections and details' },
      { file: 'butterfield-p19', sheet: 'A-302', label: 'Mechanical chase section' },
      { file: 'butterfield-p20', sheet: 'A-501', label: 'Exterior wall details' },
      { file: 'butterfield-p21', sheet: 'A-601', label: 'Door schedule and details' },
      { file: 'butterfield-p22', sheet: 'AN101', label: 'Basement reflected ceiling plan' },
      { file: 'butterfield-p23', sheet: 'AN102', label: 'First floor reflected ceiling plan' },
      { file: 'butterfield-p24', sheet: 'P-001', label: 'General notes, schedules and details' },
      { file: 'butterfield-p25', sheet: 'P-100', label: 'Site storm drainage plan' },
      { file: 'butterfield-p26', sheet: 'P-101', label: 'Water plan, main floor' },
      { file: 'butterfield-p27', sheet: 'PD102', label: 'Demolition water plan, basement' },
      { file: 'butterfield-p28', sheet: 'P-102', label: 'Water plan, basement' },
      { file: 'butterfield-p29', sheet: 'P-103', label: 'Basement gas pipe' },
      { file: 'butterfield-p30', sheet: 'M-001', label: 'General notes and schedules' },
      { file: 'butterfield-p31', sheet: 'M-100', label: 'Basement HVAC' },
      { file: 'butterfield-p32', sheet: 'M-101', label: 'Ductwork plan' },
      { file: 'butterfield-p33', sheet: 'M-501', label: 'Mechanical details' },
      { file: 'butterfield-p34', sheet: 'MD100', label: 'Basement HVAC demolition' },
      { file: 'butterfield-p35', sheet: 'MD101', label: 'First floor HVAC demolition' },
      { file: 'butterfield-p36', sheet: 'E-001', label: 'Electrical standards' },
      { file: 'butterfield-p37', sheet: 'ED101', label: 'Basement lighting demolition plan' },
      { file: 'butterfield-p38', sheet: 'ED102', label: 'Basement power and low voltage demolition plan' },
      { file: 'butterfield-p39', sheet: 'ED103', label: 'First floor lighting demolition plan' },
      { file: 'butterfield-p40', sheet: 'ED104', label: 'First floor power and low voltage demolition plan' },
      { file: 'butterfield-p41', sheet: 'EL100', label: 'Basement lighting plan' },
      { file: 'butterfield-p42', sheet: 'EL101', label: 'First floor lighting plan' },
      { file: 'butterfield-p43', sheet: 'EP100', label: 'Basement power and low voltage plan' },
      { file: 'butterfield-p44', sheet: 'EP101', label: 'First floor power and low voltage plan' },
      { file: 'butterfield-p45', sheet: 'ES-101', label: 'Site electrical plan' },
      { file: 'butterfield-p46', sheet: 'ES-102', label: 'Site lighting photometric plan and pole detail' },
      { file: 'butterfield-p47', sheet: 'E-601', label: 'Schedules, one line riser and details' },
    ],
  },
  {
    name: 'harlem',
    title: 'Harlem — 6570 N Harlem Ave, Chicago (set 1)',
    blurb: 'Kingdom Hall remodel, first issue.',
    sheets: [
      { file: 'harlem-p01', sheet: 'G-001', label: 'Cover sheet' },
      { file: 'harlem-p02', sheet: 'G-002', label: 'Code compliance' },
      { file: 'harlem-p03', sheet: 'G-003', label: 'Code compliance' },
      { file: 'harlem-p04', sheet: 'G-004', label: 'Egress plan' },
      { file: 'harlem-p05', sheet: 'G-005', label: 'Signage plan' },
      { file: 'harlem-p06', sheet: 'G-006', label: 'Submittals and inspections' },
      { file: 'harlem-p07', sheet: 'C001', label: 'Civil specifications and general notes' },
      { file: 'harlem-p08', sheet: 'CD101', label: 'Demolition plan' },
      { file: 'harlem-p09', sheet: 'CS102', label: 'Site plan' },
      { file: 'harlem-p10', sheet: 'CG103', label: 'Grading plan' },
      { file: 'harlem-p11', sheet: 'L-101', label: 'Landscape plan' },
      { file: 'harlem-p12', sheet: 'A-005', label: 'Roof demolition' },
      { file: 'harlem-p13', sheet: 'A-101', label: 'Demolition plan' },
      { file: 'harlem-p14', sheet: 'A-102', label: 'Floor plan' },
      { file: 'harlem-p15', sheet: 'A-103', label: 'Finish and seating floor plan' },
      { file: 'harlem-p16', sheet: 'A-104', label: 'Reflected ceiling plan' },
      { file: 'harlem-p17', sheet: 'A-104', label: 'Roof plan' },
      { file: 'harlem-p18', sheet: 'A-201', label: 'Exterior elevations' },
      { file: 'harlem-p19', sheet: 'A-202', label: 'Exterior elevations' },
      { file: 'harlem-p20', sheet: 'A-203', label: 'Interior elevations and wall finishes' },
      { file: 'harlem-p21', sheet: 'A-204', label: 'Interior elevations and wall finishes' },
      { file: 'harlem-p22', sheet: 'A-301', label: 'Building sections' },
      { file: 'harlem-p23', sheet: 'A-301', label: 'Building sections, expansive soils' },
      { file: 'harlem-p24', sheet: 'A-505', label: 'Typical non-structural LMF details' },
      { file: 'harlem-p25', sheet: 'A-601', label: 'Window and door schedules and details' },
      { file: 'harlem-p26', sheet: 'P-001', label: 'General notes, schedules and details' },
      { file: 'harlem-p27', sheet: 'P-101', label: 'Plumbing waste and vent' },
      { file: 'harlem-p28', sheet: 'P-102', label: 'Plumbing domestic water and gas plan, 3 RTUs' },
      { file: 'harlem-p29', sheet: 'M-001', label: 'General notes and schedules' },
      { file: 'harlem-p30', sheet: 'M-002', label: 'City of Chicago schedules' },
      { file: 'harlem-p31', sheet: 'M-101', label: 'HVAC demolition plan' },
      { file: 'harlem-p32', sheet: 'M-102', label: 'HVAC ductwork plan' },
      { file: 'harlem-p33', sheet: 'M-501', label: 'Details' },
      { file: 'harlem-p34', sheet: 'M-501', label: 'Details, continued' },
      { file: 'harlem-p35', sheet: 'E-001', label: 'General notes, 2015 IECC' },
      { file: 'harlem-p36', sheet: 'E-101', label: 'Lighting demolition plan' },
      { file: 'harlem-p37', sheet: 'E-102', label: 'Power and low voltage demolition plan' },
      { file: 'harlem-p38', sheet: 'E-103', label: 'Lighting plan, 2015 IECC' },
      { file: 'harlem-p39', sheet: 'E-104', label: 'Power and low voltage plan' },
      { file: 'harlem-p40', sheet: 'E-105', label: 'Roof plan' },
      { file: 'harlem-p41', sheet: 'E-601', label: 'Schedules, one line riser and details' },
      { file: 'harlem-p42', sheet: 'E-602', label: 'Audio wiring diagram' },
      { file: 'harlem-p43', sheet: 'E-603', label: 'Video and data wiring diagrams' },
      { file: 'harlem-p44', sheet: 'E-602', label: 'Audio wiring diagram, second issue' },
    ],
  },
  {
    name: 'harlem-2',
    title: 'Harlem — 6570 N Harlem Ave, Chicago (set 2)',
    blurb: 'Kingdom Hall remodel, second issue.',
    sheets: [
      { file: 'harlem-2-p45', sheet: 'G-001', label: 'Cover sheet' },
      { file: 'harlem-2-p46', sheet: 'G-002', label: 'Code compliance' },
      { file: 'harlem-2-p47', sheet: 'G-003', label: 'Code compliance' },
      { file: 'harlem-2-p48', sheet: 'G-004', label: 'Egress plan' },
      { file: 'harlem-2-p49', sheet: 'G-005', label: 'Signage plan' },
      { file: 'harlem-2-p50', sheet: 'VS101', label: 'Plat of survey' },
      { file: 'harlem-2-p51', sheet: 'C001', label: 'Civil specifications and general notes' },
      { file: 'harlem-2-p52', sheet: 'CD101', label: 'Demolition plan' },
      { file: 'harlem-2-p53', sheet: 'CS102', label: 'Site plan' },
      { file: 'harlem-2-p54', sheet: 'CG103', label: 'Grading plan' },
      { file: 'harlem-2-p55', sheet: 'HN101', label: 'House number certificate' },
      { file: 'harlem-2-p56', sheet: 'DE101', label: 'Driveway exhibit' },
      { file: 'harlem-2-p57', sheet: 'C-501', label: 'Construction details' },
      { file: 'harlem-2-p58', sheet: 'L-101', label: 'Landscape plan' },
      { file: 'harlem-2-p59', sheet: 'A-005', label: 'Roof demolition' },
      { file: 'harlem-2-p60', sheet: 'A-101', label: 'Demolition plan' },
      { file: 'harlem-2-p61', sheet: 'A-102', label: 'Floor plan' },
      { file: 'harlem-2-p62', sheet: 'A-103', label: 'Finish and seating floor plan' },
      { file: 'harlem-2-p63', sheet: 'A-104', label: 'Reflected ceiling plan' },
      { file: 'harlem-2-p64', sheet: 'A-105', label: 'Roof plan' },
      { file: 'harlem-2-p65', sheet: 'A-201', label: 'Exterior elevations' },
      { file: 'harlem-2-p66', sheet: 'A-202', label: 'Exterior elevations' },
      { file: 'harlem-2-p67', sheet: 'A-203', label: 'Interior elevations and wall finishes' },
      { file: 'harlem-2-p68', sheet: 'A-204', label: 'Interior elevations and wall finishes' },
      { file: 'harlem-2-p69', sheet: 'A-301', label: 'Building sections' },
      { file: 'harlem-2-p70', sheet: 'A-302', label: 'Exterior wall section' },
      { file: 'harlem-2-p71', sheet: 'A-502', label: 'Parapet and roof penetration details' },
      { file: 'harlem-2-p72', sheet: 'A-504', label: 'Roof ladder hatch and scupper details' },
      { file: 'harlem-2-p73', sheet: 'A-505', label: 'Typical non-structural LMF details' },
      { file: 'harlem-2-p74', sheet: 'A-601', label: 'Window and door schedules and details' },
      { file: 'harlem-2-p75', sheet: 'S-505', label: 'Door and window awning details' },
    ],
  },
  {
    name: 'zion',
    title: 'Zion — Kingdom Hall renovation',
    blurb: 'Renovation with new floor, ceiling and finish plans.',
    sheets: [
      { file: 'zion-p01', sheet: 'G-001', label: 'Cover sheet' },
      { file: 'zion-p02', sheet: 'G-003', label: 'Code compliance' },
      { file: 'zion-p03', sheet: 'G-004', label: 'Egress plan' },
      { file: 'zion-p04', sheet: 'C-001', label: 'Existing parking site' },
      { file: 'zion-p05', sheet: 'C-101', label: 'Roof drain plan' },
      { file: 'zion-p06', sheet: 'C-102', label: 'New site work plan' },
      { file: 'zion-p07', sheet: 'C-501', label: 'Site details' },
      { file: 'zion-p08', sheet: 'AD001', label: 'Demolition plan' },
      { file: 'zion-p09', sheet: 'A-101', label: 'Floor plan' },
      { file: 'zion-p10', sheet: 'AD101', label: 'Reflected ceiling demolition plan' },
      { file: 'zion-p11', sheet: 'AN101', label: 'Reflected ceiling plan' },
      { file: 'zion-p12', sheet: 'A-102', label: 'Finish and seating floor plan' },
      { file: 'zion-p13', sheet: 'A-103', label: 'Finish and seating legends and notes' },
      { file: 'zion-p14', sheet: 'A-601', label: 'Door schedules and details' },
      { file: 'zion-p15', sheet: 'P-001', label: 'General notes, schedules and details' },
      { file: 'zion-p16', sheet: 'P-101', label: 'Plumbing condensate, waste and vent plans' },
      { file: 'zion-p17', sheet: 'P-102', label: 'Plumbing domestic water plan' },
      { file: 'zion-p18', sheet: 'M-101', label: 'Ductwork plan, two HVAC units' },
      { file: 'zion-p19', sheet: 'ES102', label: 'Site lighting photometric plan' },
      { file: 'zion-p20', sheet: 'E-001', label: 'General notes' },
      { file: 'zion-p21', sheet: 'E-601', label: 'Schedules, one line riser and details' },
      { file: 'zion-p22', sheet: 'EL101', label: 'Lighting plan' },
      { file: 'zion-p23', sheet: 'EP101', label: 'Power and low voltage plan' },
      { file: 'zion-p24', sheet: 'ES101', label: 'Electrical site plan' },
    ],
  },
  {
    name: 'bsfca',
    title: 'Bible school, Central America — Heredia, Costa Rica',
    blurb: 'Bible school campus permit set.',
    sheets: [
      { file: 'bsfca-bound-p01', sheet: 'FS-100', label: 'Title sheet, general notes' },
      { file: 'bsfca-bound-p02', sheet: 'F-101', label: 'Site fire protection plan' },
      { file: 'bsfca-bound-p03', sheet: 'FS-102', label: 'Sump pump plan and section' },
      { file: 'bsfca-bound-p04', sheet: 'FS-103', label: 'Fire protection, fire pump room' },
      { file: 'bsfca-bound-p05', sheet: 'B02-FP104', label: 'Sprinklers' },
      { file: 'bsfca-bound-p06', sheet: 'B03-FP105', label: 'Sprinklers, level 1' },
      { file: 'bsfca-bound-p07', sheet: 'B03-FP106', label: 'Sprinklers, level 2' },
      { file: 'bsfca-bound-p08', sheet: 'B03-FP107', label: 'Cross section, riser and pipe supports' },
      { file: 'bsfca-bound-p09', sheet: 'B00-FP108', label: 'Fire protection seismic bracing' },
      { file: 'bsfca-a101-p01', sheet: 'B01-A-101', label: 'Architectural plan, level 1' },
      { file: 'bsfca-a101-p02', sheet: 'B02-A-101', label: 'Architectural plan, level 2' },
      { file: 'bsfca-a101-p03', sheet: 'B03-A-101', label: 'Architectural plan, level 3' },
      { file: 'bsfca-a101-p04', sheet: 'B03-A-102', label: 'Architectural plan, level 3 corridor' },
      { file: 'bsfca-a101-p05', sheet: 'B04-A-101', label: 'Architectural plan, level 4' },
      { file: 'bsfca-a101-p06', sheet: 'B05-A-101', label: 'Architectural plan, level 5' },
      { file: 'bsfca-ad101-p01', sheet: 'B01-AD101', label: 'Demolition plan, level 1' },
      { file: 'bsfca-ad101-p02', sheet: 'B02-AD101', label: 'Demolition plan, level 2' },
      { file: 'bsfca-ad101-p03', sheet: 'B03-AD101', label: 'Demolition plan, level 3' },
      { file: 'bsfca-ad101-p04', sheet: 'B03-AD102', label: 'Demolition plan, level 3 corridor' },
      { file: 'bsfca-ad101-p05', sheet: 'B04-AD101', label: 'Demolition plan, level 4' },
      { file: 'bsfca-ad101-p06', sheet: 'B05-AD101', label: 'Demolition plan, level 5' },
      { file: 'bsfca-ad101-p07', sheet: 'B05-AD102', label: 'Demolition plan, level 5 corridor' },
      { file: 'bsfca-m101-p01', sheet: 'B01-M-101', label: 'Mechanical plan, level 1' },
      { file: 'bsfca-m101-p02', sheet: 'B02-M-101', label: 'Mechanical plan, level 2' },
      { file: 'bsfca-m101-p03', sheet: 'B03-M-101', label: 'Mechanical plan, level 3' },
      { file: 'bsfca-m101-p04', sheet: 'B03-M-102', label: 'Mechanical plan, level 3 corridor' },
      { file: 'bsfca-m101-p05', sheet: 'B04-M-101', label: 'Mechanical plan, level 4' },
      { file: 'bsfca-m101-p06', sheet: 'B05-M-101', label: 'Mechanical plan, level 5' },
      { file: 'bsfca-ep101-p01', sheet: 'B00-EP101', label: 'Electrical site plan, A/C and pump house' },
      { file: 'bsfca-et101-p01', sheet: 'B00-ET101', label: 'Site plan, access control and WiFi' },
    ],
  },
  {
    name: 'keystone',
    title: '9456 Keystone Ln — Skokie',
    blurb: 'Second-storey addition and basement finish.',
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
    blurb: 'House interior remodel.',
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
    blurb: 'Interior remodel with a new egress window.',
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
    blurb: 'Floor plan and two garage options.',
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
    blurb: 'Floor plan.',
    sheets: [
      { file: 'davis-p01', sheet: 'A-101', label: 'Floor plan' },
    ],
  },
  {
    name: 'brookwood',
    title: '1711 Brookwood Dr — residential remodel',
    blurb: 'Demolition and proposed plans.',
    sheets: [
      { file: 'brookwood-p01', sheet: 'A-101', label: 'Demolition and proposed plans' },
    ],
  },
  {
    name: 'ashbury',
    title: '713 N Ashbury — exterior stair',
    blurb: 'Exterior stair guardrail detail.',
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
    block.id = 'set-' + set.name;

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
