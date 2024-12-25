import { supabase } from "@/services/supabase/supabase";
import { PostgrestSingleResponse, QueryData } from "@supabase/supabase-js";

export const getUser = ({ email }: { email: string }) => {
  return supabase
    .from("users")
    .select("*, lead:leads(*)")
    .eq("email", email)
    .single();
};

export type GetUserResponse = PostgrestSingleResponse<User>;

export type User = QueryData<ReturnType<typeof getUser>>;
