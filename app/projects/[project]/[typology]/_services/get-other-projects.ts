import { supabase } from "@/services/supabase/supabase";
import { PROJECT_CARD_SELECT } from "@/services/projects/project-card-select";
import { ProjectToDisplay } from "@/types/domain/projects";
import { ElementType } from "@/types/typescript";
import { PostgrestSingleResponse, QueryData } from "@supabase/supabase-js";

export type GetOtherProjectParams = {
  projectId: string;
};

export const getOtherProjects = ({ projectId }: GetOtherProjectParams) => {
  return supabase
    .from("projects")
    .select(PROJECT_CARD_SELECT)
    .eq("status", "PUBLISHED")
    .neq("id", projectId)
    .limit(10)
    .returns<ProjectToDisplay[]>()
    .throwOnError();
};

export type GetOtherProjectResponse = PostgrestSingleResponse<OtherProjects>;

export type OtherProjects = QueryData<ReturnType<typeof getOtherProjects>>;

export type OtherProject = ElementType<OtherProjects>;
