/**
 * What search engines and link previews see for a project page: URL, title,
 * description and schema.org data. Pure functions (no env, no network) so
 * they can be tested; the page passes the site origin and an asset URL helper.
 */

type SeoProject = {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  housing_type: string;
  latitude: number | null;
  longitude: number | null;
  photos: string[];
  created_at: string;
  updated_at: string | null;
  city: { name: string } | null;
  department: { name: string } | null;
};

type SeoTypology = {
  id: string;
  name: string;
  price: number;
  area: number | null;
  rooms: number | null;
  bathrooms: number | null;
};

const TYPE_LABEL: Record<string, string> = {
  APARTAMENTO: "Apartamentos",
  CASA: "Casas",
  LOTE: "Lotes",
  BODEGA: "Bodegas",
};

// schema.org types for the property itself.
const SCHEMA_TYPE: Record<string, string> = {
  APARTAMENTO: "Apartment",
  CASA: "SingleFamilyResidence",
  LOTE: "Place",
  BODEGA: "Place",
};

const DESCRIPTION_LENGTH = 155;

export const projectPath = (projectId: string, typologyId: string) =>
  `/projects/${projectId}/${typologyId}`;

export const placeLabel = (project: SeoProject) =>
  [project.city?.name, project.department?.name].filter(Boolean).join(", ");

export const formatCop = (value: number) =>
  "$" + Math.round(value).toLocaleString("es-CO") + " COP";

/** «Torre Nexo en Pereira – Tipo A». The layout appends « - Inverclick». */
export function projectTitle(project: SeoProject, typology: SeoTypology) {
  const city = project.city?.name;
  const base = city ? `${project.name} en ${city}` : project.name;
  return typology.name ? `${base} – ${typology.name}` : base;
}

/** Strips Markdown and collapses whitespace so it reads as one sentence. */
export function plainText(text: string) {
  return text
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)]\([^)]*\)/g, "$1") // links keep their text
    .replace(/[#>*_`~|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Cuts at a word boundary and adds an ellipsis when needed. */
export function truncate(text: string, max = DESCRIPTION_LENGTH) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (
    (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(
      /[\s,.;:–-]+$/,
      ""
    ) + "…"
  );
}

/**
 * The project's own description when it has one; otherwise a sentence built
 * from its data, e.g. «Apartamentos en Pereira, Risaralda desde $380.000.000
 * COP. 2 habitaciones, 1 baño, 44 m².»
 */
export function projectDescription(project: SeoProject, typology: SeoTypology) {
  const own = plainText(project.description ?? "");
  if (own.length >= 60) return truncate(own);

  const kind = TYPE_LABEL[project.housing_type] ?? "Proyecto";
  const place = placeLabel(project);
  const details = [
    typology.rooms
      ? `${typology.rooms} ${typology.rooms === 1 ? "habitación" : "habitaciones"}`
      : "",
    typology.bathrooms
      ? `${typology.bathrooms} ${typology.bathrooms === 1 ? "baño" : "baños"}`
      : "",
    typology.area ? `${typology.area} m²` : "",
  ].filter(Boolean);
  const summary = `${kind}${place ? ` en ${place}` : ""} desde ${formatCop(typology.price)}.`;
  const sentence = [
    project.name + ":",
    summary,
    details.length ? details.join(", ") + "." : "",
    own,
  ]
    .filter(Boolean)
    .join(" ");
  return truncate(sentence);
}

/** schema.org listing + breadcrumb, as one JSON-LD graph. */
export function projectJsonLd({
  project,
  typology,
  baseUrl,
  assetUrl,
}: {
  project: SeoProject;
  typology: SeoTypology;
  baseUrl: string;
  assetUrl: (path: string) => string;
}) {
  const url = baseUrl + projectPath(project.id, typology.id);
  const images = project.photos.map(assetUrl);
  const hasGeo = project.latitude != null && project.longitude != null;

  const property = {
    "@type": SCHEMA_TYPE[project.housing_type] ?? "Place",
    name: project.name,
    address: {
      "@type": "PostalAddress",
      ...(project.address ? { streetAddress: project.address } : {}),
      ...(project.city ? { addressLocality: project.city.name } : {}),
      ...(project.department ? { addressRegion: project.department.name } : {}),
      addressCountry: "CO",
    },
    ...(hasGeo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: project.latitude,
            longitude: project.longitude,
          },
        }
      : {}),
    ...(typology.rooms ? { numberOfRooms: typology.rooms } : {}),
    ...(typology.bathrooms
      ? { numberOfBathroomsTotal: typology.bathrooms }
      : {}),
    ...(typology.area
      ? {
          floorSize: {
            "@type": "QuantitativeValue",
            value: typology.area,
            unitCode: "MTK",
          },
        }
      : {}),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": `${url}#listing`,
        url,
        name: projectTitle(project, typology),
        description: projectDescription(project, typology),
        image: images,
        datePosted: project.created_at,
        ...(project.updated_at ? { dateModified: project.updated_at } : {}),
        offers: {
          "@type": "Offer",
          price: typology.price,
          priceCurrency: "COP",
          availability: "https://schema.org/InStock",
          url,
        },
        about: property,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Proyectos",
            item: baseUrl,
          },
          { "@type": "ListItem", position: 2, name: project.name, item: url },
        ],
      },
    ],
  };
}

/** JSON for a <script> tag: `<` escaped so text can't close the tag. */
export const serializeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
