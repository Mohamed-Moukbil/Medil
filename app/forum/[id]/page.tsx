import { after } from "next/server";
import { Icon } from "@/components/icons";
import { getThread, getReplies, incrementThreadViews } from "@/lib/content/public";
import { createClient } from "@/lib/supabase/server";
import { LikeButton } from "@/components/forum/like-button";
import { renderPlainText } from "@/lib/content/rich-text";
import { timeAgo, formatCount, initials } from "@/lib/format";
import { ReplyForm } from "@/components/forum/reply-form";
import { notFound } from "next/navigation";

export default async function ThreadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const thread = await getThread(id);
  if (!thread) notFound();

  const replies = await getReplies(id);

  let supabase = null;
  try {
    supabase = await createClient();
  } catch {
    supabase = null;
  }
  let likedThread = false;
  const likedReplies = new Set<string>();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const targetIds = [id, ...replies.map((reply) => reply.id)];
      const { data: likes } = await supabase
        .from("user_likes")
        .select("target_type, target_id")
        .eq("user_id", user.id)
        .in("target_type", ["thread", "reply"])
        .in("target_id", targetIds);
      for (const like of likes ?? []) {
        if (like.target_type === "thread" && like.target_id === id) likedThread = true;
        if (like.target_type === "reply") likedReplies.add(like.target_id);
      }
    }
  }

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
                <LikeButton targetType="thread" targetId={thread.id} initialCount={thread.upvotes} initialLiked={likedThread} />
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
                      <LikeButton targetType="reply" targetId={reply.id} initialCount={reply.upvotes} initialLiked={likedReplies.has(reply.id)} />
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
