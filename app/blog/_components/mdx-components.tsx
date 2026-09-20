import { cn } from "@/lib/utils";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import {
  Children,
  ComponentPropsWithoutRef,
  isValidElement,
  ReactNode,
} from "react";

import Link from "next/link";

const BODY_TEXT = "text-[17px] leading-8 text-gray-700 md:text-lg md:leading-8";

/** El H1 es el título del artículo: un `#` en el cuerpo se degrada a H2. */
function Heading2({ className, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={cn(
        "mt-12 scroll-mt-28 text-balance text-2xl font-semibold leading-tight tracking-tight text-gray-950 md:text-[1.75rem]",
        className
      )}
      {...props}
    />
  );
}

function Heading3({ className, ...props }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={cn(
        "mt-9 scroll-mt-28 text-xl font-semibold leading-snug text-gray-950",
        className
      )}
      {...props}
    />
  );
}

function Heading4({ className, ...props }: ComponentPropsWithoutRef<"h4">) {
  return (
    <h4
      className={cn("mt-7 text-lg font-semibold text-gray-950", className)}
      {...props}
    />
  );
}

function ArticleImage({ src, alt, title }: ComponentPropsWithoutRef<"img">) {
  return (
    <figure className="my-10 md:-mx-12">
      {/* Las imágenes del cuerpo ya se suben comprimidas en .webp (ver Guía de
          Escritura), por eso no pasan por el optimizador de next/image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
        className="w-full rounded-2xl bg-primary-50"
      />
      {title && (
        <figcaption className="mt-3 text-center text-sm text-gray-500">
          {title}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Markdown envuelve una imagen suelta en un párrafo; como la imagen se
 * renderiza en un <figure>, ese párrafo se omite para no anidar un bloque
 * dentro de un <p>.
 */
function Paragraph({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  const nodes = Children.toArray(children);

  if (
    nodes.length === 1 &&
    isValidElement(nodes[0]) &&
    nodes[0].type === ArticleImage
  ) {
    return <>{children}</>;
  }

  return (
    <p className={cn("mt-5", BODY_TEXT, className)} {...props}>
      {children}
    </p>
  );
}

function Anchor({
  href = "",
  className,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const classes = cn(
    "font-medium text-primary-600 underline decoration-primary-300 underline-offset-4 transition-colors hover:text-primary-700 hover:decoration-primary-600",
    className
  );

  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} className={classes} {...props} />;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      {...props}
    />
  );
}

function UnorderedList({
  className,
  ...props
}: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className={cn(
        "mt-5 list-disc space-y-2 pl-6 marker:text-primary-600",
        BODY_TEXT,
        className
      )}
      {...props}
    />
  );
}

function OrderedList({ className, ...props }: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className={cn(
        "mt-5 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-primary-600",
        BODY_TEXT,
        className
      )}
      {...props}
    />
  );
}

function ListItem({ className, ...props }: ComponentPropsWithoutRef<"li">) {
  return (
    <li className={cn("pl-1 [&>p]:mt-2 [&>ul]:mt-2", className)} {...props} />
  );
}

function Blockquote({
  className,
  ...props
}: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className={cn(
        "mt-8 rounded-2xl border-l-4 border-primary-600 bg-primary-50 px-6 py-5 [&>p:first-child]:mt-0 [&>p]:text-gray-800",
        className
      )}
      {...props}
    />
  );
}

function Table({ className, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200">
      <table
        className={cn(
          "w-full border-collapse text-left text-sm md:text-base",
          className
        )}
        {...props}
      />
    </div>
  );
}

function TableHead({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
  return <thead className={cn("bg-primary-50", className)} {...props} />;
}

function TableHeaderCell({
  className,
  ...props
}: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className={cn("px-4 py-3 font-semibold text-gray-950", className)}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className={cn(
        "border-t border-gray-200 px-4 py-3 align-top text-gray-700",
        className
      )}
      {...props}
    />
  );
}

function Strong({ className, ...props }: ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      className={cn("font-semibold text-gray-950", className)}
      {...props}
    />
  );
}

function InlineCode({ className, ...props }: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className={cn(
        "rounded-md bg-gray-100 px-1.5 py-0.5 text-[0.9em] text-gray-900",
        className
      )}
      {...props}
    />
  );
}

function CodeBlock({ className, ...props }: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre
      className={cn(
        "mt-6 overflow-x-auto rounded-2xl bg-gray-950 p-5 text-sm text-gray-100 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit",
        className
      )}
      {...props}
    />
  );
}

function Divider(props: ComponentPropsWithoutRef<"hr">) {
  return <hr className="my-12 border-gray-200" {...props} />;
}

export const mdxComponents: MDXRemoteProps["components"] = {
  h1: Heading2,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  p: Paragraph,
  a: Anchor,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  blockquote: Blockquote,
  img: ArticleImage,
  table: Table,
  thead: TableHead,
  th: TableHeaderCell,
  td: TableCell,
  strong: Strong,
  code: InlineCode,
  pre: CodeBlock,
  hr: Divider,
};

export type ArticleBodyProps = Readonly<{ children: ReactNode }>;

/** Columna de lectura del artículo (mismo ancho que el encabezado). */
export function ArticleBody({ children }: ArticleBodyProps) {
  return (
    <div className="mx-auto max-w-2xl px-6 [&>*:first-child]:mt-0">
      {children}
    </div>
  );
}
