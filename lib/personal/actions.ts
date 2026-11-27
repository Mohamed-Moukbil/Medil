"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const saveSchema = z.object({
  itemType: z.enum(["course", "exercise"]),
  itemId: z.string().min(1),
  saved: z.boolean(),
});

export type SaveResult =
  | { ok: true; saved: boolean }
  | { ok: false; error: "auth" | "config" | "database" };

export async function toggleSave(input: unknown): Promise<SaveResult> {
  const parsed = saveSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "database" };

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

  const { itemType, itemId, saved } = parsed.data;

  if (saved) {
    const { error } = await supabase.from("user_saves").upsert(
      { user_id: user.id, item_type: itemType, item_id: itemId },
      { onConflict: "user_id,item_type,item_id" },
    );
    if (error) {
      console.error("[medil] save:", error);
      return { ok: false, error: "database" };
    }
  } else {
    const { error } = await supabase
      .from("user_saves")
      .delete()
      .match({ user_id: user.id, item_type: itemType, item_id: itemId });
    if (error) {
      console.error("[medil] unsave:", error);
      return { ok: false, error: "database" };
    }
  }

  return { ok: true, saved };
}
