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
