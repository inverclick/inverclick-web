import { BLOG_CATEGORIES, BLOG_PATH } from "@/app/blog/_constants/blog";
import {
  assertValidPosts,
  BlogPost,
  getPublishedPosts,
} from "@/app/blog/_services/posts";
import {
  absoluteUrl,
  getCategoryPath,
  getPostPath,
} from "@/app/blog/_utils/paths";
import { MetadataRoute } from "next";

/**
 * Sitemap propio del blog (/blog/sitemap.xml), enlazado desde robots.txt.
 * Es estático: se genera en `next build`, y por eso también sirve de
 * validación. Si un artículo tiene el frontmatter o una imagen mal, el build
 * falla y el deploy no sale.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  assertValidPosts();

  const posts = getPublishedPosts();

  return [
    {
      url: absoluteUrl(BLOG_PATH),
      lastModified: getLastModified(posts),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...BLOG_CATEGORIES.map(({ slug }) => ({
      slug,
      posts: posts.filter((post) => post.category === slug),
    }))
      .filter(({ posts: categoryPosts }) => categoryPosts.length > 0)
      .map(({ slug, posts: categoryPosts }) => ({
        url: absoluteUrl(getCategoryPath(slug)),
        lastModified: getLastModified(categoryPosts),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
    ...posts.map((post) => ({
      url: absoluteUrl(getPostPath(post.slug)),
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

const getLastModified = (posts: BlogPost[]) => {
  const dates = posts.map((post) => post.updatedAt ?? post.publishedAt).sort();

  return dates.length > 0 ? new Date(dates[dates.length - 1]) : new Date();
};
