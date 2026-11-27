import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Icon } from "@/components/icons";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    return <>{children}</>;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/connexion?next=/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin, name")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.is_admin) redirect("/profil");

  const nav = [
    { href: "/admin", label: "Tableau de bord", icon: "home" as const },
    { href: "/admin/courses", label: "Cours", icon: "book" as const },
    { href: "/admin/exercises", label: "Exercices", icon: "target" as const },
    { href: "/admin/papers", label: "Concours", icon: "trophy" as const },
    { href: "/admin/forum", label: "Forum", icon: "forum" as const },
    { href: "/admin/upload", label: "Upload", icon: "download" as const },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--cream)" }}>
      <aside
        style={{
          width: 240,
          background: "var(--ink)",
          color: "var(--white)",
          padding: "24px 16px",
          flexShrink: 0,
        }}
      >
        <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, color: "var(--white)" }}>
          <span className="brand-mark" style={{ width: 30, height: 30, borderRadius: 8 }}>
            <svg viewBox="0 0 32 32" fill="none" style={{ width: 22, height: 22 }}>
              <path d="M8 24V8h5l3 8 3-8h5v16h-4.2v-8.6L16.4 24h-1.1l-3.2-8.6V24H8Z" fill="currentColor" />
            </svg>
          </span>
          <span style={{ fontWeight: 800, fontSize: 18 }}>Studio</span>
        </Link>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 8,
                color: "rgba(255,255,255,0.7)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <Icon name={item.icon} /> {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: "auto", paddingTop: 32 }}>
          <Link href="/profil" style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
            ← Retour au site
          </Link>
        </div>
      </aside>
      <main style={{ flex: 1, padding: 32, overflow: "auto" }}>{children}</main>
    </div>
  );
}
