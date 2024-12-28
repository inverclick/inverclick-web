import { Database } from "@/types/database";
import { SupabaseClient } from "@supabase/supabase-js";

export type SignInParams = {
  email: string;
  password: string;
};

export const signIn = (supabase: SupabaseClient<Database>) => {
  return ({ email, password }: SignInParams) => {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  };
};
