"use client";

import { useCurrencyContext } from "@/contexts/currency-context";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import { getAssetUrl } from "@/services/utils";
import { ProjectToDisplay } from "@/types/domain/projects";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@inverclick/inverclick-ui/carousel";
import { Skeleton } from "@inverclick/inverclick-ui/skeleton";
import { ComponentProps, forwardRef, useEffect, useState } from "react";

import Image from "next/image";
import { HOUSING_STATE_LABEL, HOUSING_TYPE_LABEL } from "@/constants/labels";

export type ProjectCardProps = {
  project: ProjectToDisplay;
} & ComponentProps<"section">;

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, className }, ref) => {
    const [isMounted, setIsMounted] = useState(false);
    const { convert, currency } = useCurrencyContext((s) => s);
    const { company } = project;
    const typology = project.typologies[0];
    const href = `/projects/${project.id}/${typology.id}`;

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
      <section
        ref={ref}
        data-element="project-card"
        className={cn(
          "flex w-[280px] flex-col rounded-b-lg shadow-md transition-shadow ease-in hover:shadow-lg lg:w-[220px] 2xl:w-[280px]",
          className
        )}
      >
        <div className="relative">
          <Carousel className="h-[170px] w-full lg:h-[150px] 2xl:h-[170px]">
            <CarouselContent className="!ml-0">
              {project.photos.map((photo) => (
                <a
                  key={photo}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="max-h-[170px] min-w-[280px] animate-fade-in lg:min-w-[220px] 2xl:min-w-[280px]"
                >
                  <Image
                    unoptimized
                    loading="lazy"
                    src={getAssetUrl(photo)}
                    alt={project.name}
                    width={280}
                    height={170}
                    className="-z-10 h-[170px] w-[280px] rounded-t-lg object-cover lg:h-[150px] lg:w-[220px] 2xl:h-[170px] 2xl:w-[280px]"
                  />
                </a>
              ))}
            </CarouselContent>
            <CarouselPrevious className="z-10 !h-6 !w-6 translate-x-14 border-primary-400 bg-primary-100/70 text-primary-500 hover:bg-primary-200/90 hover:text-primary-600" />
            <CarouselNext className="z-10 !h-6 !w-6 -translate-x-14 border-primary-400 bg-primary-100/70 text-primary-500 hover:bg-primary-200/90 hover:text-primary-600" />
          </Carousel>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-0 top-0 cursor-pointer rounded-tl-lg bg-primary-500 px-2 py-1 text-[10px] font-semibold capitalize text-white lg:text-[9px] 2xl:text-[10px]"
          >
            {HOUSING_STATE_LABEL[project.housing_state]}
          </a>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-0 top-0 cursor-pointer rounded-tr-lg bg-primary-400 px-2 py-1 text-[10px] font-semibold capitalize text-white lg:text-[9px] 2xl:text-[10px]"
          >
            {HOUSING_TYPE_LABEL[project.housing_type]}
          </a>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 cursor-pointer flex-col justify-between rounded-b-lg bg-white pt-3 2xl:pt-4"
        >
          <div className="flex items-center gap-2 px-4 lg:px-2 2xl:px-4">
            <Image
              unoptimized
              loading="lazy"
              className="aspect-square h-[45px] w-auto object-contain 2xl:h-[50px]"
              src={getAssetUrl(company.logo_url)}
              alt={project.name}
              width={50}
              height={50}
            />
            <div>
              <p className="text-base font-medium lg:text-sm 2xl:text-base">
                {project.name}
              </p>
              <p className="mt-1 text-xs font-light lg:text-[11px] 2xl:text-xs">
                {project.department.name}, {project.city.name}
              </p>
            </div>
          </div>
          <p className="mt-2 px-4 text-xs lg:px-2 lg:text-[11px] 2xl:px-4 2xl:text-xs">
            {project.address}
          </p>
          <div className="flex items-center gap-2 px-4 py-2 lg:px-2 2xl:px-4 2xl:py-3">
            <p className="text-sm font-medium lg:text-xs 2xl:text-sm">Desde:</p>
            <p className="text-sm lg:text-xs 2xl:text-sm">
              {formatCurrency(convert(typology.price), currency)} {currency}
            </p>
          </div>
          <div className="flex justify-between rounded-b-lg bg-primary-100 px-4 py-3 lg:p-2 2xl:p-4">
            <div className="text-center text-xs 2xl:text-xs">
              <p>
                {typology.area}{" "}
                <span className="text-xs">
                  m<sup>2</sup>
                </span>
              </p>
              <p className="font-semibold">Área</p>
            </div>
            <div className="text-center text-xs 2xl:text-xs">
              <p>{typology.rooms}</p>
              <p className="font-semibold">Habitaciones</p>
            </div>
            <div className="text-center text-xs 2xl:text-xs">
              <p>{typology.bathrooms}</p>
              <p className="font-semibold">Baños</p>
            </div>
          </div>
        </a>
      </section>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export const ProjectCardSkeleton = () => (
  <Skeleton className="h-[400px] w-[280px]" />
);
