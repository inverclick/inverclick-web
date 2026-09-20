import { ProjectsLayout } from "@/components/projects/projects-layout";
import { ENV_VARS } from "@/global/env";
import { getProjectsPriceRange } from "@/services/get-projects-price-range";
import { PROJECT_CARD_SELECT } from "@/services/projects/project-card-select";
import { supabase } from "@/services/supabase/supabase";
import { Department } from "@/types/domain/departments";
import { HousingType } from "@/types/domain/housing-types";
import { ProjectToDisplay } from "@/types/domain/projects";
import { Metadata } from "next";

import { HousingStateEnum } from "@/types/domain/enums";

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

  const query = supabase
    .from("projects")
    .select(PROJECT_CARD_SELECT, { count: "exact" })
    .eq("status", "PUBLISHED");

  if (department) query.eq("department_id", Number(department));
  if (city) query.eq("city_id", Number(city));
  if (housingState) query.eq("housing_state", housingState as HousingStateEnum);
  if (minPrice) query.gte("typologies.price", minPrice);
  if (maxPrice) query.lte("typologies.price", maxPrice);
  if (type) query.in("housing_type", type.split("-") as HousingType["label"][]);

  // El mapa necesita todos los proyectos; cada tarjeta solo usa la tipología
  // más económica que cumple los filtros. Las cuatro consultas son independientes.
  const [departmentsResponse, prices, housingTypesResponse, { count, data }] =
    await Promise.all([
      supabase.from("departments").select("*"),
      getProjectsPriceRange(),
      supabase.from("housing_types").select("*"),
      query
        .order("price", { referencedTable: "typologies", ascending: true })
        .limit(1, { referencedTable: "typologies" })
        .returns<ProjectToDisplay[]>(),
    ]);

  const departments = departmentsResponse.data ?? [];
  const housingTypes = housingTypesResponse.data ?? [];
  const total = count ?? 0;
  const projects = data ?? [];

  return (
    <ProjectsLayout
      total={total}
      projects={projects}
      departments={departments as Department[]}
      housingTypes={housingTypes as HousingType[]}
      prices={prices}
    />
  );
}
