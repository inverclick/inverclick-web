import { BlogListing } from "@/app/blog/_components/blog-listing";
import { JsonLd } from "@/app/blog/_components/json-ld";
import {
  BLOG_DESCRIPTION,
  BLOG_NAME,
  BLOG_PATH,
} from "@/app/blog/_constants/blog";
import { getPosts } from "@/app/blog/_services/posts";
import {
  buildBlogJsonLd,
  buildBreadcrumbJsonLd,
  buildListingMetadata,
} from "@/app/blog/_utils/seo";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return buildListingMetadata({
    title: "Blog: invierte en Colombia desde el exterior",
    socialTitle: BLOG_NAME,
    description: BLOG_DESCRIPTION,
    path: BLOG_PATH,
    noIndex: getPosts().length === 0,
  });
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <JsonLd data={buildBlogJsonLd(posts)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { label: "Inicio", path: "/" },
          { label: "Blog", path: BLOG_PATH },
        ])}
      />
      <BlogListing
        posts={posts}
        activeCategory={null}
        title={
          <>
            Aprende a invertir desde{" "}
            <span className="text-primary-600">EL EXTERIOR</span>
          </>
        }
        description={BLOG_DESCRIPTION}
      />
    </>
  );
}
