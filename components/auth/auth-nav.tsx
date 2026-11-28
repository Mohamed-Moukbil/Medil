"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { initials } from "@/lib/format";
import { Icon } from "@/components/icons";
import { useAuthModal } from "@/components/auth/auth-modal-provider";

export function AuthNav({ mobile = false }: { mobile?: boolean }) {
  const { openAuth } = useAuthModal();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;

    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (mounted) setUser(data.session?.user ?? null);
      })
      .catch((error) => {
        console.error("[medil] session:", error);
      });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (user) {
    const metadata = user.user_metadata ?? {};
    const name =
      String(metadata.full_name || metadata.name || metadata.user_name || "").trim() ||
      user.email?.split("@")[0] ||
      "Taupin MEDIL";
    const avatarUrl = String(metadata.avatar_url || metadata.picture || "").trim();
    const firstName = name.split(" ")[0];

    return (
      <Link className="profile-chip" href="/profil" aria-label="Ouvrir mon espace">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="user-avatar user-avatar--photo" src={avatarUrl} alt="" referrerPolicy="no-referrer" />
        ) : (
          <span className="user-avatar">{initials(name)}</span>
        )}
        <span>{firstName}</span>
        <Icon name="chevronDown" />
      </Link>
    );
  }

  return (
    <>
      <button className="header-login" type="button" onClick={() => openAuth("login")}>
        Connexion
      </button>
      <button className="btn btn--lime btn--sm" type="button" onClick={() => openAuth("signup")}>
        {mobile ? "Rejoindre MEDIL" : "Rejoindre"}
        {!mobile && (
          <span className="btn-orb">
            <Icon name="arrowUpRight" />
          </span>
        )}
      </button>
    </>
  );
}