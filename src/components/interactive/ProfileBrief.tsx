"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, X } from "lucide-react";
import { socialLinks } from "@/data/socialLinks";

export function ProfileBrief() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    if (!open || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="brief-trigger"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-controls="profile-brief"
      >
        Mi perfil en breve <ArrowUpRight size={15} />
      </button>
      <dialog
        ref={dialogRef}
        id="profile-brief"
        className="profile-brief"
        aria-labelledby="brief-title"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            setOpen(false);
        }}
      >
        <div className="brief-topline">
          <span className="eyebrow">Simón Cifuentes / Perfil profesional</span>
          <button
            type="button"
            className="brief-close"
            onClick={() => setOpen(false)}
            aria-label="Cerrar resumen del perfil"
          >
            <X size={20} />
          </button>
        </div>
        <span className="brief-monogram" aria-hidden="true">
          sc.
        </span>
        <h2 id="brief-title">
          Lo esencial,
          <br />
          <em>en un vistazo.</em>
        </h2>
        <p className="brief-intro">
          Desarrollador fullstack en Temuco, Chile. Construyo la interfaz, la
          API y los datos que convierten una idea en un producto web.
        </p>
        <dl className="brief-facts">
          <div>
            <dt>Formación</dt>
            <dd>Último año de Ingeniería Civil Informática</dd>
          </div>
          <div>
            <dt>Enfoque</dt>
            <dd>React · Next.js · FastAPI · PostgreSQL</dd>
          </div>
          <div>
            <dt>Qué busco</dt>
            <dd>
              Primera experiencia profesional, prácticas y proyectos freelance
            </dd>
          </div>
        </dl>
        <div className="brief-work">
          <span className="eyebrow">Un buen punto de partida</span>
          <Link
            href="/projects/reservas-deportivas"
            onClick={() => setOpen(false)}
          >
            Reservas deportivas <span>Frontend + API + datos</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="brief-actions">
          <a className="btn btn-primary" href={"mailto:" + socialLinks.email}>
            Conversemos <ArrowRight size={16} />
          </a>
          <a
            className="text-link"
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver LinkedIn <ArrowUpRight size={16} />
          </a>
        </div>
      </dialog>
    </>
  );
}
