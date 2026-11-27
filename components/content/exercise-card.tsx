import type { CSSProperties } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { SaveButton } from "@/components/save-button";
import { Tex } from "@/components/tex";
import { StarRow } from "@/components/content/stars";
import type { Exercise } from "@/lib/content/types";

export function ExerciseCard({ exercise, index = 0 }: { exercise: Exercise; index?: number }) {
  return (
    <article
      className="exercise-card reveal"
      data-exercise-card={exercise.id}
      data-subject={exercise.subject}
      data-stars={exercise.stars}
      style={{ "--card-index": index } as CSSProperties}
    >
      <Link
        className="card-hit"
        href={`/exercices/${exercise.id}`}
        aria-label={`Voir l’exercice : ${exercise.title}`}
      />
      <div className="exercise-top">
        <span className="source-badge">{exercise.source ?? "MEDIL"}</span>
        <SaveButton
          itemType="exercise"
          itemId={exercise.id}
          title={exercise.title}
          className="icon-button"
        />
      </div>
      <div className="exercise-heading">
        <span className="exercise-index">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <div className="exercise-tags">
            <span>{exercise.tag ?? exercise.subject}</span>
            <span>{exercise.level ?? "MP"}</span>
          </div>
          <h3>{exercise.title}</h3>
        </div>
      </div>
      <p className="exercise-teaser">{exercise.teaser}</p>
      <div className="exercise-equation">
        <Tex expression={exercise.equation} display />
      </div>
      <div className="exercise-footer">
        <span>
          <StarRow count={exercise.stars} label={false} />
        </span>
        <span className="exercise-meta">
          <Icon name="clock" /> {exercise.minutes ?? "—"} min <span className="dot-sep" /> <Icon name="checkCircle" /> Corrigé
        </span>
      </div>
    </article>
  );
}
