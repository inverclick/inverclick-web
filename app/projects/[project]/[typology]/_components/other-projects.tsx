"use client";

import { OtherProjects as OtherProjectsType } from "@/app/projects/[project]/[typology]/_services/get-other-projects";
import { HOUSING_STATE_LABEL, HOUSING_TYPE_LABEL } from "@/constants/labels";
import { useCurrencyContext } from "@/contexts/currency-context";
import { getAssetUrl } from "@/services/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@inverclick/inverclick-ui/carousel";
import { ProjectCard } from "@inverclick/inverclick-ui/project-card";
import { Typography } from "@inverclick/inverclick-ui/typography";

export type OtherProjectsProps = Readonly<{
  projects: OtherProjectsType;
}>;

export function OtherProjects({ projects }: OtherProjectsProps) {
  const { currency, convert } = useCurrencyContext((s) => s);

  return (
    <section>
      <Typography variant="h3" className="mb-4">
        Otros proyectos que podrían interesarte
      </Typography>
      <div className="hidden w-full items-center justify-center px-8 xl:flex">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {projects.map((project) => {
              const typology = project.typologies[0];

              return (
                <CarouselItem
                  key={project.id}
                  className="!flex justify-center md:basis-1/2 lg:basis-1/4"
                >
                  <ProjectCard
                    key={project.id}
                    href={`/projects/${project.id}/${typology.id}`}
                    currency={currency}
                    project={{
                      id: project.id.toString(),
                      name: project.name,
                      department: project.department.name,
                      city: project.city.name,
                      address: project.address,
                      housingState: HOUSING_STATE_LABEL[project.housing_state],
                      housingType: HOUSING_TYPE_LABEL[project.housing_type],
                      photosUrl: project.photos.map(getAssetUrl) || [],
                    }}
                    blueprint={{
                      area: typology.area,
                      privateArea: typology.private_area,
                      price: convert(typology.price),
                      rooms: typology.rooms,
                      units: typology.units,
                    }}
                    company={{
                      name: project.company.name,
                      logoUrl: project.company
                        ? getAssetUrl(project.company.logo_url)
                        : "",
                    }}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex gap-4 overflow-x-auto px-1 pb-2 xl:hidden">
        {projects.map((project) => {
          const typology = project.typologies[0];

          return (
            <ProjectCard
              key={project.id}
              href={`/projects/${project.id}/${typology.id}`}
              currency={currency}
              project={{
                id: project.id.toString(),
                name: project.name,
                department: project.department.name,
                city: project.city.name,
                address: project.address,
                housingState: HOUSING_STATE_LABEL[project.housing_state],
                housingType: HOUSING_TYPE_LABEL[project.housing_type],
                photosUrl: project.photos.map(getAssetUrl) || [],
              }}
              blueprint={{
                area: typology.area,
                privateArea: typology.private_area,
                price: convert(typology.price),
                rooms: typology.rooms,
                units: typology.units,
              }}
              company={{
                name: project.company.name,
                logoUrl: project.company
                  ? getAssetUrl(project.company.logo_url)
                  : "",
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
