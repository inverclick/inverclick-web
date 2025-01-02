import { Tables } from "@/services/supabase/supabase";

export type Company = Tables<"companies">["Row"];
export type CreateCompany = Tables<"companies">["Insert"];
export type UpdateCompany = Tables<"companies">["Update"];
