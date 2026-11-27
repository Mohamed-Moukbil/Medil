"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { upsertPaper } from "@/lib/admin/actions";

type Props = { initial?: Record<string, unknown> };

export function PaperForm({ initial }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const input = {
      id: fd.get("id"),
      school: fd.get("school"),
      short: fd.get("short"),
      year: fd.get("year"),
      subject: fd.get("subject"),
      title: fd.get("title"),
      track: fd.get("track"),
      duration: fd.get("duration"),
      difficulty: fd.get("difficulty"),
      parts: fd.get("parts"),
      hot: fd.get("hot") === "on",
      correction: fd.get("correction") === "on",
      color: fd.get("color"),
      pdfUrl: fd.get("pdfUrl"),
      status: fd.get("status"),
    };

    startTransition(async () => {
      try {
        const result = await upsertPaper(input);
        if (result.ok) {
          router.push("/admin/papers");
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
          <label className="field-label">École</label>
          <select className="input" name="school" defaultValue={String(i.school ?? "X/ENS")}>
            <option value="X/ENS">X/ENS</option>
            <option value="Mines-Ponts">Mines-Ponts</option>
            <option value="Centrale">Centrale</option>
            <option value="CCINP">CCINP</option>
            <option value="e3a">e3a</option>
          </select>
        </div>
        <div><label className="field-label">Abréviation</label><input className="input" name="short" defaultValue={String(i.short ?? "")} /></div>
        <div><label className="field-label">Année</label><input className="input" name="year" type="number" defaultValue={String(i.year ?? new Date().getFullYear())} required /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label className="field-label">Matière</label>
          <select className="input" name="subject" defaultValue={String(i.subject ?? "Maths")}>
            <option value="Maths">Maths</option>
            <option value="Physique">Physique</option>
            <option value="Informatique">Informatique</option>
          </select>
        </div>
        <div><label className="field-label">Filière</label><input className="input" name="track" defaultValue={String(i.track ?? "")} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div><label className="field-label">Durée</label><input className="input" name="duration" defaultValue={String(i.duration ?? "")} /></div>
        <div><label className="field-label">Difficulté (1-5)</label><input className="input" name="difficulty" type="number" min={1} max={5} defaultValue={String(i.difficulty ?? "")} /></div>
        <div><label className="field-label">Parties</label><input className="input" name="parts" defaultValue={String(i.parts ?? "")} /></div>
      </div>
      <div><label className="field-label">Couleur</label><input className="input" name="color" defaultValue={String(i.color ?? "")} /></div>
      <div><label className="field-label">PDF URL</label><input className="input" name="pdfUrl" defaultValue={String(i.pdfUrl ?? "")} /></div>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" name="hot" defaultChecked={Boolean(i.hot)} />
          Incontournable
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" name="correction" defaultChecked={Boolean(i.correction)} />
          Correction disponible
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
