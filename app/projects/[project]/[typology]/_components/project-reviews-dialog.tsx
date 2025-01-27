import { getProjectReviews } from "@/app/projects/[project]/[typology]/_services/get-project-reviews";
import { Review } from "@/components/shared/review/review";
import { ReviewSkeleton } from "@/components/shared/review/review-skeleton";
import { ALL_PROJECT_REVIEWS_QUERY_KEY } from "@/constants/query-keys";
import { Button } from "@inverclick/inverclick-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@inverclick/inverclick-ui/dialog";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ComponentProps, useRef } from "react";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export type ProjectReviewsDialogProps = ComponentProps<typeof Dialog> & {
  projectId: string;
  totalReviews: number;
  scrollToReviewId?: string;
};

export function ProjectReviewsDialog({ ...props }: ProjectReviewsDialogProps) {
  return (
    <Dialog {...props}>
      {props.open && <ProjectReviewsDialogContent {...props} />}
    </Dialog>
  );
}

function ProjectReviewsDialogContent({
  projectId,
  totalReviews,
  scrollToReviewId,
}: ProjectReviewsDialogProps) {
  const LIMIT = 6;

  const reviewToScrollToRef = useRef<HTMLDivElement | null>(null);

  const {
    data: response,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      return await getProjectReviews({
        projectId,
        pageParam,
      });
    },
    queryKey: [ALL_PROJECT_REVIEWS_QUERY_KEY, projectId],
    initialPageParam: { limit: LIMIT, offset: 0 },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPageParam.offset + LIMIT >= totalReviews) {
        return undefined;
      }

      return {
        limit: lastPageParam.limit,
        offset: lastPageParam.offset + LIMIT,
      };
    },
  });

  return (
    <DialogContent className="!max-w-less-tablet overflow-y-hidden">
      <DialogHeader>
        <DialogTitle>{`${totalReviews} reseñas`}</DialogTitle>
        <VisuallyHidden.Root>
          <DialogDescription>Reseñas</DialogDescription>
        </VisuallyHidden.Root>
      </DialogHeader>
      {response && response?.pages.length > 0 && (
        <div className="flex flex-col gap-8 my-4 overflow-y-auto">
          {response.pages.map((page) => (
            <>
              {page.data?.map((review) => (
                <Review
                  key={review.id}
                  ref={(node) => {
                    /**
                     * If node exists, reviewToScrollToRef hasn't been set yet and
                     * scrollToReviewId matches review.id, then scroll into view the review
                     *
                     * Checking reviewToScrollToRef.current is important because
                     * React may call ref multiple times
                     */
                    if (
                      node &&
                      !reviewToScrollToRef.current &&
                      scrollToReviewId === review.id
                    ) {
                      reviewToScrollToRef.current = node;
                      node.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                  username={review.user.name}
                  date={new Date(review.created_at)}
                  rating={review.rating}
                  comment={review.comment}
                />
              ))}
            </>
          ))}
        </div>
      )}
      {isLoading && (
        <div className="flex flex-col gap-8 my-4 overflow-y-auto">
          <ReviewSkeleton />
          <ReviewSkeleton />
          <ReviewSkeleton />
          <ReviewSkeleton />
          <ReviewSkeleton />
          <ReviewSkeleton />
        </div>
      )}
      <DialogFooter>
        <Button
          variant="outline-primary"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          isLoading={isFetchingNextPage}
        >
          {hasNextPage ? "Ver más reseñas" : "Parece que no hay mas reseñas"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
