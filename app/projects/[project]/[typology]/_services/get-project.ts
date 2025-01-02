import { supabase } from "@/services/supabase/supabase";
import { PostgrestSingleResponse, QueryData } from "@supabase/supabase-js";

export type GetProjectParams = {
  projectId: string;
};

export const getProject = ({ projectId }: GetProjectParams) => {
  return supabase
    .from("projects")
    .select(
      `*,
      typologies(*),
      department:departments(*),
      city:cities(*),
      company:companies(*),
      characteristics:project_characteristics(*, characteristic:characteristics(*)),
      plan:project_plans(*)
      `
    )
    .eq("id", projectId)
    .eq("status", "PUBLISHED")
    .single()
    .throwOnError();
};

export type GetProjectResponse = PostgrestSingleResponse<Project>;

export type Project = QueryData<ReturnType<typeof getProject>>;
