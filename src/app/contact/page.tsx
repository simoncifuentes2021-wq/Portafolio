import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contacto | Simón Cifuentes",
  description: "Contacto para proyectos web, freelance y oportunidades profesionales.",
};

export default function ContactPage() {
  return (
    <main className="pt-16">
      <p className="container label-mono pt-14">Archivo — 04 Contacto</p>
      <Contact />
    </main>
  );
}