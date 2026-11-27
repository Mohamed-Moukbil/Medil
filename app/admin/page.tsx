import Link from "next/link";
import { getCourses, getExercises, getPapers, getThreads } from "@/lib/content/public";
import { Icon } from "@/components/icons";

export default async function AdminDashboard() {
  const [courses, exercises, papers, threads] = await Promise.all([
    getCourses(),
    getExercises(),
    getPapers(),
    getThreads(),
  ]);

  const cards = [
    { label: "Cours", count: courses.length, href: "/admin/courses", icon: "book" as const },
    { label: "Exercices", count: exercises.length, href: "/admin/exercises", icon: "target" as const },
    { label: "Concours", count: papers.length, href: "/admin/papers", icon: "trophy" as const },
    { label: "Discussions", count: threads.length, href: "/admin/forum", icon: "forum" as const },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 750, marginBottom: 8 }}>Tableau de bord</h1>
      <p style={{ color: "var(--ink-muted)", marginBottom: 32 }}>Gère le contenu éditorial de MEDIL.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            style={{
              background: "var(--white)",
              borderRadius: 16,
              padding: 24,
              boxShadow: "var(--shadow-card)",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <Icon name={card.icon} />
            <div>
              <div style={{ fontSize: 28, fontWeight: 750 }}>{card.count}</div>
              <div style={{ fontSize: 14, color: "var(--ink-muted)" }}>{card.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
