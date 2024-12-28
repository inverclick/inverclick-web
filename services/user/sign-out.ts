import { Database } from "@/types/database";
import { SupabaseClient } from "@supabase/supabase-js";

export const signOut = (supabase: SupabaseClient<Database>) => {
  return () => {
    return supabase.auth.signOut();
  };
};
