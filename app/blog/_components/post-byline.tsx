import {
  BLOG_DEFAULT_AUTHOR,
  getBlogCategory,
} from "@/app/blog/_constants/blog";
import { BlogPost } from "@/app/blog/_services/posts";
import { formatPostDate, formatReadingTime } from "@/app/blog/_utils/format";
import { getCategoryPath } from "@/app/blog/_utils/paths";

import Link from "next/link";

export type PostBylineProps = Readonly<{ post: BlogPost }>;

export function PostByline({ post }: PostBylineProps) {
  const category = getBlogCategory(post.category);
  const wasUpdated = post.updatedAt && post.updatedAt !== post.publishedAt;

  return (
    <div className="mt-5 text-sm text-gray-600">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span>
          Por{" "}
          <span className="font-medium text-gray-950">
            {post.author ?? BLOG_DEFAULT_AUTHOR}
          </span>
        </span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.publishedAt}>
          {formatPostDate(post.publishedAt)}
        </time>
        <span aria-hidden="true">·</span>
        <span>{formatReadingTime(post.readingTimeMinutes)}</span>
        <span aria-hidden="true">·</span>
        <Link
          href={getCategoryPath(post.category)}
          className="font-medium text-gray-950 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-primary-600 hover:decoration-primary-600"
        >
          {category.label}
        </Link>
      </p>
      {wasUpdated && (
        <p className="mt-1 text-gray-500">
          Actualizado el{" "}
          <time dateTime={post.updatedAt!}>
            {formatPostDate(post.updatedAt!)}
          </time>
        </p>
      )}
    </div>
  );
}
