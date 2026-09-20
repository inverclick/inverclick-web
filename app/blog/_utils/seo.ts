import {
  BLOG_DEFAULT_AUTHOR,
  BLOG_DESCRIPTION,
  BLOG_NAME,
  BLOG_PATH,
  getBlogCategory,
} from "@/app/blog/_constants/blog";
import { BlogPost } from "@/app/blog/_services/posts";
import { absoluteUrl, getPostPath } from "@/app/blog/_utils/paths";
import { Metadata } from "next";

const SITE_NAME = "Inverclick";
const LOCALE = "es_CO";
const LANGUAGE = "es-CO";

export type BreadcrumbEntry = Readonly<{ label: string; path: string }>;

export const RSS_FEED_PATH = `${BLOG_PATH}/rss.xml`;

/** Feed RSS enlazado desde el <head> de las páginas del blog. */
export const RSS_ALTERNATE: NonNullable<Metadata["alternates"]>["types"] = {
  "application/rss+xml": [
    { url: absoluteUrl(RSS_FEED_PATH), title: BLOG_NAME },
  ],
};

export function buildListingMetadata({
  title,
  socialTitle,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  socialTitle: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url, types: RSS_ALTERNATE },
    // Un listado sin artículos (blog o categoría) no aporta nada a los buscadores.
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      url,
      title: socialTitle,
      description,
      siteName: SITE_NAME,
      locale: LOCALE,
    },
    twitter: { card: "summary", title: socialTitle, description },
  };
}

export function buildPostMetadata(post: BlogPost): Metadata {
  const url = absoluteUrl(getPostPath(post.slug));
  const author = post.author ?? BLOG_DEFAULT_AUTHOR;
  const image = post.coverImage
    ? {
        url: absoluteUrl(post.coverImage),
        alt: post.coverImageAlt ?? post.title,
      }
    : null;

  return {
    // `titulo_seo` ya viene pensado para <= 60 caracteres: se usa tal cual,
    // sin el sufijo " - Inverclick" de la plantilla del layout.
    title: { absolute: post.seoTitle },
    description: post.description,
    authors: [{ name: author }],
    alternates: { canonical: url, types: RSS_ALTERNATE },
    robots:
      post.status === "borrador" ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url,
      title: post.seoTitle,
      description: post.description,
      siteName: SITE_NAME,
      locale: LOCALE,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [author],
      section: getBlogCategory(post.category).label,
      tags: post.tags,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: post.seoTitle,
      description: post.description,
      images: image ? [image.url] : undefined,
    },
  };
}

const PUBLISHER = {
  "@type": "Organization",
  name: SITE_NAME,
  url: absoluteUrl("/"),
} as const;

export function buildPostJsonLd(post: BlogPost) {
  const url = absoluteUrl(getPostPath(post.slug));

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: post.coverImage ? [absoluteUrl(post.coverImage)] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: post.author
      ? { "@type": "Person", name: post.author }
      : { ...PUBLISHER, name: BLOG_DEFAULT_AUTHOR },
    publisher: PUBLISHER,
    articleSection: getBlogCategory(post.category).label,
    keywords: post.tags.length > 0 ? post.tags.join(", ") : undefined,
    wordCount: post.wordCount,
    timeRequired: `PT${post.readingTimeMinutes}M`,
    inLanguage: LANGUAGE,
    isPartOf: { "@type": "Blog", name: BLOG_NAME, url: absoluteUrl(BLOG_PATH) },
  };
}

export function buildBlogJsonLd(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: BLOG_NAME,
    description: BLOG_DESCRIPTION,
    url: absoluteUrl(BLOG_PATH),
    inLanguage: LANGUAGE,
    publisher: PUBLISHER,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(getPostPath(post.slug)),
      datePublished: post.publishedAt,
      image: post.coverImage ? absoluteUrl(post.coverImage) : undefined,
    })),
  };
}

export function buildBreadcrumbJsonLd(entries: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.label,
      item: absoluteUrl(entry.path),
    })),
  };
}
