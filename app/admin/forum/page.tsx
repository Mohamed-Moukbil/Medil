import { getThreads, getReplies } from "@/lib/content/public";
import { setThreadStatus, deleteThread, setReplyStatus } from "@/lib/admin/actions";
import { Icon } from "@/components/icons";

export default async function AdminForumPage() {
  const threads = await getThreads();

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 750, marginBottom: 24 }}>Modération du forum</h1>

      <div style={{ display: "grid", gap: 16 }}>
        {threads.map((thread) => (
          <div
            key={thread.id}
            style={{
              background: "var(--white)",
              borderRadius: 12,
              padding: 20,
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>{thread.title}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
                  {thread.category} · {thread.authorName} · {thread.replyCount} réponses
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <form
                  key={`thread-${thread.id}-status`}
                  action={async () => { "use server"; await setThreadStatus(thread.id, thread.status === "published" ? "hidden" : "published"); }}
                >
                  <button className="btn btn--sm btn--outline" type="submit">
                    {thread.status === "published" ? "Masquer" : "Publier"}
                  </button>
                </form>
                <form
                  key={`thread-${thread.id}-delete`}
                  action={async () => { "use server"; await deleteThread(thread.id); }}
                >
                  <button className="btn btn--sm btn--outline" type="submit" style={{ color: "var(--coral)" }}>
                    Supprimer
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
