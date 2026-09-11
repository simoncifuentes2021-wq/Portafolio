"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { DrawnRule } from "@/components/ui/DrawnRule";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "./ProjectPreview";
import { projects } from "@/data/projects";

export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  // Posición del preview flotante; spring para que "persiga" al cursor.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 180, damping: 22, mass: 0.5 });
  const finePointer = useRef(true);
  const reduceMotion = useReducedMotion();

  // Velocidad de scroll → skew sutil del listado (efecto editorial).
  // Solo puntero fino: el scroll táctil tiene velocidad alta constante y
  // deformaría las filas en móvil.
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 220, damping: 40, mass: 0.6 });
  const skewY = useTransform(smoothVelocity, [-1600, 0, 1600], [-2.2, 0, 2.2], { clamp: true });
  const velOpacity = useTransform(smoothVelocity, [0, 800], [1, 0.82], { clamp: true });

  useEffect(() => {
    finePointer.current = !matchMedia("(pointer: coarse)").matches;
  }, []);

  function onRowMove(e: React.PointerEvent) {
    if (!finePointer.current) return;
    px.set(e.clientX + 28);
    py.set(e.clientY);
  }

  return (
    <section id="proyectos" className="section-shell">
      <SectionHeader index="02" title="Proyectos" lede="Tres proyectos reales, de la idea al despliegue." />

      <Reveal>
        <DrawnRule />
        <motion.div
          style={finePointer.current && !reduceMotion ? { skewY, opacity: velOpacity } : undefined}
        >
          {projects.map((project, index) => {
            const open = openSlug === project.slug;
            const hovered = hoveredSlug === project.slug;
            return (
              <article key={project.slug} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpenSlug(open ? null : project.slug)}
                  onPointerEnter={() => setHoveredSlug(project.slug)}
                  onPointerLeave={() => setHoveredSlug((s) => (s === project.slug ? null : s))}
                  onPointerMove={onRowMove}
                  aria-expanded={open}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-4 py-6 text-left transition-colors hover:bg-surface active:bg-surface sm:gap-8 sm:py-9"
                >
                  <motion.span
                    className={cn(
                      "font-display font-light leading-none transition-colors duration-300",
                      open
                        ? "text-[clamp(3.5rem,8vw,6.5rem)] text-accent"
                        : "text-[clamp(2.5rem,6vw,4.5rem)] text-muted/50 group-hover:text-accent",
                    )}
                    animate={{ scale: open ? 1.08 : 1 }}
                    transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.span>
                  <span className="min-w-0">
                    <span className="block font-display text-xl font-medium tracking-[-0.01em] text-ink-strong transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
                      {project.name}
                    </span>
                    <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:text-[11px] sm:tracking-[0.18em]">
                      {project.type} · {project.year} · {project.technologies.slice(0, 3).join(" · ")}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-xl text-muted transition-all duration-300 group-hover:text-accent"
                    style={{ transform: open ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 lg:grid-cols-[1.1fr_0.9fr]">
                        <div>
                          <p className="label-mono">Rol — {project.role}</p>
                          <p className="mt-4 max-w-[58ch] leading-[1.75] text-ink">{project.description}</p>
                          <ul className="mt-6 space-y-2">
                            {project.demonstrates.map((item) => (
                              <li key={item} className="flex items-baseline gap-3 font-mono text-sm text-muted">
                                <span aria-hidden="true" className="text-accent">—</span> {item}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-7 flex flex-wrap gap-3">
                            <a href={project.demoUrl} className="btn btn-primary group min-h-9 px-4 py-1.5 text-xs">
                              Ver demo <span className="btn-arrow" aria-hidden="true">→</span>
                            </a>
                            <a href={project.codeUrl} className="btn btn-secondary group min-h-9 px-4 py-1.5 text-xs">
                              Ver código <span className="btn-arrow" aria-hidden="true">↗</span>
                            </a>
                          </div>
                        </div>
                        <div className="relative aspect-[16/10] overflow-hidden border border-line bg-surface">
                          <Image
                            src={project.image}
                            alt={`Vista previa de ${project.name}`}
                            fill
                            className="object-cover opacity-80"
                            sizes="(min-width: 1024px) 45vw, 100vw"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {/* Preview flotante solo para la fila en hover */}
                {hovered && !open ? (
                  <ProjectPreview image={project.image} name={project.name} active x={sx} y={sy} />
                ) : null}
              </article>
            );
          })}
        </motion.div>
      </Reveal>
    </section>
  );
}