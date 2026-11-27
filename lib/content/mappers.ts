import type {
  ContentStatus,
  Course,
  CourseRow,
  CourseSection,
  DailyChallenge,
  DailyChallengeRow,
  Exercise,
  ExerciseRow,
  ExerciseStep,
  ForumCategory,
  ForumReply,
  ForumReplyRow,
  ForumStatus,
  ForumThread,
  ForumThreadRow,
  Level,
  Paper,
  PaperRow,
  Subject,
} from "./types";
import { asBoolean, asNumber, asString, asStringArray } from "../format";

const SUBJECTS: Subject[] = ["Maths", "Physique", "Informatique"];
const LEVELS: Level[] = ["MPSI", "MP", "MP*"];
const CATEGORIES: ForumCategory[] = ["Maths", "Physique", "Informatique", "Concours", "Méthode"];

export function normalizeSubject(value: unknown): Subject {
  return SUBJECTS.includes(value as Subject) ? (value as Subject) : "Maths";
}

export function normalizeLevel(value: unknown): Level | null {
  return LEVELS.includes(value as Level) ? (value as Level) : null;
}

export function normalizeCategory(value: unknown): ForumCategory {
  return CATEGORIES.includes(value as ForumCategory) ? (value as ForumCategory) : "Méthode";
}

function normalizeStatus(value: unknown): ContentStatus {
  return value === "draft" || value === "archived" ? value : "published";
}

function normalizeForumStatus(value: unknown): ForumStatus {
  return value === "hidden" || value === "deleted" ? value : "published";
}

function normalizeSections(value: unknown): CourseSection[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((section) => {
    if (!section || typeof section !== "object") return [];
    const item = section as Record<string, unknown>;
    const title = asString(item.title);
    if (!title) return [];
    return [
      {
        id: asString(item.id) ?? title,
        kicker: asString(item.kicker) ?? undefined,
        title,
        paragraphs: asStringArray(item.paragraphs),
        formula: asString(item.formula) ?? undefined,
        note: asString(item.note) ?? undefined,
      },
    ];
  });
}

function normalizeSteps(value: unknown): ExerciseStep[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((step) => {
    if (!step || typeof step !== "object") return [];
    const item = step as Record<string, unknown>;
    const title = asString(item.title);
    const text = asString(item.text);
    if (!title || !text) return [];
    return [{ title, text, equation: asString(item.equation) ?? undefined }];
  });
}

function normalizeCourseExercise(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const prompt = asString(item.prompt);
  if (!prompt) return null;
  return { prompt, answer: asString(item.answer) ?? undefined };
}

export function mapCourseRow(row: CourseRow): Course {
  return {
    id: row.id,
    title: row.title,
    tag: row.tag,
    subject: normalizeSubject(row.subject),
    level: normalizeLevel(row.level) ?? "MP",
    color: row.color,
    coverType: row.cover_type,
    coverEq: row.cover_eq,
    chaptersCount: row.chapters_count ?? 0,
    duration: row.duration,
    students: row.students,
    rating: row.rating,
    featured: row.featured,
    description: row.description,
    formula: row.formula,
    objectives: row.objectives ?? [],
    toc: row.toc ?? [],
    sections: row.sections ?? [],
    exercise: row.exercise,
    status: normalizeStatus(row.status),
    publishedAt: row.published_at,
  };
}

export function mapLocalCourse(input: Record<string, unknown>): Course {
  return {
    id: asString(input.id) ?? "cours",
    title: asString(input.title) ?? "Cours MEDIL",
    tag: asString(input.tag),
    subject: normalizeSubject(input.subject),
    level: normalizeLevel(input.level) ?? "MP",
    color: asString(input.color),
    coverType: asString(input.coverType),
    coverEq: asString(input.coverEq),
    chaptersCount: asNumber(input.chaptersCount) ?? 0,
    duration: asString(input.duration),
    students: asString(input.students),
    rating: asNumber(input.rating),
    featured: asBoolean(input.featured),
    description: asString(input.description),
    formula: asString(input.formula),
    objectives: asStringArray(input.objectives),
    toc: asStringArray(input.toc),
    sections: normalizeSections(input.sections),
    exercise: normalizeCourseExercise(input.exercise),
    status: "published",
    publishedAt: null,
  };
}

export function mapExerciseRow(row: ExerciseRow): Exercise {
  return {
    id: row.id,
    title: row.title,
    subject: normalizeSubject(row.subject),
    tag: row.tag,
    source: row.source,
    level: normalizeLevel(row.level),
    stars: row.stars ?? 1,
    minutes: row.minutes,
    equation: row.equation,
    teaser: row.teaser,
    statement: row.statement,
    hint: row.hint,
    solution: row.solution ?? [],
    answer: row.answer,
    solves: row.solves ?? 0,
    verified: row.verified,
    status: normalizeStatus(row.status),
    publishedAt: row.published_at,
  };
}

export function mapLocalExercise(input: Record<string, unknown>): Exercise {
  return {
    id: asString(input.id) ?? "exercice",
    title: asString(input.title) ?? "Exercice MEDIL",
    subject: normalizeSubject(input.subject),
    tag: asString(input.tag),
    source: asString(input.source),
    level: normalizeLevel(input.level),
    stars: asNumber(input.stars) ?? 1,
    minutes: asNumber(input.minutes),
    equation: asString(input.equation),
    teaser: asString(input.teaser),
    statement: asString(input.statement),
    hint: asString(input.hint),
    solution: normalizeSteps(input.solution),
    answer: asString(input.answer),
    solves: asNumber(input.solves) ?? 0,
    verified: asBoolean(input.verified),
    status: "published",
    publishedAt: null,
  };
}

export function mapPaperRow(row: PaperRow): Paper {
  return {
    id: row.id,
    school: row.school,
    short: row.short,
    year: row.year,
    subject: normalizeSubject(row.subject),
    title: row.title,
    track: row.track,
    duration: row.duration,
    difficulty: row.difficulty,
    parts: row.parts,
    hot: row.hot,
    correction: row.correction,
    color: row.color,
    pdfUrl: row.pdf_url,
    content: row.content,
    correctionContent: row.correction_content,
    status: normalizeStatus(row.status),
    publishedAt: row.published_at,
  };
}

export function mapLocalPaper(input: Record<string, unknown>): Paper {
  return {
    id: asString(input.id) ?? "sujet",
    school: asString(input.school) ?? "Concours",
    short: asString(input.short),
    year: asNumber(input.year) ?? new Date().getFullYear(),
    subject: normalizeSubject(input.subject),
    title: asString(input.title) ?? "Sujet de concours",
    track: asString(input.track),
    duration: asString(input.duration),
    difficulty: asNumber(input.difficulty),
    parts: asString(input.parts),
    hot: asBoolean(input.hot),
    correction: asBoolean(input.correction),
    color: asString(input.color),
    pdfUrl: asString(input.pdf) ?? asString(input.pdfUrl),
    content: input.content ?? null,
    correctionContent: input.correctionContent ?? null,
    status: "published",
    publishedAt: null,
  };
}

export function mapDailyRow(row: DailyChallengeRow): DailyChallenge {
  return {
    id: row.id,
    date: row.date,
    exerciseId: row.exercise_id,
    eyebrow: row.eyebrow,
    title: row.title,
    statement: row.statement,
    equation: row.equation,
    participants: row.participants ?? 0,
    xp: row.xp ?? 0,
    steps: row.steps ?? [],
    status: normalizeStatus(row.status),
    publishedAt: row.published_at,
  };
}

export function mapLocalDaily(input: Record<string, unknown>): DailyChallenge {
  return {
    id: asString(input.id) ?? "defi",
    date: new Date().toISOString().slice(0, 10),
    exerciseId: asString(input.id),
    eyebrow: asString(input.eyebrow),
    title: asString(input.title) ?? "Défi du jour",
    statement: asString(input.statement),
    equation: asString(input.equation),
    participants: asNumber(input.participants) ?? 0,
    xp: asNumber(input.xp) ?? 0,
    steps: asStringArray(input.steps),
    status: "published",
    publishedAt: null,
  };
}

function parseCompactNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return Math.round(value);
  const text = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s/g, "")
    .replace(",", ".");
  const match = text.match(/^(\d+(?:\.\d+)?)(k|m)?$/);
  if (!match) return 0;
  const amount = Number(match[1]);
  const suffix = match[2];
  return Math.round(amount * (suffix === "k" ? 1_000 : suffix === "m" ? 1_000_000 : 1));
}

function parseLegacyRelativeDate(value: unknown, reference = new Date()): Date {
  const text = String(value ?? "").toLowerCase().trim();
  if (!text) return new Date(reference);

  if (text === "hier" || text === "avant-hier") {
    return new Date(reference.getTime() - (text === "hier" ? 1 : 2) * 86_400_000);
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

export function mapThreadRow(row: ForumThreadRow): ForumThread {
  const replyCount = row.forum_replies?.[0]?.count ?? 0;
  return {
    id: row.id,
    authorId: row.author_id,
    authorName: row.author_name,
    authorGrade: row.author_grade,
    authorInitials: row.author_initials,
    avatarColor: row.avatar_color,
    excerpt: row.excerpt,
    title: row.title,
    body: row.body,
    category: normalizeCategory(row.category),
    tags: row.tags ?? [],
    pinned: row.pinned,
    locked: row.locked,
    views: row.views ?? 0,
    upvotes: row.upvotes ?? 0,
    status: normalizeForumStatus(row.status),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    replyCount,
  };
}

export function mapLocalThread(input: Record<string, unknown>): ForumThread {
  const answers = Array.isArray(input.answers) ? input.answers : [];
  const createdAt = parseLegacyRelativeDate(input.time).toISOString();
  return {
    id: asString(input.id) ?? "discussion",
    authorId: null,
    authorName: asString(input.author),
    authorGrade: asString(input.grade),
    authorInitials: asString(input.initials),
    avatarColor: asString(input.avatarColor),
    excerpt: asString(input.excerpt),
    title: asString(input.title) ?? "Discussion MEDIL",
    body: asString(input.content) ?? asString(input.excerpt) ?? "",
    category: normalizeCategory(input.category),
    tags: asStringArray(input.tags),
    pinned: asBoolean(input.pinned),
    locked: false,
    views: parseCompactNumber(input.views),
    upvotes: asNumber(input.upvotes) ?? 0,
    status: "published",
    createdAt,
    updatedAt: createdAt,
    replyCount: answers.length,
  };
}

export function mapReplyRow(row: ForumReplyRow): ForumReply {
  return {
    id: row.id,
    threadId: row.thread_id,
    authorId: row.author_id,
    authorName: row.author_name,
    authorGrade: row.author_grade,
    authorInitials: row.author_initials,
    avatarColor: row.avatar_color,
    body: row.body,
    upvotes: row.upvotes ?? 0,
    status: normalizeForumStatus(row.status),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapLocalReplies(input: Record<string, unknown>): ForumReply[] {
  const threadId = asString(input.id) ?? "discussion";
  const answers = Array.isArray(input.answers) ? input.answers : [];
  return answers.flatMap((answer) => {
    if (!answer || typeof answer !== "object") return [];
    const item = answer as Record<string, unknown>;
    const body = asString(item.text);
    if (!body) return [];
    const createdAt = parseLegacyRelativeDate(item.time).toISOString();
    return [
      {
        id: `${threadId}--${asString(item.id) ?? "r"}`,
        threadId,
        authorId: null,
        authorName: asString(item.author),
        authorGrade: asString(item.grade),
        authorInitials: asString(item.initials),
        avatarColor: asString(item.avatarColor),
        body,
        upvotes: asNumber(item.upvotes) ?? 0,
        status: "published",
        createdAt,
        updatedAt: createdAt,
      },
    ];
  });
}
