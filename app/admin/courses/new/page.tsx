import { CourseForm } from "@/components/admin/course-form";

export default function NewCoursePage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 750, marginBottom: 24 }}>Nouveau cours</h1>
      <CourseForm />
    </div>
  );
}
