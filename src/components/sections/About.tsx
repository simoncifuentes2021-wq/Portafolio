import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { WireframeStage } from "@/components/three/WireframeStage";
import { specSheet, stackTable } from "@/data/skills";

export function About() {
  return (
    <section id="sobre-mi" className="section-shell">
      <SectionHeader index="01" title="Sobre mí" lede="Un ingeniero en formación que construye software real." />

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <div className="section-copy [&>p]:mt-0">
            <p>
              Soy Simón. Estudio el último año de Ingeniería Civil Informática y construyo productos
              web completos: interfaces con React y Next.js, APIs con FastAPI, datos en PostgreSQL.
            </p>
            <p className="mt-5">
              Me interesa el software bien terminado — el que carga rápido, no se rompe a mitad de
              camino y comunica con claridad. Prefiero resolver el problema de fondo antes que
              acumular features: menos capas, mejor pensadas.
            </p>
            <p className="mt-5">
              Busco mi primera experiencia profesional: proyectos, prácticas o freelance, donde
              llevar productos de punta a punta y aprender de gente que lleva más años en esto.
            </p>
          </div>

          <div className="mx-auto mt-10 h-56 w-56 sm:h-64 sm:w-64 lg:mx-0 lg:h-80 lg:w-80">
            <WireframeStage variant="motif" interactive={false} />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="label-mono mb-4">Ficha técnica</p>
          <dl>
            {specSheet.map((row) => (
              <div key={row.label} className="spec-row">
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>

          {/* tabla técnica del stack, estilo spec-sheet */}
          <div className="mt-10 border border-line bg-surface/60 p-5 font-mono text-xs leading-6">
            {stackTable.map((row) => (
              <div key={row.area} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line/60 py-2 last:border-b-0">
                <span className="text-muted">{row.area}</span>
                <span className="text-ink">{row.tools}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}