export const ENV_VARS = {
  GOOGLE_MAP_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
  GOOGLE_MAP_ID: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL as string,
  BUCKET_URL: process.env.NEXT_PUBLIC_BUCKET_URL as string,
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY as string,
  OPENAI_ASSISTANT_ID: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID as string,
  TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY as string,
};
