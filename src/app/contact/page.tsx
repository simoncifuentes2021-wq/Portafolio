import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { siteUrl, socialImage } from "@/lib/site";
export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Conversemos sobre proyectos web, prácticas profesionales y oportunidades freelance.",
  alternates: { canonical: siteUrl ? "/contact" : null },
  openGraph: {
    images: [socialImage],
    title: "Contacto | Simón Cifuentes",
    description: "Hagamos que las ideas sucedan.",
    url: siteUrl ? siteUrl + "/contact" : undefined,
  },
  twitter: {
    card: "summary_large_image",
    images: [socialImage],
    title: "Contacto | Simón Cifuentes",
    description: "Hagamos que las ideas sucedan.",
  },
};
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; service?: string }>;
}) {
  const { project, service } = await searchParams;
  const selected = projects.find((item) => item.slug === project);
  const selectedService = services.find((item) => item.slug === service);
  return (
    <main id="main-content" tabIndex={-1} className="standalone-page">
      <Contact
        key={selected?.slug ?? selectedService?.slug ?? "general"}
        standalone
        projectName={selected?.name}
        serviceTitle={selectedService?.title}
      />
    </main>
  );
}
