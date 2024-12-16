import { MobileProjectHeader } from "@/components/projects/mobile/MobileProjectHeader";
import { MyMap2 } from "@/components/projects/MyMap2";
import { NavbarProjects } from "@/components/projects/NavbarProjects";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  DefaultResizableHandle,
  DefaultResizablePanel,
  DefaultResizablePanelGroup,
} from "@/components/ui/resizable-default";
import { ENV_VARS } from "@/global/env";
import { getProjectsPriceRange } from "@/services/projects";
import { supabase } from "@/services/supabase";
import { Department } from "@/types/department";
import { HousingType } from "@/types/housing-type";
import { ProjectToDisplay } from "@/types/project";
import { Metadata } from "next";

import ProjectContent from "@/components/projects/ProjectContent";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Conoce todos los proyectos de Inverclick",
  openGraph: {
    url: ENV_VARS.BASE_URL + "/projects",
    title: "Proyectos",
    description:
      "Accede a un mapa dinámico de opciones inmobiliarias en toda Colombia, explora las mejores alternativas de inversión.",
  },
};

type ProjectsProps = Readonly<{
  searchParams: {
    type?: string;
    min_price?: string;
    max_price?: string;
    department?: string;
    city?: string;
    housing_state?: string;
  };
}>;

export default async function Projects(props: ProjectsProps) {
  const { searchParams } = props;

  const type = searchParams.type;
  const minPrice = searchParams.min_price;
  const maxPrice = searchParams.max_price;
  const department = searchParams.department;
  const city = searchParams.city;
  const housingState = searchParams.housing_state;

  const [departmentsResponse, prices, housingTypesResponse] = await Promise.all(
    [
      supabase.from("departments").select("*"),
      getProjectsPriceRange(),
      supabase.from("housing_types").select("*"),
    ]
  );

  const query = supabase
    .from("projects")
    .select(
      "*, typologies!inner(*), department:departments(*), city:cities(*), company:companies(*)",
      { count: "exact" }
    )
    .eq("status", "PUBLISHED");

  if (department) query.eq("department_id", Number(department));
  if (city) query.eq("city_id", Number(city));
  if (housingState) query.eq("housing_state", housingState);
  if (minPrice) query.gte("typologies.price", minPrice);
  if (maxPrice) query.lte("typologies.price", maxPrice);
  if (type) query.in("housing_type", type.split("-"));

  const { count, data } = await query
    .order("price", { referencedTable: "typologies", ascending: true })
    .returns<ProjectToDisplay[]>();

  const departments = departmentsResponse.data ?? [];
  const housingTypes = housingTypesResponse.data ?? [];
  const total = count ?? 0;
  const projects = data ?? [];

  return (
    <main>
      {/* <ContactButton className="fixed right-4 bottom-4" /> */}
      <section className="hidden lg:block">
        <DefaultResizablePanelGroup
          direction="horizontal"
          className="!h-screen"
        >
          <DefaultResizablePanel defaultSize={32}>
            <MyMap2 projects={projects} />
          </DefaultResizablePanel>
          <DefaultResizableHandle withHandle />
          <DefaultResizablePanel
            defaultSize={68}
            minSize={25}
            className="z-10 relative flex flex-col"
          >
            <NavbarProjects />
            <ProjectContent
              total={total}
              projects={projects}
              departments={departments as Department[]}
              housingTypes={housingTypes as HousingType[]}
              prices={prices}
            />
          </DefaultResizablePanel>
        </DefaultResizablePanelGroup>
      </section>
      <section className="lg:hidden">
        <MobileProjectHeader
          total={total}
          departments={departments as Department[]}
          housingTypes={housingTypes as HousingType[]}
          prices={prices}
        />
        <div className="h-screen">
          <ResizablePanelGroup direction="vertical" className="!h-screen">
            <ResizablePanel defaultSize={50}>
              <MyMap2 projects={projects} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              defaultSize={50}
              maxSize={60}
              className="flex flex-col"
            >
              <ProjectContent
                total={total}
                projects={projects}
                departments={departments as Department[]}
                housingTypes={housingTypes as HousingType[]}
                prices={prices}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </section>
    </main>
  );
}
