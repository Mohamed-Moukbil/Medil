import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const contentDir = path.join(root, 'content');

function readText(p) { return fs.readFileSync(p, 'utf8'); }
function fail(msg) { console.error('✗ ' + msg); process.exitCode = 1; }
function ok(msg) { console.log('✓ ' + msg); }

// 1. Manifest
const manifestPath = path.join(contentDir, 'index.js');
const manifestSource = readText(manifestPath);
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(manifestSource + '\n; globalThis.__MEDIL_MANIFEST__ = { COURSES, EXERCISES, PAPERS, SEED_THREADS, DAILY_CHALLENGE };', sandbox);
const { COURSES, EXERCISES, PAPERS, SEED_THREADS, DAILY_CHALLENGE } = sandbox.__MEDIL_MANIFEST__ || {};
if (!Array.isArray(COURSES) || !Array.isArray(EXERCISES) || !Array.isArray(PAPERS) || !Array.isArray(SEED_THREADS)) {
  fail('Manifest does not define COURSES/EXERCISES/PAPERS/SEED_THREADS arrays');
  process.exit(1);
}
ok(`Manifest loaded: ${COURSES.length} courses, ${EXERCISES.length} exercises, ${PAPERS.length} papers, ${SEED_THREADS.length} threads`);

function uniqueIds(list, label) {
  const ids = list.map(x => x?.id);
  const seen = new Set();
  for (const id of ids) {
    if (!id) { fail(`${label} entry missing id`); continue; }
    if (seen.has(id)) fail(`${label} duplicate id: ${id}`);
    seen.add(id);
  }
}
uniqueIds(COURSES, 'course');
uniqueIds(EXERCISES, 'exercise');
uniqueIds(PAPERS, 'paper');
uniqueIds(SEED_THREADS, 'thread');

// Required fields
const courseRequired = ['id', 'title', 'subject', 'level'];
const exerciseRequired = ['id', 'title', 'subject', 'level'];
const paperRequired = ['id', 'school', 'year', 'subject'];
const threadRequired = ['id', 'title'];
for (const c of COURSES) for (const k of courseRequired) if (c[k] === undefined) fail(`course ${c.id} missing ${k}`);
for (const e of EXERCISES) for (const k of exerciseRequired) if (e[k] === undefined) fail(`exercise ${e.id} missing ${k}`);
for (const p of PAPERS) for (const k of paperRequired) if (p[k] === undefined) fail(`paper ${p.id} missing ${k}`);
for (const t of SEED_THREADS) for (const k of threadRequired) if (t[k] === undefined) fail(`thread ${t.id} missing ${k}`);

// 2. Detail files exist and parse
function checkDetails(type, items) {
  const dir = path.join(contentDir, type === 'threads' ? 'threads' : type);
  const fsType = type === 'threads' ? 'threads' : type;
  const folder = path.join(contentDir, fsType);
  let count = 0;
  for (const item of items) {
    const file = path.join(folder, `${item.id}.json`);
    if (!fs.existsSync(file)) { fail(`missing detail file: ${path.relative(root, file)}`); continue; }
    let detail;
    try { detail = JSON.parse(readText(file)); } catch (e) { fail(`invalid JSON: ${file}: ${e.message}`); continue; }
    if (detail.id !== item.id) fail(`detail id mismatch in ${file}: ${detail.id} !== ${item.id}`);
    count++;
  }
  // extra files?
  const files = fs.readdirSync(folder).filter(f => f.endsWith('.json'));
  if (files.length !== items.length) fail(`${folder}: ${files.length} files vs ${items.length} manifest entries`);
  ok(`${fsType}: ${count}/${items.length} detail files valid`);
}
checkDetails('courses', COURSES);
checkDetails('exercises', EXERCISES);
checkDetails('papers', PAPERS);
checkDetails('threads', SEED_THREADS);

// daily
const dailyPath = path.join(contentDir, 'daily.json');
if (fs.existsSync(dailyPath)) {
  try { JSON.parse(readText(dailyPath)); ok('daily.json valid'); }
  catch (e) { fail(`daily.json invalid: ${e.message}`); }
}

// search.json
const searchPath = path.join(contentDir, 'search.json');
if (fs.existsSync(searchPath)) {
  try {
    const s = JSON.parse(readText(searchPath));
    if (!Array.isArray(s)) fail('search.json is not an array');
    else ok(`search.json valid (${s.length} entries)`);
  } catch (e) { fail(`search.json invalid: ${e.message}`); }
}

// 3. data.js full editorial (optional)
const dataPath = path.join(root, 'data.js');
if (fs.existsSync(dataPath)) {
  const src = readText(dataPath);
  const sb = { window: {} };
  vm.createContext(sb);
  try {
    vm.runInContext(src, sb);
    const editorial = sb.window?.MEDIL_EDITORIAL || sb.MEDIL_EDITORIAL;
    if (editorial) {
      const ed = editorial;
      ok(`data.js editorial loaded (v${ed.version || '?'})`);
      // Cross-check IDs with public manifest to avoid conflicting sources of truth.
      const pairs = [
        ['courses', COURSES, ed.courses],
        ['exercises', EXERCISES, ed.exercises],
        ['papers', PAPERS, ed.papers],
        ['threads', SEED_THREADS, ed.threads]
      ];
      for (const [label, manifestItems, editorialItems] of pairs) {
        if (!Array.isArray(editorialItems)) continue;
        const manifestIds = new Set(manifestItems.map(x => x.id));
        const editorialIds = new Set(editorialItems.map(x => x.id));
        const onlyInEditorial = [...editorialIds].filter(id => !manifestIds.has(id));
        const onlyInManifest = [...manifestIds].filter(id => !editorialIds.has(id));
        if (onlyInEditorial.length) fail(`${label}: in data.js but not content manifest: ${onlyInEditorial.join(', ')}`);
        if (onlyInManifest.length) fail(`${label}: in content manifest but not data.js: ${onlyInManifest.join(', ')}`);
      }
    } else {
      ok('data.js loaded (no MEDIL_EDITORIAL export)');
    }
  } catch (e) {
    fail(`data.js failed to evaluate: ${e.message}`);
  }
}

if (process.exitCode) {
  console.error('\nContent validation failed.');
  process.exit(process.exitCode);
} else {
  console.log('\nAll content checks passed.');
}