import { ENV_VARS } from "@/global/env";
import { Database } from "@/types/database";
import { createClient } from "@supabase/supabase-js";

/**
 * Same anonymous client as `supabase`, but every request skips Next's data
 * cache. Used by pages that must always show current data (the projects map)
 * without opting the whole route out of caching, which would also disable the
 * shared exchange-rate cache in the root layout.
 */
export const supabaseNoStore = createClient<Database>(
  ENV_VARS.SUPABASE_URL,
  ENV_VARS.SUPABASE_ANON_KEY,
  {
    auth: { persistSession: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  }
);
