/* ==========================================================================
   MEDIL — Studio d’administration
   CMS local : contenus persistés dans localStorage, export JSON / data.js.
   Chargé à la demande par app.js (studio admin), après hydration des surcharges locales.
   ========================================================================== */

(() => {
  'use strict';

  const CONTENT_KEY = 'medil.content.v1';
  const ADMIN_HASH_KEY = 'medil.admin.hash';
  const ADMIN_SESSION_KEY = 'medil.admin.session';
  const ADMIN_SESSION_TTL = 12 * 60 * 60 * 1000;
  const DEFAULT_ADMIN_PASSWORD = 'medil-admin';

  const SUBJECTS = ['Maths', 'Physique', 'Informatique'];
  const COURSE_LEVELS = ['MPSI', 'MP', 'MP*'];
  const EXERCISE_LEVELS = ['MPSI', 'MP', 'MP*'];
  const COLORS = ['lime', 'sky', 'rose', 'butter', 'lilac', 'peach', 'mint', 'ink'];
  const COVER_TYPES = ['matrix', 'graph', 'dots', 'field', 'wave', 'thermo', 'code', 'terminal', 'norm'];
  const FORUM_CATEGORIES = ['Maths', 'Physique', 'Informatique', 'Concours', 'Méthode'];
  const AVATAR_COLORS = ['lime', 'lilac', 'peach', 'mint', 'sky', 'butter'];
  const SCHOOLS = ['X/ENS', 'Mines-Ponts', 'Centrale', 'CCINP', 'e3a'];
  const SCHOOL_SHORT = { 'X/ENS': 'X', 'Mines-Ponts': 'MP', 'Centrale': 'C', 'CCINP': 'CC', 'e3a': 'e3a' };

  const clone = value => JSON.parse(JSON.stringify(value));
  const normalize = value => String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  function slugify(value) {
    return normalize(value)
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 70);
  }

  function replaceArray(target, items) {
    target.splice(0, target.length, ...items.map(clone));
  }

  function replaceObject(target, value) {
    Object.keys(target).forEach(key => delete target[key]);
    Object.assign(target, clone(value));
  }

  function readStore(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeStore(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      toast?.('Impossible d’enregistrer : le stockage du navigateur est plein.', { type: 'error' });
      return false;
    }
  }

  function hashPassword(value) {
    let h1 = 0xdeadbeef ^ value.length;
    let h2 = 0x41c6ce57 ^ value.length;
    for (let index = 0; index < value.length; index += 1) {
      const code = value.charCodeAt(index);
      h1 = Math.imul(h1 ^ code, 2654435761);
      h2 = Math.imul(h2 ^ code, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
  }

  const DEFAULT_ADMIN_HASH = hashPassword(DEFAULT_ADMIN_PASSWORD);

  function isAdminUnlocked() {
    try {
      const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (!raw) return false;
      const session = JSON.parse(raw);
      if (!session?.at || Date.now() - session.at > ADMIN_SESSION_TTL) {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  function unlockAdmin() {
    try {
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ at: Date.now() }));
    } catch (error) {
      /* Session uniquement : le navigateur peut la bloquer. */
    }
  }

  function lockAdmin() {
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (error) {
      /* Rien à faire. */
    }
  }

  function adminPasswordMatches(value) {
    const stored = localStorage.getItem(ADMIN_HASH_KEY);
    return hashPassword(value) === (stored || DEFAULT_ADMIN_HASH);
  }

  /* --------------------------------------------------------------------------
     Snapshot des données d’origine, puis application des surcharges locales
     -------------------------------------------------------------------------- */
  const SEED = {
    courses: clone(COURSES),
    exercises: clone(EXERCISES),
    papers: clone(PAPERS),
    dailyChallenge: clone(DAILY_CHALLENGE),
    threads: clone(SEED_THREADS)
  };

  function isCourse(value) {
    return value && typeof value === 'object' && typeof value.id === 'string' && typeof value.title === 'string';
  }

  function isExercise(value) {
    return value && typeof value === 'object' && typeof value.id === 'string' && typeof value.title === 'string';
  }

  function isPaper(value) {
    return value && typeof value === 'object' && typeof value.id === 'string' && typeof value.title === 'string';
  }

  function isThread(value) {
    return value && typeof value === 'object' && typeof value.id === 'string' && typeof value.title === 'string';
  }

  function applyEditorialContent(data, strict = false) {
    if (!data || typeof data !== 'object') return false;
    const checks = [
      ['courses', isCourse],
      ['exercises', isExercise],
      ['papers', isPaper]
    ];
    for (const [key, validator] of checks) {
      if (!Array.isArray(data[key])) {
        if (strict) return false;
        continue;
      }
      if (!data[key].every(validator)) {
        if (strict) return false;
      } else {
        const target = key === 'courses' ? COURSES : key === 'exercises' ? EXERCISES : PAPERS;
        replaceArray(target, data[key]);
      }
    }
    if (data.dailyChallenge && typeof data.dailyChallenge === 'object' && typeof data.dailyChallenge.title === 'string') {
      replaceObject(DAILY_CHALLENGE, data.dailyChallenge);
    } else if (strict && data.dailyChallenge !== undefined) {
      return false;
    }
    window.invalidateDetailCache?.();
    return true;
  }

  const storedContent = readStore(CONTENT_KEY, null);
  if (storedContent) applyEditorialContent(storedContent);

  /* --------------------------------------------------------------------------
     État de l’interface admin
     -------------------------------------------------------------------------- */
  const adminState = {
    section: 'dashboard',
    editing: null,
    dirty: false
  };

  const SECTIONS = [
    { id: 'dashboard', label: 'Vue d’ensemble', icon: 'grid' },
    { id: 'courses', label: 'Cours', icon: 'book' },
    { id: 'exercises', label: 'Exercices', icon: 'target' },
    { id: 'papers', label: 'Concours', icon: 'trophy' },
    { id: 'forum', label: 'Forum', icon: 'forum' },
    { id: 'daily', label: 'Défi du jour', icon: 'flame' },
    { id: 'settings', label: 'Réglages', icon: 'lock' }
  ];

  const SECTION_LABELS = Object.fromEntries(SECTIONS.map(section => [section.id, section.label]));
  const EDITOR_SECTION = { course: 'courses', exercise: 'exercises', paper: 'papers', thread: 'forum', daily: 'daily' };
  const EDITOR_LABEL = { course: 'cours', exercise: 'exercice', paper: 'sujet de concours', thread: 'discussion', daily: 'défi du jour' };

  /* --------------------------------------------------------------------------
     Petits helpers de rendu
     -------------------------------------------------------------------------- */
  function adminField({
    label,
    name,
    dataField,
    value = '',
    type = 'text',
    required = false,
    placeholder = '',
    help = '',
    full = false,
    rows = 4,
    readonly = false,
    min,
    max,
    step,
    options = null,
    code = false,
    autocomplete = ''
  }) {
    const key = name ? `name="${name}"` : `data-field="${dataField}"`;
    const classes = ['admin-field'];
    if (full) classes.push('admin-field--full');
    const attrs = [key];
    if (required) attrs.push('required');
    if (placeholder) attrs.push(`placeholder="${escapeAttr(placeholder)}"`);
    if (readonly) attrs.push('readonly');
    if (min !== undefined && min !== '') attrs.push(`min="${escapeAttr(min)}"`);
    if (max !== undefined && max !== '') attrs.push(`max="${escapeAttr(max)}"`);
    if (step !== undefined && step !== '') attrs.push(`step="${escapeAttr(step)}"`);

    let control = '';
    if (type === 'select') {
      control = `<select ${attrs.join(' ')}>${options.map(option => {
        const current = typeof option === 'object' ? option.value : option;
        const labelValue = typeof option === 'object' ? option.label : option;
        return `<option value="${escapeAttr(current)}" ${String(current) === String(value) ? 'selected' : ''}>${escapeHTML(labelValue)}</option>`;
      }).join('')}</select>`;
    } else if (type === 'textarea') {
      control = `<textarea ${attrs.join(' ')} rows="${rows}" class="${code ? 'admin-code-area' : ''}">${escapeHTML(value)}</textarea>`;
    } else {
      attrs.push(`type="${type}"`);
      attrs.push(`value="${escapeAttr(value)}"`);
      if (autocomplete) attrs.push(`autocomplete="${autocomplete}"`);
      control = `<input ${attrs.join(' ')}>`;
    }

    return `<label class="${classes.join(' ')}">
      <span class="admin-field-label">${escapeHTML(label)}${required ? ' <b>*</b>' : ''}</span>
      ${control}
      ${help ? `<small class="admin-help">${help}</small>` : ''}
    </label>`;
  }

  function adminCheckbox({ name, label, checked = false, help = '' }) {
    return `<label class="admin-check">
      <input type="checkbox" name="${name}" ${checked ? 'checked' : ''}>
      <span><strong>${escapeHTML(label)}</strong>${help ? `<small>${help}</small>` : ''}</span>
    </label>`;
  }

  function repeatCard(kind, title, body) {
    return `<div class="admin-repeat-card" data-admin-repeat="${kind}">
      <div class="admin-repeat-head">
        <span class="admin-repeat-title">${icon('layers')} <strong data-repeat-title>${escapeHTML(title)}</strong></span>
        <div class="admin-repeat-actions">
          <button type="button" class="admin-repeat-btn" data-admin-move-repeat="up" aria-label="Monter">↑</button>
          <button type="button" class="admin-repeat-btn" data-admin-move-repeat="down" aria-label="Descendre">↓</button>
          <button type="button" class="admin-repeat-btn admin-repeat-btn--danger" data-admin-remove-repeat aria-label="Supprimer">${icon('close')}</button>
        </div>
      </div>
      ${body}
    </div>`;
  }

  function addRepeatButton(kind, label) {
    return `<button type="button" class="admin-add-repeat" data-admin-add-repeat="${kind}">${icon('plus')} ${escapeHTML(label)}</button>`;
  }

  function colorOptions() {
    return COLORS.map(color => ({ value: color, label: color }));
  }

  function subjectOptions() {
    return SUBJECTS.map(subject => ({ value: subject, label: subject }));
  }

  function adminStat(iconName, value, label, section) {
    return `<button class="admin-stat" data-admin-nav="${section}">
      <span class="admin-stat-icon">${icon(iconName)}</span>
      <strong>${value}</strong>
      <span>${escapeHTML(label)}</span>
      <span class="admin-stat-arrow">${icon('arrowUpRight')}</span>
    </button>`;
  }

  function adminPill(text, tone = '') {
    return `<span class="admin-pill ${tone ? `admin-pill--${tone}` : ''}">${escapeHTML(text)}</span>`;
  }

  function emptyListState(message) {
    return `<div class="admin-empty" data-admin-search-empty hidden>${icon('search')} <span>${escapeHTML(message)}</span></div>`;
  }

  function sectionIntro(eyebrow, title, description, action = '') {
    return `<div class="admin-section-head">
      <div>
        <p class="eyebrow"><span class="eyebrow-dot"></span>${escapeHTML(eyebrow)}</p>
        <h2>${title}</h2>
        <p>${escapeHTML(description)}</p>
      </div>
      ${action ? `<div class="admin-section-head-action">${action}</div>` : ''}
    </div>`;
  }

  function adminActionButton({ label, action, id, tone = '', iconName = '' }) {
    return `<button type="button" class="admin-mini-action ${tone ? `admin-mini-action--${tone}` : ''}" data-admin-${action}="${id}">${iconName ? icon(iconName) : ''}${escapeHTML(label)}</button>`;
  }

  /* --------------------------------------------------------------------------
     Porte d’entrée
     -------------------------------------------------------------------------- */
  function renderGate() {
    return `<section class="admin-gate">
      <div class="container admin-gate-grid">
        <div class="admin-gate-copy">
          <p class="eyebrow eyebrow--light"><span class="eyebrow-dot"></span>Espace privé · Studio MEDIL</p>
          <h1>Le studio<br><span class="serif-italic">derrière MEDIL.</span></h1>
          <p>Ajouter un cours, corriger un exercice, publier un sujet de concours ou modérer le forum. Tout se pilote depuis un seul endroit.</p>
          <ul class="admin-gate-list">
            <li>${icon('book')} Cours, exercices et sujets de concours</li>
            <li>${icon('forum')} Forum et réponses des étudiants</li>
            <li>${icon('download')} Sauvegarde JSON et export data.js</li>
          </ul>
          <a class="text-link admin-gate-back" href="#/">${icon('arrowLeft')} Retour au site</a>
        </div>
        <form class="admin-login-card" data-admin-login>
          <div class="admin-login-top">
            <span class="admin-lock">${icon('lock')}</span>
            <span class="admin-local-badge"><span></span> Session locale</span>
          </div>
          <h2>Entrer dans le studio.</h2>
          <p>Cet espace permet de modifier tout le contenu éditorial de MEDIL. L’accès est protégé par un mot de passe local.</p>
          <label class="admin-field">
            <span class="admin-field-label">Mot de passe</span>
            <span class="admin-password-wrap">
              <input id="admin-password" type="password" name="password" placeholder="Ton mot de passe" required autocomplete="current-password">
              <button type="button" class="admin-password-toggle" data-admin-toggle-password aria-label="Afficher le mot de passe">${icon('eye')}</button>
            </span>
          </label>
          <p class="admin-login-error" data-admin-login-error aria-live="polite"></p>
          <button class="btn btn--dark btn--full" type="submit">Déverrouiller le studio ${icon('arrowRight')}</button>
          <p class="admin-login-note">${icon('lock')} Démo locale : les modifications restent dans ce navigateur. Pense à exporter ta sauvegarde.</p>
        </form>
      </div>
    </section>`;
  }

  /* --------------------------------------------------------------------------
     Coquille du studio
     -------------------------------------------------------------------------- */
  function renderSidebar() {
    const counts = {
      courses: COURSES.length,
      exercises: EXERCISES.length,
      papers: PAPERS.length,
      forum: forumThreads.length
    };
    return `<aside class="admin-sidebar">
      <div class="admin-session-card">
        <span class="admin-session-live"><span></span> Session locale</span>
        <strong>Administrateur</strong>
        <small>Les modifications sont enregistrées sur cet appareil.</small>
      </div>
      <nav class="admin-nav" aria-label="Sections du studio">
        ${SECTIONS.map(section => `<button type="button" class="admin-nav-item ${adminState.section === section.id ? 'is-active' : ''}" data-admin-nav="${section.id}" ${adminState.section === section.id ? 'aria-current="page"' : ''}>
          ${icon(section.icon)}
          <span>${escapeHTML(section.label)}</span>
          ${Object.hasOwn(counts, section.id) ? `<em>${counts[section.id]}</em>` : ''}
        </button>`).join('')}
      </nav>
      <div class="admin-sidebar-foot">
        <span>${icon('checkCircle')} Persistance locale active</span>
        <span>v1.0 · CMS sans backend</span>
      </div>
    </aside>`;
  }

  function renderMasthead() {
    return `<div class="admin-masthead">
      <div class="admin-masthead-copy">
        <p class="eyebrow eyebrow--light"><span class="eyebrow-dot"></span>Studio MEDIL · Administration</p>
        <h1>Pilote <span class="serif-italic">tout.</span></h1>
        <p>Le contenu, les corrigés et la communauté. Sans quitter MEDIL.</p>
      </div>
      <div class="admin-masthead-actions">
        <a class="btn btn--ghost" href="#/" target="_blank" rel="noopener">Voir le site ${icon('arrowUpRight')}</a>
        <button class="btn btn--lime" type="button" data-admin-logout>${icon('logout')} Déconnexion</button>
      </div>
      <span class="admin-masthead-orbit" aria-hidden="true"></span>
    </div>`;
  }

  function renderStudio() {
    if (!SECTIONS.some(section => section.id === adminState.section)) adminState.section = 'dashboard';
    const mainContent = adminState.editing ? renderEditor() : renderSection(adminState.section);
    return `<section class="admin-page">
      <div class="container">
        ${renderMasthead()}
        <div class="admin-layout">
          ${renderSidebar()}
          <div class="admin-main">${mainContent}</div>
        </div>
      </div>
    </section>`;
  }

  /* --------------------------------------------------------------------------
     Vue d’ensemble
     -------------------------------------------------------------------------- */
  function renderDashboard() {
    const featured = COURSES.slice(0, 3);
    return `
      <div class="admin-section-head">
        <div>
          <p class="eyebrow"><span class="eyebrow-dot"></span>Vue d’ensemble</p>
          <h2>Bonjour, l’équipe.</h2>
          <p>Un coup d’œil sur le contenu publié et les raccourcis pour le faire vivre.</p>
        </div>
      </div>
      <div class="admin-stats">
        ${adminStat('book', COURSES.length, 'cours', 'courses')}
        ${adminStat('target', EXERCISES.length, 'exercices', 'exercises')}
        ${adminStat('trophy', PAPERS.length, 'sujets de concours', 'papers')}
        ${adminStat('forum', forumThreads.length, 'discussions', 'forum')}
      </div>
      <div class="admin-dashboard-grid">
        <section class="admin-panel">
          <div class="admin-panel-head">
            <div><p class="eyebrow">Accès rapide</p><h3>Qu’est-ce qu’on ajoute ?</h3></div>
          </div>
          <div class="admin-quick-actions">
            <button type="button" data-admin-new="course"><span>${icon('book')}</span><strong>Un cours</strong><small>Créer un nouveau chapitre</small></button>
            <button type="button" data-admin-new="exercise"><span>${icon('target')}</span><strong>Un exercice</strong><small>Ajouter un corrigé</small></button>
            <button type="button" data-admin-new="paper"><span>${icon('trophy')}</span><strong>Un concours</strong><small>Enrichir la banque</small></button>
            <button type="button" data-admin-new="thread"><span>${icon('forum')}</span><strong>Une discussion</strong><small>Publier sur le forum</small></button>
          </div>
        </section>
        <section class="admin-panel admin-panel--dark">
          <p class="eyebrow eyebrow--light">Sauvegarde</p>
          <h3>Ton contenu t’appartient.</h3>
          <p>Exporte une sauvegarde JSON après tes modifications. Pour publier pour tout le monde, télécharge aussi le fichier <code>data.js</code>.</p>
          <div class="admin-panel-actions">
            <button class="btn btn--lime btn--sm" type="button" data-admin-export-json>${icon('download')} Exporter</button>
            <button class="btn btn--ghost-dark btn--sm" type="button" data-admin-export-datajs>${icon('code')} data.js</button>
          </div>
        </section>
      </div>
      <section class="admin-panel admin-panel--recent">
        <div class="admin-panel-head">
          <div><p class="eyebrow">Derniers contenus</p><h3>À portée de main.</h3></div>
          <button class="admin-link-button" type="button" data-admin-nav="courses">Tout voir ${icon('arrowRight')}</button>
        </div>
        <div class="admin-recent-list">
          ${featured.map(course => `<button type="button" class="admin-recent-row" data-admin-edit="course" data-admin-id="${escapeAttr(course.id)}">
            <span class="admin-swatch" style="background:var(--${course.color || 'lime'})">${escapeHTML(course.subject.slice(0, 1))}</span>
            <span><strong>${escapeHTML(course.title)}</strong><small>${escapeHTML(course.subject)} · ${escapeHTML(course.level)} · ${course.sections?.length || 0} sections</small></span>
            ${icon('chevronRight')}
          </button>`).join('') || '<div class="admin-empty-inline">Aucun cours pour le moment.</div>'}
        </div>
      </section>
      <div class="admin-note-strip">${icon('lock')} <span><strong>Mode local.</strong> Les modifications sont enregistrées dans ce navigateur et visibles immédiatement. Pour les rendre permanentes pour tous, remplace <code>data.js</code> par l’export prévu à cet effet.</span></div>`;
  }

  /* --------------------------------------------------------------------------
     Listes
     -------------------------------------------------------------------------- */
  function listSearch(placeholder) {
    return `<label class="admin-list-search">${icon('search')}<input type="search" placeholder="${escapeAttr(placeholder)}" data-admin-list-search aria-label="${escapeAttr(placeholder)}"></label>`;
  }

  function renderListPanel({ rows, emptyMessage, searchPlaceholder, countLabel }) {
    return `<div class="admin-panel admin-list-panel">
      <div class="admin-list-tools">
        ${listSearch(searchPlaceholder)}
        <span class="admin-list-count">${escapeHTML(countLabel)}</span>
      </div>
      <div class="admin-list" data-admin-list>
        ${rows || '<div class="admin-empty-inline">Aucun contenu.</div>'}
      </div>
      ${emptyListState(emptyMessage)}
    </div>`;
  }

  function renderCoursesSection() {
    const rows = COURSES.map(course => `<div class="admin-list-row" data-admin-row data-search="${escapeAttr(normalize(`${course.title} ${course.subject} ${course.level} ${course.tag}`))}">
      <span class="admin-swatch" style="background:var(--${course.color || 'lime'})">${escapeHTML(course.subject.slice(0, 1))}</span>
      <div class="admin-row-main">
        <strong>${escapeHTML(course.title)}</strong>
        <p>${escapeHTML(course.subject)} · ${escapeHTML(course.level)} · ${escapeHTML(course.tag)} · ${course.sections?.length || 0} sections</p>
      </div>
      <div class="admin-row-badges">${course.featured ? adminPill('Mis en avant', 'lime') : ''}${adminPill(`${course.progress || 0}%`, 'muted')}</div>
      <div class="admin-row-actions">
        <a class="admin-mini-action" href="#/cours/${escapeAttr(course.id)}" target="_blank" rel="noopener">Voir</a>
        ${adminActionButton({ label: 'Modifier', action: 'edit', id: '', tone: '' }).replace('data-admin-edit=""', `data-admin-edit="course" data-admin-id="${escapeAttr(course.id)}"`)}
        ${adminActionButton({ label: 'Supprimer', action: 'delete', id: '', tone: 'danger' }).replace('data-admin-delete=""', `data-admin-delete="course" data-admin-id="${escapeAttr(course.id)}"`)}
      </div>
    </div>`).join('');
    return `${sectionIntro('Bibliothèque', 'Les cours.', 'Ajoute, modifie ou retire les chapitres et leurs exercices d’application.', `<button class="btn btn--dark" type="button" data-admin-new="course">${icon('plus')} Nouveau cours</button>`)}
      ${renderListPanel({ rows, emptyMessage: 'Aucun cours ne correspond à cette recherche.', searchPlaceholder: 'Chercher un cours…', countLabel: `${COURSES.length} cours` })}`;
  }

  function renderExercisesSection() {
    const rows = EXERCISES.map(exercise => `<div class="admin-list-row" data-admin-row data-search="${escapeAttr(normalize(`${exercise.title} ${exercise.subject} ${exercise.level} ${exercise.tag} ${exercise.source}`))}">
      <span class="admin-swatch admin-swatch--dark">${icon('target')}</span>
      <div class="admin-row-main">
        <strong>${escapeHTML(exercise.title)}</strong>
        <p>${escapeHTML(exercise.subject)} · ${escapeHTML(exercise.level)} · ${exercise.stars}/5 · ${exercise.minutes} min · ${escapeHTML(exercise.source)}</p>
      </div>
      <div class="admin-row-badges">${adminPill(`${exercise.solution?.length || 0} étapes`, 'muted')}</div>
      <div class="admin-row-actions">
        <button class="admin-mini-action" type="button" data-exercise="${escapeAttr(exercise.id)}">Aperçu</button>
        <button class="admin-mini-action" type="button" data-admin-edit="exercise" data-admin-id="${escapeAttr(exercise.id)}">Modifier</button>
        <button class="admin-mini-action admin-mini-action--danger" type="button" data-admin-delete="exercise" data-admin-id="${escapeAttr(exercise.id)}">Supprimer</button>
      </div>
    </div>`).join('');
    return `${sectionIntro('Entraînement', 'Les exercices.', 'Gère les énoncés, les indices, les étapes de correction et les réponses finales.', `<button class="btn btn--dark" type="button" data-admin-new="exercise">${icon('plus')} Nouvel exercice</button>`)}
      ${renderListPanel({ rows, emptyMessage: 'Aucun exercice ne correspond à cette recherche.', searchPlaceholder: 'Chercher un exercice…', countLabel: `${EXERCISES.length} exercices` })}`;
  }

  function renderPapersSection() {
    const rows = PAPERS.map(paper => `<div class="admin-list-row" data-admin-row data-search="${escapeAttr(normalize(`${paper.title} ${paper.school} ${paper.year} ${paper.subject} ${paper.track}`))}">
      <span class="admin-swatch admin-swatch--paper">${escapeHTML(String(paper.short || paper.school).slice(0, 3))}</span>
      <div class="admin-row-main">
        <strong>${escapeHTML(paper.title)}</strong>
        <p>${escapeHTML(paper.school)} · ${paper.year} · ${escapeHTML(paper.subject)} · ${escapeHTML(paper.track)} · ${escapeHTML(paper.duration)}</p>
      </div>
      <div class="admin-row-badges">${paper.hot ? adminPill('Hot', 'lime') : ''}${paper.correction ? adminPill('Corrigé', 'mint') : adminPill('Sans corrigé', 'muted')}</div>
      <div class="admin-row-actions">
        <button class="admin-mini-action" type="button" data-paper="${escapeAttr(paper.id)}">Aperçu</button>
        <button class="admin-mini-action" type="button" data-admin-edit="paper" data-admin-id="${escapeAttr(paper.id)}">Modifier</button>
        <button class="admin-mini-action admin-mini-action--danger" type="button" data-admin-delete="paper" data-admin-id="${escapeAttr(paper.id)}">Supprimer</button>
      </div>
    </div>`).join('');
    return `${sectionIntro('Banque de concours', 'Les sujets.', 'Ajoute une épreuve, marque un corrigé comme disponible et garde la banque à jour.', `<button class="btn btn--dark" type="button" data-admin-new="paper">${icon('plus')} Nouveau sujet</button>`)}
      ${renderListPanel({ rows, emptyMessage: 'Aucun sujet ne correspond à cette recherche.', searchPlaceholder: 'Chercher un sujet…', countLabel: `${PAPERS.length} sujets` })}`;
  }

  function renderForumSection() {
    const rows = forumThreads.map(thread => `<div class="admin-list-row" data-admin-row data-search="${escapeAttr(normalize(`${thread.title} ${thread.category} ${thread.author} ${(thread.tags || []).join(' ')}`))}">
      <span class="admin-swatch admin-swatch--avatar avatar--${escapeAttr(thread.avatarColor || 'lime')}">${escapeHTML(thread.initials || initials(thread.author || '?'))}</span>
      <div class="admin-row-main">
        <strong>${escapeHTML(thread.title)}</strong>
        <p>${escapeHTML(thread.category)} · ${escapeHTML(thread.author)} · ${thread.answers?.length || 0} réponses affichées · ${escapeHTML(String(thread.views || '0'))} vues</p>
      </div>
      <div class="admin-row-badges">${thread.pinned ? adminPill('Épinglé', 'lime') : ''}${adminPill(`${thread.upvotes || 0} ↑`, 'muted')}</div>
      <div class="admin-row-actions">
        <a class="admin-mini-action" href="#/forum/${escapeAttr(thread.id)}" target="_blank" rel="noopener">Voir</a>
        <button class="admin-mini-action" type="button" data-admin-edit="thread" data-admin-id="${escapeAttr(thread.id)}">Modifier</button>
        <button class="admin-mini-action admin-mini-action--danger" type="button" data-admin-delete="thread" data-admin-id="${escapeAttr(thread.id)}">Supprimer</button>
      </div>
    </div>`).join('');
    return `${sectionIntro('Communauté', 'Le forum.', 'Crée une discussion, corrige un message ou retire un sujet devenu inutile.', `<button class="btn btn--dark" type="button" data-admin-new="thread">${icon('plus')} Nouvelle discussion</button>`)}
      ${renderListPanel({ rows, emptyMessage: 'Aucune discussion ne correspond à cette recherche.', searchPlaceholder: 'Chercher une discussion…', countLabel: `${forumThreads.length} discussions` })}`;
  }

  function renderDailySection() {
    const exercise = EXERCISES.find(item => item.id === DAILY_CHALLENGE.id);
    return `${sectionIntro('Rituel quotidien', 'Le défi du jour.', 'Un énoncé court, trois étapes et une carotte XP. Il change chaque jour dans l’esprit, pas encore automatiquement dans le code.', `<button class="btn btn--dark" type="button" data-admin-edit="daily" data-admin-id="daily">${icon('file')} Modifier le défi</button>`)}
      <div class="admin-daily-card">
        <div class="admin-daily-copy">
          <p class="eyebrow"><span class="eyebrow-dot"></span>${escapeHTML(DAILY_CHALLENGE.eyebrow)}</p>
          <h3>${escapeHTML(DAILY_CHALLENGE.title)}</h3>
          <p>${DAILY_CHALLENGE.statement}</p>
          <div class="admin-daily-meta">
            <span>${icon('flame')} ${DAILY_CHALLENGE.participants} participants</span>
            <span>${icon('sparkles')} +${DAILY_CHALLENGE.xp} XP</span>
            <span>${icon('target')} ${exercise ? escapeHTML(exercise.title) : 'Exercice lié introuvable'}</span>
          </div>
        </div>
        <div class="admin-daily-steps">
          ${(DAILY_CHALLENGE.steps || []).map((step, index) => `<div><span>${String(index + 1).padStart(2, '0')}</span><p>${step}</p></div>`).join('') || '<div class="admin-empty-inline">Aucune étape.</div>'}
        </div>
      </div>
      <div class="admin-note-strip">${icon('lightbulb')} <span>Le bouton « Version complète » ouvre l’exercice lié. Vérifie que l’identifiant du défi correspond bien à un exercice existant.</span></div>`;
  }

  function renderSettingsSection() {
    const customPassword = Boolean(localStorage.getItem(ADMIN_HASH_KEY));
    return `${sectionIntro('Réglages', 'Les clés du studio.', 'Sécurise l’accès, sauvegarde ton contenu et remets les données de démonstration à zéro.', '')}
      <div class="admin-settings-grid">
        <section class="admin-panel">
          <div class="admin-panel-head"><div><p class="eyebrow">Sécurité locale</p><h3>Mot de passe admin.</h3></div>${customPassword ? adminPill('Personnalisé', 'mint') : adminPill('Par défaut', 'butter')}</div>
          <p class="admin-panel-desc">Ce mot de passe protège l’accès au studio dans ce navigateur. Ce n’est pas une authentification serveur : pour une mise en production publique, ajoute un vrai backend.</p>
          <form class="admin-settings-form" data-admin-password-form>
            ${adminField({ label: 'Nouveau mot de passe', name: 'password', type: 'password', required: true, placeholder: '8 caractères minimum', autocomplete: 'new-password' })}
            ${adminField({ label: 'Confirmer le mot de passe', name: 'confirmPassword', type: 'password', required: true, placeholder: 'Répète le mot de passe', autocomplete: 'new-password' })}
            <button class="btn btn--dark" type="submit">Mettre à jour l’accès ${icon('arrowRight')}</button>
          </form>
          ${customPassword ? '' : '<p class="admin-inline-warning">Le mot de passe par défaut est encore actif. Change-le avant de partager l’accès.</p>'}
        </section>
        <section class="admin-panel">
          <div class="admin-panel-head"><div><p class="eyebrow">Sauvegarde</p><h3>Exporter le contenu.</h3></div></div>
          <p class="admin-panel-desc">Le JSON contient les cours, exercices, sujets, défi et forum. Il peut être réimporté plus tard. L’export <code>data.js</code> remplace le fichier de données pour rendre les changements permanents.</p>
          <div class="admin-button-row">
            <button class="btn btn--outline" type="button" data-admin-export-json>${icon('download')} Sauvegarde JSON</button>
            <button class="btn btn--outline" type="button" data-admin-export-datajs>${icon('code')} Exporter data.js</button>
          </div>
        </section>
        <section class="admin-panel">
          <div class="admin-panel-head"><div><p class="eyebrow">Restauration</p><h3>Importer une sauvegarde.</h3></div></div>
          <p class="admin-panel-desc">Remplace le contenu actuel par une sauvegarde exportée depuis ce studio. Une confirmation est demandée avant toute modification.</p>
          <input type="file" accept="application/json,.json" hidden data-admin-import>
          <button class="btn btn--outline" type="button" data-admin-import-trigger>${icon('download')} Choisir un fichier JSON</button>
        </section>
        <section class="admin-panel admin-panel--danger">
          <div class="admin-panel-head"><div><p class="eyebrow">Zone sensible</p><h3>Remettre à zéro.</h3></div></div>
          <p class="admin-panel-desc">Restaure les données d’origine de <code>data.js</code>. Les modifications locales seront perdues.</p>
          <div class="admin-button-row">
            <button class="btn btn--outline" type="button" data-admin-reset-resources>Les ressources</button>
            <button class="btn btn--outline" type="button" data-admin-reset-forum>Le forum</button>
          </div>
        </section>
      </div>
      <div class="admin-note-strip">${icon('lock')} <span><strong>Comment ça marche ?</strong> Les surcharges sont stockées dans <code>localStorage</code> et appliquées avant le rendu. Exporte puis remplace <code>data.js</code> pour figer les changements dans le code.</span></div>`;
  }

  function renderSection(section) {
    switch (section) {
      case 'courses': return renderCoursesSection();
      case 'exercises': return renderExercisesSection();
      case 'papers': return renderPapersSection();
      case 'forum': return renderForumSection();
      case 'daily': return renderDailySection();
      case 'settings': return renderSettingsSection();
      default: return renderDashboard();
    }
  }

  /* --------------------------------------------------------------------------
     Éditeurs
     -------------------------------------------------------------------------- */
  function renderEditor() {
    const editing = adminState.editing;
    if (!editing) return renderDashboard();
    let form = '';
    let title = '';
    if (editing.type === 'course') {
      form = renderCourseForm(editing.draft);
      title = editing.mode === 'new' ? 'Nouveau cours' : `Modifier « ${editing.draft.title} »`;
    } else if (editing.type === 'exercise') {
      form = renderExerciseForm(editing.draft);
      title = editing.mode === 'new' ? 'Nouvel exercice' : `Modifier « ${editing.draft.title} »`;
    } else if (editing.type === 'paper') {
      form = renderPaperForm(editing.draft);
      title = editing.mode === 'new' ? 'Nouveau sujet' : `Modifier « ${editing.draft.title} »`;
    } else if (editing.type === 'thread') {
      form = renderThreadForm(editing.draft);
      title = editing.mode === 'new' ? 'Nouvelle discussion' : `Modifier « ${editing.draft.title} »`;
    } else {
      form = renderDailyForm(editing.draft);
      title = 'Modifier le défi du jour';
    }
    return `<div class="admin-editor">
      <div class="admin-editor-head">
        <button class="admin-back" type="button" data-admin-back>${icon('arrowLeft')} Retour à ${escapeHTML(SECTION_LABELS[adminState.section] || 'la liste')}</button>
        <div>
          <p class="eyebrow"><span class="eyebrow-dot"></span>Édition · ${escapeHTML(SECTION_LABELS[adminState.section] || '')}</p>
          <h2>${escapeHTML(title)}</h2>
        </div>
        <div class="admin-editor-actions">
          <button class="btn btn--outline btn--sm" type="button" data-admin-back>Annuler</button>
          <button class="btn btn--dark btn--sm" type="submit" form="admin-editor-form">Enregistrer ${icon('check')}</button>
        </div>
      </div>
      ${form}
    </div>`;
  }

  function editorSection(title, description, body, extra = '') {
    return `<section class="admin-form-section">
      <div class="admin-form-section-head"><div><h3>${escapeHTML(title)}</h3>${description ? `<p>${escapeHTML(description)}</p>` : ''}</div>${extra}</div>
      ${body}
    </section>`;
  }

  function saveBar(label) {
    return `<div class="admin-savebar">
      <span class="admin-savebar-note">${icon('checkCircle')} Enregistré dans ce navigateur</span>
      <div class="admin-savebar-actions">
        <button class="btn btn--outline btn--sm" type="button" data-admin-back>Annuler</button>
        <button class="btn btn--dark" type="submit" form="admin-editor-form">${escapeHTML(label)} ${icon('arrowRight')}</button>
      </div>
    </div>`;
  }

  function courseSectionMarkup(section = {}, number = null) {
    return repeatCard('course-section', `Section${number ? ` ${number}` : ''}`, `
      <div class="admin-form-grid">
        ${adminField({ label: 'Titre de la section', dataField: 'title', value: section.title || '', required: true, full: true, placeholder: 'Ex. Diagonaliser, vraiment' })}
        ${adminField({ label: 'Identifiant d’ancre', dataField: 'id', value: section.id || '', placeholder: 'diagonalisation', help: 'Sans espaces. Sert au sommaire.' })}
        ${adminField({ label: 'Kicker', dataField: 'kicker', value: section.kicker || '', placeholder: '03 · Le critère' })}
        ${adminField({ label: 'Paragraphes', dataField: 'paragraphs', type: 'textarea', value: (section.paragraphs || []).join('\n'), full: true, rows: 7, code: true, help: 'Un paragraphe par ligne. HTML et KaTeX autorisés.' })}
        ${adminField({ label: 'Formule LaTeX', dataField: 'formula', value: section.formula || '', full: true, placeholder: 'E = \\bigoplus ...', help: 'Sans les délimiteurs $.' })}
        ${adminField({ label: 'Note « À retenir »', dataField: 'note', type: 'textarea', value: section.note || '', full: true, rows: 3, code: true, help: 'HTML autorisé.' })}
      </div>`);
  }

  function solutionStepMarkup(step = {}, number = null) {
    return repeatCard('solution-step', `Étape de correction${number ? ` ${number}` : ''}`, `
      <div class="admin-form-grid">
        ${adminField({ label: 'Titre de l’étape', dataField: 'title', value: step.title || '', required: true, full: true })}
        ${adminField({ label: 'Texte', dataField: 'text', type: 'textarea', value: step.text || '', full: true, rows: 4, code: true, help: 'HTML et KaTeX autorisés.' })}
        ${adminField({ label: 'Équation LaTeX', dataField: 'equation', value: step.equation || '', full: true, help: 'Facultatif. Sans les délimiteurs $.' })}
      </div>`);
  }

  function threadAnswerMarkup(answer = {}, number = null) {
    return repeatCard('thread-answer', `Réponse${number ? ` ${number}` : ''}`, `
      <input type="hidden" data-field="id" value="${escapeAttr(answer.id || '')}">
      <div class="admin-form-grid">
        ${adminField({ label: 'Auteur', dataField: 'author', value: answer.author || '', required: true })}
        ${adminField({ label: 'Classe · établissement', dataField: 'grade', value: answer.grade || '', placeholder: 'MP* · Ginette' })}
        ${adminField({ label: 'Temps affiché', dataField: 'time', value: answer.time || 'à l’instant', placeholder: 'il y a 2 h' })}
        ${adminField({ label: 'Upvotes', dataField: 'upvotes', type: 'number', value: answer.upvotes ?? 0, min: 0 })}
        ${adminField({ label: 'Couleur d’avatar', dataField: 'avatarColor', type: 'select', value: answer.avatarColor || 'lime', options: AVATAR_COLORS })}
        ${adminField({ label: 'Texte de la réponse', dataField: 'text', type: 'textarea', value: answer.text || '', required: true, full: true, rows: 4 })}
      </div>`);
  }

  function renderCourseForm(course) {
    const isNew = !adminState.editing.id;
    return `<form class="admin-form" id="admin-editor-form" data-admin-form="course" data-admin-id="${escapeAttr(adminState.editing.id || '')}">
      ${editorSection('Identité du cours', 'Les informations affichées dans la bibliothèque et sur la fiche.', `<div class="admin-form-grid">
        ${adminField({ label: 'Titre', name: 'title', value: course.title || '', required: true, full: true, placeholder: 'Ex. Réduction des endomorphismes' })}
        ${adminField({ label: 'Identifiant', name: 'id', value: course.id || '', required: !isNew, readonly: !isNew, help: isNew ? 'Généré depuis le titre si laissé vide.' : 'L’identifiant ne change plus une fois le cours créé.' })}
        ${adminField({ label: 'Matière', name: 'subject', type: 'select', value: course.subject || 'Maths', options: subjectOptions(), required: true })}
        ${adminField({ label: 'Niveau', name: 'level', type: 'select', value: course.level || 'MP', options: COURSE_LEVELS, required: true })}
        ${adminField({ label: 'Catégorie', name: 'tag', value: course.tag || 'Algèbre', required: true, placeholder: 'Algèbre, Analyse…' })}
        ${adminField({ label: 'Couleur', name: 'color', type: 'select', value: course.color || 'lime', options: colorOptions() })}
        ${adminField({ label: 'Type de couverture', name: 'coverType', type: 'select', value: course.coverType || 'matrix', options: COVER_TYPES })}
        ${adminField({ label: 'Formule de couverture', name: 'coverEq', value: course.coverEq || '', placeholder: 'A = PDP^{-1}' })}
        ${adminField({ label: 'Formule du cours', name: 'formula', value: course.formula || '', placeholder: 'Facultatif' })}
        ${adminField({ label: 'Chapitres', name: 'chaptersCount', type: 'number', value: course.chaptersCount ?? 1, min: 0 })}
        ${adminField({ label: 'Durée de lecture', name: 'duration', value: course.duration || '1 h 00', placeholder: '6 h 20' })}
        ${adminField({ label: 'Élèves', name: 'students', value: course.students || '0', placeholder: '2,4k' })}
        ${adminField({ label: 'Note / 5', name: 'rating', type: 'number', value: course.rating ?? 4.8, min: 0, max: 5, step: '0.1' })}
        ${adminField({ label: 'Progression affichée (%)', name: 'progress', type: 'number', value: course.progress ?? 0, min: 0, max: 100 })}
        ${adminField({ label: 'Description', name: 'description', type: 'textarea', value: course.description || '', required: true, full: true, rows: 3 })}
        ${adminCheckbox({ name: 'featured', label: 'Mettre en avant sur l’accueil', checked: Boolean(course.featured) })}
      </div>`)}
      ${editorSection('Objectifs & sommaire', 'Un objectif par ligne, un chapitre du sommaire par ligne.', `<div class="admin-form-grid">
        ${adminField({ label: 'Objectifs', name: 'objectives', type: 'textarea', value: (course.objectives || []).join('\n'), full: true, rows: 5, help: 'Un objectif par ligne.' })}
        ${adminField({ label: 'Sommaire', name: 'toc', type: 'textarea', value: (course.toc || []).join('\n'), full: true, rows: 6, help: 'Un titre de chapitre par ligne.' })}
      </div>`)}
      ${editorSection('Sections du cours', 'Le cœur du polycopié. Tu peux ajouter, réordonner ou supprimer des sections.', `<div class="admin-repeat-list" data-admin-repeat-container="course-sections">
        ${(course.sections || []).map((section, index) => courseSectionMarkup(section, index + 1)).join('')}
      </div>${addRepeatButton('course-section', 'Ajouter une section')}`)}
      ${editorSection('Exercice d’application', 'Il s’affiche en bas du cours, avec une réponse masquée.', `<div class="admin-form-grid">
        ${adminField({ label: 'Énoncé', name: 'exercisePrompt', type: 'textarea', value: course.exercise?.prompt || '', full: true, rows: 4, code: true, help: 'HTML et KaTeX autorisés.' })}
        ${adminField({ label: 'Réponse (LaTeX)', name: 'exerciseAnswer', type: 'textarea', value: course.exercise?.answer || '', full: true, rows: 2, help: 'Sans les délimiteurs $.' })}
      </div>`)}
      ${saveBar('Enregistrer le cours')}
    </form>`;
  }

  function renderExerciseForm(exercise) {
    const isNew = !adminState.editing.id;
    return `<form class="admin-form" id="admin-editor-form" data-admin-form="exercise" data-admin-id="${escapeAttr(adminState.editing.id || '')}">
      ${editorSection('Identité de l’exercice', 'Les métadonnées utilisées dans la bibliothèque et les filtres.', `<div class="admin-form-grid">
        ${adminField({ label: 'Titre', name: 'title', value: exercise.title || '', required: true, full: true })}
        ${adminField({ label: 'Identifiant', name: 'id', value: exercise.id || '', required: !isNew, readonly: !isNew, help: isNew ? 'Généré depuis le titre si laissé vide.' : 'Identifiant verrouillé.' })}
        ${adminField({ label: 'Matière', name: 'subject', type: 'select', value: exercise.subject || 'Maths', options: subjectOptions(), required: true })}
        ${adminField({ label: 'Niveau', name: 'level', type: 'select', value: exercise.level || 'MP', options: EXERCISE_LEVELS, required: true })}
        ${adminField({ label: 'Catégorie', name: 'tag', value: exercise.tag || 'Algèbre', required: true })}
        ${adminField({ label: 'Source', name: 'source', value: exercise.source || '', placeholder: 'Oral X · 2023' })}
        ${adminField({ label: 'Difficulté / 5', name: 'stars', type: 'number', value: exercise.stars ?? 3, min: 1, max: 5, required: true })}
        ${adminField({ label: 'Durée (min)', name: 'minutes', type: 'number', value: exercise.minutes ?? 20, min: 1, required: true })}
        ${adminField({ label: 'Équation d’aperçu', name: 'equation', value: exercise.equation || '', full: true, help: 'LaTeX, sans délimiteurs.' })}
        ${adminField({ label: 'Accroche', name: 'teaser', type: 'textarea', value: exercise.teaser || '', required: true, full: true, rows: 2 })}
      </div>`)}
      ${editorSection('Énoncé & indices', 'Les champs riches acceptent le HTML et les formules LaTeX.', `<div class="admin-form-grid">
        ${adminField({ label: 'Énoncé', name: 'statement', type: 'textarea', value: exercise.statement || '', required: true, full: true, rows: 5, code: true })}
        ${adminField({ label: 'Indice', name: 'hint', type: 'textarea', value: exercise.hint || '', full: true, rows: 3, code: true })}
      </div>`)}
      ${editorSection('Correction guidée', 'Chaque étape sera dévoilée dans la correction.', `<div class="admin-repeat-list" data-admin-repeat-container="solution-steps">
        ${(exercise.solution || []).map((step, index) => solutionStepMarkup(step, index + 1)).join('')}
      </div>${addRepeatButton('solution-step', 'Ajouter une étape')}`)}
      ${editorSection('Réponse finale', 'La réponse affichée dans le bloc vert.', `<div class="admin-form-grid">
        ${adminField({ label: 'Réponse (LaTeX)', name: 'answer', type: 'textarea', value: exercise.answer || '', required: true, full: true, rows: 2 })}
        ${adminField({ label: 'Résolutions', name: 'solves', type: 'number', value: exercise.solves ?? 0, min: 0 })}
        ${adminCheckbox({ name: 'verified', label: 'Corrigé vérifié', checked: Boolean(exercise.verified) })}
      </div>`)}
      ${editorSection('PDF associé (optionnel)', 'Affiche un PDF dans l’exercice au lieu de (ou en plus de) la correction tapée.', `<div class="admin-form-grid">
        ${adminField({ label: 'URL du PDF', name: 'pdf', value: exercise.pdf || '', full: true, help: 'Lien http(s) ou chemin local (ex. content/pdfs/exo.pdf).' })}
        <div class="admin-field admin-field--full">
          <label class="field-label">Importer un PDF</label>
          <input type="file" accept="application/pdf" data-admin-pdf-file="exercise">
          <p class="field-help">Le fichier est converti en données embarquées (peut être volumineux).</p>
        </div>
      </div>`)}
      ${saveBar('Enregistrer l’exercice')}
    </form>`;
  }

  function renderPaperForm(paper) {
    const isNew = !adminState.editing.id;
    return `<form class="admin-form" id="admin-editor-form" data-admin-form="paper" data-admin-id="${escapeAttr(adminState.editing.id || '')}">
      ${editorSection('Le sujet', 'Les métadonnées visibles dans la banque de concours.', `<div class="admin-form-grid">
        ${adminField({ label: 'Titre', name: 'title', value: paper.title || '', required: true, full: true, placeholder: 'Épreuve de mathématiques A' })}
        ${adminField({ label: 'Identifiant', name: 'id', value: paper.id || '', required: !isNew, readonly: !isNew, help: isNew ? 'Généré depuis l’école, l’année et le titre.' : 'Identifiant verrouillé.' })}
        ${adminField({ label: 'École', name: 'school', type: 'select', value: paper.school || 'X/ENS', options: SCHOOLS, required: true })}
        ${adminField({ label: 'Abréviation', name: 'short', value: paper.short || 'X', placeholder: 'X, CC, MP…' })}
        ${adminField({ label: 'Année', name: 'year', type: 'number', value: paper.year ?? 2026, min: 2000, max: 2100, required: true })}
        ${adminField({ label: 'Matière', name: 'subject', type: 'select', value: paper.subject || 'Maths', options: subjectOptions(), required: true })}
        ${adminField({ label: 'Filière', name: 'track', value: paper.track || 'MP', required: true })}
        ${adminField({ label: 'Durée', name: 'duration', value: paper.duration || '4 h', required: true })}
        ${adminField({ label: 'Difficulté / 5', name: 'difficulty', type: 'number', value: paper.difficulty ?? 3, min: 1, max: 5 })}
        ${adminField({ label: 'Structure', name: 'parts', value: paper.parts || '2 problèmes', placeholder: '2 problèmes' })}
        ${adminField({ label: 'Couleur', name: 'color', type: 'select', value: paper.color || 'lime', options: colorOptions() })}
        ${adminCheckbox({ name: 'hot', label: 'Marquer comme incontournable', checked: Boolean(paper.hot) })}
        ${adminCheckbox({ name: 'correction', label: 'Corrigé disponible', checked: Boolean(paper.correction) })}
      </div>`)}
      ${editorSection('PDF associé (optionnel)', 'Affiche le sujet/corrigé en PDF dans la banque de concours.', `<div class="admin-form-grid">
        ${adminField({ label: 'URL du PDF', name: 'pdf', value: paper.pdf || '', full: true, help: 'Lien http(s) ou chemin local (ex. content/pdfs/sujet.pdf).' })}
        <div class="admin-field admin-field--full">
          <label class="field-label">Importer un PDF</label>
          <input type="file" accept="application/pdf" data-admin-pdf-file="paper">
          <p class="field-help">Le fichier est converti en données embarquées (peut être volumineux).</p>
        </div>
      </div>`)}
      ${saveBar('Enregistrer le sujet')}
    </form>`;
  }

  function renderThreadForm(thread) {
    const isNew = !adminState.editing.id;
    return `<form class="admin-form" id="admin-editor-form" data-admin-form="thread" data-admin-id="${escapeAttr(adminState.editing.id || '')}">
      ${editorSection('La discussion', 'Les informations affichées dans la liste du forum.', `<div class="admin-form-grid">
        ${adminField({ label: 'Titre', name: 'title', value: thread.title || '', required: true, full: true })}
        ${adminField({ label: 'Catégorie', name: 'category', type: 'select', value: thread.category || 'Maths', options: FORUM_CATEGORIES, required: true })}
        ${adminField({ label: 'Auteur', name: 'author', value: thread.author || 'Équipe MEDIL', required: true })}
        ${adminField({ label: 'Classe · établissement', name: 'grade', value: thread.grade || 'Équipe MEDIL' })}
        ${adminField({ label: 'Temps affiché', name: 'time', value: thread.time || 'à l’instant' })}
        ${adminField({ label: 'Vues', name: 'views', value: thread.views || '0' })}
        ${adminField({ label: 'Upvotes', name: 'upvotes', type: 'number', value: thread.upvotes ?? 0, min: 0 })}
        ${adminField({ label: 'Nombre de réponses affiché', name: 'replies', type: 'number', value: thread.replies ?? (thread.answers?.length || 0), min: 0 })}
        ${adminField({ label: 'Tags', name: 'tags', value: (thread.tags || []).join(', '), full: true, help: 'Séparés par des virgules.' })}
        ${adminField({ label: 'Couleur d’avatar', name: 'avatarColor', type: 'select', value: thread.avatarColor || 'lime', options: AVATAR_COLORS })}
        ${adminField({ label: 'Extrait', name: 'excerpt', type: 'textarea', value: thread.excerpt || '', full: true, rows: 2, help: 'Laisse vide pour générer un extrait depuis le contenu.' })}
        ${adminCheckbox({ name: 'pinned', label: 'Épingler la discussion', checked: Boolean(thread.pinned) })}
      </div>`)}
      ${editorSection('Message initial', 'Il accepte les sauts de ligne.', `<div class="admin-form-grid">
        ${adminField({ label: 'Contenu', name: 'content', type: 'textarea', value: thread.content || '', required: true, full: true, rows: 8 })}
      </div>`)}
      ${editorSection('Réponses', 'Modère ou ajoute des réponses au fil.', `<div class="admin-repeat-list" data-admin-repeat-container="thread-answers">
        ${(thread.answers || []).map((answer, index) => threadAnswerMarkup(answer, index + 1)).join('')}
      </div>${addRepeatButton('thread-answer', 'Ajouter une réponse')}`)}
      ${saveBar('Enregistrer la discussion')}
    </form>`;
  }

  function renderDailyForm(daily) {
    return `<form class="admin-form" id="admin-editor-form" data-admin-form="daily" data-admin-id="daily">
      ${editorSection('Le défi', 'Le bloc affiché sur la page d’accueil.', `<div class="admin-form-grid">
        ${adminField({ label: 'Surtitre', name: 'eyebrow', value: daily.eyebrow || '', full: true, placeholder: 'Défi du jour · MP · Algèbre' })}
        ${adminField({ label: 'Titre', name: 'title', value: daily.title || '', required: true, full: true })}
        ${adminField({ label: 'Énoncé', name: 'statement', type: 'textarea', value: daily.statement || '', required: true, full: true, rows: 4, code: true, help: 'HTML et KaTeX autorisés.' })}
        ${adminField({ label: 'Équation LaTeX', name: 'equation', value: daily.equation || '', full: true })}
        ${adminField({ label: 'Participants', name: 'participants', type: 'number', value: daily.participants ?? 0, min: 0 })}
        ${adminField({ label: 'XP gagnés', name: 'xp', type: 'number', value: daily.xp ?? 0, min: 0 })}
        ${adminField({ label: 'Exercice lié', name: 'exerciseId', type: 'select', value: daily.id || '', options: EXERCISES.map(exercise => ({ value: exercise.id, label: `${exercise.subject} · ${exercise.title}` })), full: true, help: 'Le bouton « Version complète » ouvrira cet exercice.' })}
        ${adminField({ label: 'Étapes de correction', name: 'steps', type: 'textarea', value: (daily.steps || []).join('\n'), full: true, rows: 6, code: true, help: 'Une étape par ligne. HTML et KaTeX autorisés.' })}
      </div>`)}
      ${saveBar('Enregistrer le défi')}
    </form>`;
  }

  /* --------------------------------------------------------------------------
     Lecture des formulaires
     -------------------------------------------------------------------------- */
  function valueOf(form, name, trim = true) {
    const value = String(new FormData(form).get(name) || '');
    return trim ? value.trim() : value;
  }

  function linesOf(form, name) {
    return valueOf(form, name).split(/\n+/).map(line => line.trim()).filter(Boolean);
  }

  function repeatItems(form, kind) {
    return [...form.querySelectorAll(`[data-admin-repeat="${kind}"]`)];
  }

  function fieldValue(item, field, trim = true) {
    const input = item.querySelector(`[data-field="${field}"]`);
    if (!input) return '';
    const value = input.value;
    return trim ? String(value || '').trim() : String(value || '');
  }

  function paragraphsValue(item) {
    return fieldValue(item, 'paragraphs', false)
      .split(/\n+/)
      .map(paragraph => paragraph.trim())
      .filter(Boolean);
  }

  function uniqueId(base, collection, currentId = '') {
    const cleanBase = slugify(base) || 'element';
    let candidate = cleanBase;
    let index = 2;
    while (collection.some(item => item.id === candidate && item.id !== currentId)) {
      candidate = `${cleanBase}-${index}`;
      index += 1;
    }
    return candidate;
  }

  function ensureEditorAvailable() {
    if (!isAdminUnlocked()) {
      renderRoute();
      return false;
    }
    return true;
  }

  function readCourseForm(form) {
    const currentId = form.dataset.adminId || '';
    const title = valueOf(form, 'title');
    const id = currentId || uniqueId(valueOf(form, 'id') || title, COURSES);
    const existing = COURSES.find(course => course.id === currentId);
    const sections = repeatItems(form, 'course-section').map((item, index) => ({
      id: fieldValue(item, 'id') || `section-${index + 1}`,
      kicker: fieldValue(item, 'kicker'),
      title: fieldValue(item, 'title'),
      paragraphs: paragraphsValue(item),
      formula: fieldValue(item, 'formula'),
      note: fieldValue(item, 'note', false)
    })).filter(section => section.title || section.paragraphs.length);
    const objectives = linesOf(form, 'objectives');
    const toc = linesOf(form, 'toc');
    return {
      ...(existing || {}),
      id,
      title,
      tag: valueOf(form, 'tag') || 'Cours',
      subject: valueOf(form, 'subject') || 'Maths',
      level: valueOf(form, 'level') || 'MP',
      color: valueOf(form, 'color') || 'lime',
      coverType: valueOf(form, 'coverType') || 'matrix',
      coverEq: valueOf(form, 'coverEq'),
      chaptersCount: Number(valueOf(form, 'chaptersCount')) || 0,
      duration: valueOf(form, 'duration') || '1 h 00',
      students: valueOf(form, 'students') || '0',
      rating: Math.min(5, Math.max(0, Number(valueOf(form, 'rating')) || 0)),
      progress: Math.min(100, Math.max(0, Number(valueOf(form, 'progress')) || 0)),
      featured: new FormData(form).has('featured'),
      description: valueOf(form, 'description'),
      formula: valueOf(form, 'formula'),
      objectives,
      toc: toc.length ? toc : sections.map(section => section.title).filter(Boolean),
      sections,
      exercise: {
        ...(existing?.exercise || {}),
        prompt: valueOf(form, 'exercisePrompt') || (existing?.exercise?.prompt || ''),
        answer: valueOf(form, 'exerciseAnswer') || (existing?.exercise?.answer || '')
      }
    };
  }

  function readExerciseForm(form) {
    const currentId = form.dataset.adminId || '';
    const title = valueOf(form, 'title');
    const id = currentId || uniqueId(valueOf(form, 'id') || title, EXERCISES);
    const existing = EXERCISES.find(exercise => exercise.id === currentId);
    const solution = repeatItems(form, 'solution-step').map(step => ({
      title: fieldValue(step, 'title'),
      text: fieldValue(step, 'text', false),
      equation: fieldValue(step, 'equation')
    })).filter(step => step.title || step.text || step.equation);
    return {
      ...(existing || {}),
      id,
      title,
      subject: valueOf(form, 'subject') || 'Maths',
      tag: valueOf(form, 'tag') || 'Exercice',
      source: valueOf(form, 'source'),
      level: valueOf(form, 'level') || 'MP',
      stars: Math.min(5, Math.max(1, Number(valueOf(form, 'stars')) || 1)),
      minutes: Math.max(1, Number(valueOf(form, 'minutes')) || 1),
      equation: valueOf(form, 'equation'),
      teaser: valueOf(form, 'teaser'),
      statement: valueOf(form, 'statement', false),
      hint: valueOf(form, 'hint', false),
      solution,
      answer: valueOf(form, 'answer', false),
      solves: Math.max(0, Number(valueOf(form, 'solves')) || 0),
      verified: new FormData(form).has('verified'),
      pdf: valueOf(form, 'pdf') || existing?.pdf || ''
    };
  }

  function readPaperForm(form) {
    const currentId = form.dataset.adminId || '';
    const title = valueOf(form, 'title');
    const school = valueOf(form, 'school') || 'X/ENS';
    const year = valueOf(form, 'year') || '2026';
    const id = currentId || uniqueId(valueOf(form, 'id') || `${school}-${year}-${title}`, PAPERS);
    const existing = PAPERS.find(paper => paper.id === currentId);
    return {
      ...(existing || {}),
      id,
      school,
      short: valueOf(form, 'short') || SCHOOL_SHORT[school] || 'X',
      year: Number(year) || new Date().getFullYear(),
      subject: valueOf(form, 'subject') || 'Maths',
      title,
      track: valueOf(form, 'track') || 'MP',
      duration: valueOf(form, 'duration') || '4 h',
      difficulty: Math.min(5, Math.max(1, Number(valueOf(form, 'difficulty')) || 1)),
      parts: valueOf(form, 'parts'),
      hot: new FormData(form).has('hot'),
      correction: new FormData(form).has('correction'),
      color: valueOf(form, 'color') || 'lime',
      pdf: valueOf(form, 'pdf') || existing?.pdf || ''
    };
  }

  function readThreadForm(form) {
    const currentId = form.dataset.adminId || '';
    const title = valueOf(form, 'title');
    const id = currentId || uniqueId(title, forumThreads);
    const existing = forumThreads.find(thread => thread.id === currentId);
    const content = valueOf(form, 'content', false);
    const answers = repeatItems(form, 'thread-answer').map((item, index) => {
      const author = fieldValue(item, 'author') || 'Taupin MEDIL';
      return {
        id: fieldValue(item, 'id') || `reponse-${Date.now()}-${index}`,
        author,
        initials: initials(author),
        avatarColor: fieldValue(item, 'avatarColor') || 'lime',
        grade: fieldValue(item, 'grade'),
        time: fieldValue(item, 'time') || 'à l’instant',
        text: fieldValue(item, 'text', false),
        upvotes: Math.max(0, Number(fieldValue(item, 'upvotes')) || 0)
      };
    }).filter(answer => answer.text);
    return {
      ...(existing || {}),
      id,
      category: valueOf(form, 'category') || 'Maths',
      title,
      excerpt: valueOf(form, 'excerpt') || `${content.trim().slice(0, 175)}…`,
      author: valueOf(form, 'author') || 'Équipe MEDIL',
      initials: initials(valueOf(form, 'author') || 'Équipe MEDIL'),
      avatarColor: valueOf(form, 'avatarColor') || 'lime',
      grade: valueOf(form, 'grade'),
      time: valueOf(form, 'time') || 'à l’instant',
      replies: Math.max(0, Number(valueOf(form, 'replies')) || 0, answers.length),
      views: valueOf(form, 'views') || '0',
      upvotes: Math.max(0, Number(valueOf(form, 'upvotes')) || 0),
      tags: valueOf(form, 'tags').split(',').map(tag => tag.trim()).filter(Boolean),
      pinned: new FormData(form).has('pinned'),
      content,
      answers
    };
  }

  /* --------------------------------------------------------------------------
     Sauvegarde
     -------------------------------------------------------------------------- */
  function editorialSnapshot() {
    return {
      version: 1,
      savedAt: new Date().toISOString(),
      courses: clone(COURSES),
      exercises: clone(EXERCISES),
      papers: clone(PAPERS),
      dailyChallenge: clone(DAILY_CHALLENGE)
    };
  }

  function fullSnapshot() {
    return {
      ...editorialSnapshot(),
      threads: clone(forumThreads)
    };
  }

  function persistEditorial() {
    return writeStore(CONTENT_KEY, editorialSnapshot());
  }

  function persistForum() {
    return writeStore('medil.threads', forumThreads);
  }

  function finishEditing(message, section) {
    adminState.editing = null;
    adminState.dirty = false;
    adminState.section = section || adminState.section;
    window.invalidateDetailCache?.();
    renderRoute();
    setTimeout(() => toast(message, { type: 'success' }), 40);
  }

  function saveCourse(form) {
    const data = readCourseForm(form);
    if (!data.title) {
      toast('Le titre du cours est obligatoire.');
      return;
    }
    const currentId = form.dataset.adminId || '';
    const existingIndex = COURSES.findIndex(course => course.id === currentId);
    if (existingIndex >= 0) COURSES[existingIndex] = data;
    else COURSES.unshift(data);
    if (persistEditorial()) finishEditing(existingIndex >= 0 ? 'Cours mis à jour.' : 'Cours ajouté.', 'courses');
  }

  function saveExercise(form) {
    const data = readExerciseForm(form);
    if (!data.title) {
      toast('Le titre de l’exercice est obligatoire.');
      return;
    }
    const currentId = form.dataset.adminId || '';
    const existingIndex = EXERCISES.findIndex(exercise => exercise.id === currentId);
    if (existingIndex >= 0) EXERCISES[existingIndex] = data;
    else EXERCISES.unshift(data);
    if (persistEditorial()) finishEditing(existingIndex >= 0 ? 'Exercice mis à jour.' : 'Exercice ajouté.', 'exercises');
  }

  function savePaper(form) {
    const data = readPaperForm(form);
    if (!data.title) {
      toast('Le titre du sujet est obligatoire.');
      return;
    }
    const currentId = form.dataset.adminId || '';
    const existingIndex = PAPERS.findIndex(paper => paper.id === currentId);
    if (existingIndex >= 0) PAPERS[existingIndex] = data;
    else PAPERS.unshift(data);
    if (persistEditorial()) finishEditing(existingIndex >= 0 ? 'Sujet mis à jour.' : 'Sujet ajouté.', 'papers');
  }

  function saveThread(form) {
    const data = readThreadForm(form);
    if (!data.title) {
      toast('Le titre de la discussion est obligatoire.');
      return;
    }
    const currentId = form.dataset.adminId || '';
    const existingIndex = forumThreads.findIndex(thread => thread.id === currentId);
    if (existingIndex >= 0) forumThreads[existingIndex] = data;
    else forumThreads.unshift(data);
    if (persistForum()) finishEditing(existingIndex >= 0 ? 'Discussion mise à jour.' : 'Discussion publiée.', 'forum');
  }

  function saveDaily(form) {
    const data = {
      ...clone(DAILY_CHALLENGE),
      eyebrow: valueOf(form, 'eyebrow'),
      title: valueOf(form, 'title'),
      statement: valueOf(form, 'statement', false),
      equation: valueOf(form, 'equation'),
      participants: Math.max(0, Number(valueOf(form, 'participants')) || 0),
      xp: Math.max(0, Number(valueOf(form, 'xp')) || 0),
      id: valueOf(form, 'exerciseId') || DAILY_CHALLENGE.id,
      steps: linesOf(form, 'steps')
    };
    if (!data.title) {
      toast('Le titre du défi est obligatoire.');
      return;
    }
    replaceObject(DAILY_CHALLENGE, data);
    if (persistEditorial()) finishEditing('Défi du jour mis à jour.', 'daily');
  }

  function startEditing(type, id) {
    if (!ensureEditorAvailable()) return;
    const map = {
      course: COURSES,
      exercise: EXERCISES,
      paper: PAPERS,
      thread: forumThreads
    };
    if (type === 'daily') {
      adminState.section = 'daily';
      adminState.editing = { type, mode: 'edit', id: 'daily', draft: clone(DAILY_CHALLENGE) };
      adminState.dirty = false;
      renderRoute();
      return;
    }
    const collection = map[type];
    if (!collection) return;
    const existing = id ? collection.find(item => item.id === id) : null;
    if (id && !existing) {
      toast('Ce contenu est introuvable.');
      return;
    }
    const section = EDITOR_SECTION[type];
    const draft = existing ? clone(existing) : newDraft(type);
    adminState.section = section;
    adminState.editing = { type, mode: existing ? 'edit' : 'new', id: existing?.id || '', draft };
    adminState.dirty = false;
    renderRoute();
  }

  function newDraft(type) {
    if (type === 'course') {
      return {
        id: '',
        title: '',
        tag: 'Algèbre',
        subject: 'Maths',
        level: 'MP',
        color: 'lime',
        coverType: 'matrix',
        coverEq: 'A = PDP^{-1}',
        chaptersCount: 1,
        duration: '1 h 00',
        students: '0',
        rating: 4.8,
        progress: 0,
        featured: false,
        description: '',
        formula: '',
        objectives: [],
        toc: [],
        sections: [{ id: 'introduction', kicker: '01 · Le socle', title: '', paragraphs: [''], formula: '', note: '' }],
        exercise: { prompt: '', answer: '' }
      };
    }
    if (type === 'exercise') {
      return {
        id: '',
        title: '',
        subject: 'Maths',
        tag: 'Algèbre',
        source: 'MEDIL · 2026',
        level: 'MP',
        stars: 3,
        minutes: 20,
        equation: '',
        teaser: '',
        statement: '',
        hint: '',
        solution: [{ title: 'Idée directrice', text: '', equation: '' }],
        answer: '',
        solves: 0,
        verified: false
      };
    }
    if (type === 'paper') {
      return {
        id: '',
        school: 'X/ENS',
        short: 'X',
        year: new Date().getFullYear(),
        subject: 'Maths',
        title: '',
        track: 'MP',
        duration: '4 h',
        difficulty: 3,
        parts: '2 problèmes',
        hot: false,
        correction: false,
        color: 'lime'
      };
    }
    if (type === 'thread') {
      return {
        id: '',
        category: 'Maths',
        title: '',
        excerpt: '',
        author: 'Équipe MEDIL',
        initials: 'EM',
        avatarColor: 'lime',
        grade: 'Équipe MEDIL',
        time: 'à l’instant',
        replies: 0,
        views: '0',
        upvotes: 0,
        tags: ['MEDIL'],
        pinned: false,
        content: '',
        answers: []
      };
    }
    return {};
  }

  /* --------------------------------------------------------------------------
     Suppression
     -------------------------------------------------------------------------- */
  function removeCourseReferences(id) {
    try {
      savedCourses.delete(id);
      completedItems.delete(id);
    } catch (error) {
      /* Nettoyage best-effort. */
    }
  }

  function deleteContent(type, id) {
    if (!ensureEditorAvailable()) return;
    if (type === 'course') {
      const course = COURSES.find(item => item.id === id);
      if (!course || !window.confirm(`Supprimer définitivement le cours « ${course.title} » ?`)) return;
      replaceArray(COURSES, COURSES.filter(item => item.id !== id));
      removeCourseReferences(id);
      persistEditorial();
      finishEditing('Cours supprimé.', 'courses');
      return;
    }
    if (type === 'exercise') {
      const exercise = EXERCISES.find(item => item.id === id);
      if (!exercise || !window.confirm(`Supprimer définitivement l’exercice « ${exercise.title} » ?`)) return;
      if (EXERCISES.length <= 1) {
        toast('Garde au moins un exercice : le défi du jour et les cours en ont besoin.');
        return;
      }
      replaceArray(EXERCISES, EXERCISES.filter(item => item.id !== id));
      try {
        savedExercises.delete(id);
      } catch (error) {
        /* Best-effort. */
      }
      if (DAILY_CHALLENGE.id === id) {
        DAILY_CHALLENGE.id = EXERCISES[0]?.id || '';
      }
      persistEditorial();
      finishEditing('Exercice supprimé.', 'exercises');
      return;
    }
    if (type === 'paper') {
      const paper = PAPERS.find(item => item.id === id);
      if (!paper || !window.confirm(`Supprimer définitivement le sujet « ${paper.title} » ?`)) return;
      replaceArray(PAPERS, PAPERS.filter(item => item.id !== id));
      persistEditorial();
      finishEditing('Sujet supprimé.', 'papers');
      return;
    }
    if (type === 'thread') {
      const thread = forumThreads.find(item => item.id === id);
      if (!thread || !window.confirm(`Supprimer définitivement la discussion « ${thread.title} » ?`)) return;
      replaceArray(forumThreads, forumThreads.filter(item => item.id !== id));
      likedThreads.delete(id);
      persistForum();
      finishEditing('Discussion supprimée.', 'forum');
    }
  }

  /* --------------------------------------------------------------------------
     Réglages, import et export
     -------------------------------------------------------------------------- */
  function downloadFile(filename, content, type = 'application/json') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportJSON() {
    downloadFile(`medil-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(fullSnapshot(), null, 2));
    toast('Sauvegarde JSON téléchargée.', { type: 'success' });
  }

  function exportDataJS() {
    const data = fullSnapshot();
    const header = `/* ==========================================================================
   MEDIL — Données générées depuis le Studio
   Export du ${new Date().toLocaleString('fr-FR')}
   Remplace data.js par ce fichier pour publier ces modifications.
   ========================================================================== */

`;
    const content = `${header}window.MEDIL_EDITORIAL = ${JSON.stringify({
      version: 2,
      savedAt: new Date().toISOString(),
      courses: data.courses,
      exercises: data.exercises,
      papers: data.papers,
      dailyChallenge: data.dailyChallenge,
      threads: data.threads
    }, null, 2)};\n`;
    downloadFile('data.generated.js', content, 'text/javascript');
    toast('Export data.js prêt. Renomme-le data.js pour le publier.', { type: 'success', duration: 5000 });
  }

  function resetResources() {
    if (!window.confirm('Restaurer les cours, exercices, sujets et défi d’origine ? Les modifications locales sur ces contenus seront perdues.')) return;
    replaceArray(COURSES, SEED.courses);
    replaceArray(EXERCISES, SEED.exercises);
    replaceArray(PAPERS, SEED.papers);
    replaceObject(DAILY_CHALLENGE, SEED.dailyChallenge);
    try { localStorage.removeItem(CONTENT_KEY); } catch (error) { /* Best-effort. */ }
    finishEditing('Ressources restaurées.', adminState.section);
  }

  function resetForum() {
    if (!window.confirm('Restaurer les discussions d’origine ? Les sujets et réponses publiés localement seront supprimés.')) return;
    replaceArray(forumThreads, SEED.threads);
    try { localStorage.removeItem('medil.threads'); } catch (error) { /* Best-effort. */ }
    finishEditing('Forum restauré.', 'forum');
  }

  function importFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result || ''));
        if (!Array.isArray(data.courses) || !Array.isArray(data.exercises) || !Array.isArray(data.papers)) {
          throw new Error('Format invalide');
        }
        if (!data.courses.every(isCourse) || !data.exercises.every(isExercise) || !data.papers.every(isPaper)) {
          throw new Error('Données invalides');
        }
        if (data.threads && (!Array.isArray(data.threads) || !data.threads.every(isThread))) {
          throw new Error('Forum invalide');
        }
        if (data.dailyChallenge && (typeof data.dailyChallenge !== 'object' || typeof data.dailyChallenge.title !== 'string')) {
          throw new Error('Défi invalide');
        }
        if (!window.confirm('Remplacer le contenu actuel par cette sauvegarde ? Cette action est irréversible.')) return;
        applyEditorialContent(data, true);
        if (data.dailyChallenge) replaceObject(DAILY_CHALLENGE, data.dailyChallenge);
        if (Array.isArray(data.threads)) {
          replaceArray(forumThreads, data.threads);
          persistForum();
        }
        persistEditorial();
        adminState.editing = null;
        adminState.dirty = false;
        adminState.section = 'dashboard';
        renderRoute();
        setTimeout(() => toast('Sauvegarde importée avec succès.', { type: 'success' }), 40);
      } catch (error) {
        toast('Import impossible : le fichier JSON n’est pas valide.', { type: 'error' });
      }
    };
    reader.onerror = () => toast('Impossible de lire ce fichier.', { type: 'error' });
    reader.readAsText(file);
  }

  /* --------------------------------------------------------------------------
     Recherche dans les listes
     -------------------------------------------------------------------------- */
  function applyListSearch(input) {
    const panel = input.closest('.admin-list-panel');
    if (!panel) return;
    const query = normalize(input.value.trim());
    const rows = [...panel.querySelectorAll('[data-admin-row]')];
    let visible = 0;
    rows.forEach(row => {
      const match = !query || normalize(row.dataset.search || '').includes(query);
      row.hidden = !match;
      if (match) visible += 1;
    });
    const empty = panel.querySelector('[data-admin-search-empty]');
    if (empty) empty.hidden = visible !== 0 || rows.length === 0;
  }

  function renumberRepeats(kind) {
    const items = [...document.querySelectorAll(`[data-admin-repeat="${kind}"]`)];
    items.forEach((item, index) => {
      const label = item.querySelector('[data-repeat-title]');
      if (!label) return;
      const base = kind === 'course-section' ? 'Section' : kind === 'solution-step' ? 'Étape de correction' : 'Réponse';
      label.textContent = `${base} ${index + 1}`;
    });
  }

  /* --------------------------------------------------------------------------
     Événements
     -------------------------------------------------------------------------- */
  function dirtyCheck() {
    if (!adminState.editing || !adminState.dirty) return true;
    return window.confirm('Les modifications non enregistrées seront perdues. Continuer ?');
  }

  function navigateToSection(section) {
    if (!dirtyCheck()) return;
    adminState.section = section;
    adminState.editing = null;
    adminState.dirty = false;
    renderRoute();
  }

  function handleClick(event, target) {
    if (!document.body.classList.contains('admin-mode')) return false;

    // Navigation hors du studio pendant une édition : demander confirmation.
    const externalLink = target.closest('a[href^="#/"]');
    if (adminState.editing && adminState.dirty && externalLink && !target.closest('.admin-page')) {
      if (!window.confirm('Les modifications non enregistrées seront perdues. Continuer ?')) {
        event.preventDefault();
        return true;
      }
      adminState.editing = null;
      adminState.dirty = false;
      return false;
    }

    if (target.closest('[data-admin-toggle-password]')) {
      const wrapper = target.closest('.admin-password-wrap');
      const input = wrapper?.querySelector('input');
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
        target.closest('button')?.setAttribute('aria-label', input.type === 'password' ? 'Afficher le mot de passe' : 'Masquer le mot de passe');
      }
      return true;
    }

    const nav = target.closest('[data-admin-nav]');
    if (nav) {
      event.preventDefault();
      navigateToSection(nav.dataset.adminNav);
      return true;
    }

    const edit = target.closest('[data-admin-edit]');
    if (edit) {
      event.preventDefault();
      if (!dirtyCheck()) return true;
      startEditing(edit.dataset.adminEdit, edit.dataset.adminId);
      return true;
    }

    const create = target.closest('[data-admin-new]');
    if (create) {
      event.preventDefault();
      if (!dirtyCheck()) return true;
      startEditing(create.dataset.adminNew);
      return true;
    }

    if (target.closest('[data-admin-back]')) {
      event.preventDefault();
      if (!dirtyCheck()) return true;
      adminState.editing = null;
      adminState.dirty = false;
      renderRoute();
      return true;
    }

    const remove = target.closest('[data-admin-delete]');
    if (remove) {
      event.preventDefault();
      deleteContent(remove.dataset.adminDelete, remove.dataset.adminId);
      return true;
    }

    const addRepeat = target.closest('[data-admin-add-repeat]');
    if (addRepeat) {
      event.preventDefault();
      const kind = addRepeat.dataset.adminAddRepeat;
      const containerMap = {
        'course-section': 'course-sections',
        'solution-step': 'solution-steps',
        'thread-answer': 'thread-answers'
      };
      const container = document.querySelector(`[data-admin-repeat-container="${containerMap[kind]}"]`);
      if (container) {
        const markup = kind === 'course-section' ? courseSectionMarkup() : kind === 'solution-step' ? solutionStepMarkup() : threadAnswerMarkup();
        container.insertAdjacentHTML('beforeend', markup);
        renumberRepeats(kind);
        adminState.dirty = true;
        container.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return true;
    }

    const removeRepeat = target.closest('[data-admin-remove-repeat]');
    if (removeRepeat) {
      event.preventDefault();
      const item = removeRepeat.closest('[data-admin-repeat]');
      const kind = item?.dataset.adminRepeat;
      if (item) {
        item.remove();
        if (kind) renumberRepeats(kind);
        adminState.dirty = true;
      }
      return true;
    }

    const moveRepeat = target.closest('[data-admin-move-repeat]');
    if (moveRepeat) {
      event.preventDefault();
      const item = moveRepeat.closest('[data-admin-repeat]');
      if (!item) return true;
      if (moveRepeat.dataset.adminMoveRepeat === 'up' && item.previousElementSibling) {
        item.parentElement.insertBefore(item, item.previousElementSibling);
      } else if (moveRepeat.dataset.adminMoveRepeat === 'down' && item.nextElementSibling) {
        item.parentElement.insertBefore(item.nextElementSibling, item);
      }
      renumberRepeats(item.dataset.adminRepeat);
      adminState.dirty = true;
      return true;
    }

    if (target.closest('[data-admin-logout]')) {
      event.preventDefault();
      if (!dirtyCheck()) return true;
      lockAdmin();
      adminState.editing = null;
      adminState.dirty = false;
      adminState.section = 'dashboard';
      renderRoute();
      setTimeout(() => toast('Studio verrouillé.'), 40);
      return true;
    }

    if (target.closest('[data-admin-export-json]')) {
      event.preventDefault();
      exportJSON();
      return true;
    }

    if (target.closest('[data-admin-export-datajs]')) {
      event.preventDefault();
      exportDataJS();
      return true;
    }

    if (target.closest('[data-admin-import-trigger]')) {
      event.preventDefault();
      document.querySelector('[data-admin-import]')?.click();
      return true;
    }

    if (target.closest('[data-admin-reset-resources]')) {
      event.preventDefault();
      resetResources();
      return true;
    }

    if (target.closest('[data-admin-reset-forum]')) {
      event.preventDefault();
      resetForum();
      return true;
    }

    return false;
  }

  function handleSubmit(event, form) {
    if (!document.body.classList.contains('admin-mode')) return false;

    if (form.matches('[data-admin-login]')) {
      event.preventDefault();
      const input = form.querySelector('input[name="password"]');
      const error = form.querySelector('[data-admin-login-error]');
      const value = String(input?.value || '');
      if (!value || !adminPasswordMatches(value)) {
        if (error) error.textContent = 'Mot de passe incorrect. Réessaie.';
        if (input) {
          input.value = '';
          input.focus();
        }
        return true;
      }
      unlockAdmin();
      adminState.section = 'dashboard';
      adminState.editing = null;
      renderRoute();
      setTimeout(() => toast('Studio déverrouillé. Bon travail.', { type: 'success' }), 40);
      return true;
    }

    if (form.matches('[data-admin-form]')) {
      event.preventDefault();
      if (!ensureEditorAvailable()) return true;
      const type = form.dataset.adminForm;
      if (type === 'course') saveCourse(form);
      else if (type === 'exercise') saveExercise(form);
      else if (type === 'paper') savePaper(form);
      else if (type === 'thread') saveThread(form);
      else if (type === 'daily') saveDaily(form);
      return true;
    }

    if (form.matches('[data-admin-password-form]')) {
      event.preventDefault();
      const data = new FormData(form);
      const password = String(data.get('password') || '');
      const confirmation = String(data.get('confirmPassword') || '');
      if (password.length < 8) {
        toast('Le mot de passe doit contenir au moins 8 caractères.');
        return true;
      }
      if (password !== confirmation) {
        toast('Les deux mots de passe ne correspondent pas.');
        return true;
      }
      localStorage.setItem(ADMIN_HASH_KEY, hashPassword(password));
      form.reset();
      renderRoute();
      setTimeout(() => toast('Mot de passe admin mis à jour.', { type: 'success' }), 40);
      return true;
    }

    return false;
  }

  function handleInput(event) {
    const input = event.target;
    if (input.matches('[data-admin-list-search]')) {
      applyListSearch(input);
      return true;
    }
    if (input.closest('[data-admin-form]')) {
      adminState.dirty = true;
      return true;
    }
    return false;
  }

  function handleChange(event) {
    const input = event.target;
    if (input.matches('[data-admin-import]')) {
      importFile(input.files?.[0]);
      input.value = '';
      return true;
    }
    if (input.matches('[data-admin-pdf-file]')) {
      const file = input.files?.[0];
      if (!file) return true;
      const reader = new FileReader();
      reader.onload = () => {
        const form = input.closest('form');
        const pdfInput = form?.querySelector('[name="pdf"]');
        if (pdfInput) pdfInput.value = String(reader.result || '');
        adminState.dirty = true;
      };
      reader.readAsDataURL(file);
      input.value = '';
      return true;
    }
    if (input.closest('[data-admin-form]')) {
      adminState.dirty = true;
      return true;
    }
    return false;
  }

  function afterRender({ pageKey }) {
    if (pageKey !== 'admin') {
      document.body.classList.remove('admin-mode');
      adminState.editing = null;
      adminState.dirty = false;
      return;
    }
    document.body.classList.add('admin-mode');
    if (!isAdminUnlocked()) {
      const input = document.querySelector('#admin-password');
      if (input && !input.value) input.focus();
    }
  }

  /* --------------------------------------------------------------------------
     API utilisée par app.js
     -------------------------------------------------------------------------- */
  window.MEDIL_ADMIN = {
    // Le routeur passe la route courante, mais le studio pilote son état via adminState.
    renderPage(route = null) {
      void route;
      return isAdminUnlocked() ? renderStudio() : renderGate();
    },
    afterRender,
    handleClick,
    handleSubmit,
    handleInput,
    handleChange
  };

  window.addEventListener('beforeunload', event => {
    if (adminState.dirty) {
      event.preventDefault();
      event.returnValue = '';
    }
  });
})();
