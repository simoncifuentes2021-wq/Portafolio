"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { ArrowDown, ArrowRight, Braces, MousePointer2 } from "lucide-react";
import { projectJourneys } from "@/data/projectJourneys";
import type { Project } from "@/data/projects";

export function ProjectJourney({ visual }: { visual: Project["visual"] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const steps = projectJourneys[visual];
  const step = steps[active];
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % steps.length
        : event.key === "ArrowLeft"
          ? (index + steps.length - 1) % steps.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? steps.length - 1
              : undefined;
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(id + "-tab-" + next)?.focus();
  }
  return (
    <section
      id="recorrido"
      className="project-journey"
      aria-labelledby={id + "-title"}
    >
      <div className="journey-heading">
        <div>
          <p className="eyebrow">03 / Dentro del producto</p>
          <h2 id={id + "-title"}>Una acción. Todo lo que conecta.</h2>
        </div>
        <p>
          Explora el recorrido para ver la experiencia de uso y el trabajo que
          la sostiene.
        </p>
      </div>
      <div
        className="journey-tabs"
        role="tablist"
        aria-label="Etapas del recorrido del proyecto"
      >
        {steps.map((item, index) => (
          <button
            key={item.title}
            id={id + "-tab-" + index}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={id + "-panel"}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKey(event, index)}
          >
            <span>0{index + 1}</span>
            {item.title}
            <ArrowRight size={16} />
          </button>
        ))}
      </div>
      <div
        className="journey-panel"
        id={id + "-panel"}
        role="tabpanel"
        aria-labelledby={id + "-tab-" + active}
        tabIndex={0}
      >
        <div className="journey-statement">
          <span className="journey-number" aria-hidden="true">
            0{active + 1}
          </span>
          <h3>{step.action}</h3>
          <div className="journey-flow" aria-hidden="true">
            <span>Persona</span>
            <ArrowDown size={18} />
            <span>Interacción</span>
            <ArrowDown size={18} />
            <span>Producto</span>
          </div>
        </div>
        <div className="journey-explanation" key={active}>
          <div>
            <span className="journey-label">
              <MousePointer2 size={16} />
              Desde la experiencia
            </span>
            <p>{step.experience}</p>
          </div>
          <div>
            <span className="journey-label">
              <Braces size={18} />
              Desde el desarrollo
            </span>
            <p>{step.responsibility}</p>
            <ul className="tech-tags" aria-label="Tecnologías de esta etapa">
              {step.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
