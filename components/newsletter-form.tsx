"use client";

import { useActionState } from "react";
import { Icon } from "@/components/icons";
import { initialNewsletterState, subscribeToNewsletter } from "@/lib/newsletter/actions";

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialNewsletterState);

  return (
    <>
      <form action={formAction}>
        <label className="sr-only" htmlFor="newsletter-email">
          Ton adresse e-mail
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          placeholder="ton@email.fr"
          autoComplete="email"
          required
          disabled={pending}
        />
        <button type="submit" aria-label="S’inscrire à la newsletter" disabled={pending}>
          <Icon name="arrowRight" />
        </button>
      </form>
      <p
        className="newsletter-note"
        role="status"
        style={
          state.status === "error"
            ? { color: "var(--peach)" }
            : state.status === "success"
              ? { color: "var(--lime)" }
              : undefined
        }
      >
        {state.message || "Méthodes, annales et pépites de la communauté."}
      </p>
    </>
  );
}
