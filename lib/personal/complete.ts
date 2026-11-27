"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const schema = z.object({ itemId: z.string().min(1), completed: z.boolean() });

export type CompleteResult =
  | { ok: true; completed: boolean }
  | { ok: false; error: "auth" | "config" | "database" };

export async function toggleComplete(input: unknown): Promise<CompleteResult> {
  const parsed = schema.safeParse(input);
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

  const { itemId, completed } = parsed.data;

  if (completed) {
    const { error } = await supabase.from("user_completed").upsert(
      { user_id: user.id, item_id: itemId },
      { onConflict: "user_id,item_id" },
    );
    if (error) {
      console.error("[medil] complete:", error);
      return { ok: false, error: "database" };
    }
  } else {
    const { error } = await supabase.from("user_completed").delete().match({ user_id: user.id, item_id: itemId });
    if (error) {
      console.error("[medil] uncomplete:", error);
      return { ok: false, error: "database" };
    }
  }

  revalidatePath("/profil");
  return { ok: true, completed };
}
