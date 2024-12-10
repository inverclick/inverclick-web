
import { Hero } from "@/components/projects/review/Hero";
import OtherProjects from "@/components/projects/review/OtherProjects";
import { ProjectContent } from "@/components/projects/review/ProjectContent";


import { MyFooter } from "@/components/shared/footer/MyFooter";
import { Header } from "@/components/shared/header/header";
import { ENV_VARS } from "@/global/env";
import { supabase } from "@/services/supabase";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { project: string, typology: string };
}): Promise<Metadata> {
  const project = params.project;
  const typology = params.typology;
  const [projectResult, typologyResult] = await Promise.all([
    supabase.from("projects").select('name, description').eq("id", project).single(),
    supabase.from("typologies").select('name').eq("id", typology).single(),
  ])

  return {
    title: projectResult.data?.name + " - " + typologyResult.data?.name,
    description: projectResult.data?.description,
    alternates: {
      canonical: `${ENV_VARS.BASE_URL}/${project}/${typology}`,
    },
    openGraph: {
      url: `${ENV_VARS.BASE_URL}/${project}/${typology}`,
      title: projectResult.data?.name + " - " + typologyResult.data?.name,
      description: projectResult.data?.description,
    },
  };
}

export default async function Page({ params }: { params: { project: string, typology: string }}) {
  const projectId = params.project;
  const typologyId = params.typology;

  const [{ data }, { data: projectCharacteristics }] = await Promise.all([ 
    supabase
      .from("projects")
      .select("*, typologies(*), department:departments(*), city:cities(*), company:companies(*)")
      .eq("id", projectId)
      .single(),
    supabase
      .from('project_characteristics')
      .select('*, characteristics(*)')
      .eq('project_id', projectId)
  ])
  
  if (!data) {
    return <div>Not found</div>
  }

  const mainBlueprint = data.typologies.find((t) => t.id === typologyId);
  if (!mainBlueprint) {
    return <div>Not found</div>
  }

  return (
    <main>
      <Header />
      <article className="p-content flex flex-col gap-8 max-w-screen-2xl mx-auto">
        <Hero
          name={data.name}
          photos={data.photos}
          price={mainBlueprint.price}
          department={data.department!.name!}
          city={data.city!.name!}
          address={data.address}
        />
        <ProjectContent
          characteristics={projectCharacteristics?.map((c) => c.characteristics!) ?? []}
          companyLogo={data.company!.logo_url}
          companyName={data.company!.name}
          housingState={data.housing_state}
          description={data.description}
          location={{
            lat: data.latitude,
            lng: data.longitude,
          }}
          name={data.name}
          address={data.address}
          city={data.city!.name}
          department={data.department!.name}
          projectLogo={data.logo}
          projectId={data.id}
          stratum={data.stratum}
          units={data.typologies.reduce((acc, b) => acc + b.units, 0)}
          deadline={data.deadline ?? ''}
          typologies={data.typologies}
          urbanismPhotos={data.urbanism_photos}
          urbanismFiles={data.urbanism_files}
        />
        {/* <OtherProjects projectId={data.id} /> */}
      </article>
      <MyFooter />
    </main>
  );
}
