"use server";

import { z } from "zod";
import type { ForumCategory } from "@/lib/content/types";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const categories = ["Maths", "Physique", "Informatique", "Concours", "Méthode"] as const;

const threadSchema = z.object({
  title: z.string().trim().min(8).max(120),
  body: z.string().trim().min(20).max(4000),
  category: z.enum(categories),
  tags: z.string().trim().max(200).optional(),
});

const replySchema = z.object({
  threadId: z.string().min(1),
  body: z.string().trim().min(2).max(4000),
});

export type ForumActionResult =
  | { ok: true; id: string }
  | { ok: false; error: "auth" | "config" | "database" | "locked" | "validation"; message?: string };

function parseTags(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 5);
}

export async function createThread(input: unknown): Promise<ForumActionResult> {
  const parsed = threadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "validation", message: "Vérifie le titre et le contenu." };
  }

  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return { ok: false, error: "config" };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "auth" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, grade")
    .eq("id", user.id)
    .maybeSingle();

  const { data, error } = await supabase
    .from("forum_threads")
    .insert({
      author_id: user.id,
      author_name: profile?.name || user.user_metadata?.full_name || user.email?.split("@")[0] || "Taupin MEDIL",
      author_grade: profile?.grade || null,
      author_initials: null,
      avatar_color: "lime",
      excerpt: parsed.data.body.slice(0, 160),
      title: parsed.data.title,
      body: parsed.data.body,
      category: parsed.data.category as ForumCategory,
      tags: parseTags(parsed.data.tags),
      status: "published",
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[medil] createThread:", error);
    return { ok: false, error: "database" };
  }

  try { revalidatePath("/forum"); } catch {}
  return { ok: true, id: data.id };
}

export async function createReply(input: unknown): Promise<ForumActionResult> {
  const parsed = replySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "validation", message: "La réponse est trop courte." };
  }

  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return { ok: false, error: "config" };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "auth" };

  const { data: thread } = await supabase
    .from("forum_threads")
    .select("id, locked, status")
    .eq("id", parsed.data.threadId)
    .maybeSingle();

  if (!thread || thread.status !== "published") {
    return { ok: false, error: "database", message: "Discussion introuvable." };
  }
  if (thread.locked) {
    return { ok: false, error: "locked", message: "Cette discussion est verrouillée." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, grade")
    .eq("id", user.id)
    .maybeSingle();

  const { data, error } = await supabase
    .from("forum_replies")
    .insert({
      thread_id: parsed.data.threadId,
      author_id: user.id,
      author_name: profile?.name || user.user_metadata?.full_name || user.email?.split("@")[0] || "Taupin MEDIL",
      author_grade: profile?.grade || null,
      avatar_color: "lime",
      body: parsed.data.body,
      status: "published",
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[medil] createReply:", error);
    return { ok: false, error: "database" };
  }

  try { revalidatePath(`/forum/${parsed.data.threadId}`); } catch {}
  try { revalidatePath("/forum"); } catch {}
  return { ok: true, id: data.id };
}
