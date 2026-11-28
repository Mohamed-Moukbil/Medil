import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AuthModalProvider } from "@/components/auth/auth-modal-provider";
import { getSiteUrl } from "@/lib/supabase/config";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MEDIL — La prépa, sans angles morts",
    template: "%s · MEDIL",
  },
  description:
    "MEDIL, la plateforme de ressources pour les prépas MPSI et MP : cours en LaTeX, exercices durs corrigés, banque de concours de CCINP à X/ENS et forum d’entraide.",
  applicationName: "MEDIL",
  authors: [{ name: "MEDIL" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "MEDIL",
    title: "MEDIL — La prépa, sans angles morts",
    description:
      "Cours en LaTeX, exercices exigeants corrigés et banque de concours. De MPSI à MP, de CCINP à l’X.",
    url: siteUrl,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0e0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preload" href="/assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="/assets/fonts/dm-serif-italic-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/assets/katex/katex.min.css" />
      </head>
      <body>
        <a className="skip-link" href="#app">
          Aller au contenu
        </a>
        <AuthModalProvider>
          <SiteHeader />
          <main id="app" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </AuthModalProvider>
      </body>
    </html>
  );
}
