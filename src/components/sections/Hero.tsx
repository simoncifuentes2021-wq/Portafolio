"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { WireframeStage } from "@/components/three/WireframeStage";
import type { WireframeControls } from "@/lib/three/TechWireframe";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { socialLinks } from "@/data/socialLinks";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const controlsRef = useRef<WireframeControls | null>(null);
  // Parallax de salida: el wireframe se hunde y desvanece al scrollear.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Scroll conduce la cámara del 3D (zoom + tilt) sin re-renderizar React.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    controlsRef.current?.setScrollProgress(p);
  });

  return (
    <section id="inicio" ref={sectionRef} className="relative overflow-hidden pt-16">
      <div className="container grid items-start gap-6 py-10 sm:py-12 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-6 lg:py-14">
        <motion.div style={{ y: textY }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="mb-8 flex items-baseline justify-between gap-4"
          >
            <p className="label-mono">Simón Cifuentes — Desarrollador Fullstack</p>
            <p className="label-mono hidden sm:block">(2026)</p>
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ink-strong">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease }}
            >
              La web,
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease }}
            >
              de punta a punta.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease }}
            className="mt-7 max-w-[54ch] text-base leading-[1.75] text-ink"
          >
            Diseño y construyo aplicaciones web completas: React y Next.js por delante, FastAPI y
            PostgreSQL por detrás. Estudiante de último año de Ingeniería Civil Informática, en
            Santiago de Chile. Sin plantillas, sin relleno: software terminado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44, ease }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            {/* En móvil los CTAs son botones grandes de pulgar completo */}
            <MagneticButton
              href="#proyectos"
              className="btn btn-primary group w-full sm:w-auto"
              onHotChange={(hot) => controlsRef.current?.setEmphasis(hot)}
            >
              Ver proyectos <span className="btn-arrow" aria-hidden="true">→</span>
            </MagneticButton>
            <MagneticButton
              href={`mailto:${socialLinks.email}`}
              className="btn btn-secondary group w-full sm:w-auto"
              onHotChange={(hot) => controlsRef.current?.setEmphasis(hot)}
            >
              Hablemos <span className="btn-arrow" aria-hidden="true">↗</span>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.58 }}
            className="mt-10 border-t border-line pt-4 sm:mt-14"
          >
            <p className="label-mono leading-[1.9]">
              Santiago, CL — Estado: Disponible
              <span aria-hidden="true" className="mx-1.5 hidden sm:inline">—</span>
              <span className="block sm:inline">React · Next.js · FastAPI · PostgreSQL</span>
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          style={{ y: stageY, opacity: stageOpacity }}
          className="relative order-first mx-auto aspect-square w-full max-w-[240px] sm:max-w-[300px] lg:order-none lg:max-w-[480px]"
        >
          {/* marcas de registro */}
          <span aria-hidden="true" className="absolute -left-3 -top-3 font-mono text-sm text-muted/70">+</span>
          <span aria-hidden="true" className="absolute -right-3 -top-3 font-mono text-sm text-muted/70">+</span>
          <span aria-hidden="true" className="absolute -bottom-3 -left-3 font-mono text-sm text-muted/70">+</span>
          <span aria-hidden="true" className="absolute -bottom-3 -right-3 font-mono text-sm text-muted/70">+</span>

          <WireframeStage variant="hero" interactive controlsRef={controlsRef} className="h-full w-full text-white/80" />
        </motion.div>
      </div>
    </section>
  );
}