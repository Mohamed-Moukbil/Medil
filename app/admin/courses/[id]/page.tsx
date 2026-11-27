import { getCourse } from "@/lib/content/public";
import { CourseForm } from "@/components/admin/course-form";
import { notFound } from "next/navigation";

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await getCourse(id);
  if (!course) notFound();

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 750, marginBottom: 24 }}>Modifier : {course.title}</h1>
      <CourseForm initial={course as unknown as Record<string, unknown>} />
    </div>
  );
}
