import { PostCard } from "@/app/blog/_components/post-card";
import { BlogPost } from "@/app/blog/_services/posts";

export type RelatedPostsProps = Readonly<{ posts: BlogPost[] }>;

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="related-posts-title"
      className="border-t border-gray-200"
    >
      <div className="mx-auto max-w-screen-xl px-6 py-14 md:px-10 md:py-20 xl:px-20">
        <h2
          id="related-posts-title"
          className="text-2xl font-semibold tracking-tight text-gray-950 md:text-3xl"
        >
          Artículos relacionados
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} headingLevel="h3" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
