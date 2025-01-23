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

  const blueprint = project?.typologies.find(
    (typology) => typology.id === typologyId
  );

  return {
    title: project?.name + " - " + blueprint?.name,
    description: project?.description,
    alternates: {
      canonical: `${ENV_VARS.BASE_URL}/${projectId}/${typologyId}`,
    },
    openGraph: {
      url: `${ENV_VARS.BASE_URL}/${projectId}/${typologyId}`,
      title: project?.name + " - " + blueprint?.name,
      description: project?.description,
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

  /**
   * Editing project typologies re-creates (Delete and create)
   * the typologies, so the typology id may not be found
   *
   * TODO: Avoid changing the typologies id
   */
  const typology =
    project.typologies.find((typology) => typology.id === typologyId) ||
    project.typologies[0];

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
