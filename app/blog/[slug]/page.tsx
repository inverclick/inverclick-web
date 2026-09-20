import { BlogBreadcrumb } from "@/app/blog/_components/blog-breadcrumb";
import { JsonLd } from "@/app/blog/_components/json-ld";
import { ArticleBody } from "@/app/blog/_components/mdx-components";
import { PostByline } from "@/app/blog/_components/post-byline";
import { RelatedPosts } from "@/app/blog/_components/related-posts";
import { ShareButtons } from "@/app/blog/_components/share-buttons";
import { BLOG_PATH, getBlogCategory } from "@/app/blog/_constants/blog";
import { compilePostContent } from "@/app/blog/_services/compile-post";
import { getPostBySlug, getRelatedPosts } from "@/app/blog/_services/posts";
import {
  absoluteUrl,
  getCategoryPath,
  getPostPath,
} from "@/app/blog/_utils/paths";
import {
  buildBreadcrumbJsonLd,
  buildPostJsonLd,
  buildPostMetadata,
} from "@/app/blog/_utils/seo";
import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import Image from "next/image";

type BlogPostPageProps = Readonly<{
  params: { slug: string };
}>;

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPostBySlug(params.slug);

  return post ? buildPostMetadata(post) : {};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) notFound();

  const content = await compilePostContent(post);
  const category = getBlogCategory(post.category);
  const postPath = getPostPath(post.slug);
  const url = absoluteUrl(postPath);

  return (
    <main className="flex min-h-dvh flex-col bg-white">
      <JsonLd data={buildPostJsonLd(post)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { label: "Inicio", path: "/" },
          { label: "Blog", path: BLOG_PATH },
          { label: category.label, path: getCategoryPath(post.category) },
          { label: post.title, path: postPath },
        ])}
      />
      <Header />
      <article className="flex-1 pb-16 pt-10 md:pt-14">
        <header className="mx-auto max-w-2xl px-6">
          <BlogBreadcrumb
            items={[
              { label: "Blog", href: BLOG_PATH },
              { label: category.label, href: getCategoryPath(post.category) },
            ]}
          />
          {post.status === "borrador" && (
            <p className="mt-4 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              Borrador: solo visible en desarrollo
            </p>
          )}
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-gray-950 md:text-5xl">
            {post.title}
          </h1>
          <PostByline post={post} />
          <ShareButtons url={url} title={post.title} className="mt-6" />
        </header>
        {post.coverImage && (
          <figure className="mx-auto mt-10 max-w-4xl px-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-primary-50">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt ?? ""}
                fill
                priority
                sizes="(min-width: 896px) 848px, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        )}
        <div className="mt-10 md:mt-12">
          <ArticleBody>{content}</ArticleBody>
        </div>
        <footer className="mx-auto mt-14 max-w-2xl px-6">
          <div className="flex flex-col gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-medium text-gray-950">
              ¿Te sirvió? Compártelo con alguien que esté pensando en invertir.
            </p>
            <ShareButtons
              url={url}
              title={post.title}
              className="shrink-0 flex-nowrap"
            />
          </div>
        </footer>
      </article>
      <RelatedPosts posts={getRelatedPosts(post)} />
      <Footer />
    </main>
  );
}
