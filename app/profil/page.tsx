import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Icon } from "@/components/icons";
import { getCourses } from "@/lib/content/public";
import { CourseCard } from "@/components/content/course-card";
import { ProfileSettings } from "@/components/profile/profile-settings";

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
    .select("name, grade, avatar_url, is_admin")
    .eq("id", user.id)
    .maybeSingle();

  const [{ count: savesCount }, { count: completedCount }, { count: likesCount }] = await Promise.all([
    supabase.from("user_saves").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("user_completed").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("user_likes").select("*", { count: "exact", head: true }).eq("user_id", user.id),
  ]);

  const { data: savedRows } = await supabase
    .from("user_saves")
    .select("item_id, created_at")
    .eq("user_id", user.id)
    .eq("item_type", "course")
    .order("created_at", { ascending: false });

  const allCourses = await getCourses();
  const savedCourses = (savedRows ?? [])
    .map((row) => allCourses.find((course) => course.id === row.item_id))
    .filter((course): course is (typeof allCourses)[number] => Boolean(course));

  const name = profile?.name || user.user_metadata?.full_name || user.email?.split("@")[0] || "Taupin MEDIL";
  const grade = profile?.grade || user.user_metadata?.grade || "Membre MEDIL";
  const isAdmin = Boolean(profile?.is_admin);
  const avatarUrl = String(
    profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture || "",
  ).trim();

  return (
    <section className="section">
      <div className="container">
        <div className="profile-modal" style={{ maxWidth: 640, margin: "0 auto" }}>
          <div className="profile-head">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="profile-avatar profile-avatar--photo" src={avatarUrl} alt="" referrerPolicy="no-referrer" />
            ) : (
              <span className="profile-avatar">{name.slice(0, 2).toUpperCase()}</span>
            )}
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
          <div className="profile-saved" style={{ marginTop: 22 }}>
            <p className="eyebrow" style={{ marginBottom: 10 }}>
              <span className="eyebrow-dot" />
              Cours sauvegardés
            </p>
            {savedCourses.length === 0 ? (
              <p style={{ color: "var(--ink-muted)", fontSize: 13 }}>
                Tu n’as encore sauvegardé aucun cours. Parcours la bibliothèque et clique sur l’icône favori pour les retrouver ici.
              </p>
            ) : (
              <div className="course-grid" style={{ gridTemplateColumns: "1fr" }}>
                {savedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
          <ProfileSettings
            initialName={name}
            initialGrade={grade}
            initialAvatarUrl={avatarUrl}
            initialEmail={user.email ?? ""}
          />
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
