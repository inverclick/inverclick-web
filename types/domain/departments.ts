import { Tables } from "@/services/supabase/supabase";

export type Department = Tables<"departments">["Row"];
export type CreateDepartment = Tables<"departments">["Insert"];
export type UpdateDepartment = Tables<"departments">["Update"];
