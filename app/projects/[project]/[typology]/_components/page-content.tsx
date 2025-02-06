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
import { SimpleAnalytics } from "@/services/simple-analytics/simple-analytics";
import { cn } from "@inverclick/inverclick-ui/lib";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { useEffect, useRef } from "react";

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

  useManageAnalytics({ project, canInteractWithFeatures });

  return (
    <main>
      <Header />
      <div
        className={
          "p-content-full mx-auto flex max-w-screen-2xl flex-col gap-12"
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
                "pointer-events-none blur-sm": !canInteractWithFeatures,
              })}
            />
            {!canInteractWithFeatures && (
              <div className="absolute -left-1 top-0 h-full w-[calc(100%+0.5rem)] bg-gradient-to-b from-transparent to-white"></div>
            )}
          </div>
          {!canInteractWithFeatures && (
            <div className="absolute left-1/2 top-96 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-8">
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

/**
 * Custom hook to manage analytics for a project view.
 *
 * Triggers an analytics event when the user can interact with project features,
 * indicating that a registered user has viewed the project.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {Project} params.project - The project being viewed.
 * @param {boolean} params.canInteractWithFeatures - Flag indicating if the user can interact with project features.
 */

function useManageAnalytics({
  project,
  canInteractWithFeatures,
}: {
  project: Project;
  canInteractWithFeatures: boolean;
}) {
  useEffect(() => {
    if (!canInteractWithFeatures) return;

    SimpleAnalytics.viewProjectAsRegisteredUser({
      projectId: project.id,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canInteractWithFeatures]);
}
