"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Fondo ambiental tipo galería: grano de película sutil sobre #0A0A0A y
 * un radial #131313 que migra con el scroll Y con el ratón (parallax de
 * arrastre). Sin animación en reposo — solo responde al gesto del usuario.
 */
export function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.8 });
  // Scroll-driven: el radial deriva lateralmente y se estira al bajar.
  const scrollX = useTransform(smooth, [0, 1], ["-6%", "6%"]);
  const scrollY = useTransform(smooth, [0, 1], ["-4%", "10%"]);
  const scrollScale = useTransform(smooth, [0, 1], [1, 1.18]);

  // Mouse-driven: el radial sigue al cursor con retardo (profundidad).
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mx = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.5 });
  const my = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      // Normalizado -1..1 desde el centro de la ventana.
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      {/* grano de película: textura analógica fija, la capa que "materializa" el negro */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px",
        }}
      />
      {/* radial ambiental: capa de scroll + capa de ratón anidadas */}
      <motion.div className="absolute inset-[-25%]" style={{ x: mx, y: my }}>
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 580px at 50% 30%, #131313 0%, transparent 55%)",
            x: scrollX,
            y: scrollY,
            scale: scrollScale,
          }}
        />
      </motion.div>
    </div>
  );
}
