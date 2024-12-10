import { Hero } from "@/components/projects/review/Hero";
import OtherProjects from "@/components/projects/review/OtherProjects";
import { ProjectContent } from "@/components/projects/review/ProjectContent";
import { MyFooter } from "@/components/shared/footer/MyFooter";
import { Header } from "@/components/shared/header/header";
import { ENV_VARS } from "@/global/env";
import { getProjectPreviewById } from "@/services/projects";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;
  const { project } = await getProjectPreviewById(id);

  return {
    title: project?.name,
    description: project?.description,
    alternates: {
      canonical: ENV_VARS.BASE_URL + "/projects/" + id,
    },
    openGraph: {
      url: ENV_VARS.BASE_URL + "/projects/" + id,
      title: project?.name,
      description: project?.description,
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  if (!id.length) return <div>Id: {id}</div>;

  const { project, blueprints } = await getProjectPreviewById(id);

  if (!project || !blueprints.length)
    return (
      <div>
        Project: {JSON.stringify(project)}
        <br />
        <br />
        <br />
        Blueprints: {JSON.stringify(blueprints)}
      </div>
    );

  const mainBlueprint = blueprints[0];

  return (
    <main>
      <Header />
      <article className="p-content flex flex-col gap-8 max-w-screen-2xl mx-auto">
        {/* <Hero
          name={project.name}
          photos={project.photos}
          price={mainBlueprint.price}
          department={project.department}
          city={project.city}
          address={project.address}
        />
        <ProjectContent
          characteristics={project.characteristics}
          companyLogo={project.company.logo_url}
          companyName={project.company.name}
          housingState={project.housingState}
          description={project.description}
          location={project.location}
          name={project.name}
          address={project.address}
          city={project.city}
          department={project.department}
          projectLogo={project.logo}
          projectId={project.id}
          stratum={project.stratum}
          units={blueprints.reduce((acc, b) => acc + b.units, 0)}
          deadline={project?.deadline}
          typologies={blueprints}
          urbanismPhotos={project.urbanismPhotos}
          urbanismFiles={project.urbanism}
        /> */}
        <OtherProjects projectId={id} />
      </article>
      <MyFooter />
    </main>
  );
}
