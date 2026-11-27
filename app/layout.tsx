import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "MEDIL — La prépa, sans angles morts",
  description:
    "MEDIL, la plateforme de ressources pour les prépas MPSI et MP : cours en LaTeX, exercices durs corrigés, banque de concours de CCINP à X/ENS et forum d’entraide.",
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
      <body>{children}</body>
    </html>
  );
}
