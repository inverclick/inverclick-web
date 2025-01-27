"use client";

import { OtherProjects } from "@/app/projects/[project]/[typology]/_components/other-projects";
import { ProjectContent } from "@/app/projects/[project]/[typology]/_components/project-content";
import { ProjectHero } from "@/app/projects/[project]/[typology]/_components/project-hero";
// import { ProjectReviews } from "@/app/projects/[project]/[typology]/_components/project-reviews";
import { OtherProjects as OtherProjectsType } from "@/app/projects/[project]/[typology]/_services/get-other-projects";
import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { ViewInformationButton } from "@/components/projects/review/view-information-button";
import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";
import { usePreRegistration } from "@/contexts/pre-registration-context";
import { cn } from "@inverclick/inverclick-ui/lib";
import { Typography } from "@inverclick/inverclick-ui/typography";

export type PageContentProps = {
  project: Project;
  typology: Project["typologies"][0];
  otherProjects: OtherProjectsType;
};

export const PageContent = ({
  project,
  typology,
  otherProjects,
}: PageContentProps) => {
  const { canInteractWithFeatures } = usePreRegistration();

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
            <ProjectHero
              name={project.name}
              photos={project.photos}
              price={typology.price}
              department={project.department.name}
              city={project.city.name}
              address={project.address}
              className={cn({
                "blur-sm pointer-events-none": !canInteractWithFeatures,
              })}
            />
            {!canInteractWithFeatures && (
              <div className="absolute top-0 -left-1 w-[calc(100%+0.5rem)] h-full bg-gradient-to-b from-transparent to-white"></div>
            )}
          </div>
          {!canInteractWithFeatures && (
            <div className="absolute top-96 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8 justify-center items-center">
              <Typography variant="h1" className="text-center">
                Accede a este proyecto y a toda nuestra oferta
              </Typography>
              <ViewInformationButton />
            </div>
          )}
        </div>
        {canInteractWithFeatures && (
          <ProjectContent project={project} typology={typology} />
        )}
        {/* <ProjectReviews projectId={project.id} /> */}
        <OtherProjects projects={otherProjects} />
      </div>
      <Footer />
    </main>
  );
};
