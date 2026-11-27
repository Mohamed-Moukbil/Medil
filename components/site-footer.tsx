import Link from "next/link";
import { BackToTop } from "@/components/back-to-top";
import { Icon } from "@/components/icons";
import { NewsletterForm } from "@/components/newsletter-form";

const RESOURCE_LINKS = [
  { href: "/cours", label: "Bibliothèque de cours" },
  { href: "/exercices", label: "Exercices corrigés" },
  { href: "/concours", label: "Banque de concours" },
  { href: "#", label: "Fiches de méthode", soon: "Les fiches de méthode arrivent bientôt." },
];

const COMMUNITY_LINKS = [
  { href: "/forum", label: "Forum des taupins" },
  { href: "#", label: "Khôlles en direct", soon: "Les khôlles en direct arrivent bientôt." },
  { href: "#", label: "Parrainage", soon: "Le programme de parrainage arrive bientôt." },
  { href: "#", label: "Charte & modération", soon: "La charte complète arrive bientôt." },
];

const MEDIL_LINKS = [
  { href: "#", label: "À propos", soon: "La page À propos arrive bientôt." },
  { href: "#", label: "Le projet", soon: "Les coulisses du projet arrivent bientôt." },
  { href: "#", label: "Contact", soon: "Le formulaire de contact arrive bientôt." },
  { href: "/admin", label: "Studio admin" },
  { href: "#", label: "Mentions légales", soon: "Les mentions légales arrivent bientôt." },
];

function FooterLink({ href, label, soon }: { href: string; label: string; soon?: string }) {
  if (soon) {
    return (
      <a href={href} title={soon} aria-disabled="true">
        {label}
      </a>
    );
  }
  return <Link href={href}>{label}</Link>;
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand-column">
            <Link className="brand brand--footer" href="/" aria-label="MEDIL, accueil">
              <span className="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M8 24V8h5l3 8 3-8h5v16h-4.2v-8.6L16.4 24h-1.1l-3.2-8.6V24H8Z" fill="currentColor" />
                </svg>
              </span>
              <span className="brand-word">
                medil<span className="brand-dot">.</span>
              </span>
            </Link>
            <p>
              La prépa, sans angles morts.
              <br />
              Cours, exos, concours et communauté.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Discord" title="Le Discord MEDIL arrive très bientôt.">
                <Icon name="discord" />
              </a>
              <a href="#" aria-label="Instagram" title="Notre compte Instagram arrive bientôt.">
                <Icon name="instagram" />
              </a>
              <a href="#" aria-label="YouTube" title="La chaîne YouTube MEDIL arrive bientôt.">
                <Icon name="youtube" />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <p className="footer-heading">Ressources</p>
            {RESOURCE_LINKS.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </div>

          <div className="footer-column">
            <p className="footer-heading">La communauté</p>
            {COMMUNITY_LINKS.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </div>

          <div className="footer-column">
            <p className="footer-heading">MEDIL</p>
            {MEDIL_LINKS.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </div>

          <div className="footer-newsletter">
            <p className="footer-heading">La lettre MEDIL</p>
            <h3>
              Un déclic par semaine.
              <br />
              <span>Zéro spam.</span>
            </h3>
            <NewsletterForm />
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MEDIL. Fait avec rigueur, café et beaucoup de LaTeX.</p>
          <p className="footer-friendly">MPSI · MP · X/ENS · Mines-Ponts · Centrale · CCINP · e3a</p>
          <BackToTop />
        </div>
      </div>
      <div className="footer-giant" aria-hidden="true">
        MEDIL<span>.</span>
      </div>
    </footer>
  );
}
