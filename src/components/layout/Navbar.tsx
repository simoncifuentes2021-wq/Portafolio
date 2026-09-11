"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { navLinks } from "@/data/navLinks";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Con el menú móvil abierto, el fondo no scrollea.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Menú abierto: congela el scroll de fondo y cierra con Escape.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <nav className="container flex h-16 items-center justify-between" aria-label="Navegación principal">
        <a href="#inicio" className="group inline-flex items-center gap-3" aria-label="Ir al inicio">
          <span className="grid h-8 w-8 place-items-center border border-line-strong font-display text-sm font-medium text-ink-strong">
            SC
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-muted sm:block">
            Simón Cifuentes
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
            >
              <span className="mr-1.5 text-[10px] text-muted/60">{link.index}</span>
              {link.label}
              {/* subrayado que crece desde la izquierda */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex" aria-label="Estado: disponible">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">Disponible</span>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <span className="font-mono text-sm leading-none">≡</span>}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-bg lg:hidden"
          >
            <div className="container flex h-full flex-col justify-start pt-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-baseline gap-4 border-b border-line py-5 font-display text-3xl text-ink-strong"
                  onClick={() => setOpen(false)}
                >
                  <span className="font-mono text-xs text-muted">{link.index}</span>
                  {link.label}
                </a>
              ))}
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
                Santiago, CL — Disponible
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}