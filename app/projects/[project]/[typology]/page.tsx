import {
  OtherProjectsSection,
  OtherProjectsSectionSkeleton,
} from "@/app/projects/[project]/[typology]/_components/other-projects-section";
import { PageContent } from "@/app/projects/[project]/[typology]/_components/page-content";
import { getProjectOnce } from "@/app/projects/[project]/[typology]/_services/get-project";
import {
  projectDescription,
  projectJsonLd,
  projectPath,
  projectTitle,
  serializeJsonLd,
} from "@/app/projects/[project]/[typology]/_services/project-seo";
import { ENV_VARS } from "@/global/env";
import { getAssetUrl } from "@/services/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { project: string; typology: string };
}): Promise<Metadata> {
  const projectId = params.project;
  const typologyId = params.typology;

  const { data: project } = await getProjectOnce(projectId);

  if (!project) {
    // Handle missing project
    console.warn(`Project with ID ${projectId} not found.`);
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const blueprint = project.typologies.find(
    (typology) => typology.id === typologyId
  );

  if (!blueprint) {
    // Handle missing blueprint
    console.warn(
      `Blueprint with ID ${typologyId} not found in project ${projectId}.`
    );
    return {
      title: project.name + " - Blueprint Not Found",
      description: "The requested blueprint could not be found.",
    };
  }

  const url = ENV_VARS.BASE_URL + projectPath(projectId, typologyId);
  const title = projectTitle(project, blueprint);
  const description = projectDescription(project, blueprint);
  const images = project.photos.slice(0, 4).map((photo) => ({
    url: getAssetUrl(photo),
    alt: project.name,
  }));

  return {
    title,
    description,
    alternates: { canonical: url },
    // Pages replace the layout's openGraph object, so repeat the site fields.
    openGraph: {
      type: "website",
      locale: "es_CO",
      siteName: "Inverclick",
      url,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((image) => image.url),
    },
  };
}

export default async function Page({
  params,
}: Readonly<{
  params: { project: string; typology: string };
}>) {
  const projectId = params.project;
  const typologyId = params.typology;

  const { data: project } = await getProjectOnce(projectId);

  if (!project) {
    return notFound();
  }

  const typology = project.typologies.find(
    (typology) => typology.id === typologyId
  );

  if (!typology) {
    return notFound();
  }

  const jsonLd = projectJsonLd({
    project,
    typology,
    baseUrl: ENV_VARS.BASE_URL,
    assetUrl: getAssetUrl,
  });

  return (
    <>
      {/* Structured data so search engines read the listing: price, place, photos. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <PageContent
        project={project}
        typology={typology}
        otherProjects={
          <Suspense fallback={<OtherProjectsSectionSkeleton />}>
            <OtherProjectsSection projectId={projectId} />
          </Suspense>
        }
      />
    </>
  );
}
