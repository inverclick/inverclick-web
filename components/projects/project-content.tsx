"use client";

import { useProjectsPageStore } from "@/app/projects/_store";
import { DisplayTRM } from "@/components/projects/display-trm";
import { ProjectFilters } from "@/components/projects/filters/project-filters";
import { ProjectInfinityScroll } from "@/components/projects/project-infinity-scroll";
import { SelectCurrency } from "@/components/shared/select-currency/select-currency";
import { Department } from "@/types/department";
import { HousingType } from "@/types/housing-type";
import { ProjectToDisplay } from "@/types/project";
import { useEffect } from "react";

export type ProjectContentProps = Readonly<{
  total: number;
  projects: ProjectToDisplay[];
  departments: Department[];
  housingTypes: HousingType[];
  prices: {
    goal: number;
  }[];
}>;

export default function ProjectContent({
  total,
  projects,
  departments,
  housingTypes,
  prices,
}: ProjectContentProps) {
  const setProjects = useProjectsPageStore((state) => state.setProjects);

  useEffect(() => {
    setProjects(projects);
  }, [projects]);

  return (
    <section className="flex flex-col flex-grow m-4 mb-0 overflow-y-hidden">
      <div className="flex justify-between text-sm text-primary-600 mb-3 px-1 pt-1">
        <div className="hidden lg:flex gap-3 items-center">
          <ProjectFilters
            departments={departments ?? []}
            priceGraphicData={prices}
            housingTypes={housingTypes ?? []}
            count={total}
          />
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
      <ProjectInfinityScroll />
    </section>
  );
}
