import {
  BLOG_CATEGORIES,
  BLOG_PATH,
  BLOG_RELATED_POSTS_LIMIT,
  BlogCategorySlug,
  isBlogCategorySlug,
} from "@/app/blog/_constants/blog";
import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

/**
 * Los artículos viven como archivos MDX en `content/blog/` con el frontmatter
 * de la "Plantilla Artículo" del Vault. Publicar = agregar el archivo (y sus
 * imágenes en `public/blog/{slug}/`) y hacer deploy; no hay base de datos.
 */
const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SUPPORTED_EXTENSIONS = new Set([".mdx", ".md"]);
const WORDS_PER_MINUTE = 200;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const RESERVED_SLUGS = new Set(["categoria", "rss", "sitemap"]);
const MARKDOWN_IMAGE_PATTERN = /!\[[^\]]*\]\((\/[^)\s]+)/g;
const FRONTMATTER_PATTERN = /^﻿?---\r?\n([\s\S]*?)\r?\n---/;

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export type BlogPostStatus = "borrador" | "publicado";

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: BlogCategorySlug;
  tags: string[];
  /** AAAA-MM-DD */
  publishedAt: string;
  /** AAAA-MM-DD */
  updatedAt: string | null;
  author: string | null;
  status: BlogPostStatus;
  coverImage: string | null;
  coverImageAlt: string | null;
  readingTimeMinutes: number;
  wordCount: number;
  /** Cuerpo MDX sin el frontmatter. */
  content: string;
};

type LoadResult = {
  posts: BlogPost[];
  errors: string[];
};

let cachedResult: LoadResult | null = null;
let hasReportedErrors = false;

/**
 * Artículos visibles, del más reciente al más antiguo. En desarrollo incluye
 * los borradores (para poder revisarlos con `pnpm dev`); en producción solo
 * los que tienen `estado: publicado`.
 */
export function getPosts(): BlogPost[] {
  const { posts, errors } = getLoadResult();

  if (errors.length > 0) {
    if (IS_DEVELOPMENT) {
      throw new Error(formatErrors(errors));
    }

    if (!hasReportedErrors) {
      console.error(formatErrors(errors));
      hasReportedErrors = true;
    }
  }

  return posts.filter((post) => IS_DEVELOPMENT || post.status === "publicado");
}

export const getPublishedPosts = () =>
  getPosts().filter((post) => post.status === "publicado");

export const getPostBySlug = (slug: string) =>
  getPosts().find((post) => post.slug === slug) ?? null;

export const getPostsByCategory = (category: BlogCategorySlug) =>
  getPosts().filter((post) => post.category === category);

export const getRelatedPosts = (
  post: BlogPost,
  limit = BLOG_RELATED_POSTS_LIMIT
) =>
  getPostsByCategory(post.category)
    .filter((candidate) => candidate.slug !== post.slug)
    .slice(0, limit);

export const countPostsByCategory = () => {
  const posts = getPosts();

  return Object.fromEntries(
    BLOG_CATEGORIES.map(({ slug }) => [
      slug,
      posts.filter((post) => post.category === slug).length,
    ])
  ) as Record<BlogCategorySlug, number>;
};

/**
 * Falla si algún artículo tiene el frontmatter o las imágenes mal. El sitemap
 * del blog lo llama y se genera en `next build`, así que un artículo roto
 * frena el deploy en vez de salir a producción.
 */
export function assertValidPosts() {
  const { errors } = getLoadResult();

  if (errors.length > 0) {
    throw new Error(formatErrors(errors));
  }
}

function getLoadResult(): LoadResult {
  // En desarrollo se relee en cada request para ver los cambios al instante.
  // En producción el contenido no cambia entre deploys: se lee una sola vez.
  if (IS_DEVELOPMENT) {
    return loadPosts();
  }

  cachedResult ??= loadPosts();

  return cachedResult;
}

function loadPosts(): LoadResult {
  if (!fs.existsSync(CONTENT_DIR)) {
    return { posts: [], errors: [] };
  }

  const fileNames = fs
    .readdirSync(CONTENT_DIR)
    .filter(
      (fileName) =>
        SUPPORTED_EXTENSIONS.has(path.extname(fileName)) &&
        !fileName.startsWith(".") &&
        !fileName.startsWith("_")
    );

  const posts: BlogPost[] = [];
  const errors: string[] = [];
  const fileBySlug = new Map<string, string>();

  for (const fileName of fileNames) {
    const { post, errors: fileErrors } = parsePostFile(fileName);

    errors.push(...fileErrors.map((error) => `${fileName}: ${error}`));

    if (!post) continue;

    const duplicatedIn = fileBySlug.get(post.slug);

    if (duplicatedIn) {
      errors.push(
        `${fileName}: el slug "${post.slug}" ya lo usa ${duplicatedIn}`
      );
      continue;
    }

    fileBySlug.set(post.slug, fileName);
    posts.push(post);
  }

  posts.sort(
    (a, b) =>
      b.publishedAt.localeCompare(a.publishedAt) ||
      a.title.localeCompare(b.title, "es")
  );

  return { posts, errors };
}

function parsePostFile(fileName: string): {
  post: BlogPost | null;
  errors: string[];
} {
  const source = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = matter(source);
  const errors: string[] = [];

  // Las fechas se leen del texto literal: YAML convierte `2026-13-45` en una
  // fecha válida (se "desborda" a 2027-02-14) y el error pasaría inadvertido.
  // (No se usa `file.matter` de gray-matter: su caché lo pierde en la 2.ª
  // lectura del mismo archivo.)
  const rawFrontmatter = source.match(FRONTMATTER_PATTERN)?.[1] ?? "";
  const rawPublishedAt = readRawValue(rawFrontmatter, "fecha_publicacion");
  const rawUpdatedAt = readRawValue(rawFrontmatter, "fecha_actualizacion");

  const slug = toText(data.slug) || path.parse(fileName).name;
  const title = toText(data.titulo);
  const description = toText(data.descripcion_seo);
  const category = data.categoria;
  const status = data.estado;
  const publishedAt = toIsoDate(rawPublishedAt);
  const updatedAt = toIsoDate(rawUpdatedAt);
  const coverImage = toText(data.imagen_portada) || null;
  const coverImageAlt = toText(data.imagen_portada_alt) || null;

  if (!SLUG_PATTERN.test(slug)) {
    errors.push(
      `\`slug\` "${slug}" debe ir en kebab-case, en minúsculas y sin tildes`
    );
  }

  if (RESERVED_SLUGS.has(slug)) {
    errors.push(`\`slug\` "${slug}" está reservado por el blog`);
  }

  if (!title) errors.push("falta `titulo`");

  if (!isBlogCategorySlug(category)) {
    errors.push(
      `\`categoria\` "${category ?? ""}" no está en el enum: ${BLOG_CATEGORIES.map(({ slug }) => slug).join(", ")}`
    );
  }

  if (status !== "borrador" && status !== "publicado") {
    errors.push('`estado` debe ser "borrador" o "publicado"');
  }

  if (!publishedAt) {
    errors.push("`fecha_publicacion` debe tener el formato AAAA-MM-DD");
  }

  if (rawUpdatedAt && !updatedAt) {
    errors.push("`fecha_actualizacion` debe tener el formato AAAA-MM-DD");
  }

  if (status === "publicado") {
    if (!description) errors.push("falta `descripcion_seo`");
    if (!coverImage) errors.push("falta `imagen_portada`");
    if (!coverImageAlt) errors.push("falta `imagen_portada_alt`");
  }

  if (coverImage && !coverImage.startsWith(`${BLOG_PATH}/`)) {
    errors.push(
      `\`imagen_portada\` debe ser la ruta pública final (/blog/${slug}/...), no "${coverImage}"`
    );
  }

  errors.push(...findMissingImages([coverImage, ...getBodyImages(content)]));

  if (errors.length > 0 || !isBlogCategorySlug(category) || !publishedAt) {
    return { post: null, errors };
  }

  const wordCount = countWords(content);

  return {
    post: {
      slug,
      title,
      seoTitle: toText(data.titulo_seo) || title,
      description,
      category,
      tags: Array.isArray(data.tags)
        ? data.tags.map(toText).filter(Boolean)
        : [],
      publishedAt,
      updatedAt,
      author: toText(data.autor) || null,
      status: status as BlogPostStatus,
      coverImage,
      coverImageAlt,
      readingTimeMinutes:
        toPositiveInteger(data.tiempo_lectura_min) ??
        Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
      wordCount,
      content,
    },
    errors,
  };
}

/**
 * Verifica que las imágenes referenciadas existan en `public/`. Solo aplica
 * donde esa carpeta está en disco (desarrollo y `next build`); en las
 * funciones serverless de producción `public/` lo sirve la CDN.
 */
function findMissingImages(imagePaths: (string | null)[]) {
  if (!fs.existsSync(PUBLIC_DIR)) return [];

  return imagePaths
    .filter((imagePath): imagePath is string => Boolean(imagePath))
    .filter((imagePath) => imagePath.startsWith("/"))
    .filter((imagePath) => !fs.existsSync(path.join(PUBLIC_DIR, imagePath)))
    .map((imagePath) => `la imagen "${imagePath}" no existe en public/`);
}

const getBodyImages = (content: string) =>
  Array.from(content.matchAll(MARKDOWN_IMAGE_PATTERN), (match) => match[1]);

const countWords = (content: string) =>
  content
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|~]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

const toText = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const toPositiveInteger = (value: unknown) => {
  const number = typeof value === "string" ? Number(value) : value;

  return typeof number === "number" && Number.isInteger(number) && number > 0
    ? number
    : null;
};

/** Valor literal de una clave del frontmatter, sin comillas. */
const readRawValue = (frontmatter: string, key: string) =>
  frontmatter
    .match(new RegExp(`^${key}:[ \\t]*(.*)$`, "m"))?.[1]
    .trim()
    .replace(/^["']|["']$/g, "") || null;

/** "AAAA-MM-DD" que además exista en el calendario (nada de 2026-02-30). */
const toIsoDate = (value: string | null) => {
  if (!value || !ISO_DATE_PATTERN.test(value)) return null;

  const date = new Date(`${value}T00:00:00Z`);

  return !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
    ? value
    : null;
};

const formatErrors = (errors: string[]) =>
  [
    "Hay artículos del blog con errores (content/blog):",
    ...errors.map((error) => `  - ${error}`),
  ].join("\n");
