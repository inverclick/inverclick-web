"use client";

import { useProjectsPageStore } from "@/app/projects/_store";
import { DisplayTRM } from "@/components/projects/display-trm";
import { ProjectFilters } from "@/components/projects/filters/project-filters";
import { ProjectInfinityScroll } from "@/components/projects/project-infinity-scroll";
import { SelectCurrency } from "@/components/shared/select-currency/select-currency";
import { Department } from "@/types/domain/departments";
import { HousingType } from "@/types/domain/housing-types";
import { ProjectToDisplay } from "@/types/domain/projects";
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
    <section className="m-4 mb-0 flex flex-grow flex-col overflow-y-hidden">
      <div className="mb-3 flex justify-between px-1 pt-1 text-sm text-primary-600">
        <div className="hidden items-center gap-3 lg:flex">
          <ProjectFilters
            departments={departments ?? []}
            priceGraphicData={prices}
            housingTypes={housingTypes ?? []}
            count={total}
          />
          <SelectCurrency />
        </div>
        <div className="flex items-center gap-4">
          <DisplayTRM className="hidden lg:block" />
          <p className="hidden items-center justify-center gap-1 lg:flex">
            <span className="font-medium">Total:</span>
            {total}
          </p>
        </div>
      </div>
      <ProjectInfinityScroll />
    </section>
  );
}
