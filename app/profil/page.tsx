import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Icon } from "@/components/icons";

export default async function ProfilePage() {
  if (!isSupabaseConfigured()) {
    return (
      <section className="section">
        <div className="container">
          <h1>Mon espace</h1>
          <p style={{ color: "var(--ink-muted)", marginTop: 12 }}>
            Connecte Supabase pour activer ton espace personnel.
          </p>
        </div>
      </section>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/connexion?next=/profil");

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, grade, is_admin")
    .eq("id", user.id)
    .maybeSingle();

  const [{ count: savesCount }, { count: completedCount }, { count: likesCount }] = await Promise.all([
    supabase.from("user_saves").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("user_completed").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("user_likes").select("*", { count: "exact", head: true }).eq("user_id", user.id),
  ]);

  const name = profile?.name || user.user_metadata?.full_name || user.email?.split("@")[0] || "Taupin MEDIL";
  const grade = profile?.grade || user.user_metadata?.grade || "Membre MEDIL";
  const isAdmin = Boolean(profile?.is_admin);

  return (
    <section className="section">
      <div className="container">
        <div className="profile-modal" style={{ maxWidth: 640, margin: "0 auto" }}>
          <div className="profile-head">
            <span className="profile-avatar">{name.slice(0, 2).toUpperCase()}</span>
            <div>
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                Mon espace
              </p>
              <h2>{name}</h2>
              <p>{user.email}</p>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{grade}</p>
            </div>
          </div>
          <div className="profile-stats">
            <div>
              <strong>{savesCount ?? 0}</strong>
              <span>ressources sauvegardées</span>
            </div>
            <div>
              <strong>{completedCount ?? 0}</strong>
              <span>cours terminés</span>
            </div>
            <div>
              <strong>{likesCount ?? 0}</strong>
              <span>réactions</span>
            </div>
          </div>
          <div className="profile-shortcuts">
            <Link href="/cours" className="profile-shortcut">
              <Icon name="book" /> Continuer mes cours <Icon name="arrowUpRight" />
            </Link>
            <Link href="/exercices" className="profile-shortcut">
              <Icon name="target" /> Mes exercices <Icon name="arrowUpRight" />
            </Link>
            <Link href="/forum" className="profile-shortcut">
              <Icon name="forum" /> Mes discussions <Icon name="arrowUpRight" />
            </Link>
            {isAdmin ? (
              <Link href="/admin" className="profile-shortcut">
                <Icon name="settings" /> Studio admin <Icon name="arrowUpRight" />
              </Link>
            ) : null}
          </div>
          <div className="profile-footer">
            <form action="/auth/signout" method="post">
              <button className="btn btn--outline" type="submit">
                <Icon name="logout" /> Se déconnecter
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
