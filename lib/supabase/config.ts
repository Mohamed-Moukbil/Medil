export type SupabaseConfig = {
  url: string;
  anonKey: string;
};

/**
 * Returns the public Supabase config, or null when the project is not
 * connected yet. The placeholder checks let the app run (and build) before
 * .env.local has been filled in.
 */
export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) return null;
  if (url.includes("your-project") || anonKey.includes("your-anon")) return null;
  if (!/^https?:\/\//.test(url)) return null;

  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  return "http://localhost:3000";
}
