"use client";
import { useState } from "react";
import { ArrowUpRight, Layers3, MoveUpRight } from "lucide-react";
import { TiltSurface } from "@/components/ui/TiltSurface";
import { SystemPulse } from "./SystemPulse";

const layers = [
  {
    name: "Interfaz",
    tag: "React / Next.js",
    description:
      "Lo que ves. Interfaces claras que convierten una idea en una experiencia.",
  },
  {
    name: "Lógica",
    tag: "FastAPI / Node.js",
    description:
      "Lo que conecta. APIs y reglas de negocio que hacen que todo funcione.",
  },
  {
    name: "Datos",
    tag: "PostgreSQL / SQL",
    description:
      "Lo que sostiene. Información organizada para construir sobre una base sólida.",
  },
] as const;

export function Architecture() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [pulse, setPulse] = useState<number | null>(null);
  return (
    <div className="architecture" data-expanded={expanded} data-pulse={pulse}>
      <div className="architecture-meta">
        <span className="eyebrow">
          <span className="tiny-cross">+</span> Anatomía de una aplicación
        </span>
        <span className="eyebrow">FIG. 01</span>
      </div>
      <TiltSurface className="architecture-stage" intensity={10} enableTouch>
        <div className="architecture-halo" aria-hidden="true" />
        <div className="architecture-axis" aria-hidden="true">
          <span>Y</span>
          <span>X</span>
        </div>
        <div className="architecture-object" aria-hidden="true">
          <div className="system-plane plane-data" data-active={active === 2}>
            <div className="plane-caption">
              <span>03 / DATA LAYER</span>
              <span>SQL</span>
            </div>
            <div className="data-matrix">
              {Array.from({ length: 32 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <span className="plane-edge-label">PERSISTENCE</span>
          </div>
          <div className="system-plane plane-logic" data-active={active === 1}>
            <div className="plane-caption">
              <span>02 / LOGIC LAYER</span>
              <span>API</span>
            </div>
            <div className="logic-flow">
              <i />
              <span />
              <b>{"{ }"}</b>
              <span />
              <i />
            </div>
            <div className="logic-bars">
              <i />
              <i />
              <i />
            </div>
            <span className="plane-edge-label">CONNECTION</span>
          </div>
          <div
            className="system-plane plane-interface"
            data-active={active === 0}
          >
            <div className="plane-caption">
              <span>01 / INTERFACE LAYER</span>
              <span>UI</span>
            </div>
            <div className="mini-interface">
              <div className="mini-interface-nav">
                <b>SC.</b>
                <span />
                <span />
                <i />
              </div>
              <div className="mini-interface-body">
                <div>
                  <span />
                  <span />
                  <i />
                  <b>
                    <ArrowUpRight size={18} />
                  </b>
                </div>
                <div className="mini-interface-art">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
            <span className="plane-edge-label">EXPERIENCE</span>
          </div>
        </div>
        <span className="architecture-coordinate eyebrow" aria-hidden="true">
          IDEA → SYSTEM → PRODUCT
        </span>
      </TiltSurface>
      <div className="architecture-controls">
        <div
          className="layer-buttons"
          role="group"
          aria-label="Explorar las capas de una aplicación"
        >
          {layers.map((layer, index) => (
            <button
              key={layer.name}
              type="button"
              aria-pressed={active === index}
              aria-controls="layer-description"
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              {layer.name}
            </button>
          ))}
        </div>
        <button
          className="explode-button"
          type="button"
          aria-pressed={expanded}
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "Unir las capas" : "Separar las capas"}
        >
          <Layers3 size={17} />
        </button>
      </div>
      <div
        id="layer-description"
        className="layer-description"
        aria-live="polite"
      >
        <p>
          <span>{layers[active].tag}</span>
          <MoveUpRight size={13} />
        </p>
        <p>{layers[active].description}</p>
      </div>
      <SystemPulse onStage={setPulse} />
    </div>
  );
}
