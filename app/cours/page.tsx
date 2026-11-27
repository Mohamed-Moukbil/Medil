import Link from "next/link";
import { getCourses } from "@/lib/content/public";
import { Icon } from "@/components/icons";
import { CourseCard } from "@/components/content/course-card";
import type { Level, Subject } from "@/lib/content/types";

const SUBJECTS: Subject[] = ["Maths", "Physique", "Informatique"];
const LEVELS: Level[] = ["MPSI", "MP", "MP*"];

function buildHref(subject?: string, level?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (level) params.set("level", level);
  const query = params.toString();
  return query ? `/cours?${query}` : "/cours";
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; level?: string }>;
}) {
  const params = await searchParams;
  const subject = SUBJECTS.includes(params.subject as Subject) ? (params.subject as Subject) : undefined;
  const level = LEVELS.includes(params.level as Level) ? (params.level as Level) : undefined;

  const courses = await getCourses({ subject, level });

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="page-hero-inner reveal">
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow-dot" />
              Bibliothèque de cours
            </p>
            <h1>
              Des cours qui vont
              <br />
              <span className="serif-italic">au fond.</span>
            </h1>
            <p className="page-hero-description">
              Rédigés en LaTeX, relus par des élèves de l’X et de l’ENS. Pas de résumé flou : des définitions nettes, des preuves complètes et des pièges signalés.
            </p>
            <div className="page-hero-meta">
              <span className="hero-meta-pill">
                <Icon name="book" /> {courses.length} cours
              </span>
              <span className="hero-meta-pill">
                <Icon name="layers" /> {courses.reduce((sum, course) => sum + course.chaptersCount, 0)} chapitres
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
            <Link className={`btn btn--sm ${!subject && !level ? "btn--dark" : "btn--outline"}`} href="/cours">
              Tous
            </Link>
            {SUBJECTS.map((item) => (
              <Link
                key={item}
                className={`btn btn--sm ${subject === item ? "btn--dark" : "btn--outline"}`}
                href={buildHref(item, level)}
              >
                {item}
              </Link>
            ))}
            <span style={{ width: "100%" }} />
            {LEVELS.map((item) => (
              <Link
                key={item}
                className={`btn btn--sm ${level === item ? "btn--lime" : "btn--outline"}`}
                href={buildHref(subject, item)}
              >
                {item}
              </Link>
            ))}
            {(subject || level) && (
              <Link className="btn btn--sm btn--ghost-dark" href="/cours" style={{ color: "var(--ink)" }}>
                Réinitialiser
              </Link>
            )}
          </div>

          {courses.length === 0 ? (
            <p style={{ color: "var(--ink-muted)" }}>Aucun cours pour ces filtres.</p>
          ) : (
            <div className="course-grid">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
