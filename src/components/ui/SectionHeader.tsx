"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Encabezado de sección: índice mono + título que se revela desde una
 * máscara (sube desde abajo, recortado) al entrar en viewport.
 */
export function SectionHeader({
  index,
  title,
  lede,
  className,
}: {
  index: string;
  title: string;
  lede?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <header className={cn("mb-12", className)}>
      <motion.p
        className="section-index"
        initial={reduce ? false : { opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease }}
      >
        <span>{index}</span>
        <motion.span
          aria-hidden="true"
          className="h-px bg-line-strong"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          style={{ width: 32, transformOrigin: "left" }}
        />
        <span>{title}</span>
      </motion.p>

      {lede ? (
        // Máscara: el título emerge desde abajo. El padding negativo evita
        // recortar los descendentes (g, j, p) con el overflow-hidden.
        <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
          <motion.h2
            className="section-title"
            initial={reduce ? false : { y: "112%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease, delay: 0.06 }}
          >
            {lede}
          </motion.h2>
        </span>
      ) : null}
    </header>
  );
}
