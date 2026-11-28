import Link from "next/link";
import { getCourses, getExercises, getPapers, getThreads, getSiteStats, getDailyChallenge } from "@/lib/content/public";
import { Icon } from "@/components/icons";
import { Tex } from "@/components/tex";
import { CourseCard } from "@/components/content/course-card";
import { ThreadRow } from "@/components/content/thread-row";
import { AvatarStack } from "@/components/content/avatar-stack";
import { formatRating } from "@/lib/format";

export default async function HomePage() {
  const [courses, exercises, papers, threads, stats, daily] = await Promise.all([
    getCourses(),
    getExercises(),
    getPapers(),
    getThreads({ limit: 3 }),
    getSiteStats(),
    getDailyChallenge(),
  ]);

  const featuredPool = courses.filter((course) => course.featured);
  const featured = (featuredPool.length ? featuredPool : courses).slice(0, 4);
  const heroCourse = courses.find((course) => course.featured) ?? courses[0] ?? null;
  const heroPaper = papers.find((paper) => paper.hot) ?? papers[0] ?? null;
  const latestPaper = [...papers].sort((a, b) => b.year - a.year)[0] ?? null;
  const heroPaperLetter = heroPaper ? /([A-Z])\s*$/.exec(heroPaper.title)?.[1] : undefined;
  const heroPaperSubject = heroPaper
    ? heroPaper.subject === "Informatique"
      ? "Info"
      : heroPaper.subject
    : "Annales";
  const heroPaperTitle = `${heroPaperSubject}${heroPaperLetter ? ` ${heroPaperLetter}` : ""}`;
  const totalResources = stats.courses + stats.exercises + stats.papers;
  const averageRating = courses.length
    ? courses.reduce((sum, course) => sum + (course.rating ?? 0), 0) / courses.length
    : 4.9;

  const subjectCounts = {
    Maths: {
      courses: courses.filter((c) => c.subject === "Maths").length,
      exercises: exercises.filter((e) => e.subject === "Maths").length,
      papers: papers.filter((p) => p.subject === "Maths").length,
    },
    Physique: {
      courses: courses.filter((c) => c.subject === "Physique").length,
      exercises: exercises.filter((e) => e.subject === "Physique").length,
      papers: papers.filter((p) => p.subject === "Physique").length,
    },
    Informatique: {
      courses: courses.filter((c) => c.subject === "Informatique").length,
      exercises: exercises.filter((e) => e.subject === "Informatique").length,
      papers: papers.filter((p) => p.subject === "Informatique").length,
    },
  };

  return (
    <>
      <section className="hero">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="hero-glow hero-glow--one" aria-hidden="true" />
        <div className="hero-glow hero-glow--two" aria-hidden="true" />
        <div className="container hero-container">
          <div className="hero-copy">
            <Link className="hero-announce" href="/concours">
              <span className="announce-dot" />
              <span>
                {latestPaper ? (
                  <>
                    Banque <strong>{latestPaper.school} {latestPaper.year}</strong> fraîchement ajoutée
                  </>
                ) : (
                  "Toute la banque de concours, au même endroit"
                )}
              </span>
              <Icon name="arrowUpRight" />
            </Link>
            <h1 className="hero-title">
              <span>La prépa,</span>
              <span>sans angles</span>
              <span className="hero-serif">
                morts<em>.</em>
              </span>
            </h1>
            <p className="hero-description">
              Cours en LaTeX, exercices exigeants corrigés et banque de concours. De MPSI à MP, de CCINP à l’X — tout ce qu’il te faut, sans le bruit.
            </p>
            <div className="hero-actions">
              <Link className="btn btn--lime btn--lg" href="/cours">
                Explorer les ressources <span className="btn-orb"><Icon name="arrowUpRight" /></span>
              </Link>
              <Link className="btn btn--ghost btn--lg" href="/concours">
                Voir la banque de concours
              </Link>
            </div>
            <div className="hero-proof">
              <AvatarStack />
              <p>
                <strong>{totalResources} ressources</strong> pour réviser avec MEDIL{" "}
                <span className="proof-rating">
                  <Icon name="star" /> {formatRating(averageRating)}/5
                </span>
              </p>
            </div>
          </div>

          <div className="hero-stage" aria-label="Aperçu d’un cours MEDIL">
            <div className="hero-orbit hero-orbit--outer" aria-hidden="true" />
            <div className="hero-orbit hero-orbit--inner" aria-hidden="true" />
            <Link
              className="mini-card mini-card--exam"
              href={heroPaper ? `/concours/${heroPaper.id}` : "/concours"}
            >
              <span className="mini-card-label">
                {heroPaper ? `${heroPaper.school} · ${heroPaper.year}` : "Banque de concours"}
              </span>
              <span className="mini-card-title">{heroPaperTitle}</span>
              <span className="mini-card-meta">
                {heroPaper ? `${heroPaper.duration ?? "—"} · ${heroPaper.track ?? "—"}` : "Toutes les filières"}{" "}
                <span className="mini-arrow">
                  <Icon name="arrowUpRight" />
                </span>
              </span>
            </Link>
            <div className="study-card">
              <div className="study-card-top">
                <span className="study-brand">
                  <span className="study-brand-mark">M</span> MEDIL / COURS
                </span>
                <span className="live-pill">
                  <span /> EN COURS
                </span>
              </div>
              <div className="study-card-heading">
                <span className="study-kicker">
                  {heroCourse ? `${heroCourse.tag ?? "Cours"} · ${heroCourse.level}` : "La bibliothèque MEDIL"}
                </span>
                <h2>{heroCourse ? heroCourse.title : "Tous les cours, au même endroit"}</h2>
              </div>
              <div className="study-equation">
                <Tex expression={heroCourse?.coverEq ?? "\\text{MEDIL}"} display />
              </div>
              <div className="study-progress-head">
                <span>Progression</span>
                <strong>0%</strong>
              </div>
              <div className="progress-track">
                <span style={{ width: "0%" }} />
              </div>
              <div className="study-footer">
                <span>
                  <Icon name="clock" /> {heroCourse ? `${heroCourse.duration ?? "—"} de lecture` : "Bibliothèque complète"}
                </span>
                <Link href={heroCourse ? `/cours/${heroCourse.id}` : "/cours"}>
                  {heroCourse ? "Reprendre" : "Explorer"} <Icon name="arrowRight" />
                </Link>
              </div>
            </div>
            <Link className="mini-card mini-card--challenge" href="/exercices" data-open-daily>
              <span className="challenge-flame">
                <Icon name="flame" />
              </span>
              <span>
                <span className="mini-card-label">Défi du jour</span>
                <span className="mini-card-title">+{daily?.xp ?? 0} XP</span>
              </span>
              <span className="challenge-play">
                <Icon name="play" />
              </span>
            </Link>
            <span className="floating-note floating-note--streak">
              <Icon name="flame" /> Série MEDIL
            </span>
            <span className="floating-note floating-note--verified">
              <Icon name="checkCircle" /> Corrigés vérifiés
            </span>
            <span className="hero-sticker">
              100%
              <br />
              <small>LaTeX</small>
            </span>
          </div>
        </div>
        <div className="container hero-stats">
          <div className="hero-stat">
            <strong>{totalResources}</strong>
            <span>ressources publiées</span>
          </div>
          <div className="hero-stat">
            <strong>{papers.length}</strong>
            <span>sujets de concours</span>
          </div>
          <div className="hero-stat">
            <strong>{stats.schools || "—"}</strong>
            <span>concours couverts</span>
          </div>
          <div className="hero-stat">
            <strong>7 j/7</strong>
            <span>forum actif</span>
          </div>
          <span className="hero-stats-note">Fait par des taupins, pour des taupins.</span>
        </div>
      </section>

      <div className="school-marquee" aria-label="Concours couverts">
        <div className="marquee-track">
          {["X/ENS", "MINES-PONTS", "CENTRALE", "CCINP", "E3A", "X/ENS", "MINES-PONTS", "CENTRALE", "CCINP", "E3A"].map((name, index) => (
            <span key={`${name}-${index}`}>
              <span className={`marquee-item ${index % 2 ? "marquee-item--serif" : ""}`}>{name}</span>
              <span className="marquee-star">✦</span>
            </span>
          ))}
        </div>
      </div>

      <section className="section subjects-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                Ton point de départ
              </p>
              <h2>
                Choisis ton terrain
                <br />
                <span className="serif-italic">de jeu.</span>
              </h2>
            </div>
            <p className="section-intro">
              Des parcours pensés pour les programmes MPSI et MP, avec des prérequis clairs, des démonstrations complètes et de quoi s’entraîner sérieusement.
            </p>
          </div>
          <div className="subject-grid">
            {(["Maths", "Physique", "Informatique"] as const).map((subject, index) => {
              const resourceCount =
                subjectCounts[subject].courses +
                subjectCounts[subject].exercises +
                subjectCounts[subject].papers;
              const labels: Record<string, string> = {
                Maths: "Mathématiques",
                Physique: "Physique",
                Informatique: "Informatique",
              };
              const subtitles: Record<string, string> = {
                Maths: "Algèbre · Analyse · Probabilités",
                Physique: "Mécanique · Champs · Quantique",
                Informatique: "Algorithmes · Python · Preuves",
              };
              const classes: Record<string, string> = {
                Maths: "maths",
                Physique: "physics",
                Informatique: "info",
              };
              return (
                <Link
                  key={subject}
                  className={`subject-card subject-card--${classes[subject]} reveal`}
                  href={`/cours?subject=${encodeURIComponent(subject)}`}
                >
                  <div className="subject-card-top">
                    <span className="subject-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="subject-chip">{resourceCount} ressources</span>
                    <span className="subject-arrow">
                      <Icon name="arrowUpRight" />
                    </span>
                  </div>
                  {subject === "Maths" ? (
                    <div className="subject-art subject-art--maths" aria-hidden="true">
                      <span className="math-symbol math-symbol--one">∑</span>
                      <span className="math-symbol math-symbol--two">∫</span>
                      <span className="math-symbol math-symbol--three">∈</span>
                      <span className="subject-orbit" />
                      <span className="subject-orbit subject-orbit--small" />
                    </div>
                  ) : subject === "Physique" ? (
                    <div className="subject-art subject-art--physics" aria-hidden="true">
                      <span className="physics-core" />
                      <span className="physics-ring physics-ring--one" />
                      <span className="physics-ring physics-ring--two" />
                      <span className="physics-ring physics-ring--three" />
                      <span className="physics-spark">✦</span>
                    </div>
                  ) : (
                    <div className="subject-art subject-art--info" aria-hidden="true">
                      <div className="code-window">
                        <span className="code-dot" />
                        <span className="code-dot" />
                        <span className="code-dot" />
                        <div className="code-line code-line--one" />
                        <div className="code-line code-line--two" />
                        <div className="code-line code-line--three" />
                        <div className="code-cursor" />
                      </div>
                      <span className="code-bracket">{"{ }"}</span>
                    </div>
                  )}
                  <div className="subject-card-bottom">
                    <h3>{labels[subject]}</h3>
                    <p>{subtitles[subject]}</p>
                    <span className="subject-footer">
                      MPSI + MP <Icon name="arrowRight" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section courses-section">
        <div className="container">
          <div className="section-heading section-heading--with-link">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                La bibliothèque
              </p>
              <h2>
                Des cours qui vont
                <br />
                <span className="serif-italic">au fond.</span>
              </h2>
            </div>
            <div className="section-heading-side">
              <p className="section-intro">
                Rédigés en LaTeX, relus par des élèves de l’X et de l’ENS. Pas de résumé flou : des définitions nettes, des preuves complètes et des pièges signalés.
              </p>
              <Link className="text-link" href="/cours">
                Voir les {courses.length} cours <Icon name="arrowUpRight" />
              </Link>
            </div>
          </div>
          <div className="course-grid course-grid--home">
            {featured.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="bento-resources">
            <Link className="bento bento--latex reveal" href="/cours/reduction-endomorphismes">
              <div className="bento-copy">
                <span className="bento-tag">
                  <Icon name="file" /> Polycopiés soignés
                </span>
                <h3>Le LaTeX qui donne envie de réviser.</h3>
                <p>Des fiches structurées, des formules lisibles et des démonstrations qui tiennent debout le jour J.</p>
                <span className="text-link text-link--dark">
                  Ouvrir un cours <Icon name="arrowUpRight" />
                </span>
              </div>
              <div className="latex-page" aria-hidden="true">
                <div className="latex-page-top">
                  <span>MEDIL — MP</span>
                  <span>Chapitre 14</span>
                </div>
                <div className="latex-page-title">
                  Réduction
                  <br />
                  des endomorphismes
                </div>
                <div className="latex-rule" />
                <div className="latex-lines">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <Tex expression="\\chi_u(u)=0" display />
                <div className="latex-page-stamp">PDF</div>
              </div>
            </Link>
            <Link className="bento bento--exos reveal" href="/exercices">
              <div className="bento-copy">
                <span className="bento-tag">
                  <Icon name="target" /> Pour progresser
                </span>
                <h3>
                  Les exercices
                  <br />
                  qui font mal.
                </h3>
                <p>Classés par difficulté, tous corrigés pas à pas.</p>
                <span className="round-link">
                  <Icon name="arrowUpRight" />
                </span>
              </div>
              <div className="exo-sticker">
                <span>NIVEAU</span>
                <strong>★★★★</strong>
                <span>Corrigé inclus</span>
              </div>
            </Link>
            <div className="bento bento--community reveal">
              <div className="bento-copy">
                <span className="bento-tag">
                  <Icon name="users" /> La communauté
                </span>
                <h3>
                  Personne
                  <br />
                  ne bloque seul.
                </h3>
                <p>Pose ta question, débloque une démonstration, aide quelqu’un d’autre à comprendre.</p>
                <Link className="text-link" href="/forum">
                  Entrer dans le forum <Icon name="arrowUpRight" />
                </Link>
              </div>
              <div className="community-orbs" aria-hidden="true">
                <span className="avatar avatar--xl avatar--lime">LB</span>
                <span className="avatar avatar--xl avatar--lilac">AK</span>
                <span className="avatar avatar--xl avatar--peach">SM</span>
                <span className="online-pill">
                  <span /> 128 en ligne
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {daily ? (
        <section className="section challenge-section">
          <div className="container">
            <div className="daily-challenge reveal">
              <div className="challenge-bg" aria-hidden="true" />
              <div className="challenge-main">
                <p className="eyebrow eyebrow--light">
                  <span className="eyebrow-dot" />
                  Défi du jour
                </p>
                <div className="challenge-tags">
                  <span>Maths</span>
                  <span>MP</span>
                  <span>Algèbre</span>
                  <span className="challenge-xp">+{daily.xp} XP</span>
                </div>
                <h2>{daily.title}</h2>
                <p className="challenge-statement">{daily.statement}</p>
                <div className="challenge-equation">
                  <Tex expression={daily.equation} display />
                </div>
                <div className="challenge-actions">
                  <Link className="btn btn--lime" href={daily.exerciseId ? `/exercices/${daily.exerciseId}` : "/exercices"}>
                    Valider le défi <Icon name="checkCircle" />
                  </Link>
                  <Link className="btn btn--ghost-dark" href={daily.exerciseId ? `/exercices/${daily.exerciseId}` : "/exercices"}>
                    Voir la correction <Icon name="arrowRight" />
                  </Link>
                </div>
                <div className="challenge-community">
                  <AvatarStack />
                  <span>
                    <strong>{daily.participants}</strong> ont tenté le défi aujourd’hui
                  </span>
                </div>
              </div>
              <div className="challenge-side">
                <div className="solution-kicker">
                  <Icon name="lock" /> <span className="solution-label">La correction se mérite</span>
                </div>
                <div className="solution-placeholder" data-solution-placeholder>
                  <span className="solution-number">01 / 03</span>
                  <h3>Une piste avant la réponse</h3>
                  <p>Essaie d’abord de faire apparaître un reste cubique. La nilpotence va faire le reste.</p>
                  <Link className="solution-btn" href={daily.exerciseId ? `/exercices/${daily.exerciseId}` : "/exercices"}>
                    <Icon name="lightbulb" /> Révéler les 3 étapes
                  </Link>
                </div>
                <div className="solution-steps" data-solution-steps hidden>
                  {daily.steps.map((step, index) => (
                    <div className="solution-step" key={index}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <p>{step}</p>
                      </div>
                    </div>
                  ))}
                  <div className="solution-success">
                    <Icon name="checkCircle" /> Corrigé vérifié par l’équipe MEDIL
                  </div>
                </div>
              </div>
              <span className="challenge-sticker">
                Jour
                <br />
                <strong>07</strong>
              </span>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section concours-preview-section">
        <div className="container">
          <div className="concours-feature reveal">
            <div className="concours-feature-copy">
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                Banque de concours
              </p>
              <h2>
                De CCINP à l’X.
                <br />
                <span className="serif-italic">Sans perdre le fil.</span>
              </h2>
              <p>
                Retrouve les sujets et corrigés des concours qui comptent, filtres par école, filière et année. Une bibliothèque claire pour réviser intelligemment, pas juste accumuler des PDF.
              </p>
              <div className="concours-feature-actions">
                <Link className="btn btn--dark btn--lg" href="/concours">
                  Ouvrir la banque <Icon name="arrowUpRight" />
                </Link>
                <span className="concours-count">
                  <strong>{papers.length}</strong> sujets disponibles
                </span>
              </div>
            </div>
            <div className="paper-pile" aria-hidden="true">
              <div className="paper-preview paper-preview--back">
                <span className="paper-preview-school">CCINP</span>
                <span className="paper-preview-title">Mathématiques 1</span>
                <span className="paper-preview-year">2025</span>
                <div className="paper-lines">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="paper-preview-footer">MP · 4 h</span>
              </div>
              <div className="paper-preview paper-preview--mid">
                <span className="paper-preview-school">Mines-Ponts</span>
                <span className="paper-preview-title">Mathématiques 2</span>
                <span className="paper-preview-year">2024</span>
                <div className="paper-lines">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="paper-preview-footer">MP · 4 h</span>
              </div>
              <div className="paper-preview paper-preview--front">
                <div className="paper-preview-top">
                  <span className="paper-preview-logo">X</span>
                  <span>
                    Concours
                    <br />
                    <strong>X/ENS</strong>
                  </span>
                </div>
                <span className="paper-preview-title">
                  Épreuve de
                  <br />
                  mathématiques B
                </span>
                <div className="paper-preview-meta">
                  <span>Session 2025</span>
                  <span>Filière MP</span>
                </div>
                <div className="paper-lines">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <span className="paper-preview-footer">
                  <span>4 heures</span>
                  <span>
                    <Icon name="arrowUpRight" />
                  </span>
                </span>
              </div>
              <div className="paper-pile-sticker">
                Nouveau
                <br />
                <strong>2026</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section forum-preview-section">
        <div className="container">
          <div className="forum-preview-panel reveal">
            <div className="forum-preview-head">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow-dot" />
                  Le forum
                </p>
                <h2>
                  La communauté
                  <br />
                  <span className="serif-italic">avant la compétition.</span>
                </h2>
              </div>
              <div className="forum-preview-side">
                <p>Une question à 23 h ? Un blocage sur une démonstration ? Ici, on débloque ensemble, sans jugement et sans toxicité.</p>
                <Link className="btn btn--dark" href="/forum">
                  Explorer le forum <Icon name="arrowUpRight" />
                </Link>
              </div>
            </div>
            <div className="forum-preview-grid">
              <div className="forum-thread-list">
                {threads.map((thread) => (
                  <ThreadRow key={thread.id} thread={thread} />
                ))}
              </div>
              <aside className="community-card">
                <div className="online-avatars">
                  <AvatarStack extra="avatar-stack--dark" />
                  <span className="online-status">
                    <span /> 128 connectés
                  </span>
                </div>
                <h3>Un collectif qui bosse.</h3>
                <p>Des élèves de Ginette, LLG, Hoche, Stan, Chaptal et ailleurs. Des explications, des schémas, des sources.</p>
                <div className="community-stats">
                  <div>
                    <strong>4,8k</strong>
                    <span>membres</span>
                  </div>
                  <div>
                    <strong>97%</strong>
                    <span>de questions résolues</span>
                  </div>
                </div>
                <Link className="community-link" href="/forum">
                  Rejoindre la conversation <Icon name="arrowRight" />
                </Link>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta reveal">
            <div className="final-cta-star" aria-hidden="true">
              ✦
            </div>
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow-dot" />
              Prêt·e à passer un cap ?
            </p>
            <h2>
              La prépa est dure.
              <br />
              <span className="serif-italic">Ta façon de réviser</span>
              <br />
              peut être meilleure.
            </h2>
            <div className="final-cta-actions">
              <Link className="btn btn--lime btn--lg" href="/cours">
                Commencer gratuitement <Icon name="arrowUpRight" />
              </Link>
              <Link className="btn btn--ghost btn--lg" href="/inscription">
                Créer mon compte
              </Link>
            </div>
            <p className="final-cta-note">Cours, exos, concours et forum. Sans carte bancaire, sans engagement.</p>
          </div>
        </div>
      </section>
    </>
  );
}
