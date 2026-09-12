"use client";

import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { useCurrencyContext } from "@/contexts/currency-context";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import { isLotProject } from "@/services/projects/is-lot-project";
import { getAssetUrl } from "@/services/utils";
import { HousingTypeEnum } from "@/types/domain/enums";
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
  housingType: HousingTypeEnum | null;
} & ComponentProps<"section">;

/**
 * `TypologyCard` vive en `@inverclick/inverclick-ui` y siempre pinta la fila de
 * habitaciones, baños y parqueaderos. Un lote no tiene ninguno de los tres, así
 * que mientras la librería no exponga una forma de omitirlos se esconde la lista
 * completa desde el consumidor (y se quita el margen que dejaba debajo del área).
 *
 * `TypologyCard` hace `<article className={cn("flex w-max flex-col", className)} {...props}>`,
 * y como el spread va después del `className`, el prop que le pasemos NO se
 * mezcla: reemplaza las clases base. Por eso hay que repetirlas aquí.
 */
const TYPOLOGY_CARD_BASE = "flex w-max flex-col";

const HIDE_ROOMS_BATHROOMS_AND_PARKING = "[&_ul]:hidden [&>div>div]:mb-0";

export const TypologiesSection = ({
  typologies,
  housingType,
  ...props
}: TypologiesProps) => {
  const isLot = isLotProject(housingType);

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
                className={cn(TYPOLOGY_CARD_BASE, {
                  [HIDE_ROOMS_BATHROOMS_AND_PARKING]: isLot,
                })}
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
