"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline lima bajo el navbar que mide el avance de lectura. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-16 z-50 h-px origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}