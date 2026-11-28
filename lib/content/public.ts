import "server-only";

import { unstable_cache } from "next/cache";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { getLocalEditorial } from "./local";
import {
  mapCourseRow,
  mapDailyRow,
  mapExerciseRow,
  mapLocalCourse,
  mapLocalDaily,
  mapLocalExercise,
  mapLocalPaper,
  mapLocalReplies,
  mapLocalThread,
  mapPaperRow,
  mapReplyRow,
  mapThreadRow,
} from "./mappers";
import type {
  Course,
  CourseRow,
  DailyChallenge,
  DailyChallengeRow,
  Exercise,
  ExerciseRow,
  ForumCategory,
  ForumReply,
  ForumReplyRow,
  ForumThread,
  ForumThreadRow,
  Level,
  Paper,
  PaperRow,
  SearchResult,
  SiteStats,
  Subject,
} from "./types";

const CACHE_SECONDS = 300;

let publicClient: SupabaseClient | null | undefined;

function getPublicClient(): SupabaseClient | null {
  if (publicClient !== undefined) return publicClient;

  const config = getSupabaseConfig();
  if (!config) {
    publicClient = null;
    return publicClient;
  }

  publicClient = createClient(config.url, config.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return publicClient;
}

function logQueryError(label: string, error: unknown) {
  console.error(`[medil] ${label}:`, error);
}

/* -------------------------------------------------------------------------- */
/* Courses                                                                    */
/* -------------------------------------------------------------------------- */

export type CourseFilters = {
  subject?: Subject;
  level?: Level;
  featured?: boolean;
};

async function fetchCourses(filters: CourseFilters = {}): Promise<Course[]> {
  const local = await getLocalEditorial();
  if (local) {
    return local.courses
      .map(mapLocalCourse)
      .filter((course) => !filters.subject || course.subject === filters.subject)
      .filter((course) => !filters.level || course.level === filters.level)
      .filter((course) => filters.featured === undefined || course.featured === filters.featured)
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.title.localeCompare(b.title, "fr");
      });
  }

  const supabase = getPublicClient();
  if (!supabase) return [];

  let query = supabase.from("courses").select("*").eq("status", "published");
  if (filters.subject) query = query.eq("subject", filters.subject);
  if (filters.level) query = query.eq("level", filters.level);
  if (filters.featured !== undefined) query = query.eq("featured", filters.featured);

  const { data, error } = await query
    .order("featured", { ascending: false })
    .order("title", { ascending: true });

  if (error) {
    logQueryError("courses", error);
    return [];
  }

  return (data as unknown as CourseRow[]).map(mapCourseRow);
}

export const getCourses = unstable_cache(fetchCourses, ["courses"], {
  tags: ["courses"],
  revalidate: CACHE_SECONDS,
});

async function fetchCourse(id: string): Promise<Course | null> {
  const local = await getLocalEditorial();
  if (local) {
    const match = local.courses.find((course) => course.id === id);
    return match ? mapLocalCourse(match) : null;
  }

  const supabase = getPublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    logQueryError(`course ${id}`, error);
    return null;
  }

  return data ? mapCourseRow(data as unknown as CourseRow) : null;
}

export const getCourse = unstable_cache(fetchCourse, ["course"], {
  tags: ["courses"],
  revalidate: CACHE_SECONDS,
});

/* -------------------------------------------------------------------------- */
/* Exercises                                                                  */
/* -------------------------------------------------------------------------- */

export type ExerciseFilters = {
  subject?: Subject;
  level?: Level;
  minStars?: number;
};

async function fetchExercises(filters: ExerciseFilters = {}): Promise<Exercise[]> {
  const local = await getLocalEditorial();
  if (local) {
    return local.exercises
      .map(mapLocalExercise)
      .filter((exercise) => !filters.subject || exercise.subject === filters.subject)
      .filter((exercise) => !filters.level || exercise.level === filters.level)
      .filter((exercise) => filters.minStars === undefined || exercise.stars >= filters.minStars)
      .sort((a, b) => b.stars - a.stars || a.title.localeCompare(b.title, "fr"));
  }

  const supabase = getPublicClient();
  if (!supabase) return [];

  let query = supabase.from("exercises").select("*").eq("status", "published");
  if (filters.subject) query = query.eq("subject", filters.subject);
  if (filters.level) query = query.eq("level", filters.level);
  if (filters.minStars !== undefined) query = query.gte("stars", filters.minStars);

  const { data, error } = await query
    .order("stars", { ascending: false })
    .order("title", { ascending: true });

  if (error) {
    logQueryError("exercises", error);
    return [];
  }

  return (data as unknown as ExerciseRow[]).map(mapExerciseRow);
}

export const getExercises = unstable_cache(fetchExercises, ["exercises"], {
  tags: ["exercises"],
  revalidate: CACHE_SECONDS,
});

async function fetchExercise(id: string): Promise<Exercise | null> {
  const local = await getLocalEditorial();
  if (local) {
    const match = local.exercises.find((exercise) => exercise.id === id);
    return match ? mapLocalExercise(match) : null;
  }

  const supabase = getPublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    logQueryError(`exercise ${id}`, error);
    return null;
  }

  return data ? mapExerciseRow(data as unknown as ExerciseRow) : null;
}

export const getExercise = unstable_cache(fetchExercise, ["exercise"], {
  tags: ["exercises"],
  revalidate: CACHE_SECONDS,
});

/* -------------------------------------------------------------------------- */
/* Papers                                                                     */
/* -------------------------------------------------------------------------- */

export type PaperFilters = {
  school?: string;
  subject?: Subject;
  year?: number;
};

async function fetchPapers(filters: PaperFilters = {}): Promise<Paper[]> {
  const local = await getLocalEditorial();
  if (local) {
    return local.papers
      .map(mapLocalPaper)
      .filter((paper) => !filters.school || paper.school === filters.school)
      .filter((paper) => !filters.subject || paper.subject === filters.subject)
      .filter((paper) => !filters.year || paper.year === filters.year)
      .sort((a, b) => b.year - a.year || a.school.localeCompare(b.school, "fr"));
  }

  const supabase = getPublicClient();
  if (!supabase) return [];

  let query = supabase.from("papers").select("*").eq("status", "published");
  if (filters.school) query = query.eq("school", filters.school);
  if (filters.subject) query = query.eq("subject", filters.subject);
  if (filters.year) query = query.eq("year", filters.year);

  const { data, error } = await query
    .order("year", { ascending: false })
    .order("school", { ascending: true });

  if (error) {
    logQueryError("papers", error);
    return [];
  }

  return (data as unknown as PaperRow[]).map(mapPaperRow);
}

export const getPapers = unstable_cache(fetchPapers, ["papers"], {
  tags: ["papers"],
  revalidate: CACHE_SECONDS,
});

async function fetchPaper(id: string): Promise<Paper | null> {
  const local = await getLocalEditorial();
  if (local) {
    const match = local.papers.find((paper) => paper.id === id);
    return match ? mapLocalPaper(match) : null;
  }

  const supabase = getPublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("papers")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    logQueryError(`paper ${id}`, error);
    return null;
  }

  return data ? mapPaperRow(data as unknown as PaperRow) : null;
}

export const getPaper = unstable_cache(fetchPaper, ["paper"], {
  tags: ["papers"],
  revalidate: CACHE_SECONDS,
});

/* -------------------------------------------------------------------------- */
/* Daily challenge                                                            */
/* -------------------------------------------------------------------------- */

function todayInParis(): string {
  const parts = new Intl.DateTimeFormat("fr-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((part) => part.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

async function fetchDailyChallenge(): Promise<DailyChallenge | null> {
  const local = await getLocalEditorial();
  if (local) return mapLocalDaily(local.dailyChallenge);

  const supabase = getPublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("daily_challenges")
    .select("*")
    .eq("status", "published")
    .lte("date", todayInParis())
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    logQueryError("daily challenge", error);
    return null;
  }

  return data ? mapDailyRow(data as unknown as DailyChallengeRow) : null;
}

export const getDailyChallenge = unstable_cache(fetchDailyChallenge, ["daily-challenge"], {
  tags: ["daily"],
  revalidate: 60,
});

/* -------------------------------------------------------------------------- */
/* Forum                                                                      */
/* -------------------------------------------------------------------------- */

export type ThreadFilters = {
  category?: ForumCategory;
  limit?: number;
};

async function fetchThreads(filters: ThreadFilters = {}): Promise<ForumThread[]> {
  const local = await getLocalEditorial();
  if (local) {
    const threads = local.threads
      .map(mapLocalThread)
      .filter((thread) => !filters.category || thread.category === filters.category)
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

    return typeof filters.limit === "number" ? threads.slice(0, filters.limit) : threads;
  }

  const supabase = getPublicClient();
  if (!supabase) return [];

  let query = supabase
    .from("forum_threads")
    .select("*, forum_replies(count)")
    .eq("status", "published");

  if (filters.category) query = query.eq("category", filters.category);

  query = query.order("pinned", { ascending: false }).order("created_at", { ascending: false });
  if (typeof filters.limit === "number") query = query.limit(filters.limit);

  const { data, error } = await query;

  if (error) {
    logQueryError("forum threads", error);
    return [];
  }

  return (data as unknown as ForumThreadRow[]).map(mapThreadRow);
}

export const getThreads = unstable_cache(fetchThreads, ["forum-threads"], {
  tags: ["forum"],
  revalidate: CACHE_SECONDS,
});

async function fetchThread(id: string): Promise<ForumThread | null> {
  const local = await getLocalEditorial();
  if (local) {
    const match = local.threads.find((thread) => thread.id === id);
    return match ? mapLocalThread(match) : null;
  }

  const supabase = getPublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("forum_threads")
    .select("*, forum_replies(count)")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    logQueryError(`thread ${id}`, error);
    return null;
  }
  if (!data) return null;

  return mapThreadRow(data as unknown as ForumThreadRow);
}

export const getThread = unstable_cache(fetchThread, ["forum-thread"], {
  tags: ["forum"],
  revalidate: CACHE_SECONDS,
});

export async function incrementThreadViews(id: string): Promise<void> {
  const supabase = getPublicClient();
  if (!supabase) return;
  const { error } = await supabase.rpc("increment_thread_views", { thread_id: id });
  if (error) logQueryError(`increment views ${id}`, error);
}

export async function getThreadViews(id: string): Promise<number | null> {
  const supabase = getPublicClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("forum_threads")
    .select("views")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return (data as { views: number }).views ?? null;
}

export async function getThreadViewsMap(): Promise<Map<string, number>> {
  const supabase = getPublicClient();
  const map = new Map<string, number>();
  if (!supabase) return map;
  const { data, error } = await supabase.from("forum_threads").select("id, views");
  if (error || !data) return map;
  for (const row of data as Array<{ id: string; views: number }>) {
    map.set(row.id, row.views ?? 0);
  }
  return map;
}

async function fetchReplies(threadId: string): Promise<ForumReply[]> {
  const local = await getLocalEditorial();
  if (local) {
    const match = local.threads.find((thread) => thread.id === threadId);
    return match ? mapLocalReplies(match) : [];
  }

  const supabase = getPublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("forum_replies")
    .select("*")
    .eq("thread_id", threadId)
    .eq("status", "published")
    .order("created_at", { ascending: true });

  if (error) {
    logQueryError(`replies ${threadId}`, error);
    return [];
  }

  return (data as unknown as ForumReplyRow[]).map(mapReplyRow);
}

export const getReplies = unstable_cache(fetchReplies, ["forum-replies"], {
  tags: ["forum"],
  revalidate: CACHE_SECONDS,
});

/* -------------------------------------------------------------------------- */
/* Search                                                                     */
/* -------------------------------------------------------------------------- */

function normalizeSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

async function fetchSearchResults(query: string): Promise<SearchResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const local = await getLocalEditorial();
  if (local) {
    const needle = normalizeSearch(trimmed);
    const results: SearchResult[] = [];

    for (const course of local.courses.map(mapLocalCourse)) {
      const haystack = normalizeSearch(
        [course.title, course.description, course.tag, course.subject, course.level].join(" "),
      );
      if (!haystack.includes(needle)) continue;
      results.push({
        type: "course",
        id: course.id,
        title: course.title,
        meta: [course.subject, course.level, course.tag].filter(Boolean).join(" · "),
        score: normalizeSearch(course.title).includes(needle) ? 1 : 0.5,
      });
    }

    for (const exercise of local.exercises.map(mapLocalExercise)) {
      const haystack = normalizeSearch(
        [exercise.title, exercise.teaser, exercise.tag, exercise.source, exercise.subject].join(" "),
      );
      if (!haystack.includes(needle)) continue;
      results.push({
        type: "exercise",
        id: exercise.id,
        title: exercise.title,
        meta: [exercise.subject, exercise.level, exercise.tag].filter(Boolean).join(" · "),
        score: normalizeSearch(exercise.title).includes(needle) ? 1 : 0.5,
      });
    }

    for (const paper of local.papers.map(mapLocalPaper)) {
      const haystack = normalizeSearch(
        [paper.title, paper.school, paper.subject, paper.track, paper.year].join(" "),
      );
      if (!haystack.includes(needle)) continue;
      results.push({
        type: "paper",
        id: paper.id,
        title: paper.title,
        meta: [paper.school, paper.subject, paper.year].filter(Boolean).join(" · "),
        score: normalizeSearch(paper.title).includes(needle) ? 1 : 0.5,
      });
    }

    for (const thread of local.threads.map(mapLocalThread)) {
      const haystack = normalizeSearch(
        [thread.title, thread.excerpt, thread.body, thread.category, thread.tags.join(" ")].join(" "),
      );
      if (!haystack.includes(needle)) continue;
      results.push({
        type: "thread",
        id: thread.id,
        title: thread.title,
        meta: [thread.category, thread.authorName].filter(Boolean).join(" · "),
        score: normalizeSearch(thread.title).includes(needle) ? 1 : 0.5,
      });
    }

    return results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, "fr")).slice(0, 30);
  }

  const supabase = getPublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase.rpc("search_content", { search_query: trimmed });

  if (error) {
    logQueryError("search", error);
    return [];
  }

  return (data as Array<{ result_type: SearchResult["type"]; result_id: string; title: string; meta: string; score: number }>).map(
    (row) => ({
      type: row.result_type,
      id: row.result_id,
      title: row.title,
      meta: row.meta,
      score: row.score,
    }),
  );
}

export const searchContent = unstable_cache(fetchSearchResults, ["search"], {
  tags: ["search"],
  revalidate: CACHE_SECONDS,
});

/* -------------------------------------------------------------------------- */
/* Site stats                                                                 */
/* -------------------------------------------------------------------------- */

async function fetchSiteStats(): Promise<SiteStats> {
  const local = await getLocalEditorial();
  if (local) {
    return {
      courses: local.courses.length,
      exercises: local.exercises.length,
      papers: local.papers.length,
      threads: local.threads.length,
      schools: new Set(local.papers.map((paper) => String(paper.school ?? ""))).size,
    };
  }

  const supabase = getPublicClient();
  if (!supabase) {
    return { courses: 0, exercises: 0, papers: 0, threads: 0, schools: 0 };
  }

  const [courses, exercises, papers, threads, schools] = await Promise.all([
    supabase.from("courses").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("exercises").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("papers").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("forum_threads").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("papers").select("school").eq("status", "published"),
  ]);

  return {
    courses: courses.count ?? 0,
    exercises: exercises.count ?? 0,
    papers: papers.count ?? 0,
    threads: threads.count ?? 0,
    schools: new Set((schools.data ?? []).map((row: { school: string }) => row.school)).size,
  };
}

export const getSiteStats = unstable_cache(fetchSiteStats, ["site-stats"], {
  tags: ["courses", "exercises", "papers", "forum"],
  revalidate: CACHE_SECONDS,
});
