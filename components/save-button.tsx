"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { toggleSave } from "@/lib/personal/actions";
import { useAuthModal } from "@/components/auth/auth-modal-provider";

type SaveButtonProps = {
  itemType: "course" | "exercise";
  itemId: string;
  title: string;
  className?: string;
};

export function SaveButton({ itemType, itemId, title, className = "icon-button" }: SaveButtonProps) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(() => !isSupabaseConfigured());
  const [pending, startTransition] = useTransition();
  const { openAuth } = useAuthModal();

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      return;
    }

    let mounted = true;

    supabase.auth
      .getUser()
      .then(async ({ data }) => {
        if (!mounted) return;
        if (!data.user) {
          setReady(true);
          return;
        }

        const { data: row } = await supabase
          .from("user_saves")
          .select("item_id")
          .eq("user_id", data.user.id)
          .eq("item_type", itemType)
          .eq("item_id", itemId)
          .maybeSingle();

        if (mounted) {
          setSaved(Boolean(row));
          setReady(true);
        }
      })
      .catch(() => {
        if (mounted) setReady(true);
      });

    return () => {
      mounted = false;
    };
  }, [itemId, itemType]);

  const onClick = () => {
    startTransition(async () => {
      const result = await toggleSave({ itemType, itemId, saved: !saved });
      if (result.ok) {
        setSaved(result.saved);
        router.refresh();
        return;
      }
      if (result.error === "auth") {
        openAuth("login");
      } else {
        console.error("[medil] save failed:", result.error);
      }
    });
  };

  return (
    <button
      className={`${className} ${saved ? "is-saved" : ""}`.trim()}
      type="button"
      aria-label={`${saved ? "Retirer" : "Enregistrer"} ${itemType === "course" ? "le cours" : "l’exercice"} ${title}`}
      aria-pressed={saved}
      onClick={onClick}
      disabled={pending || !ready}
    >
      <Icon name="bookmark" />
    </button>
  );
}
