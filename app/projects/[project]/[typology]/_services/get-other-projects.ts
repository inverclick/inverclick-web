import { supabase } from "@/services/supabase";
import { ElementType } from "@/types/typescript";
import { PostgrestSingleResponse, QueryData } from "@supabase/supabase-js";

export type GetOtherProjectParams = {
  projectId: string;
};

export const getOtherProjects = ({ projectId }: GetOtherProjectParams) => {
  return supabase
    .from("projects")
    .select(
      `*,
      typologies(*),
      department:departments(*),
      city:cities(*),
      company:companies(*),
      characteristics:project_characteristics(*, characteristic:characteristics(*))
      `
    )
    .eq("status", "PUBLISHED")
    .neq("id", projectId)
    .limit(10)
    .throwOnError();
};

export type GetOtherProjectResponse = PostgrestSingleResponse<OtherProjects>;

export type OtherProjects = QueryData<ReturnType<typeof getOtherProjects>>;

export type OtherProject = ElementType<OtherProjects>;
