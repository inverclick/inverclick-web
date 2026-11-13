import { ENV_VARS } from "@/global/env";
import { supabase } from "@/services/supabase/supabase";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Only published projects: the others answer 404.
  const { data: projects } = await supabase
    .from("projects")
    .select("id, created_at, updated_at, typologies(id)")
    .eq("status", "PUBLISHED");

  const projectsEntries = [];

  for (const project of projects!) {
    for (const typology of project.typologies) {
      const url = `${ENV_VARS.BASE_URL}/projects/${project.id}/${typology.id}`;
      const lastModified = new Date(project.updated_at ?? project.created_at);
      projectsEntries.push({ url, lastModified });
    }
  }

  return [
    {
      url: ENV_VARS.BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${ENV_VARS.BASE_URL}/home`,
      lastModified: new Date(),
    },
    {
      url: `${ENV_VARS.BASE_URL}/about-us`,
      lastModified: new Date(),
    },
    {
      url: `${ENV_VARS.BASE_URL}/projects`,
      lastModified: new Date(),
    },
    {
      url: `${ENV_VARS.BASE_URL}/financing`,
      lastModified: new Date(),
    },
    {
      url: `${ENV_VARS.BASE_URL}/app`,
      lastModified: new Date(),
    },
    {
      url: `${ENV_VARS.BASE_URL}/policy`,
      lastModified: new Date(),
    },
    {
      url: `${ENV_VARS.BASE_URL}/terms-conditions`,
      lastModified: new Date(),
    },
    ...projectsEntries,
  ];
}
