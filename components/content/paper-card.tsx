import Link from "next/link";
import { Icon } from "@/components/icons";
import type { Paper } from "@/lib/content/types";

export function PaperCard({ paper }: { paper: Paper }) {
  return (
    <article className="paper-card reveal" data-paper-card data-school={paper.school} data-subject={paper.subject} data-year={paper.year}>
      <Link
        className="paper-open"
        href={`/concours/${paper.id}`}
        aria-label={`Ouvrir le sujet ${paper.title} ${paper.year}`}
      >
        <span className={`paper-logo logo--${paper.color ?? "lime"}`}>{paper.short ?? paper.school.slice(0, 2)}</span>
        <span className="paper-info">
          <span className="paper-overline">
            {paper.school} <span className="dot-sep" /> Session {paper.year}
          </span>
          <span className="paper-title">{paper.title}</span>
          <span className="paper-details">
            {paper.track ?? "MP"} <span className="dot-sep" /> {paper.subject} <span className="dot-sep" /> {paper.duration ?? "—"} <span className="dot-sep" /> {paper.parts ?? "—"}
          </span>
        </span>
        <span className="paper-side">
          {paper.hot ? <span className="hot-badge">Incontournable</span> : null}
          <span className="paper-arrow">
            <Icon name="arrowUpRight" />
          </span>
        </span>
      </Link>
    </article>
  );
}
