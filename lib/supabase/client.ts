"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

/**
 * Browser Supabase client, or null when the project is not configured.
 * Callers should render a graceful "not connected" state instead of throwing.
 */
export function createClient() {
  const config = getSupabaseConfig();
  if (!config) return null;

  return createBrowserClient(config.url, config.anonKey);
}
