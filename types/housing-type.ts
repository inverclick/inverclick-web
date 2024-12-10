import { Tables } from "@/services/supabase";

export type HousingType = Tables<"housing_types">["Row"];
