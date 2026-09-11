"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "inicio", index: "00" },
  { id: "sobre-mi", index: "01" },
  { id: "proyectos", index: "02" },
  { id: "servicios", index: "03" },
  { id: "contacto", index: "04" },
];

/** Índice de sección activa, fijo al borde derecho (estética de plano). */
export function SectionIndicator() {
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Franja central de la pantalla decide la sección visible.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Progreso de la página"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {SECTIONS.map(({ id, index }) => {
        const isActive = active === id;
        return (
          <a key={id} href={`#${id}`} className="group flex items-center gap-2 py-0.5">
            <span
              className={cn(
                "font-mono text-[10px] tracking-[0.18em] transition-colors duration-300",
                isActive ? "text-accent" : "text-muted/50 group-hover:text-muted",
              )}
            >
              {index}
            </span>
            <motion.span
              aria-hidden="true"
              className="h-px bg-current"
              animate={{
                width: isActive ? 28 : 12,
                color: isActive ? "var(--accent)" : "var(--line-strong)",
              }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            />
          </a>
        );
      })}
    </nav>
  );
}