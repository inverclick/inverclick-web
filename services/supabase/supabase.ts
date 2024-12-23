import { ENV_VARS } from "@/global/env";
import { Database } from "@/types/database";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = ENV_VARS.SUPABASE_URL;
const SUPABASE_KEY = ENV_VARS.SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
