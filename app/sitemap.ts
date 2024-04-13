import { ENV_VARS } from "@/global/env";
import { getProjects } from "@/services/projects";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {data: projects} = await getProjects()
  const projectsEntries = projects.map(({_id, updatedAt}) => ({
    url: `${ENV_VARS.BASE_URL}/projects/${_id}`,
    lastModified: new Date(updatedAt),
  }))

  return [
    {  
      url: ENV_VARS.BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${ENV_VARS.BASE_URL}/projects`,
      lastModified: new Date(),
    },
    ...projectsEntries
  ]
}