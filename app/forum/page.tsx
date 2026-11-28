import Link from "next/link";
import { getThreads } from "@/lib/content/public";
import { Icon } from "@/components/icons";
import { ThreadRow } from "@/components/content/thread-row";
import { AvatarStack } from "@/components/content/avatar-stack";
import type { ForumCategory } from "@/lib/content/types";

const CATEGORIES: ForumCategory[] = ["Maths", "Physique", "Informatique", "Concours", "Méthode"];

function buildHref(params: { category?: string; q?: string }) {
  const search = new URLSearchParams();
  if (params.category) search.set("category", params.category);
  if (params.q) search.set("q", params.q);
  const query = search.toString();
  return query ? `/forum?${query}` : "/forum";
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default async function ForumPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const category = CATEGORIES.includes(params.category as ForumCategory)
    ? (params.category as ForumCategory)
    : undefined;
  const rawQuery = params.q?.trim() ?? "";
  const query = normalize(rawQuery);

  const allThreads = await getThreads();
  const categoryThreads = category ? allThreads.filter((thread) => thread.category === category) : allThreads;
  const threads = query
    ? categoryThreads.filter((thread) =>
        normalize(
          [thread.title, thread.excerpt ?? "", thread.body, thread.category, ...thread.tags].join(" "),
        ).includes(query),
      )
    : categoryThreads;

  return (
    <>
      <section className="page-hero page-hero--forum">
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
                <Icon name="users" /> 4 800 membres
              </span>
              <span className="hero-meta-pill">
                <Icon name="forum" /> {allThreads.length} discussions
              </span>
              <span className="hero-meta-pill">
                <span className="live-dot" /> 128 en ligne
              </span>
            </div>
            <div className="page-hero-actions">
              <Link className="btn btn--lime btn--lg" href="/forum/nouveau">
                <Icon name="plus" /> Nouveau sujet
              </Link>
              <Link className="btn btn--ghost btn--lg" href={allThreads[0] ? `/forum/${allThreads[0].id}` : "/forum"}>
                Voir une discussion
              </Link>
            </div>
            <div className="page-hero-deco page-hero-deco--forum" aria-hidden="true">
              ?
            </div>
          </div>
        </div>
      </section>

      <section className="section forum-page-section">
        <div className="container">
          <div className="forum-page-tools">
            <div className="forum-category-tabs">
              <Link className={`filter-pill ${!category ? "is-active" : ""}`} href={buildHref({ q: rawQuery })}>
                Tous
              </Link>
              {CATEGORIES.map((item) => (
                <Link
                  key={item}
                  className={`filter-pill ${category === item ? "is-active" : ""}`}
                  href={buildHref({ category: item, q: rawQuery })}
                >
                  {item}
                </Link>
              ))}
            </div>
            <form className="forum-search" action="/forum" method="get" role="search">
              {category ? <input type="hidden" name="category" value={category} /> : null}
              <Icon name="search" />
              <input
                type="search"
                name="q"
                placeholder="Chercher dans le forum…"
                defaultValue={rawQuery}
                aria-label="Rechercher une discussion"
              />
            </form>
          </div>

          <div className="forum-layout">
            <div className="forum-list-column">
              <div className="forum-list-head">
                <span>
                  <strong>{threads.length}</strong> discussions
                </span>
                <span className="sort-label">
                  <Icon name="sparkles" /> Les plus actives
                </span>
              </div>
              {threads.length === 0 ? (
                <div className="empty-state empty-state--small">
                  <span className="empty-icon">
                    <Icon name="forum" />
                  </span>
                  <h3>Aucune discussion ici.</h3>
                  <p>Sois la première personne à lancer le sujet.</p>
                  <Link className="btn btn--dark" href="/forum/nouveau">
                    Créer une discussion
                  </Link>
                </div>
              ) : (
                <div className="forum-thread-list forum-thread-list--page">
                  {threads.map((thread) => (
                    <ThreadRow key={thread.id} thread={thread} />
                  ))}
                </div>
              )}
            </div>

            <aside className="forum-sidebar">
              <div className="forum-side-card forum-side-card--dark">
                <div className="online-avatars">
                  <AvatarStack extra="avatar-stack--dark" />
                  <span className="online-status">
                    <span /> 128 connectés
                  </span>
                </div>
                <h3>La promo est là.</h3>
                <p>Une question posée maintenant a de grandes chances d’avoir une réponse avant la prochaine colles.</p>
                <div className="live-activity">
                  <span className="pulse-dot" /> Sofia a répondu à « Suites de Cauchy » <small>il y a 1 min</small>
                </div>
              </div>
              <div className="forum-side-card">
                <p className="eyebrow">
                  <span className="eyebrow-dot" />
                  Les règles d’or
                </p>
                <ul className="golden-rules">
                  <li>
                    <span>01</span>Cherche avant de demander.
                  </li>
                  <li>
                    <span>02</span>Explique ton raisonnement, pas seulement ton blocage.
                  </li>
                  <li>
                    <span>03</span>Corrige, remercie, transmets.
                  </li>
                </ul>
                <Link className="text-link text-link--dark" href="/forum">
                  Charte complète <Icon name="arrowUpRight" />
                </Link>
              </div>
              <div className="forum-side-card forum-side-card--lime">
                <span className="forum-side-icon">
                  <Icon name="sparkles" />
                </span>
                <h3>Les bonnes questions font les bons déclics.</h3>
                <p>Un titre précis, un énoncé recopié, et ce que tu as déjà tenté.</p>
                <Link className="btn btn--dark btn--full" href="/forum/nouveau">
                  Poser ma question <Icon name="plus" />
                </Link>
              </div>
              <div className="forum-side-card mini-stats-card">
                <p className="eyebrow">
                  <span className="eyebrow-dot" />
                  Aujourd’hui
                </p>
                <div className="mini-stat-row">
                  <strong>42</strong>
                  <span>nouvelles réponses</span>
                </div>
                <div className="mini-stat-row">
                  <strong>12</strong>
                  <span>sujets résolus</span>
                </div>
                <div className="mini-stat-row">
                  <strong>97%</strong>
                  <span>de questions avec réponse</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
