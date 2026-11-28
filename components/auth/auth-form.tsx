"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getSiteUrl } from "@/lib/supabase/config";
import { GoogleIcon, GithubIcon } from "@/components/icons";
import { Icon } from "@/components/icons";

type AuthFormProps = {
  mode: "login" | "signup";
  onModeChange?: (mode: "login" | "signup") => void;
  onSuccess?: () => void;
};

export function AuthForm({ mode, onModeChange, onSuccess }: AuthFormProps) {
  const router = useRouter();
  const isLogin = mode === "login";
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const siteUrl = getSiteUrl();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase n’est pas configuré.");
      setPending(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "").trim();

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: `${siteUrl}/auth/callback?next=/profil`,
          },
        });
        if (signUpError) throw signUpError;
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push(isLogin ? "/profil" : "/connexion?registered=1");
      }
      router.refresh();
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "La connexion a échoué.";
      setError(message);
    } finally {
      setPending(false);
    }
  }

  async function handleSocial(provider: "google" | "github") {
    const supabase = createClient();
    if (!supabase) {
      setError("Supabase n’est pas configuré.");
      return;
    }

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${siteUrl}/auth/callback?next=/profil` },
    });

    if (oauthError) setError(oauthError.message);
  }

  return (
    <div className="auth-modal">
      <div className="auth-art">
        <span className="auth-art-mark">M</span>
        <p className="eyebrow eyebrow--light">
          <span className="eyebrow-dot" />
          MEDIL
        </p>
        <h2>{isLogin ? "Content de te revoir." : "Bienvenue dans la promo."}</h2>
        <p>
          {isLogin
            ? "Retrouve tes cours, tes exercices et tes discussions."
            : "Cours, exos, concours et une communauté qui avance ensemble."}
        </p>
        <div className="auth-quote">
          <p>« Le bon déclic, au bon moment. C’est tout ce que je demandais à une plateforme de prépa. »</p>
          <span>
            <span className="mini-avatar avatar--lime">LB</span> Lina, MP* à Ginette
          </span>
        </div>
        <div className="auth-art-stars" aria-hidden="true">
          ✦ ✦
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-switch">
          {onModeChange ? (
            <>
              <button
                type="button"
                className={isLogin ? "" : "is-active"}
                onClick={() => onModeChange("signup")}
              >
                S’inscrire
              </button>
              <button
                type="button"
                className={isLogin ? "is-active" : ""}
                onClick={() => onModeChange("login")}
              >
                Se connecter
              </button>
            </>
          ) : (
            <>
              <Link className={isLogin ? "" : "is-active"} href="/inscription">
                S’inscrire
              </Link>
              <Link className={isLogin ? "is-active" : ""} href="/connexion">
                Se connecter
              </Link>
            </>
          )}
        </div>
        <h3>{isLogin ? "Se connecter" : "Créer ton compte"}</h3>
        <p className="auth-form-sub">{isLogin ? "Ton espace t’attend." : "Gratuit. En moins de trente secondes."}</p>
        <div className="auth-socials">
          <button type="button" className="btn btn--outline btn--full auth-social-btn" onClick={() => handleSocial("google")}>
            <GoogleIcon className="auth-social-icon" />
            Continuer avec Google
          </button>
          <button type="button" className="btn btn--dark btn--full auth-social-btn auth-social-btn--github" onClick={() => handleSocial("github")}>
            <GithubIcon className="auth-social-icon" />
            Continuer avec GitHub
          </button>
        </div>
        <div className="auth-divider">
          <span>ou par e-mail</span>
        </div>
        <form onSubmit={handleSubmit}>
          {!isLogin ? (
            <>
              <label className="field-label" htmlFor="auth-name">
                Prénom et nom
              </label>
              <input className="input" id="auth-name" name="name" type="text" placeholder="Ex. Sami El Amrani" autoComplete="name" required />
            </>
          ) : null}
          <label className="field-label" htmlFor="auth-email">
            Adresse e-mail
          </label>
          <input className="input" id="auth-email" name="email" type="email" placeholder="toi@exemple.fr" autoComplete="email" required />
          <label className="field-label" htmlFor="auth-password">
            Mot de passe
          </label>
          <input
            className="input"
            id="auth-password"
            name="password"
            type="password"
            placeholder="8 caractères minimum"
            minLength={8}
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
          />
          {error ? <p style={{ color: "var(--peach)", fontSize: 13, marginTop: 12 }}>{error}</p> : null}
          <button className="btn btn--lime btn--full btn--lg" type="submit" disabled={pending} style={{ marginTop: 16 }}>
            {isLogin ? "Entrer dans mon espace" : "Rejoindre MEDIL"} <Icon name="arrowRight" />
          </button>
        </form>
        <p className="auth-bottom-note">
          {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}{" "}
          {onModeChange ? (
            <button type="button" onClick={() => onModeChange(isLogin ? "signup" : "login")}>
              {isLogin ? "S’inscrire" : "Se connecter"}
            </button>
          ) : (
            <Link href={isLogin ? "/inscription" : "/connexion"}>{isLogin ? "S’inscrire" : "Se connecter"}</Link>
          )}
        </p>
      </div>
    </div>
  );
}
