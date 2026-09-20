import {
  BlogBreadcrumb,
  BlogBreadcrumbItem,
} from "@/app/blog/_components/blog-breadcrumb";
import {
  CategoryOption,
  CategorySelector,
} from "@/app/blog/_components/category-selector";
import { PostCard } from "@/app/blog/_components/post-card";
import {
  BLOG_CATEGORIES,
  BLOG_PATH,
  BlogCategorySlug,
} from "@/app/blog/_constants/blog";
import { BlogPost, countPostsByCategory } from "@/app/blog/_services/posts";
import { getCategoryPath } from "@/app/blog/_utils/paths";
import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";
import { ReactNode } from "react";

import Link from "next/link";

export type BlogListingProps = Readonly<{
  posts: BlogPost[];
  activeCategory: BlogCategorySlug | null;
  title: ReactNode;
  description: string;
  breadcrumb?: BlogBreadcrumbItem[];
}>;

/** Listado de artículos: página principal del blog y páginas de categoría. */
export function BlogListing({
  posts,
  activeCategory,
  title,
  description,
  breadcrumb,
}: BlogListingProps) {
  const countByCategory = countPostsByCategory();

  const categoryOptions: CategoryOption[] = [
    {
      slug: null,
      label: "Todas las categorías",
      href: BLOG_PATH,
      count: Object.values(countByCategory).reduce((a, b) => a + b, 0),
    },
    ...BLOG_CATEGORIES.map(({ slug, label }) => ({
      slug,
      label,
      href: getCategoryPath(slug),
      count: countByCategory[slug],
    })),
  ];

  return (
    <main className="flex min-h-dvh flex-col bg-white">
      <Header />
      <div className="mx-auto w-full max-w-screen-xl flex-1 px-6 pb-20 pt-10 md:px-10 md:pt-14 xl:px-20">
        {breadcrumb && (
          <div className="mb-6">
            <BlogBreadcrumb items={breadcrumb} />
          </div>
        )}
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">
            Blog
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-gray-950 md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-pretty text-base leading-7 text-gray-600 md:text-lg md:leading-8">
            {description}
          </p>
        </header>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <CategorySelector
            options={categoryOptions}
            activeSlug={activeCategory}
          />
          <p className="text-sm text-gray-500">
            {posts.length} {posts.length === 1 ? "artículo" : "artículos"}
          </p>
        </div>
        {posts.length > 0 ? (
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <li key={post.slug}>
                <PostCard post={post} isPriority={index < 3} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <p className="text-lg font-medium text-gray-950">
              {activeCategory
                ? "Todavía no hay artículos en esta categoría."
                : "Muy pronto publicaremos los primeros artículos."}
            </p>
            {activeCategory && (
              <Link
                href={BLOG_PATH}
                className="font-medium text-primary-600 underline underline-offset-4 hover:text-primary-700"
              >
                Ver todos los artículos
              </Link>
            )}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
