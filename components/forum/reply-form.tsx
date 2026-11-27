"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createReply } from "@/lib/forum/actions";
import { Icon } from "@/components/icons";

export function ReplyForm({ threadId }: { threadId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const body = String(formData.get("body") ?? "");

    startTransition(async () => {
      const result = await createReply({ threadId, body });
      if (result.ok) {
        (event.target as HTMLFormElement).reset();
        router.refresh();
      } else {
        setError(result.message ?? "Impossible de publier la réponse.");
      }
    });
  }

  return (
    <form data-reply-form data-thread-id={threadId} onSubmit={handleSubmit}>
      <label className="field-label" htmlFor="reply-body">
        Ta réponse
      </label>
      <textarea
        className="input"
        id="reply-body"
        name="body"
        rows={5}
        placeholder="Partage ton idée, ton calcul ou ton contre-exemple…"
        required
        minLength={2}
      />
      {error ? <p style={{ color: "var(--peach)", fontSize: 13, marginTop: 8 }}>{error}</p> : null}
      <button className="btn btn--lime" type="submit" disabled={pending} style={{ marginTop: 12 }}>
        Publier la réponse <Icon name="send" />
      </button>
    </form>
  );
}
