"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "auth", message: "Non authentifié." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();
  if (!profile?.is_admin) {
    return { ok: false, error: "auth", message: "Accès refusé." };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `${bucket === "covers" ? "covers" : "papers"}/${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (uploadError) {
    console.error("[storage] upload:", uploadError);
    return { ok: false, error: "database", message: uploadError.message };
  }

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(path);
  return { ok: true, url: publicUrl.publicUrl };
}
