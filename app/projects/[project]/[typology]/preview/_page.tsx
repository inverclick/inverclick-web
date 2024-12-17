import { ProjectHero } from "@/app/projects/[project]/[typology]/_components/project-hero";
import { ProjectContentProps } from "@/components/projects/review/ProjectContent";
import { MyFooter } from "@/components/shared/footer/MyFooter";
import { Header } from "@/components/shared/header/header";
import { fallback } from "@/services/fallback";
import { supabase } from "@/services/supabase";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function Page({
  params,
}: Readonly<{
  params: { project: string; typology: string };
}>) {
  const projectId = params.project;
  const typologyId = params.typology;

  const [{ data }, { data: characteristics }] = await Promise.all([
    supabase
      .from("draft_projects")
      .select(
        "*, typologies:draft_typologies(*), department:departments(*), city:cities(*), company:companies(*)"
      )
      .eq("id", projectId)
      .eq("status", "PENDING")
      .single(),
    supabase
      .from("draft_project_characteristics")
      .select("*, characteristics(*)")
      .eq("draft_project_id", projectId),
  ]);

  if (!data) {
    return notFound();
  }

  const typology = data.typologies.find(
    (typology) => typology.id === typologyId
  );

  if (!typology) {
    return notFound();
  }

  return (
    <main>
      <Header />
      <article className="p-content flex flex-col gap-8 max-w-screen-2xl mx-auto">
        <ProjectHero
          name={fallback(data.name, "string")}
          photos={data.photos}
          price={typology.price}
          department={fallback(data.department?.name, "string")}
          city={fallback(data.city?.name, "string")}
          address={fallback(data.address, "string")}
        />
        {/* <ProjectContent
          characteristics={
            characteristics?.map((c) => c.characteristics!) ?? []
          }
          companyLogo={data.company?.logo_url ?? ""}
          companyName={fallback(data.company?.name, "string")}
          housingState={fallback(data.housing_state, "string")}
          description={fallback(data.description, "string")}
          location={{
            lat: fallback(data.latitude, "number"),
            lng: fallback(data.longitude, "number"),
          }}
          name={fallback(data.name, "string")}
          address={fallback(data.address, "string")}
          city={fallback(data.city?.name, "string")}
          department={fallback(data.department?.name, "string")}
          projectLogo={fallback(data.logo, "string")}
          projectId={data.id}
          stratum={fallback(data.stratum, "number")}
          units={data.typologies.reduce((acc, b) => acc + b.units, 0)}
          deadline={fallback(data.deadline, "string")}
          typologies={data.typologies}
          urbanismPhotos={data.urbanism_photos}
          urbanismFiles={data.urbanism_files}
        /> */}
      </article>
      <MyFooter />
    </main>
  );
}
