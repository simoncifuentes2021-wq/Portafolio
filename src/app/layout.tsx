import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Fraunces, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SectionIndicator } from "@/components/ui/SectionIndicator";
import { Cursor } from "@/components/ui/Cursor";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { ScrollSpine } from "@/components/ui/ScrollSpine";

// TODO: Reemplazar por el dominio final del portafolio.
const siteUrl = "https://tu-dominio.com";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Simón Cifuentes | Desarrollador Fullstack",
  description:
    "Portafolio de Simón Cifuentes, desarrollador fullstack — React, Next.js, FastAPI y PostgreSQL. Santiago de Chile.",
  keywords: [
    "Simón Cifuentes",
    "Desarrollador Fullstack",
    "React",
    "Next.js",
    "FastAPI",
    "PostgreSQL",
    "Portafolio",
    "Chile",
    "Ingenieria Civil Informatica",
  ],
  authors: [{ name: "Simón Cifuentes" }],
  openGraph: {
    title: "Simón Cifuentes | Desarrollador Fullstack",
    description:
      "Portafolio de Simón Cifuentes, desarrollador fullstack — React, Next.js, FastAPI y PostgreSQL. Santiago de Chile.",
    url: siteUrl,
    siteName: "Simón Cifuentes Portfolio",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simón Cifuentes | Desarrollador Fullstack",
    description:
      "Portafolio de Simón Cifuentes, desarrollador fullstack — React, Next.js, FastAPI y PostgreSQL. Santiago de Chile.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`dark ${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <AmbientBackground />
        <Cursor />
        <Navbar />
        <ScrollProgress />
        <ScrollSpine />
        <SectionIndicator />
        {children}
        <Footer />
      </body>
    </html>
  );
}