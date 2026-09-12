"use client";
import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "rise",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "rise" | "slide" | "depth" | "mask";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.dataset.reveal = "waiting";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.dataset.reveal = "visible";
          observer.disconnect();
        }
      },
      { threshold: 0.06 },
    );
    // Observe outside the mask: a fully clipped target cannot intersect.
    observer.observe(variant === "mask" ? (el.parentElement ?? el) : el);
    return () => {
      observer.disconnect();
      delete el.dataset.reveal;
    };
  }, [variant]);
  return (
    <div
      ref={ref}
      className={cn("reveal", "reveal-" + variant, className)}
      style={{ "--reveal-delay": delay + "s" } as CSSProperties}
    >
      {children}
    </div>
  );
}
