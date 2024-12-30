"use client";

import { LocationFilter } from "@/components/projects/filters/location-filter";
import { PriceFilter } from "@/components/projects/filters/price-filter";
import { StateFilter } from "@/components/projects/filters/state-filter";
import { TypeFilter } from "@/components/projects/filters/type-filter";
import { useDebounce } from "@/hooks/use-debounce";
import { supabase } from "@/services/supabase/supabase";
import { Department } from "@/types/departments";
import { HousingType } from "@/types/housing-types";
import { Button } from "@inverclick/inverclick-ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@inverclick/inverclick-ui/dialog";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export type ProjectFiltersProps = {
  departments: Department[];
  priceGraphicData: { goal: number }[];
  housingTypes: HousingType[];
  count: number;
};

export const ProjectFilters = ({
  departments,
  priceGraphicData,
  housingTypes,
  count,
}: ProjectFiltersProps) => {
  const isCounting = useRef(false);

  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [currentCount, setCurrentCount] = useState(count);

  const [currentDepartment, setCurrentDepartment] = useState(
    searchParams.get("department") || "all"
  );

  const [currentCity, setCurrentCity] = useState(
    searchParams.get("city") || "all"
  );

  const [currentState, setCurrentState] = useState<string>(
    searchParams.get("housing_state") ?? "all"
  );

  const [currentTypes, setCurrentTypes] = useState<string[]>(
    searchParams.get("type")?.split("-") || []
  );

  const [minPrice, setMinPrice] = useState<number | undefined>(
    Number(searchParams.get("min_price") ?? 0)
  );

  const [maxPrice, setMaxPrice] = useState<number | undefined>(
    Number(searchParams.get("max_price") ?? 999999999)
  );

  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  const pathname = usePathname();
  const router = useRouter();

  const hasSearchParams = useMemo(
    () =>
      searchParams.has("type") ||
      searchParams.has("department") ||
      searchParams.has("housing_state"),
    [searchParams]
  );

  const onClearSearchParams = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete("type");
    setCurrentTypes([]);

    newSearchParams.delete("department");
    setCurrentDepartment("all");

    newSearchParams.delete("city");
    setCurrentCity("all");

    newSearchParams.delete("housing_state");
    setCurrentState("all");

    newSearchParams.set("min_price", "0");
    newSearchParams.set("max_price", "999999999");

    setMinPrice(0);
    setMaxPrice(999999999);

    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const onApplyFilters = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (currentDepartment !== "all") {
      newSearchParams.set("department", currentDepartment);
    } else {
      newSearchParams.delete("department");
    }

    if (currentCity !== "all") {
      newSearchParams.set("city", currentCity);
    } else {
      newSearchParams.delete("city");
    }

    if (currentTypes.length) {
      newSearchParams.set("type", currentTypes.join("-"));
    } else {
      newSearchParams.delete("type");
    }

    if (currentState !== "all") {
      newSearchParams.set("housing_state", currentState);
    } else {
      newSearchParams.delete("housing_state");
    }

    newSearchParams.set("min_price", String(minPrice));
    newSearchParams.set("max_price", String(maxPrice));

    router.replace(`${pathname}?${newSearchParams.toString()}`);

    setOpen(false);
  };

  useEffect(() => {
    const fetchCount = async () => {
      isCounting.current = true;

      let query = supabase
        .from("projects")
        .select("id, department_id, city_id, typologies!inner(price)", {
          count: "exact",
        })
        .eq("status", "PUBLISHED");

      if (currentDepartment !== "all") {
        query.eq("department_id", Number(currentDepartment));
      }

      if (currentCity !== "all") query.eq("city_id", Number(currentCity));
      if (currentState !== "all") query.eq("housing_state", currentState);
      if (debouncedMinPrice) query.gte("typologies.price", debouncedMinPrice);
      if (debouncedMaxPrice) query.lte("typologies.price", debouncedMaxPrice);
      if (currentTypes.length > 0) query.in("housing_type", currentTypes);

      const { count } = await query;
      setCurrentCount(count ?? 0);
      isCounting.current = false;
    };

    !isCounting.current && fetchCount();
  }, [
    currentDepartment,
    currentCity,
    currentTypes,
    currentState,
    debouncedMinPrice,
    debouncedMaxPrice,
  ]);

  useEffect(() => {
    // Update all states
    setCurrentDepartment(searchParams.get("department") || "all");
    setCurrentCity(searchParams.get("city") || "all");
    setCurrentState(searchParams.get("housing_state") || "all");
    setCurrentTypes(searchParams.get("type")?.split("-") || []);
    setMinPrice(Number(searchParams.get("min_price") ?? 0));
    setMaxPrice(Number(searchParams.get("max_price") ?? 999999999));
  }, [searchParams]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline-primary" className="relative">
          {hasSearchParams ? (
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary" />
          ) : null}
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </Button>
      </DialogTrigger>
      <DialogContent
        hideCloseButton
        className="flex flex-col p-0 !max-w-less-tablet"
      >
        <header className="grid grid-cols-3 w-full items-center border-b py-4 px-6">
          <DialogClose>
            <X className="cursor-pointer" />
          </DialogClose>
          <Typography variant="h4" className="flex-1 text-center">
            Filtros
          </Typography>
        </header>
        <main className="p-6 flex flex-col gap-6 overflow-x-auto">
          <LocationFilter
            departments={departments}
            currentDepartment={currentDepartment}
            setCurrentDepartment={setCurrentDepartment}
            setCurrentCity={setCurrentCity}
            currentCity={currentCity}
          />
          <StateFilter
            currentState={currentState}
            setCurrentState={setCurrentState}
          />
          <TypeFilter
            housingTypes={housingTypes}
            currentTypes={currentTypes}
            setCurrentTypes={setCurrentTypes}
          />
          <PriceFilter
            priceGraphicData={priceGraphicData}
            minPrice={Number(minPrice)}
            maxPrice={Number(maxPrice)}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </main>
        <footer className="flex flex-col sm:flex-row gap-4 justify-between p-4 border-t">
          <Button onClick={onClearSearchParams} variant="secondary">
            Quitar filtros
          </Button>
          <Button onClick={onApplyFilters}>
            Mostrar {currentCount} resultados
          </Button>
        </footer>
      </DialogContent>
    </Dialog>
  );
};
