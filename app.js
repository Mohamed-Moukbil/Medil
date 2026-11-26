/* ==========================================================================
   MEDIL — Application front-end
   Un site de ressources CPGE, sans build step.
   ========================================================================== */

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.4-3.4"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  arrowRight: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M20 12H5M11 18l-6-6 6-6"/>',
  chevronDown: '<path d="m7 10 5 5 5-5"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22V5.5Z"/>',
  atom: '<circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)"/>',
  code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v5M8 21h8M9 18h6"/>',
  forum: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/><path d="M8 9h8M8 13h5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.7 2.7L16 9"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
  bookmark: '<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"/>',
  star: '<path d="m12 3 2.7 5.4 6 .9-4.3 4.2 1 6-5.4-2.9-5.4 2.9 1-6L3.3 9.3l6-.9L12 3Z"/>',
  flame: '<path d="M12 22c4 0 7-2.7 7-6.5 0-2.8-1.4-4.7-3.3-6.5-.4 1.8-1.6 2.7-2.7 3.1.2-3.6-1.1-6.8-4-8.1.2 2.6-1.1 4.4-2.5 6.1C5.2 11.8 5 13.5 5 15.5 5 19.3 8 22 12 22Z"/><path d="M9.5 16.5c0-1.5 1-2.5 2.5-3.5 0 1.4 1 2 1.8 2.8.3.3.5.8.5 1.3a2.8 2.8 0 0 1-5.6 0c0-.2 0-.4.1-.6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  play: '<path d="m9 7 8 5-8 5V7Z"/>',
  file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  heart: '<path d="M20.8 5.6a5.4 5.4 0 0 0-7.7 0L12 6.8l-1.2-1.2a5.4 5.4 0 0 0-7.7 7.7L12 22l8.8-8.7a5.4 5.4 0 0 0 0-7.7Z"/>',
  sparkles: '<path d="m12 3 1.2 4.2L17 9l-3.8 1.8L12 15l-1.2-4.2L7 9l3.8-1.8L12 3ZM19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14ZM5 14l.7 2.3L8 17l-2.3.7L5 20l-.7-2.3L2 17l2.3-.7L5 14Z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
  print: '<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="7"/>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
  lightbulb: '<path d="M9 18h6M10 22h4M8.2 14.3a6 6 0 1 1 7.6 0c-.7.7-1 1.4-1 2.2H9.2c0-.8-.3-1.5-1-2.2Z"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>',
  youtube: '<path d="M21 12s0-4-1-5-8-1-8-1-7 0-8 1-1 5-1 5 0 4 1 5 8 1 8 1 7 0 8-1 1-5 1-5Z"/><path d="m10 9 5 3-5 3V9Z"/>',
  discord: '<path d="M8 17s-1 1.5-1.5 3C4.7 19.3 3.6 18.2 3 16.7 2.2 14.8 2 12.2 2.6 9.8 3.4 6.5 6 4.6 8 4l.8 1.6a16 16 0 0 1 6.4 0L16 4c2 .6 4.6 2.5 5.4 5.8.6 2.4.4 5-.4 6.9-.6 1.5-1.7 2.6-3.5 3.3L16 17"/><circle cx="9" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.2" fill="currentColor" stroke="none"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  home: '<path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-9Z"/>',
  quote: '<path d="M10 11H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v7a4 4 0 0 1-4 4M20 11h-4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v7a4 4 0 0 1-4 4"/>'
};

function icon(name, className = '') {
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

const escapeHTML = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const escapeAttr = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

function tex(expression, display = false, className = '') {
  return `<span class="tex ${display ? 'tex-display' : ''} ${className}" data-tex="${escapeAttr(expression)}" data-display="${display}"></span>`;
}

function renderMath(root = document) {
  if (!window.katex) return;
  $$('[data-tex]', root).forEach(el => {
    if (el.dataset.rendered === 'true') return;
    try {
      window.katex.render(el.dataset.tex, el, {
        displayMode: el.dataset.display === 'true',
        throwOnError: false,
        strict: 'ignore',
        trust: false,
        output: 'html'
      });
      el.dataset.rendered = 'true';
    } catch (error) {
      el.textContent = el.dataset.tex;
    }
  });
}

function initLazyMedia(root = document) {
  const lazyImages = $$('img[data-src]', root);
  const lazyFrames = $$('iframe[data-lazy-pdf]', root);
  if (!lazyImages.length && !lazyFrames.length) return;
  if (!('IntersectionObserver' in window)) {
    lazyImages.forEach(img => { img.src = img.dataset.src; img.removeAttribute('data-src'); img.classList.add('is-loaded'); });
    lazyFrames.forEach(frame => { frame.src = frame.dataset.lazyPdf; frame.removeAttribute('data-lazy-pdf'); frame.classList.add('is-loaded'); });
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.tagName === 'IMG') {
        el.src = el.dataset.src;
        el.removeAttribute('data-src');
        el.addEventListener('load', () => el.classList.add('is-loaded'), { once: true });
      } else {
        el.src = el.dataset.lazyPdf;
        el.removeAttribute('data-lazy-pdf');
        el.classList.add('is-loaded');
      }
      observer.unobserve(el);
    });
  }, { rootMargin: '200px' });
  lazyImages.forEach(img => observer.observe(img));
  lazyFrames.forEach(frame => observer.observe(frame));
}

function starRow(count, max = 5, label = true) {
  return `<span class="star-row" aria-label="${count} étoiles sur ${max}">${Array.from({ length: max }, (_, i) => `<span class="star ${i < count ? 'is-on' : ''}">${icon('star')}</span>`).join('')}${label ? `<span class="star-label">${count}/${max}</span>` : ''}</span>`;
}

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase();
}

function paragraphs(text) {
  return escapeHTML(text).split(/\n\n+/).map(part => `<p>${part.replace(/\n/g, '<br>')}</p>`).join('');
}


/* --------------------------------------------------------------------------
   Persistance locale
   -------------------------------------------------------------------------- */
const STORAGE = {
  courses: 'medil.saved.courses',
  exercises: 'medil.saved.exercises',
  threads: 'medil.threads',
  likedThreads: 'medil.liked.threads',
  likedReplies: 'medil.liked.replies',
  user: 'medil.user',
  completed: 'medil.completed'
};

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    /* Mode navigation privée : on continue sans persistance. */
  }
}

let savedCourses = new Set(readJSON(STORAGE.courses, []));
let savedExercises = new Set(readJSON(STORAGE.exercises, []));
let likedThreads = new Set(readJSON(STORAGE.likedThreads, []));
let likedReplies = new Set(readJSON(STORAGE.likedReplies, []));
let completedItems = new Set(readJSON(STORAGE.completed, []));
let currentUser = readJSON(STORAGE.user, null);
let forumThreads = readJSON(STORAGE.threads, null) || JSON.parse(JSON.stringify(SEED_THREADS));

/* --------------------------------------------------------------------------
   Chargement différé du contenu détaillé
   Le manifeste (content/index.js) ne contient que les métadonnées. Les
   détails (sections, énoncés, corrections, messages) sont chargés à la
   demande depuis content/<type>/<id>.json, puis mis en cache.
   -------------------------------------------------------------------------- */
const CONTENT_BASE = 'content';
const detailCache = {
  courses: new Map(),
  exercises: new Map(),
  threads: new Map()
};

function invalidateDetailCache() {
  detailCache.courses.clear();
  detailCache.exercises.clear();
  detailCache.threads.clear();
}
window.invalidateDetailCache = invalidateDetailCache;

async function fetchJSONFile(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`HTTP ${response.status} pour ${path}`);
  return response.json();
}

function mergeInto(collection, detail, idField = 'id') {
  const index = collection.findIndex(item => item[idField] === detail[idField]);
  if (index >= 0) {
    collection[index] = { ...collection[index], ...detail };
    return collection[index];
  }
  collection.push(detail);
  return detail;
}

async function loadCourseDetail(id) {
  if (detailCache.courses.has(id)) return detailCache.courses.get(id);
  const existing = COURSES.find(item => item.id === id);
  if (existing && existing.sections) {
    detailCache.courses.set(id, existing);
    return existing;
  }
  try {
    const detail = await fetchJSONFile(`${CONTENT_BASE}/courses/${encodeURIComponent(id)}.json`);
    const merged = mergeInto(COURSES, detail);
    detailCache.courses.set(id, merged);
    return merged;
  } catch (error) {
    if (existing) detailCache.courses.set(id, existing);
    return existing || null;
  }
}

async function loadExerciseDetail(id) {
  if (detailCache.exercises.has(id)) return detailCache.exercises.get(id);
  const existing = EXERCISES.find(item => item.id === id);
  if (existing && existing.statement) {
    detailCache.exercises.set(id, existing);
    return existing;
  }
  try {
    const detail = await fetchJSONFile(`${CONTENT_BASE}/exercises/${encodeURIComponent(id)}.json`);
    const merged = mergeInto(EXERCISES, detail);
    detailCache.exercises.set(id, merged);
    return merged;
  } catch (error) {
    if (existing) detailCache.exercises.set(id, existing);
    return existing || null;
  }
}

async function loadThreadDetail(id) {
  if (detailCache.threads.has(id)) return detailCache.threads.get(id);
  const existing = forumThreads.find(item => item.id === id);
  if (existing && existing.content) {
    detailCache.threads.set(id, existing);
    return existing;
  }
  try {
    const detail = await fetchJSONFile(`${CONTENT_BASE}/threads/${encodeURIComponent(id)}.json`);
    const merged = mergeInto(forumThreads, detail);
    detailCache.threads.set(id, merged);
    return merged;
  } catch (error) {
    if (existing) detailCache.threads.set(id, existing);
    return existing || null;
  }
}


// Précharge silencieusement les détails d’un cours/exercice lorsqu’il est survolé.
function scheduleDetailPrefetch(type, id) {
  if (!id) return;
  if (type === 'course') loadCourseDetail(id).catch(() => {});
  else if (type === 'exercise') loadExerciseDetail(id).catch(() => {});
  else if (type === 'thread') loadThreadDetail(id).catch(() => {});
}

const courseFilterState = { subject: 'Tous', level: 'Tous' };
const exerciseFilterState = { subject: 'Tous', stars: 'Tous' };
const paperFilterState = { school: 'Tous', subject: 'Tous', year: 'Tous', query: '' };
const forumFilterState = { category: 'Tous', query: '' };

const PAGE_SIZE = 6;
const paginationState = {
  courses: { page: 1, size: PAGE_SIZE },
  exercises: { page: 1, size: PAGE_SIZE },
  papers: { page: 1, size: PAGE_SIZE }
};

/* --------------------------------------------------------------------------
   Toast & modal
   -------------------------------------------------------------------------- */
function toast(message, options = {}) {
  const stack = $('#toast-stack');
  if (!stack) return;
  const el = document.createElement('div');
  el.className = `toast ${options.type === 'success' ? 'toast--success' : ''}`;
  el.innerHTML = `${icon(options.type === 'success' ? 'checkCircle' : 'sparkles')}<span>${escapeHTML(message)}</span>`;
  stack.appendChild(el);
  requestAnimationFrame(() => el.classList.add('is-visible'));
  setTimeout(() => {
    el.classList.remove('is-visible');
    setTimeout(() => el.remove(), 260);
  }, options.duration || 3200);
}

let previousFocus = null;

function openModal(content, options = {}) {
  const root = $('#modal-root');
  previousFocus = document.activeElement;
  root.innerHTML = `
    <div class="modal-backdrop" data-modal-backdrop>
      <div class="modal ${options.size === 'wide' ? 'modal--wide' : ''} ${options.className || ''}" role="dialog" aria-modal="true" aria-label="${escapeAttr(options.label || 'Fenêtre')}">
        <button class="modal-close" data-close-modal aria-label="Fermer">${icon('close')}</button>
        ${content}
      </div>
    </div>`;
  document.body.classList.add('no-scroll');
  requestAnimationFrame(() => $('.modal-backdrop', root)?.classList.add('is-open'));
  const focusable = root.querySelector('input, textarea, select, button:not(.modal-close)');
  if (focusable) setTimeout(() => focusable.focus({ preventScroll: true }), 80);
  renderMath(root);
}

function closeModal() {
  const root = $('#modal-root');
  if (!root || !root.innerHTML) return;
  const backdrop = $('.modal-backdrop', root);
  backdrop?.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  setTimeout(() => {
    root.innerHTML = '';
    if (previousFocus && document.contains(previousFocus)) previousFocus.focus({ preventScroll: true });
  }, 180);
}

/* --------------------------------------------------------------------------
   Header & route utilities
   -------------------------------------------------------------------------- */
function currentRoute() {
  const raw = (location.hash || '#/').replace(/^#/, '');
  const [pathPart, queryPart = ''] = raw.split('?');
  const segments = pathPart.split('/').filter(Boolean);
  return {
    page: segments[0] || 'home',
    id: segments[1] || null,
    query: new URLSearchParams(queryPart)
  };
}

function setActiveNav(page) {
  $$('[data-nav]').forEach(link => {
    const target = link.dataset.nav;
    const active = target === page || (page === 'home' && target === 'home') || (page === 'cours' && target === 'cours' && link.closest('.main-nav'));
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function updateHeaderUser() {
  const desktop = $('#header-auth');
  const mobile = $('#mobile-auth');
  if (currentUser) {
    const firstName = escapeHTML(currentUser.name.split(' ')[0]);
    const avatar = `<span class="user-avatar">${escapeHTML(initials(currentUser.name))}</span>`;
    const markup = `<button class="profile-chip" data-open-profile>${avatar}<span>${firstName}</span>${icon('chevronDown')}</button>`;
    if (desktop) desktop.innerHTML = markup;
    if (mobile) mobile.innerHTML = markup;
  } else {
    const markup = `<button class="header-login" data-open-auth="login">Connexion</button><button class="btn btn--lime btn--sm" data-open-auth="signup">Rejoindre<span class="btn-orb">${icon('arrowUpRight')}</span></button>`;
    if (desktop) desktop.innerHTML = markup;
    if (mobile) mobile.innerHTML = `<button class="header-login" data-open-auth="login">Connexion</button><button class="btn btn--lime btn--sm" data-open-auth="signup">Rejoindre MEDIL</button>`;
  }
}

function updateYear() {
  $$('[data-current-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
}

function pageHero({ eyebrow, title, description, meta = '', className = '', children = '' }) {
  return `
    <section class="page-hero ${className}">
      <div class="page-hero-glow" aria-hidden="true"></div>
      <div class="container">
        <div class="page-hero-inner reveal">
          <p class="eyebrow eyebrow--light"><span class="eyebrow-dot"></span>${eyebrow}</p>
          <h1>${title}</h1>
          ${description ? `<p class="page-hero-description">${description}</p>` : ''}
          ${meta ? `<div class="page-hero-meta">${meta}</div>` : ''}
          ${children}
        </div>
      </div>
    </section>`;
}

/* --------------------------------------------------------------------------
   Composants partagés
   -------------------------------------------------------------------------- */
function coverArt(type) {
  const art = {
    matrix: `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
      <circle cx="234" cy="74" r="72" stroke="currentColor" stroke-opacity=".2"/>
      <circle cx="234" cy="74" r="45" stroke="currentColor" stroke-opacity=".16"/>
      <path d="M60 157 164 51M101 167 205 61M40 119 144 13" stroke="currentColor" stroke-opacity=".13"/>
      <path d="M199 37v74M262 37v74M189 47h83M189 101h83" stroke="currentColor" stroke-opacity=".34"/>
      <path d="M214 62h33M214 80h20M238 98h9" stroke="currentColor" stroke-opacity=".5" stroke-width="2"/>
    </svg>`,
    graph: `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
      <path d="M32 154h260M54 178V28" stroke="currentColor" stroke-opacity=".22"/>
      <path d="M54 127c35-8 45-76 101-74 80 2 83 97 157 66" stroke="currentColor" stroke-opacity=".68" stroke-width="2"/>
      <path d="M54 145c44-56 79-105 156-98 30 3 58 25 76 58" stroke="currentColor" stroke-opacity=".2" stroke-dasharray="5 7"/>
      <circle cx="155" cy="53" r="4" fill="currentColor"/>
      <circle cx="245" cy="110" r="4" fill="currentColor"/>
      <path d="M54 127h201" stroke="currentColor" stroke-opacity=".22" stroke-dasharray="3 7"/>
    </svg>`,
    dots: `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
      <g fill="currentColor" opacity=".27">
        ${Array.from({ length: 7 }, (_, row) => Array.from({ length: 11 }, (_, col) => `<circle cx="${35 + col * 25}" cy="${28 + row * 24}" r="1.8"/>`).join('')).join('')}
      </g>
      <path d="M41 159c47 0 54-105 121-105s72 70 118 70" stroke="currentColor" stroke-opacity=".6" stroke-width="2"/>
      <path d="M66 159c35 0 42-76 96-76s62 52 118 52" stroke="currentColor" stroke-opacity=".16" stroke-dasharray="4 7"/>
      <circle cx="162" cy="54" r="5" fill="currentColor"/>
    </svg>`,
    field: `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
      <circle cx="160" cy="94" r="20" fill="currentColor" opacity=".88"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M160 94 ${i * 30 + 10} 190" stroke="currentColor" stroke-opacity="${0.12 + (i % 3) * 0.08}"/>`).join('')}
      <circle cx="160" cy="94" r="47" stroke="currentColor" stroke-opacity=".25"/>
      <circle cx="160" cy="94" r="74" stroke="currentColor" stroke-opacity=".18"/>
      <circle cx="160" cy="94" r="103" stroke="currentColor" stroke-opacity=".11"/>
    </svg>`,
    wave: `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
      <path d="M18 103c17-54 34-54 51 0s34 54 51 0 34-54 51 0 34 54 51 0 34-54 51 0 34 54 51 0" stroke="currentColor" stroke-opacity=".63" stroke-width="2"/>
      <path d="M18 132c17-33 34-33 51 0s34 33 51 0 34-33 51 0 34 33 51 0 34-33 51 0 34 33 51 0" stroke="currentColor" stroke-opacity=".22"/>
      <path d="M18 74c17-24 34-24 51 0s34 24 51 0 34-24 51 0 34 24 51 0 34-24 51 0 34 24 51 0" stroke="currentColor" stroke-opacity=".16"/>
      <circle cx="161" cy="103" r="4" fill="currentColor"/>
    </svg>`,
    thermo: `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
      <rect x="82" y="39" width="105" height="110" rx="10" stroke="currentColor" stroke-opacity=".47"/>
      <path d="M187 65h42v70h-42M229 65l39 35-39 35" stroke="currentColor" stroke-opacity=".55" stroke-width="2"/>
      <path d="M105 151V74h65v77M105 97h65M105 122h65" stroke="currentColor" stroke-opacity=".17"/>
      <circle cx="260" cy="47" r="4" fill="currentColor" opacity=".7"/>
      <path d="M250 30c20 0 20-18 38-18M250 26c15 0 15-14 29-14" stroke="currentColor" stroke-opacity=".2"/>
    </svg>`,
    code: `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
      <path d="M88 41h55l37 37v80H88V41ZM143 41v38h37" stroke="currentColor" stroke-opacity=".43"/>
      <path d="M109 108h65M109 123h52M109 138h34" stroke="currentColor" stroke-opacity=".3" stroke-width="2"/>
      <path d="m221 70-28 30 28 30M263 70l28 30-28 30" stroke="currentColor" stroke-opacity=".33" stroke-width="2"/>
    </svg>`,
    terminal: `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
      <rect x="55" y="42" width="210" height="120" rx="10" stroke="currentColor" stroke-opacity=".4"/>
      <path d="M55 66h210" stroke="currentColor" stroke-opacity=".24"/>
      <circle cx="72" cy="54" r="2.5" fill="currentColor" opacity=".6"/><circle cx="82" cy="54" r="2.5" fill="currentColor" opacity=".35"/><circle cx="92" cy="54" r="2.5" fill="currentColor" opacity=".2"/>
      <path d="m76 92 12 11-12 11M101 116h47" stroke="currentColor" stroke-opacity=".58" stroke-width="2"/>
      <path d="M76 138h140M76 147h74" stroke="currentColor" stroke-opacity=".15"/>
    </svg>`,
    norm: `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
      <circle cx="172" cy="93" r="68" stroke="currentColor" stroke-opacity=".33"/>
      <circle cx="172" cy="93" r="42" stroke="currentColor" stroke-opacity=".18"/>
      <path d="M172 93 264 45M172 93 107 159" stroke="currentColor" stroke-opacity=".62" stroke-width="2"/>
      <path d="M172 93h68v52H172" stroke="currentColor" stroke-opacity=".16" stroke-dasharray="4 6"/>
      <circle cx="172" cy="93" r="4" fill="currentColor"/>
      <circle cx="264" cy="45" r="4" fill="currentColor"/>
    </svg>`
  };
  return `<div class="cover-art" aria-hidden="true">${art[type] || art.matrix}</div>`;
}

function courseCard(course) {
  const isSaved = savedCourses.has(course.id);
  return `
    <article class="course-card reveal" data-course-id="${course.id}" data-subject="${course.subject}" data-level="${course.level}">
      <div class="course-cover cover--${course.color}">
        ${coverArt(course.coverType)}
        <div class="course-cover-top">
          <span class="cover-tag">${escapeHTML(course.tag)}</span>
          <button class="icon-button icon-button--cover js-save-course ${isSaved ? 'is-saved' : ''}" data-save-course="${course.id}" aria-label="${isSaved ? 'Retirer' : 'Enregistrer'} le cours ${escapeAttr(course.title)}" aria-pressed="${isSaved}">${icon('bookmark')}</button>
        </div>
        <div class="cover-equation">${tex(course.coverEq, true)}</div>
        <div class="course-cover-bottom">
          <span class="cover-level">${escapeHTML(course.level)}</span>
          <span class="cover-chapters">${course.chaptersCount} chapitres</span>
        </div>
      </div>
      <div class="course-card-body">
        <div class="course-kicker"><span>${escapeHTML(course.subject)}</span><span class="dot-sep"></span><span>${escapeHTML(course.tag)}</span></div>
        <h3><a href="#/cours/${course.id}">${escapeHTML(course.title)}</a></h3>
        <p>${escapeHTML(course.description)}</p>
        <div class="course-meta">
          <span>${icon('layers')} ${course.chaptersCount} ch.</span>
          <span>${icon('clock')} ${course.duration}</span>
          <span class="course-rating">${icon('star')} ${String(course.rating).replace('.', ',')}</span>
        </div>
      </div>
    </article>`;
}

function exerciseCard(exercise, index = 0) {
  const isSaved = savedExercises.has(exercise.id);
  return `
    <article class="exercise-card reveal" data-exercise-card="${exercise.id}" data-subject="${exercise.subject}" data-stars="${exercise.stars}" style="--card-index:${index}">
      <button class="card-hit" data-exercise="${exercise.id}" aria-label="Voir l’exercice : ${escapeAttr(exercise.title)}"></button>
      <div class="exercise-top">
        <span class="source-badge">${escapeHTML(exercise.source)}</span>
        <button class="icon-button js-save-exercise ${isSaved ? 'is-saved' : ''}" data-save-exercise="${exercise.id}" aria-label="${isSaved ? 'Retirer de mes favoris' : 'Enregistrer l’exercice'}" aria-pressed="${isSaved}">${icon('bookmark')}</button>
      </div>
      <div class="exercise-heading">
        <span class="exercise-index">${String(index + 1).padStart(2, '0')}</span>
        <div>
          <div class="exercise-tags"><span>${escapeHTML(exercise.tag)}</span><span>${escapeHTML(exercise.level)}</span></div>
          <h3>${escapeHTML(exercise.title)}</h3>
        </div>
      </div>
      <p class="exercise-teaser">${escapeHTML(exercise.teaser)}</p>
      <div class="exercise-equation">${tex(exercise.equation, true)}</div>
      <div class="exercise-footer">
        <span>${starRow(exercise.stars, 5, false)}</span>
        <span class="exercise-meta">${icon('clock')} ${exercise.minutes} min <span class="dot-sep"></span> ${icon('checkCircle')} Corrigé</span>
      </div>
    </article>`;
}

function paperCard(paper) {
  return `
    <article class="paper-card reveal" data-paper-card data-school="${paper.school}" data-subject="${paper.subject}" data-year="${paper.year}" data-search="${escapeAttr(normalizeSearch(`${paper.title} ${paper.school} ${paper.year} ${paper.subject}`))}">
      <button class="paper-open" data-paper="${paper.id}" aria-label="Ouvrir le sujet ${escapeAttr(paper.title)} ${paper.year}">
        <span class="paper-logo logo--${paper.color}">${escapeHTML(paper.short)}</span>
        <span class="paper-info">
          <span class="paper-overline">${escapeHTML(paper.school)} <span class="dot-sep"></span> Session ${paper.year}</span>
          <span class="paper-title">${escapeHTML(paper.title)}</span>
          <span class="paper-details">${escapeHTML(paper.track)} <span class="dot-sep"></span> ${escapeHTML(paper.subject)} <span class="dot-sep"></span> ${paper.duration} <span class="dot-sep"></span> ${paper.parts}</span>
        </span>
        <span class="paper-side">
          ${paper.hot ? '<span class="hot-badge">Incontournable</span>' : ''}
          <span class="paper-arrow">${icon('arrowUpRight')}</span>
        </span>
      </button>
    </article>`;
}

function threadRow(thread) {
  return `
    <a class="thread-row" href="#/forum/${thread.id}" data-thread-row data-category="${thread.category}" data-search="${escapeAttr(normalizeSearch(`${thread.title} ${thread.excerpt} ${thread.author} ${thread.tags.join(' ')}`))}">
      <span class="thread-category cat--${normalizeCategory(thread.category)}">${escapeHTML(thread.category)}</span>
      <span class="thread-main">
        <span class="thread-title-line">
          ${thread.pinned ? `<span class="pin-label">${icon('target')} Épinglé</span>` : ''}
          <strong>${escapeHTML(thread.title)}</strong>
        </span>
        <span class="thread-excerpt">${escapeHTML(thread.excerpt)}</span>
        <span class="thread-meta">
          <span class="mini-avatar avatar--${thread.avatarColor}">${escapeHTML(thread.initials || initials(thread.author))}</span>
          ${escapeHTML(thread.author)} <span class="dot-sep"></span> ${escapeHTML(timeAgo(thread.createdAt) || thread.time)}
          ${thread.tags.slice(0, 2).map(tag => `<span class="thread-tag">#${escapeHTML(tag)}</span>`).join('')}
        </span>
      </span>
      <span class="thread-stats">
        <span>${icon('forum')} ${thread.replies}</span>
        <span>${icon('eye')} ${thread.views}</span>
      </span>
      <span class="thread-chevron">${icon('arrowUpRight')}</span>
    </a>`;
}

function normalizeCategory(category) {
  return category.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '');
}

function avatarStack(extra = '') {
  return `<div class="avatar-stack ${extra}">
    <span class="avatar avatar--lime">LB</span>
    <span class="avatar avatar--lilac">AK</span>
    <span class="avatar avatar--peach">SM</span>
    <span class="avatar avatar--mint">YR</span>
    <span class="avatar avatar--more">+2k</span>
  </div>`;
}

/* --------------------------------------------------------------------------
   Page d'accueil
   -------------------------------------------------------------------------- */
function renderHome() {
  const featuredPool = COURSES.filter(course => course.featured);
  const featured = (featuredPool.length ? featuredPool : COURSES).slice(0, 4);
  const topThreads = forumThreads.slice(0, 3);
  const heroCourse = COURSES.find(course => course.featured) || COURSES[0] || null;
  const heroPaper = PAPERS.find(paper => paper.hot) || PAPERS[0] || null;
  const latestPaper = [...PAPERS].sort((a, b) => Number(b.year) - Number(a.year))[0] || null;
  const heroPaperLetter = heroPaper ? /([A-Z])\s*$/.exec(heroPaper.title || '')?.[1] : '';
  const heroPaperSubject = heroPaper ? (heroPaper.subject === 'Informatique' ? 'Info' : heroPaper.subject) : 'Annales';
  const heroPaperTitle = `${heroPaperSubject}${heroPaperLetter ? ` ${heroPaperLetter}` : ''}`;
  const totalResources = COURSES.length + EXERCISES.length + PAPERS.length;
  const schoolCount = new Set(PAPERS.map(paper => paper.school)).size;
  return `
    <section class="hero">
      <div class="hero-noise" aria-hidden="true"></div>
      <div class="hero-grid-lines" aria-hidden="true"></div>
      <div class="hero-glow hero-glow--one" aria-hidden="true"></div>
      <div class="hero-glow hero-glow--two" aria-hidden="true"></div>
      <div class="container hero-container">
        <div class="hero-copy">
          <a class="hero-announce" href="#/concours">
            <span class="announce-dot"></span>
            <span>${latestPaper ? `Banque <strong>${escapeHTML(latestPaper.school)} ${latestPaper.year}</strong> fraîchement ajoutée` : 'Toute la banque de concours, au même endroit'}</span>
            ${icon('arrowUpRight')}
          </a>
          <h1 class="hero-title">
            <span>La prépa,</span>
            <span>sans angles</span>
            <span class="hero-serif">morts<em>.</em></span>
          </h1>
          <p class="hero-description">Cours en LaTeX, exercices exigeants corrigés et banque de concours. De MPSI à MP, de CCINP à l’X — tout ce qu’il te faut, sans le bruit.</p>
          <div class="hero-actions">
            <a class="btn btn--lime btn--lg" href="#/cours">Explorer les ressources <span class="btn-orb">${icon('arrowUpRight')}</span></a>
            <a class="btn btn--ghost btn--lg" href="#/concours">Voir la banque de concours</a>
          </div>
          <div class="hero-proof">
            ${avatarStack()}
            <p><strong>${totalResources} ressources</strong> pour réviser avec MEDIL <span class="proof-rating">${icon('star')} ${COURSES.length ? (COURSES.reduce((sum, course) => sum + (Number(course.rating) || 0), 0) / COURSES.length).toFixed(1) : '4.9'}/5</span></p>
          </div>
        </div>

        <div class="hero-stage" aria-label="Aperçu d’un cours MEDIL">
          <div class="hero-orbit hero-orbit--outer" aria-hidden="true"></div>
          <div class="hero-orbit hero-orbit--inner" aria-hidden="true"></div>
          <a class="mini-card mini-card--exam" href="${heroPaper ? `#/concours/${escapeAttr(heroPaper.id)}` : '#/concours'}">
            <span class="mini-card-label">${heroPaper ? `${escapeHTML(heroPaper.school)} · ${heroPaper.year}` : 'Banque de concours'}</span>
            <span class="mini-card-title">${escapeHTML(heroPaperTitle)}</span>
            <span class="mini-card-meta">${heroPaper ? `${escapeHTML(heroPaper.duration)} · ${escapeHTML(heroPaper.track)}` : 'Toutes les filières'} <span class="mini-arrow">${icon('arrowUpRight')}</span></span>
          </a>
          <div class="study-card">
            <div class="study-card-top">
              <span class="study-brand"><span class="study-brand-mark">M</span> MEDIL / COURS</span>
              <span class="live-pill"><span></span> EN COURS</span>
            </div>
            <div class="study-card-heading">
              <span class="study-kicker">${heroCourse ? `${escapeHTML(heroCourse.tag)} · ${escapeHTML(heroCourse.level)}` : 'La bibliothèque MEDIL'}</span>
              <h2>${heroCourse ? escapeHTML(heroCourse.title) : 'Tous les cours, au même endroit'}</h2>
            </div>
            <div class="study-equation">${tex(heroCourse?.coverEq || '\\text{MEDIL}', true)}</div>
            <div class="study-progress-head"><span>Progression</span><strong>${heroCourse?.progress ?? 0}%</strong></div>
            <div class="progress-track"><span style="width:${heroCourse?.progress ?? 0}%"></span></div>
            <div class="study-footer">
              <span>${icon('clock')} ${heroCourse ? `${escapeHTML(heroCourse.duration)} de lecture` : 'Bibliothèque complète'}</span>
              <a href="${heroCourse ? `#/cours/${escapeAttr(heroCourse.id)}` : '#/cours'}">${heroCourse ? 'Reprendre' : 'Explorer'} ${icon('arrowRight')}</a>
            </div>
          </div>
          <a class="mini-card mini-card--challenge" href="#/exercices" data-open-daily>
            <span class="challenge-flame">${icon('flame')}</span>
            <span>
              <span class="mini-card-label">Défi du jour</span>
              <span class="mini-card-title">+${DAILY_CHALLENGE.xp} XP</span>
            </span>
            <span class="challenge-play">${icon('play')}</span>
          </a>
          <span class="floating-note floating-note--streak">${icon('flame')} 12 jours de suite</span>
          <span class="floating-note floating-note--verified">${icon('checkCircle')} Corrigés vérifiés</span>
          <span class="hero-sticker">100%<br><small>LaTeX</small></span>
        </div>
      </div>
      <div class="container hero-stats">
        <div class="hero-stat"><strong>${totalResources}</strong><span>ressources publiées</span></div>
        <div class="hero-stat"><strong>${PAPERS.length}</strong><span>sujets de concours</span></div>
        <div class="hero-stat"><strong>${schoolCount || '—'}</strong><span>concours couverts</span></div>
        <div class="hero-stat"><strong>7 j/7</strong><span>forum actif</span></div>
        <span class="hero-stats-note">Fait par des taupins, pour des taupins.</span>
      </div>
    </section>

    <div class="school-marquee" aria-label="Concours couverts">
      <div class="marquee-track">
        ${['X/ENS', 'MINES-PONTS', 'CENTRALE', 'CCINP', 'E3A', 'X/ENS', 'MINES-PONTS', 'CENTRALE', 'CCINP', 'E3A'].map((name, i) => `<span class="marquee-item ${i % 2 ? 'marquee-item--serif' : ''}">${name}</span><span class="marquee-star">✦</span>`).join('')}
      </div>
    </div>

    <section class="section subjects-section">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow"><span class="eyebrow-dot"></span>Ton point de départ</p>
            <h2>Choisis ton terrain<br><span class="serif-italic">de jeu.</span></h2>
          </div>
          <p class="section-intro">Des parcours pensés pour les programmes MPSI et MP, avec des prérequis clairs, des démonstrations complètes et de quoi s’entraîner sérieusement.</p>
        </div>
        <div class="subject-grid">
          <a class="subject-card subject-card--maths reveal" href="#/cours?subject=Maths">
            <div class="subject-card-top">
              <span class="subject-number">01</span>
              <span class="subject-chip">${COURSES.filter(c => c.subject === 'Maths').length + EXERCISES.filter(e => e.subject === 'Maths').length + PAPERS.filter(p => p.subject === 'Maths').length} ressources</span>
              <span class="subject-arrow">${icon('arrowUpRight')}</span>
            </div>
            <div class="subject-art subject-art--maths" aria-hidden="true">
              <span class="math-symbol math-symbol--one">∑</span>
              <span class="math-symbol math-symbol--two">∫</span>
              <span class="math-symbol math-symbol--three">∈</span>
              <span class="subject-orbit"></span>
              <span class="subject-orbit subject-orbit--small"></span>
            </div>
            <div class="subject-card-bottom">
              <h3>Mathématiques</h3>
              <p>Algèbre · Analyse · Probabilités</p>
              <span class="subject-footer">MPSI + MP ${icon('arrowRight')}</span>
            </div>
          </a>
          <a class="subject-card subject-card--physics reveal" href="#/cours?subject=Physique">
            <div class="subject-card-top">
              <span class="subject-number">02</span>
              <span class="subject-chip">${COURSES.filter(c => c.subject === 'Physique').length + EXERCISES.filter(e => e.subject === 'Physique').length + PAPERS.filter(p => p.subject === 'Physique').length} ressources</span>
              <span class="subject-arrow">${icon('arrowUpRight')}</span>
            </div>
            <div class="subject-art subject-art--physics" aria-hidden="true">
              <span class="physics-core"></span>
              <span class="physics-ring physics-ring--one"></span>
              <span class="physics-ring physics-ring--two"></span>
              <span class="physics-ring physics-ring--three"></span>
              <span class="physics-spark">✦</span>
            </div>
            <div class="subject-card-bottom">
              <h3>Physique</h3>
              <p>Mécanique · Champs · Quantique</p>
              <span class="subject-footer">MPSI + MP ${icon('arrowRight')}</span>
            </div>
          </a>
          <a class="subject-card subject-card--info reveal" href="#/cours?subject=Informatique">
            <div class="subject-card-top">
              <span class="subject-number">03</span>
              <span class="subject-chip">${COURSES.filter(c => c.subject === 'Informatique').length + EXERCISES.filter(e => e.subject === 'Informatique').length + PAPERS.filter(p => p.subject === 'Informatique').length} ressources</span>
              <span class="subject-arrow">${icon('arrowUpRight')}</span>
            </div>
            <div class="subject-art subject-art--info" aria-hidden="true">
              <div class="code-window">
                <span class="code-dot"></span><span class="code-dot"></span><span class="code-dot"></span>
                <div class="code-line code-line--one"></div>
                <div class="code-line code-line--two"></div>
                <div class="code-line code-line--three"></div>
                <div class="code-cursor"></div>
              </div>
              <span class="code-bracket">{ }</span>
            </div>
            <div class="subject-card-bottom">
              <h3>Informatique</h3>
              <p>Algorithmes · Python · Preuves</p>
              <span class="subject-footer">MPSI + MP ${icon('arrowRight')}</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section class="section courses-section">
      <div class="container">
        <div class="section-heading section-heading--with-link">
          <div>
            <p class="eyebrow"><span class="eyebrow-dot"></span>La bibliothèque</p>
            <h2>Des cours qui vont<br><span class="serif-italic">au fond.</span></h2>
          </div>
          <div class="section-heading-side">
            <p class="section-intro">Rédigés en LaTeX, relus par des élèves de l’X et de l’ENS. Pas de résumé flou : des définitions nettes, des preuves complètes et des pièges signalés.</p>
            <a class="text-link" href="#/cours">Voir les ${COURSES.length} cours ${icon('arrowUpRight')}</a>
          </div>
        </div>
        <div class="course-grid course-grid--home">
          ${featured.map(courseCard).join('')}
        </div>
        <div class="bento-resources">
          <a class="bento bento--latex reveal" href="#/cours/reduction-endomorphismes">
            <div class="bento-copy">
              <span class="bento-tag">${icon('file')} Polycopiés soignés</span>
              <h3>Le LaTeX qui donne envie de réviser.</h3>
              <p>Des fiches structurées, des formules lisibles et des démonstrations qui tiennent debout le jour J.</p>
              <span class="text-link text-link--dark">Ouvrir un cours ${icon('arrowUpRight')}</span>
            </div>
            <div class="latex-page" aria-hidden="true">
              <div class="latex-page-top"><span>MEDIL — MP</span><span>Chapitre 14</span></div>
              <div class="latex-page-title">Réduction<br>des endomorphismes</div>
              <div class="latex-rule"></div>
              <div class="latex-lines"><span></span><span></span><span></span><span></span></div>
              ${tex('\\chi_u(u)=0', true)}
              <div class="latex-page-stamp">PDF</div>
            </div>
          </a>
          <a class="bento bento--exos reveal" href="#/exercices">
            <div class="bento-copy">
              <span class="bento-tag">${icon('target')} Pour progresser</span>
              <h3>Les exercices<br>qui font mal.</h3>
              <p>Classés par difficulté, tous corrigés pas à pas.</p>
              <span class="round-link">${icon('arrowUpRight')}</span>
            </div>
            <div class="exo-sticker">
              <span>NIVEAU</span>
              <strong>★★★★</strong>
              <span>Corrigé inclus</span>
            </div>
          </a>
          <div class="bento bento--community reveal">
            <div class="bento-copy">
              <span class="bento-tag">${icon('users')} La communauté</span>
              <h3>Personne<br>ne bloque seul.</h3>
              <p>Pose ta question, débloque une démonstration, aide quelqu’un d’autre à comprendre.</p>
              <a class="text-link" href="#/forum">Entrer dans le forum ${icon('arrowUpRight')}</a>
            </div>
            <div class="community-orbs" aria-hidden="true">
              <span class="avatar avatar--xl avatar--lime">LB</span>
              <span class="avatar avatar--xl avatar--lilac">AK</span>
              <span class="avatar avatar--xl avatar--peach">SM</span>
              <span class="online-pill"><span></span> 128 en ligne</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section challenge-section">
      <div class="container">
        <div class="daily-challenge reveal">
          <div class="challenge-bg" aria-hidden="true"></div>
          <div class="challenge-main">
            <p class="eyebrow eyebrow--light"><span class="eyebrow-dot"></span>Défi du jour</p>
            <div class="challenge-tags"><span>Maths</span><span>MP</span><span>Algèbre</span><span class="challenge-xp">+40 XP</span></div>
            <h2>${DAILY_CHALLENGE.title}</h2>
            <p class="challenge-statement">${DAILY_CHALLENGE.statement}</p>
            <div class="challenge-equation">${tex(DAILY_CHALLENGE.equation, true)}</div>
            <div class="challenge-actions">
              <button class="btn btn--lime" data-reveal-challenge>Voir la correction ${icon('arrowRight')}</button>
              <button class="btn btn--ghost-dark" data-exercise="${DAILY_CHALLENGE.id}">Version complète ${icon('arrowUpRight')}</button>
            </div>
            <div class="challenge-community">
              ${avatarStack()}
              <span><strong>${DAILY_CHALLENGE.participants}</strong> ont tenté le défi aujourd’hui</span>
            </div>
          </div>
          <div class="challenge-side">
            <div class="solution-kicker">${icon('lock', 'solution-lock')} <span class="solution-label">La correction se mérite</span></div>
            <div class="solution-placeholder" data-solution-placeholder>
              <span class="solution-number">01 / 03</span>
              <h3>Une piste avant la réponse</h3>
              <p>Essaie d’abord de faire apparaître un reste cubique. La nilpotence va faire le reste.</p>
              <button class="solution-btn" data-reveal-challenge>${icon('lightbulb')} Révéler les 3 étapes</button>
            </div>
            <div class="solution-steps" data-solution-steps hidden>
              ${(DAILY_CHALLENGE.steps || []).map((step, index) => `
              <div class="solution-step">
                <span>${String(index + 1).padStart(2, '0')}</span>
                <div><p>${step}</p></div>
              </div>`).join('')}
              <div class="solution-success">${icon('checkCircle')} Corrigé vérifié par l’équipe MEDIL</div>
            </div>
          </div>
          <span class="challenge-sticker">Jour<br><strong>07</strong></span>
        </div>
      </div>
    </section>

    <section class="section concours-preview-section">
      <div class="container">
        <div class="concours-feature reveal">
          <div class="concours-feature-copy">
            <p class="eyebrow"><span class="eyebrow-dot"></span>Banque de concours</p>
            <h2>De CCINP à l’X.<br><span class="serif-italic">Sans perdre le fil.</span></h2>
            <p>Retrouve les sujets et corrigés des concours qui comptent, filtres par école, filière et année. Une bibliothèque claire pour réviser intelligemment, pas juste accumuler des PDF.</p>
            <div class="concours-feature-actions">
              <a class="btn btn--dark btn--lg" href="#/concours">Ouvrir la banque ${icon('arrowUpRight')}</a>
              <span class="concours-count"><strong>${PAPERS.length}</strong> sujets disponibles</span>
            </div>
          </div>
          <div class="paper-pile" aria-hidden="true">
            <div class="paper-preview paper-preview--back">
              <span class="paper-preview-school">CCINP</span>
              <span class="paper-preview-title">Mathématiques 1</span>
              <span class="paper-preview-year">2025</span>
              <div class="paper-lines"><span></span><span></span><span></span></div>
              <span class="paper-preview-footer">MP · 4 h</span>
            </div>
            <div class="paper-preview paper-preview--mid">
              <span class="paper-preview-school">Mines-Ponts</span>
              <span class="paper-preview-title">Mathématiques 2</span>
              <span class="paper-preview-year">2024</span>
              <div class="paper-lines"><span></span><span></span><span></span></div>
              <span class="paper-preview-footer">MP · 4 h</span>
            </div>
            <div class="paper-preview paper-preview--front">
              <div class="paper-preview-top"><span class="paper-preview-logo">X</span><span>Concours<br><strong>X/ENS</strong></span></div>
              <span class="paper-preview-title">Épreuve de<br>mathématiques B</span>
              <div class="paper-preview-meta"><span>Session 2025</span><span>Filière MP</span></div>
              <div class="paper-lines"><span></span><span></span><span></span><span></span></div>
              <span class="paper-preview-footer"><span>4 heures</span><span>${icon('arrowUpRight')}</span></span>
            </div>
            <div class="paper-pile-sticker">Nouveau<br><strong>2026</strong></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section forum-preview-section">
      <div class="container">
        <div class="forum-preview-panel reveal">
          <div class="forum-preview-head">
            <div>
              <p class="eyebrow"><span class="eyebrow-dot"></span>Le forum</p>
              <h2>La communauté<br><span class="serif-italic">avant la compétition.</span></h2>
            </div>
            <div class="forum-preview-side">
              <p>Une question à 23 h ? Un blocage sur une démonstration ? Ici, on débloque ensemble, sans jugement et sans toxicité.</p>
              <a class="btn btn--dark" href="#/forum">Explorer le forum ${icon('arrowUpRight')}</a>
            </div>
          </div>
          <div class="forum-preview-grid">
            <div class="forum-thread-list">
              ${topThreads.map(threadRow).join('')}
            </div>
            <aside class="community-card">
              <div class="online-avatars">
                ${avatarStack('avatar-stack--dark')}
                <span class="online-status"><span></span> 128 connectés</span>
              </div>
              <h3>Un collectif qui bosse.</h3>
              <p>Des élèves de Ginette, LLG, Hoche, Stan, Chaptal et ailleurs. Des explications, des schémas, des sources.</p>
              <div class="community-stats">
                <div><strong>4,8k</strong><span>membres</span></div>
                <div><strong>97%</strong><span>de questions résolues</span></div>
              </div>
              <a class="community-link" href="#/forum">Rejoindre la conversation ${icon('arrowRight')}</a>
            </aside>
          </div>
        </div>
      </div>
    </section>

    <section class="final-cta-section">
      <div class="container">
        <div class="final-cta reveal">
          <div class="final-cta-star" aria-hidden="true">✦</div>
          <p class="eyebrow eyebrow--light"><span class="eyebrow-dot"></span>Prêt·e à passer un cap ?</p>
          <h2>La prépa est dure.<br><span class="serif-italic">Ta façon de réviser</span><br>peut être meilleure.</h2>
          <div class="final-cta-actions">
            <a class="btn btn--lime btn--lg" href="#/cours">Commencer gratuitement ${icon('arrowUpRight')}</a>
            <button class="btn btn--ghost btn--lg" data-open-auth="signup">Créer mon compte</button>
          </div>
          <p class="final-cta-note">Cours, exos, concours et forum. Sans carte bancaire, sans engagement.</p>
        </div>
      </div>
    </section>`;
}

/* --------------------------------------------------------------------------
   Page Cours
   -------------------------------------------------------------------------- */
function renderCoursesPage() {
  paginationState.courses.page = 1;
  const chapterCount = COURSES.reduce((sum, course) => sum + (Number(course.chaptersCount) || 0), 0);
  return `
    ${pageHero({
      eyebrow: 'Bibliothèque · MPSI / MP',
      title: 'Tout le programme,<br><span class="serif-italic">en clair.</span>',
      description: 'Des cours complets, écrits en LaTeX et pensés pour être relus la veille d’un DS. Définitions nettes, preuves complètes, pièges signalés.',
      meta: `<span class="hero-meta-pill">${icon('book')} ${COURSES.length} cours complets</span><span class="hero-meta-pill">${icon('file')} ${chapterCount} chapitres</span><span class="hero-meta-pill">${icon('checkCircle')} Relus par l’équipe</span>`,
      className: 'page-hero--courses',
      children: '<div class="page-hero-deco page-hero-deco--book" aria-hidden="true">∑</div><div class="page-hero-deco page-hero-deco--atom" aria-hidden="true"><span></span></div>'
    })}
    <section class="section library-section">
      <div class="container">
        <div class="library-toolbar sticky-toolbar">
          <div class="filter-groups">
            <div class="filter-group" data-course-filter-group="subject">
              ${['Tous', 'Maths', 'Physique', 'Informatique'].map(value => `<button class="filter-pill ${value === 'Tous' ? 'is-active' : ''}" data-course-filter="subject" data-value="${value}">${value}</button>`).join('')}
            </div>
            <span class="filter-separator"></span>
            <div class="filter-group" data-course-filter-group="level">
              ${['Tous', 'MPSI', 'MP'].map(value => `<button class="filter-pill ${value === 'Tous' ? 'is-active' : ''}" data-course-filter="level" data-value="${value}">${value === 'Tous' ? 'Tous niveaux' : value}</button>`).join('')}
            </div>
          </div>
          <div class="library-count"><strong id="course-count">${COURSES.length}</strong> cours <span class="count-dot"></span> mis à jour cette semaine</div>
        </div>
        <div class="course-grid library-grid" id="course-grid">
          ${COURSES.map(courseCard).join('')}
        </div>
        <div id="course-pagination"></div>
        <div class="empty-state" id="course-empty" hidden>
          <span class="empty-icon">${icon('search')}</span>
          <h3>Aucun cours ne correspond.</h3>
          <p>Essaie un autre filtre, ou reviens à tous les cours.</p>
          <button class="btn btn--dark" data-reset-course-filters>Réinitialiser les filtres</button>
        </div>
        <div class="library-footer reveal">
          <div class="library-footer-icon">${icon('sparkles')}</div>
          <div>
            <h3>Un chapitre te manque ?</h3>
            <p>Dis-nous ce qui bloque. Les prochains cours sont choisis avec la communauté.</p>
          </div>
          <a class="btn btn--outline" href="#/forum">Proposer un sujet ${icon('arrowUpRight')}</a>
        </div>
      </div>
    </section>`;
}

function renderCourseDetail(id) {
  const course = COURSES.find(item => item.id === id);
  if (!course) return renderNotFound('Ce cours n’existe pas encore.', 'La bibliothèque évolue chaque semaine. Retourne aux cours pour trouver ton bonheur.');
  if (!course.sections) {
    loadCourseDetail(id).then(() => renderRoute()).catch(() => {});
    return `
      <section class="section">
        <div class="container">
          <a class="back-link" href="#/cours">${icon('arrowLeft')} Tous les cours</a>
          <div class="loading-state">
            <span class="loading-spinner" aria-hidden="true"></span>
            <p>Chargement du cours…</p>
          </div>
        </div>
      </section>`;
  }
  const isSaved = savedCourses.has(course.id);
  const isDone = completedItems.has(course.id);
  const progress = isDone ? 100 : (course.progress || 0);
  const linkedExercise = EXERCISES.find(item => item.subject === course.subject && item.level === course.level) || EXERCISES.find(item => item.subject === course.subject) || EXERCISES[0];
  return `
    <section class="reader-hero">
      <div class="reader-hero-glow" aria-hidden="true"></div>
      <div class="container">
        <a class="back-link" href="#/cours">${icon('arrowLeft')} Tous les cours</a>
        <div class="reader-hero-grid">
          <div class="reader-hero-copy">
            <div class="reader-badges"><span class="reader-badge reader-badge--lime">${escapeHTML(course.subject)}</span><span class="reader-badge">${escapeHTML(course.level)}</span><span class="reader-badge">${escapeHTML(course.tag)}</span></div>
            <h1>${escapeHTML(course.title)}</h1>
            <p>${escapeHTML(course.description)}</p>
            <div class="reader-meta">
              <span>${icon('layers')} ${course.chaptersCount} chapitres</span>
              <span>${icon('clock')} ${course.duration} de lecture</span>
              <span>${icon('star')} ${String(course.rating).replace('.', ',')} / 5 · ${course.students} élèves</span>
            </div>
            <div class="reader-hero-actions">
              <button class="btn btn--lime" data-course-download>${icon('download')} Télécharger le PDF</button>
              <button class="btn btn--ghost ${isSaved ? 'is-saved' : ''}" data-save-course="${course.id}" aria-pressed="${isSaved}">${icon('bookmark')} ${isSaved ? 'Enregistré' : 'Enregistrer'}</button>
            </div>
          </div>
          <div class="reader-cover cover--${course.color}">
            ${coverArt(course.coverType)}
            <span class="reader-cover-label">MEDIL · ${escapeHTML(course.level)}</span>
            <div class="reader-cover-equation">${tex(course.coverEq, true)}</div>
            <span class="reader-cover-footer">ÉDITION 2026 · PDF</span>
          </div>
        </div>
      </div>
    </section>
    <section class="reader-section">
      <div class="container reader-layout">
        <aside class="reader-sidebar">
          <div class="reader-progress-card">
            <div class="reader-progress-top"><span>Progression</span><strong>${progress}%</strong></div>
            <div class="progress-track progress-track--dark"><span style="width:${progress}%"></span></div>
            <p>${isDone ? 'Cours terminé. Bravo.' : 'Encore un petit effort.'}</p>
          </div>
          <nav class="toc" aria-label="Sommaire">
            <p class="toc-title">Sommaire</p>
            ${course.toc.map((chapter, index) => `<a class="toc-link ${index === 0 ? 'is-active' : ''}" href="#section-${course.sections[index]?.id || index}"><span>${String(index + 1).padStart(2, '0')}</span>${escapeHTML(chapter)}</a>`).join('')}
          </nav>
          <button class="btn btn--outline btn--full" data-print-course>${icon('print')} Version imprimable</button>
          <p class="reader-sidebar-note">${icon('checkCircle')} Contenu relu et vérifié<br><span>Dernière mise à jour : oct. 2026</span></p>
        </aside>
        <div class="reader-main">
          <div class="reader-paper">
            <div class="reader-paper-head">
              <span class="reader-paper-brand"><span class="study-brand-mark">M</span> MEDIL COURS</span>
              <span>${escapeHTML(course.tag)} · ${escapeHTML(course.level)}</span>
            </div>
            <div class="reader-intro">
              <p class="eyebrow"><span class="eyebrow-dot"></span>Aperçu du chapitre</p>
              <h2>${escapeHTML(course.title)}</h2>
              <p>Dans ce cours, on construit les outils puis on les met immédiatement à l’épreuve. Chaque section contient l’essentiel, une preuve et un point de vigilance pour le concours.</p>
              <div class="objectives">
                <p>À la fin de ce cours, tu sauras :</p>
                <ul>
                  ${course.objectives.map(objective => `<li>${icon('check')} ${escapeHTML(objective)}</li>`).join('')}
                </ul>
              </div>
            </div>
            ${course.sections.map((section, index) => `
              <article class="reader-block" id="section-${section.id}">
                <div class="reader-block-kicker">${escapeHTML(section.kicker)}</div>
                <h2>${escapeHTML(section.title)}</h2>
                ${section.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('')}
                <div class="reader-formula">${tex(section.formula, true)}</div>
                <div class="reader-note"><span class="reader-note-icon">${icon('lightbulb')}</span><p><strong>À retenir.</strong> ${section.note}</p></div>
                ${index === 0 ? `<div class="reader-small-example"><span class="example-label">Exemple éclair</span><p>Si <span class="inline-tex" data-tex="A^3=0"></span>, alors <span class="inline-tex" data-tex="I+A"></span> est inversible et <span class="inline-tex" data-tex="(I+A)^{-1}=I-A+A^2"></span>. C’est exactement l’exercice du jour.</p><a class="text-link text-link--dark" href="#/exercices" data-exercise="${linkedExercise.id}">Voir les exercices liés ${icon('arrowUpRight')}</a></div>` : ''}
              </article>`).join('')}
            <div class="reader-exercise">
              <div class="reader-exercise-head"><span class="bento-tag">${icon('target')} Exercice d’application</span><span class="source-badge">À faire maintenant</span></div>
              <h3>${escapeHTML(course.title.split(' ').slice(0, 3).join(' '))}, en pratique</h3>
              <p>${course.exercise.prompt}</p>
              <div class="reader-exercise-answer" data-course-answer hidden>
                <span class="answer-label">${icon('checkCircle')} Réponse</span><div>${tex(course.exercise.answer, true)}</div>
              </div>
              <button class="btn btn--dark" data-course-answer-toggle>${icon('sparkles')} Voir la réponse</button>
            </div>
            <div class="reader-pager">
              <a href="#/cours" class="reader-pager-link">${icon('arrowLeft')}<span><small>Bibliothèque</small>Tous les cours</span></a>
              <button class="reader-pager-link reader-pager-link--next" data-mark-course-done="${course.id}"><span><small>Prochaine étape</small>${isDone ? 'Cours terminé' : 'Marquer comme lu'}</span>${icon('arrowRight')}</button>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

/* --------------------------------------------------------------------------
   Page Exercices
   -------------------------------------------------------------------------- */
function renderExercisesPage() {
  paginationState.exercises.page = 1;
  return `
    ${pageHero({
      eyebrow: 'La salle d’entraînement · MPSI / MP',
      title: 'Des exos qui font mal.<br><span class="serif-italic">Des corrigés qui font comprendre.</span>',
      description: 'Les classiques des colles, des DS et des concours. Pas de corrigé parachuté : des étapes, des idées, des pièges. Pour progresser pour de vrai.',
      meta: `<span class="hero-meta-pill">${icon('target')} ${EXERCISES.length} exercices durs</span><span class="hero-meta-pill">${icon('checkCircle')} 100% corrigés</span><span class="hero-meta-pill">${icon('layers')} Classés par difficulté</span>`,
      className: 'page-hero--exercises',
      children: '<div class="page-hero-deco page-hero-deco--sigma" aria-hidden="true">∫</div><div class="page-hero-deco page-hero-deco--stars" aria-hidden="true">★<br>★<br>★</div>'
    })}
    <section class="section exercises-library">
      <div class="container">
        <div class="library-toolbar sticky-toolbar">
          <div class="filter-groups">
            <div class="filter-group" data-exercise-filter-group="subject">
              ${['Tous', 'Maths', 'Physique', 'Informatique'].map(value => `<button class="filter-pill ${value === 'Tous' ? 'is-active' : ''}" data-exercise-filter="subject" data-value="${value}">${value}</button>`).join('')}
            </div>
            <span class="filter-separator"></span>
            <div class="filter-group" data-exercise-filter-group="stars">
              <span class="filter-label">${icon('star')} Difficulté</span>
              ${['Tous', '2', '3', '4', '5'].map(value => `<button class="filter-pill ${value === 'Tous' ? 'is-active' : ''}" data-exercise-filter="stars" data-value="${value}">${value === 'Tous' ? 'Toutes' : '★'.repeat(Number(value))}</button>`).join('')}
            </div>
          </div>
          <div class="library-count"><strong id="exercise-count">${EXERCISES.length}</strong> exercices <span class="count-dot"></span> corrigés vérifiés</div>
        </div>
        <div class="exercise-grid" id="exercise-grid">
          ${EXERCISES.map(exerciseCard).join('')}
        </div>
        <div id="exercise-pagination"></div>
        <div class="empty-state" id="exercise-empty" hidden>
          <span class="empty-icon">${icon('search')}</span>
          <h3>Aucun exercice sur ce radar.</h3>
          <p>Change de filtre ou tente un autre niveau de difficulté.</p>
          <button class="btn btn--dark" data-reset-exercise-filters>Réinitialiser les filtres</button>
        </div>
        <div class="exercises-note reveal">
          <div class="exercises-note-icon">${icon('lightbulb')}</div>
          <div><strong>Notre philosophie du corrigé.</strong><p>On ne donne pas seulement la réponse. On explique comment trouver l’idée, pourquoi elle marche, et ce qu’il faut retenir pour la prochaine fois.</p></div>
          <span class="note-signature">— L’équipe MEDIL</span>
        </div>
      </div>
    </section>`;
}

/* --------------------------------------------------------------------------
   Page Concours
   -------------------------------------------------------------------------- */
function renderConcoursPage() {
  paginationState.papers.page = 1;
  const schools = ['Tous', 'X/ENS', 'Mines-Ponts', 'Centrale', 'CCINP', 'e3a'];
  const subjects = ['Tous', 'Maths', 'Physique', 'Informatique'];
  const paperYears = PAPERS.map(paper => Number(paper.year)).filter(Boolean);
  const yearRange = paperYears.length ? `${Math.min(...paperYears)} → ${Math.max(...paperYears)}` : 'toutes sessions';
  const years = ['Tous', ...Array.from(new Set(PAPERS.map(paper => paper.year))).sort((a, b) => b - a)];
  return `
    ${pageHero({
      eyebrow: `La banque de concours · ${yearRange.replace(' → ', ' — ')}`,
      title: 'Tous les sujets.<br><span class="serif-italic">Le bon cap.</span>',
      description: 'X/ENS, Mines-Ponts, Centrale, CCINP et e3a. Les annales et les corrigés, réunis dans une interface qui ne te fait pas perdre une heure à chercher un PDF.',
      meta: `<span class="hero-meta-pill">${icon('file')} ${PAPERS.length} sujets</span><span class="hero-meta-pill">${icon('checkCircle')} Corrigés détaillés</span><span class="hero-meta-pill">${icon('calendar')} Sessions ${yearRange}</span>`,
      className: 'page-hero--concours',
      children: `<div class="page-hero-search">
        <span>${icon('search')}</span>
        <input type="search" placeholder="Chercher un concours, une épreuve, une année…" data-paper-search aria-label="Rechercher dans la banque de concours">
        <kbd>⌘K</kbd>
      </div>
      <div class="page-hero-deco page-hero-deco--exam" aria-hidden="true"><span>X</span><span>CC</span><span>MP</span></div>`
    })}
    <section class="section papers-section">
      <div class="container">
        <div class="paper-toolbar-wrap sticky-toolbar">
          <div class="paper-toolbar">
            <div class="filter-groups paper-schools" data-paper-filter-group="school">
              ${schools.map(value => `<button class="filter-pill ${value === 'Tous' ? 'is-active' : ''}" data-paper-filter="school" data-value="${value}">${value}</button>`).join('')}
            </div>
            <div class="paper-secondary-filters">
              <div class="filter-group" data-paper-filter-group="subject">
                ${subjects.map(value => `<button class="filter-pill filter-pill--sm ${value === 'Tous' ? 'is-active' : ''}" data-paper-filter="subject" data-value="${value}">${value}</button>`).join('')}
              </div>
              <label class="select-wrap">
                <span class="sr-only">Filtrer par année</span>
                <select data-paper-year>
                  ${years.map(year => `<option value="${year}">${year === 'Tous' ? 'Toutes les années' : `Session ${year}`}</option>`).join('')}
                </select>
                ${icon('chevronDown')}
              </label>
              <span class="library-count"><strong id="paper-count">${PAPERS.length}</strong> sujets</span>
            </div>
          </div>
        </div>
        <div class="paper-grid" id="paper-grid">
          ${PAPERS.map(paperCard).join('')}
        </div>
        <div id="paper-pagination"></div>
        <div class="empty-state" id="paper-empty" hidden>
          <span class="empty-icon">${icon('search')}</span>
          <h3>Rien dans cette étagère.</h3>
          <p>Essaie une autre école, une autre année, ou efface ta recherche.</p>
          <button class="btn btn--dark" data-reset-paper-filters>Réinitialiser les filtres</button>
        </div>
        <div class="papers-aside reveal">
          <div class="papers-aside-art">${icon('file')}</div>
          <div><h3>Une correction à signaler ?</h3><p>Nos corrigés sont relus, mais une coquille reste toujours possible. Signale-la sur le forum : on corrige vite.</p></div>
          <a class="btn btn--outline" href="#/forum">Signaler une coquille ${icon('arrowUpRight')}</a>
        </div>
      </div>
    </section>`;
}

/* --------------------------------------------------------------------------
   Page Forum
   -------------------------------------------------------------------------- */
function renderForumPage() {
  const categories = ['Tous', 'Maths', 'Physique', 'Informatique', 'Concours', 'Méthode'];
  const topThreads = forumThreads.slice(0, 4);
  return `
    ${pageHero({
      eyebrow: 'Le forum · 128 membres en ligne',
      title: 'On bloque.<br><span class="serif-italic">On demande. On avance.</span>',
      description: 'Un espace d’entraide entre taupins : démonstrations, méthodes, annales, coups de mou et victoires. Modéré, bienveillant, utile.',
      meta: `<span class="hero-meta-pill">${icon('users')} 4 800 membres</span><span class="hero-meta-pill">${icon('forum')} ${forumThreads.length} discussions</span><span class="hero-meta-pill"><span class="live-dot"></span> 128 en ligne</span>`,
      className: 'page-hero--forum',
      children: `<div class="page-hero-actions"><button class="btn btn--lime btn--lg" data-new-thread>${icon('plus')} Nouveau sujet</button><a class="btn btn--ghost btn--lg" href="${topThreads[0] ? `#/forum/${escapeAttr(topThreads[0].id)}` : '#/forum'}">Voir une discussion</a></div><div class="page-hero-deco page-hero-deco--forum" aria-hidden="true">?</div>`
    })}
    <section class="section forum-page-section">
      <div class="container">
        <div class="forum-page-tools">
          <div class="forum-category-tabs" data-forum-filter-group="category">
            ${categories.map(value => `<button class="filter-pill ${value === 'Tous' ? 'is-active' : ''}" data-forum-filter="category" data-value="${value}">${value}</button>`).join('')}
          </div>
          <label class="forum-search">
            ${icon('search')}
            <input type="search" placeholder="Chercher dans le forum…" data-forum-search aria-label="Rechercher une discussion">
          </label>
        </div>
        <div class="forum-layout">
          <div class="forum-list-column">
            <div class="forum-list-head">
              <span><strong id="forum-count">${forumThreads.length}</strong> discussions</span>
              <span class="sort-label">${icon('sparkles')} Les plus actives</span>
            </div>
            <div class="forum-thread-list forum-thread-list--page" id="forum-thread-list">
              ${forumThreads.map(threadRow).join('')}
            </div>
            <div class="empty-state empty-state--small" id="forum-empty" hidden>
              <span class="empty-icon">${icon('forum')}</span>
              <h3>Aucune discussion ici.</h3>
              <p>Sois la première personne à lancer le sujet.</p>
              <button class="btn btn--dark" data-new-thread>Créer une discussion</button>
            </div>
            <button class="load-more-btn" data-soon="Plus de discussions bientôt disponibles.">Charger plus de discussions ${icon('arrowRight')}</button>
          </div>
          <aside class="forum-sidebar">
            <div class="forum-side-card forum-side-card--dark">
              <div class="online-avatars">
                ${avatarStack('avatar-stack--dark')}
                <span class="online-status"><span></span> 128 connectés</span>
              </div>
              <h3>La promo est là.</h3>
              <p>Une question posée maintenant a de grandes chances d’avoir une réponse avant la prochaine colles.</p>
              <div class="live-activity"><span class="pulse-dot"></span> Sofia a répondu à « Suites de Cauchy » <small>il y a 1 min</small></div>
            </div>
            <div class="forum-side-card">
              <p class="eyebrow"><span class="eyebrow-dot"></span>Les règles d’or</p>
              <ul class="golden-rules">
                <li><span>01</span>Cherche avant de demander.</li>
                <li><span>02</span>Explique ton raisonnement, pas seulement ton blocage.</li>
                <li><span>03</span>Corrige, remercie, transmets.</li>
              </ul>
              <a class="text-link text-link--dark" href="#/forum">Charte complète ${icon('arrowUpRight')}</a>
            </div>
            <div class="forum-side-card forum-side-card--lime">
              <span class="forum-side-icon">${icon('sparkles')}</span>
              <h3>Les bonnes questions font les bons déclics.</h3>
              <p>Un titre précis, un énoncé recopié, et ce que tu as déjà tenté.</p>
              <button class="btn btn--dark btn--full" data-new-thread>Poser ma question ${icon('plus')}</button>
            </div>
            <div class="forum-side-card mini-stats-card">
              <p class="eyebrow"><span class="eyebrow-dot"></span>Aujourd’hui</p>
              <div class="mini-stat-row"><strong>42</strong><span>nouvelles réponses</span></div>
              <div class="mini-stat-row"><strong>12</strong><span>sujets résolus</span></div>
              <div class="mini-stat-row"><strong>97%</strong><span>de questions avec réponse</span></div>
            </div>
          </aside>
        </div>
      </div>
    </section>`;
}

function renderThreadPage(id) {
  const thread = forumThreads.find(item => item.id === id);
  if (!thread) return renderNotFound('Cette discussion est introuvable.', 'Elle a peut-être été archivée. Le forum est grand, mais tu peux retrouver le chemin.', '#/forum', 'Retour au forum');
  if (!thread.content) {
    loadThreadDetail(id).then(() => renderRoute()).catch(() => {});
    return `
      <section class="section">
        <div class="container">
          <a class="back-link" href="#/forum">${icon('arrowLeft')} Retour au forum</a>
          <div class="loading-state">
            <span class="loading-spinner" aria-hidden="true"></span>
            <p>Chargement de la discussion…</p>
          </div>
        </div>
      </section>`;
  }
  const related = forumThreads.filter(item => item.id !== thread.id).slice(0, 3);
  const liked = likedThreads.has(thread.id);
  return `
    <section class="thread-hero">
      <div class="thread-hero-glow" aria-hidden="true"></div>
      <div class="container">
        <a class="back-link" href="#/forum">${icon('arrowLeft')} Retour au forum</a>
        <div class="thread-hero-inner">
          <div class="thread-hero-top">
            <span class="thread-category cat--${normalizeCategory(thread.category)}">${escapeHTML(thread.category)}</span>
            ${thread.pinned ? `<span class="pin-label">${icon('target')} Épinglé</span>` : ''}
            <span class="thread-time">${escapeHTML(timeAgo(thread.createdAt) || thread.time)}</span>
          </div>
          <h1>${escapeHTML(thread.title)}</h1>
          <p class="thread-hero-excerpt">${escapeHTML(thread.excerpt)}</p>
          <div class="thread-author-row">
            <span class="mini-avatar avatar--${thread.avatarColor}">${escapeHTML(thread.initials || initials(thread.author))}</span>
            <div><strong>${escapeHTML(thread.author)}</strong><span>${escapeHTML(thread.grade || 'Membre MEDIL')}</span></div>
            <span class="thread-author-sep"></span>
            <span class="thread-hero-stat">${icon('forum')} <strong>${thread.replies}</strong> réponses</span>
            <span class="thread-hero-stat">${icon('eye')} <strong>${thread.views}</strong> vues</span>
          </div>
        </div>
      </div>
    </section>
    <section class="section thread-section">
      <div class="container thread-layout">
        <main class="thread-main">
          <article class="thread-post">
            <div class="post-head">
              <span class="post-avatar avatar--${thread.avatarColor}">${escapeHTML(thread.initials || initials(thread.author))}</span>
              <div><strong>${escapeHTML(thread.author)}</strong><span>${escapeHTML(thread.grade || 'Membre MEDIL')} · ${escapeHTML(thread.time)}</span></div>
              <button class="icon-button" data-soon="Les options de modération arrivent bientôt." aria-label="Options du message">${icon('chevronDown')}</button>
            </div>
            <div class="post-content">${paragraphs(thread.content)}</div>
            <div class="post-tags">${thread.tags.map(tag => `<span>#${escapeHTML(tag)}</span>`).join('')}</div>
            <div class="post-actions">
              <button class="post-action ${liked ? 'is-active' : ''}" data-like-thread="${thread.id}">${icon('heart')} <span data-like-count="${thread.id}">${thread.upvotes || 0}</span> utile${liked ? 's' : ''}</button>
              <button class="post-action" data-copy-link>${icon('arrowUpRight')} Partager</button>
              <button class="post-action" data-reply-focus>${icon('forum')} Répondre</button>
            </div>
          </article>

          <div class="replies-heading">
            <h2>Réponses <span>${thread.replies}</span></h2>
            <span class="replies-sort">Les plus utiles ${icon('chevronDown')}</span>
          </div>
          <div class="replies-list" id="replies-list">
            ${thread.answers.length
              ? thread.answers.map(answer => replyMarkup(answer)).join('')
              : `<div class="no-replies"><span>${icon('forum')}</span><strong>Personne n’a encore répondu.</strong><p>Sois le premier à débloquer ce sujet — une piste, un début de preuve ou une question suffit.</p><button class="text-link text-link--dark" data-reply-focus>Écrire la première réponse ${icon('arrowRight')}</button></div>`}
          </div>

          <div class="reply-composer" id="reply-composer">
            <div class="reply-composer-head">
              <span class="post-avatar ${currentUser ? 'avatar--lime' : 'avatar--more'}">${currentUser ? escapeHTML(initials(currentUser.name)) : '?'}</span>
              <div><strong>${currentUser ? escapeHTML(currentUser.name) : 'Participer à la discussion'}</strong><span>${currentUser ? 'Membre MEDIL' : 'Ton prénom sera affiché avec ta réponse.'}</span></div>
            </div>
            <form data-reply-form data-thread-id="${thread.id}">
              ${currentUser ? '' : '<label class="field-label" for="guest-name">Ton prénom</label><input class="input" id="guest-name" name="name" type="text" placeholder="Ex. Sami" maxlength="40" required>'}
              <label class="field-label" for="reply-content">Ta réponse</label>
              <textarea class="textarea" id="reply-content" name="reply" placeholder="Explique ton idée, partage une piste ou remercie…" minlength="3" required></textarea>
              <div class="reply-composer-bottom">
                <span>${icon('lightbulb')} Reste précis et bienveillant.</span>
                <button class="btn btn--lime" type="submit">Publier la réponse ${icon('send')}</button>
              </div>
            </form>
          </div>
        </main>
        <aside class="thread-sidebar">
          <div class="forum-side-card">
            <p class="eyebrow"><span class="eyebrow-dot"></span>Dans le même esprit</p>
            <div class="related-threads">
              ${related.map(item => `<a href="#/forum/${item.id}"><span class="related-category cat--${normalizeCategory(item.category)}">${escapeHTML(item.category)}</span><strong>${escapeHTML(item.title)}</strong><small>${item.replies} réponses · ${escapeHTML(item.time)}</small></a>`).join('')}
            </div>
          </div>
          <div class="forum-side-card forum-side-card--dark">
            <p class="eyebrow eyebrow--light"><span class="eyebrow-dot"></span>La maison</p>
            <h3>Une communauté, une charte.</h3>
            <p>Pas de moqueries, pas de réponses sèches. On explique, on cite ses sources, on laisse les autres chercher.</p>
            <a class="text-link" href="#/forum">Lire la charte ${icon('arrowUpRight')}</a>
          </div>
          <div class="forum-side-card mini-stats-card">
            <p class="eyebrow"><span class="eyebrow-dot"></span>Ce sujet</p>
            <div class="mini-stat-row"><strong>${thread.replies}</strong><span>réponses</span></div>
            <div class="mini-stat-row"><strong>${thread.views}</strong><span>vues</span></div>
            <div class="mini-stat-row"><strong>${thread.upvotes}</strong><span>utile</span></div>
          </div>
        </aside>
      </div>
    </section>`;
}

function replyMarkup(answer, isNew = false) {
  return `
    <article class="reply-card ${isNew ? 'reply-card--new' : ''}" id="reply-${escapeAttr(answer.id)}">
      <div class="post-head">
        <span class="post-avatar avatar--${escapeAttr(answer.avatarColor || 'lime')}">${escapeHTML(answer.initials || initials(answer.author))}</span>
        <div><strong>${escapeHTML(answer.author)}</strong><span>${escapeHTML(answer.grade || 'Membre MEDIL')} · ${escapeHTML(timeAgo(answer.createdAt) || answer.time)}</span></div>
        <span class="reply-number">#${String(answer.number || 1).padStart(2, '0')}</span>
      </div>
      <div class="post-content">${paragraphs(answer.text)}</div>
      <div class="reply-actions">
        <button class="post-action ${likedReplies.has(answer.id) ? 'is-active' : ''}" data-upvote-reply="${escapeAttr(answer.id)}">${icon('heart')} <span>${answer.upvotes || 0}</span> utile</button>
        <button class="post-action" data-reply-focus>${icon('forum')} Répondre</button>
      </div>
    </article>`;
}

function renderNotFound(title, description, href = '#/', label = 'Retour à l’accueil') {
  return `
    <section class="not-found-section">
      <div class="not-found-art" aria-hidden="true">404</div>
      <div class="container not-found-inner">
        <p class="eyebrow"><span class="eyebrow-dot"></span>Hors programme</p>
        <h1>${escapeHTML(title)}</h1>
        <p>${escapeHTML(description)}</p>
        <a class="btn btn--dark" href="${href}">${icon('arrowLeft')} ${escapeHTML(label)}</a>
      </div>
    </section>`;
}

/* --------------------------------------------------------------------------
   Modales de contenu
   -------------------------------------------------------------------------- */
function openExerciseModal(id) {
  const exercise = EXERCISES.find(item => item.id === id);
  if (!exercise) return;
  if (!exercise.statement) {
    loadExerciseDetail(id).then(() => openExerciseModal(id)).catch(() => {});
    toast('Chargement de l’exercice…', { type: 'success', duration: 1200 });
    return;
  }
  const saved = savedExercises.has(exercise.id);
  const course = COURSES.find(item => item.subject === exercise.subject && (item.level === exercise.level || !exercise.level.includes('*'))) || COURSES.find(item => item.subject === exercise.subject);
  openModal(`
    <div class="exercise-modal">
      <div class="exercise-modal-head">
        <div class="exercise-modal-badges">
          <span class="source-badge">${escapeHTML(exercise.source)}</span>
          <span class="reader-badge">${escapeHTML(exercise.subject)}</span>
          <span class="reader-badge">${escapeHTML(exercise.level)}</span>
        </div>
        <h2>${escapeHTML(exercise.title)}</h2>
        <div class="exercise-modal-meta">
          ${starRow(exercise.stars)}
          <span>${icon('clock')} ${exercise.minutes} min</span>
          <span>${icon('checkCircle')} Corrigé détaillé</span>
          <span>${icon('users')} ${exercise.solves.toLocaleString('fr-FR')} élèves l’ont tenté</span>
        </div>
      </div>
      <div class="exercise-modal-body">
        <div class="exercise-statement-panel">
          <div class="panel-label">${icon('file')} Énoncé</div>
          <div class="exercise-statement">${exercise.statement}</div>
          <div class="exercise-hero-equation">${tex(exercise.equation, true)}</div>
          <div class="hint-box">
            <button class="hint-toggle" data-toggle-hint>${icon('lightbulb')} Un indice, si tu bloques <span>+</span></button>
            <div class="hint-content" data-hint-content hidden>
              <p>${exercise.hint}</p>
            </div>
          </div>
        </div>
        <div class="solution-panel">
          <div class="panel-label">${icon('sparkles')} Correction guidée</div>
          <div class="solution-locked" data-solution-locked>
            <span class="solution-lock-icon">${icon('lock')}</span>
            <h3>Cherche d’abord. Ensuite, vérifie.</h3>
            <p>Une correction lue trop tôt s’oublie vite. Prends 5 minutes, pose tes idées, puis compare.</p>
            <button class="btn btn--lime" data-reveal-exercise-solution>Révéler la correction ${icon('arrowRight')}</button>
          </div>
          <div class="full-solution" data-full-solution hidden>
            ${exercise.solution.map((step, index) => `
              <div class="full-solution-step">
                <span class="solution-step-number">${String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>${escapeHTML(step.title)}</h3>
                  <p>${step.text}</p>
                  ${step.equation ? `<div class="solution-equation">${tex(step.equation, true)}</div>` : ''}
                </div>
              </div>`).join('')}
            <div class="final-answer"><span>${icon('checkCircle')} Réponse finale</span><div>${tex(exercise.answer, true)}</div></div>
            <div class="solution-verified">${icon('checkCircle')} Vérifié par un professeur de CPGE · 2 relectures</div>
          </div>
        </div>
      </div>
      <div class="exercise-modal-footer">
        <div class="exercise-modal-actions">
          <button class="btn btn--outline ${saved ? 'is-saved' : ''}" data-save-exercise="${exercise.id}" data-modal-save aria-pressed="${saved}">${icon('bookmark')} ${saved ? 'Enregistré' : 'Enregistrer'}</button>
          <button class="btn btn--outline" data-print-exercise>${icon('print')} Imprimer / PDF</button>
          ${course ? `<a class="btn btn--dark" href="#/cours/${course.id}" data-close-and-nav>Voir le cours lié ${icon('arrowUpRight')}</a>` : ''}
        </div>
        ${exercise.pdf ? `<div class="exercise-pdf-preview"><p class="panel-label">${icon('file')} PDF associé</p><iframe data-lazy-pdf="${escapeAttr(exercise.pdf)}" title="PDF de l’exercice" loading="lazy"></iframe><a class="text-link" href="${escapeAttr(exercise.pdf)}" target="_blank" rel="noopener">Ouvrir le PDF ${icon('arrowUpRight')}</a></div>` : ''}
        <button class="modal-secondary-link" data-close-modal>Fermer ${icon('close')}</button>
      </div>
    </div>`, { size: 'wide', label: `Exercice : ${exercise.title}`, className: 'modal--exercise' });
}

function paperSheet(paper) {
  const subjectContent = paper.subject === 'Physique'
    ? `<h3>Exercice 1 — Optique géométrique</h3><p>On considère une lunette astronomique afocale constituée d’un objectif de distance focale <span class="inline-tex" data-tex="f'_1 = 1{,}00\\,\\mathrm{m}"></span> et d’un oculaire de distance focale <span class="inline-tex" data-tex="f'_2 = 2{,}00\\,\\mathrm{cm}"></span>.</p><p><strong>1.</strong> Faire un schéma de la lunette en position afocale et placer le cercle oculaire.</p><p><strong>2.</strong> Exprimer le grossissement <span class="inline-tex" data-tex="G"></span> en fonction des focales, puis le calculer.</p><p><strong>3.</strong> La lunette est-elle adaptée à l’observation de la Lune ? Justifier.</p><div class="paper-formula">${tex("G=\\frac{\\alpha'}{\\alpha}=-\\frac{f'_1}{f'_2}")}</div><h3>Exercice 2 — Électromagnétisme</h3><p>Un cylindre conducteur infini de rayon <span class="inline-tex" data-tex="a"></span> porte une densité surfacique de charge uniforme <span class="inline-tex" data-tex="\\sigma"></span>. Déterminer le champ électrique en tout point de l’espace.</p>`
    : paper.subject === 'Informatique'
      ? `<h3>Exercice 1 — Algorithmique</h3><p>On dispose d’un tableau d’entiers trié par ordre croissant. On souhaite compter le nombre d’occurrences d’une valeur <span class="inline-tex" data-tex="x"></span> en temps <span class="inline-tex" data-tex="O(\\log n)"></span>.</p><p><strong>1.</strong> Écrire une fonction <code>recherche_gauche</code> qui renvoie l’indice de la première occurrence de <span class="inline-tex" data-tex="x"></span>.</p><p><strong>2.</strong> En déduire une fonction <code>compter</code> en <span class="inline-tex" data-tex="O(\\log n)"></span> et justifier sa complexité.</p><p><strong>3.</strong> Prouver la terminaison et la correction de la recherche.</p><div class="paper-formula">${tex("T(n)=2T(n/2)+O(1)=O(\\log n)")}</div><h3>Exercice 2 — Programmation</h3><p>Écrire une fonction Python qui prend en entrée un arbre binaire et renvoie sa hauteur, puis sa largeur maximale.</p>`
      : `<h3>Problème 1 — Algèbre linéaire</h3><p>Soit <span class="inline-tex" data-tex="E"></span> un espace vectoriel réel de dimension finie <span class="inline-tex" data-tex="n\\ge 1"></span>, et <span class="inline-tex" data-tex="u\\in\\mathcal{L}(E)"></span>. On note <span class="inline-tex" data-tex="\\pi_u"></span> son polynôme minimal et <span class="inline-tex" data-tex="\\chi_u"></span> son polynôme caractéristique.</p><p><strong>Partie A.</strong> Montrer que <span class="inline-tex" data-tex="\\pi_u"></span> divise <span class="inline-tex" data-tex="\\chi_u"></span> et que les deux polynômes ont les mêmes racines.</p><p><strong>Partie B.</strong> On suppose <span class="inline-tex" data-tex="u"></span> diagonalisable. Caractériser les sous-espaces stables par <span class="inline-tex" data-tex="u"></span> à l’aide des espaces propres.</p><div class="paper-formula">${tex("\\chi_u(u)=0 \\quad \\text{et} \\quad \\pi_u \\mid \\chi_u")}</div><h3>Problème 2 — Suites et séries</h3><p>Pour <span class="inline-tex" data-tex="n\\ge 1"></span>, on pose <span class="inline-tex" data-tex="f_n(x)=x(1-x)^n"></span> sur <span class="inline-tex" data-tex="[0,1]"></span>. Étudier la convergence simple, puis la convergence uniforme de la suite <span class="inline-tex" data-tex="(f_n)"></span>.</p><div class="paper-formula">${tex("f_n\\!\\left(\\frac1n\\right)\\to \\frac1e")}</div>`;
  return `
    <div class="paper-sheet">
      <div class="sheet-head">
        <span class="sheet-school">${escapeHTML(paper.school)}</span>
        <span class="sheet-session">Session ${paper.year}</span>
      </div>
      <div class="sheet-title-block">
        <span>Concours ${escapeHTML(paper.school)} · Filière ${escapeHTML(paper.track)}</span>
        <h2>${escapeHTML(paper.title)}</h2>
        <div class="sheet-meta"><span>Durée : ${paper.duration}</span><span>${escapeHTML(paper.subject)}</span><span>${paper.parts}</span></div>
      </div>
      <div class="sheet-instructions">L’usage de la calculatrice est interdit. La qualité de la rédaction, la clarté et la précision des raisonnements entreront pour une part importante dans l’appréciation des copies.</div>
      ${subjectContent}
      <div class="sheet-footer"><span>MEDIL · Banque de concours</span><span>Page 1 / 4</span></div>
    </div>`;
}

function paperCorrection(paper) {
  return `
    <div class="paper-sheet paper-sheet--solution">
      <div class="sheet-head">
        <span class="sheet-school">Corrigé MEDIL</span>
        <span class="sheet-session">${escapeHTML(paper.school)} · ${paper.year}</span>
      </div>
      <div class="sheet-title-block">
        <span>Corrigé guidé · Filière ${escapeHTML(paper.track)}</span>
        <h2>${escapeHTML(paper.title)}</h2>
        <div class="sheet-meta"><span>${escapeHTML(paper.subject)}</span><span>Rédaction détaillée</span><span>Vérifié</span></div>
      </div>
      <div class="correction-intro"><span class="sheet-verified">${icon('checkCircle')}</span><div><strong>Une correction pensée pour progresser.</strong><p>On détaille les étapes-clés, les hypothèses et les pièges. À lire après avoir cherché, pas avant.</p></div></div>
      <h3>1. Les idées directrices</h3>
      <p><strong>${paper.subject === 'Physique' ? 'Faire le schéma avant les formules.' : paper.subject === 'Informatique' ? 'Fixer l’invariant avant de coder.' : 'Identifier la structure avant de calculer.'}</strong> Commence par repérer les hypothèses qui vont porter la preuve. La difficulté de ces sujets ne vient pas des calculs, mais du choix de l’outil adapté.</p>
      <div class="paper-formula">${tex(paper.subject === 'Physique' ? "G=-\\frac{f'_1}{f'_2}" : paper.subject === 'Informatique' ? "T(n)=O(\\log n)" : "\\ker P(u)=\\bigoplus \\ker P_i(u)")}</div>
      <h3>2. Rédaction-type</h3>
      <p>On rappelle le théorème avec ses hypothèses exactes, on applique, puis on conclut explicitement. Les correcteurs attendent une phrase de conclusion : ne laisse pas la dernière ligne sans commentaire.</p>
      <div class="correction-steps">
        <div><span>01</span><p>Poser les notations et reformuler la question.</p></div>
        <div><span>02</span><p>Vérifier les hypothèses avant d’invoquer un théorème.</p></div>
        <div><span>03</span><p>Écrire la conclusion au propre, en une phrase.</p></div>
      </div>
      <h3>3. Les pièges à éviter</h3>
      <p>Ne confonds pas la stabilité d’un sous-espace et l’inclusion des espaces propres. Ne saute pas la justification du signe en physique. En informatique, sépare clairement correction et terminaison.</p>
      <div class="sheet-footer"><span>MEDIL · Correction vérifiée</span><span>Corrigé complet disponible</span></div>
    </div>`;
}

function openPaperModal(id) {
  const paper = PAPERS.find(item => item.id === id);
  if (!paper) return;
  openModal(`
    <div class="paper-modal">
      <div class="paper-modal-head">
        <span class="paper-logo paper-logo--large logo--${paper.color}">${escapeHTML(paper.short)}</span>
        <div>
          <span class="paper-overline">${escapeHTML(paper.school)} · Session ${paper.year}</span>
          <h2>${escapeHTML(paper.title)}</h2>
          <div class="paper-modal-meta"><span>${escapeHTML(paper.track)}</span><span>${escapeHTML(paper.subject)}</span><span>${paper.duration}</span><span>${paper.parts}</span></div>
        </div>
        <span class="paper-modal-badge">${paper.correction ? `${icon('checkCircle')} Corrigé inclus` : `${icon('clock')} Corrigé à venir`}</span>
      </div>
      <div class="paper-tabs">
        <button class="paper-tab is-active" data-paper-tab="sujet">Énoncé</button>
        ${paper.correction ? '<button class="paper-tab" data-paper-tab="corrige">Corrigé guidé</button>' : '<button class="paper-tab is-disabled" disabled>Corrigé bientôt</button>'}
        <span class="paper-tab-note">Aperçu de démonstration</span>
      </div>
      <div class="paper-preview-scroll">
        ${paper.correction ? `<div data-paper-panel="corrige" hidden>${paperCorrection(paper)}</div>` : ''}
        <div data-paper-panel="sujet">${paperSheet(paper)}</div>
      </div>
      ${paper.pdf ? `<div class="paper-pdf-preview"><p class="panel-label">${icon('file')} PDF associé</p><iframe data-lazy-pdf="${escapeAttr(paper.pdf)}" title="PDF du sujet" loading="lazy"></iframe><a class="text-link" href="${escapeAttr(paper.pdf)}" target="_blank" rel="noopener">Ouvrir le PDF ${icon('arrowUpRight')}</a></div>` : ''}
      <div class="paper-modal-footer">
        <div class="paper-modal-note">${icon('download')} Téléchargement disponible en PDF haute qualité.</div>
        <div class="paper-modal-actions">
          <button class="btn btn--outline" data-print-paper>${icon('print')} Imprimer / PDF</button>
          <button class="btn btn--lime" data-soon="Le téléchargement complet arrive avec la version bêta.">Télécharger ${icon('download')}</button>
          ${paper.pdf ? `<a class="btn btn--dark" href="${escapeAttr(paper.pdf)}" target="_blank" rel="noopener">${icon('file')} Ouvrir le PDF</a>` : ''}
        </div>
      </div>
    </div>`, { size: 'wide', label: `Sujet : ${paper.title} ${paper.year}`, className: 'modal--paper' });
}

/* --------------------------------------------------------------------------
   Auth, profil & création de sujet
   -------------------------------------------------------------------------- */
function openAuthModal(mode = 'signup') {
  const isLogin = mode === 'login';
  openModal(`
    <div class="auth-modal">
      <div class="auth-art">
        <span class="auth-art-mark">M</span>
        <p class="eyebrow eyebrow--light"><span class="eyebrow-dot"></span>MEDIL</p>
        <h2>${isLogin ? 'Content de te revoir.' : 'Bienvenue dans la promo.'}</h2>
        <p>${isLogin ? 'Retrouve tes cours, tes exercices et tes discussions.' : 'Cours, exos, concours et une communauté qui avance ensemble.'}</p>
        <div class="auth-quote">
          <p>« Le bon déclic, au bon moment. C’est tout ce que je demandais à une plateforme de prépa. »</p>
          <span><span class="mini-avatar avatar--lime">LB</span> Lina, MP* à Ginette</span>
        </div>
        <div class="auth-art-stars" aria-hidden="true">✦ ✦</div>
      </div>
      <div class="auth-form-side">
        <div class="auth-switch">
          <button class="${isLogin ? '' : 'is-active'}" data-open-auth="signup">S’inscrire</button>
          <button class="${isLogin ? 'is-active' : ''}" data-open-auth="login">Se connecter</button>
        </div>
        <h3>${isLogin ? 'Se connecter' : 'Créer ton compte'}</h3>
        <p class="auth-form-sub">${isLogin ? 'Ton espace t’attend.' : 'Gratuit. En moins de trente secondes.'}</p>
        <form data-auth-form="${isLogin ? 'login' : 'signup'}">
          ${isLogin ? '' : '<label class="field-label" for="auth-name">Prénom et nom</label><input class="input" id="auth-name" name="name" type="text" placeholder="Ex. Sami El Amrani" autocomplete="name" required>'}
          <label class="field-label" for="auth-email">Adresse e-mail</label>
          <input class="input" id="auth-email" name="email" type="email" placeholder="toi@exemple.fr" autocomplete="email" required>
          <label class="field-label" for="auth-password">Mot de passe</label>
          <input class="input" id="auth-password" name="password" type="password" placeholder="8 caractères minimum" minlength="8" autocomplete="${isLogin ? 'current-password' : 'new-password'}" required>
          ${isLogin ? '<button type="button" class="auth-forgot" data-soon="La récupération de mot de passe arrive bientôt.">Mot de passe oublié ?</button>' : '<label class="auth-terms"><input type="checkbox" required> J’accepte les règles de la communauté et la politique de confidentialité.</label>'}
          <button class="btn btn--lime btn--full btn--lg" type="submit">${isLogin ? 'Entrer dans mon espace' : 'Rejoindre MEDIL'} ${icon('arrowRight')}</button>
        </form>
        <p class="auth-bottom-note">${isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'} <button data-open-auth="${isLogin ? 'signup' : 'login'}">${isLogin ? 'S’inscrire' : 'Se connecter'}</button></p>
      </div>
    </div>`, { size: 'wide', label: isLogin ? 'Connexion' : 'Créer un compte', className: 'modal--auth' });
}

function openProfileModal() {
  if (!currentUser) return openAuthModal('login');
  const completedCount = COURSES.filter(course => completedItems.has(course.id)).length;
  const savedCount = savedCourses.size + savedExercises.size;
  openModal(`
    <div class="profile-modal">
      <div class="profile-head">
        <span class="profile-avatar">${escapeHTML(initials(currentUser.name))}</span>
        <div><p class="eyebrow"><span class="eyebrow-dot"></span>Mon espace</p><h2>${escapeHTML(currentUser.name)}</h2><p>${escapeHTML(currentUser.email)}</p></div>
      </div>
      <div class="profile-stats">
        <div><strong>${savedCount}</strong><span>ressources sauvegardées</span></div>
        <div><strong>${completedCount}</strong><span>cours terminés</span></div>
        <div><strong>${currentUser.streak || 3}</strong><span>jours de série</span></div>
      </div>
      <div class="profile-shortcuts">
        <a href="#/cours" data-close-and-nav class="profile-shortcut">${icon('book')} Continuer mes cours ${icon('arrowUpRight')}</a>
        <a href="#/exercices" data-close-and-nav class="profile-shortcut">${icon('target')} Mes exercices ${icon('arrowUpRight')}</a>
        <a href="#/forum" data-close-and-nav class="profile-shortcut">${icon('forum')} Mes discussions ${icon('arrowUpRight')}</a>
      </div>
      <div class="profile-footer">
        <button class="btn btn--outline" data-logout>${icon('logout')} Se déconnecter</button>
        <button class="modal-secondary-link" data-close-modal>Fermer</button>
      </div>
    </div>`, { label: 'Mon profil', className: 'modal--profile' });
}

function openNewThreadModal() {
  const categories = ['Maths', 'Physique', 'Informatique', 'Concours', 'Méthode'];
  openModal(`
    <div class="new-thread-modal">
      <p class="eyebrow"><span class="eyebrow-dot"></span>Nouvelle discussion</p>
      <h2>Qu’est-ce qui te bloque ?</h2>
      <p class="modal-intro">Un bon titre, un contexte clair, et ce que tu as déjà essayé. C’est la recette d’une réponse utile.</p>
      <form data-new-thread-form>
        <label class="field-label" for="thread-title">Titre du sujet</label>
        <input class="input" id="thread-title" name="title" type="text" placeholder="Ex. Une CNS pour que f et g commutent" minlength="8" maxlength="120" required>
        <div class="form-row">
          <div>
            <label class="field-label" for="thread-category">Matière</label>
            <label class="select-wrap select-wrap--field">
              <select id="thread-category" name="category" required>
                ${categories.map(category => `<option value="${category}">${category}</option>`).join('')}
              </select>
              ${icon('chevronDown')}
            </label>
          </div>
          <div>
            <label class="field-label" for="thread-level">Niveau</label>
            <label class="select-wrap select-wrap--field">
              <select id="thread-level" name="level">
                <option>MPSI</option><option selected>MP</option><option>MP*</option>
              </select>
              ${icon('chevronDown')}
            </label>
          </div>
        </div>
        <label class="field-label" for="thread-content">Ton message</label>
        <textarea class="textarea" id="thread-content" name="content" placeholder="Recopie l’énoncé, explique ton blocage et les pistes que tu as déjà explorées…" minlength="20" required></textarea>
        <div class="new-thread-actions">
          <span>${icon('checkCircle')} La charte s’applique à chaque message.</span>
          <button class="btn btn--lime btn--lg" type="submit">Publier le sujet ${icon('send')}</button>
        </div>
      </form>
    </div>`, { label: 'Créer une discussion', size: 'wide', className: 'modal--new-thread' });
}

/* --------------------------------------------------------------------------
   Recherche globale
   -------------------------------------------------------------------------- */
function ensureSearchOverlay() {
  let overlay = $('#search-overlay');
  if (overlay) return overlay;
  overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.className = 'search-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="search-backdrop" data-close-search></div>
    <div class="search-panel" role="dialog" aria-modal="true" aria-label="Recherche globale">
      <div class="search-input-row">
        <span class="search-input-icon">${icon('search')}</span>
        <input id="search-input" type="search" placeholder="Chercher un cours, un exo, un sujet…" autocomplete="off" aria-label="Rechercher">
        <kbd>ESC</kbd>
        <button class="search-close" data-close-search aria-label="Fermer la recherche">${icon('close')}</button>
      </div>
      <div class="search-content" id="search-content"></div>
      <div class="search-footer">
        <span><kbd>↑</kbd><kbd>↓</kbd> naviguer</span>
        <span><kbd>↵</kbd> ouvrir</span>
        <span class="search-footer-brand"><span class="study-brand-mark">M</span> MEDIL Search</span>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#search-input').addEventListener('input', event => updateSearchResults(event.target.value));
  return overlay;
}

function openSearch(initialQuery = '') {
  if ($('#modal-root')?.innerHTML) return;
  if ($('#mobile-panel')?.classList.contains('is-open')) toggleMobileMenu(false);
  const overlay = ensureSearchOverlay();
  overlay.hidden = false;
  document.body.classList.add('no-scroll');
  requestAnimationFrame(() => overlay.classList.add('is-open'));
  const input = $('#search-input');
  input.value = initialQuery;
  updateSearchResults(initialQuery);
  setTimeout(() => input.focus(), 60);
}

function closeSearch() {
  const overlay = $('#search-overlay');
  if (!overlay || overlay.hidden) return;
  overlay.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  setTimeout(() => { overlay.hidden = true; }, 180);
}

function normalizeSearch(value) {
  return String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function timeAgo(timestamp) {
  if (!timestamp) return null;
  const seconds = Math.floor((Date.now() - Number(timestamp)) / 1000);
  if (seconds < 60) return 'à l’instant';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days} j`;
}

function exerciseSearchText(exercise) {
  const solutionText = (exercise.solution || []).map(step => `${step.title} ${step.text} ${step.equation || ''}`).join(' ');
  return `${exercise.title} ${exercise.teaser} ${exercise.source} ${exercise.tag} ${exercise.level} ${exercise.statement} ${exercise.hint || ''} ${exercise.answer || ''} ${solutionText}`.replace(/<[^>]*>/g, ' ');
}

function highlightMatch(text, query) {
  if (!query) return escapeHTML(text);
  const normalizedText = normalizeSearch(text);
  const normalizedQuery = normalizeSearch(query);
  const index = normalizedText.indexOf(normalizedQuery);
  if (index === -1) return escapeHTML(text);
  // Map each normalized character back to its original position so accents
  // and case differences do not desynchronize the slices.
  const map = [];
  for (let i = 0; i < text.length; i++) {
    const normalized = normalizeSearch(text[i]);
    if (normalized.length === 0) map.push(i);
    else for (let j = 0; j < normalized.length; j++) map.push(i);
  }
  const start = map[index];
  const end = map[index + normalizedQuery.length - 1] + 1;
  return `${escapeHTML(text.slice(0, start))}<mark>${escapeHTML(text.slice(start, end))}</mark>${escapeHTML(text.slice(end))}`;
}

function searchResultIcon(type) {
  return type === 'course' ? 'book' : type === 'exercise' ? 'target' : type === 'paper' ? 'file' : 'forum';
}

function searchResult(type, id, title, meta, query) {
  return `<button class="search-result" data-search-type="${type}" data-search-id="${escapeAttr(id)}">
    <span class="search-result-icon search-result-icon--${type}">${icon(searchResultIcon(type))}</span>
    <span class="search-result-copy"><strong>${highlightMatch(title, query)}</strong><span>${escapeHTML(meta)}</span></span>
    <span class="search-result-arrow">${icon('arrowUpRight')}</span>
  </button>`;
}

function updateSearchResults(rawQuery) {
  const content = $('#search-content');
  if (!content) return;
  const query = rawQuery.trim();
  if (!query) {
    content.innerHTML = `
      <div class="search-suggestions">
        <p class="search-section-label">Recherches populaires</p>
        <div class="search-chips">
          ${['nilpotente', 'CCINP 2025', 'Maxwell', 'dichotomie', 'réduction'].map(term => `<button data-search-suggestion="${term}">${icon('search')} ${term}</button>`).join('')}
        </div>
        <p class="search-section-label">Aller directement</p>
        <div class="search-shortcuts">
          <a href="#/cours" data-close-search>${icon('book')} <span><strong>Les cours</strong><small>${COURSES.length} cours complets</small></span>${icon('arrowRight')}</a>
          <a href="#/exercices" data-close-search>${icon('target')} <span><strong>Les exercices</strong><small>Corrigés pas à pas</small></span>${icon('arrowRight')}</a>
          <a href="#/concours" data-close-search>${icon('trophy')} <span><strong>La banque de concours</strong><small>${PAPERS.length} sujets</small></span>${icon('arrowRight')}</a>
          <a href="#/forum" data-close-search>${icon('forum')} <span><strong>Le forum</strong><small>128 membres en ligne</small></span>${icon('arrowRight')}</a>
        </div>
      </div>`;
    return;
  }

  const q = normalizeSearch(query);
  const courses = COURSES.filter(course => normalizeSearch(`${course.title} ${course.description} ${course.tag} ${course.subject} ${(course.objectives || []).join(' ')}`).includes(q)).slice(0, 4);
  const exercises = EXERCISES.filter(exercise => normalizeSearch(exerciseSearchText(exercise)).includes(q)).slice(0, 4);
  const papers = PAPERS.filter(paper => normalizeSearch(`${paper.title} ${paper.school} ${paper.year} ${paper.subject} ${paper.track}`).includes(q)).slice(0, 4);
  const threads = forumThreads.filter(thread => normalizeSearch(`${thread.title} ${thread.excerpt} ${thread.tags.join(' ')} ${thread.author}`).includes(q)).slice(0, 3);
  const total = courses.length + exercises.length + papers.length + threads.length;

  if (!total) {
    content.innerHTML = `<div class="search-empty"><span>${icon('search')}</span><h3>Aucun résultat pour « ${escapeHTML(query)} ».</h3><p>Essaie un mot-clé plus court, ou navigue directement dans la bibliothèque.</p><a class="btn btn--outline" href="#/cours" data-close-search>Voir tous les cours ${icon('arrowRight')}</a></div>`;
    return;
  }

  content.innerHTML = `
    ${courses.length ? `<div class="search-group"><p class="search-section-label">Cours <span>${courses.length}</span></p>${courses.map(course => searchResult('course', course.id, course.title, `${course.subject} · ${course.level} · ${course.chaptersCount} chapitres`, query)).join('')}</div>` : ''}
    ${exercises.length ? `<div class="search-group"><p class="search-section-label">Exercices <span>${exercises.length}</span></p>${exercises.map(exercise => searchResult('exercise', exercise.id, exercise.title, `${exercise.source} · ${exercise.subject}`, query)).join('')}</div>` : ''}
    ${papers.length ? `<div class="search-group"><p class="search-section-label">Concours <span>${papers.length}</span></p>${papers.map(paper => searchResult('paper', paper.id, `${paper.title} — ${paper.year}`, `${paper.school} · ${paper.subject}`, query)).join('')}</div>` : ''}
    ${threads.length ? `<div class="search-group"><p class="search-section-label">Forum <span>${threads.length}</span></p>${threads.map(thread => searchResult('thread', thread.id, thread.title, `${thread.category} · ${thread.replies} réponses`, query)).join('')}</div>` : ''}
    <p class="search-total">${total} résultat${total > 1 ? 's' : ''} pour « ${escapeHTML(query)} »</p>`;
}

/* --------------------------------------------------------------------------
   Filtres
   -------------------------------------------------------------------------- */
function renderPagination(container, total, state, onChange) {
  if (!container) return;
  const totalPages = Math.max(1, Math.ceil(total / state.size));
  if (state.page > totalPages) state.page = totalPages;
  if (state.page < 1) state.page = 1;
  if (totalPages <= 1) { container.innerHTML = ''; return; }
  const buttons = [];
  buttons.push(`<button class="page-btn" data-page-nav="prev" ${state.page === 1 ? 'disabled' : ''} aria-label="Page précédente">‹</button>`);
  for (let page = 1; page <= totalPages; page += 1) {
    if (page === 1 || page === totalPages || Math.abs(page - state.page) <= 1) {
      buttons.push(`<button class="page-btn ${page === state.page ? 'is-active' : ''}" data-page="${page}">${page}</button>`);
    } else if (Math.abs(page - state.page) === 2) {
      buttons.push(`<span class="page-ellipsis">…</span>`);
    }
  }
  buttons.push(`<button class="page-btn" data-page-nav="next" ${state.page === totalPages ? 'disabled' : ''} aria-label="Page suivante">›</button>`);
  container.innerHTML = `<nav class="pagination" aria-label="Pagination">${buttons.join('')}</nav>`;
  container.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', () => {
      state.page = Number(button.dataset.page);
      onChange();
    });
  });
  const prev = container.querySelector('[data-page-nav="prev"]');
  const next = container.querySelector('[data-page-nav="next"]');
  if (prev) prev.addEventListener('click', () => { if (state.page > 1) { state.page -= 1; onChange(); } });
  if (next) next.addEventListener('click', () => { if (state.page < totalPages) { state.page += 1; onChange(); } });
}

function applyCourseFilters() {
  const grid = $('#course-grid');
  if (!grid) return;
  const cards = $$('[data-course-id]', grid);
  const filtered = [];
  cards.forEach(card => {
    const subjectOK = courseFilterState.subject === 'Tous' || card.dataset.subject === courseFilterState.subject;
    const levelOK = courseFilterState.level === 'Tous' || card.dataset.level === courseFilterState.level;
    const match = subjectOK && levelOK;
    card.dataset.matched = match ? '1' : '0';
    if (match) filtered.push(card);
  });
  const state = paginationState.courses;
  const totalPages = Math.max(1, Math.ceil(filtered.length / state.size));
  if (state.page > totalPages) state.page = totalPages;
  if (state.page < 1) state.page = 1;
  const start = (state.page - 1) * state.size;
  const end = start + state.size;
  cards.forEach(card => {
    const match = card.dataset.matched === '1';
    const index = filtered.indexOf(card);
    const onPage = match && index >= start && index < end;
    card.hidden = !onPage;
  });
  const visible = filtered.length;
  const count = $('#course-count');
  if (count) count.textContent = visible;
  const empty = $('#course-empty');
  if (empty) empty.hidden = visible !== 0;
  $$('[data-course-filter]').forEach(button => {
    const key = button.dataset.courseFilter;
    button.classList.toggle('is-active', courseFilterState[key] === button.dataset.value);
  });
  const pager = $('#course-pagination');
  if (pager) renderPagination(pager, visible, state, applyCourseFilters);
  initReveals();
}

function resetCourseFilters() {
  courseFilterState.subject = 'Tous';
  courseFilterState.level = 'Tous';
  applyCourseFilters();
}

function applyExerciseFilters() {
  const grid = $('#exercise-grid');
  if (!grid) return;
  const cards = $$('[data-exercise-card]', grid);
  const filtered = [];
  cards.forEach(card => {
    const subjectOK = exerciseFilterState.subject === 'Tous' || card.dataset.subject === exerciseFilterState.subject;
    const starsOK = exerciseFilterState.stars === 'Tous' || card.dataset.stars === exerciseFilterState.stars;
    const match = subjectOK && starsOK;
    card.dataset.matched = match ? '1' : '0';
    if (match) filtered.push(card);
  });
  const state = paginationState.exercises;
  const totalPages = Math.max(1, Math.ceil(filtered.length / state.size));
  if (state.page > totalPages) state.page = totalPages;
  if (state.page < 1) state.page = 1;
  const start = (state.page - 1) * state.size;
  const end = start + state.size;
  cards.forEach(card => {
    const match = card.dataset.matched === '1';
    const index = filtered.indexOf(card);
    const onPage = match && index >= start && index < end;
    card.hidden = !onPage;
  });
  const visible = filtered.length;
  const count = $('#exercise-count');
  if (count) count.textContent = visible;
  const empty = $('#exercise-empty');
  if (empty) empty.hidden = visible !== 0;
  $$('[data-exercise-filter]').forEach(button => {
    button.classList.toggle('is-active', exerciseFilterState[button.dataset.exerciseFilter] === button.dataset.value);
  });
  const pager = $('#exercise-pagination');
  if (pager) renderPagination(pager, visible, state, applyExerciseFilters);
  initReveals();
}

function resetExerciseFilters() {
  exerciseFilterState.subject = 'Tous';
  exerciseFilterState.stars = 'Tous';
  applyExerciseFilters();
}

function applyPaperFilters() {
  const grid = $('#paper-grid');
  if (!grid) return;
  const cards = $$('[data-paper-card]', grid);
  const q = normalizeSearch(paperFilterState.query.trim());
  const filtered = [];
  cards.forEach(card => {
    const schoolOK = paperFilterState.school === 'Tous' || card.dataset.school === paperFilterState.school;
    const subjectOK = paperFilterState.subject === 'Tous' || card.dataset.subject === paperFilterState.subject;
    const yearOK = paperFilterState.year === 'Tous' || String(card.dataset.year) === String(paperFilterState.year);
    const searchOK = !q || (card.dataset.search || '').includes(q) || normalizeSearch(card.textContent).includes(q);
    const match = schoolOK && subjectOK && yearOK && searchOK;
    card.dataset.matched = match ? '1' : '0';
    if (match) filtered.push(card);
  });
  const state = paginationState.papers;
  const totalPages = Math.max(1, Math.ceil(filtered.length / state.size));
  if (state.page > totalPages) state.page = totalPages;
  if (state.page < 1) state.page = 1;
  const start = (state.page - 1) * state.size;
  const end = start + state.size;
  cards.forEach(card => {
    const match = card.dataset.matched === '1';
    const index = filtered.indexOf(card);
    const onPage = match && index >= start && index < end;
    card.hidden = !onPage;
  });
  const visible = filtered.length;
  const count = $('#paper-count');
  if (count) count.textContent = visible;
  const empty = $('#paper-empty');
  if (empty) empty.hidden = visible !== 0;
  $$('[data-paper-filter]').forEach(button => {
    button.classList.toggle('is-active', paperFilterState[button.dataset.paperFilter] === button.dataset.value);
  });
  const select = $('[data-paper-year]');
  if (select) select.value = String(paperFilterState.year);
  const pager = $('#paper-pagination');
  if (pager) renderPagination(pager, visible, state, applyPaperFilters);
  initReveals();
}

function resetPaperFilters() {
  paperFilterState.school = 'Tous';
  paperFilterState.subject = 'Tous';
  paperFilterState.year = 'Tous';
  paperFilterState.query = '';
  const search = $('[data-paper-search]');
  if (search) search.value = '';
  applyPaperFilters();
}

function applyForumFilters() {
  const list = $('#forum-thread-list');
  if (!list) return;
  let visible = 0;
  const q = normalizeSearch(forumFilterState.query.trim());
  $$('[data-thread-row]', list).forEach(row => {
    const categoryOK = forumFilterState.category === 'Tous' || row.dataset.category === forumFilterState.category;
    const searchOK = !q || (row.dataset.search || '').includes(q) || normalizeSearch(row.textContent).includes(q);
    const show = categoryOK && searchOK;
    row.hidden = !show;
    if (show) visible += 1;
  });
  const count = $('#forum-count');
  if (count) count.textContent = visible;
  const empty = $('#forum-empty');
  if (empty) empty.hidden = visible !== 0;
  $$('[data-forum-filter]').forEach(button => {
    button.classList.toggle('is-active', forumFilterState.category === button.dataset.value);
  });
}

function initPageFilterUI() {
  const courseSearch = new URLSearchParams((location.hash.split('?')[1] || ''));
  const subjectQuery = courseSearch.get('subject');
  if ($('#course-grid')) {
    if (subjectQuery && ['Maths', 'Physique', 'Informatique'].includes(subjectQuery)) {
      courseFilterState.subject = subjectQuery;
      courseFilterState.level = 'Tous';
    } else {
      courseFilterState.subject = 'Tous';
      courseFilterState.level = 'Tous';
    }
    applyCourseFilters();
  }
  if ($('#exercise-grid')) applyExerciseFilters();
  if ($('#paper-grid')) {
    const paperSearch = $('[data-paper-search]');
    if (paperSearch) paperSearch.value = paperFilterState.query;
    applyPaperFilters();
  }
  if ($('#forum-thread-list')) applyForumFilters();
}

/* --------------------------------------------------------------------------
   Actions dynamiques
   -------------------------------------------------------------------------- */
function saveCourse(id) {
  const course = COURSES.find(item => item.id === id);
  if (!course) return;
  const wasSaved = savedCourses.has(id);
  if (wasSaved) savedCourses.delete(id);
  else savedCourses.add(id);
  writeJSON(STORAGE.courses, [...savedCourses]);
  $$(`[data-save-course="${CSS.escape(id)}"]`).forEach(button => {
    button.classList.toggle('is-saved', !wasSaved);
    button.setAttribute('aria-pressed', String(!wasSaved));
    if (button.classList.contains('js-save-course')) {
      button.setAttribute('aria-label', `${wasSaved ? 'Enregistrer' : 'Retirer'} le cours ${course.title}`);
    } else {
      button.innerHTML = `${icon('bookmark')} ${wasSaved ? 'Enregistrer' : 'Enregistré'}`;
    }
  });
  toast(wasSaved ? 'Cours retiré de ta bibliothèque.' : 'Cours enregistré dans ta bibliothèque.', { type: 'success' });
}

function saveExercise(id) {
  const exercise = EXERCISES.find(item => item.id === id);
  if (!exercise) return;
  const wasSaved = savedExercises.has(id);
  if (wasSaved) savedExercises.delete(id);
  else savedExercises.add(id);
  writeJSON(STORAGE.exercises, [...savedExercises]);
  $$(`[data-save-exercise="${CSS.escape(id)}"]`).forEach(button => {
    button.classList.toggle('is-saved', !wasSaved);
    button.setAttribute('aria-pressed', String(!wasSaved));
    if (button.hasAttribute('data-modal-save')) {
      button.innerHTML = `${icon('bookmark')} ${wasSaved ? 'Enregistrer' : 'Enregistré'}`;
      button.classList.toggle('btn--lime', !wasSaved);
      button.classList.toggle('btn--outline', wasSaved);
    } else {
      button.setAttribute('aria-label', wasSaved ? 'Enregistrer l’exercice' : 'Retirer de mes favoris');
    }
  });
  toast(wasSaved ? 'Exercice retiré de tes favoris.' : 'Exercice ajouté à ta liste.', { type: 'success' });
}

function revealDailyChallenge() {
  const side = $('.challenge-side');
  if (!side) return;
  const opened = side.classList.toggle('is-revealed');
  const placeholder = $('[data-solution-placeholder]', side);
  const steps = $('[data-solution-steps]', side);
  if (placeholder) placeholder.hidden = opened;
  if (steps) steps.hidden = !opened;
  const label = $('.solution-label', side);
  if (label) label.textContent = opened ? 'Correction débloquée' : 'La correction se mérite';
  const lock = $('.solution-lock', side);
  if (lock) lock.outerHTML = icon(opened ? 'checkCircle' : 'lock', 'solution-lock');
  $$('[data-reveal-challenge]').forEach(button => {
    if (button.classList.contains('solution-btn')) return;
    if (!button.closest('.challenge-actions')) return;
    button.innerHTML = opened ? `Retourner à l’énoncé ${icon('arrowLeft')}` : `Voir la correction ${icon('arrowRight')}`;
  });
  renderMath(side);
}

function switchPaperTab(button) {
  if (button.disabled) return;
  const activeTab = button.dataset.paperTab;
  $$('.paper-tab').forEach(tab => tab.classList.toggle('is-active', tab === button));
  $$('[data-paper-panel]').forEach(panel => { panel.hidden = panel.dataset.paperPanel !== activeTab; });
  renderMath($('.paper-preview-scroll') || document);
}

function copyThreadLink() {
  const value = location.href;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(value).then(() => toast('Lien copié. À toi de le partager.', { type: 'success' })).catch(() => toast('Impossible de copier le lien.'));
  } else {
    toast('Copie le lien depuis la barre d’adresse.');
  }
}

function handleThreadLike(id) {
  const thread = forumThreads.find(item => item.id === id);
  if (!thread) return;
  const wasLiked = likedThreads.has(id);
  if (wasLiked) {
    likedThreads.delete(id);
    thread.upvotes = Math.max(0, (Number(thread.upvotes) || 0) - 1);
  } else {
    likedThreads.add(id);
    thread.upvotes = (Number(thread.upvotes) || 0) + 1;
  }
  writeJSON(STORAGE.likedThreads, [...likedThreads]);
  writeJSON(STORAGE.threads, forumThreads);
  const button = $(`[data-like-thread="${CSS.escape(id)}"]`);
  if (button) {
    button.classList.toggle('is-active', !wasLiked);
    button.innerHTML = `${icon('heart')} <span data-like-count="${thread.id}">${thread.upvotes}</span> utile${!wasLiked ? 's' : ''}`;
  }
  toast(wasLiked ? 'Réaction retirée.' : 'Merci, ça aide la discussion à remonter.', { type: 'success' });
}

function handleReplyUpvote(button) {
  const replyId = button.dataset.upvoteReply;
  if (!replyId) return;
  const countSpan = button.querySelector('span');
  if (!countSpan) return;
  const thread = forumThreads.find(item => Array.isArray(item.answers) && item.answers.some(answer => answer.id === replyId));
  const answer = thread?.answers?.find(item => item.id === replyId);
  const wasLiked = likedReplies.has(replyId);
  if (wasLiked) {
    likedReplies.delete(replyId);
    if (answer) answer.upvotes = Math.max(0, (Number(answer.upvotes) || 0) - 1);
  } else {
    likedReplies.add(replyId);
    if (answer) answer.upvotes = (Number(answer.upvotes) || 0) + 1;
  }
  writeJSON(STORAGE.likedReplies, [...likedReplies]);
  writeJSON(STORAGE.threads, forumThreads);
  button.classList.toggle('is-active', !wasLiked);
  countSpan.textContent = answer ? (Number(answer.upvotes) || 0) : (wasLiked ? Math.max(0, (Number(countSpan.textContent) || 0) - 1) : (Number(countSpan.textContent) || 0) + 1);
  if (!wasLiked) toast('Réponse marquée comme utile.', { type: 'success' });
}

function toggleMobileMenu(force) {
  const panel = $('#mobile-panel');
  const toggle = $('#menu-toggle');
  if (!panel || !toggle) return;
  const open = typeof force === 'boolean' ? force : !panel.classList.contains('is-open');
  panel.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  toggle.innerHTML = icon(open ? 'close' : 'menu');
  document.body.classList.toggle('mobile-menu-open', open);
}

function initReveals() {
  const elements = $$('.reveal:not(.is-observed)');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(element => { element.classList.add('is-observed', 'is-visible'); });
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  elements.forEach(element => {
    element.classList.add('is-observed');
    observer.observe(element);
  });
}

let tocObserver = null;
function initTocProgress() {
  const links = $$('.toc-link');
  if (!links.length) return;
  if (tocObserver) tocObserver.disconnect();
  const blocks = $$('.reader-block');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('is-active', isActive);
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -60% 0px' });
  blocks.forEach(block => observer.observe(block));
  tocObserver = observer;
}

/* --------------------------------------------------------------------------
   Navigation & rendu
   -------------------------------------------------------------------------- */
const PAGE_TITLES = {
  home: 'MEDIL — La prépa, sans angles morts',
  cours: 'Cours & bibliothèque · MEDIL',
  exercices: 'Exercices corrigés · MEDIL',
  concours: 'Banque de concours · MEDIL',
  forum: 'Forum des taupins · MEDIL',
  admin: 'Studio MEDIL · Administration'
};

async function loadAdminModule() {
  if (window.MEDIL_ADMIN) return;
  if (!window.MEDIL_EDITORIAL) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'data.js';
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  // Hydrate les collections globales depuis la source éditoriale complète.
  if (window.MEDIL_EDITORIAL) {
    const editorial = window.MEDIL_EDITORIAL;
    const clone = value => JSON.parse(JSON.stringify(value));
    if (Array.isArray(editorial.courses)) COURSES.splice(0, COURSES.length, ...editorial.courses.map(clone));
    if (Array.isArray(editorial.exercises)) EXERCISES.splice(0, EXERCISES.length, ...editorial.exercises.map(clone));
    if (Array.isArray(editorial.papers)) PAPERS.splice(0, PAPERS.length, ...editorial.papers.map(clone));
    if (Array.isArray(editorial.threads)) SEED_THREADS.splice(0, SEED_THREADS.length, ...editorial.threads.map(clone));
    if (editorial.dailyChallenge) {
      Object.keys(DAILY_CHALLENGE).forEach(key => delete DAILY_CHALLENGE[key]);
      Object.assign(DAILY_CHALLENGE, clone(editorial.dailyChallenge));
    }
    forumThreads = readJSON(STORAGE.threads, null) || JSON.parse(JSON.stringify(SEED_THREADS));
    invalidateDetailCache();
  }
  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'admin.js';
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function renderRoute({ initial = false } = {}) {
  const route = currentRoute();
  const main = $('#app');
  if (!main) return;
  if (route.page === 'admin' && !window.MEDIL_ADMIN) {
    main.innerHTML = `<section class="section"><div class="container"><div class="loading-state"><span class="loading-spinner" aria-hidden="true"></span><p>Chargement du studio…</p></div></div></section>`;
    loadAdminModule().then(() => renderRoute({ initial })).catch(() => {
      main.innerHTML = renderNotFound('Le studio est indisponible.', 'Le module d’administration n’a pas pu être chargé.');
    });
    return;
  }
  closeSearch();
  toggleMobileMenu(false);

  let html = '';
  let pageKey = route.page;
  const querySubject = route.query.get('subject');
  if (pageKey === 'cours' && querySubject && ['Maths', 'Physique', 'Informatique'].includes(querySubject)) {
    courseFilterState.subject = querySubject;
    courseFilterState.level = 'Tous';
  } else {
    courseFilterState.subject = 'Tous';
    courseFilterState.level = 'Tous';
  }

  switch (pageKey) {
    case 'home':
      html = renderHome();
      break;
    case 'cours':
      html = route.id ? renderCourseDetail(route.id) : renderCoursesPage();
      break;
    case 'exercices':
      html = renderExercisesPage();
      break;
    case 'concours':
      html = renderConcoursPage();
      break;
    case 'forum':
      html = route.id ? renderThreadPage(route.id) : renderForumPage();
      break;
    case 'admin':
      html = window.MEDIL_ADMIN?.renderPage(route) || renderNotFound('Le studio est indisponible.', 'Le module d’administration n’a pas pu être chargé.');
      break;
    default:
      html = renderNotFound('Cette page n’existe pas.', 'Tu as peut-être suivi un lien qui a changé de place. Pas de panique, le programme reste le même.');
  }

  main.innerHTML = html;
  document.body.dataset.page = pageKey;
  document.body.classList.toggle('admin-mode', pageKey === 'admin');
  const thread = pageKey === 'forum' && route.id ? forumThreads.find(item => item.id === route.id) : null;
  document.title = pageKey === 'admin'
    ? PAGE_TITLES.admin
    : thread
      ? `${thread.title} · Forum MEDIL`
      : route.id && pageKey === 'cours'
        ? `${COURSES.find(course => course.id === route.id)?.title || 'Cours'} · MEDIL`
        : PAGE_TITLES[pageKey] || PAGE_TITLES.home;
  setActiveNav(pageKey);
  updateYear();
  renderMath(main);
  initLazyMedia(main);
  initReveals();
  initPageFilterUI();
  window.MEDIL_ADMIN?.afterRender?.({ pageKey, route, initial });
  if (pageKey === 'cours' && route.id) {
    initTocProgress();
    if (courseFilterState.subject !== 'Tous' || courseFilterState.level !== 'Tous') {
      // Filtre uniquement pertinent sur la bibliothèque.
    }
  }

  if (pageKey === 'concours' && route.id && PAPERS.some(paper => paper.id === route.id)) {
    setTimeout(() => openPaperModal(route.id), 80);
  }

  if (!initial) {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  } else {
    window.scrollTo(0, 0);
  }
  // Annonce les mises à jour dynamiques et gère le focus après navigation.
  ['course-count', 'exercise-count', 'paper-count', 'forum-count'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'true');
    }
  });
  const appRoot = $('#app');
  if (appRoot) {
    appRoot.setAttribute('tabindex', '-1');
    appRoot.focus({ preventScroll: true });
  }
  requestAnimationFrame(() => document.body.classList.add('page-ready'));
}

/* --------------------------------------------------------------------------
   Événements globaux
   -------------------------------------------------------------------------- */
function bindGlobalEvents() {
  document.addEventListener('click', event => {
    const target = event.target;

    // Studio admin : gestion locale des contenus (uniquement en mode admin).
    if (document.body.classList.contains('admin-mode') && window.MEDIL_ADMIN?.handleClick(event, target)) return;

    // Lien d’évitement : ne pas casser le routage par hash.
    if (target.closest('.skip-link')) {
      event.preventDefault();
      const main = $('#app');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
        main.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Sommaire du cours : défilement interne, sans changer la route.
    const tocLink = target.closest('.toc-link');
    if (tocLink) {
      event.preventDefault();
      const section = document.getElementById((tocLink.getAttribute('href') || '').slice(1));
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    // Recherche
    if (target.closest('[data-open-search]')) {
      event.preventDefault();
      if ($('#mobile-panel')?.classList.contains('is-open')) toggleMobileMenu(false);
      openSearch();
      return;
    }
    if (target.closest('[data-close-search]')) {
      closeSearch();
      return;
    }
    const suggestion = target.closest('[data-search-suggestion]');
    if (suggestion) {
      const input = $('#search-input');
      if (input) {
        input.value = suggestion.dataset.searchSuggestion;
        updateSearchResults(input.value);
        input.focus();
      }
      return;
    }
    const searchAction = target.closest('[data-search-type]');
    if (searchAction) {
      const { searchType, searchId } = searchAction.dataset;
      closeSearch();
      if (searchType === 'course') location.hash = `#/cours/${searchId}`;
      else if (searchType === 'exercise') setTimeout(() => openExerciseModal(searchId), 40);
      else if (searchType === 'paper') setTimeout(() => openPaperModal(searchId), 40);
      else if (searchType === 'thread') location.hash = `#/forum/${searchId}`;
      return;
    }

    // Menu mobile
    if (target.closest('#menu-toggle')) {
      toggleMobileMenu();
      return;
    }
    if (target.closest('#mobile-panel a, #mobile-panel button')) {
      if (!target.closest('[data-open-search]') && !target.closest('[data-open-auth]')) {
        toggleMobileMenu(false);
      }
    }

    // Fermeture des modales : uniquement le fond ou un bouton de fermeture explicite.
    if (target.closest('[data-close-modal]') || target.matches('[data-modal-backdrop]')) {
      closeModal();
      return;
    }
    if (target.closest('[data-close-and-nav]')) {
      closeModal();
    }

    // Retour en haut
    if (target.closest('[data-scroll-top]')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Filtres cours
    const courseFilter = target.closest('[data-course-filter]');
    if (courseFilter) {
      courseFilterState[courseFilter.dataset.courseFilter] = courseFilter.dataset.value;
      paginationState.courses.page = 1;
      applyCourseFilters();
      return;
    }
    if (target.closest('[data-reset-course-filters]')) {
      paginationState.courses.page = 1;
      resetCourseFilters();
      return;
    }

    // Filtres exercices
    const exerciseFilter = target.closest('[data-exercise-filter]');
    if (exerciseFilter) {
      exerciseFilterState[exerciseFilter.dataset.exerciseFilter] = exerciseFilter.dataset.value;
      paginationState.exercises.page = 1;
      applyExerciseFilters();
      return;
    }
    if (target.closest('[data-reset-exercise-filters]')) {
      paginationState.exercises.page = 1;
      resetExerciseFilters();
      return;
    }

    // Filtres concours
    const paperFilter = target.closest('[data-paper-filter]');
    if (paperFilter) {
      paperFilterState[paperFilter.dataset.paperFilter] = paperFilter.dataset.value;
      paginationState.papers.page = 1;
      applyPaperFilters();
      return;
    }
    if (target.closest('[data-reset-paper-filters]')) {
      paginationState.papers.page = 1;
      resetPaperFilters();
      return;
    }

    // Filtres forum
    const forumFilter = target.closest('[data-forum-filter]');
    if (forumFilter) {
      forumFilterState.category = forumFilter.dataset.value;
      applyForumFilters();
      return;
    }

    // Favoris
    const saveCourseButton = target.closest('[data-save-course]');
    if (saveCourseButton) {
      event.preventDefault();
      saveCourse(saveCourseButton.dataset.saveCourse);
      return;
    }
    const saveExerciseButton = target.closest('[data-save-exercise]');
    if (saveExerciseButton) {
      event.preventDefault();
      saveExercise(saveExerciseButton.dataset.saveExercise);
      return;
    }

    // Défi du jour
    if (target.closest('[data-reveal-challenge]')) {
      revealDailyChallenge();
      return;
    }
    if (target.closest('[data-open-daily]')) {
      event.preventDefault();
      openExerciseModal(DAILY_CHALLENGE.id);
      return;
    }

    // Exercices
    const exerciseButton = target.closest('[data-exercise]');
    if (exerciseButton) {
      event.preventDefault();
      openExerciseModal(exerciseButton.dataset.exercise);
      return;
    }
    if (target.closest('[data-toggle-hint]')) {
      const hint = target.closest('.hint-box');
      const content = $('[data-hint-content]', hint);
      const toggle = $('[data-toggle-hint]', hint);
      if (content && toggle) {
        content.hidden = !content.hidden;
        const plus = $('span', toggle);
        if (plus) plus.textContent = content.hidden ? '+' : '−';
      }
      return;
    }
    if (target.closest('[data-reveal-exercise-solution]')) {
      const panel = target.closest('.solution-panel');
      const locked = $('[data-solution-locked]', panel);
      const full = $('[data-full-solution]', panel);
      if (locked) locked.hidden = true;
      if (full) full.hidden = false;
      renderMath(panel);
      return;
    }

    // Concours
    const paperButton = target.closest('[data-paper]');
    if (paperButton) {
      openPaperModal(paperButton.dataset.paper);
      return;
    }
    const paperTab = target.closest('[data-paper-tab]');
    if (paperTab) {
      switchPaperTab(paperTab);
      return;
    }
    if (target.closest('[data-print-paper]')) {
      document.body.classList.add('printing-paper');
      toast('Choisis « Enregistrer au format PDF » dans la boîte d’impression.', { duration: 4500 });
      setTimeout(() => window.print(), 350);
      return;
    }
    if (target.closest('[data-print-exercise]')) {
      document.body.classList.add('printing-exercise');
      toast('Choisis « Enregistrer au format PDF » dans la boîte d’impression.', { duration: 4500 });
      setTimeout(() => window.print(), 350);
      return;
    }

    // Cours
    if (target.closest('[data-course-download]') || target.closest('[data-print-course]')) {
      document.body.classList.add('printing-course');
      toast('Ouverture de la version imprimable…', { type: 'success' });
      setTimeout(() => window.print(), 300);
      return;
    }
    const answerToggle = target.closest('[data-course-answer-toggle]');
    if (answerToggle) {
      const wrapper = target.closest('.reader-exercise');
      const answer = $('[data-course-answer]', wrapper);
      if (answer) {
        answer.hidden = !answer.hidden;
        answerToggle.innerHTML = answer.hidden ? `${icon('sparkles')} Voir la réponse` : `${icon('close')} Masquer la réponse`;
        renderMath(answer);
      }
      return;
    }
    const doneButton = target.closest('[data-mark-course-done]');
    if (doneButton) {
      const id = doneButton.dataset.markCourseDone;
      if (completedItems.has(id)) {
        completedItems.delete(id);
        toast('Cours marqué comme à revoir.');
      } else {
        completedItems.add(id);
        toast('Cours terminé. Bien joué !', { type: 'success' });
      }
      writeJSON(STORAGE.completed, [...completedItems]);
      const course = COURSES.find(item => item.id === id);
      const baseProgress = course?.progress || 0;
      const progressLabel = $('.reader-progress-top strong');
      if (progressLabel) progressLabel.textContent = completedItems.has(id) ? '100%' : `${baseProgress}%`;
      const progressTrack = $('.reader-progress-card .progress-track span');
      if (progressTrack) progressTrack.style.width = completedItems.has(id) ? '100%' : `${baseProgress}%`;
      const progressNote = $('.reader-progress-card p');
      if (progressNote) progressNote.textContent = completedItems.has(id) ? 'Cours terminé. Bravo.' : 'Encore un petit effort.';
      doneButton.classList.toggle('is-complete', completedItems.has(id));
      const span = doneButton.querySelector('span');
      if (span) span.lastChild.textContent = completedItems.has(id) ? 'Cours terminé' : 'Marquer comme lu';
      return;
    }

    // Forum
    if (target.closest('[data-new-thread]')) {
      openNewThreadModal();
      return;
    }
    if (target.closest('[data-reply-focus]')) {
      const composer = $('#reply-composer');
      composer?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => $('#reply-content')?.focus({ preventScroll: true }), 350);
      return;
    }
    const likeButton = target.closest('[data-like-thread]');
    if (likeButton) {
      handleThreadLike(likeButton.dataset.likeThread);
      return;
    }
    if (target.closest('[data-copy-link]')) {
      copyThreadLink();
      return;
    }
    const replyUpvote = target.closest('[data-upvote-reply]');
    if (replyUpvote) {
      handleReplyUpvote(replyUpvote);
      return;
    }

    // Auth & profil
    const authTrigger = target.closest('[data-open-auth]');
    if (authTrigger) {
      if ($('#mobile-panel')?.classList.contains('is-open')) toggleMobileMenu(false);
      openAuthModal(authTrigger.dataset.openAuth);
      return;
    }
    if (target.closest('[data-open-profile]')) {
      openProfileModal();
      return;
    }
    if (target.closest('[data-logout]')) {
      currentUser = null;
      localStorage.removeItem(STORAGE.user);
      updateHeaderUser();
      closeModal();
      toast('À bientôt sur MEDIL.');
      return;
    }

    // Liens à venir
    const soon = target.closest('[data-soon]');
    if (soon) {
      event.preventDefault();
      toast(soon.dataset.soon || 'Cette fonctionnalité arrive bientôt.');
      return;
    }
  });

  document.addEventListener('submit', event => {
    const form = event.target;

    if (window.MEDIL_ADMIN?.handleSubmit(event, form)) return;

    if (form.matches('[data-auth-form]')) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const formData = new FormData(form);
      const mode = form.dataset.authForm;
      const email = String(formData.get('email') || '').trim();
      const submittedName = String(formData.get('name') || '').trim();
      const fallbackName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
      currentUser = {
        name: submittedName || fallbackName || 'Taupin MEDIL',
        email,
        joined: new Date().toISOString(),
        streak: 3
      };
      writeJSON(STORAGE.user, currentUser);
      updateHeaderUser();
      closeModal();
      toast(mode === 'login' ? `Content de te revoir, ${currentUser.name.split(' ')[0]} !` : `Bienvenue dans la promo, ${currentUser.name.split(' ')[0]} !`, { type: 'success' });
      return;
    }

    if (form.matches('[data-newsletter-form]')) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      form.reset();
      toast('Tu es inscrit·e à la lettre MEDIL. À très vite.', { type: 'success' });
      return;
    }

    if (form.matches('[data-new-thread-form]')) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const colors = ['lime', 'lilac', 'peach', 'mint', 'sky', 'butter'];
      const author = currentUser?.name || `Taupin ${Math.floor(100 + Math.random() * 900)}`;
      const newThread = {
        id: `sujet-${Date.now()}`,
        category: String(data.get('category') || 'Maths'),
        title: String(data.get('title') || '').trim(),
        excerpt: String(data.get('content') || '').trim().slice(0, 175) + '…',
        author,
        initials: initials(author),
        avatarColor: colors[Math.floor(Math.random() * colors.length)],
        grade: `${data.get('level') || 'MP'} · MEDIL`,
        time: 'à l’instant',
        createdAt: Date.now(),
        replies: 0,
        views: '1',
        upvotes: 1,
        tags: [String(data.get('category') || 'Maths').toLowerCase(), String(data.get('level') || 'MP').toLowerCase()],
        pinned: false,
        content: String(data.get('content') || '').trim(),
        answers: []
      };
      forumThreads.unshift(newThread);
      writeJSON(STORAGE.threads, forumThreads);
      closeModal();
      toast('Ton sujet est publié. La promo va voir ça.', { type: 'success' });
      location.hash = `#/forum/${newThread.id}`;
      return;
    }

    if (form.matches('[data-reply-form]')) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const id = form.dataset.threadId;
      const thread = forumThreads.find(item => item.id === id);
      if (!thread) return;
      const data = new FormData(form);
      const guestName = String(data.get('name') || '').trim();
      const text = String(data.get('reply') || '').trim();
      const colors = ['lime', 'lilac', 'peach', 'mint', 'sky', 'butter'];
      const author = currentUser?.name || guestName || 'Taupin anonyme';
      const newReply = {
        id: `reponse-${Date.now()}`,
        author,
        initials: initials(author),
        avatarColor: colors[Math.floor(Math.random() * colors.length)],
        grade: currentUser ? 'Membre MEDIL' : 'Invité MEDIL',
        time: 'à l’instant',
        createdAt: Date.now(),
        text,
        upvotes: 0,
        number: thread.answers.length + 1
      };
      thread.answers.push(newReply);
      thread.replies = Number(thread.replies || 0) + 1;
      writeJSON(STORAGE.threads, forumThreads);
      const list = $('#replies-list');
      if (list) {
        const emptyReply = $('.no-replies', list);
        if (emptyReply) emptyReply.remove();
        list.insertAdjacentHTML('beforeend', replyMarkup(newReply, true));
        renderMath(list);
        const newEl = $(`#reply-${CSS.escape(newReply.id)}`);
        newEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      const repliesHeadingCount = $('.replies-heading h2 span');
      if (repliesHeadingCount) repliesHeadingCount.textContent = thread.replies;
      const miniStat = $('.thread-sidebar .mini-stat-row:first-of-type strong');
      if (miniStat) miniStat.textContent = thread.replies;
      form.reset();
      toast('Réponse publiée. Merci pour le coup de main !', { type: 'success' });
      return;
    }
  });

  document.addEventListener('input', event => {
    if (window.MEDIL_ADMIN?.handleInput(event)) return;
    if (event.target.matches('[data-paper-search]')) {
      paperFilterState.query = event.target.value;
      paginationState.papers.page = 1;
      applyPaperFilters();
    }
    if (event.target.matches('[data-forum-search]')) {
      forumFilterState.query = event.target.value;
      applyForumFilters();
    }
  });

  document.addEventListener('change', event => {
    if (window.MEDIL_ADMIN?.handleChange(event)) return;
    if (event.target.matches('[data-paper-year]')) {
      paperFilterState.year = event.target.value;
      paginationState.papers.page = 1;
      applyPaperFilters();
    }
  });

  document.addEventListener('keydown', event => {
    const searchOverlay = $('#search-overlay');
    if (searchOverlay && !searchOverlay.hidden) {
      const results = $$('.search-result', searchOverlay);
      if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && results.length) {
        event.preventDefault();
        const currentIndex = results.findIndex(result => result.classList.contains('is-focused'));
        const nextIndex = event.key === 'ArrowDown'
          ? (currentIndex + 1) % results.length
          : (currentIndex <= 0 ? results.length - 1 : currentIndex - 1);
        results.forEach(result => result.classList.remove('is-focused'));
        results[nextIndex].classList.add('is-focused');
        results[nextIndex].scrollIntoView({ block: 'nearest' });
        return;
      }
      if (event.key === 'Enter' && results.length) {
        const focused = $('.search-result.is-focused', searchOverlay) || results[0];
        event.preventDefault();
        focused.click();
        return;
      }
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if ($('#modal-root')?.innerHTML) return;
      const search = $('#search-overlay');
      if (search && !search.hidden) closeSearch();
      else openSearch();
      return;
    }
    if (event.key === 'Escape') {
      if ($('#modal-root')?.innerHTML) {
        closeModal();
        return;
      }
      const search = $('#search-overlay');
      if (search && !search.hidden) {
        closeSearch();
        return;
      }
      const panel = $('#mobile-panel');
      if (panel?.classList.contains('is-open')) toggleMobileMenu(false);
    }
    if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      if ($('#modal-root')?.innerHTML) return;
      const tag = document.activeElement?.tagName;
      if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) {
        event.preventDefault();
        openSearch();
      }
    }
  });

  window.addEventListener('hashchange', () => renderRoute());
  window.addEventListener('scroll', () => {
    const header = $('#site-header');
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  }, { passive: true });
  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing-paper', 'printing-course', 'printing-exercise');
  });

  // Précharge silencieusement les détails au survol (best-effort).
  document.addEventListener('mouseover', event => {
    const courseCard = event.target.closest('[data-course-id]');
    if (courseCard) { scheduleDetailPrefetch('course', courseCard.dataset.courseId); return; }
    const exerciseCard = event.target.closest('[data-exercise-card]');
    if (exerciseCard) { scheduleDetailPrefetch('exercise', exerciseCard.getAttribute('data-exercise-card')); return; }
    const threadRow = event.target.closest('[data-thread-row]');
    if (threadRow) {
      const href = threadRow.getAttribute('href') || '';
      const id = href.split('/').pop();
      if (id) scheduleDetailPrefetch('thread', id);
    }
  }, { passive: true });
}

function init() {
  updateYear();
  updateHeaderUser();
  bindGlobalEvents();
  renderRoute({ initial: true });
  const menuButton = $('#menu-toggle');
  if (menuButton) menuButton.innerHTML = icon('menu');
  setTimeout(() => document.body.classList.add('loaded'), 40);
}

init();
