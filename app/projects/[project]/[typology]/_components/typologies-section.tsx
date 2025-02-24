"use client";

import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { useCurrencyContext } from "@/contexts/currency-context";
import { formatCurrency } from "@/lib/format-currency";
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
import { TypologyCard } from "@inverclick/inverclick-ui/typology-card";
import Image from "next/image";
import { ComponentProps, useState } from "react";

export type TypologiesProps = {
  typologies: Project["typologies"];
} & ComponentProps<"section">;

export const TypologiesSection = ({
  typologies,
  ...props
}: TypologiesProps) => {
  const defaultSelectedTypology =
    typologies.find((typology) => typology.order === 0) ?? typologies[0];

  const [selectedTypology, setSelectedTypology] = useState(
    defaultSelectedTypology
  );

  const { convert, currency } = useCurrencyContext((s) => s);

  return (
    <section className={cn(props.className)} {...props}>
      <Typography variant="h2" className="mb-4">
        Tipologías
      </Typography>
      <ul className="mb-6 flex flex-nowrap gap-4 overflow-x-auto pb-2">
        {typologies
          .toSorted((a, b) => a.order - b.order)
          .map((typology) => {
            const {
              id,
              name,
              area,
              private_area,
              rooms,
              bathrooms,
              parking,
              price,
            } = typology;
            return (
              <TypologyCard
                key={id}
                name={name}
                price={`${formatCurrency(convert(price), currency)} ${currency}`}
                area={area}
                privateArea={private_area}
                rooms={rooms}
                bathrooms={bathrooms}
                parking={parking || 0}
                selected={selectedTypology.id === id}
                cardClickable={true}
                onCardClick={() => setSelectedTypology(typology)}
              />
            );
          })}
      </ul>
      <Carousel key={selectedTypology.id} className="w-full">
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
