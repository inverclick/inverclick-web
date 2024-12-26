import { createClient } from "@/services/supabase/server-client";
import { Database } from "@/types/database";
import {
  PostgrestSingleResponse,
  QueryData,
  SupabaseClient,
} from "@supabase/supabase-js";

export const getUserServerSide = async () => {
  const supabase = createClient();

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
    .select("*, lead:leads(*)")
    .eq("id", id)
    .single();
};

export type GetUserServerResponse = PostgrestSingleResponse<User>;

export type User = QueryData<ReturnType<typeof fetchUser>>;
