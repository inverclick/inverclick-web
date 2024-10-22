import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAssetUrl } from "@/services/utils";
import Image from "next/image";
import React from "react";

export const Urbanism = ({
  urbanismPhotos,
  urbanismFiles,
}: {
  urbanismPhotos: string[];
  urbanismFiles: string[];
}) => {
  return (
    <div className="flex flex-col gap-8">
      {urbanismPhotos.length > 0 && (
        <Carousel className="w-full">
          <CarouselContent className="h-96">
            {urbanismPhotos.map((src, index) => (
              <CarouselItem key={src} className="flex items-center">
                <Image
                  unoptimized
                  src={getAssetUrl(src)}
                  alt="Urbanismo"
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
      )}
      <ul className="flex justify-center flex-col items-center gap-2">
        {urbanismFiles.map((src, index) => (
          <li key={src}>
            <a
              href={getAssetUrl(src)}
              target="_blank"
              className="w-fit bg-primary-600 text-white px-4 py-2 rounded-3xl"
            >
              {"Archivo de Urbanismo #" + index + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
