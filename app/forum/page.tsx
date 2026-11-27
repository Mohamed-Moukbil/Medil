import Link from "next/link";
import { getThreads } from "@/lib/content/public";
import { Icon } from "@/components/icons";
import { ThreadRow } from "@/components/content/thread-row";
import type { ForumCategory } from "@/lib/content/types";

const CATEGORIES: ForumCategory[] = ["Maths", "Physique", "Informatique", "Concours", "Méthode"];

export default async function ForumPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = CATEGORIES.includes(params.category as ForumCategory)
    ? (params.category as ForumCategory)
    : undefined;

  const threads = await getThreads({ category });

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="page-hero-inner reveal">
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow-dot" />
              Le forum
            </p>
            <h1>
              La communauté
              <br />
              <span className="serif-italic">avant la compétition.</span>
            </h1>
            <p className="page-hero-description">
              Une question à 23 h ? Un blocage sur une démonstration ? Ici, on débloque ensemble, sans jugement et sans toxicité.
            </p>
            <div className="page-hero-meta">
              <span className="hero-meta-pill">
                <Icon name="forum" /> {threads.length} discussions
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
            <Link className={`btn btn--sm ${!category ? "btn--dark" : "btn--outline"}`} href="/forum">
              Toutes
            </Link>
            {CATEGORIES.map((item) => (
              <Link
                key={item}
                className={`btn btn--sm ${category === item ? "btn--dark" : "btn--outline"}`}
                href={`/forum?category=${encodeURIComponent(item)}`}
              >
                {item}
              </Link>
            ))}
            <Link className="btn btn--lime btn--sm" href="/forum/nouveau" style={{ marginLeft: "auto" }}>
              <Icon name="plus" /> Nouveau sujet
            </Link>
          </div>

          <div className="forum-thread-list forum-thread-list--page">
            {threads.length === 0 ? (
              <p style={{ color: "var(--ink-muted)" }}>Aucune discussion pour ce filtre.</p>
            ) : (
              threads.map((thread) => <ThreadRow key={thread.id} thread={thread} />)
            )}
          </div>
        </div>
      </section>
    </>
  );
}
