import { mdxComponents } from "@/app/blog/_components/mdx-components";
import { BlogPost } from "@/app/blog/_services/posts";
import { compileMDX } from "next-mdx-remote/rsc";
import { ReactElement } from "react";

import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

const compiledPosts = new Map<string, Promise<ReactElement>>();

/**
 * Compila el cuerpo MDX de un artículo. `blockJS` (activo por defecto en
 * next-mdx-remote v6) descarta expresiones JS: los artículos son Markdown,
 * no código. En producción el resultado se reutiliza entre requests porque
 * el contenido solo cambia con un nuevo deploy.
 */
export function compilePostContent(post: BlogPost) {
  const cached = compiledPosts.get(post.slug);

  if (cached && !IS_DEVELOPMENT) return cached;

  const compiled = compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  }).then(({ content }) => content);

  if (!IS_DEVELOPMENT) {
    compiledPosts.set(post.slug, compiled);
    compiled.catch(() => compiledPosts.delete(post.slug));
  }

  return compiled;
}
