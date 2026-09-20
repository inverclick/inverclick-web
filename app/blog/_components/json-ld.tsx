export type JsonLdProps = Readonly<{ data: Record<string, unknown> }>;

/** Datos estructurados (schema.org) para buscadores. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Escapar "<" evita que un texto con "</script>" cierre la etiqueta.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
