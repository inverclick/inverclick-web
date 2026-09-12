import { Database } from "@/types/database";
import {
  PostgrestSingleResponse,
  QueryData,
  SupabaseClient,
} from "@supabase/supabase-js";

export const getUser = (supabase: SupabaseClient<Database>) => async () => {
  const response = await supabase.auth.getUser();

  if (response.error) {
    return null;
  }

  const auth = response.data.user;

  if (!auth) {
    return null;
  }

  const { data: user } = await fetchUser({
    id: auth.id,
    supabase,
  });

  return user;
};

const fetchUser = ({
  id,
  supabase,
}: {
  id: string;
  supabase: SupabaseClient<Database>;
}) => {
  return supabase
    .from("users")
    .select("*, client:user_clients(*)")
    .eq("id", id)
    .single();
};

export type GetUserServerResponse = PostgrestSingleResponse<User>;

export type User = QueryData<ReturnType<typeof fetchUser>>;

/**
 * A signed-in client still has to prove they own their email: registration no
 * longer sends an OTP, so the flag stays false until they complete a code
 * challenge. Accounts that are not clients have nothing to verify here.
 */
export const needsEmailConfirmation = (user: User | null) => {
  return Boolean(user?.client && !user.client.is_email_confirmed);
};
