import { Tables } from "@/services/supabase/supabase";
import { Company } from "@/types/domain/companies";
import { Typology } from "@/types/domain/typologies";

export type Project = Tables<"projects">["Row"];
export type CreateProject = Tables<"projects">["Insert"];
export type UpdateProject = Tables<"projects">["Update"];

// Datos necesarios para las tarjetas y los marcadores, sin el detalle completo.
export interface ProjectToDisplay
  extends Pick<
    Project,
    | "id"
    | "name"
    | "photos"
    | "address"
    | "latitude"
    | "longitude"
    | "housing_type"
    | "housing_state"
  > {
  typologies: Pick<Typology, "id" | "price" | "area" | "rooms" | "bathrooms">[];
  department: Pick<Tables<"departments">["Row"], "name">;
  city: Pick<Tables<"cities">["Row"], "name">;
  company: Pick<Company, "logo_url">;
}
