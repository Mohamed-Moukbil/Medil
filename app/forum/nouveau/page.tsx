import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { NewThreadForm } from "@/components/forum/new-thread-form";

export default async function NewThreadPage() {
  if (!isSupabaseConfigured()) {
    return (
      <section className="section">
        <div className="container">
          <h1>Nouvelle discussion</h1>
          <p style={{ color: "var(--ink-muted)", marginTop: 12 }}>Connecte Supabase pour publier.</p>
        </div>
      </section>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/connexion?next=/forum/nouveau");

  return (
    <section className="section">
      <div className="container">
        <NewThreadForm />
      </div>
    </section>
  );
}
