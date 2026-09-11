"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Botón magnético: dentro de un radio de atracción, el contenido se
 * desplaza hacia el cursor (máx 6px) y vuelve con resorte al salir.
 * Solo punteros finos; el elemento sigue siendo un <a> normal.
 */
export function MagneticButton({
  href,
  children,
  className,
  onHotChange,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** Notifica hover enter/leave (para encender el anillo del 3D). */
  onHotChange?: (hot: boolean) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  function onMove(e: React.PointerEvent) {
    if (matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    // Atracción proporcional, limitada a 6px.
    x.set(Math.max(-6, Math.min(6, dx * 0.18)));
    y.set(Math.max(-6, Math.min(6, dy * 0.18)));
  }

  function onEnter() {
    onHotChange?.(true);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
    onHotChange?.(false);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.a>
  );
}