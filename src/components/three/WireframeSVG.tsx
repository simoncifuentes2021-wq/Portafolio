type WireframeSVGProps = {
  /** "full": versión grande (marca de agua del footer); "motif": versión pequeña. */
  variant?: "full" | "motif";
  className?: string;
};

/**
 * Proyección axonométrica del wireframe 3D, dibujada a mano en SVG.
 * Sirve de: fallback sin WebGL, placeholder de carga del chunk 3D y
 * marca de agua decorativa (footer).
 *
 * La lectura 3D viene de tres convenciones del dibujo técnico:
 * 1. Cada paralelo de la jaula se parte en dos arcos: la mitad INFERIOR
 *    es el lado cercano (sólido) y la superior el lejano (punteado tenue),
 *    porque la vista está ligeramente elevada.
 * 2. La órbita lima también se parte: pasa por DETRÁS de la esfera
 *    (punteada) y reaparece por DELANTE (sólida) — envuelve el volumen
 *    en vez de flotar como un círculo plano.
 * 3. El núcleo icosaédrico vive DENTRO de la jaula, más chico (0.6),
 *    como en la escena 3D real (0.95 vs 1.15).
 */
export function WireframeSVG({ variant = "motif", className }: WireframeSVGProps) {
  const isFull = variant === "full";
  const m = (n: number) => (isFull ? n * 3 : n);
  const size = isFull ? 840 : 280;
  const cx = m(140);
  const cy = m(138);

  // Paralelos de la jaula: rx/ry proyectados + desplazamiento vertical.
  // front = opacidad del arco cercano; el lejano siempre va punteado 0.1.
  const latitudes = [
    { rx: m(102), ry: m(24), dy: 0, front: 0.34 }, // ecuador
    { rx: m(88), ry: m(21), dy: -m(46), front: 0.26 }, // paralelo norte
    { rx: m(88), ry: m(21), dy: m(46), front: 0.26 }, // paralelo sur
    { rx: m(52), ry: m(13), dy: -m(80), front: 0.2 }, // casquete norte
    { rx: m(52), ry: m(13), dy: m(80), front: 0.2 }, // casquete sur
  ];

  // Nube de puntos sobre la esfera (coordenadas base, radio 78–122).
  const dots: Array<[number, number]> = [
    [58, 96], [84, 62], [132, 44], [188, 58], [222, 92], [236, 148],
    [214, 196], [172, 228], [116, 232], [72, 204], [48, 158], [52, 118],
    [104, 104], [176, 110], [150, 178], [98, 168],
  ];

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      width="100%"
      height="100%"
      role="img"
      aria-label="Wireframe técnico"
      fill="none"
    >
      {/* silueta de la esfera */}
      <circle cx={cx} cy={cy} r={m(104)} stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />

      {/* meridianos (elipses verticales, tenues: simétricos frente/atrás) */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={m(34)}
        ry={m(100)}
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="1"
        strokeDasharray={`${m(4)} ${m(5)}`}
      />
      <ellipse
        cx={cx}
        cy={cy}
        rx={m(72)}
        ry={m(100)}
        stroke="currentColor"
        strokeOpacity="0.08"
        strokeWidth="1"
      />

      {/* paralelos: mitad inferior (cerca) sólida, superior (lejos) punteada */}
      <g fill="none" strokeWidth="1">
        {latitudes.map((l, i) => (
          <g key={i}>
            <path
              d={`M ${cx - l.rx} ${cy + l.dy} A ${l.rx} ${l.ry} 0 0 0 ${cx + l.rx} ${cy + l.dy}`}
              stroke="currentColor"
              strokeOpacity={l.front}
            />
            <path
              d={`M ${cx - l.rx} ${cy + l.dy} A ${l.rx} ${l.ry} 0 0 1 ${cx + l.rx} ${cy + l.dy}`}
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeDasharray={`${m(3)} ${m(5)}`}
            />
          </g>
        ))}
      </g>

      {/* núcleo icosaédrico dentro de la jaula (escala 0.6 sobre el centro) */}
      <g transform={`translate(${cx} ${cy}) scale(0.6) translate(${-cx} ${-cy})`}>
        <g stroke="currentColor" strokeOpacity="0.5" strokeWidth="1">
          {/* aristas frontales del icosaedro */}
          <line x1={m(140)} y1={m(52)} x2={m(216)} y2={m(96)} />
          <line x1={m(140)} y1={m(52)} x2={m(92)} y2={m(122)} />
          <line x1={m(140)} y1={m(52)} x2={m(140)} y2={m(40)} />
          <line x1={m(216)} y1={m(96)} x2={m(218)} y2={m(158)} />
          <line x1={m(218)} y1={m(158)} x2={m(140)} y2={m(190)} />
          <line x1={m(140)} y1={m(190)} x2={m(92)} y2={m(122)} />
          <line x1={m(92)} y1={m(122)} x2={m(76)} y2={m(172)} />
          <line x1={m(140)} y1={m(240)} x2={m(218)} y2={m(192)} />
          <line x1={m(140)} y1={m(240)} x2={m(70)} y2={m(196)} />
          <line x1={m(76)} y1={m(172)} x2={m(74)} y2={m(226)} />
          <line x1={m(70)} y1={m(196)} x2={m(74)} y2={m(226)} />
        </g>
        <g stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" strokeDasharray={`${m(4)} ${m(5)}`}>
          {/* aristas traseras */}
          <line x1={m(216)} y1={m(96)} x2={m(140)} y2={m(42)} />
          <line x1={m(140)} y1={m(42)} x2={m(92)} y2={m(122)} />
          <line x1={m(218)} y1={m(158)} x2={m(140)} y2={m(240)} />
          <line x1={m(76)} y1={m(172)} x2={m(140)} y2={m(190)} />
        </g>
      </g>

      {/* segunda órbita blanca, cruzada en otra inclinación (punteada fina) */}
      <g transform={`rotate(48 ${cx} ${cy})`}>
        <ellipse
          cx={cx}
          cy={cy}
          rx={m(116)}
          ry={m(38)}
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray={`${m(2)} ${m(6)}`}
        />
      </g>

      {/* órbita lima: envuelve la esfera — atrás punteada, adelante sólida */}
      <g transform={`rotate(-16 ${cx} ${cy})`}>
        <path
          d={`M ${cx - m(126)} ${cy} A ${m(126)} ${m(44)} 0 0 1 ${cx + m(126)} ${cy}`}
          stroke="#d8ff3e"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray={`${m(5)} ${m(6)}`}
        />
        <path
          d={`M ${cx - m(126)} ${cy} A ${m(126)} ${m(44)} 0 0 0 ${cx + m(126)} ${cy}`}
          stroke="#d8ff3e"
          strokeOpacity={isFull ? "0.95" : "0.85"}
          strokeWidth="1"
        />
      </g>

      {/* nube de puntos alrededor del sólido */}
      <g fill="currentColor" fillOpacity="0.32">
        {dots.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={m(x)} cy={m(y)} r={isFull ? 2 : 1.4} />
        ))}
      </g>

      {/* crosshair central */}
      <g stroke="currentColor" strokeOpacity="0.24" strokeWidth="1">
        <line x1={cx - m(6)} y1={cy} x2={cx + m(6)} y2={cy} />
        <line x1={cx} y1={cy - m(6)} x2={cx} y2={cy + m(6)} />
      </g>
    </svg>
  );
}
