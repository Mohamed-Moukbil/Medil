import Link from "next/link";
import { Icon } from "@/components/icons";
import { Tex } from "@/components/tex";
import { StarRow } from "@/components/content/stars";
import { getExercise } from "@/lib/content/public";
import { renderRichText } from "@/lib/content/rich-text";
import { notFound } from "next/navigation";

export default async function ExerciseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exercise = await getExercise(id);
  if (!exercise) notFound();

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="page-hero-inner reveal">
            <Link className="back-link" href="/exercices" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16, display: "inline-flex" }}>
              <Icon name="arrowLeft" /> Tous les exercices
            </Link>
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow-dot" />
              {exercise.subject} · {exercise.level ?? "MP"}
            </p>
            <h1>{exercise.title}</h1>
            <p className="page-hero-description">{exercise.teaser}</p>
            <div className="page-hero-meta">
              <span className="hero-meta-pill">
                <Icon name="target" /> {exercise.source ?? "MEDIL"}
              </span>
              <span className="hero-meta-pill">
                <StarRow count={exercise.stars} label={false} />
              </span>
              <span className="hero-meta-pill">
                <Icon name="clock" /> {exercise.minutes ?? "—"} min
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="exercise-modal" style={{ background: "var(--white)", borderRadius: 24, padding: 32, boxShadow: "var(--shadow-card)" }}>
            <div className="exercise-modal-body" style={{ display: "grid", gap: 24 }}>
              <div className="exercise-statement-panel">
                <div className="panel-label">
                  <Icon name="file" /> Énoncé
                </div>
                <div className="exercise-statement" dangerouslySetInnerHTML={{ __html: renderRichText(exercise.statement) }} />
                <div className="exercise-hero-equation">
                  <Tex expression={exercise.equation} display />
                </div>
                {exercise.hint ? (
                  <div className="hint-box">
                    <p>{exercise.hint}</p>
                  </div>
                ) : null}
              </div>

              <div className="solution-panel">
                <div className="panel-label">
                  <Icon name="sparkles" /> Correction guidée
                </div>
                <div className="full-solution">
                  {exercise.solution.map((step, index) => (
                    <div className="full-solution-step" key={index}>
                      <span className="solution-step-number">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h3>{step.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: renderRichText(step.text) }} />
                        {step.equation ? <div className="solution-equation"><Tex expression={step.equation} display /></div> : null}
                      </div>
                    </div>
                  ))}
                  <div className="final-answer">
                    <span>
                      <Icon name="checkCircle" /> Réponse finale
                    </span>
                    <div>
                      <Tex expression={exercise.answer} display />
                    </div>
                  </div>
                  <div className="solution-verified">
                    <Icon name="checkCircle" /> Vérifié par un professeur de CPGE · 2 relectures
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
