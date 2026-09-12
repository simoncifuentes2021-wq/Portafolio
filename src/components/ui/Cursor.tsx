"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hot, setHot] = useState(false);
  const [label, setLabel] = useState("");
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 230, damping: 29 });
  const sy = useSpring(y, { stiffness: 230, damping: 29 });
  useEffect(() => {
    const media = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!enabled) return;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        setVisible(false);
        return;
      }
      x.set(event.clientX);
      y.set(event.clientY);
      const element = event.target instanceof Element ? event.target : null;
      const input = !!element?.closest("input, textarea, dialog");
      setVisible(!input);
      setHot(!!element?.closest("a, button"));
      setLabel(
        element?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? "",
      );
    };
    const hide = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [enabled, x, y]);
  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="cursor-follower"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <div className="cursor-ring" data-hot={hot} data-label={!!label}>
        {label}
      </div>
    </motion.div>
  );
}
