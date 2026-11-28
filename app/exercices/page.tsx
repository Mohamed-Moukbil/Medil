import Link from "next/link";
import { getExercises } from "@/lib/content/public";
import { Icon } from "@/components/icons";
import { ExerciseCard } from "@/components/content/exercise-card";
import type { Level, Subject } from "@/lib/content/types";

const SUBJECTS: Subject[] = ["Maths", "Physique", "Informatique"];
const LEVELS: Level[] = ["MPSI", "MP", "MP*"];

function buildHref(subject?: string, level?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (level) params.set("level", level);
  const query = params.toString();
  return query ? `/exercices?${query}` : "/exercices";
}

export default async function ExercisesPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; level?: string }>;
}) {
  const params = await searchParams;
  const subject = SUBJECTS.includes(params.subject as Subject) ? (params.subject as Subject) : undefined;
  const level = LEVELS.includes(params.level as Level) ? (params.level as Level) : undefined;

  const exercises = await getExercises({ subject, level });

  return (
    <>
      <section className="page-hero page-hero--exercises">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="page-hero-inner reveal">
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow-dot" />
              Exercices corrigés
            </p>
            <h1>
              Les exercices
              <br />
              <span className="serif-italic">qui font mal.</span>
            </h1>
            <p className="page-hero-description">
              Classés par difficulté, tous corrigés pas à pas. Cherche d’abord, vérifie ensuite.
            </p>
            <div className="page-hero-meta">
              <span className="hero-meta-pill">
                <Icon name="target" /> {exercises.length} exercices
              </span>
              <span className="hero-meta-pill">
                <Icon name="checkCircle" /> 100% corrigés
              </span>
              <span className="hero-meta-pill">
                <Icon name="layers" /> Classés par difficulté
              </span>
            </div>
            <div className="page-hero-deco page-hero-deco--sigma" aria-hidden="true">∫</div>
            <div className="page-hero-deco page-hero-deco--stars" aria-hidden="true">
              ★<br />★<br />★
            </div>
          </div>
        </div>
      </section>

      <section className="section exercises-library">
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
              <strong>{exercises.length}</strong> exercices <span className="count-dot" /> corrigés vérifiés
            </div>
          </div>

          {exercises.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">
                <Icon name="search" />
              </span>
              <h3>Aucun exercice sur ce radar.</h3>
              <p>Change de filtre ou tente un autre niveau de difficulté.</p>
              <Link className="btn btn--dark" href="/exercices">
                Réinitialiser les filtres
              </Link>
            </div>
          ) : (
            <div className="exercise-grid">
              {exercises.map((exercise, index) => (
                <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
              ))}
            </div>
          )}
          <div className="exercises-note reveal">
            <div className="exercises-note-icon">
              <Icon name="lightbulb" />
            </div>
            <div>
              <strong>Notre philosophie du corrigé.</strong>
              <p>On ne donne pas seulement la réponse. On explique comment trouver l’idée, pourquoi elle marche, et ce qu’il faut retenir pour la prochaine fois.</p>
            </div>
            <span className="note-signature">— L’équipe MEDIL</span>
          </div>
        </div>
      </section>
    </>
  );
}
