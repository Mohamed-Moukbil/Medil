"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { getSupabaseConfig } from "@/lib/supabase/config";

export type NewsletterState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialNewsletterState: NewsletterState = { status: "idle", message: "" };

const emailSchema = z.email();

export async function subscribeToNewsletter(
  _previous: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) {
    return { status: "error", message: "Adresse e-mail invalide." };
  }

  const config = getSupabaseConfig();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!config || !serviceRoleKey || serviceRoleKey.includes("your-service-role")) {
    return {
      status: "error",
      message: "La newsletter sera disponible dès que Supabase sera connecté.",
    };
  }

  const supabase = createClient(config.url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from("newsletter_subscribers").upsert(
    {
      email,
      status: "pending",
      source: "footer",
    },
    { onConflict: "email", ignoreDuplicates: false },
  );

  if (error) {
    console.error("[medil] newsletter:", error);
    return {
      status: "error",
      message: "Impossible de t’inscrire pour le moment. Réessaie plus tard.",
    };
  }

  return {
    status: "success",
    message: "C’est noté. Un déclic par semaine, zéro spam.",
  };
}
