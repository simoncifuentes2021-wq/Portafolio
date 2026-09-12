import type { Project } from "./projects";

export type JourneyStep = {
  title: string;
  action: string;
  experience: string;
  responsibility: string;
  technologies: string[];
};

// Explanatory views of the functions already recorded in projects.ts.
// These describe scope, not measured outcomes or undocumented implementation details.
export const projectJourneys: Record<Project["visual"], JourneyStep[]> = {
  sports: [
    {
      title: "Encontrar",
      action: "La búsqueda se convierte en una opción.",
      experience:
        "Buscar una cancha por comuna y horario, con la disponibilidad como parte del recorrido.",
      responsibility:
        "Interfaz de búsqueda y API de disponibilidad: conectar lo que la persona necesita con las opciones que puede reservar.",
      technologies: ["Next.js", "FastAPI"],
    },
    {
      title: "Reservar",
      action: "Del horario disponible a la reserva.",
      experience:
        "Elegir un horario desde el calendario y consultar los cupos durante la reserva.",
      responsibility:
        "Conectar el calendario de la interfaz con la API y el modelo de datos de las reservas.",
      technologies: ["Next.js", "FastAPI", "PostgreSQL"],
    },
    {
      title: "Gestionar",
      action: "Cada persona tiene su lugar.",
      experience:
        "Jugadores, dueños de cancha y administradores participan desde sus respectivos roles.",
      responsibility:
        "Organizar las funciones de la plataforma alrededor de los distintos tipos de usuario.",
      technologies: ["FastAPI", "PostgreSQL"],
    },
  ],
  business: [
    {
      title: "Presentar",
      action: "Entender el negocio desde la primera pantalla.",
      experience:
        "Encontrar una presentación clara del negocio y sus servicios, adaptada a su identidad.",
      responsibility:
        "Diseño y desarrollo completo de la landing, con una estructura pensada para recibir consultas.",
      technologies: ["Next.js", "Tailwind CSS"],
    },
    {
      title: "Explorar",
      action: "La misma claridad en cada pantalla.",
      experience:
        "Recorrer los servicios desde el teléfono o el escritorio sin perder el contexto.",
      responsibility:
        "Diseño responsive a medida, carga rápida y SEO técnico básico.",
      technologies: ["Next.js", "Tailwind CSS"],
    },
    {
      title: "Conectar",
      action: "Que una visita pueda convertirse en conversación.",
      experience:
        "Encontrar cómo consultar al negocio después de conocer lo que ofrece.",
      responsibility:
        "Dar prioridad al contacto en la estructura y publicar el sitio con su dominio propio.",
      technologies: ["Next.js", "Vercel"],
    },
  ],
  dashboard: [
    {
      title: "Consultar",
      action: "Encontrar lo importante entre los registros.",
      experience: "Revisar información mediante tablas, filtros y paginación.",
      responsibility:
        "Desarrollar la interfaz e integrar la API para presentar las operaciones con claridad.",
      technologies: ["React", "APIs REST"],
    },
    {
      title: "Administrar",
      action: "Operar desde una misma interfaz.",
      experience: "Editar registros y gestionar usuarios desde el panel.",
      responsibility:
        "Conectar las acciones de la interfaz con la API y organizar la experiencia alrededor de los permisos.",
      technologies: ["React", "APIs REST", "PostgreSQL"],
    },
    {
      title: "Supervisar",
      action: "Una vista general para orientarse.",
      experience:
        "Consultar las métricas operativas en un vistazo, sin recorrer todas las tablas.",
      responsibility:
        "Dar jerarquía a la información del sistema para que el panel sea comprensible para personas no técnicas.",
      technologies: ["React", "APIs REST"],
    },
  ],
};
