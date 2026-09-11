import type { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Proyectos | Simón Cifuentes",
  description: "Proyectos destacados de Simón Cifuentes como desarrollador fullstack.",
};

export default function ProjectsPage() {
  return (
    <main className="pt-16">
      <p className="container label-mono pt-14">Archivo — 02 Proyectos</p>
      <Projects />
    </main>
  );
}