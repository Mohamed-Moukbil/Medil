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
      <section className="page-hero page-hero--courses">
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
              <span className="hero-meta-pill">
                <Icon name="checkCircle" /> Relus par l’équipe
              </span>
            </div>
            <div className="page-hero-deco page-hero-deco--book" aria-hidden="true">∑</div>
            <div className="page-hero-deco page-hero-deco--atom" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      </section>

      <section className="section library-section">
        <div className="container">
          <div className="library-toolbar sticky-toolbar">
            <div className="filter-groups">
              <div className="filter-group">
                <Link className={`filter-pill ${!subject ? "is-active" : ""}`} href={buildHref(undefined, level)}>
                  Tous
                </Link>
                {SUBJECTS.map((item) => (
                  <Link
                    key={item}
                    className={`filter-pill ${subject === item ? "is-active" : ""}`}
                    href={buildHref(item, level)}
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <span className="filter-separator" />
              <div className="filter-group">
                <Link className={`filter-pill ${!level ? "is-active" : ""}`} href={buildHref(subject)}>
                  Tous niveaux
                </Link>
                {LEVELS.map((item) => (
                  <Link
                    key={item}
                    className={`filter-pill ${level === item ? "is-active" : ""}`}
                    href={buildHref(subject, item)}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div className="library-count">
              <strong>{courses.length}</strong> cours <span className="count-dot" /> mis à jour cette semaine
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">
                <Icon name="search" />
              </span>
              <h3>Aucun cours ne correspond.</h3>
              <p>Essaie un autre filtre, ou reviens à tous les cours.</p>
              <Link className="btn btn--dark" href="/cours">
                Réinitialiser les filtres
              </Link>
            </div>
          ) : (
            <div className="course-grid library-grid">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
          <div className="library-footer reveal">
            <div className="library-footer-icon">
              <Icon name="sparkles" />
            </div>
            <div>
              <h3>Un chapitre te manque ?</h3>
              <p>Dis-nous ce qui bloque. Les prochains cours sont choisis avec la communauté.</p>
            </div>
            <Link className="btn btn--outline" href="/forum">
              Proposer un sujet <Icon name="arrowUpRight" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
