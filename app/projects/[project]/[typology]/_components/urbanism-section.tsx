"use client";

import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { cn } from "@/lib/utils";
import { getAssetUrl } from "@/services/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@inverclick/inverclick-ui/carousel";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { ComponentProps } from "react";

import Image from "next/image";

export type UrbanismSectionProps = Readonly<{
  project: Project;
}> &
  ComponentProps<"section">;

export const UrbanismSection = ({
  project,
  ...props
}: UrbanismSectionProps) => {
  return (
    <section className={cn("flex flex-col", props.className)} {...props}>
      <Typography variant="h2" className="mb-4">
        Urbanismo
      </Typography>
      {project.urbanism_photos.length > 0 && (
        <Carousel className="w-full">
          {/* <CarouselContent className="h-96"> */}
          <CarouselContent>
            {project.urbanism_photos.map((src) => (
              <CarouselItem key={src} className="flex items-center">
                <Image
                  unoptimized
                  src={getAssetUrl(src)}
                  alt="Urbanismo"
                  width={600}
                  height={400}
                  className="h-full w-full object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="z-10 translate-x-14" />
          <CarouselNext className="z-10 -translate-x-14" />
        </Carousel>
      )}
      {project.urbanism_files.length > 0 && (
        <ul className="flex flex-col items-center justify-center gap-2">
          {project.urbanism_files.map((src, index) => (
            <li key={src}>
              <a
                href={getAssetUrl(src)}
                target="_blank"
                className="w-fit rounded-3xl bg-primary px-4 py-2 text-white"
              >
                {"Archivo de Urbanismo #" + index + 1}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
