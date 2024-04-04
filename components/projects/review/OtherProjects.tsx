import { getAllProjects } from "@/services/projects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ProjectCard } from "@/components/shared/ProjectCard";

export default async function OtherProjects ({projectId}: {projectId: string}) {
  const { data } = await getAllProjects('');
  const excludedCurrentProject = data.filter( b => b.project._id !== projectId)
  
  return (
  <section>
    <p className="font-medium text-2xl mb-8">Otros proyectos que podrían interesarte</p>
    <div className="flex px-10 w-full justify-center items-center mb-12">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-6xl"
      >
        <CarouselContent>
          { excludedCurrentProject.map( b =>
            <CarouselItem key={b._id} className='md:basis-1/2 lg:basis-1/4 !flex justify-center p-6'>
              <ProjectCard 
                blueprint={b}
              />
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  </section>
  )
}