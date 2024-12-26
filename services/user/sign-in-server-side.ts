import { createClient } from "@/services/supabase/server-client";

export type SignInServerSideParams = {
  email: string;
  password: string;
};

export const signInServerSide = ({
  email,
  password,
}: SignInServerSideParams) => {
  const supabase = createClient();

  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};
