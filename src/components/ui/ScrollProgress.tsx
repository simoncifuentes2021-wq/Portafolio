"use client";
import { motion, useScroll } from "framer-motion";
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      className="reading-progress"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
