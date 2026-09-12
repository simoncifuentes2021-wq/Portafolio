"use client";
import { useState } from "react";
import { ArrowRight, Check, Code2, Focus, Rocket, Route } from "lucide-react";

const steps = [
  {
    title: "Entender",
    icon: Focus,
    text: "Primero, la pregunta correcta. Qué necesita resolver la persona y qué debe hacer el producto para ayudarla.",
    label: "Un problema, bien definido.",
    code: "problema → contexto → propósito",
  },
  {
    title: "Diseñar",
    icon: Route,
    text: "Traduzco esa necesidad en un recorrido claro: pantallas, acciones y una arquitectura que las conecta.",
    label: "Cada decisión tiene una razón.",
    code: "estructura → interfaz → recorrido",
  },
  {
    title: "Construir",
    icon: Code2,
    text: "Conecto interfaz, API y datos. Componentes con responsabilidades claras y validación en cada frontera.",
    label: "Las partes se convierten en sistema.",
    code: "frontend ↔ API ↔ base de datos",
  },
  {
    title: "Entregar",
    icon: Rocket,
    text: "Reviso responsive, accesibilidad y carga. El trabajo termina cuando la experiencia funciona de punta a punta.",
    label: "Listo para usarse.",
    code: "revisar → ajustar → desplegar",
  },
] as const;

export function ProcessExplorer() {
  const [active, setActive] = useState(0);
  const Icon = steps[active].icon;
  return (
    <div className="process-explorer">
      <div className="process-top">
        <span className="eyebrow">Mi forma de trabajar</span>
        <span className="eyebrow">Del problema al producto</span>
      </div>
      <div
        className="process-steps"
        role="group"
        aria-label="Explorar mi proceso de desarrollo"
      >
        {steps.map((step, i) => (
          <button
            key={step.title}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-controls="process-detail"
          >
            <span>{i < active ? <Check size={12} /> : "0" + (i + 1)}</span>
            {step.title}
            <ArrowRight size={14} />
          </button>
        ))}
      </div>
      <div className="process-detail" id="process-detail" aria-live="polite">
        <div className="process-graphic" data-step={active} aria-hidden="true">
          <i />
          <i />
          <i />
          <span>
            <Icon size={26} strokeWidth={1.3} />
          </span>
        </div>
        <div>
          <h3>{steps[active].label}</h3>
          <p>{steps[active].text}</p>
          <span className="process-code">{steps[active].code}</span>
        </div>
      </div>
    </div>
  );
}
