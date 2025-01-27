import { supabase } from "@/services/supabase/supabase";
import { ElementType } from "@/types/typescript";
import { PostgrestSingleResponse, QueryData } from "@supabase/supabase-js";

export type GetProjectReviewsCountParams = {
  projectId: string;
};

export const getProjectReviewsCount = ({
  projectId,
}: GetProjectReviewsCountParams) => {
  return supabase
    .from("project_reviews")
    .select(`*`, { count: "exact", head: true })
    .eq("project_id", projectId);
};

export type GetProjectReviewsCountResponse =
  PostgrestSingleResponse<ProjectReviewsCount>;

export type ProjectReviewsCount = QueryData<
  ReturnType<typeof getProjectReviewsCount>
>;

export type ProjectReviewCount = ElementType<ProjectReviewsCount>;
