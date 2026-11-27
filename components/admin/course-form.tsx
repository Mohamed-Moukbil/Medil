"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { upsertCourse } from "@/lib/admin/actions";

type CourseFormProps = {
  initial?: Record<string, unknown>;
};

export function CourseForm({ initial }: CourseFormProps) {
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
      tag: fd.get("tag"),
      subject: fd.get("subject"),
      level: fd.get("level"),
      color: fd.get("color"),
      coverType: fd.get("coverType"),
      coverEq: fd.get("coverEq"),
      chaptersCount: fd.get("chaptersCount"),
      duration: fd.get("duration"),
      students: fd.get("students"),
      rating: fd.get("rating"),
      featured: fd.get("featured") === "on",
      description: fd.get("description"),
      formula: fd.get("formula"),
      objectives: fd.get("objectives"),
      toc: fd.get("toc"),
      sections: fd.get("sections"),
      exercisePrompt: fd.get("exercisePrompt"),
      exerciseAnswer: fd.get("exerciseAnswer"),
      status: fd.get("status"),
    };

    startTransition(async () => {
      try {
        const result = await upsertCourse(input);
        if (result.ok) {
          router.push("/admin/courses");
          router.refresh();
        } else {
          setError(result.message ?? "Erreur de validation.");
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
        <div>
          <label className="field-label">ID (slug)</label>
          <input className="input" name="id" defaultValue={String(i.id ?? "")} required />
        </div>
        <div>
          <label className="field-label">Titre</label>
          <input className="input" name="title" defaultValue={String(i.title ?? "")} required />
        </div>
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
          <select className="input" name="level" defaultValue={String(i.level ?? "MP")}>
            <option value="MPSI">MPSI</option>
            <option value="MP">MP</option>
            <option value="MP*">MP*</option>
          </select>
        </div>
        <div>
          <label className="field-label">Tag</label>
          <input className="input" name="tag" defaultValue={String(i.tag ?? "")} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
        <div>
          <label className="field-label">Couleur</label>
          <input className="input" name="color" defaultValue={String(i.color ?? "")} />
        </div>
        <div>
          <label className="field-label">Cover type</label>
          <input className="input" name="coverType" defaultValue={String(i.coverType ?? "")} />
        </div>
        <div>
          <label className="field-label">Cover eq</label>
          <input className="input" name="coverEq" defaultValue={String(i.coverEq ?? "")} />
        </div>
        <div>
          <label className="field-label">Chapitres</label>
          <input className="input" name="chaptersCount" type="number" defaultValue={String(i.chaptersCount ?? 0)} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div>
          <label className="field-label">Durée</label>
          <input className="input" name="duration" defaultValue={String(i.duration ?? "")} />
        </div>
        <div>
          <label className="field-label">Élèves</label>
          <input className="input" name="students" defaultValue={String(i.students ?? "")} />
        </div>
        <div>
          <label className="field-label">Note</label>
          <input className="input" name="rating" type="number" step="0.1" defaultValue={String(i.rating ?? "")} />
        </div>
      </div>

      <div>
        <label className="field-label">Description</label>
        <textarea className="input" name="description" rows={3} defaultValue={String(i.description ?? "")} />
      </div>

      <div>
        <label className="field-label">Formule</label>
        <input className="input" name="formula" defaultValue={String(i.formula ?? "")} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label className="field-label">Objectifs (un par ligne)</label>
          <textarea className="input" name="objectives" rows={4} defaultValue={Array.isArray(i.objectives) ? (i.objectives as string[]).join("\n") : ""} />
        </div>
        <div>
          <label className="field-label">Sommaire (un par ligne)</label>
          <textarea className="input" name="toc" rows={4} defaultValue={Array.isArray(i.toc) ? (i.toc as string[]).join("\n") : ""} />
        </div>
      </div>

      <div>
        <label className="field-label">Sections (JSON)</label>
        <textarea className="input" name="sections" rows={8} defaultValue={i.sections ? JSON.stringify(i.sections, null, 2) : "[]"} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label className="field-label">Exercice — énoncé</label>
          <textarea className="input" name="exercisePrompt" rows={3} defaultValue={String((i.exercise as Record<string, unknown>)?.prompt ?? "")} />
        </div>
        <div>
          <label className="field-label">Exercice — réponse</label>
          <input className="input" name="exerciseAnswer" defaultValue={String((i.exercise as Record<string, unknown>)?.answer ?? "")} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" name="featured" defaultChecked={Boolean(i.featured)} />
          Mis en avant
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
