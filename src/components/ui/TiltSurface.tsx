"use client";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { ReactNode, PointerEvent } from "react";

export function TiltSurface({
  children,
  className,
  intensity = 3,
  enableTouch = false,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  enableTouch?: boolean;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 130, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 130, damping: 24 });
  function move(event: PointerEvent<HTMLDivElement>) {
    if (
      reduced ||
      (event.pointerType !== "mouse" &&
        !(enableTouch && event.pointerType === "touch")) ||
      (event.pointerType === "mouse" &&
        !matchMedia("(hover: hover) and (pointer: fine)").matches)
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(
      (-(event.clientY - rect.top - rect.height / 2) / rect.height) * intensity,
    );
    y.set(
      ((event.clientX - rect.left - rect.width / 2) / rect.width) * intensity,
    );
  }
  return (
    <motion.div
      className={className}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={
        reduced ? undefined : { rotateX, rotateY, transformPerspective: 1000 }
      }
    >
      {children}
    </motion.div>
  );
}
