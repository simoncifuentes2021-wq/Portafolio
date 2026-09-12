"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Layers3, RotateCcw } from "lucide-react";
import { projects } from "@/data/projects";

export function ProjectObservatory() {
  const section = useRef<HTMLElement>(null);
  const drag = useRef<{ x: number; angle: number; pointer: number } | null>(
    null,
  );
  const [selected, setSelected] = useState(0);
  const [angle, setAngle] = useState(-24);
  const [separated, setSeparated] = useState(true);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const rotation = useTransform(scrollYProgress, [0, 0.45, 1], [14, 0, -8]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.85, 1, 0.95]);
  const project = projects[selected];

  function move(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || event.pointerId !== drag.current.pointer) return;
    setAngle(
      Math.max(
        -65,
        Math.min(
          25,
          drag.current.angle + (event.clientX - drag.current.x) * 0.22,
        ),
      ),
    );
  }
  function release(event: PointerEvent<HTMLDivElement>) {
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <section
      ref={section}
      className="observatory section-shell"
      aria-labelledby="observatory-title"
      id="observatorio"
    >
      <div className="observatory-intro">
        <p className="eyebrow">Laboratorio / Explora mi trabajo</p>
        <h2 id="observatory-title">
          Cada proyecto.
          <br />
          <em>Otra perspectiva.</em>
        </h2>
        <p>
          Gira la escena, cambia de proyecto y descubre las piezas que lo
          construyen.
        </p>
      </div>
      <div className="observatory-layout">
        <motion.div
          className="observatory-view"
          style={reduced ? undefined : { rotateX: rotation, scale }}
        >
          <div className="observatory-grid" aria-hidden="true" />
          <span className="observatory-coordinate eyebrow" aria-hidden="true">
            SC / EXPLORADOR DE PRODUCTOS
          </span>
          <div
            className="observatory-drag"
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              drag.current = {
                x: event.clientX,
                angle,
                pointer: event.pointerId,
              };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={move}
            onPointerUp={release}
            onPointerCancel={release}
            onLostPointerCapture={() => {
              drag.current = null;
            }}
          >
            <div
              className="observatory-sculpture"
              data-separated={separated}
              style={{ "--scene-angle": `${angle}deg` } as CSSProperties}
              aria-hidden="true"
            >
              <div className="observatory-plinth">
                <span>SC. / PRODUCT ENGINEERING</span>
              </div>
              {projects.map((item, index) => (
                <div
                  key={item.slug}
                  className={
                    "observatory-plane observatory-plane-" + item.visual
                  }
                  data-selected={selected === index}
                  style={{ "--plane-index": index } as CSSProperties}
                >
                  <div className="observatory-plane-top">
                    <span>
                      0{index + 1} / {item.type}
                    </span>
                    <ArrowUpRight size={18} />
                  </div>
                  <strong>{item.name}</strong>
                  <div className="observatory-blueprint">
                    {item.visual === "sports" ? (
                      <div className="blueprint-court">
                        <i />
                        <b />
                      </div>
                    ) : item.visual === "business" ? (
                      <div className="blueprint-business">
                        <i />
                        <i />
                        <i />
                        <b />
                      </div>
                    ) : (
                      <div className="blueprint-dashboard">
                        {Array.from({ length: 12 }, (_, i) => (
                          <i key={i} />
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="observatory-plane-footer">
                    {item.technologies.slice(0, 3).join(" / ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <span className="observatory-hint">
            Arrastra horizontalmente para girar
          </span>
          <div className="observatory-tools">
            <label htmlFor="scene-angle">
              Ángulo{" "}
              <input
                id="scene-angle"
                type="range"
                min="-65"
                max="25"
                value={angle}
                onChange={(event) => setAngle(Number(event.target.value))}
                aria-valuetext={`${Math.round(angle)} grados`}
              />
            </label>
            <button
              type="button"
              aria-pressed={separated}
              onClick={() => setSeparated(!separated)}
            >
              <Layers3 size={16} />
              {separated ? "Compactar" : "Desplegar"}
            </button>
            <button
              type="button"
              aria-label="Restablecer perspectiva"
              onClick={() => {
                setAngle(-24);
                setSeparated(true);
              }}
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </motion.div>
        <div className="observatory-content">
          <div
            className="observatory-selector"
            role="group"
            aria-label="Proyecto del observatorio"
          >
            {projects.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                aria-pressed={selected === index}
                aria-controls="observatory-detail"
                onClick={() => setSelected(index)}
              >
                <span>0{index + 1}</span>
                {item.name}
                <ArrowUpRight size={16} />
              </button>
            ))}
          </div>
          <div
            id="observatory-detail"
            className="observatory-detail"
            aria-live="polite"
            aria-atomic="true"
          >
            <div key={project.slug} className="observatory-detail-enter">
              <p className="eyebrow">La idea detrás del producto</p>
              <h3>{project.summary}</h3>
              <p>{project.problem}</p>
              <ul className="tech-tags" aria-label="Tecnologías del proyecto">
                {project.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <Link className="text-link" href={"/projects/" + project.slug}>
                Entrar en el proyecto <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="observatory-outro">
        <span>De las piezas</span>
        <i aria-hidden="true" />
        <a href="#proyectos">al producto final ↓</a>
      </div>
    </section>
  );
}
