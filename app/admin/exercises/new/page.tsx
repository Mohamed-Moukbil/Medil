import { ExerciseForm } from "@/components/admin/exercise-form";

export default function NewExercisePage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 750, marginBottom: 24 }}>Nouvel exercice</h1>
      <ExerciseForm />
    </div>
  );
}
