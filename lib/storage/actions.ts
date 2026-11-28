"use server";

import { createClient } from "@/lib/supabase/server";

export type UploadResult =
  | { ok: true; url: string }
  | { ok: false; error: "auth" | "config" | "validation" | "database"; message: string };

export async function uploadFile(formData: FormData): Promise<UploadResult> {
  const bucket = String(formData.get("bucket") ?? "");
  const file = formData.get("file");

  if (bucket !== "covers" && bucket !== "papers") {
    return { ok: false, error: "validation", message: "Bucket invalide." };
  }
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "validation", message: "Fichier manquant." };
  }
  if (file.size > 10 * 1024 * 1024) {
    return { ok: false, error: "validation", message: "Fichier trop volumineux (max 10 Mo)." };
  }

  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return { ok: false, error: "config", message: "Supabase non configuré." };
  }

  let user = null;
  let profile: { is_admin?: boolean } | null = null;
  try {
    const res = await supabase.auth.getUser();
    user = res.data?.user ?? null;
    if (user) {
      const p = await supabase.from("profiles").select("is_admin").eq("id", user.id).maybeSingle();
      profile = p.data ?? null;
    }
  } catch (err) {
    console.error("[storage] auth check threw:", err);
    return { ok: false, error: "database", message: err instanceof Error ? err.message : "Erreur." };
  }
  if (!user) return { ok: false, error: "auth", message: "Non authentifié." };
  if (!profile?.is_admin) {
    return { ok: false, error: "auth", message: "Accès refusé." };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `${bucket === "covers" ? "covers" : "papers"}/${safeName}`;

  let uploadError: { message: string } | null = null;
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { contentType: file.type || "application/octet-stream", upsert: false });
    uploadError = error;
  } catch (err) {
    console.error("[storage] upload threw:", err);
    return { ok: false, error: "database", message: err instanceof Error ? err.message : "Upload failed" };
  }

  if (uploadError) {
    console.error("[storage] upload:", uploadError);
    return { ok: false, error: "database", message: uploadError.message };
  }

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(path);
  return { ok: true, url: publicUrl.publicUrl };
}
