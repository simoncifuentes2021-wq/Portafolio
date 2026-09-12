"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const stages = [
  "Tu acción entra por la interfaz.",
  "La API interpreta la solicitud.",
  "Los datos completan la respuesta.",
  "El resultado vuelve a la persona.",
];

export function SystemPulse({
  onStage,
}: {
  onStage: (stage: number | null) => void;
}) {
  const [stage, setStage] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  function start() {
    timers.current.forEach(clearTimeout);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(3);
      onStage(null);
      return;
    }
    setStage(0);
    onStage(0);
    timers.current = [1, 2, 3].map((next) =>
      setTimeout(() => {
        setStage(next);
        onStage(next === 3 ? 0 : next);
      }, next * 850),
    );
    timers.current.push(setTimeout(() => onStage(null), 3400));
  }
  return (
    <div className="system-pulse-controls">
      <button type="button" onClick={start}>
        <Play size={13} />
        Recorrer una solicitud
      </button>
      <p role="status">
        {stage === null ? "Una acción. Tres capas conectadas." : stages[stage]}
      </p>
    </div>
  );
}
