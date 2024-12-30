import { createClient } from "@/services/supabase/browser-client";

export type CheckEmailExistenceParams = Readonly<{ email: string }>;

export async function isUserAlreadyRegistered({
  email,
}: CheckEmailExistenceParams) {
  const supabase = createClient();

  const { data: user } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .eq("is_confirmed", true)
    .maybeSingle();

  return Boolean(user);
}
