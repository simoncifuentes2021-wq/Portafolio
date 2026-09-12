"use client";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
export function MagneticButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22 }),
    sy = useSpring(y, { stiffness: 220, damping: 22 });
  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={reduced ? undefined : { x: sx, y: sy }}
      onPointerMove={(event) => {
        if (
          reduced ||
          event.pointerType !== "mouse" ||
          !matchMedia("(hover: hover) and (pointer: fine)").matches
        )
          return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set(
          Math.max(
            -4,
            Math.min(4, (event.clientX - rect.left - rect.width / 2) * 0.1),
          ),
        );
        y.set(
          Math.max(
            -4,
            Math.min(4, (event.clientY - rect.top - rect.height / 2) * 0.1),
          ),
        );
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}
