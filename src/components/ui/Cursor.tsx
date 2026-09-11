"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Cursor técnico: punto lima con anillo que lo sigue con retardo.
 * Sobre elementos interactivos el anillo se expande y muestra esquinas
 * de mira. Solo en punteros finos; no reemplaza al cursor nativo.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [targeting, setTargeting] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });
  const hotRef = useRef(false);
  const targetRef = useRef(false);

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      const isHot = !!el?.closest("a, button, input, textarea");
      const isTarget = !isHot && !!el?.closest('[data-cursor="target"]');
      if (isHot !== hotRef.current) {
        hotRef.current = isHot;
        setHot(isHot);
      }
      if (isTarget !== targetRef.current) {
        targetRef.current = isTarget;
        setTargeting(isTarget);
      }
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* punto exacto */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x, y }}
      />
      {/* anillo con retardo */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[59] -translate-x-1/2 -translate-y-1/2"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="relative border border-accent"
          animate={{
            width: hot ? 44 : targeting ? 56 : 26,
            height: hot ? 44 : targeting ? 56 : 26,
            opacity: pressed ? 0.45 : 1,
            rotate: hot ? 45 : 0,
            borderRadius: targeting ? "50%" : "0%",
          }}
          transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ translateX: "-50%", translateY: "-50%" }}
        >
          {/* sobre el 3D: círculo de calibración con cruz */}
          {targeting ? (
            <>
              <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-accent" />
              <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-accent" />
            </>
          ) : null}
          {/* esquinas de mira cuando está sobre algo interactivo */}
          {hot ? (
            <>
              <span className="absolute -left-px -top-px h-1.5 w-1.5 border-l-2 border-t-2 border-accent" />
              <span className="absolute -right-px -top-px h-1.5 w-1.5 border-r-2 border-t-2 border-accent" />
              <span className="absolute -bottom-px -left-px h-1.5 w-1.5 border-b-2 border-l-2 border-accent" />
              <span className="absolute -bottom-px -right-px h-1.5 w-1.5 border-b-2 border-r-2 border-accent" />
            </>
          ) : null}
        </motion.div>
      </motion.div>
    </>
  );
}