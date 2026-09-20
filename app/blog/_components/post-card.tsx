import { getBlogCategory } from "@/app/blog/_constants/blog";
import { BlogPost } from "@/app/blog/_services/posts";
import { formatPostDate, formatReadingTime } from "@/app/blog/_utils/format";
import { getCategoryPath, getPostPath } from "@/app/blog/_utils/paths";

import Image from "next/image";
import Link from "next/link";

export type PostCardProps = Readonly<{
  post: BlogPost;
  /** h2 en los listados (bajo el H1 de la página), h3 en "relacionados". */
  headingLevel?: "h2" | "h3";
  /** Solo para las portadas de la primera fila, que entran en pantalla. */
  isPriority?: boolean;
}>;

export function PostCard({
  post,
  headingLevel: Heading = "h2",
  isPriority = false,
}: PostCardProps) {
  const href = getPostPath(post.slug);
  const category = getBlogCategory(post.category);

  return (
    <article className="group flex h-full flex-col">
      {/* La portada repite el enlace del título: se saca del orden de
          tabulación para no duplicar la parada del teclado. */}
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[16/9] overflow-hidden rounded-2xl bg-primary-50"
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt ?? ""}
            fill
            priority={isPriority}
            sizes="(min-width: 1280px) 384px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary-100 to-primary-300" />
        )}
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
        <Link
          href={getCategoryPath(post.category)}
          className="font-semibold text-primary-600 hover:underline"
        >
          {category.label}
        </Link>
        <span aria-hidden="true">·</span>
        <time dateTime={post.publishedAt}>
          {formatPostDate(post.publishedAt)}
        </time>
        <span aria-hidden="true">·</span>
        <span>{formatReadingTime(post.readingTimeMinutes)}</span>
        {post.status === "borrador" && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 font-semibold text-amber-800">
            Borrador
          </span>
        )}
      </div>
      <Heading className="mt-2 text-balance text-lg font-semibold leading-snug text-gray-950 md:text-xl">
        <Link
          href={href}
          className="transition-colors hover:text-primary-600 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
        >
          {post.title}
        </Link>
      </Heading>
      {post.description && (
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
          {post.description}
        </p>
      )}
    </article>
  );
}
