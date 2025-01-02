import { Tables } from "@/services/supabase/supabase";
import { Company } from "@/types/domain/companies";
import { Typology } from "@/types/domain/typologies";

export type Project = Tables<"projects">["Row"];
export type CreateProject = Tables<"projects">["Insert"];
export type UpdateProject = Tables<"projects">["Update"];

export interface ProjectToDisplay extends Project {
  typologies: Typology[];
  department: Tables<"departments">["Row"];
  city: Tables<"cities">["Row"];
  company: Company;
}
