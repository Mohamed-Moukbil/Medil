import Link from "next/link";
import { Icon } from "@/components/icons";
import { Tex } from "@/components/tex";
import { SaveButton } from "@/components/save-button";
import { CompleteButton } from "@/components/complete-button";
import { CoverArt } from "@/components/content/cover-art";
import { getCourse } from "@/lib/content/public";
import { createClient } from "@/lib/supabase/server";
import { renderRichText } from "@/lib/content/rich-text";
import { formatRating } from "@/lib/format";
import { notFound } from "next/navigation";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await getCourse(id);
  if (!course) notFound();

  let completed = false;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: row } = await supabase
        .from("user_completed")
        .select("item_id")
        .eq("user_id", user.id)
        .eq("item_id", id)
        .maybeSingle();
      completed = Boolean(row);
    }
  } catch {
    completed = false;
  }

  return (
    <>
      <section className="reader-hero">
        <div className="reader-hero-glow" aria-hidden="true" />
        <div className="container">
          <Link className="back-link" href="/cours">
            <Icon name="arrowLeft" /> Tous les cours
          </Link>
          <div className="reader-hero-grid">
            <div className="reader-hero-copy">
              <div className="reader-badges">
                <span className="reader-badge reader-badge--lime">{course.subject}</span>
                <span className="reader-badge">{course.level}</span>
                <span className="reader-badge">{course.tag ?? "Cours"}</span>
              </div>
              <h1>{course.title}</h1>
              <p>{course.description}</p>
              <div className="reader-meta">
                <span>
                  <Icon name="layers" /> {course.chaptersCount} chapitres
                </span>
                <span>
                  <Icon name="clock" /> {course.duration ?? "—"} de lecture
                </span>
                <span>
                  <Icon name="star" /> {formatRating(course.rating)} / 5 · {course.students ?? "—"} élèves
                </span>
              </div>
              <div className="reader-hero-actions">
                <button className="btn btn--lime" type="button">
                  <Icon name="download" /> Télécharger le PDF
                </button>
                <SaveButton itemType="course" itemId={course.id} title={course.title} className="btn btn--ghost" />
              </div>
            </div>
            <div className={`reader-cover cover--${course.color ?? "lime"}`}>
              <CoverArt type={course.coverType} />
              <span className="reader-cover-label">MEDIL · {course.level}</span>
              <div className="reader-cover-equation">
                <Tex expression={course.coverEq} display />
              </div>
              <span className="reader-cover-footer">ÉDITION 2026 · PDF</span>
            </div>
          </div>
        </div>
      </section>

      <section className="reader-section">
        <div className="container reader-layout">
          <aside className="reader-sidebar">
            <div className="reader-progress-card">
              <div className="reader-progress-top">
                <span>Progression</span>
                <strong>{completed ? "100%" : "0%"}</strong>
              </div>
              <div className="progress-track progress-track--dark">
                <span style={{ width: completed ? "100%" : "0%" }} />
              </div>
              <p>{completed ? "Cours terminé. Bravo !" : "Encore un petit effort."}</p>
            </div>
            <nav className="toc" aria-label="Sommaire">
              <p className="toc-title">Sommaire</p>
              {course.toc.map((chapter, index) => (
                <a
                  key={`${chapter}-${index}`}
                  className={`toc-link ${index === 0 ? "is-active" : ""}`}
                  href={`#section-${course.sections[index]?.id ?? index}`}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {chapter}
                </a>
              ))}
            </nav>
            <button className="btn btn--outline btn--full" type="button">
              <Icon name="print" /> Version imprimable
            </button>
            <p className="reader-sidebar-note">
              <Icon name="checkCircle" /> Contenu relu et vérifié
              <br />
              <span>Dernière mise à jour : oct. 2026</span>
            </p>
          </aside>

          <div className="reader-main">
            <div className="reader-paper">
              <div className="reader-paper-head">
                <span className="reader-paper-brand">
                  <span className="study-brand-mark">M</span> MEDIL COURS
                </span>
                <span>
                  {course.tag ?? "Cours"} · {course.level}
                </span>
              </div>
              <div className="reader-intro">
                <p className="eyebrow">
                  <span className="eyebrow-dot" />
                  Aperçu du chapitre
                </p>
                <h2>{course.title}</h2>
                <p>
                  Dans ce cours, on construit les outils puis on les met immédiatement à l’épreuve. Chaque section contient l’essentiel, une preuve et un point de vigilance pour le concours.
                </p>
                <div className="objectives">
                  <p>À la fin de ce cours, tu sauras :</p>
                  <ul>
                    {course.objectives.map((objective, index) => (
                      <li key={index}>
                        <Icon name="check" /> {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {course.sections.map((section, index) => (
                <article className="reader-block" id={`section-${section.id}`} key={section.id}>
                  <div className="reader-block-kicker">{section.kicker}</div>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} dangerouslySetInnerHTML={{ __html: renderRichText(paragraph) }} />
                  ))}
                  <div className="reader-formula">
                    <Tex expression={section.formula} display />
                  </div>
                  <div className="reader-note">
                    <span className="reader-note-icon">
                      <Icon name="lightbulb" />
                    </span>
                    <p>
                      <strong>À retenir.</strong>{" "}
                      <span dangerouslySetInnerHTML={{ __html: renderRichText(section.note) }} />
                    </p>
                  </div>
                  {index === 0 ? (
                    <div className="reader-small-example">
                      <span className="example-label">Exemple éclair</span>
                      <p>
                        Si <span className="inline-tex" dangerouslySetInnerHTML={{ __html: renderRichText('<span class="inline-tex" data-tex="A^3=0"></span>') }} /> alors{" "}
                        <span className="inline-tex" dangerouslySetInnerHTML={{ __html: renderRichText('<span class="inline-tex" data-tex="I+A"></span>') }} /> est inversible et{" "}
                        <span className="inline-tex" dangerouslySetInnerHTML={{ __html: renderRichText('<span class="inline-tex" data-tex="(I+A)^{-1}=I-A+A^2"></span>') }} />
                        . C’est exactement l’exercice du jour.
                      </p>
                      <Link className="text-link text-link--dark" href="/exercices">
                        Voir les exercices liés <Icon name="arrowUpRight" />
                      </Link>
                    </div>
                  ) : null}
                </article>
              ))}

              {course.exercise ? (
                <div className="reader-exercise">
                  <div className="reader-exercise-head">
                    <span className="bento-tag">
                      <Icon name="target" /> Exercice d’application
                    </span>
                    <span className="source-badge">À faire maintenant</span>
                  </div>
                  <h3>{course.title.split(" ").slice(0, 3).join(" ")}, en pratique</h3>
                  <p dangerouslySetInnerHTML={{ __html: renderRichText(course.exercise.prompt) }} />
                  <div className="reader-exercise-answer" data-course-answer hidden>
                    <span className="answer-label">
                      <Icon name="checkCircle" /> Réponse
                    </span>
                    <div>
                      <Tex expression={course.exercise.answer} display />
                    </div>
                  </div>
                  <button className="btn btn--dark" type="button">
                    <Icon name="sparkles" /> Voir la réponse
                  </button>
                </div>
              ) : null}

              <div className="reader-pager">
                <Link href="/cours" className="reader-pager-link">
                  <Icon name="arrowLeft" />
                  <span>
                    <small>Bibliothèque</small>
                    Tous les cours
                  </span>
                </Link>
                <CompleteButton itemId={course.id} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
