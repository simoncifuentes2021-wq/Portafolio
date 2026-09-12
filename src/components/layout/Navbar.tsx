"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks } from "@/data/navLinks";
import { useActiveSection } from "@/lib/useActiveSection";

export function Navbar() {
  const pathname = usePathname();
  const activeSection = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 15);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const dialog = menu.current;
    const triggerButton = trigger.current;
    if (!dialog || !open) return;
    const previous = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    const media = matchMedia("(min-width: 768px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", resize);
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
      media.removeEventListener("change", resize);
      triggerButton?.focus({ preventScroll: true });
    };
  }, [open]);
  function close() {
    setOpen(false);
  }
  return (
    <header className="site-header" data-scrolled={scrolled}>
      <nav className="container navbar" aria-label="Navegación principal">
        <Link
          href="/#inicio"
          className="brand"
          aria-label="Simón Cifuentes, inicio"
        >
          <span className="brand-mark">sc.</span>
          <span className="brand-name">
            Simón Cifuentes<small>DESARROLLADOR FULLSTACK</small>
          </span>
        </Link>
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                pathname.startsWith("/projects") && link.index === "01"
                  ? "page"
                  : pathname === "/contact" && link.index === "05"
                    ? "page"
                    : activeSection === link.href.split("#")[1]
                      ? "location"
                      : undefined
              }
            >
              <span>{link.index}</span>
              {link.label}
            </Link>
          ))}
        </div>
        <a
          className="nav-contact"
          href={pathname === "/" ? "#contacto" : "/contact"}
        >
          Conversemos <ArrowUpRight size={13} />
        </a>
        <button
          ref={trigger}
          className="menu-toggle"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <Menu size={19} />
        </button>
      </nav>
      <dialog
        ref={menu}
        id="mobile-navigation"
        className="mobile-menu"
        aria-label="Menú de navegación"
        onCancel={close}
        onClose={close}
      >
        <div className="mobile-menu-head">
          <span className="brand-name">Simón Cifuentes</span>
          <button type="button" onClick={close} aria-label="Cerrar menú">
            <X size={22} />
          </button>
        </div>
        <nav aria-label="Navegación móvil">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={close}>
              <span>{link.index}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="eyebrow">
          Temuco, Chile · Disponible para nuevos desafíos
        </p>
      </dialog>
    </header>
  );
}
