"use client";

import { trimObject } from "@/lib/trim-object";
import { supabase } from "@/services/supabase/supabase";
import { City } from "@/types/domain/cities";
import { Department } from "@/types/domain/departments";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@inverclick/inverclick-ui/select";
import { Separator } from "@inverclick/inverclick-ui/separator";
import { Search } from "lucide-react";
import { ComponentProps, useEffect, useState } from "react";

import Link from "next/link";

export type SearcherProps = Readonly<{
  departments: Department[];
}>;

export function Searcher({ departments }: SearcherProps) {
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");

  const [cities, setCities] = useState<City[]>([]);

  const isCitySelectDisabled = !department || cities.length === 0;

  useEffect(() => {
    if (!department) return;

    fetchCities();

    async function fetchCities() {
      const { data: cities } = await supabase
        .from("cities")
        .select("*")
        .eq("department_id", Number(department));

      setCities(cities ?? []);
    }
  }, [department]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 rounded-full bg-white">
        <div className="grid flex-grow grid-cols-[1fr_2px_1fr] gap-4 p-2 md:p-4">
          <DepartmentsSelect
            departments={departments}
            value={department}
            onValueChange={setDepartment}
          />
          <Separator orientation="vertical" className="h-auto w-[2px]" />
          <CitySelect
            cities={cities}
            disabled={isCitySelectDisabled}
            value={city}
            onValueChange={setCity}
          />
        </div>
        <Link
          href={{
            pathname: "/projects",
            query: new URLSearchParams(
              trimObject({ department, city })
            ).toString(),
          }}
          className="mx-2 rounded-full bg-primary-600 p-2 transition-colors hover:bg-primary-700 md:p-4"
        >
          <Search color="white" />
        </Link>
      </div>
    </div>
  );
}

type DepartmentsSelectProps = Readonly<{
  departments: Department[];
}> &
  ComponentProps<typeof Select>;

function DepartmentsSelect({ departments, ...props }: DepartmentsSelectProps) {
  return (
    <Select {...props}>
      <CustomSelectTrigger>
        <SelectValue placeholder="Departamento" />
      </CustomSelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Departamentos</SelectLabel>
          {departments.map(({ name, id }) => {
            return (
              <SelectItem key={id} value={id.toString()}>
                {name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

type CitySelectProps = Readonly<{
  cities: City[];
}> &
  ComponentProps<typeof Select>;

function CitySelect({ cities, ...props }: CitySelectProps) {
  return (
    <Select {...props}>
      <CustomSelectTrigger>
        <SelectValue placeholder="Ciudad" />
      </CustomSelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ciudades</SelectLabel>
          {cities.map(({ name, id }) => {
            return (
              <SelectItem key={id} value={id.toString()}>
                {name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

type CustomSelectTriggerProps = ComponentProps<typeof SelectTrigger>;

function CustomSelectTrigger({ children, ...props }: CustomSelectTriggerProps) {
  return (
    <SelectTrigger
      className="justify-center border-none text-sm md:text-xl"
      showChevron={false}
      {...props}
    >
      {children}
    </SelectTrigger>
  );
}
