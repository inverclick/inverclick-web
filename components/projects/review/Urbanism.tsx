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

export const Urbanism = ({ urbanismFiles }: { urbanismFiles: string[] }) => {

  return (
    <ul className="space-y-2 mt-2 flex justify-center">
      {urbanismFiles.map((p, index) => (
        <li key={index}>
          <a
            href={getAssetUrl(p)}
            target="_blank"
            // alt={'Urbanismo #' + index}
            // width={600}
            // height={400}
            className="w-fit bg-primary-600 text-white px-4 py-2 rounded-3xl"
          >
            {"Archivo de Urbanismo #" + index + 1}
          </a>
        </li>
      ))}
    </ul>
  );
};
