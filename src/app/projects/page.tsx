import type { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";
import { siteUrl } from "@/lib/site";
export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Tres casos de desarrollo web: reservas deportivas, sitios para negocios y un panel administrativo.",
  alternates: { canonical: siteUrl ? "/projects" : null },
  openGraph: {
    title: "Proyectos | Simón Cifuentes",
    description: "Casos de desarrollo web de punta a punta.",
    url: siteUrl ? siteUrl + "/projects" : undefined,
  },
  twitter: {
    title: "Proyectos | Simón Cifuentes",
    description: "Casos de desarrollo web de punta a punta.",
  },
};
export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="standalone-page">
      <Projects standalone />
    </main>
  );
}
