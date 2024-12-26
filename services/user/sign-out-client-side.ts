import { createClient } from "@/services/supabase/browser-client";

export const signOutClientSide = () => {
  const supabase = createClient();

  return supabase.auth.signOut();
};
