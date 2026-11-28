"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { SearchResult } from "@/lib/content/types";
import { Icon } from "@/components/icons";
import { searchAction, getSearchMeta } from "@/lib/search/actions";

const POPULAR = ["nilpotente", "CCINP 2025", "Maxwell", "dichotomie", "réduction"];

const TYPE_HREF: Record<SearchResult["type"], (id: string) => string> = {
  course: (id) => `/cours/${id}`,
  exercise: (id) => `/exercices/${id}`,
  paper: (id) => `/concours/${id}`,
  thread: (id) => `/forum/${id}`,
};

function normalize(value: string) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function escapeHTML(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return escapeHTML(text);
  const normalizedText = normalize(text);
  const normalizedQuery = normalize(query.trim());
  const index = normalizedText.indexOf(normalizedQuery);
  if (index === -1) return escapeHTML(text);

  const map: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const normalized = normalize(text[i]);
    if (normalized.length === 0) map.push(i);
    else for (let j = 0; j < normalized.length; j++) map.push(i);
  }
  const start = map[index];
  const end = map[index + normalizedQuery.length - 1] + 1;
  return `${escapeHTML(text.slice(0, start))}<mark>${escapeHTML(text.slice(start, end))}</mark>${escapeHTML(text.slice(end))}`;
}

export function SearchModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [meta, setMeta] = useState<{ courses: number; exercises: number; papers: number; threads: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const openModal = useCallback(() => {
    setOpen(true);
    setQuery("");
    setResults([]);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const openHandler = () => openModal();
    const keyHandler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openModal();
      }
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("medil:open-search", openHandler);
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("medil:open-search", openHandler);
      window.removeEventListener("keydown", keyHandler);
    };
  }, [openModal, closeModal]);

  useEffect(() => {
    if (open) document.body.classList.add("no-scroll");
    else document.body.classList.remove("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  useEffect(() => {
    if (open && !meta) {
      getSearchMeta().then(setMeta).catch(() => setMeta(null));
    }
  }, [open, meta]);

  useEffect(() => {
    if (!open) return;
    const trimmed = query.trim();
    if (trimmed.length < 2) return;
    const timeout = setTimeout(() => {
      searchAction(trimmed)
        .then((rows) => setResults(rows))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 180);
    return () => clearTimeout(timeout);
  }, [query, open]);

  const groups = {
    course: results.filter((r) => r.type === "course"),
    exercise: results.filter((r) => r.type === "exercise"),
    paper: results.filter((r) => r.type === "paper"),
    thread: results.filter((r) => r.type === "thread"),
  };
  const total = results.length;

  if (!open) {
    return <div className="search-overlay" hidden />;
  }

  return (
    <div className="search-overlay is-open">
      <div className="search-backdrop" onClick={closeModal} />
      <div className="search-panel" role="dialog" aria-modal="true" aria-label="Recherche globale">
        <div className="search-input-row">
          <span className="search-input-icon">
            <Icon name="search" />
          </span>
          <input
            id="search-input"
            type="search"
            placeholder="Chercher un cours, un exo, un sujet…"
            autoComplete="off"
            aria-label="Rechercher"
            value={query}
            onChange={(event) => {
              const value = event.target.value;
              setQuery(value);
              if (value.trim().length < 2) {
                setResults([]);
                setLoading(false);
              } else {
                setLoading(true);
              }
            }}
            autoFocus
          />
          <kbd>ESC</kbd>
          <button className="search-close" onClick={closeModal} aria-label="Fermer la recherche">
            <Icon name="close" />
          </button>
        </div>

        <div className="search-content" id="search-content">
          {query.trim().length < 2 ? (
            <div className="search-suggestions">
              <p className="search-section-label">Recherches populaires</p>
              <div className="search-chips">
                {POPULAR.map((term) => (
                  <button key={term} type="button" onClick={() => setQuery(term)}>
                    <Icon name="search" /> {term}
                  </button>
                ))}
              </div>
              <p className="search-section-label">Aller directement</p>
              <div className="search-shortcuts">
                <Link href="/cours" onClick={closeModal}>
                  <Icon name="book" />
                  <span>
                    <strong>Les cours</strong>
                    <small>{meta?.courses ?? "…"} cours complets</small>
                  </span>
                  <Icon name="arrowRight" />
                </Link>
                <Link href="/exercices" onClick={closeModal}>
                  <Icon name="target" />
                  <span>
                    <strong>Les exercices</strong>
                    <small>Corrigés pas à pas</small>
                  </span>
                  <Icon name="arrowRight" />
                </Link>
                <Link href="/concours" onClick={closeModal}>
                  <Icon name="file" />
                  <span>
                    <strong>La banque de concours</strong>
                    <small>{meta?.papers ?? "…"} sujets</small>
                  </span>
                  <Icon name="arrowRight" />
                </Link>
                <Link href="/forum" onClick={closeModal}>
                  <Icon name="forum" />
                  <span>
                    <strong>Le forum</strong>
                    <small>{meta?.threads ?? "…"} discussions</small>
                  </span>
                  <Icon name="arrowRight" />
                </Link>
              </div>
            </div>
          ) : loading ? (
            <div className="search-empty">
              <span>
                <Icon name="search" />
              </span>
              <h3>Recherche…</h3>
            </div>
          ) : total === 0 ? (
            <div className="search-empty">
              <span>
                <Icon name="search" />
              </span>
              <h3>Aucun résultat pour « {query.trim()} ».</h3>
              <p>Essaie un mot-clé plus court, ou navigue directement dans la bibliothèque.</p>
              <Link className="btn btn--outline" href="/cours" onClick={closeModal}>
                Voir tous les cours <Icon name="arrowRight" />
              </Link>
            </div>
          ) : (
            <>
              {groups.course.length > 0 && (
                <div className="search-group">
                  <p className="search-section-label">
                    Cours <span>{groups.course.length}</span>
                  </p>
                  {groups.course.map((result) => (
                    <button
                      key={`course-${result.id}`}
                      className="search-result"
                      type="button"
                      onClick={() => {
                        closeModal();
                        router.push(TYPE_HREF.course(result.id));
                      }}
                    >
                      <span className="search-result-icon search-result-icon--course">
                        <Icon name="book" />
                      </span>
                      <span className="search-result-copy">
                        <strong dangerouslySetInnerHTML={{ __html: highlightMatch(result.title, query) }} />
                        <span>{result.meta}</span>
                      </span>
                      <span className="search-result-arrow">
                        <Icon name="arrowUpRight" />
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {groups.exercise.length > 0 && (
                <div className="search-group">
                  <p className="search-section-label">
                    Exercices <span>{groups.exercise.length}</span>
                  </p>
                  {groups.exercise.map((result) => (
                    <button
                      key={`exercise-${result.id}`}
                      className="search-result"
                      type="button"
                      onClick={() => {
                        closeModal();
                        router.push(TYPE_HREF.exercise(result.id));
                      }}
                    >
                      <span className="search-result-icon search-result-icon--exercise">
                        <Icon name="target" />
                      </span>
                      <span className="search-result-copy">
                        <strong dangerouslySetInnerHTML={{ __html: highlightMatch(result.title, query) }} />
                        <span>{result.meta}</span>
                      </span>
                      <span className="search-result-arrow">
                        <Icon name="arrowUpRight" />
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {groups.paper.length > 0 && (
                <div className="search-group">
                  <p className="search-section-label">
                    Concours <span>{groups.paper.length}</span>
                  </p>
                  {groups.paper.map((result) => (
                    <button
                      key={`paper-${result.id}`}
                      className="search-result"
                      type="button"
                      onClick={() => {
                        closeModal();
                        router.push(TYPE_HREF.paper(result.id));
                      }}
                    >
                      <span className="search-result-icon search-result-icon--paper">
                        <Icon name="file" />
                      </span>
                      <span className="search-result-copy">
                        <strong dangerouslySetInnerHTML={{ __html: highlightMatch(result.title, query) }} />
                        <span>{result.meta}</span>
                      </span>
                      <span className="search-result-arrow">
                        <Icon name="arrowUpRight" />
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {groups.thread.length > 0 && (
                <div className="search-group">
                  <p className="search-section-label">
                    Forum <span>{groups.thread.length}</span>
                  </p>
                  {groups.thread.map((result) => (
                    <button
                      key={`thread-${result.id}`}
                      className="search-result"
                      type="button"
                      onClick={() => {
                        closeModal();
                        router.push(TYPE_HREF.thread(result.id));
                      }}
                    >
                      <span className="search-result-icon search-result-icon--thread">
                        <Icon name="forum" />
                      </span>
                      <span className="search-result-copy">
                        <strong dangerouslySetInnerHTML={{ __html: highlightMatch(result.title, query) }} />
                        <span>{result.meta}</span>
                      </span>
                      <span className="search-result-arrow">
                        <Icon name="arrowUpRight" />
                      </span>
                    </button>
                  ))}
                </div>
              )}
              <p className="search-total">
                {total} résultat{total > 1 ? "s" : ""} pour « {query.trim()} »
              </p>
            </>
          )}
        </div>

        <div className="search-footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> naviguer
          </span>
          <span>
            <kbd>↵</kbd> ouvrir
          </span>
          <span className="search-footer-brand">
            <span className="study-brand-mark">M</span> MEDIL Search
          </span>
        </div>
      </div>
    </div>
  );
}
