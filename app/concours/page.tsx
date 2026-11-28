import Link from "next/link";
import { getPapers } from "@/lib/content/public";
import { Icon } from "@/components/icons";
import { PaperCard } from "@/components/content/paper-card";

const SCHOOLS = ["X/ENS", "Mines-Ponts", "Centrale", "CCINP", "e3a"];
const SUBJECTS = ["Maths", "Physique", "Informatique"] as const;

function buildHref(params: { school?: string; subject?: string; year?: number; q?: string }) {
  const search = new URLSearchParams();
  if (params.school) search.set("school", params.school);
  if (params.subject) search.set("subject", params.subject);
  if (params.year) search.set("year", String(params.year));
  if (params.q) search.set("q", params.q);
  const query = search.toString();
  return query ? `/concours?${query}` : "/concours";
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default async function PapersPage({
  searchParams,
}: {
  searchParams: Promise<{ school?: string; subject?: string; year?: string; q?: string }>;
}) {
  const params = await searchParams;
  const school = SCHOOLS.includes(params.school ?? "") ? params.school : undefined;
  const subject = SUBJECTS.includes(params.subject as (typeof SUBJECTS)[number])
    ? (params.subject as (typeof SUBJECTS)[number])
    : undefined;
  const parsedYear = params.year ? Number(params.year) : undefined;
  const year = parsedYear && !Number.isNaN(parsedYear) ? parsedYear : undefined;
  const rawQuery = params.q?.trim() ?? "";
  const query = normalize(rawQuery);

  const papers = await getPapers({ school, subject, year });
  const filteredPapers = query
    ? papers.filter((paper) =>
        normalize(
          [paper.title, paper.school, paper.short ?? "", paper.subject, paper.track ?? "", String(paper.year)].join(" "),
        ).includes(query),
      )
    : papers;

  const years = papers.map((paper) => paper.year).filter(Boolean);
  const yearRange = years.length ? `${Math.min(...years)} — ${Math.max(...years)}` : "toutes sessions";
  const correctionCount = papers.filter((paper) => paper.correction).length;

  return (
    <>
      <section className="page-hero page-hero--concours">
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
                <Icon name="file" /> {papers.length} sujets
              </span>
              <span className="hero-meta-pill">
                <Icon name="checkCircle" /> {correctionCount} corrigés
              </span>
              <span className="hero-meta-pill">
                <Icon name="calendar" /> Sessions {yearRange}
              </span>
            </div>
            <form className="page-hero-search" action="/concours" method="get" role="search">
              {school ? <input type="hidden" name="school" value={school} /> : null}
              {subject ? <input type="hidden" name="subject" value={subject} /> : null}
              {year ? <input type="hidden" name="year" value={year} /> : null}
              <span>
                <Icon name="search" />
              </span>
              <input
                type="search"
                name="q"
                placeholder="Chercher un concours, une épreuve, une année…"
                defaultValue={rawQuery}
                aria-label="Rechercher dans la banque de concours"
              />
            </form>
            <div className="page-hero-deco page-hero-deco--exam" aria-hidden="true">
              <span>X</span>
              <span>CC</span>
              <span>MP</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section papers-section">
        <div className="container">
          <div className="paper-toolbar-wrap sticky-toolbar">
            <div className="paper-toolbar">
              <div className="filter-groups paper-schools">
                <Link className={`filter-pill ${!school ? "is-active" : ""}`} href={buildHref({ subject, year, q: rawQuery })}>
                  Tous
                </Link>
                {SCHOOLS.map((item) => (
                  <Link
                    key={item}
                    className={`filter-pill ${school === item ? "is-active" : ""}`}
                    href={buildHref({ school: item, subject, year, q: rawQuery })}
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <div className="paper-secondary-filters">
                <div className="filter-group">
                  <Link
                    className={`filter-pill filter-pill--sm ${!subject ? "is-active" : ""}`}
                    href={buildHref({ school, year, q: rawQuery })}
                  >
                    Tous
                  </Link>
                  {SUBJECTS.map((item) => (
                    <Link
                      key={item}
                      className={`filter-pill filter-pill--sm ${subject === item ? "is-active" : ""}`}
                      href={buildHref({ school, subject: item, year, q: rawQuery })}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
                <span className="library-count">
                  <strong>{filteredPapers.length}</strong> sujets
                </span>
              </div>
            </div>
          </div>

          {filteredPapers.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">
                <Icon name="search" />
              </span>
              <h3>Rien dans cette étagère.</h3>
              <p>Essaie une autre école, une autre année, ou efface ta recherche.</p>
              <Link className="btn btn--dark" href="/concours">
                Réinitialiser les filtres
              </Link>
            </div>
          ) : (
            <div className="paper-grid">
              {filteredPapers.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          )}

          <div className="papers-aside reveal">
            <div className="papers-aside-art">
              <Icon name="file" />
            </div>
            <div>
              <h3>Une correction à signaler ?</h3>
              <p>Nos corrigés sont relus, mais une coquille reste toujours possible. Signale-la sur le forum : on corrige vite.</p>
            </div>
            <Link className="btn btn--outline" href="/forum">
              Signaler une coquille <Icon name="arrowUpRight" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
