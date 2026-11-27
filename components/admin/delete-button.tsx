"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
  action: () => Promise<{ ok: boolean; message?: string }>;
  label?: string;
};

export function DeleteButton({ action, label = "Supprimer" }: DeleteButtonProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 4 }}>
      <button
        className="btn btn--sm btn--outline"
        type="button"
        style={{ color: "var(--coral)" }}
        disabled={pending}
        onClick={() => {
          if (!confirm("Confirmer la suppression ?")) return;
          startTransition(async () => {
            const result = await action();
            if (result.ok) {
              router.refresh();
            } else {
              setError(result.message ?? "Erreur.");
            }
          });
        }}
      >
        {pending ? "…" : label}
      </button>
      {error ? <span style={{ fontSize: 11, color: "var(--coral)" }}>{error}</span> : null}
    </div>
  );
}
