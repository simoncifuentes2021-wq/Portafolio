"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type MutableRefObject } from "react";
import { WireframeSVG } from "./WireframeSVG";
import type { WireframeControls } from "@/lib/three/TechWireframe";

/** El wireframe SVG "dibujándose": placeholder mientras llega el chunk 3D. */
function DrawingPlaceholder() {
  return (
    <div aria-hidden="true" className="flex h-full w-full items-center justify-center">
      <div className="h-[70%] w-[70%] text-white/60">
        <WireframeSVG variant="full" />
      </div>
    </div>
  );
}

const WireframeCanvas = dynamic(
  () => import("./WireframeCanvas").then((m) => m.WireframeCanvas),
  {
    ssr: false,
    // El SVG pinta el primer frame (LCP-safe) y se dibuja trazo a trazo
    // mientras llega el chunk 3D.
    loading: () => <DrawingPlaceholder />,
  },
);

function canUseWebGL2() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

type StageMode = "checking" | "svg" | "canvas";

export function WireframeStage({
  variant = "hero",
  interactive = true,
  className,
  controlsRef,
}: {
  /** "hero": pantalla completa del sello; "motif": versión pequeña fija. */
  variant?: "hero" | "motif";
  interactive?: boolean;
  className?: string;
  controlsRef?: MutableRefObject<WireframeControls | null>;
}) {
  // El chequeo de WebGL ocurre tras el montaje: servidor y primer render
  // del cliente pintan el mismo SVG, y el canvas entra después (sin fallo
  // de hidratación y con el chunk 3D fuera del primer paint).
  const [stage, setStage] = useState<{ mode: StageMode; reduced: boolean }>({
    mode: "checking",
    reduced: false,
  });

  useEffect(() => {
    // Debug: ?no3d=1 fuerza el SVG; ?nomotion=1 fuerza reduced motion;
    // ?motion=1 ignora la preferencia del sistema y fuerza animación.
    const params = new URLSearchParams(window.location.search);
    const forceMotion = params.has("motion");
    const reduced =
      !forceMotion &&
      (params.has("nomotion") ||
        matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (params.has("no3d")) {
      setStage({ mode: "svg", reduced });
      return;
    }
    setStage({ mode: canUseWebGL2() ? "canvas" : "svg", reduced });
  }, []);

  if (variant === "motif") {
    // Misma escena 3D en miniatura; SVG estático solo si no hay WebGL.
    if (stage.mode !== "canvas") {
      return <WireframeSVG variant="motif" className={className} />;
    }
    return <WireframeCanvas variant="motif" interactive={false} reducedMotion={stage.reduced} className={className} />;
  }

  if (stage.mode !== "canvas") {
    return <WireframeSVG variant="full" className={`text-white/80 ${className ?? ""}`} />;
  }

  return (
    <WireframeCanvas
      interactive={interactive}
      reducedMotion={stage.reduced}
      className={className}
      controlsRef={controlsRef}
    />
  );
}