import { PageContent } from "@/app/projects/[project]/[typology]/_components/page-content";
import { getOtherProjects } from "@/app/projects/[project]/[typology]/_services/get-other-projects";
import { getProject } from "@/app/projects/[project]/[typology]/_services/get-project";
import { getProjectMetadata } from "@/app/projects/[project]/[typology]/_services/get-project-metadata";
import { ENV_VARS } from "@/global/env";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { project: string; typology: string };
}): Promise<Metadata> {
  const projectId = params.project;
  const typologyId = params.typology;

  const { data: project } = await getProjectMetadata({ projectId });

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

  return {
    title: project.name + " - " + blueprint.name,
    description: project.description,
    alternates: {
      canonical: `${ENV_VARS.BASE_URL}/${projectId}/${typologyId}`,
    },
    openGraph: {
      url: `${ENV_VARS.BASE_URL}/${projectId}/${typologyId}`,
      title: project.name + " - " + blueprint.name,
      description: project.description,
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

  const { data: project } = await getProject({ projectId });
  const { data: otherProjects } = await getOtherProjects({ projectId });

  if (!project) {
    return notFound();
  }

  const typology = project.typologies.find(
    (typology) => typology.id === typologyId
  );

  if (!typology) {
    return notFound();
  }

  return (
    <PageContent
      project={project}
      typology={typology}
      otherProjects={otherProjects || []}
    />
  );
}
