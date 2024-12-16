import { Hero } from "@/components/projects/review/Hero";
import { ProjectContent } from "@/components/projects/review/ProjectContent";
import { ViewInformationButton } from "@/components/projects/review/view-information-button";
import { MyFooter } from "@/components/shared/footer/MyFooter";
import { Header } from "@/components/shared/header/header";
import { ENV_VARS } from "@/global/env";
import { cn } from "@/lib/utils";
import { getPreRegistration } from "@/services/pre-registration";
import { supabase } from "@/services/supabase";
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
  const project = params.project;
  const typology = params.typology;

  const [projectResult, typologyResult] = await Promise.all([
    supabase
      .from("projects")
      .select("name, description")
      .eq("id", project)
      .single(),
    supabase.from("typologies").select("name").eq("id", typology).single(),
  ]);

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

export default async function Page({
  params,
}: Readonly<{
  params: { project: string; typology: string };
}>) {
  const preRegistration = getPreRegistration();

  const projectId = params.project;
  const typologyId = params.typology;

  const [{ data }, { data: projectCharacteristics }] = await Promise.all([
    supabase
      .from("projects")
      .select(
        "*, typologies(*), department:departments(*), city:cities(*), company:companies(*)"
      )
      .eq("id", projectId)
      .eq("status", "PUBLISHED")
      .single(),
    supabase
      .from("project_characteristics")
      .select("*, characteristics(*)")
      .eq("project_id", projectId),
  ]);

  if (!data) {
    return notFound();
  }

  const mainBlueprint = data.typologies.find((t) => t.id === typologyId);
  if (!mainBlueprint) {
    return notFound();
  }

  return (
    <main>
      <Header />
      <article
        className={"p-content flex flex-col gap-8 max-w-screen-2xl mx-auto"}
      >
        <div className="relative">
          <div className="relative">
            <Hero
              name={data.name}
              photos={data.photos}
              price={mainBlueprint.price}
              department={data.department!.name}
              city={data.city!.name}
              address={data.address}
              className={cn({
                "blur-sm pointer-events-none": !preRegistration,
              })}
              disableSharableInteractions={!preRegistration ? true : false}
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
          <ProjectContent
            characteristics={
              projectCharacteristics?.map((c) => c.characteristics!) ?? []
            }
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
            deadline={data.deadline ?? ""}
            typologies={data.typologies}
            urbanismPhotos={data.urbanism_photos}
            urbanismFiles={data.urbanism_files}
          />
        )}
        {/* <OtherProjects projectId={data.id} /> */}
      </article>
      <MyFooter />
    </main>
  );
}
