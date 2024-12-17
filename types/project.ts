import { Tables } from "@/services/supabase";
import { Company } from "@/types/company";
import { Typology } from "@/types/typologies";

export type Project = Tables<"projects">["Row"];

export interface ProjectToDisplay extends Project {
  typologies: Typology[];
  department: Tables<"departments">["Row"];
  city: Tables<"cities">["Row"];
  company: Company;
}
