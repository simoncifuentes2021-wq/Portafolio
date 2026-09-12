import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";
export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Conversemos sobre proyectos web, prácticas profesionales y oportunidades freelance.",
  alternates: { canonical: siteUrl ? "/contact" : null },
  openGraph: {
    title: "Contacto | Simón Cifuentes",
    description: "Hagamos que las ideas sucedan.",
    url: siteUrl ? siteUrl + "/contact" : undefined,
  },
  twitter: {
    title: "Contacto | Simón Cifuentes",
    description: "Hagamos que las ideas sucedan.",
  },
};
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const { project } = await searchParams;
  const selected = projects.find((item) => item.slug === project);
  return (
    <main id="main-content" tabIndex={-1} className="standalone-page">
      <Contact standalone projectName={selected?.name} />
    </main>
  );
}
