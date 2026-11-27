"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createThread } from "@/lib/forum/actions";
import { Icon } from "@/components/icons";

const CATEGORIES = ["Maths", "Physique", "Informatique", "Concours", "Méthode"] as const;

export function NewThreadForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const input = {
      title: String(formData.get("title") ?? ""),
      body: String(formData.get("body") ?? ""),
      category: String(formData.get("category") ?? "Maths"),
      tags: String(formData.get("tags") ?? ""),
    };

    startTransition(async () => {
      const result = await createThread(input);
      if (result.ok) {
        router.push(`/forum/${result.id}`);
        router.refresh();
      } else {
        setError(result.message ?? "Impossible de créer la discussion.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="new-thread-modal" style={{ maxWidth: 720, margin: "0 auto" }}>
      <p className="eyebrow">
        <span className="eyebrow-dot" />
        Nouvelle discussion
      </p>
      <h2>Qu’est-ce qui te bloque ?</h2>
      <p className="modal-intro">Un bon titre, un contexte clair, et ce que tu as déjà essayé. C’est la recette d’une réponse utile.</p>

      <label className="field-label" htmlFor="thread-title">
        Titre du sujet
      </label>
      <input className="input" id="thread-title" name="title" type="text" placeholder="Ex. Une CNS pour que f et g commutent" minLength={8} maxLength={120} required />

      <label className="field-label" htmlFor="thread-category" style={{ marginTop: 16 }}>
        Catégorie
      </label>
      <select className="input" id="thread-category" name="category" required defaultValue="Maths">
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label className="field-label" htmlFor="thread-tags" style={{ marginTop: 16 }}>
        Tags (séparés par des virgules)
      </label>
      <input className="input" id="thread-tags" name="tags" type="text" placeholder="khôlle, méthode, oral" />

      <label className="field-label" htmlFor="thread-body" style={{ marginTop: 16 }}>
        Ton message
      </label>
      <textarea className="input" id="thread-body" name="body" rows={8} placeholder="Contexte, ce que tu as essayé, où tu bloques…" minLength={20} required />

      {error ? <p style={{ color: "var(--peach)", fontSize: 13, marginTop: 12 }}>{error}</p> : null}

      <button className="btn btn--lime btn--full btn--lg" type="submit" disabled={pending} style={{ marginTop: 20 }}>
        Publier la discussion <Icon name="plus" />
      </button>
    </form>
  );
}
