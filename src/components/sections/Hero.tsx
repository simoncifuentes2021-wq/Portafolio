import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Architecture } from "@/components/interactive/Architecture";

export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="container hero-topline">
        <span className="eyebrow">
          <span className="status-dot" /> Disponible para nuevos desafíos
        </span>
        <span className="eyebrow hero-location">
          Temuco, Chile <span aria-hidden="true">↗</span>
        </span>
      </div>
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow hero-kicker">
            Simón Cifuentes · Desarrollador Fullstack
          </p>
          <h1 id="hero-title" className="hero-title">
            <span className="text-mask">
              <span>Ideas claras.</span>
            </span>
            <span className="text-mask">
              <span>Software con</span>
            </span>
            <span className="text-mask">
              <em>intención.</em>
            </span>
          </h1>
          <p className="hero-description">
            Transformo problemas reales en productos digitales.
            <br className="desktop-break" /> De la primera interacción a la
            última línea de backend.
          </p>
          <div className="hero-actions">
            <MagneticButton href="#proyectos" className="btn btn-primary">
              Explorar proyectos <ArrowDown size={16} />
            </MagneticButton>
            <MagneticButton href="#contacto" className="text-link">
              Hablemos <ArrowUpRight size={17} />
            </MagneticButton>
          </div>
        </div>
        <Architecture />
      </div>
      <div className="container hero-bottom">
        <a href="#proyectos" className="scroll-cue">
          <span className="scroll-cue-icon">
            <ArrowDown size={14} />
          </span>
          <span>
            Del concepto al producto
            <br />
            <strong>Conoce mi trabajo</strong>
          </span>
        </a>
        <p className="hero-stack">
          <span className="eyebrow">Mi lenguaje de trabajo</span>
          <span>
            React <i /> Next.js <i /> FastAPI <i /> PostgreSQL
          </span>
        </p>
        <span className="hero-edition eyebrow">Portfolio / Vol. 01</span>
      </div>
    </section>
  );
}
