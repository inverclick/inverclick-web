"use client";

import { ProjectFilters } from "@/components/projects/filters/project-filters";
import { SelectCurrency } from "@/components/shared/select-currency/select-currency";
import { Department } from "@/types/domain/departments";
import { HousingType } from "@/types/domain/housing-types";

export type MobileProjectHeader = Readonly<{
  total: number;
  departments: Department[];
  housingTypes: HousingType[];
  prices: {
    goal: number;
  }[];
}>;

export function MobileProjectHeader({
  total,
  departments,
  housingTypes,
  prices,
}: MobileProjectHeader) {
  return (
    <div className="absolute left-0 right-0 top-0 z-10 m-3 flex items-center justify-between rounded-3xl bg-white/40 px-6 py-2 text-primary-600 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <ProjectFilters
          housingTypes={housingTypes ?? []}
          departments={departments ?? []}
          priceGraphicData={prices}
          count={total}
        />
        <SelectCurrency />
      </div>

      <p className="flex items-center justify-center gap-1 text-sm lg:text-base">
        <span className="font-medium">Total:</span>
        {total}
      </p>
    </div>
  );
}
