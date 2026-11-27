#!/usr/bin/env node
/**
 * MEDIL — seed editorial content into Supabase.
 *
 * Source of truth: legacy/data.js (the last static export).
 * Safe to re-run: every row is upserted on its primary key.
 *
 * Usage:
 *   npm run seed
 *   npm run seed -- --dry-run
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in
 * .env.local (loaded by the npm script). The service-role key bypasses RLS,
 * so this script must only ever run locally or in a trusted CI job.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DRY_RUN = process.argv.includes("--dry-run");
const NOW = new Date();
const PUBLISHED_AT = NOW.toISOString();

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function info(message) {
  console.log(message);
}

async function loadEditorial() {
  const source = await readFile(path.join(ROOT, "legacy", "data.js"), "utf8");
  const start = source.indexOf("{");
  const end = source.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    fail("legacy/data.js does not contain the MEDIL_EDITORIAL object.");
  }

  try {
    return JSON.parse(source.slice(start, end + 1));
  } catch (error) {
    fail(`Could not parse legacy/data.js: ${error.message}`);
  }
}

/**
 * "il y a 2 h", "il y a 48 min", "hier" -> a Date relative to now.
 * Unknown values fall back to now rather than failing the whole seed.
 */
export function parseRelativeDate(value, reference = NOW) {
  const text = String(value ?? "").toLowerCase().trim();
  if (!text) return new Date(reference);

  if (text === "hier" || text === "avant-hier") {
    const days = text === "hier" ? 1 : 2;
    return new Date(reference.getTime() - days * 86_400_000);
  }

  const match = text.match(/(\d+)\s*(min|minutes?|h|heures?|j|jours?|semaines?|mois)/);
  if (!match) return new Date(reference);

  const amount = Number(match[1]);
  const unit = match[2];
  const milliseconds = unit.startsWith("min")
    ? amount * 60_000
    : unit === "h" || unit.startsWith("heure")
      ? amount * 3_600_000
      : unit === "j" || unit.startsWith("jour")
        ? amount * 86_400_000
        : unit.startsWith("semaine")
          ? amount * 7 * 86_400_000
          : amount * 30 * 86_400_000;

  return new Date(reference.getTime() - milliseconds);
}

/** "1,2k" -> 1200, "864" -> 864, 42 -> 42. */
export function parseCompactNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return Math.round(value);

  const text = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s/g, "")
    .replace(",", ".");
  if (!text) return 0;

  const match = text.match(/^(\d+(?:\.\d+)?)(k|m)?$/);
  if (!match) return 0;

  const amount = Number(match[1]);
  const suffix = match[2];
  return Math.round(amount * (suffix === "k" ? 1_000 : suffix === "m" ? 1_000_000 : 1));
}

/** Today's date in Paris, as YYYY-MM-DD (the daily challenge is French). */
export function todayInParis() {
  const parts = new Intl.DateTimeFormat("fr-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(NOW);

  const get = (type) => parts.find((part) => part.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function assertUniqueIds(label, rows) {
  const seen = new Set();
  for (const row of rows) {
    if (!row.id) fail(`${label}: a row is missing its id.`);
    if (seen.has(row.id)) fail(`${label}: duplicate id "${row.id}".`);
    seen.add(row.id);
  }
}

export function courseRow(course) {
  return {
    id: course.id,
    title: course.title,
    tag: course.tag ?? null,
    subject: course.subject,
    level: course.level,
    color: course.color ?? null,
    cover_type: course.coverType ?? null,
    cover_eq: course.coverEq ?? null,
    chapters_count: Number(course.chaptersCount) || 0,
    duration: course.duration ?? null,
    students: course.students ?? null,
    rating: course.rating ?? null,
    featured: Boolean(course.featured),
    description: course.description ?? null,
    formula: course.formula ?? null,
    objectives: course.objectives ?? [],
    toc: course.toc ?? [],
    sections: course.sections ?? [],
    exercise: course.exercise ?? null,
    status: "published",
    published_at: PUBLISHED_AT,
  };
}

export function exerciseRow(exercise) {
  return {
    id: exercise.id,
    title: exercise.title,
    subject: exercise.subject,
    tag: exercise.tag ?? null,
    source: exercise.source ?? null,
    level: exercise.level ?? null,
    stars: Number(exercise.stars) || 1,
    minutes: exercise.minutes ?? null,
    equation: exercise.equation ?? null,
    teaser: exercise.teaser ?? null,
    statement: exercise.statement ?? null,
    hint: exercise.hint ?? null,
    solution: exercise.solution ?? [],
    answer: exercise.answer ?? null,
    solves: Number(exercise.solves) || 0,
    verified: Boolean(exercise.verified),
    status: "published",
    published_at: PUBLISHED_AT,
  };
}

export function paperRow(paper) {
  return {
    id: paper.id,
    school: paper.school,
    short: paper.short ?? null,
    year: Number(paper.year),
    subject: paper.subject,
    title: paper.title,
    track: paper.track ?? null,
    duration: paper.duration ?? null,
    difficulty: paper.difficulty ?? null,
    parts: paper.parts ?? null,
    hot: Boolean(paper.hot),
    correction: Boolean(paper.correction),
    color: paper.color ?? null,
    status: "published",
    published_at: PUBLISHED_AT,
  };
}

export function dailyRow(daily, exerciseId) {
  return {
    date: todayInParis(),
    exercise_id: exerciseId ?? null,
    eyebrow: daily.eyebrow ?? null,
    title: daily.title,
    statement: daily.statement ?? null,
    equation: daily.equation ?? null,
    participants: Number(daily.participants) || 0,
    xp: Number(daily.xp) || 0,
    steps: daily.steps ?? [],
    status: "published",
    published_at: PUBLISHED_AT,
  };
}

export function threadRow(thread) {
  const createdAt = parseRelativeDate(thread.time);
  return {
    id: thread.id,
    author_id: null,
    author_name: thread.author ?? null,
    author_grade: thread.grade ?? null,
    author_initials: thread.initials ?? null,
    avatar_color: thread.avatarColor ?? null,
    excerpt: thread.excerpt ?? null,
    title: thread.title,
    body: thread.content ?? thread.excerpt ?? "",
    category: thread.category,
    tags: thread.tags ?? [],
    pinned: Boolean(thread.pinned),
    locked: false,
    views: parseCompactNumber(thread.views),
    upvotes: Number(thread.upvotes) || 0,
    status: "published",
    created_at: createdAt.toISOString(),
    updated_at: createdAt.toISOString(),
  };
}

export function replyRows(thread) {
  return (thread.answers ?? []).map((answer) => {
    const createdAt = parseRelativeDate(answer.time);
    return {
      // "r1" is only unique inside a thread; prefix it to keep a stable global id.
      id: `${thread.id}--${answer.id}`,
      thread_id: thread.id,
      author_id: null,
      author_name: answer.author ?? null,
      author_grade: answer.grade ?? null,
      author_initials: answer.initials ?? null,
      avatar_color: answer.avatarColor ?? null,
      body: answer.text ?? "",
      upvotes: Number(answer.upvotes) || 0,
      status: "published",
      created_at: createdAt.toISOString(),
      updated_at: createdAt.toISOString(),
    };
  });
}

async function upsert(supabase, table, rows, onConflict = "id") {
  if (rows.length === 0) {
    info(`  · ${table.padEnd(20)} 0 row (skipped)`);
    return;
  }

  const { error } = await supabase.from(table).upsert(rows, { onConflict });
  if (error) {
    fail(`Supabase rejected ${table}: ${error.message}${error.details ? ` (${error.details})` : ""}`);
  }
  info(`  ✓ ${table.padEnd(20)} ${rows.length} row(s)`);
}

async function main() {
  const editorial = await loadEditorial();

  const courses = (editorial.courses ?? []).map(courseRow);
  const exercises = (editorial.exercises ?? []).map(exerciseRow);
  const papers = (editorial.papers ?? []).map(paperRow);
  const threads = (editorial.threads ?? []).map(threadRow);
  const replies = (editorial.threads ?? []).flatMap(replyRows);
  const daily = editorial.dailyChallenge
    ? [dailyRow(editorial.dailyChallenge, editorial.dailyChallenge.id)]
    : [];

  assertUniqueIds("courses", courses);
  assertUniqueIds("exercises", exercises);
  assertUniqueIds("papers", papers);
  assertUniqueIds("forum_threads", threads);
  assertUniqueIds("forum_replies", replies);

  if (!daily[0]?.title) fail("dailyChallenge is missing a title.");
  if (daily[0].exercise_id && !exercises.some((row) => row.id === daily[0].exercise_id)) {
    fail(`dailyChallenge references unknown exercise "${daily[0].exercise_id}".`);
  }

  info("\nMEDIL seed — source: legacy/data.js");
  info(`  courses: ${courses.length}`);
  info(`  exercises: ${exercises.length}`);
  info(`  papers: ${papers.length}`);
  info(`  daily challenge: ${daily[0]?.title ?? "none"} (${daily[0]?.date ?? "—"})`);
  info(`  forum threads: ${threads.length} + ${replies.length} replies`);

  if (DRY_RUN) {
    info("\nDry run: nothing was written.\n");
    return;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || url.includes("your-project")) {
    fail("NEXT_PUBLIC_SUPABASE_URL is missing or still a placeholder in .env.local.");
  }
  if (!serviceRoleKey || serviceRoleKey.includes("your-service-role")) {
    fail("SUPABASE_SERVICE_ROLE_KEY is missing or still a placeholder in .env.local.");
  }

  const supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  info("\nWriting to Supabase…");
  await upsert(supabase, "courses", courses);
  await upsert(supabase, "exercises", exercises);
  await upsert(supabase, "papers", papers);
  await upsert(supabase, "daily_challenges", daily, "date");
  await upsert(supabase, "forum_threads", threads);
  await upsert(supabase, "forum_replies", replies);

  info("\nSeed complete. Public pages should revalidate within their cache window.\n");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    fail(error instanceof Error ? error.message : String(error));
  });
}
