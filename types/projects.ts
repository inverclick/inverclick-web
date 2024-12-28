import { Tables } from "@/services/supabase/supabase";
import { Company } from "@/types/companies";
import { Typology } from "@/types/typologies";

export type Project = Tables<"projects">["Row"];

export type ProjectClass = Tables<"projects">["Row"]["project_class"];

export type ProjectStatus = Tables<"projects">["Row"]["status"];

export interface ProjectToDisplay extends Project {
  typologies: Typology[];
  department: Tables<"departments">["Row"];
  city: Tables<"cities">["Row"];
  company: Company;
}
