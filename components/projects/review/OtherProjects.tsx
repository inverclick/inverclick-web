import { OtherProjects as OtherProjectsType } from "@/app/projects/[project]/[typology]/_services/get-other-projects";
import { ProjectCard } from "@/components/shared/ProjectCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
      <div className="hidden xl:flex px-8 w-full justify-center items-center">
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
                className="md:basis-1/2 lg:basis-1/4 !flex justify-center"
              >
                <ProjectCard project={project} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="xl:hidden flex gap-4 overflow-x-auto px-1 pb-2">
        {projects.map((project) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </div>
    </section>
  );
}
