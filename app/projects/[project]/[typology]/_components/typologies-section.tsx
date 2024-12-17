"use client";

import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { getAssetUrl } from "@/services/utils";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Bath, BedDouble, CarFront } from "lucide-react";
import { ComponentProps, useState } from "react";

import Image from "next/image";

export type TypologiesProps = {
  typologies: Project["typologies"];
} & ComponentProps<"section">;

export const TypologiesSection = ({
  typologies,
  ...props
}: TypologiesProps) => {
  const [selectedTypology, setSelectedTypology] = useState(typologies[0]);

  return (
    <section className={cn(props.className)} {...props}>
      <Typography variant="h2" className="mb-4">
        Tipologías
      </Typography>
      <ul className="flex flex-nowrap gap-4 mb-6 overflow-x-auto">
        {typologies.map((typology) => {
          const { id, name, area, rooms, bathrooms, parking } = typology;
          return (
            <li key={id}>
              <Typography className="mb-1 font-medium">{name}</Typography>
              <button
                onClick={() => setSelectedTypology(typology)}
                className={cn(
                  "flex flex-col items-start w-44 bg-background border border-dark-gray p-4 rounded-lg hover:border-primary",
                  {
                    "border-primary": selectedTypology.id === id,
                  }
                )}
              >
                <div className="flex gap-4 justify-between items-center">
                  <p className="text-sm">Area*</p>
                </div>
                <p className="mb-2">
                  <span className="text-xl">{area}</span> m<sup>2</sup>
                </p>
                <ul className="flex justify-between gap-4">
                  <li className="flex gap-2">
                    <BedDouble className="size-4" />
                    <p className="text-sm">{rooms}</p>
                  </li>
                  <li className="flex gap-2">
                    <Bath className="size-4" />
                    <p className="text-sm">{bathrooms}</p>
                  </li>
                  <li className="flex gap-2">
                    <CarFront className="size-4" />
                    <p className="text-sm">{parking}</p>
                  </li>
                </ul>
              </button>
            </li>
          );
        })}
      </ul>
      <Carousel key={selectedTypology.id} className="w-full">
        {/* <CarouselContent className="h-96"> */}
        <CarouselContent>
          {selectedTypology.blueprints.map((src, index) => (
            <CarouselItem key={src} className="flex items-center">
              <Image
                unoptimized
                src={getAssetUrl(src)}
                alt="Tipología"
                width={600}
                height={400}
                className="object-contain w-full h-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="translate-x-14 z-10" />
        <CarouselNext className="-translate-x-14 z-10" />
      </Carousel>
    </section>
  );
};
