import Link from "next/link";
import { getPapers } from "@/lib/content/public";
import { Icon } from "@/components/icons";
import { PaperCard } from "@/components/content/paper-card";

const SCHOOLS = ["X/ENS", "Mines-Ponts", "Centrale", "CCINP", "e3a"];
const SUBJECTS = ["Maths", "Physique", "Informatique"] as const;

export default async function PapersPage({
  searchParams,
}: {
  searchParams: Promise<{ school?: string; subject?: string; year?: string }>;
}) {
  const params = await searchParams;
  const school = SCHOOLS.includes(params.school ?? "") ? params.school : undefined;
  const subject = SUBJECTS.includes(params.subject as (typeof SUBJECTS)[number])
    ? (params.subject as (typeof SUBJECTS)[number])
    : undefined;
  const year = params.year ? Number(params.year) : undefined;

  const papers = await getPapers({ school, subject, year });

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="page-hero-inner reveal">
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow-dot" />
              Banque de concours
            </p>
            <h1>
              De CCINP à l’X.
              <br />
              <span className="serif-italic">Sans perdre le fil.</span>
            </h1>
            <p className="page-hero-description">
              Retrouve les sujets et corrigés des concours qui comptent, filtres par école, filière et année.
            </p>
            <div className="page-hero-meta">
              <span className="hero-meta-pill">
                <Icon name="trophy" /> {papers.length} sujets
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
            {SCHOOLS.map((item) => (
              <Link
                key={item}
                className={`btn btn--sm ${school === item ? "btn--dark" : "btn--outline"}`}
                href={`/concours?school=${encodeURIComponent(item)}${subject ? `&subject=${subject}` : ""}`}
              >
                {item}
              </Link>
            ))}
            <span style={{ width: "100%" }} />
            {SUBJECTS.map((item) => (
              <Link
                key={item}
                className={`btn btn--sm ${subject === item ? "btn--lime" : "btn--outline"}`}
                href={`/concours?${school ? `school=${encodeURIComponent(school)}&` : ""}subject=${item}`}
              >
                {item}
              </Link>
            ))}
          </div>

          {papers.length === 0 ? (
            <p style={{ color: "var(--ink-muted)" }}>Aucun sujet pour ces filtres.</p>
          ) : (
            <div className="paper-grid" style={{ display: "grid", gap: 12 }}>
              {papers.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
