"use client";

import { Avatar, AvatarFallback } from "@inverclick/inverclick-ui/avatar";
import { cn } from "@inverclick/inverclick-ui/lib";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { Star } from "lucide-react";
import { forwardRef } from "react";

export type ReviewProps = Readonly<{
  username: string;
  rating: number;
  date: Date;
  comment: string;
  lineClamp?: boolean;
  showMoreCommentsTrigger?: boolean;
  onClickMoreComments?: () => void;
}>;

export const Review = forwardRef<HTMLDivElement, ReviewProps>(
  (
    {
      username,
      rating,
      date,
      comment,
      lineClamp,
      showMoreCommentsTrigger,
      onClickMoreComments,
    },
    ref
  ) => {
    return (
      <article ref={ref}>
        <div className="flex gap-4 items-center mb-4">
          <Avatar>
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <Typography className="font-medium">{username}</Typography>
        </div>
        <div className="flex gap-2 items-center mb-4">
          <div className="flex gap-1">
            {Array(rating)
              .fill(0)
              .map((_, index) => (
                <Star
                  key={index}
                  className="size-4 fill-primary stroke-primary"
                />
              ))}
            {Array(5 - rating)
              .fill(0)
              .map((_, index) => (
                <Star key={index} className="size-4 stroke-primary" />
              ))}
          </div>
          <Typography>•</Typography>
          <Typography className="font-medium">
            {formatDistance(date, new Date(), { addSuffix: true, locale: es })}
          </Typography>
        </div>
        <div>
          <Typography
            className={cn({
              "line-clamp-3": lineClamp,
            })}
          >
            {comment}
          </Typography>
          {showMoreCommentsTrigger && (
            <button
              className="underline font-medium mt-4"
              onClick={onClickMoreComments}
            >
              Ver más
            </button>
          )}
        </div>
      </article>
    );
  }
);

Review.displayName = "Review";
