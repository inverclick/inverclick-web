import { ENV_VARS } from "@/global/env";
import { MetadataRoute } from "next";

export const dynamic = 'force-dynamic'
export const runtime = 'edge' 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  //const {data: projects} = await supabase.from('projects').select('id, created_at')
  // const projectsEntries = (projects ?? []).map(({ id, created_at }) => ({
  //   url: `${ENV_VARS.BASE_URL}/projects/${id}`,
  //   lastModified: new Date(created_at),
  // }))

  return [
    {  
      url: ENV_VARS.BASE_URL,
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
    // ...projectsEntries
  ]
}