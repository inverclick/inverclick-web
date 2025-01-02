import { Tables } from "@/services/supabase/supabase";

export type Lead = Tables<"leads">["Row"];
export type CreateLead = Tables<"leads">["Insert"];
export type UpdateLead = Tables<"leads">["Update"];
