"use client";

import { OtherProjects as OtherProjectsType } from "@/app/projects/[project]/[typology]/_services/get-other-projects";
import { LazyMount } from "@/components/shared/lazy-mount";
import {
  ProjectCard,
  ProjectCardSkeleton,
} from "@/components/shared/project-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@inverclick/inverclick-ui/carousel";
import { Typography } from "@inverclick/inverclick-ui/typography";

export type OtherProjectsProps = Readonly<{
  projects: OtherProjectsType;
}>;

export function OtherProjects({ projects }: OtherProjectsProps) {
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
            {projects.map((project) => (
              <CarouselItem
                key={project.id}
                className="!flex justify-center md:basis-1/2 lg:basis-1/4"
              >
                <LazyMount placeholder={<ProjectCardSkeleton />}>
                  <ProjectCard project={project} />
                </LazyMount>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex gap-4 overflow-x-auto px-1 pb-2 xl:hidden">
        {projects.map((project) => (
          <LazyMount key={project.id} placeholder={<ProjectCardSkeleton />}>
            <ProjectCard project={project} />
          </LazyMount>
        ))}
      </div>
    </section>
  );
}
