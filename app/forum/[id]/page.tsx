import { after } from "next/server";
import { Icon } from "@/components/icons";
import { getThread, getReplies, incrementThreadViews } from "@/lib/content/public";
import { renderPlainText } from "@/lib/content/rich-text";
import { timeAgo, formatCount, initials } from "@/lib/format";
import { ReplyForm } from "@/components/forum/reply-form";
import { notFound } from "next/navigation";

export default async function ThreadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const thread = await getThread(id);
  if (!thread) notFound();

  const replies = await getReplies(id);

  after(() => {
    void incrementThreadViews(id);
  });

  return (
    <>
      <section className="thread-hero">
        <div className="thread-hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="thread-hero-inner">
            <div className="thread-hero-top">
              <span className={`thread-category cat--${thread.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "")}`}>
                {thread.category}
              </span>
              {thread.pinned ? <span className="pin-label"><Icon name="target" /> Épinglé</span> : null}
              <span className="thread-time">{timeAgo(thread.createdAt)}</span>
            </div>
            <h1>{thread.title}</h1>
            <p className="thread-hero-excerpt">{thread.excerpt}</p>
            <div className="thread-author-row">
              <span className={`mini-avatar avatar--${thread.avatarColor ?? "lime"}`}>
                {thread.authorInitials ?? initials(thread.authorName ?? "MEDIL")}
              </span>
              <div>
                <strong>{thread.authorName ?? "Taupin MEDIL"}</strong>
                <span>{thread.authorGrade ?? "Membre MEDIL"}</span>
              </div>
              <span className="thread-author-sep" />
              <span className="thread-hero-stat">
                <Icon name="forum" /> <strong>{thread.replyCount}</strong> réponses
              </span>
              <span className="thread-hero-stat">
                <Icon name="eye" /> <strong>{formatCount(thread.views)}</strong> vues
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section thread-section">
        <div className="container thread-layout">
          <main className="thread-main">
            <article className="thread-post">
              <div className="post-head">
                <span className={`post-avatar avatar--${thread.avatarColor ?? "lime"}`}>
                  {thread.authorInitials ?? initials(thread.authorName ?? "MEDIL")}
                </span>
                <div>
                  <strong>{thread.authorName ?? "Taupin MEDIL"}</strong>
                  <span>{thread.authorGrade ?? "Membre MEDIL"} · {timeAgo(thread.createdAt)}</span>
                </div>
              </div>
              <div className="post-content" dangerouslySetInnerHTML={{ __html: renderPlainText(thread.body) }} />
              <div className="post-tags">
                {thread.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
              <div className="post-actions">
                <button className="post-action" type="button">
                  <Icon name="heart" /> <span>{thread.upvotes}</span> utile
                </button>
              </div>
            </article>

            <div className="thread-replies">
              <h2>
                Réponses <span>{replies.length}</span>
              </h2>
              {replies.length === 0 ? (
                <p style={{ color: "var(--ink-muted)", marginTop: 16 }}>Aucune réponse pour le moment. Sois le premier.</p>
              ) : (
                replies.map((reply) => (
                  <article className="thread-reply" key={reply.id}>
                    <div className="post-head">
                      <span className={`post-avatar avatar--${reply.avatarColor ?? "lime"}`}>
                        {reply.authorInitials ?? initials(reply.authorName ?? "MEDIL")}
                      </span>
                      <div>
                        <strong>{reply.authorName ?? "Taupin MEDIL"}</strong>
                        <span>{reply.authorGrade ?? "Membre MEDIL"} · {timeAgo(reply.createdAt)}</span>
                      </div>
                    </div>
                    <div className="post-content" dangerouslySetInnerHTML={{ __html: renderPlainText(reply.body) }} />
                    <div className="post-actions">
                      <button className="post-action" type="button">
                        <Icon name="heart" /> <span>{reply.upvotes}</span> utile
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>

            <div className="thread-reply-form">
              <h3>Répondre</h3>
              <ReplyForm threadId={thread.id} />
            </div>
          </main>

          <aside className="thread-sidebar">
            <div className="related-threads">
              <p className="footer-heading">Discussions liées</p>
            </div>
            <div className="mini-stat-row">
              <strong>{thread.replyCount}</strong>
              <span>réponses</span>
            </div>
            <div className="mini-stat-row">
              <strong>{formatCount(thread.views)}</strong>
              <span>vues</span>
            </div>
            <div className="mini-stat-row">
              <strong>{thread.upvotes}</strong>
              <span>utile</span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
