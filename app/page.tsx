import { ENV_VARS } from "@/global/env";
import { Metadata } from "next";
import Projects from "./projects/page";

// "/" is the projects map, same as /projects (kept for existing links and
// services). Segment config must be literal here; keep it in sync with
// app/projects/page.tsx.
export const dynamic = "force-dynamic";
export const runtime = "edge";

// Brand title and description come from the root layout.
export const metadata: Metadata = {
  // Pages replace the layout's openGraph object, so repeat the site fields.
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Inverclick",
    url: ENV_VARS.BASE_URL,
    description:
      "Accede a un mapa dinámico de opciones inmobiliarias en toda Colombia, explora las mejores alternativas de inversión.",
  },
};

export default Projects;
