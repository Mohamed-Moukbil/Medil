import Link from "next/link";
import { getExercises } from "@/lib/content/public";
import { deleteExercise, toggleExerciseStatus } from "@/lib/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminExercisesPage() {
  const exercises = await getExercises();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 750 }}>Exercices</h1>
        <Link href="/admin/exercises/new" className="btn btn--lime">
          + Nouvel exercice
        </Link>
      </div>

      <div style={{ background: "var(--white)", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-card)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--cream-dark)", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Titre</th>
              <th style={{ padding: "12px 16px" }}>Matière</th>
              <th style={{ padding: "12px 16px" }}>Niveau</th>
              <th style={{ padding: "12px 16px" }}>Statut</th>
              <th style={{ padding: "12px 16px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((ex) => (
              <tr key={ex.id} style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "12px 16px" }}>
                  <Link href={`/admin/exercises/${ex.id}`} style={{ fontWeight: 600 }}>{ex.title}</Link>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{ex.id}</div>
                </td>
                <td style={{ padding: "12px 16px" }}>{ex.subject}</td>
                <td style={{ padding: "12px 16px" }}>{ex.level ?? "—"}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: 6,
                    fontSize: 12,
                    background: ex.status === "published" ? "var(--lime-soft)" : ex.status === "draft" ? "var(--butter)" : "var(--rose)",
                  }}>
                    {ex.status}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", display: "flex", gap: 8 }}>
                  <form action={async () => { "use server"; await toggleExerciseStatus(ex.id, ex.status === "published" ? "draft" : "published"); }}>
                    <button className="btn btn--sm btn--outline" type="submit">
                      {ex.status === "published" ? "Dépublier" : "Publier"}
                    </button>
                  </form>
                  <DeleteButton action={async () => deleteExercise(ex.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
