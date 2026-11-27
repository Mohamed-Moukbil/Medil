"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, error: "auth" as const, message: "Non authentifié." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.is_admin) return { ok: false as const, error: "forbidden" as const, message: "Accès refusé." };
  return { ok: true as const, supabase };
}

const courseSchema = z.object({
  id: z.string().trim().min(1).max(120),
  title: z.string().trim().min(1).max(200),
  tag: z.string().trim().max(60).optional().or(z.literal("")),
  subject: z.enum(["Maths", "Physique", "Informatique"]),
  level: z.enum(["MPSI", "MP", "MP*"]),
  color: z.string().trim().max(30).optional().or(z.literal("")),
  coverType: z.string().trim().max(30).optional().or(z.literal("")),
  coverEq: z.string().trim().max(200).optional().or(z.literal("")),
  chaptersCount: z.coerce.number().int().min(0).default(0),
  duration: z.string().trim().max(30).optional().or(z.literal("")),
  students: z.string().trim().max(30).optional().or(z.literal("")),
  rating: z.coerce.number().min(0).max(5).optional().or(z.nan()),
  featured: z.boolean().optional(),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  formula: z.string().trim().max(200).optional().or(z.literal("")),
  objectives: z.string().trim().optional().or(z.literal("")),
  toc: z.string().trim().optional().or(z.literal("")),
  sections: z.string().trim().optional().or(z.literal("")),
  exercisePrompt: z.string().trim().optional().or(z.literal("")),
  exerciseAnswer: z.string().trim().optional().or(z.literal("")),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export type CourseInput = z.infer<typeof courseSchema>;

export async function upsertCourse(input: unknown) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;

  const parsed = courseSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "validation" as const, issues: parsed.error.flatten() };
  }

  const v = parsed.data;

  const objectives = v.objectives
    ? v.objectives.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];
  const toc = v.toc ? v.toc.split("\n").map((s) => s.trim()).filter(Boolean) : [];
  let sections: unknown = [];
  if (v.sections) {
    try {
      sections = JSON.parse(v.sections);
    } catch {
      return { ok: false as const, error: "validation" as const, issues: { fieldErrors: { sections: ["JSON invalide"] } } };
    }
  }
  const exercise =
    v.exercisePrompt || v.exerciseAnswer
      ? { prompt: v.exercisePrompt ?? "", answer: v.exerciseAnswer ?? "" }
      : null;

  const row = {
    id: v.id,
    title: v.title,
    tag: v.tag || null,
    subject: v.subject,
    level: v.level,
    color: v.color || null,
    cover_type: v.coverType || null,
    cover_eq: v.coverEq || null,
    chapters_count: v.chaptersCount,
    duration: v.duration || null,
    students: v.students || null,
    rating: Number.isNaN(v.rating) ? null : (v.rating ?? null),
    featured: v.featured ?? false,
    description: v.description || null,
    formula: v.formula || null,
    objectives,
    toc,
    sections,
    exercise,
    status: v.status,
    published_at: v.status === "published" ? new Date().toISOString() : null,
  };

  const { error } = await auth.supabase.from("courses").upsert(row, { onConflict: "id" });
  if (error) {
    console.error("[admin] upsertCourse:", error);
    return { ok: false as const, error: "database" as const, message: error.message };
  }

  revalidatePath("/admin/courses");
  revalidatePath("/cours");
  revalidatePath(`/cours/${v.id}`);
  return { ok: true as const };
}

export async function deleteCourse(id: string) {
  try {
    const auth = await requireAdmin();
    if (!auth.ok) return auth;

    const { error } = await auth.supabase.from("courses").delete().eq("id", id);
    if (error) {
      console.error("[admin] deleteCourse:", error);
      return { ok: false as const, error: "database" as const, message: error.message };
    }

    revalidatePath("/admin/courses");
    revalidatePath("/cours");
    return { ok: true as const };
  } catch (err) {
    console.error("[admin] deleteCourse threw:", err);
    return { ok: false as const, error: "database" as const, message: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function toggleCourseStatus(id: string, status: "draft" | "published" | "archived") {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;

  const { error } = await auth.supabase
    .from("courses")
    .update({ status, published_at: status === "published" ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) {
    console.error("[admin] toggleCourseStatus:", error);
    return { ok: false as const, error: "database" as const, message: error.message };
  }

  revalidatePath("/admin/courses");
  revalidatePath("/cours");
  return { ok: true as const };
}

// ---------------------------------------------------------------------------
// Exercises
// ---------------------------------------------------------------------------

const exerciseSchema = z.object({
  id: z.string().trim().min(1).max(120),
  title: z.string().trim().min(1).max(200),
  subject: z.enum(["Maths", "Physique", "Informatique"]),
  tag: z.string().trim().max(60).optional().or(z.literal("")),
  source: z.string().trim().max(120).optional().or(z.literal("")),
  level: z.enum(["MPSI", "MP", "MP*"]).optional().or(z.literal("")),
  stars: z.coerce.number().int().min(1).max(5).default(1),
  minutes: z.coerce.number().int().min(0).optional().or(z.nan()),
  equation: z.string().trim().max(300).optional().or(z.literal("")),
  teaser: z.string().trim().max(300).optional().or(z.literal("")),
  statement: z.string().trim().optional().or(z.literal("")),
  hint: z.string().trim().optional().or(z.literal("")),
  solution: z.string().trim().optional().or(z.literal("")),
  answer: z.string().trim().optional().or(z.literal("")),
  solves: z.coerce.number().int().min(0).default(0),
  verified: z.boolean().optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export async function upsertExercise(input: unknown) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;

  const parsed = exerciseSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "validation" as const, issues: parsed.error.flatten() };
  }

  const v = parsed.data;
  let solution: unknown = [];
  if (v.solution) {
    try {
      solution = JSON.parse(v.solution);
    } catch {
      return { ok: false as const, error: "validation" as const, issues: { fieldErrors: { solution: ["JSON invalide"] } } };
    }
  }

  const row = {
    id: v.id,
    title: v.title,
    subject: v.subject,
    tag: v.tag || null,
    source: v.source || null,
    level: v.level || null,
    stars: v.stars,
    minutes: Number.isNaN(v.minutes) ? null : (v.minutes ?? null),
    equation: v.equation || null,
    teaser: v.teaser || null,
    statement: v.statement || null,
    hint: v.hint || null,
    solution,
    answer: v.answer || null,
    solves: v.solves,
    verified: v.verified ?? false,
    status: v.status,
    published_at: v.status === "published" ? new Date().toISOString() : null,
  };

  const { error } = await auth.supabase.from("exercises").upsert(row, { onConflict: "id" });
  if (error) {
    console.error("[admin] upsertExercise:", error);
    return { ok: false as const, error: "database" as const, message: error.message };
  }

  revalidatePath("/admin/exercises");
  revalidatePath("/exercices");
  revalidatePath(`/exercices/${v.id}`);
  return { ok: true as const };
}

export async function deleteExercise(id: string) {
  try {
    const auth = await requireAdmin();
    if (!auth.ok) return auth;

    const { error } = await auth.supabase.from("exercises").delete().eq("id", id);
    if (error) {
      console.error("[admin] deleteExercise:", error);
      return { ok: false as const, error: "database" as const, message: error.message };
    }

    revalidatePath("/admin/exercises");
    revalidatePath("/exercices");
    return { ok: true as const };
  } catch (err) {
    console.error("[admin] deleteExercise threw:", err);
    return { ok: false as const, error: "database" as const, message: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function toggleExerciseStatus(id: string, status: "draft" | "published" | "archived") {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;

  const { error } = await auth.supabase
    .from("exercises")
    .update({ status, published_at: status === "published" ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) {
    console.error("[admin] toggleExerciseStatus:", error);
    return { ok: false as const, error: "database" as const, message: error.message };
  }

  revalidatePath("/admin/exercises");
  revalidatePath("/exercices");
  return { ok: true as const };
}

// ---------------------------------------------------------------------------
// Papers
// ---------------------------------------------------------------------------

const paperSchema = z.object({
  id: z.string().trim().min(1).max(120),
  school: z.enum(["X/ENS", "Mines-Ponts", "Centrale", "CCINP", "e3a"]),
  short: z.string().trim().max(10).optional().or(z.literal("")),
  year: z.coerce.number().int().min(1900).max(2100),
  subject: z.enum(["Maths", "Physique", "Informatique"]),
  title: z.string().trim().min(1).max(200),
  track: z.string().trim().max(30).optional().or(z.literal("")),
  duration: z.string().trim().max(30).optional().or(z.literal("")),
  difficulty: z.coerce.number().int().min(1).max(5).optional().or(z.nan()),
  parts: z.string().trim().max(60).optional().or(z.literal("")),
  hot: z.boolean().optional(),
  correction: z.boolean().optional(),
  color: z.string().trim().max(30).optional().or(z.literal("")),
  pdfUrl: z.string().trim().max(500).optional().or(z.literal("")),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export async function upsertPaper(input: unknown) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;

  const parsed = paperSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "validation" as const, issues: parsed.error.flatten() };
  }

  const v = parsed.data;
  const row = {
    id: v.id,
    school: v.school,
    short: v.short || null,
    year: v.year,
    subject: v.subject,
    title: v.title,
    track: v.track || null,
    duration: v.duration || null,
    difficulty: Number.isNaN(v.difficulty) ? null : (v.difficulty ?? null),
    parts: v.parts || null,
    hot: v.hot ?? false,
    correction: v.correction ?? false,
    color: v.color || null,
    pdf_url: v.pdfUrl || null,
    status: v.status,
    published_at: v.status === "published" ? new Date().toISOString() : null,
  };

  const { error } = await auth.supabase.from("papers").upsert(row, { onConflict: "id" });
  if (error) {
    console.error("[admin] upsertPaper:", error);
    return { ok: false as const, error: "database" as const, message: error.message };
  }

  revalidatePath("/admin/papers");
  revalidatePath("/concours");
  revalidatePath(`/concours/${v.id}`);
  return { ok: true as const };
}

export async function deletePaper(id: string) {
  try {
    const auth = await requireAdmin();
    if (!auth.ok) return auth;

    const { error } = await auth.supabase.from("papers").delete().eq("id", id);
    if (error) {
      console.error("[admin] deletePaper:", error);
      return { ok: false as const, error: "database" as const, message: error.message };
    }

    revalidatePath("/admin/papers");
    revalidatePath("/concours");
    return { ok: true as const };
  } catch (err) {
    console.error("[admin] deletePaper threw:", err);
    return { ok: false as const, error: "database" as const, message: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function togglePaperStatus(id: string, status: "draft" | "published" | "archived") {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;

  const { error } = await auth.supabase
    .from("papers")
    .update({ status, published_at: status === "published" ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) {
    console.error("[admin] togglePaperStatus:", error);
    return { ok: false as const, error: "database" as const, message: error.message };
  }

  revalidatePath("/admin/papers");
  revalidatePath("/concours");
  return { ok: true as const };
}

// ---------------------------------------------------------------------------
// Forum moderation
// ---------------------------------------------------------------------------

export async function setThreadStatus(id: string, status: "published" | "hidden" | "deleted") {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;

  const { error } = await auth.supabase.from("forum_threads").update({ status }).eq("id", id);
  if (error) {
    console.error("[admin] setThreadStatus:", error);
    return { ok: false as const, error: "database" as const, message: error.message };
  }

  revalidatePath("/admin/forum");
  revalidatePath("/forum");
  return { ok: true as const };
}

export async function deleteThread(id: string) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;

  const { error } = await auth.supabase.from("forum_threads").delete().eq("id", id);
  if (error) {
    console.error("[admin] deleteThread:", error);
    return { ok: false as const, error: "database" as const, message: error.message };
  }

  revalidatePath("/admin/forum");
  revalidatePath("/forum");
  return { ok: true as const };
}

export async function setReplyStatus(id: string, status: "published" | "hidden" | "deleted") {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;

  const { error } = await auth.supabase.from("forum_replies").update({ status }).eq("id", id);
  if (error) {
    console.error("[admin] setReplyStatus:", error);
    return { ok: false as const, error: "database" as const, message: error.message };
  }

  revalidatePath("/admin/forum");
  revalidatePath("/forum");
  return { ok: true as const };
}
