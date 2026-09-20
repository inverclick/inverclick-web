export const BLOG_PATH = "/blog";

export const BLOG_NAME = "Blog de Inverclick";

export const BLOG_DESCRIPTION =
  "Guías, mercado inmobiliario y finanzas para colombianos que quieren invertir en finca raíz en Colombia desde el exterior.";

export const BLOG_DEFAULT_AUTHOR = "Equipo Inverclick";

export const BLOG_RELATED_POSTS_LIMIT = 3;

/**
 * Enum de categorías del blog. La fuente de verdad es la nota
 * "07 Blog/Categorías del Blog" del Vault de Inverclick: si allá se agrega o
 * se renombra una categoría, hay que reflejarlo aquí. El `slug` es el valor
 * literal del campo `categoria` en el frontmatter de cada artículo.
 */
export const BLOG_CATEGORIES = [
  {
    slug: "guias-de-inversion",
    label: "Guías de inversión",
    description:
      "Cómo invertir en finca raíz en Colombia paso a paso: tipos de inversión, estrategias y comparativas para decidir con información clara.",
  },
  {
    slug: "mercado-inmobiliario",
    label: "Mercado inmobiliario colombiano",
    description:
      "Tendencias, ciudades, plusvalía y dinámica del sector inmobiliario en Colombia, con datos y fuentes citadas.",
  },
  {
    slug: "finanzas-en-el-exterior",
    label: "Finanzas para el colombiano en el exterior",
    description:
      "Remesas, tasa de cambio, impuestos y trámites para invertir en Colombia cuando vives fuera del país.",
  },
  {
    slug: "historias-de-inversionistas",
    label: "Historias de inversionistas",
    description:
      "Casos y experiencias de colombianos que invierten en finca raíz en Colombia desde el exterior.",
  },
  {
    slug: "educacion-financiera",
    label: "Educación financiera básica",
    description:
      "Glosario, mitos y verdades para entender la inversión en finca raíz sin ser experto.",
  },
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogCategorySlug = BlogCategory["slug"];

export const isBlogCategorySlug = (value: unknown): value is BlogCategorySlug =>
  BLOG_CATEGORIES.some((category) => category.slug === value);

export const getBlogCategory = (slug: BlogCategorySlug): BlogCategory =>
  BLOG_CATEGORIES.find((category) => category.slug === slug)!;
