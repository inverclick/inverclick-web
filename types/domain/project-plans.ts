import { Tables } from "@/services/supabase/supabase";

export type ProjectPlan = Tables<"project_plans">["Row"];
export type CreateProjectPlan = Tables<"project_plans">["Insert"];
export type UpdateProjectPlan = Tables<"project_plans">["Update"];
