"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Braces, Database, Globe2, Layers3 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stackGroups } from "@/data/skills";
import { projects } from "@/data/projects";

const icons = [Layers3, Braces, Database, Globe2];
export function Stack() {
  const [selected, setSelected] = useState("Next.js");
  const technology = stackGroups
    .flatMap((group) => group.technologies)
    .find((tech) => tech.name === selected)!;
  const related = projects.filter((project) =>
    project.technologies.includes(selected),
  );
  return (
    <section id="stack" className="section-shell stack-section">
      <SectionHeader
        index="03"
        title="Herramientas conectadas"
        lede="Un stack. Muchas posibilidades."
        aside="Selecciona una tecnología. Sigue su conexión con el trabajo."
      />
      <div className="stack-layout">
        <div className="stack-map">
          {stackGroups.map((group, index) => {
            const Icon = icons[index];
            return (
              <div className="stack-group" key={group.name}>
                <h3>
                  <Icon size={18} strokeWidth={1.5} />
                  <span>{group.name}</span>
                  <span className="stack-group-line" />
                </h3>
                <div role="group" aria-label={group.name}>
                  {group.technologies.map((tech) => (
                    <button
                      type="button"
                      key={tech.name}
                      aria-pressed={selected === tech.name}
                      aria-controls="stack-context"
                      onClick={() => setSelected(tech.name)}
                    >
                      <span className="tech-node" />
                      {tech.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <aside id="stack-context" className="stack-context" aria-live="polite">
          <div className="stack-context-top">
            <span className="eyebrow">La herramienta en contexto</span>
            <span className="tiny-cross">+</span>
          </div>
          <div className="stack-selected-name">
            {technology.name}
            <span>↗</span>
          </div>
          <p>{technology.description}</p>
          <div className="stack-related">
            <span className="eyebrow">
              {related.length
                ? "Presente en estos proyectos"
                : "Dentro de mi flujo de trabajo"}
            </span>
            {related.length ? (
              related.map((project) => (
                <Link href={"/projects/" + project.slug} key={project.slug}>
                  {project.name}
                  <ArrowUpRight size={16} />
                </Link>
              ))
            ) : (
              <p>
                Parte de las herramientas con las que diseño, construyo y pruebo
                software.
              </p>
            )}
          </div>
          <span className="stack-context-footer">
            <span className="status-dot" /> Cada herramienta tiene un propósito.
          </span>
        </aside>
      </div>
    </section>
  );
}
