import { Tables } from "@/services/supabase/supabase";

export type User = Tables<"users">["Row"];
export type CreateUser = Tables<"users">["Insert"];
export type UpdateUser = Tables<"users">["Update"];
