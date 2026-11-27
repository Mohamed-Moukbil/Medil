import Link from "next/link";
import { getPapers } from "@/lib/content/public";
import { deletePaper, togglePaperStatus } from "@/lib/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminPapersPage() {
  const papers = await getPapers();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 750 }}>Concours</h1>
        <Link href="/admin/papers/new" className="btn btn--lime">
          + Nouveau sujet
        </Link>
      </div>

      <div style={{ background: "var(--white)", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-card)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--cream-dark)", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Titre</th>
              <th style={{ padding: "12px 16px" }}>École</th>
              <th style={{ padding: "12px 16px" }}>Année</th>
              <th style={{ padding: "12px 16px" }}>Statut</th>
              <th style={{ padding: "12px 16px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "12px 16px" }}>
                  <Link href={`/admin/papers/${p.id}`} style={{ fontWeight: 600 }}>{p.title}</Link>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{p.id}</div>
                </td>
                <td style={{ padding: "12px 16px" }}>{p.school}</td>
                <td style={{ padding: "12px 16px" }}>{p.year}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: 6,
                    fontSize: 12,
                    background: p.status === "published" ? "var(--lime-soft)" : p.status === "draft" ? "var(--butter)" : "var(--rose)",
                  }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", display: "flex", gap: 8 }}>
                  <form action={async () => { "use server"; await togglePaperStatus(p.id, p.status === "published" ? "draft" : "published"); }}>
                    <button className="btn btn--sm btn--outline" type="submit">
                      {p.status === "published" ? "Dépublier" : "Publier"}
                    </button>
                  </form>
                  <DeleteButton action={async () => deletePaper(p.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
