import Link from "next/link";
import { Icon } from "@/components/icons";
import { Tex } from "@/components/tex";
import { getPaper } from "@/lib/content/public";
import { notFound } from "next/navigation";

export default async function PaperDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const paper = await getPaper(id);
  if (!paper) notFound();

  const subjectContent =
    paper.subject === "Physique"
      ? "Optique géométrique, électromagnétisme et mécanique. Faire le schéma avant les formules."
      : paper.subject === "Informatique"
        ? "Algorithmique, structures de données et preuves de correction."
        : "Algèbre linéaire, suites et séries. Identifier la structure avant de calculer.";

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="page-hero-inner reveal">
            <Link className="back-link" href="/concours" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16, display: "inline-flex" }}>
              <Icon name="arrowLeft" /> Banque de concours
            </Link>
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow-dot" />
              {paper.school} · Session {paper.year}
            </p>
            <h1>{paper.title}</h1>
            <p className="page-hero-description">
              {paper.track ?? "MP"} · {paper.subject} · {paper.duration ?? "—"} · {paper.parts ?? "—"}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="paper-sheet" style={{ background: "var(--white)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow-card)" }}>
            <div className="sheet-head">
              <span className="sheet-school">{paper.school}</span>
              <span className="sheet-session">Session {paper.year}</span>
            </div>
            <div className="sheet-title-block">
              <span>
                Concours {paper.school} · Filière {paper.track ?? "MP"}
              </span>
              <h2>{paper.title}</h2>
              <div className="sheet-meta">
                <span>Durée : {paper.duration ?? "—"}</span>
                <span>{paper.subject}</span>
                <span>{paper.parts ?? "—"}</span>
              </div>
            </div>
            <div className="sheet-instructions">
              L’usage de la calculatrice est interdit. La qualité de la rédaction, la clarté et la précision des raisonnements entreront pour une part importante dans l’appréciation des copies.
            </div>
            <p style={{ marginTop: 24, color: "var(--ink-muted)" }}>{subjectContent}</p>
            <div className="paper-formula" style={{ marginTop: 24 }}>
              <Tex expression={paper.subject === "Physique" ? "G=-\\frac{f'_1}{f'_2}" : paper.subject === "Informatique" ? "T(n)=O(\\log n)" : "\\ker P(u)=\\bigoplus \\ker P_i(u)"} display />
            </div>
            <div className="sheet-footer" style={{ marginTop: 32 }}>
              <span>MEDIL · Banque de concours</span>
              <span>Page 1 / 4</span>
            </div>
          </div>
          {paper.correction ? (
            <div className="paper-sheet paper-sheet--solution" style={{ background: "var(--white)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow-card)", marginTop: 24 }}>
              <div className="sheet-head">
                <span className="sheet-school">Corrigé MEDIL</span>
                <span className="sheet-session">
                  {paper.school} · {paper.year}
                </span>
              </div>
              <h2>{paper.title}</h2>
              <div className="correction-intro">
                <span className="sheet-verified">
                  <Icon name="checkCircle" />
                </span>
                <div>
                  <strong>Une correction pensée pour progresser.</strong>
                  <p>On détaille les étapes-clés, les hypothèses et les pièges. À lire après avoir cherché, pas avant.</p>
                </div>
              </div>
              <div className="correction-steps" style={{ marginTop: 24 }}>
                <div>
                  <span>01</span>
                  <p>Poser les notations et reformuler la question.</p>
                </div>
                <div>
                  <span>02</span>
                  <p>Vérifier les hypothèses avant d’invoquer un théorème.</p>
                </div>
                <div>
                  <span>03</span>
                  <p>Écrire la conclusion au propre, en une phrase.</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
