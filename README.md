# Simón Cifuentes — Ingeniería con intención

Portfolio en Next.js App Router, React y TypeScript. Dirección visual grafito, papel cálido y lima. El diagnóstico y las decisiones de diseño están en [DESIGN.md](DESIGN.md).

## Desarrollo

```bash
npm install
npm run dev
```

Disponible en http://localhost:3000. Las fuentes WOFF2 se sirven localmente y sus licencias están en `src/app/fonts`. No se necesita conexión a Google para compilar.

## Verificación

```bash
npm run lint
npm run typecheck
npm run build
npm run start
npm test
```

Playwright necesita el servidor local en ejecución. Por defecto utiliza Chromium (`npx playwright install chromium`). También acepta `PLAYWRIGHT_CHROMIUM_EXECUTABLE` con la ruta a un Chrome instalado y `PLAYWRIGHT_BASE_URL` para cambiar la URL.

La suite cubre escritorio y móvil: navegación, casos de estudio, controles de arquitectura, proceso, conexiones de tecnologías, validación del formulario, errores de red, teclado, reduced-motion, contenido sin JavaScript, desbordamientos, API y metadatos. El envío exitoso se simula: las pruebas no mandan correos reales. Axe comprueba reglas automáticas de accesibilidad; no sustituye una revisión manual.

`npm run format` aplica el formato de código. `node scripts/preview.mjs` captura el diseño en `artifacts/` usando Chrome local (o la variable anterior).

## Rutas

- `/`: presentación, proyectos, perfil, stack, servicios y contacto.
- `/projects`: archivo de trabajo.
- `/projects/[slug]`: tres casos de estudio prerenderizados.
- `/contact?project=slug` o `/contact?service=slug`: formulario contextual.
- `/api/contact`: validación del mensaje y envío mediante Resend.
- `/opengraph-image`, `/robots.txt`, `/sitemap.xml`: metadatos y rastreo.

## Configuración de publicación

Usa `.env.example` como referencia:

- `RESEND_API_KEY`: credencial de Resend, solo en el servidor.
- `CONTACT_EMAIL`: destinatario autorizado para los mensajes.
- `NEXT_PUBLIC_SITE_URL`: origen HTTPS real del portfolio para canonical, sitemap y enlaces sociales absolutos.

El formulario conserva el remitente de pruebas de Resend existente. Para usarlo con destinatarios externos, configura un remitente de tu dominio verificado en Resend. Si el servicio no está configurado, la interfaz ofrece un mensaje comprensible y mantiene el correo directo disponible.

Sin dominio configurado no se inventa un canonical ni se incluyen URLs ficticias en el sitemap. Los datos del perfil y canales reales se mantienen en `src/data`.

## Contenido visual

Las composiciones de proyectos son representaciones HTML/CSS de sus funciones, identificadas como tales. Los archivos originales solo contenían portadas SVG; no había capturas de producto. Los enlaces a demos y repositorios específicos no estaban disponibles: los casos ofrecen contacto y el perfil real de GitHub, con etiquetas honestas.

El archivo de CV original solo era texto de ejemplo y no se presenta como un documento descargable. No se publican fechas de proyectos que estaban pendientes de confirmar, empresas, métricas ni experiencia inventada.

## Interacciones y arquitectura

- `Architecture`: capas CSS 3D, selector de responsabilidad y vista separada.
- `ProcessExplorer`: un diagrama cambia con las cuatro etapas del proceso.
- `Stack`: relaciones derivadas de los datos de proyectos.
- `ProjectObservatory`: escultura 3D de proyectos con arrastre horizontal, giro por teclado, selección y compactación.
- `SystemPulse`: recorrido visual de una solicitud por las capas del Hero, con resultado inmediato en reduced-motion.
- `ScrollDepth`: perspectiva y escala ligadas al scroll de las presentaciones de proyectos.
- `TiltSurface` y `MagneticButton`: resortes de Motion, solo con ratón y sin reduced-motion.
- `Reveal`: observadores con limpieza y contenido visible sin JavaScript.
- Menú móvil con `dialog` nativo, foco contenido, Escape y restauración de foco.
- Scroll nativo, progreso y entradas de página breves, sin bloqueo artificial.
- Resumen profesional accesible desde «Mi perfil en breve», con foco contenido y cierre por Escape.
- Casos con navegación interna y un recorrido interactivo que explica uso y responsabilidades de desarrollo.
- Servicios con consulta contextual y selector de motivo que conserva el mensaje escrito por el visitante.
- Sección activa en navegación y retorno desde un caso al proyecto exacto.

Los estilos están separados en sistema global, proyectos, secciones, responsive y experiencia interactiva. No hay WebGL ni bucles de renderizado continuos. Se retiraron los motivos 3D repetidos y sus dependencias.

Next.js utiliza `.next-dev` durante `npm run dev` y el directorio estándar `.next` para build y producción, compatible con Vercel. Esto evita mezclar los módulos de desarrollo y producción. Si necesitas ambos servidores simultáneamente, usa puertos distintos: `npm run dev -- --port 3001` y `npm run start -- --port 3000`. Next.js permanece en la rama 15; PostCSS se fija dentro de Next a una versión corregida compatible.

Antes de volver a ejecutar `npm run build`, detén el servidor local iniciado con `npm run start`; después de compilar, inícialo nuevamente. El servidor de desarrollo puede permanecer activo gracias a su caché independiente. La prueba `tests/project-loading.spec.ts` comprueba navegación, recarga e hidratación de los tres casos.

`public/sw.js` es un script de retiro: si el navegador conserva un service worker de una versión anterior, lo desregistra y deja de interceptar los módulos actuales de Next.js.
