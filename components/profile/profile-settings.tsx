"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  changeEmail,
  changePassword,
  updateProfile,
} from "@/lib/profile/actions";

type ProfileSettingsProps = {
  initialName: string;
  initialGrade: string;
  initialAvatarUrl: string;
  initialEmail: string;
};

async function compressImage(file: File): Promise<string> {
  try {
    const bitmap = await createImageBitmap(file);
    const maxSize = 256;
    const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas");
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();
    return canvas.toDataURL("image/jpeg", 0.82);
  } catch {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("file"));
      reader.readAsDataURL(file);
    });
  }
}

export function ProfileSettings({
  initialName,
  initialGrade,
  initialAvatarUrl,
  initialEmail,
}: ProfileSettingsProps) {
  const router = useRouter();

  const [name, setName] = useState(initialName);
  const [grade, setGrade] = useState(initialGrade);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [avatarPreview, setAvatarPreview] = useState(initialAvatarUrl);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [profilePending, startProfileTransition] = useTransition();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordPending, startPasswordTransition] = useTransition();

  const [newEmail, setNewEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [emailPending, startEmailTransition] = useTransition();

  const onAvatarFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setProfileMessage("Fichier image requis.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setProfileMessage("Image trop volumineuse (max 5 Mo).");
      return;
    }
    try {
      const dataUrl = await compressImage(file);
      setAvatarUrl(dataUrl);
      setAvatarPreview(dataUrl);
      setProfileMessage(null);
    } catch {
      setProfileMessage("Impossible de lire l’image.");
    }
  };

  const saveProfile = () => {
    setProfileMessage(null);
    startProfileTransition(async () => {
      const result = await updateProfile({ name, grade, avatarUrl });
      if (result.ok) {
        setProfileMessage("Profil mis à jour.");
        router.refresh();
      } else {
        setProfileMessage(result.message);
      }
    });
  };

  const savePassword = () => {
    setPasswordMessage(null);
    startPasswordTransition(async () => {
      const result = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      if (result.ok) {
        setPasswordMessage("Mot de passe mis à jour.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordMessage(result.message);
      }
    });
  };

  const saveEmail = () => {
    setEmailMessage(null);
    startEmailTransition(async () => {
      const result = await changeEmail({ newEmail });
      if (result.ok) {
        setEmailMessage("Un e-mail de confirmation a été envoyé à la nouvelle adresse.");
        setNewEmail("");
      } else {
        setEmailMessage(result.message);
      }
    });
  };

  return (
    <div className="profile-settings" style={{ marginTop: 24, display: "grid", gap: 20 }}>
      <div>
        <p className="eyebrow" style={{ marginBottom: 10 }}>
          <span className="eyebrow-dot" />
          Paramètres du profil
        </p>

        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {avatarPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="profile-avatar profile-avatar--photo"
                src={avatarPreview}
                alt=""
                referrerPolicy="no-referrer"
                style={{ width: 62, height: 62 }}
              />
            ) : (
              <span className="profile-avatar">{(name || "ME").slice(0, 2).toUpperCase()}</span>
            )}
            <div style={{ display: "grid", gap: 6 }}>
              <label className="field-label" htmlFor="avatar-file">
                Photo de profil
              </label>
              <input
                id="avatar-file"
                type="file"
                accept="image/*"
                onChange={onAvatarFile}
                style={{ fontSize: 12 }}
              />
              <input
                className="input"
                type="url"
                placeholder="ou une URL d’image"
                value={avatarUrl.startsWith("data:") ? "" : avatarUrl}
                onChange={(event) => {
                  const value = event.target.value;
                  setAvatarUrl(value);
                  setAvatarPreview(value || initialAvatarUrl);
                }}
              />
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="profile-name">
              Nom
            </label>
            <input
              id="profile-name"
              className="input"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Prénom et nom"
            />
          </div>

          <div>
            <label className="field-label" htmlFor="profile-grade">
              Niveau / classe
            </label>
            <input
              id="profile-grade"
              className="input"
              type="text"
              value={grade}
              onChange={(event) => setGrade(event.target.value)}
              placeholder="Ex. MP* à Ginette"
            />
          </div>

          <button
            className="btn btn--lime"
            type="button"
            onClick={saveProfile}
            disabled={profilePending}
            style={{ justifySelf: "start" }}
          >
            {profilePending ? "Enregistrement…" : "Enregistrer le profil"}
          </button>
          {profileMessage ? (
            <p style={{ fontSize: 12, color: "var(--ink-muted)" }}>{profileMessage}</p>
          ) : null}
        </div>
      </div>

      <div>
        <p className="eyebrow" style={{ marginBottom: 10 }}>
          <span className="eyebrow-dot" />
          Mot de passe
        </p>
        <div style={{ display: "grid", gap: 10, maxWidth: 420 }}>
          <input
            className="input"
            type="password"
            placeholder="Mot de passe actuel"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            autoComplete="current-password"
          />
          <input
            className="input"
            type="password"
            placeholder="Nouveau mot de passe (8 caractères min.)"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            autoComplete="new-password"
          />
          <input
            className="input"
            type="password"
            placeholder="Confirmer le nouveau mot de passe"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="new-password"
          />
          <button
            className="btn btn--outline"
            type="button"
            onClick={savePassword}
            disabled={passwordPending}
            style={{ justifySelf: "start" }}
          >
            {passwordPending ? "Mise à jour…" : "Changer le mot de passe"}
          </button>
          {passwordMessage ? (
            <p style={{ fontSize: 12, color: "var(--ink-muted)" }}>{passwordMessage}</p>
          ) : null}
        </div>
      </div>

      <div>
        <p className="eyebrow" style={{ marginBottom: 10 }}>
          <span className="eyebrow-dot" />
          Adresse e-mail
        </p>
        <p style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 8 }}>
          Actuelle : {initialEmail}
        </p>
        <div style={{ display: "flex", gap: 8, maxWidth: 420, flexWrap: "wrap" }}>
          <input
            className="input"
            type="email"
            placeholder="Nouvelle adresse e-mail"
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
            style={{ flex: 1, minWidth: 200 }}
          />
          <button
            className="btn btn--outline"
            type="button"
            onClick={saveEmail}
            disabled={emailPending || !newEmail.trim()}
          >
            {emailPending ? "Envoi…" : "Changer l’e-mail"}
          </button>
        </div>
        {emailMessage ? (
          <p style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 6 }}>{emailMessage}</p>
        ) : null}
      </div>
    </div>
  );
}
