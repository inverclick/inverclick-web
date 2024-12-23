import { ENV_VARS } from "@/global/env";
import { Database } from "@/types/database";
import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = ENV_VARS.SUPABASE_URL;
const SUPABASE_KEY = ENV_VARS.SUPABASE_ANON_KEY;

export const createClient = () => {
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_KEY);
};
