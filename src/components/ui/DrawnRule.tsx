"use client";

import { motion } from "framer-motion";

/**
 * Regla horizontal que se "dibuja" (escala desde 0) al entrar en vista.
 * Reemplaza a los .hairline estáticos de los listados editoriales.
 */
export function DrawnRule({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px w-full origin-left bg-line ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
    />
  );
}