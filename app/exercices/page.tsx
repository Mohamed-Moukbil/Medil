import Link from "next/link";
import { getExercises } from "@/lib/content/public";
import { Icon } from "@/components/icons";
import { ExerciseCard } from "@/components/content/exercise-card";
import type { Level, Subject } from "@/lib/content/types";

const SUBJECTS: Subject[] = ["Maths", "Physique", "Informatique"];
const LEVELS: Level[] = ["MPSI", "MP", "MP*"];

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
      <section className="page-hero">
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
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
            <Link className={`btn btn--sm ${!subject ? "btn--dark" : "btn--outline"}`} href={level ? `/exercices?level=${level}` : "/exercices"}>
              Toutes les matières
            </Link>
            {SUBJECTS.map((item) => (
              <Link
                key={item}
                className={`btn btn--sm ${subject === item ? "btn--dark" : "btn--outline"}`}
                href={`/exercices?subject=${item}${level ? `&level=${level}` : ""}`}
              >
                {item}
              </Link>
            ))}
            <span style={{ width: "100%" }} />
            {LEVELS.map((item) => (
              <Link
                key={item}
                className={`btn btn--sm ${level === item ? "btn--lime" : "btn--outline"}`}
                href={`/exercices?${subject ? `subject=${subject}&` : ""}level=${item}`}
              >
                {item}
              </Link>
            ))}
          </div>

          {exercises.length === 0 ? (
            <p style={{ color: "var(--ink-muted)" }}>Aucun exercice pour ces filtres.</p>
          ) : (
            <div className="exercise-grid">
              {exercises.map((exercise, index) => (
                <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
