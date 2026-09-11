import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { DrawnRule } from "@/components/ui/DrawnRule";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="servicios" className="section-shell">
      <SectionHeader index="03" title="Servicios" lede="Lo que hago, con nombre y código." />

      <Reveal>
        <DrawnRule />
        <div>
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-4 border-b border-line py-6 transition-colors hover:bg-surface sm:grid-cols-[3.5rem_1fr_auto] sm:gap-8"
            >
              <span className="pt-0.5 font-mono text-xs text-muted/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-medium text-ink-strong sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-1.5 max-w-[60ch] text-sm leading-7 text-muted">{service.description}</p>
              </div>
              <span className="col-span-2 pl-9 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-accent sm:col-span-1 sm:pl-0 sm:text-right sm:text-[11px] sm:tracking-[0.18em]">
                {service.tag}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}