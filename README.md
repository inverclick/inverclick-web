# Inverclick WEB

## Linting

ESLint is configured to run in specific folders, please, if you create a new folder, add it to the configuration file at `next.config.mjs` in `eslint.dirs`.

## Environment variables

Environment variables are stored in a `.env` file:

```bash
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_COMPANY_BASE_URL=
NEXT_PUBLIC_TEAM_BASE_URL=

# Google maps
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
NEXT_PUBLIC_GOOGLE_MAP_ID=

# Supabase
NEXT_PUBLIC_BUCKET_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Open AI
NEXT_PUBLIC_OPENAI_API_KEY=
NEXT_PUBLIC_OPENAI_ASSISTANT_ID=

# Cloudflare Turnstile (captcha antibots del registro de usuario)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Sin `TURNSTILE_SECRET_KEY` el registro de usuario queda bloqueado a propósito:
la verificación falla cerrado. El dominio desde el que se sirve la web (y
`localhost` para desarrollo) tiene que estar en los hostnames permitidos del
widget en el panel de Cloudflare.

## Mapa de proyectos: buscador, orden y «Centrar»

- **Buscador** (arriba del mapa en `/projects`): sugiere ciudades (solo las que
  tienen proyectos, con su conteo) y proyectos, con la coincidencia en negrita,
  sin importar tildes ni mayúsculas. El texto libre filtra en memoria el mapa y
  el listado, sin cambiar la URL ni consultar la red. Elegir una ciudad pone
  `department` y `city` en la URL (los mismos filtros del diálogo); elegir un
  proyecto centra el mapa y abre su tarjeta, o abre su detalle si los filtros lo
  ocultan. Teclado: ↑/↓, Enter y Esc. Las sugerencias salen de un índice liviano
  de todos los publicados (`services/projects/project-search-index.ts`).
- **Orden aleatorio**: el listado se mezcla una vez por pestaña
  (`sessionStorage`); filtrar, buscar, recargar o volver del detalle no lo cambia.
  Mover el mapa sigue poniendo primero los proyectos visibles.
- **«Centrar»**: aparece abajo al centro cuando el mapa sale de la vista
  inicial y la restaura.

La lógica es la misma que la de la app (`lib/project-search.ts`,
`lib/random-order.ts`):

```bash
node --test tests/*.test.mjs
```

## Simulador de crédito

Las tasas E.A. y N.M.V. (mensual vencida) de los dos simuladores
(`components/financing/`) se leen de la tabla `app_config` de Supabase, como
fracción decimal (`0.1645` = 16,45 %), con las claves `app_credit_ea_by_value`,
`app_credit_nmv_by_value`, `app_credit_ea_by_quota` y `app_credit_nmv_by_quota`.
`services/get-credit-rates.ts` las lee en el layout (caché de Next de 5 minutos:
un cambio en la BD tarda hasta ese tiempo en verse) y
`contexts/credit-rates-context.tsx` las entrega a `CreditSimulador`. El cálculo
usa la N.M.V. guardada y la E.A. solo se muestra, así que al cambiar una tasa
hay que actualizar también su equivalente `(1 + E.A.)^(1/12) − 1`. Si la tabla o
las filas no existen, o la lectura falla, se usan los valores por defecto de
`lib/credit-rates.ts` (16,45 % e.a. por valor de vivienda y 11 % e.a. por
cuota). La validación de mayoría de edad de «Fecha de nacimiento» está en
`lib/is-adult.ts`.

## Blog

El blog (`/blog`) no usa base de datos: cada artículo es un archivo MDX en
`content/blog/{slug}.mdx`, con el frontmatter de la "Plantilla Artículo" del
Vault de Inverclick. Publicar un artículo = agregar el archivo y sus imágenes,
y hacer deploy.

- **Imágenes**: en `public/blog/{slug}/`, en `.webp` ya comprimido, y en el
  MDX con su ruta pública (`/blog/{slug}/portada.webp`). La portada se muestra
  en 16:9 y siempre es una ilustración de 1600×900 con el estilo de
  Inverclick (SVG convertido a WebP), según la sección "Portadas" de la Guía
  de Escritura del Vault; nunca una foto.
- **Borradores**: `estado: borrador` solo se ve con `pnpm dev`; en producción
  únicamente aparecen los artículos `publicado`.
- **Validación**: `next build` revisa el frontmatter (categoría del enum,
  fechas `AAAA-MM-DD`, portada y su `alt`) y que las imágenes existan. Si algo
  está mal, el build falla con la lista de errores.
- **Categorías**: enum en `app/blog/_constants/blog.ts`, espejo de
  "Categorías del Blog" en el Vault.
- **SEO**: metadata y JSON-LD por artículo, sitemap en `/blog/sitemap.xml`
  (enlazado desde `robots.txt`) y feed RSS en `/blog/rss.xml`.
