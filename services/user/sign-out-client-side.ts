import { createClient } from "@/services/supabase/browser-client";

export const signOutClientSide = () => {
  const supabaseClient = createClient();

  return supabaseClient.auth.signOut();
};
