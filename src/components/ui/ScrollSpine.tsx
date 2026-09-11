"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Espina de scroll: hairline vertical en el borde izquierdo que se
 * dibuja con el avance de lectura — el "circuito" que recorre las
 * secciones. Solo desktop.
 */
export function ScrollSpine() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.5 });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 left-6 z-40 hidden lg:block">
      {/* riel completo */}
      <div className="absolute inset-y-0 left-0 w-px bg-line/60" />
      {/* trazo que avanza */}
      <motion.div className="absolute inset-y-0 left-0 w-px origin-top bg-accent/70" style={{ scaleY }} />
      {/* nodos en cada sección */}
      {["12%", "30%", "52%", "72%", "92%"].map((top) => (
        <span key={top} className="absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-line-strong" style={{ top }} />
      ))}
    </div>
  );
}