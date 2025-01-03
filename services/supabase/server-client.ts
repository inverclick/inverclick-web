import { ENV_VARS } from "@/global/env";
import { Database } from "@/types/database";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const SUPABASE_URL = ENV_VARS.SUPABASE_URL;
const SUPABASE_KEY = ENV_VARS.SUPABASE_ANON_KEY;
const SERVICE_ROLE_KEY = ENV_VARS.SUPABASE_SERVICE_ROLE_KEY;

export type CreateClientParams = {
  withServiceRole?: boolean;
};

export const createClient = (
  { withServiceRole }: CreateClientParams = { withServiceRole: false }
) => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    SUPABASE_URL,
    withServiceRole ? SERVICE_ROLE_KEY : SUPABASE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};
