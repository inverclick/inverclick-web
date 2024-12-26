import { createClient } from "@/services/supabase/server-client";
import { PostgrestSingleResponse, QueryData } from "@supabase/supabase-js";

export const getUser = ({ id }: { id: string }) => {
  const supabase = createClient();

  return supabase.from("users").select("*").eq("id", id).single();
};

export type GetUserResponse = PostgrestSingleResponse<User>;

export type User = QueryData<ReturnType<typeof getUser>>;
