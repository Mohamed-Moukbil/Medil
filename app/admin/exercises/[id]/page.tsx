import { getExercise } from "@/lib/content/public";
import { ExerciseForm } from "@/components/admin/exercise-form";
import { notFound } from "next/navigation";

export default async function EditExercisePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exercise = await getExercise(id);
  if (!exercise) notFound();

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 750, marginBottom: 24 }}>Modifier : {exercise.title}</h1>
      <ExerciseForm initial={exercise as unknown as Record<string, unknown>} />
    </div>
  );
}
