import { BLOG_PATH, BlogCategorySlug } from "@/app/blog/_constants/blog";
import { ENV_VARS } from "@/global/env";

export const getPostPath = (slug: string) => `${BLOG_PATH}/${slug}`;

export const getCategoryPath = (category: BlogCategorySlug) =>
  `${BLOG_PATH}/categoria/${category}`;

/** URL absoluta de producción (canonical, Open Graph, JSON-LD, sitemap, RSS). */
export const absoluteUrl = (pathname: string) =>
  `${ENV_VARS.BASE_URL.replace(/\/+$/, "")}${pathname}`;
