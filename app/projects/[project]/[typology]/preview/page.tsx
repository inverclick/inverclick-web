import { ProjectContent } from "@/app/projects/[project]/[typology]/_components/project-content";
import { ProjectHero } from "@/app/projects/[project]/[typology]/_components/project-hero";
import { IncompleteProjectPage } from "@/app/projects/[project]/[typology]/preview/_components/incomplete-project-page";
import { getDraftProject } from "@/app/projects/[project]/[typology]/preview/_services/get-draft-project";
import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";
import { notFound } from "next/navigation";
import { isProjectComplete } from "./_services/is-project-complete";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function Page({
  params,
}: Readonly<{
  params: { project: string; typology: string };
}>) {
  const projectId = params.project;
  const typologyId = params.typology;

  const { data: project } = await getDraftProject({ projectId });

  if (!project) {
    return notFound();
  }

  const typology = project.typologies.find(
    (typology) => typology.id === typologyId
  );

  if (!typology) {
    return notFound();
  }

  if (!isProjectComplete(project)) {
    return <IncompleteProjectPage />;
  }

  return (
    <main>
      <Header />
      <article className="p-content mx-auto flex max-w-screen-2xl flex-col gap-8">
        <ProjectHero
          name={project.name}
          photos={project.photos}
          price={typology.price}
          department={project.department.name}
          city={project.city?.name}
          address={project.address}
        />
        <ProjectContent project={project} typology={typology} />
      </article>
      <Footer />
    </main>
  );
}
