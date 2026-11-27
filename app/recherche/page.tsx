import Link from "next/link";
import { searchContent } from "@/lib/content/public";
import { Icon } from "@/components/icons";
import type { SearchResult } from "@/lib/content/types";

const TYPE_LABELS: Record<SearchResult["type"], string> = {
  course: "Cours",
  exercise: "Exercice",
  paper: "Concours",
  thread: "Forum",
};

const TYPE_HREF: Record<SearchResult["type"], (id: string) => string> = {
  course: (id) => `/cours/${id}`,
  exercise: (id) => `/exercices/${id}`,
  paper: (id) => `/concours/${id}`,
  thread: (id) => `/forum/${id}`,
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const results = query.length >= 2 ? await searchContent(query) : [];

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="page-hero-inner reveal">
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow-dot" />
              Recherche
            </p>
            <h1>
              Cherche un cours,
              <br />
              <span className="serif-italic">un exo, un sujet.</span>
            </h1>
            <form action="/recherche" method="get" style={{ marginTop: 24, display: "flex", gap: 12, maxWidth: 520 }}>
              <input
                className="input"
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Chercher un cours, un exo, un sujet…"
                aria-label="Rechercher"
                style={{ flex: 1 }}
              />
              <button className="btn btn--lime" type="submit">
                <Icon name="search" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {query.length < 2 ? (
            <p style={{ color: "var(--ink-muted)" }}>Tape au moins deux caractères.</p>
          ) : results.length === 0 ? (
            <p style={{ color: "var(--ink-muted)" }}>Aucun résultat pour « {query} ».</p>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  href={TYPE_HREF[result.type](result.id)}
                  className="paper-card"
                  style={{ padding: 16 }}
                >
                  <span className="paper-info">
                    <span className="paper-overline">{TYPE_LABELS[result.type]}</span>
                    <span className="paper-title">{result.title}</span>
                    <span className="paper-details">{result.meta}</span>
                  </span>
                  <span className="paper-arrow">
                    <Icon name="arrowUpRight" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
