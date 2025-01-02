import { Tables } from "@/services/supabase/supabase";

export type HousingType = Tables<"housing_types">["Row"];
export type CreateHousingType = Tables<"housing_types">["Row"];
export type UpdateHousingType = Tables<"housing_types">["Row"];
