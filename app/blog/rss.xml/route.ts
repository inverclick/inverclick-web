import {
  BLOG_DESCRIPTION,
  BLOG_NAME,
  BLOG_PATH,
  getBlogCategory,
} from "@/app/blog/_constants/blog";
import { getPublishedPosts } from "@/app/blog/_services/posts";
import { absoluteUrl, getPostPath } from "@/app/blog/_utils/paths";
import { RSS_FEED_PATH } from "@/app/blog/_utils/seo";

/** Feed RSS 2.0 del blog (/blog/rss.xml). Se genera estático en el build. */
export function GET() {
  const items = getPublishedPosts()
    .map((post) => {
      const url = absoluteUrl(getPostPath(post.slug));

      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<description>${escapeXml(post.description)}</description>`,
        `<category>${escapeXml(getBlogCategory(post.category).label)}</category>`,
        `<pubDate>${new Date(`${post.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>`,
        "</item>",
      ].join("");
    })
    .join("");

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    `<title>${escapeXml(BLOG_NAME)}</title>`,
    `<link>${absoluteUrl(BLOG_PATH)}</link>`,
    `<description>${escapeXml(BLOG_DESCRIPTION)}</description>`,
    "<language>es-co</language>",
    `<atom:link href="${absoluteUrl(RSS_FEED_PATH)}" rel="self" type="application/rss+xml"/>`,
    items,
    "</channel>",
    "</rss>",
  ].join("");

  return new Response(feed, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
