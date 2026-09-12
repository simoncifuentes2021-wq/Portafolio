"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navLinks";

export function useActiveSection() {
  const pathname = usePathname();
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = [
      "inicio",
      "observatorio",
      ...navLinks.map((link) => link.href.split("#")[1]),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [pathname]);
  return pathname === "/" ? active : null;
}
