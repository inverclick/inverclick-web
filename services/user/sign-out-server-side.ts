import { createClient } from "@/services/supabase/server-client";

export const signOutServerSide = () => {
  const supabase = createClient();

  return supabase.auth.signOut();
};
