"use client";

import { ProjectContactBar } from "@/app/projects/[project]/[typology]/_components/project-contact-bar";
import { ProjectContent } from "@/app/projects/[project]/[typology]/_components/project-content";
import { ProjectHero } from "@/app/projects/[project]/[typology]/_components/project-hero";
import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";
import { usePreRegistration } from "@/contexts/pre-registration-context";
import { SimpleAnalytics } from "@/services/simple-analytics/simple-analytics";
import { ReactNode, useEffect } from "react";

export type PageContentProps = {
  project: Project;
  typology: Project["typologies"][0];
  /** Sección que el servidor envía por streaming (ver `OtherProjectsSection`). */
  otherProjects: ReactNode;
};

export const PageContent = ({
  project,
  typology,
  otherProjects,
}: PageContentProps) => {
  const { canInteractWithFeatures } = usePreRegistration();

  useManageAnalytics({ project, canInteractWithFeatures });

  return (
    // El padding inferior reserva el alto de la barra de contacto fija, que por
    // debajo de `xl` taparía el footer.
    <main className="pb-24 xl:pb-0">
      <Header />
      <div
        className={
          "p-content-full mx-auto flex max-w-screen-2xl flex-col gap-12"
        }
      >
        {/* Everyone sees the project (and search engines index it). Without
            a session only the description is open; the rest asks to sign in
            (see `useGatedAction`). */}
        <ProjectHero
          projectId={project.id}
          name={project.name}
          photos={project.photos}
          price={typology.price}
          department={project.department.name}
          city={project.city.name}
          address={project.address}
        />
        <ProjectContent project={project} typology={typology} />
        {otherProjects}
      </div>
      <Footer />
      <ProjectContactBar price={typology.price} projectId={project.id} />
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
