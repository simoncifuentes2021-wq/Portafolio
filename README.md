# Portafolio de Simon Cifuentes

Portafolio web profesional para un desarrollador fullstack enfocado en React, Next.js, FastAPI y PostgreSQL. El proyecto esta preparado para ejecutarse localmente y desplegarse en Vercel.

## Tecnologias

- Next.js con App Router
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Componentes base estilo shadcn/ui
- Lucide React
- React Icons
- React Hook Form + Zod
- Resend
- clsx + tailwind-merge

## Instalacion

```bash
npm install
npm run dev
```

El sitio quedara disponible en `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Variables de entorno

Crea un archivo `.env.local` usando `.env.example` como referencia:

```bash
RESEND_API_KEY=
CONTACT_EMAIL=
```

Si estas variables no existen, el formulario mostrara un error controlado sin romper la aplicacion.

## Deploy en Vercel

1. Sube el proyecto a GitHub.
2. Importa el repositorio desde Vercel.
3. Configura `RESEND_API_KEY` y `CONTACT_EMAIL` en Project Settings > Environment Variables.
4. Ejecuta el deploy.

## Estructura

```txt
src/
  app/
    api/contact/route.ts
    contact/page.tsx
    projects/page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    effects/
    layout/
    sections/
    ui/
  data/
  lib/
public/
  projects/
```

## Secciones incluidas

- Navbar fijo con blur
- Hero animado
- Sobre mi breve
- Tecnologias visuales con iconos
- Proyectos destacados
- Servicios
- Contacto con validacion y API
- Footer profesional

## TODO para personalizar

- Reemplazar URL real de GitHub en `src/data/socialLinks.ts`.
- Reemplazar URL real de LinkedIn en `src/data/socialLinks.ts`.
- Reemplazar correo real en `src/data/socialLinks.ts` y `.env.local`.
- Agregar CV real en `public/cv.pdf`.
- Reemplazar imagenes reales de proyectos en `public/projects`.
- Agregar foto o avatar personal en `public/profile.svg` o `public/profile.png`.
- Reemplazar dominio final en `src/app/layout.tsx`.
- Reemplazar `public/og-image.svg` por una imagen final de marca.
