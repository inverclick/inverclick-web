import { ENV_VARS } from "@/global/env";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${ENV_VARS.BASE_URL}/sitemap.xml`,
  };
}
