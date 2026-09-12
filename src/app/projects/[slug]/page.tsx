import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/data/projects";
import { socialLinks } from "@/data/socialLinks";
import { siteUrl } from "@/lib/site";
import { ProjectPreview } from "@/components/sections/ProjectPreview";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Proyecto no encontrado" };
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: siteUrl ? "/projects/" + slug : null },
    openGraph: {
      title: project.name + " | Simón Cifuentes",
      description: project.summary,
      url: siteUrl ? siteUrl + "/projects/" + slug : undefined,
      images: [],
    },
    twitter: {
      card: "summary",
      title: project.name + " | Simón Cifuentes",
      description: project.summary,
      images: [],
    },
  };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = projects[index],
    next = projects[(index + 1) % projects.length];
  return (
    <main id="main-content" tabIndex={-1} className="container project-detail">
      <div className="project-detail-top">
        <Link href="/#proyectos" className="text-link">
          <ArrowLeft size={15} />
          Todos los proyectos
        </Link>
        <span className="eyebrow">
          Caso 0{index + 1} / {project.type}
        </span>
      </div>
      <h1>{project.name}</h1>
      <p className="detail-summary">{project.summary}</p>
      <div className="detail-meta">
        <div>
          <span className="eyebrow">Mi participación</span>
          <p>{project.role}</p>
        </div>
        <div>
          <span className="eyebrow">Tecnologías</span>
          <ul className="tech-tags">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="detail-preview">
        <ProjectPreview visual={project.visual} name={project.name} />
      </div>
      <div className="detail-story">
        <section>
          <p className="eyebrow">01 / El contexto</p>
          <h2>El problema por resolver.</h2>
          <p>{project.problem}</p>
          <p>{project.description}</p>
        </section>
        <section>
          <p className="eyebrow">02 / La construcción</p>
          <h2>De la idea a la solución.</h2>
          <p>{project.solution}</p>
          <ul>
            {project.demonstrates.map((item) => (
              <li key={item}>
                <Check size={14} />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="detail-actions">
        <Link
          href={"/contact?project=" + project.slug}
          className="btn btn-primary"
        >
          Conversemos sobre este proyecto <ArrowUpRight size={16} />
        </Link>
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Mi perfil en GitHub <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="detail-next">
        <span className="eyebrow">Siguiente proyecto</span>
        <Link href={"/projects/" + next.slug}>
          {next.name}
          <ArrowUpRight size={25} />
        </Link>
      </div>
    </main>
  );
}
