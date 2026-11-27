import Link from "next/link";
import { Icon } from "@/components/icons";
import { SaveButton } from "@/components/save-button";
import { Tex } from "@/components/tex";
import { CoverArt } from "@/components/content/cover-art";
import { formatRating } from "@/lib/format";
import type { Course } from "@/lib/content/types";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="course-card reveal" data-course-id={course.id} data-subject={course.subject} data-level={course.level}>
      <div className={`course-cover cover--${course.color ?? "lime"}`}>
        <CoverArt type={course.coverType} />
        <div className="course-cover-top">
          <span className="cover-tag">{course.tag ?? course.subject}</span>
          <SaveButton
            itemType="course"
            itemId={course.id}
            title={course.title}
            className="icon-button icon-button--cover"
          />
        </div>
        <div className="cover-equation">
          <Tex expression={course.coverEq} display />
        </div>
        <div className="course-cover-bottom">
          <span className="cover-level">{course.level}</span>
          <span className="cover-chapters">{course.chaptersCount} chapitres</span>
        </div>
      </div>
      <div className="course-card-body">
        <div className="course-kicker">
          <span>{course.subject}</span>
          <span className="dot-sep" />
          <span>{course.tag ?? "Cours"}</span>
        </div>
        <h3>
          <Link href={`/cours/${course.id}`}>{course.title}</Link>
        </h3>
        <p>{course.description}</p>
        <div className="course-meta">
          <span>
            <Icon name="layers" /> {course.chaptersCount} ch.
          </span>
          <span>
            <Icon name="clock" /> {course.duration ?? "—"}
          </span>
          <span className="course-rating">
            <Icon name="star" /> {formatRating(course.rating)}
          </span>
        </div>
      </div>
    </article>
  );
}
