import { createClient } from "@/services/supabase/browser-client";

export type SignInClientSideParams = {
  email: string;
  password: string;
};

export const signInClientSide = ({
  email,
  password,
}: SignInClientSideParams) => {
  const supabaseClient = createClient();

  return supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
};
