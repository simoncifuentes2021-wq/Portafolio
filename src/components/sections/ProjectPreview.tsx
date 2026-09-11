"use client";

import Image from "next/image";
import { AnimatePresence, motion, type MotionValue } from "framer-motion";

/**
 * Preview flotante que sigue el cursor sobre las filas de proyectos.
 * El contenedor padre reporta la posición (MotionValues ya con spring).
 * Solo se monta en punteros finos; la imagen expandida al click sigue
 * siendo la vía accesible y táctil.
 */
export function ProjectPreview({
  image,
  name,
  active,
  x,
  y,
}: {
  image: string;
  name: string;
  active: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-30 hidden h-44 w-72 -translate-y-1/2 overflow-hidden border border-line-strong bg-bg lg:block"
          style={{ x, y }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Image src={image} alt="" fill className="object-cover" sizes="288px" />
          <span className="absolute bottom-2 right-2 border border-line bg-bg/85 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {name}
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}