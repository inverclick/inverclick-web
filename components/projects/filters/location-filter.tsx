"use client";

import { supabase } from "@/services/supabase/supabase";
import { City } from "@/types/cities";
import { Department } from "@/types/departments";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@inverclick/inverclick-ui/select";
import { useEffect, useMemo, useRef, useState } from "react";

export type LocationFilterProps = {
  departments: Department[];
  currentDepartment: string;
  setCurrentDepartment: (value: string) => void;
  currentCity: string;
  setCurrentCity: (value: string) => void;
};

export const LocationFilter = ({
  departments,
  currentCity,
  currentDepartment,
  setCurrentCity,
  setCurrentDepartment,
}: LocationFilterProps) => {
  const [cities, setCities] = useState<City[]>([]);
  const departmentsOptions = useMemo(
    () =>
      departments.map(({ id, name }) => ({
        label: name,
        value: id.toString(),
      })),
    [departments]
  );
  const citiesOptions = useMemo(
    () => cities.map(({ id, name }) => ({ label: name, value: id.toString() })),
    [cities]
  );
  const isFetching = useRef(false);

  const onChangeDepartment = (value: string) => {
    if (value === "all") {
      setCurrentDepartment("all");
      setCurrentCity("all");
      setCities([]);
    } else {
      setCurrentDepartment(value);
    }
  };

  const onChangeCity = (value: string) => {
    if (value === "all") setCurrentCity("all");
    else setCurrentCity(value);
  };

  useEffect(() => {
    const fetchCities = async () => {
      isFetching.current = true;
      const { data } = await supabase
        .from("cities")
        .select("*")
        .eq("department_id", currentDepartment);
      setCities(data ?? []);
      isFetching.current = false;
    };

    if (currentDepartment !== "all" && !isFetching.current) fetchCities();
    if (currentDepartment === "all") setCities([]);
  }, [currentDepartment]);

  return (
    <section className="flex flex-col gap-3">
      <h4 className="font-medium md:text-lg">Ubicación</h4>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <CustomSelect
          label="Departamento"
          options={departmentsOptions}
          onChange={onChangeDepartment}
          value={currentDepartment}
        />
        <CustomSelect
          label="Ciudad"
          options={citiesOptions}
          onChange={onChangeCity}
          value={currentCity}
        />
      </div>
    </section>
  );
};

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

const CustomSelect = ({
  label,
  options,
  onChange,
  value,
}: CustomSelectProps) => (
  <Select value={value} onValueChange={onChange} disabled={!options.length}>
    <SelectTrigger className="relative h-14 pb-0 pt-4 rounded-lg border-zinc-800 text-sm md:text-base">
      <p className="absolute top-1 left-3 text-[10px] md:text-xs font-light">
        {label}
      </p>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{label}</SelectLabel>
        <SelectItem key="all" value="all">
          Todos
        </SelectItem>
        {options.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);
