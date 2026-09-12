import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessExplorer } from "@/components/interactive/ProcessExplorer";
import { socialLinks } from "@/data/socialLinks";

export function About() {
  return (
    <section
      id="sobre-mi"
      className="about-section"
      aria-labelledby="about-title"
    >
      <div className="container about-layout">
        <div className="about-heading">
          <p className="section-index">
            <span>02</span>
            <span className="index-line" />
            Detrás del código
          </p>
          <Reveal variant="mask">
            <h2 id="about-title">
              Entender primero.
              <br />
              <em>Construir mejor.</em>
            </h2>
          </Reveal>
          <div className="about-signature">
            <span className="signature-mark">sc.</span>
            <div>
              <strong>Simón Cifuentes</strong>
              <span>Desarrollador Fullstack · Temuco, CL</span>
            </div>
          </div>
        </div>
        <div className="about-copy">
          <Reveal>
            <p className="about-lead">
              Me interesa lo que pasa entre una buena idea y un producto que
              alguien puede usar.
            </p>
            <p>
              Estudio el último año de Ingeniería Civil Informática y construyo
              productos web completos: interfaces con React y Next.js, APIs con
              FastAPI y datos en PostgreSQL.
            </p>
            <p>
              Prefiero resolver el problema de fondo antes que acumular
              funcionalidades. Software que carga rápido, comunica con claridad
              y está pensado de principio a fin.
            </p>
            <p>
              Busco mi primera experiencia profesional: prácticas, proyectos o
              freelance, donde aportar, construir y aprender de un equipo.
            </p>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Conoce mi perfil <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>
        <ProcessExplorer />
      </div>
    </section>
  );
}
