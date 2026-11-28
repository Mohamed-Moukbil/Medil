"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";
import { AuthForm } from "@/components/auth/auth-form";

type AuthModalContextValue = {
  openAuth: (mode?: "login" | "signup") => void;
  closeAuth: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("signup");

  const openAuth = useCallback((m: "login" | "signup" = "signup") => {
    setMode(m);
    setOpen(true);
  }, []);
  const closeAuth = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AuthModalContext.Provider value={{ openAuth, closeAuth }}>
      {children}
      {open ? (
        <div className="modal-backdrop is-open" onClick={() => setOpen(false)}>
          <div className="modal modal--auth modal--wide" onClick={(event) => event.stopPropagation()}>
            <button
              className="modal-close"
              type="button"
              aria-label="Fermer"
              onClick={() => setOpen(false)}
            >
              <Icon name="close" />
            </button>
            <AuthForm
              mode={mode}
              onModeChange={setMode}
              onSuccess={() => {
                setOpen(false);
                router.refresh();
              }}
            />
          </div>
        </div>
      ) : null}
    </AuthModalContext.Provider>
  );
}