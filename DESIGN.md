# Ingeniería con intención

## Auditoría inicial

La base es Next.js 15 App Router, React 19, TypeScript estricto, Tailwind y Motion. Se conservan la arquitectura de rutas, los datos de proyectos, los canales profesionales, los componentes de formulario y su validación con React Hook Form y Zod. Lint y TypeScript pasaban antes de la intervención; no había una suite de tests.

- La paleta grafito/lima y el contraste serif/sans tienen personalidad, pero faltan escala, ritmo y una composición principal reconocible.
- Los proyectos se esconden tras un acordeón y un hover que no existe en móvil. Sus assets SVG son portadas con texto, no capturas. Las demos apuntan a contacto y el código al perfil general de GitHub. Los años están marcados como pendientes de confirmar.
- El mismo wireframe se repite en el hero, About y dos veces en el footer, creando contextos WebGL innecesarios y diluyendo el motivo visual.
- Las anclas del header/footer fallan fuera de la portada. El indicador no se actualiza tras navegar de ruta. El menú móvil duplica el bloqueo de scroll y no gestiona el foco.
- Hero, parallax, reveals y botones magnéticos ignoran parcialmente reduced-motion. El listado se deforma con la velocidad de scroll, penalizando la lectura.
- El formulario no captura errores de red ni asocia errores a campos. La API expone instrucciones de configuración al visitante.
- Hay un dominio ficticio en metadata, una tarjeta social sin conectar y un archivo llamado CV que solo contiene texto de ejemplo.
- La tipografía usa tres familias y múltiples pesos. La composición móvil pone la decoración antes de la propuesta profesional.

## Dirección

Una bitácora visual de producto: gran tipografía, negro grafito, papel cálido y lima como señal funcional. La secuencia es presentación → trabajo → persona → herramientas → servicios → conversación. El trabajo se ve desde el principio; ningún contenido esencial depende de hover.

## Interacciones propias

1. **Anatomía de una aplicación**: una escultura CSS 3D descompone interfaz, lógica y datos. Cada capa seleccionada revela sus tecnologías y su responsabilidad. Se opera con puntero, teclado y toque.
2. **Conexiones de trabajo**: seleccionar una tecnología muestra su contexto y los proyectos del portfolio en los que aparece. Son relaciones derivadas de los datos existentes, sin porcentajes de dominio inventados.
3. **Del problema al producto**: un selector de etapas transforma una misma visualización desde el problema hasta el despliegue y explica el criterio detrás del trabajo.

## Implementación y límites

Motion se reutiliza para pequeños resortes y profundidad; CSS para la escultura, las máscaras de entrada y los estados. Scroll nativo suave: mantiene anclas y accesibilidad sin otra dependencia. Un cursor complementario aporta contexto conservando el cursor nativo. Sin loader artificial. Los mockups son composiciones HTML/CSS explícitamente identificadas como representaciones, no capturas de producto. No se muestran fechas sin confirmar ni links de demo/repositorio inexistentes.

Se evitan contextos WebGL en la experiencia nueva: CSS 3D logra el lenguaje de capas sin cargar Three.js. El movimiento se limita a transform y opacity, con fallbacks estáticos, reduced-motion y soporte táctil. El contenido principal se sirve como HTML y sigue visible sin JavaScript.

## Validación realizada

Build de producción, lint y TypeScript completados. Se verificaron 23 pruebas de navegador en Chrome de escritorio y móvil emulado: rutas, metadatos, anclas, teclado, formularios, API sin envío real, reduced-motion y contenido sin JavaScript. El barrido de 320, 390, 768, 1024 y 1920 px se ejecuta una sola vez y no detecta desbordamientos horizontales.

Los análisis automáticos de accesibilidad incluyen la página, el menú móvil, los casos y el resumen profesional. La ficha se audita dentro del diálogo activo; el fondo inerte se revisa por separado. Se comprueban el recorrido de Tab, Escape y la restauración del foco. La revisión visual abarca escritorio, móvil, resumen, contacto y recorrido de proyecto. El informe local de producción y las capturas se generan en `artifacts/`; las mediciones locales no equivalen a Core Web Vitals de usuarios reales.

## Segunda iteración: una experiencia útil

El refinamiento conserva la dirección visual y prioriza dos niveles de lectura. Una ficha modal permite conocer formación, enfoque y disponibilidad sin recorrer toda la página; cada caso ofrece un recorrido interactivo que vincula acciones de uso y responsabilidades de desarrollo. Su contenido deriva del alcance documentado, sin añadir resultados ni métricas.

La navegación señala la sección activa y el regreso desde un caso conserva el proyecto concreto. Los servicios abren consultas con contexto. El formulario permite elegir el motivo y solo sustituye mensajes vacíos o sugeridos; respeta el texto escrito por la persona. Se aumentan tamaños de lectura y se adaptan el resumen, las pestañas y el contacto a pantallas pequeñas. No se incorporan nuevas dependencias.
