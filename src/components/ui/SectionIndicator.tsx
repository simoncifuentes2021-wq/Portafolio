"use client";
import { navLinks } from "@/data/navLinks";
import { useActiveSection } from "@/lib/useActiveSection";
export function SectionIndicator() {
  const active = useActiveSection();
  if (!active) return null;
  return (
    <nav
      className="section-indicator"
      data-paper={active === "sobre-mi"}
      aria-label="Secciones de la página"
    >
      {[
        { label: "Inicio", href: "/#inicio" },
        { label: "Observatorio", href: "/#observatorio" },
        ...navLinks,
      ].map((link) => (
        <a
          key={link.href}
          href={link.href}
          aria-label={link.label}
          aria-current={
            active === link.href.split("#")[1] ? "location" : undefined
          }
        >
          <span />
          <b className="section-tooltip" aria-hidden="true">
            {link.label}
          </b>
        </a>
      ))}
    </nav>
  );
}
