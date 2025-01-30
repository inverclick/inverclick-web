# Inverclick WEB

## Linting

ESLint is configured to run in specific folders, please, if you create a new folder, add it to the configuration file at `next.config.mjs` in `eslint.dirs`.

## Environment variables

Environment variables are stored in a `.env`:

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

# Cloudflare
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```
