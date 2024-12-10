import DisplayTRM from "@/components/projects/DisplayTRM";
import { ProjectFilters } from "@/components/projects/Filters/ProjectFilters";
import { ProjectInfinityScroll } from "@/components/projects/ProjectInfinityScroll";
import { SelectCurrency } from "@/components/projects/SelectCurrency";
import { getProjectsPriceRange } from "@/services/projects";
import { supabase } from "@/services/supabase";
import { ProjectToDisplay } from "@/types/project";
import { Suspense } from "react";

type Props = Readonly<{
  total: number;
  projects: ProjectToDisplay[];
}>;

export default async function ProjectContent({ total, projects }: Props) {
  const [departmentsResponse, priceGraphicDataResponse, housingTypesResponse] =
    await Promise.all([
      supabase.from('departments').select('*'),
      getProjectsPriceRange(),
      supabase.from('housing_types').select('*'),
    ]);

  const  priceGraphicData = priceGraphicDataResponse;
  const { data: housingTypes } = housingTypesResponse;
  const { data: departments } = departmentsResponse;

  return (
    <section className="flex flex-col flex-grow m-4 mb-0 overflow-y-hidden">
      <div className="flex justify-between text-sm text-primary-600 mb-3 px-1 pt-1">
        <div className="hidden lg:flex gap-3 items-center">
          <Suspense>
            <ProjectFilters
              departments={departments ?? []}
              priceGraphicData={priceGraphicData}
              housingTypes={housingTypes ?? []}
              count={total}
            />
          </Suspense>
          <SelectCurrency />
        </div>
        <div className="flex gap-4 items-center">
          <DisplayTRM className="hidden lg:block" />
          <p className="hidden lg:flex gap-1 justify-center items-center">
            <span className="font-medium">Total:</span>
            {total}
          </p>
        </div>
      </div>
      <ProjectInfinityScroll projects={projects} />
    </section>
  );
}
