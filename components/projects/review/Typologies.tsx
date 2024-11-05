"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCurrencyContext } from "@/contexts/CurrencyContext";
import { cn } from "@/lib/utils";
import { getAssetUrl } from "@/services/utils";
import { IBLUEPRINT } from "@/types/blueprint";
import { Bath, BedDouble, CarFront, LucideIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const Typologies = ({ typologies }: { typologies: IBLUEPRINT[] }) => {
  const { convert, currency } = useCurrencyContext();

  const [selectedTypology, setSelectedTypology] = useState<IBLUEPRINT>(
    typologies[0]
  );

  return (
    <div>
      <ul className="flex flex-nowrap gap-4 mb-8 overflow-x-auto">
        {typologies.map((typology) => {
          const { _id, name, area, rooms, bathrooms, parking } = typology;
          return (
            <li key={_id}>
              <h2 className="mb-1">{name}</h2>
              <button
                onClick={() => setSelectedTypology(typology)}
                className={cn(
                  "flex flex-col items-start w-44 bg-background border border-dark-gray p-4 rounded-lg hover:bg-light-gray",
                  {
                    "border-primary-600": selectedTypology._id === _id,
                  }
                )}
              >
                <div className="flex gap-4 justify-between items-center">
                  <p className="text-sm">Area *</p>
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
      <div>
        <Carousel key={selectedTypology._id} className="w-full">
          <CarouselContent className="h-96">
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
      </div>
    </div>
  );
};

const InfoLabelIcon = ({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string | number;
  Icon: LucideIcon;
}) => (
  <div>
    <div className="flex gap-2 items-center">
      <Icon className="w-4 h-4" />
      <p className="text-black">{value}</p>
    </div>
    <p className="text-xs text-left text-primary-800 font-light">{label}</p>
  </div>
);

const InfoLabel = ({
  label,
  value,
}: {
  label: string;
  value: string | number | JSX.Element;
}) => (
  <div className="text-left">
    <p className="text-xs text-primary-800 font-light">{label}</p>
    <p className="text-black">{value}</p>
  </div>
);
