"use client";

import { ProjectReviewsDialog } from "@/app/projects/[project]/[typology]/_components/project-reviews-dialog";
import { getProjectReviews } from "@/app/projects/[project]/[typology]/_services/get-project-reviews";
import { getProjectReviewsCount } from "@/app/projects/[project]/[typology]/_services/get-project-reviews-count";
import { Review } from "@/components/shared/review/review";
import { ReviewSkeleton } from "@/components/shared/review/review-skeleton";
import {
  PROJECT_REVIEWS_QUERY_KEY,
  PROJECT_REVIEWS_QUERY_KEY_COUNT,
} from "@/constants/query-keys";
import { Button } from "@inverclick/inverclick-ui/button";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type ProjectReviewsProps = Readonly<{
  projectId: string;
}>;

export function ProjectReviews({ projectId }: ProjectReviewsProps) {
  const [scrollToReviewId, setScrollToReviewId] = useState<string | undefined>(
    undefined
  );
  const [moreCommentsOpen, setMoreCommentsOpen] = useState(false);

  const {
    data: projectReviewsResponse,
    isFetched: isFetchedReviews,
    isLoading: isLoadingReviews,
  } = useQuery({
    queryFn: async () => {
      return await getProjectReviews({ projectId });
    },
    queryKey: [PROJECT_REVIEWS_QUERY_KEY, projectId],
  });

  const { data: projectReviewsCountResponse } = useQuery({
    queryFn: async () => {
      return await getProjectReviewsCount({ projectId });
    },
    queryKey: [PROJECT_REVIEWS_QUERY_KEY_COUNT, projectId],
  });

  const projectReviews = projectReviewsResponse?.data || [];
  const totalReviews = projectReviewsCountResponse?.count || 0;

  return (
    <>
      <section>
        <Typography variant="h3" className="mb-4">
          Reseñas
        </Typography>
        {projectReviews.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {projectReviews.map((review) => {
                return (
                  <Review
                    key={review.id}
                    username={review.user.name}
                    date={new Date(review.created_at)}
                    rating={review.rating}
                    comment={review.comment}
                    onClickMoreComments={() => {
                      setScrollToReviewId(review.id);
                      setMoreCommentsOpen(true);
                    }}
                    showMoreCommentsTrigger
                    lineClamp
                  />
                );
              })}
            </div>
            <Button
              variant="outline-primary"
              onClick={() => {
                setMoreCommentsOpen(true);
                setScrollToReviewId(undefined);
              }}
            >
              Ver todas las reseñas ({totalReviews})
            </Button>
          </>
        )}
        {isLoadingReviews && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ReviewSkeleton />
            <ReviewSkeleton />
            <ReviewSkeleton />
            <ReviewSkeleton />
            <ReviewSkeleton />
            <ReviewSkeleton />
          </div>
        )}
        {isFetchedReviews && projectReviews.length === 0 && (
          <Typography variant="p">Parece que no hay reseñas</Typography>
        )}
      </section>
      <ProjectReviewsDialog
        projectId={projectId}
        totalReviews={totalReviews}
        scrollToReviewId={scrollToReviewId}
        open={moreCommentsOpen}
        onOpenChange={setMoreCommentsOpen}
      />
    </>
  );
}
