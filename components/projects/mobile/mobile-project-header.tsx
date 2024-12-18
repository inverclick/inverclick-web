"use client";

import { ProjectFilters } from "@/components/projects/filters/project-filters";
import { SelectCurrency } from "@/components/shared/select-currency/select-currency";
import { Department } from "@/types/department";
import { HousingType } from "@/types/housing-type";

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
    <div className="absolute z-10 top-0 left-0 right-0 flex items-center justify-between bg-white/40 px-6 py-2 m-3 rounded-3xl backdrop-blur-xl text-primary-600">
      <div className="flex items-center gap-3">
        <ProjectFilters
          housingTypes={housingTypes ?? []}
          departments={departments ?? []}
          priceGraphicData={prices}
          count={total}
        />
        <SelectCurrency />
      </div>

      <p className="flex gap-1 justify-center items-center text-sm lg:text-base ">
        <span className="font-medium">Total:</span>
        {total}
      </p>
    </div>
  );
}
