"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navLinks";
export function SectionIndicator() {
  const pathname = usePathname();
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px" },
    );
    ["inicio", ...navLinks.map((link) => link.href.split("#")[1])].forEach(
      (id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      },
    );
    return () => observer.disconnect();
  }, [pathname]);
  if (pathname !== "/") return null;
  return (
    <nav className="section-indicator" aria-label="Secciones de la página">
      {[{ label: "Inicio", href: "/#inicio" }, ...navLinks].map((link) => (
        <a
          key={link.href}
          href={link.href}
          aria-label={link.label}
          aria-current={
            active === link.href.split("#")[1] ? "location" : undefined
          }
        >
          <span />
        </a>
      ))}
    </nav>
  );
}
