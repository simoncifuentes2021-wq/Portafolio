"use client";

import { useEffect, useRef } from "react";
import { TechWireframe, type WireframeControls } from "@/lib/three/TechWireframe";

export function WireframeCanvas({
  variant = "hero",
  interactive = true,
  reducedMotion = false,
  className,
  controlsRef,
}: {
  /** "hero": sello grande; "motif": versión miniatura (Sobre mí / footer). */
  variant?: "hero" | "motif";
  interactive?: boolean;
  reducedMotion?: boolean;
  className?: string;
  controlsRef?: React.MutableRefObject<WireframeControls | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stage = new TechWireframe(el, { variant, interactive, reducedMotion });
    if (controlsRef) {
      controlsRef.current = {
        setScrollProgress: (p) => stage.setScrollProgress(p),
        setEmphasis: (on) => stage.setEmphasis(on),
      };
    }
    return () => {
      if (controlsRef) controlsRef.current = null;
      stage.dispose();
    };
  }, [variant, interactive, reducedMotion, controlsRef]);

  return <div ref={ref} data-cursor="target" className={className} aria-hidden="true" />;
}