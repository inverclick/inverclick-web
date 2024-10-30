"use client";

import { useCurrencyContext } from "@/contexts/CurrencyContext";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { cn } from "@/lib/utils";
import { getAssetUrl } from "@/services/utils";
import type { IBLUEPRINT_POPULATED } from "@/types/blueprint";
import { HOUSING_STATE_LABEL } from "@/types/project";
import Image from "next/image";
import { ComponentProps, forwardRef, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

type ProjectCardProps = {
  blueprint: IBLUEPRINT_POPULATED;
} & ComponentProps<"section">;

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ blueprint, className }, ref) => {
    const [isMounted, setIsMounted] = useState(false);
    const { convert, currency } = useCurrencyContext();
    const { project } = blueprint;
    const { company } = project;
    const href = `/projects/${project._id}`;

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
      <section
        ref={ref}
        data-element="project-card"
        className={cn(
          "flex flex-col w-[280px] lg:w-[220px] 2xl:w-[280px] shadow-md hover:shadow-lg transition-shadow ease-in h-full rounded-b-lg",
          className
        )}
      >
        <div className="relative">
          <Carousel className="h-[170px] lg:h-[150px] 2xl:h-[170px] w-full">
            <CarouselContent className="!ml-0">
              {project.photos.map((photo) => (
                <a
                  key={photo}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[280px] lg:min-w-[220px] 2xl:min-w-[280px] max-h-[170px] animate-fade-in"
                >
                  <Image
                    unoptimized
                    loading="lazy"
                    src={getAssetUrl(photo)}
                    alt={project.name}
                    width={280}
                    height={170}
                    className="h-[170px] w-[280px] lg:h-[150px] lg:w-[220px] 2xl:h-[170px] 2xl:w-[280px] -z-10 rounded-t-lg object-cover"
                  />
                </a>
              ))}
            </CarouselContent>
            <CarouselPrevious className="translate-x-14 z-10 !h-6 !w-6 bg-primary-100/70 border-primary-400 hover:bg-primary-200/90 text-primary-500 hover:text-primary-600" />
            <CarouselNext className="-translate-x-14 z-10 !h-6 !w-6 bg-primary-100/70 border-primary-400 hover:bg-primary-200/90 text-primary-500 hover:text-primary-600" />
          </Carousel>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer absolute top-0 left-0 text-[10px] lg:text-[9px] 2xl:text-[10px] text-white rounded-tl-lg px-2 py-1 capitalize font-semibold bg-primary-500"
          >
            {HOUSING_STATE_LABEL[project.housingState]}
          </a>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer absolute top-0 right-0 text-[10px] lg:text-[9px] 2xl:text-[10px] text-white rounded-tr-lg px-2 py-1 capitalize font-semibold bg-primary-400"
          >
            {project.housingType.label}
          </a>
          <div className="absolute top-0 right-0 text-[10px] text-white capitalize font-semibold bg-white">
            {blueprint.state}
          </div>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer pt-3 2xl:pt-4 flex flex-1 flex-col justify-between bg-white rounded-b-lg"
        >
          <div className="px-4 lg:px-2 2xl:px-4 flex gap-2 items-center">
            <Image
              unoptimized
              loading="lazy"
              className="w-auto h-[45px] 2xl:h-[50px]"
              src={getAssetUrl(company.logo_url)}
              alt={project.name}
              width={50}
              height={50}
            />
            <div>
              <p className="text-base lg:text-sm 2xl:text-base font-medium">
                {project.name}
              </p>
              <p className="text-xs lg:text-[11px] 2xl:text-xs font-light mt-1">
                {project.department}, {project.city}
              </p>
            </div>
          </div>
          <p className="px-4 lg:px-2 2xl:px-4 text-xs lg:text-[11px] 2xl:text-xs mt-2">
            {project.address}
          </p>
          <div className="py-2 2xl:py-3 px-4 lg:px-2 2xl:px-4 gap-2 flex items-center">
            <p className="font-medium text-sm lg:text-xs 2xl:text-sm">Desde:</p>
            <p className="text-sm lg:text-xs 2xl:text-sm">
              {currencyFormatter(convert(blueprint.price), currency)} {currency}
            </p>
          </div>
          <div className="flex justify-between px-4 py-3 lg:p-2 2xl:p-4 bg-primary-100 rounded-b-lg">
            <div className="text-xs 2xl:text-xs text-center">
              <p>
                {blueprint.area}{" "}
                <span className="text-xs">
                  m<sup>2</sup>
                </span>
              </p>
              <p className="font-semibold">Área</p>
            </div>
            <div className="text-xs 2xl:text-xs text-center">
              <p>{blueprint.rooms}</p>
              <p className="font-semibold">Habitaciones</p>
            </div>
            <div className="text-xs 2xl:text-xs text-center">
              <p>{blueprint.bathrooms}</p>
              <p className="font-semibold">Baños</p>
            </div>
            {/* <div className="text-xs lg:text-[10px] 2xl:text-xs text-center">
              <p>{blueprint.units}</p>
              <p className="font-semibold">Unidades</p>
            </div> */}
          </div>
        </a>
      </section>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export const ProjectCardSkeleton = () => (
  <Skeleton className="w-[280px] h-[400px]" />
);
