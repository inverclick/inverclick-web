import { supabase } from "@/services/supabase/supabase";
import { PostgrestSingleResponse, QueryData } from "@supabase/supabase-js";

export type GetDraftProjectParams = {
  projectId: string;
};

export const getDraftProject = ({ projectId }: GetDraftProjectParams) => {
  return supabase
    .from("draft_projects")
    .select(
      `*,
      typologies:draft_typologies(*),
      department:departments(*),
      city:cities(*),
      company:companies(*),
      characteristics:draft_project_characteristics(project_id:draft_project_id, *, characteristic:characteristics(*))
      `
    )
    .eq("id", projectId)
    .eq("status", "PENDING")
    .single()
    .throwOnError();
};

export type GetDraftProjectResponse = PostgrestSingleResponse<DraftProject>;

export type DraftProject = QueryData<ReturnType<typeof getDraftProject>>;
