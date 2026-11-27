"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { upsertExercise } from "@/lib/admin/actions";

type Props = { initial?: Record<string, unknown> };

export function ExerciseForm({ initial }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const input = {
      id: fd.get("id"),
      title: fd.get("title"),
      subject: fd.get("subject"),
      tag: fd.get("tag"),
      source: fd.get("source"),
      level: fd.get("level"),
      stars: fd.get("stars"),
      minutes: fd.get("minutes"),
      equation: fd.get("equation"),
      teaser: fd.get("teaser"),
      statement: fd.get("statement"),
      hint: fd.get("hint"),
      solution: fd.get("solution"),
      answer: fd.get("answer"),
      solves: fd.get("solves"),
      verified: fd.get("verified") === "on",
      status: fd.get("status"),
    };

    startTransition(async () => {
      try {
        const result = await upsertExercise(input);
        if (result.ok) {
          router.push("/admin/exercises");
          router.refresh();
        } else {
          setError(result.message ?? "Erreur.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue.");
      }
    });
  }

  const i = (initial ?? {}) as Record<string, unknown>;

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16, maxWidth: 800 }}>
      {error ? <p style={{ color: "var(--coral)" }}>{error}</p> : null}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div><label className="field-label">ID</label><input className="input" name="id" defaultValue={String(i.id ?? "")} required /></div>
        <div><label className="field-label">Titre</label><input className="input" name="title" defaultValue={String(i.title ?? "")} required /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div>
          <label className="field-label">Matière</label>
          <select className="input" name="subject" defaultValue={String(i.subject ?? "Maths")}>
            <option value="Maths">Maths</option>
            <option value="Physique">Physique</option>
            <option value="Informatique">Informatique</option>
          </select>
        </div>
        <div>
          <label className="field-label">Niveau</label>
          <select className="input" name="level" defaultValue={String(i.level ?? "")}>
            <option value="">—</option>
            <option value="MPSI">MPSI</option>
            <option value="MP">MP</option>
            <option value="MP*">MP*</option>
          </select>
        </div>
        <div><label className="field-label">Tag</label><input className="input" name="tag" defaultValue={String(i.tag ?? "")} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div><label className="field-label">Source</label><input className="input" name="source" defaultValue={String(i.source ?? "")} /></div>
        <div><label className="field-label">Étoiles (1-5)</label><input className="input" name="stars" type="number" min={1} max={5} defaultValue={String(i.stars ?? 3)} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div><label className="field-label">Minutes</label><input className="input" name="minutes" type="number" defaultValue={String(i.minutes ?? "")} /></div>
        <div><label className="field-label">Résolutions</label><input className="input" name="solves" type="number" defaultValue={String(i.solves ?? 0)} /></div>
      </div>
      <div><label className="field-label">Teaser</label><input className="input" name="teaser" defaultValue={String(i.teaser ?? "")} /></div>
      <div><label className="field-label">Équation</label><input className="input" name="equation" defaultValue={String(i.equation ?? "")} /></div>
      <div><label className="field-label">Énoncé</label><textarea className="input" name="statement" rows={4} defaultValue={String(i.statement ?? "")} /></div>
      <div><label className="field-label">Indice</label><textarea className="input" name="hint" rows={2} defaultValue={String(i.hint ?? "")} /></div>
      <div><label className="field-label">Solution (JSON)</label><textarea className="input" name="solution" rows={6} defaultValue={i.solution ? JSON.stringify(i.solution, null, 2) : "[]"} /></div>
      <div><label className="field-label">Réponse finale</label><input className="input" name="answer" defaultValue={String(i.answer ?? "")} /></div>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" name="verified" defaultChecked={Boolean(i.verified)} />
          Vérifié
        </label>
        <div>
          <label className="field-label">Statut</label>
          <select className="input" name="status" defaultValue={String(i.status ?? "draft")}>
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
      </div>
      <button className="btn btn--lime" type="submit" disabled={pending}>
        {pending ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
