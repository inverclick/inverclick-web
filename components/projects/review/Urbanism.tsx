import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAssetUrl } from "@/services/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Urbanism = ({ urbanismPhotos }: { urbanismPhotos: string[] }) => {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full my-6 lg:px-20 "
    >
      <CarouselContent>
        {urbanismPhotos.map((p, index) => (
          <CarouselItem key={index}>
            <Link
              href={getAssetUrl(p)}
              target="_blank"
              // alt={'Urbanismo #' + index}
              // width={600}
              // height={400}
              className="w-full h-auto object-cover"
            >
              {"Urbanismo #" + index}
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="!left-2 md:!left-6" />
      <CarouselNext className="!right-2 md:!right-6" />
    </Carousel>
  );
};
