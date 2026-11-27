import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Icon } from "@/components/icons";

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return (
      <section className="section">
        <div className="container">
          <h1>Studio admin</h1>
          <p style={{ color: "var(--ink-muted)", marginTop: 12 }}>Connecte Supabase pour activer l’administration.</p>
        </div>
      </section>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/connexion?next=/admin");

  const { data: profile } = await supabase.from("profiles").select("is_admin, name").eq("id", user.id).maybeSingle();

  if (!profile?.is_admin) {
    return (
      <section className="section">
        <div className="container">
          <h1>Accès refusé</h1>
          <p style={{ color: "var(--ink-muted)", marginTop: 12 }}>
            Ton compte n’est pas administrateur. Demande à un admin de promouvoir ton profil.
          </p>
          <Link className="btn btn--outline" href="/profil" style={{ marginTop: 16 }}>
            Retour à mon espace
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">
          <span className="eyebrow-dot" />
          Studio admin
        </p>
        <h1 style={{ marginTop: 16 }}>Bienvenue, {profile.name}.</h1>
        <p style={{ color: "var(--ink-muted)", marginTop: 12, maxWidth: 640 }}>
          L’administration complète (CRUD, brouillons, publication) arrive dans la prochaine étape. Pour l’instant, le contenu est géré via <code>npm run seed</code> et le SQL editor.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
          <Link className="btn btn--dark" href="/cours">
            <Icon name="book" /> Cours
          </Link>
          <Link className="btn btn--dark" href="/exercices">
            <Icon name="target" /> Exercices
          </Link>
          <Link className="btn btn--dark" href="/concours">
            <Icon name="trophy" /> Concours
          </Link>
          <Link className="btn btn--dark" href="/forum">
            <Icon name="forum" /> Forum
          </Link>
        </div>
      </div>
    </section>
  );
}
