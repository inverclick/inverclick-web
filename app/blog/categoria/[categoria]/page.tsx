import { BlogListing } from "@/app/blog/_components/blog-listing";
import { JsonLd } from "@/app/blog/_components/json-ld";
import {
  BLOG_NAME,
  BLOG_PATH,
  getBlogCategory,
  isBlogCategorySlug,
} from "@/app/blog/_constants/blog";
import { getPostsByCategory } from "@/app/blog/_services/posts";
import { getCategoryPath } from "@/app/blog/_utils/paths";
import {
  buildBreadcrumbJsonLd,
  buildListingMetadata,
} from "@/app/blog/_utils/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type BlogCategoryPageProps = Readonly<{
  params: { categoria: string };
}>;

export function generateMetadata({ params }: BlogCategoryPageProps): Metadata {
  if (!isBlogCategorySlug(params.categoria)) return {};

  const category = getBlogCategory(params.categoria);

  return buildListingMetadata({
    title: `${category.label} | Blog`,
    socialTitle: `${category.label} | ${BLOG_NAME}`,
    description: category.description,
    path: getCategoryPath(category.slug),
    noIndex: getPostsByCategory(category.slug).length === 0,
  });
}

export default function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  if (!isBlogCategorySlug(params.categoria)) notFound();

  const category = getBlogCategory(params.categoria);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { label: "Inicio", path: "/" },
          { label: "Blog", path: BLOG_PATH },
          { label: category.label, path: getCategoryPath(category.slug) },
        ])}
      />
      <BlogListing
        posts={getPostsByCategory(category.slug)}
        activeCategory={category.slug}
        title={category.label}
        description={category.description}
        breadcrumb={[
          { label: "Blog", href: BLOG_PATH },
          { label: category.label },
        ]}
      />
    </>
  );
}
