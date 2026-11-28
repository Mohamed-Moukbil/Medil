import Link from "next/link";
import { Icon } from "@/components/icons";
import { timeAgo } from "@/lib/format";
import type { ForumThread } from "@/lib/content/types";

export function ThreadRow({ thread }: { thread: ForumThread }) {
  return (
    <Link
      className="thread-row"
      href={`/forum/${thread.id}`}
      data-thread-row
      data-category={thread.category}
    >
      <span className={`thread-category cat--${thread.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "")}`}>
        {thread.category}
      </span>
      <span className="thread-main">
        <span className="thread-title-line">
          {thread.pinned ? (
            <span className="pin-label">
              <Icon name="target" /> Épinglé
            </span>
          ) : null}
          <strong>{thread.title}</strong>
        </span>
        <span className="thread-excerpt">{thread.excerpt}</span>
        <span className="thread-meta">
          <span className={`mini-avatar avatar--${thread.avatarColor ?? "lime"}`}>
            {thread.authorInitials ?? thread.authorName?.slice(0, 2).toUpperCase()}
          </span>
          {thread.authorName} <span className="dot-sep" /> {timeAgo(thread.createdAt)}
          {thread.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="thread-tag">
              #{tag}
            </span>
          ))}
        </span>
      </span>
      <span className="thread-stats">
        <span>
          <Icon name="forum" /> {thread.replyCount}
        </span>
      </span>
      <span className="thread-chevron">
        <Icon name="arrowUpRight" />
      </span>
    </Link>
  );
}
