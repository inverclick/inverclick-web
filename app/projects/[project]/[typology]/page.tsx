import { getOtherProjects } from "@/app/projects/[project]/[typology]/_services/get-other-projects";
import { getProject } from "@/app/projects/[project]/[typology]/_services/get-project";
import { getProjectMetadata } from "@/app/projects/[project]/[typology]/_services/get-project-metadata";
import { Hero } from "@/components/projects/review/Hero";
import { OtherProjects } from "@/components/projects/review/OtherProjects";
import { ProjectContent } from "@/components/projects/review/ProjectContent";
import { ViewInformationButton } from "@/components/projects/review/view-information-button";
import { MyFooter } from "@/components/shared/footer/MyFooter";
import { Header } from "@/components/shared/header/header";
import { ENV_VARS } from "@/global/env";
import { cn } from "@/lib/utils";
import { getPreRegistration } from "@/services/pre-registration";
import { Typography } from "@inverclick/inverclick-ui/typography";
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
  const preRegistration = getPreRegistration();

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
    <main>
      <Header />
      <div
        className={
          "p-content-full flex flex-col gap-12 max-w-screen-2xl mx-auto"
        }
      >
        <div className="relative">
          <div className="relative">
            <Hero
              name={project.name}
              photos={project.photos}
              price={typology.price}
              department={project.department.name}
              city={project.city.name}
              address={project.address}
              className={cn({
                "blur-sm pointer-events-none": !preRegistration,
              })}
              disableSharableInteractions={Boolean(!preRegistration)}
            />
            {!preRegistration && (
              <div className="absolute top-0 -left-1 w-[calc(100%+0.5rem)] h-full bg-gradient-to-b from-transparent to-white"></div>
            )}
          </div>
          {!preRegistration && (
            <div className="absolute top-96 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8 justify-center items-center">
              <Typography variant="h1" className="text-center">
                Accede a este proyecto y a toda nuestra oferta
              </Typography>
              <ViewInformationButton />
            </div>
          )}
        </div>
        {preRegistration && (
          <ProjectContent project={project} typology={typology} />
        )}
        <OtherProjects projects={otherProjects ?? []} />
      </div>
      <MyFooter />
    </main>
  );
}
