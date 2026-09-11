export type Project = {
  slug: string;
  name: string;
  type: string;
  year: string;
  role: string;
  image: string;
  technologies: string[];
  description: string;
  demonstrates: string[];
  demoUrl: string;
  codeUrl: string;
};

export const projects: Project[] = [
  {
    slug: "reservas-deportivas",
    name: "Reservas deportivas",
    type: "Plataforma fullstack",
    // TODO: Confirmar año real del proyecto.
    year: "2025",
    role: "Frontend + API + Base de datos",
    image: "/projects/reservas-deportivas.svg",
    technologies: ["Next.js", "FastAPI", "PostgreSQL", "Cloudflare R2"],
    description:
      "Plataforma tipo Airbnb para canchas deportivas: buscas, reservas y pagas en línea. Yo construí la interfaz de reserva con calendario y cupos en tiempo real, la API de disponibilidad y el modelo de datos.",
    demonstrates: ["Búsqueda por comuna y horario", "Reserva con calendario y cupos", "Roles: jugador, dueño de cancha, admin"],
    // TODO: Reemplazar por URL real del demo.
    demoUrl: "#contacto",
    codeUrl: "https://github.com/SimonCifuentes",
  },
  {
    slug: "sitio-negocios",
    name: "Sitios para negocios",
    type: "Landing page",
    // TODO: Confirmar año real del proyecto.
    year: "2025",
    role: "Diseño + Desarrollo completo",
    image: "/projects/sitio-negocios.svg",
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
    description:
      "Landing pages para negocios locales que necesitaban presencia digital seria. Diseño directo, carga rápida y estructura pensada para que el cliente reciba consultas, no solo visitas.",
    demonstrates: ["Diseño responsive a medida", "SEO técnico básico", "Deploy en Vercel con dominio propio"],
    // TODO: Reemplazar por URL real del demo.
    demoUrl: "#contacto",
    codeUrl: "https://github.com/SimonCifuentes",
  },
  {
    slug: "panel-administrativo",
    name: "Panel administrativo",
    type: "Dashboard",
    // TODO: Confirmar año real del proyecto.
    year: "2026",
    role: "Frontend + Integración API",
    image: "/projects/sistema-administrativo.svg",
    technologies: ["React", "APIs REST", "PostgreSQL"],
    description:
      "Sistema interno para gestionar usuarios, registros y operaciones: tablas con filtros, edición en línea y control de permisos. El foco estaba en que una persona no técnica pudiera operarlo sin capacitación.",
    demonstrates: ["Tablas con filtros y paginación", "Gestión de usuarios y roles", "Métricas operativas en un vistazo"],
    // TODO: Reemplazar por URL real del demo.
    demoUrl: "#contacto",
    codeUrl: "https://github.com/SimonCifuentes",
  },
];
