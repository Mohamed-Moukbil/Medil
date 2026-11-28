import Link from "next/link";
import { Icon } from "@/components/icons";
import { getPaper } from "@/lib/content/public";
import { notFound } from "next/navigation";

export default async function PaperDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const paper = await getPaper(id);
  if (!paper) notFound();

  const pdfUrl = paper.pdfUrl;

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
          {pdfUrl ? (
            <div className="paper-pdf-card">
              <div className="paper-pdf-head">
                <div>
                  <p className="eyebrow">
                    <span className="eyebrow-dot" /> Sujet officiel
                  </p>
                  <h2>{paper.title}</h2>
                  <p>
                    {paper.school} · Session {paper.year} · {paper.subject} · {paper.duration ?? "—"} · {paper.parts ?? "—"}
                  </p>
                </div>
                <div className="paper-pdf-actions">
                  <a className="btn btn--dark" href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Icon name="file" /> Ouvrir le PDF
                  </a>
                  <a className="btn btn--outline" href={pdfUrl} download>
                    <Icon name="download" /> Télécharger
                  </a>
                </div>
              </div>
              <iframe className="paper-pdf-frame" src={pdfUrl} title={`PDF du sujet ${paper.title}`} loading="lazy" />
              <p className="paper-pdf-help">
                Le PDF ne s’affiche pas ?{" "}
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  Ouvre-le dans un nouvel onglet
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="paper-pdf-empty">
              <span className="empty-icon">
                <Icon name="file" />
              </span>
              <h3>Le PDF de ce sujet n’est pas encore disponible.</h3>
              <p>Le sujet sera ajouté très bientôt. En attendant, explore les autres annales de la banque de concours.</p>
              <Link className="btn btn--dark" href="/concours">
                Retour à la banque
              </Link>
            </div>
          )}

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
