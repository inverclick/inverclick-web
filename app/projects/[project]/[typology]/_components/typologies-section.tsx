"use client";

import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { DisplayFormattedCurrency } from "@/components/shared/display-formatted-currency";
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
      <ul className="mb-6 flex flex-nowrap gap-4 overflow-x-auto">
        {typologies.map((typology) => {
          const { id, name, area, rooms, bathrooms, parking, price } = typology;
          return (
            <li key={id}>
              <Typography className="mb-1 font-medium">{name}</Typography>
              <DisplayFormattedCurrency
                variant="p"
                className="mb-1"
                number={price}
              />
              <button
                onClick={() => setSelectedTypology(typology)}
                className={cn(
                  "border-dark-gray flex w-44 flex-col items-start rounded-lg border bg-background p-4 hover:border-primary",
                  {
                    "border-primary": selectedTypology.id === id,
                  }
                )}
              >
                <div className="flex items-center justify-between gap-4">
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
                className="h-full w-full object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="z-10 translate-x-14" />
        <CarouselNext className="z-10 -translate-x-14" />
      </Carousel>
    </section>
  );
};
