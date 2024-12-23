import { createClient } from "@/services/supabase/server-client";
import {
  PostgrestSingleResponse,
  QueryData,
  SupabaseClient,
} from "@supabase/supabase-js";

export const getUserServerSide = async () => {
  const supabaseClient = createClient();

  const response = await supabaseClient.auth.getUser();

  if (response.error) {
    return null;
  }

  const auth = response.data.user;

  if (!auth) {
    return null;
  }

  const { data: user } = await fetchUser({ id: auth.id, supabaseClient });

  return user;
};

const fetchUser = ({
  id,
  supabaseClient,
}: {
  id: string;
  supabaseClient: SupabaseClient;
}) => {
  return supabaseClient.from("users").select("*").eq("id", id).single();
};

export type GetUserServerResponse = PostgrestSingleResponse<User>;

export type User = QueryData<ReturnType<typeof fetchUser>>;
