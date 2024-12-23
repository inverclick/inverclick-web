"use client";

import { trimObject } from "@/lib/trim-object";
import { supabase } from "@/services/supabase/supabase";
import { City } from "@/types/city";
import { Department } from "@/types/department";
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
        .eq("department_id", department);

      setCities(cities ?? []);
    }
  }, [department]);

  return (
    <div className="w-full">
      <div className="flex gap-4 bg-white rounded-full items-center">
        <div className="flex-grow grid grid-cols-[1fr_2px_1fr] gap-4 p-2 md:p-4">
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
          className="mx-2 p-2 md:p-4 rounded-full bg-primary-600 hover:bg-primary-700 transition-colors"
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
      className="border-none justify-center text-sm md:text-xl"
      showChevron={false}
      {...props}
    >
      {children}
    </SelectTrigger>
  );
}
