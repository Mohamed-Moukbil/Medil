"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthNav } from "@/components/auth/auth-nav";
import { Icon } from "@/components/icons";

const NAV_ITEMS = [
  { href: "/cours", label: "Cours", match: "/cours" },
  { href: "/exercices", label: "Exercices", match: "/exercices" },
  { href: "/concours", label: "Concours", match: "/concours", badge: "new" },
  { href: "/forum", label: "Forum", match: "/forum" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu state is reset from link click handlers instead of this effect.

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", menuOpen);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("mobile-menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const isActive = (match: string) => pathname === match || pathname.startsWith(`${match}/`);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`} id="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="MEDIL, accueil">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M8 24V8h5l3 8 3-8h5v16h-4.2v-8.6L16.4 24h-1.1l-3.2-8.6V24H8Z" fill="currentColor" />
            </svg>
          </span>
          <span className="brand-word">
            medil<span className="brand-dot">.</span>
          </span>
          <span className="brand-tag">prépa</span>
        </Link>

        <nav className="main-nav" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.match) ? "is-active" : undefined}
              aria-current={isActive(item.match) ? "page" : undefined}
            >
              {item.label}
              {item.badge ? <span className="nav-new">{item.badge}</span> : null}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="header-search" href="/recherche" aria-label="Ouvrir la recherche">
            <span className="header-search-icon" />
            <span className="header-search-label">Rechercher</span>
            <kbd>⌘K</kbd>
          </Link>
          <div className="header-auth">
            <AuthNav />
          </div>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-panel"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <div className={`mobile-panel ${menuOpen ? "is-open" : ""}`} id="mobile-panel" onClick={() => setMenuOpen(false)}>
        <nav className="mobile-nav" aria-label="Navigation mobile">
          <Link href="/" className={pathname === "/" ? "is-active" : undefined}>
            <span>Accueil</span>
            <span>↗</span>
          </Link>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item.match) ? "is-active" : undefined}>
              <span>{item.label}</span>
              {item.badge ? <span className="nav-new">{item.badge}</span> : <span>↗</span>}
            </Link>
          ))}
        </nav>
        <Link className="mobile-search-btn" href="/recherche">
          <span>Rechercher une ressource</span>
          <kbd>⌘K</kbd>
        </Link>
        <div className="mobile-auth">
          <AuthNav mobile />
        </div>
        <p className="mobile-panel-note">Fait par des taupins, pour des taupins. MPSI · MP.</p>
      </div>
    </header>
  );
}
