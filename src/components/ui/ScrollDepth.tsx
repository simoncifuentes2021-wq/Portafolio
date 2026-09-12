"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export function ScrollDepth({ children }: { children: ReactNode }) {
  const target = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [12, 0, 0, -6],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [0.91, 1, 1, 0.96],
  );
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [24, 0, -20]);
  return (
    <div ref={target} className="scroll-depth-stage">
      <motion.div
        style={
          reduced
            ? undefined
            : { rotateX, scale, y, transformPerspective: 1100 }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
