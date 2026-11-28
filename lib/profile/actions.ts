"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const profileSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis.").max(120),
  grade: z.string().trim().max(80).optional().or(z.literal("")),
  avatarUrl: z.string().trim().max(2_000_000).optional().or(z.literal("")),
});

export type ProfileUpdateResult =
  | { ok: true }
  | { ok: false; error: "auth" | "config" | "validation" | "database"; message: string };

export async function updateProfile(input: unknown): Promise<ProfileUpdateResult> {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return { ok: false, error: "config", message: "Supabase non configuré." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "auth", message: "Non authentifié." };

  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: "validation", message: issue?.message ?? "Données invalides." };
  }

  const { name, grade, avatarUrl } = parsed.data;
  const normalizedAvatar = avatarUrl?.trim() ? avatarUrl.trim() : null;

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ name, grade: grade?.trim() || null, avatar_url: normalizedAvatar })
    .eq("id", user.id);

  if (profileError) {
    console.error("[profile] update profile:", profileError);
    return { ok: false, error: "database", message: profileError.message };
  }

  const { error: metadataError } = await supabase.auth.updateUser({
    data: {
      full_name: name,
      grade: grade?.trim() || null,
      avatar_url: normalizedAvatar,
    },
  });

  if (metadataError) {
    console.error("[profile] update metadata:", metadataError);
    return { ok: false, error: "database", message: metadataError.message };
  }

  try {
    revalidatePath("/profil");
  } catch {}
  return { ok: true };
}

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mot de passe actuel requis."),
    newPassword: z.string().min(8, "8 caractères minimum.").max(128),
    confirmPassword: z.string().min(1, "Confirmation requise."),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export type PasswordUpdateResult =
  | { ok: true }
  | { ok: false; error: "auth" | "config" | "validation" | "database"; message: string };

export async function changePassword(input: unknown): Promise<PasswordUpdateResult> {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return { ok: false, error: "config", message: "Supabase non configuré." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) return { ok: false, error: "auth", message: "Non authentifié." };

  const parsed = passwordSchema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: "validation", message: issue?.message ?? "Données invalides." };
  }

  const { currentPassword, newPassword } = parsed.data;

  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });
  if (verifyError) {
    return { ok: false, error: "auth", message: "Mot de passe actuel incorrect." };
  }

  const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
  if (updateError) {
    console.error("[profile] change password:", updateError);
    return { ok: false, error: "database", message: updateError.message };
  }

  try {
    revalidatePath("/profil");
  } catch {}
  return { ok: true };
}

const emailSchema = z.object({
  newEmail: z.string().trim().email("Adresse e-mail invalide."),
});

export type EmailUpdateResult =
  | { ok: true }
  | { ok: false; error: "auth" | "config" | "validation" | "database"; message: string };

export async function changeEmail(input: unknown): Promise<EmailUpdateResult> {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return { ok: false, error: "config", message: "Supabase non configuré." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "auth", message: "Non authentifié." };

  const parsed = emailSchema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: "validation", message: issue?.message ?? "Données invalides." };
  }

  const { error } = await supabase.auth.updateUser({ email: parsed.data.newEmail });
  if (error) {
    console.error("[profile] change email:", error);
    return { ok: false, error: "database", message: error.message };
  }

  try {
    revalidatePath("/profil");
  } catch {}
  return { ok: true };
}
