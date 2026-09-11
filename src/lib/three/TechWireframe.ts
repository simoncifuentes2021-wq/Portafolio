import * as THREE from "three";

export type TechWireframeOptions = {
  /** "hero": pantalla completa del sello; "motif": versión pequeña estática subtil. */
  variant?: "hero" | "motif";
  /** Reacciona al cursor (parallax + hover). Se ignora en pantallas táctiles. */
  interactive?: boolean;
  /** Respeta prefers-reduced-motion (un solo frame estático). */
  reducedMotion?: boolean;
};

const ACCENT = 0xd8ff3e;
const LERP = 0.045;
const MAX_TILT = 0.12;

/** API imperativa expuesta al exterior (scroll, énfasis de CTAs). */
export type WireframeControls = {
  setScrollProgress: (p: number) => void;
  setEmphasis: (on: boolean) => void;
};

/**
 * Wireframe técnico: esqueleto icosaédrico + jaula lat/long + un anillo
 * acento y una nube de puntos. Rotación diferencial en 3 capas, parallax
 * de cursor y hover sutil. Sin lights: todo es LineBasicMaterial/Points.
 */
export class TechWireframe {
  private container: HTMLElement;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene = new THREE.Scene();
  private core!: THREE.LineSegments;
  private cage!: THREE.LineSegments;
  private ringPivot = new THREE.Group();
  private ring!: THREE.LineSegments;
  private points!: THREE.Points;
  private coreMat!: THREE.LineBasicMaterial;
  private cageMat!: THREE.LineBasicMaterial;
  private ringMat!: THREE.LineBasicMaterial;
  private ptsMat!: THREE.PointsMaterial;
  private group = new THREE.Group();
  private raf = 0;
  private clock = new THREE.Clock();
  private disposed = false;
  private visible = false;
  private hovering = false;
  private emphasis = false;
  private scrollP = 0;
  private scrollRotY = 0;
  private lastScrollP = 0;
  private scrollTiltX = 0;
  private pointer = { x: 0, y: 0 };
  private target = { x: 0, y: 0 };
  private baseSpeed: number;
  private readonly scale: number;
  private readonly interactive: boolean;
  private readonly spinOnly: boolean;
  private readonly reducedMotion: boolean;
  private readonly ro: ResizeObserver;
  private readonly io: IntersectionObserver;
  private readonly resizeFn: () => void;
  private readonly pointerMoveFn: (e: PointerEvent) => void;
  private readonly pointerEnterFn: () => void;
  private readonly pointerLeaveFn: () => void;
  private readonly scrollFn: () => void;

  constructor(container: HTMLElement, options: TechWireframeOptions = {}) {
    this.container = container;
    const isMotif = options.variant === "motif";
    this.scale = isMotif ? 0.95 : 1;
    this.spinOnly = isMotif;
    this.interactive = (options.interactive ?? true) && !matchMedia("(pointer: coarse)").matches;
    this.reducedMotion = options.reducedMotion || matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.baseSpeed = options.variant === "hero" ? 0.0075 : 0.004;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 40);
    this.camera.position.z = 6;

    this.buildScene();
    this.group.scale.setScalar(this.scale);
    this.scene.add(this.group);

    const canvas = this.renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);
    container.style.touchAction = "pan-y";

    this.resizeFn = () => this.resize();
    this.pointerMoveFn = (e: PointerEvent) => this.onPointerMove(e);
    this.pointerEnterFn = () => {
      this.hovering = true;
    };
    this.pointerLeaveFn = () => {
      this.hovering = false;
      this.target.x = 0;
      this.target.y = 0;
    };
    // Los motivos giran con el scroll de la página (sin React): la posición
    // del contenedor en viewport se convierte en progreso de scroll.
    this.scrollFn = () => {
      if (!this.spinOnly || this.disposed) return;
      const rect = this.container.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 cuando el motivo entra por abajo, 1 cuando sale por arriba.
      const p = 1 - Math.min(Math.max((rect.top + rect.height / 2) / (vh + rect.height), 0), 1);
      this.setScrollProgress(p);
    };
    if (this.spinOnly && !this.reducedMotion) {
      window.addEventListener("scroll", this.scrollFn, { passive: true });
      window.addEventListener("resize", this.scrollFn);
    }

    this.ro = new ResizeObserver(this.resizeFn);
    this.ro.observe(container);
    this.io = new IntersectionObserver(
      (entries) => {
        const inView = entries[0]?.isIntersecting ?? true;
        this.setVisible(inView);
      },
      { rootMargin: "200px" },
    );
    this.io.observe(container);

    if (this.interactive) {
      container.addEventListener("pointerenter", this.pointerEnterFn);
      container.addEventListener("pointerleave", this.pointerLeaveFn);
      container.addEventListener("pointermove", this.pointerMoveFn);
    }

    this.resize();
    if (this.reducedMotion) {
      // Un frame estático: sin loop, sin parallax, opacidades finales.
      this.render();
    } else {
      // El IntersectionObserver arranca el loop al detectar el stage
      // en viewport; visible=false evita loops duplicados en StrictMode.
      this.clock.start();
      if (this.spinOnly) this.scrollFn();
    }
  }

  /* ---------- geometría ---------- */

  private buildScene() {
    // A — esqueleto icosaédrico (el "núcleo del plano").
    const ico = new THREE.IcosahedronGeometry(0.95, 2);
    const edges = new THREE.EdgesGeometry(ico);
    this.coreMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.28,
    });
    this.core = new THREE.LineSegments(edges, this.coreMat);
    ico.dispose();

    // B — jaula exterior lat/long (la capa "plano de ingeniería").
    const cageGeo = new THREE.BufferGeometry();
    const cagePts: number[] = [];
    const rings = 6;
    const longitudes = 10;
    const seg = 64;
    const R = 1.15;
    for (let i = 0; i <= rings; i++) {
      const phi = (i / rings) * Math.PI;
      for (let j = 0; j < seg; j++) {
        const a0 = (j / seg) * Math.PI * 2;
        const a1 = ((j + 1) / seg) * Math.PI * 2;
        cagePts.push(
          R * Math.sin(phi) * Math.cos(a0), R * Math.cos(phi), R * Math.sin(phi) * Math.sin(a0),
          R * Math.sin(phi) * Math.cos(a1), R * Math.cos(phi), R * Math.sin(phi) * Math.sin(a1),
        );
      }
    }
    for (let i = 0; i < longitudes; i++) {
      const theta = (i / longitudes) * Math.PI * 2;
      for (let j = 0; j < seg; j++) {
        const t0 = (j / seg) * Math.PI;
        const t1 = ((j + 1) / seg) * Math.PI;
        cagePts.push(
          R * Math.sin(t0) * Math.cos(theta), R * Math.cos(t0), R * Math.sin(t0) * Math.sin(theta),
          R * Math.sin(t1) * Math.cos(theta), R * Math.cos(t1), R * Math.sin(t1) * Math.sin(theta),
        );
      }
    }
    cageGeo.setAttribute("position", new THREE.Float32BufferAttribute(cagePts, 3));
    this.cageMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
    });
    this.cage = new THREE.LineSegments(cageGeo, this.cageMat);

    // C — el UNO acento: anillo orbital lima.
    const ringGeo = new THREE.BufferGeometry();
    const ringPts: number[] = [];
    const rSeg = 96;
    for (let j = 0; j <= rSeg; j++) {
      const a = (j / rSeg) * Math.PI * 2;
      ringPts.push(1.35 * Math.cos(a), 1.35 * Math.sin(a), 0);
    }
    ringGeo.setAttribute("position", new THREE.Float32BufferAttribute(ringPts, 3));
    this.ringMat = new THREE.LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.85,
    });
    this.ring = new THREE.LineSegments(ringGeo, this.ringMat);
    // El anillo vive en un pivote: el pivote precesa (giro visible del plano
    // orbital) y el anillo gira sobre su eje local (invisible por sí solo).
    this.ring.rotation.x = Math.PI / 2 + 0.87; // ~50° de inclinación
    this.ringPivot.add(this.ring);

    // D — nube de puntos.
    const pts: number[] = [];
    const random = (min: number, max: number) => min + Math.random() * (max - min);
    for (let i = 0; i < 420; i++) {
      const r = random(0.85, 1.45);
      const theta = random(0, Math.PI * 2);
      const phi = Math.acos(random(-1, 1));
      pts.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      );
    }
    const ptsGeo = new THREE.BufferGeometry();
    ptsGeo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    this.ptsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
    });
    this.points = new THREE.Points(ptsGeo, this.ptsMat);

    this.group.add(this.core, this.cage, this.ringPivot, this.points);
  }

  /* ---------- interacción ---------- */

  /**
   * Zoom de cámara + tilt ligero, conducidos por el scroll de la página
   * (0 = hero en reposo, 1 = hero saliendo). El Hero le pasa el progreso.
   */
  setScrollProgress(p: number) {
    this.scrollP = p;
  }

  /** Enciende el anillo lima en modo pulso (hover sobre los CTAs). */
  setEmphasis(on: boolean) {
    this.emphasis = on;
  }

  private onPointerMove(e: PointerEvent) {
    const rect = this.container.getBoundingClientRect();
    this.target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.target.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  private setVisible(inView: boolean) {
    if (this.reducedMotion || this.disposed) return;
    if (inView && !this.visible) {
      // Reanudar: resetear el delta acumulado mientras estaba pausado.
      this.clock.getDelta();
      this.visible = true;
      this.loop();
    } else if (!inView && this.visible) {
      this.visible = false;
      cancelAnimationFrame(this.raf);
    }
  }

  private resize() {
    if (this.disposed) return;
    const { clientWidth: w, clientHeight: h } = this.container;
    if (w === 0 || h === 0) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  /* ---------- loop ---------- */

  private loop = () => {
    if (this.disposed || !this.visible) return;
    this.raf = requestAnimationFrame(this.loop);

    const t = this.clock.getElapsedTime();
    const speed = this.hovering ? this.baseSpeed * 1.35 : this.baseSpeed;

    // Núcleo: giro principal sobre Y + un lento desplome en X para que la
    // silueta cambie (un icosaedro girando solo sobre Y se vuelve cíclico).
    this.core.rotation.y += speed;
    this.core.rotation.x = Math.sin(t * 0.21) * 0.18;
    // Jaula: contragiro + precesión — al ser simétrica respecto a Y, solo
    // el movimiento fuera de eje hace visible su rotación.
    this.cage.rotation.y -= speed * 0.34;
    this.cage.rotation.z = Math.sin(t * 0.13) * 0.1;
    // Anillo lima: precesión del pivote (plano orbital que gira) + giro local.
    this.ringPivot.rotation.y += speed * 0.5;
    this.ring.rotation.z += speed * 1.6;
    // Flotado vertical sutil de todo el conjunto.
    this.group.position.y = Math.sin(t * 0.6) * 0.05;
    // La nube de puntos deriva en sentido propio.
    this.points.rotation.y -= speed * 0.22;

    // Fade-in de introducción (1.4s).
    if (t < 1.4) {
      const k = this.easeOutCubic(Math.min(t / 1.4, 1));
      this.coreMat.opacity = 0.28 * k;
      this.cageMat.opacity = 0.1 * k;
      this.ringMat.opacity = 0.85 * k;
      this.ptsMat.opacity = 0.5 * k;
    } else {
      // Hover: el anillo se enciende; énfasis CTA: pulso senoidal.
      let targetRing = this.hovering ? 1 : 0.85;
      if (this.emphasis) {
        targetRing = 1 - Math.abs(Math.sin(t * 3.2)) * 0.45;
      }
      this.ringMat.opacity += (targetRing - this.ringMat.opacity) * LERP;
    }

    // Scroll: la cámara se retrae, el conjunto gira acumulando vueltas
    // según el progreso y se inclina hacia atrás.
    if (this.scrollP !== this.lastScrollP) {
      const p = Math.min(Math.max(this.scrollP, 0), 1);
      // Delta de progreso → giro extra: scrollear "gira" el objeto.
      this.scrollRotY += (p - this.lastScrollP) * Math.PI * 1.5;
      this.lastScrollP = p;
    }
    if (this.scrollP > 0) {
      const p = Math.min(this.scrollP, 1);
      if (!this.spinOnly) this.camera.position.z = 6 + p * 2.2;
      this.scrollTiltX += (-p * 0.3 - this.scrollTiltX) * LERP;
    } else if (t > 1.4) {
      if (!this.spinOnly) this.camera.position.z += (6 - this.camera.position.z) * LERP;
      this.scrollTiltX += (0 - this.scrollTiltX) * LERP;
    }

    // Parallax del cursor (lerp hacia el objetivo).
    this.pointer.x += (this.target.x - this.pointer.x) * LERP;
    this.pointer.y += (this.target.y - this.pointer.y) * LERP;

    // Composición final: giro base + giro por scroll + tilt por scroll +
    // tilt por cursor. Cada capa vive en su propio eje para no pelearse.
    if (t < 1.4) {
      // Barrido de entrada que termina exactamente en la pose compuesta.
      const k = this.easeOutCubic(Math.min(t / 1.4, 1));
      this.group.rotation.y =
        -0.8 * (1 - k) + this.scrollRotY + this.pointer.x * MAX_TILT;
      this.group.rotation.x = this.scrollTiltX + this.pointer.y * MAX_TILT;
    } else {
      this.group.rotation.y = this.scrollRotY + this.pointer.x * MAX_TILT;
      this.group.rotation.x = this.scrollTiltX + this.pointer.y * MAX_TILT;
    }

    this.render();
  };

  private render() {
    this.renderer.render(this.scene, this.camera);
  }

  private easeOutCubic(x: number) {
    return 1 - Math.pow(1 - x, 3);
  }

  /* ---------- ciclo de vida ---------- */

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.io.disconnect();
    this.container.removeEventListener("pointerenter", this.pointerEnterFn);
    this.container.removeEventListener("pointerleave", this.pointerLeaveFn);
    this.container.removeEventListener("pointermove", this.pointerMoveFn);
    window.removeEventListener("scroll", this.scrollFn);
    window.removeEventListener("resize", this.scrollFn);
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments || obj instanceof THREE.Points) {
        obj.geometry?.dispose();
      }
    });
    this.coreMat.dispose();
    this.cageMat.dispose();
    this.ringMat.dispose();
    this.ptsMat.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}