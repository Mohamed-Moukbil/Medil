"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { toggleComplete } from "@/lib/personal/complete";
import { useAuthModal } from "@/components/auth/auth-modal-provider";

export function CompleteButton({ itemId }: { itemId: string }) {
  const [completed, setCompleted] = useState(false);
  const [ready, setReady] = useState(() => !isSupabaseConfigured());
  const [pending, startTransition] = useTransition();
  const router = useRouter();
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
          .from("user_completed")
          .select("item_id")
          .eq("user_id", data.user.id)
          .eq("item_id", itemId)
          .maybeSingle();
        if (mounted) {
          setCompleted(Boolean(row));
          setReady(true);
        }
      })
      .catch(() => {
        if (mounted) setReady(true);
      });

    return () => {
      mounted = false;
    };
  }, [itemId]);

  const onClick = () => {
    startTransition(async () => {
      const result = await toggleComplete({ itemId, completed: !completed });
      if (result.ok) {
        setCompleted(result.completed);
        router.refresh();
        return;
      }
      if (result.error === "auth") {
        openAuth("login");
      } else {
        console.error("[medil] complete failed:", result.error);
      }
    });
  };

  return (
    <button
      className="reader-pager-link reader-pager-link--next"
      type="button"
      onClick={onClick}
      disabled={pending || !ready}
    >
      <span>
        <small>Prochaine étape</small>
        {completed ? "Cours terminé" : "Marquer comme lu"}
      </span>
      <Icon name="arrowRight" />
    </button>
  );
}
