"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { socialLinks } from "@/data/socialLinks";
import { contactSchema, type ContactFormValues } from "@/lib/validations";

export function Contact() {
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus(null);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = (await response.json()) as { message?: string };

    if (!response.ok) {
      setStatus({ type: "error", message: data.message ?? "No se pudo enviar el mensaje." });
      return;
    }

    setStatus({ type: "success", message: data.message ?? "Mensaje enviado correctamente." });
    reset();
  }

  return (
    <section id="contacto" className="section-shell">
      <SectionHeader index="04" title="Contacto" lede="Hablemos. El café corre por mi cuenta." />

      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="section-copy [&>p]:mt-0">
            Estoy disponible para proyectos web, prácticas profesionales y freelance. Cuéntame qué
            necesitas construir y te respondo con una propuesta concreta.
          </p>
          <div className="mt-8 space-y-1">
            <a
              href={`mailto:${socialLinks.email}`}
              className="spec-row block hover:text-accent"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Email</span>
              <span className="font-mono text-sm">{socialLinks.email}</span>
            </a>
            <a href={socialLinks.github} className="spec-row block hover:text-accent">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">GitHub</span>
              <span className="font-mono text-sm">{socialLinks.github.replace("https://", "")}</span>
            </a>
            <a href={socialLinks.linkedin} className="spec-row block hover:text-accent">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">LinkedIn</span>
              <span className="font-mono text-sm">{socialLinks.linkedin.replace("https://", "")}</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form className="grid gap-7" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="name" className="label-mono mb-2 block">
                Nombre
              </label>
              <Input id="name" placeholder="Tu nombre" autoComplete="name" {...register("name")} />
              {errors.name ? <p className="mt-2 font-mono text-xs text-accent">{errors.name.message}</p> : null}
            </div>
            <div>
              <label htmlFor="email" className="label-mono mb-2 block">
                Email
              </label>
              <Input id="email" type="email" placeholder="tu@email.com" autoComplete="email" {...register("email")} />
              {errors.email ? <p className="mt-2 font-mono text-xs text-accent">{errors.email.message}</p> : null}
            </div>
            <div>
              <label htmlFor="message" className="label-mono mb-2 block">
                Mensaje
              </label>
              <Textarea
                id="message"
                placeholder="Cuéntame brevemente qué necesitas construir."
                {...register("message")}
              />
              {errors.message ? (
                <p className="mt-2 font-mono text-xs text-accent">{errors.message.message}</p>
              ) : null}
            </div>
            <Button type="submit" disabled={isSubmitting} variant="primary" className="group w-full sm:w-auto">
              {isSubmitting ? <Loader2 className="animate-spin" size={15} /> : <Send size={15} />}
              Enviar mensaje
            </Button>
            {status ? (
              <p
                className={
                  status.type === "success"
                    ? "font-mono text-sm text-accent"
                    : "font-mono text-sm text-red-400"
                }
              >
                {status.message}
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
}