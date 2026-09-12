"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check, Copy, Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { socialLinks } from "@/data/socialLinks";
import { contactSchema, type ContactFormValues } from "@/lib/validations";

export function Contact({
  standalone = false,
  projectName,
  serviceTitle,
}: {
  standalone?: boolean;
  projectName?: string;
  serviceTitle?: string;
}) {
  const [topic, setTopic] = useState("project");
  const messageTemplates = {
    project: projectName
      ? "Hola Simón, me gustaría saber más sobre " + projectName + "."
      : serviceTitle
        ? "Hola Simón, me gustaría conversar sobre " + serviceTitle + "."
        : "Hola Simón, tengo una idea de proyecto y me gustaría conversar contigo.",
    opportunity:
      "Hola Simón, me gustaría conversar sobre una oportunidad profesional.",
    conversation: "Hola Simón, me gustaría conversar contigo sobre…",
  };
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: projectName || serviceTitle ? messageTemplates.project : "",
    },
  });
  function selectTopic(next: keyof typeof messageTemplates) {
    setTopic(next);
    const current = getValues("message");
    if (!current.trim() || Object.values(messageTemplates).includes(current))
      setValue("message", messageTemplates[next], { shouldDirty: true });
  }
  async function onSubmit(values: ContactFormValues) {
    setStatus(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(15000),
      });
      const data: { message?: string } = await response.json();
      if (!response.ok) {
        setStatus({
          type: "error",
          message:
            data.message ??
            "No se pudo enviar. Puedes escribirme directamente por correo.",
        });
        return;
      }
      setStatus({
        type: "success",
        message: data.message ?? "Mensaje enviado. Gracias por escribir.",
      });
      reset();
    } catch {
      setStatus({
        type: "error",
        message:
          "No se pudo conectar. Intenta nuevamente o escríbeme directamente por correo.",
      });
    }
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(socialLinks.email);
      setCopied(true);
      setCopyStatus("Correo copiado.");
    } catch {
      setCopyStatus("No se pudo copiar. Puedes usar el enlace de correo.");
    }
  }
  const Heading = standalone ? "h1" : "h2";
  return (
    <section id="contacto" className="section-shell contact-section">
      <p className="section-index">
        <span>05</span>
        <span className="index-line" />
        El próximo proyecto
      </p>
      <div className="contact-heading">
        <Reveal variant="mask">
          <Heading>
            Hagamos que
            <br />
            <em>las ideas sucedan.</em>
          </Heading>
        </Reveal>
        <a
          href={"mailto:" + socialLinks.email}
          className="contact-orbit-link"
          aria-label="Escribir a Simón por correo"
        >
          <ArrowUpRight />
        </a>
      </div>
      <div className="contact-layout">
        <div className="contact-copy">
          <p>
            ¿Tienes algo en mente? Estoy disponible para proyectos web,
            prácticas profesionales y freelance. Cuéntame qué necesitas
            construir.
          </p>
          <a className="contact-email" href={"mailto:" + socialLinks.email}>
            {socialLinks.email}
            <ArrowUpRight size={16} />
          </a>
          <div className="contact-socials">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowUpRight size={12} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={12} />
            </a>
            <button type="button" onClick={copyEmail} className="copy-email">
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copiado" : "Copiar correo"}
            </button>
          </div>
          <p className="sr-only" role="status">
            {copyStatus}
          </p>
          <span className="contact-note">
            <span className="status-dot" />
            Temuco, Chile · Abierto a nuevas oportunidades
          </span>
        </div>
        <form
          className="contact-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Enviar un mensaje"
          aria-busy={isSubmitting}
        >
          <fieldset className="contact-topics">
            <legend>¿Qué te trae por aquí?</legend>
            <div>
              {(
                [
                  ["project", "Un proyecto"],
                  ["opportunity", "Una oportunidad"],
                  ["conversation", "Una conversación"],
                ] as const
              ).map(([value, label]) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="contact-topic"
                    value={value}
                    checked={topic === value}
                    onChange={() => selectTopic(value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {(projectName || serviceTitle) && (
            <p className="contact-context">
              Conversemos sobre <strong>{projectName ?? serviceTitle}</strong>
            </p>
          )}
          <div className="form-row">
            <div>
              <label htmlFor="name">Tu nombre</label>
              <Input
                id="name"
                placeholder="¿Cómo te llamas?"
                autoComplete="name"
                maxLength={100}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name")}
              />
              {errors.name && (
                <p id="name-error" className="form-error" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email">Tu correo</label>
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                autoComplete="email"
                maxLength={254}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              {errors.email && (
                <p id="email-error" className="form-error" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="message">Hablemos de tu idea</label>
            <Textarea
              id="message"
              placeholder="Qué tienes en mente, qué necesitas resolver…"
              maxLength={5000}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              {...register("message")}
            />
            {errors.message && (
              <p id="message-error" className="form-error" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting} variant="primary">
            {isSubmitting ? "Enviando mensaje…" : "Iniciemos una conversación"}
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Send size={15} />
            )}
          </Button>
          {status && (
            <p
              role={status.type === "error" ? "alert" : "status"}
              className="form-status"
              data-type={status.type}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
