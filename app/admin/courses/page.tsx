import Link from "next/link";
import { getCourses } from "@/lib/content/public";
import { deleteCourse, toggleCourseStatus } from "@/lib/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 750 }}>Cours</h1>
        <Link href="/admin/courses/new" className="btn btn--lime">
          + Nouveau cours
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
            {courses.map((course) => (
              <tr key={course.id} style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "12px 16px" }}>
                  <Link href={`/admin/courses/${course.id}`} style={{ fontWeight: 600 }}>{course.title}</Link>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{course.id}</div>
                </td>
                <td style={{ padding: "12px 16px" }}>{course.subject}</td>
                <td style={{ padding: "12px 16px" }}>{course.level}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: 6,
                    fontSize: 12,
                    background: course.status === "published" ? "var(--lime-soft)" : course.status === "draft" ? "var(--butter)" : "var(--rose)",
                  }}>
                    {course.status}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", display: "flex", gap: 8 }}>
                  <form action={async () => { "use server"; await toggleCourseStatus(course.id, course.status === "published" ? "draft" : "published"); }}>
                    <button className="btn btn--sm btn--outline" type="submit">
                      {course.status === "published" ? "Dépublier" : "Publier"}
                    </button>
                  </form>
                  <DeleteButton action={async () => { "use server"; return deleteCourse(course.id); }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
