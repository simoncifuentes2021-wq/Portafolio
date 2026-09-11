import { Github, Linkedin, Mail } from "lucide-react";
import { navLinks } from "@/data/navLinks";
import { socialLinks } from "@/data/socialLinks";
import { WireframeStage } from "@/components/three/WireframeStage";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* sello de ingeniero: el 3D real, tenue, como marca de agua */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 hidden h-[380px] w-[380px] opacity-[0.22] md:block"
      >
        <WireframeStage variant="motif" interactive={false} />
      </div>
      <div className="container grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-4">
            <span className="grid h-9 w-9 place-items-center border border-line-strong font-display text-sm font-medium text-ink-strong">
              SC
            </span>
            <p className="font-display text-lg text-ink-strong">Simón Cifuentes</p>
          </div>
          <div className="mt-6 h-40 w-40 sm:h-56 sm:w-56">
            <WireframeStage variant="motif" interactive={false} />
          </div>
        </div>

        <nav aria-label="Navegación del pie de página" className="flex flex-col items-start gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
            >
              <span className="mr-1.5 text-[10px] text-muted/60">{link.index}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <dl>
          <div className="spec-row">
            <dt>Ubicación</dt>
            <dd>Santiago, CL</dd>
          </div>
          <div className="spec-row">
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${socialLinks.email}`} className="hover:text-accent">
                {socialLinks.email}
              </a>
            </dd>
          </div>
          <div className="spec-row">
            <dt>Estado</dt>
            <dd className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Disponible
            </dd>
          </div>
          <div className="mt-5 flex gap-3">
            <a
              href={socialLinks.github}
              aria-label="GitHub"
              className="border border-line p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Github size={18} />
            </a>
            <a
              href={socialLinks.linkedin}
              aria-label="LinkedIn"
              className="border border-line p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${socialLinks.email}`}
              aria-label="Correo"
              className="border border-line p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Mail size={18} />
            </a>
          </div>
        </dl>
      </div>

      <div
        className="border-t border-line py-5"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <p className="container font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          © {year} — Diseñado y construido a mano, en Santiago.
        </p>
      </div>
    </footer>
  );
}