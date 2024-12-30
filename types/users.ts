import { Tables } from "@/services/supabase/supabase";

export type User = Tables<"users">["Row"];
export type CreateUserDto = Tables<"users">["Insert"];
export type UpdateUserDto = Tables<"users">["Update"];
