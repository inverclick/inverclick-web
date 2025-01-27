import { supabase } from "@/services/supabase/supabase";
import { ElementType } from "@/types/typescript";
import { PostgrestSingleResponse, QueryData } from "@supabase/supabase-js";

export type GetProjectReviewsParams = {
  projectId: string;
  pageParam?: {
    limit?: number;
    offset?: number;
  };
};

export const getProjectReviews = ({
  projectId,
  pageParam,
}: GetProjectReviewsParams) => {
  const limit = pageParam?.limit || 6;
  const offset = pageParam?.offset || 0;

  return supabase
    .from("project_reviews")
    .select(`*, user:users(*)`)
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false })
    .eq("project_id", projectId);
};

export type GetProjectReviewsResponse = PostgrestSingleResponse<ProjectReviews>;

export type ProjectReviews = QueryData<ReturnType<typeof getProjectReviews>>;

export type ProjectReview = ElementType<ProjectReviews>;
