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
                  className="object-contain w-full h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="translate-x-14 z-10" />
          <CarouselNext className="-translate-x-14 z-10" />
        </Carousel>
      )}
      {project.urbanism_files.length > 0 && (
        <ul className="flex justify-center flex-col items-center gap-2">
          {project.urbanism_files.map((src, index) => (
            <li key={src}>
              <a
                href={getAssetUrl(src)}
                target="_blank"
                className="w-fit bg-primary text-white px-4 py-2 rounded-3xl"
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
