import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SectionIndicator } from "@/components/ui/SectionIndicator";
import { Cursor } from "@/components/ui/Cursor";
import { siteUrl, siteDescription, siteTitle } from "@/lib/site";
import "./globals.css";
import "./styles/projects.css";
import "./styles/sections.css";
import "./styles/responsive.css";
import "./styles/experience.css";

const display = localFont({
  src: "./fonts/fraunces-italic-latin.woff2",
  variable: "--font-display",
  weight: "400",
  style: "italic",
  display: "swap",
});
const sans = localFont({
  src: "./fonts/space-grotesk-latin.woff2",
  variable: "--font-sans",
  weight: "400 500",
  display: "swap",
});
const mono = localFont({
  src: "./fonts/ibm-plex-mono-latin.woff2",
  variable: "--font-mono",
  weight: "400",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? "http://localhost:3000"),
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
  title: { default: siteTitle, template: "%s | Simón Cifuentes" },
  description: siteDescription,
  authors: [{ name: "Simón Cifuentes" }],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "Simón Cifuentes",
    locale: "es_CL",
    type: "website",
    ...(siteUrl
      ? {
          url: siteUrl,
          images: [
            { url: siteUrl + "/opengraph-image", width: 1200, height: 630 },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};
export const viewport: Viewport = {
  themeColor: "#10110f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`dark ${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Saltar al contenido
        </a>
        <Navbar />
        <ScrollProgress />
        <SectionIndicator />
        <Cursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
