const projectsEl = document.getElementById('projects');
const filters = Array.from(document.querySelectorAll('.filter'));
const view = document.getElementById('project-view');
const pvTitle = document.getElementById('pv-title');
const pvMeta = document.getElementById('pv-meta');
const pvGrid = document.getElementById('pv-grid');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCap = document.getElementById('lb-cap');

let visible = PROJECTS.slice();
let seq = [];
let idx = 0;
let activeProject = null;

/* ---------- project cards ---------- */

function render() {
  projectsEl.innerHTML = '';

  if (visible.length === 0) {
    const li = document.createElement('li');
    li.className = 'projects-empty';
    li.textContent = 'Nothing here yet.';
    projectsEl.appendChild(li);
    return;
  }

  const frag = document.createDocumentFragment();
  visible.forEach(p => {
    const li = document.createElement('li');
    li.className = 'project';
    li.innerHTML = `
      <button type="button" class="project-card" data-id="${p.id}">
        <span class="project-cover">
          <img src="${p.cover}" alt="${p.title}" loading="lazy" width="520" height="380">
        </span>
        <span class="project-body">
          <span class="project-title">${p.title}</span>
          <span class="project-line">${p.line}</span>
          <span class="project-meta">${p.location ? p.location + ' · ' : ''}${p.meta}</span>
        </span>
      </button>`;
    frag.appendChild(li);
  });
  projectsEl.appendChild(frag);
}

filters.forEach(btn => {
  const key = btn.dataset.filter;
  const n = key === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.category === key).length;
  const badge = document.createElement('span');
  badge.className = 'count';
  badge.textContent = String(n);
  btn.appendChild(badge);

  btn.addEventListener('click', () => {
    visible = key === 'all' ? PROJECTS.slice() : PROJECTS.filter(p => p.category === key);
    filters.forEach(b => {
      const on = b.dataset.filter === key;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    render();
  });
});

projectsEl.addEventListener('click', e => {
  const btn = e.target.closest('.project-card');
  if (btn) openProject(btn.dataset.id);
});

/* ---------- project view ---------- */

function openProject(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  activeProject = p;

  pvTitle.textContent = p.title;
  pvMeta.textContent = [p.line, p.location, p.meta].filter(Boolean).join(' · ');
  pvGrid.innerHTML = '';

  p.images.forEach((img, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <button type="button" data-i="${i}" aria-label="Open ${img.cap}">
        <img src="${img.thumb}" alt="${img.cap}" loading="lazy" width="520" height="380">
        <span class="pv-cap">${img.cap}</span>
      </button>`;
    pvGrid.appendChild(li);
  });

  view.classList.add('is-open');
  view.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  view.querySelector('.pv-close').focus();
}

function closeProject() {
  view.classList.remove('is-open');
  view.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

view.querySelector('.pv-close').addEventListener('click', closeProject);

pvGrid.addEventListener('click', e => {
  const btn = e.target.closest('button[data-i]');
  if (!btn || !activeProject) return;
  openImage(activeProject.images, Number(btn.dataset.i));
});

/* ---------- image viewer ---------- */

function show(i) {
  const it = seq[i];
  lbImg.src = it.full;
  lbImg.alt = it.cap;
  lbCap.textContent = it.cap;
}

function openImage(list, i) {
  seq = list;
  idx = i;
  show(idx);
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  lightbox.querySelector('.lb-close').focus();
}

function closeImage() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  if (!view.classList.contains('is-open')) document.body.style.overflow = '';
}

function step(d) {
  if (!seq.length) return;
  idx = (idx + d + seq.length) % seq.length;
  show(idx);
}

lightbox.querySelector('.lb-close').addEventListener('click', closeImage);
lightbox.querySelector('.lb-prev').addEventListener('click', () => step(-1));
lightbox.querySelector('.lb-next').addEventListener('click', () => step(1));
lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target.tagName === 'FIGURE') closeImage();
});

document.addEventListener('keydown', e => {
  if (lightbox.classList.contains('is-open')) {
    if (e.key === 'Escape') closeImage();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  } else if (view.classList.contains('is-open') && e.key === 'Escape') {
    closeProject();
  }
});

document.getElementById('year').textContent = new Date().getFullYear();

render();
