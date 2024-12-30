import { Tables } from "@/services/supabase/supabase";

export type Lead = Tables<"leads">["Row"];
export type CreateLeadDto = Tables<"leads">["Insert"];
export type UpdateLeadDto = Tables<"leads">["Update"];
