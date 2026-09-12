import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TiltSurface } from "@/components/ui/TiltSurface";
import { ProjectPreview } from "./ProjectPreview";
import { projects } from "@/data/projects";

export function Projects({ standalone = false }: { standalone?: boolean }) {
  return (
    <section
      id="proyectos"
      className="section-shell projects-section"
      aria-label="Proyectos seleccionados"
    >
      <SectionHeader
        index="01"
        title="Trabajo seleccionado"
        lede="Ideas que toman forma."
        as={standalone ? "h1" : "h2"}
        aside="Tres formas de resolver problemas reales."
      />
      <div className="project-list">
        {projects.map((project, index) => (
          <article
            id={project.slug}
            key={project.slug}
            className={"project-case project-case-" + project.visual}
          >
            <Reveal
              variant={index === 1 ? "slide" : "depth"}
              className="project-visual-wrap"
            >
              <TiltSurface className="project-tilt" intensity={3}>
                <Link
                  href={"/projects/" + project.slug}
                  className="project-visual-link"
                  data-cursor="Ver proyecto ↗"
                  aria-label={"Ver caso de estudio: " + project.name}
                >
                  <ProjectPreview visual={project.visual} name={project.name} />
                  <span className="project-open">
                    <ArrowUpRight size={21} />
                  </span>
                </Link>
              </TiltSurface>
            </Reveal>
            <Reveal variant="slide" className="project-info">
              <p className="eyebrow project-type">
                <span>0{index + 1}</span> {project.type}
              </p>
              <h3>
                <Link href={"/projects/" + project.slug}>{project.name}</Link>
              </h3>
              <p className="project-summary">{project.summary}</p>
              <p className="project-excerpt">{project.problem}</p>
              <p className="project-ownership">
                <span>Mi participación</span>
                {project.role}
              </p>
              <ul className="tech-tags" aria-label="Tecnologías">
                {project.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <Link
                href={"/projects/" + project.slug}
                className="text-link project-case-link"
              >
                Explorar el caso <ArrowUpRight size={17} />
              </Link>
            </Reveal>
          </article>
        ))}
      </div>
      {!standalone && (
        <div className="projects-footnote">
          <span className="eyebrow">
            Interfaz, lógica y datos. Un mismo criterio.
          </span>
          <Link className="text-link" href="/projects">
            Ver archivo de proyectos <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}
