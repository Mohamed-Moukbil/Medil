import "server-only";

import { isSupabaseConfigured } from "@/lib/supabase/config";

export type LocalEditorial = {
  version: number;
  savedAt: string;
  courses: Array<Record<string, unknown>>;
  exercises: Array<Record<string, unknown>>;
  papers: Array<Record<string, unknown>>;
  dailyChallenge: Record<string, unknown>;
  threads: Array<Record<string, unknown>>;
};

let cached: LocalEditorial | null = null;

/**
 * Development-only fallback used before Supabase is connected.
 *
 * Set MEDIL_LOCAL_CONTENT=1 to force it even when Supabase is configured,
 * which is handy for UI work. It is always disabled in production.
 */
export async function getLocalEditorial(): Promise<LocalEditorial | null> {
  if (process.env.NODE_ENV === "production") return null;
  if (isSupabaseConfigured() && process.env.MEDIL_LOCAL_CONTENT !== "1") return null;

  if (!cached) {
    const loaded = await import("./fallback.json");
    cached = loaded.default as LocalEditorial;
  }

  return cached;
}
