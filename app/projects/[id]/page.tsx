import { Hero } from "@/components/projects/review/Hero"
import OtherProjects from "@/components/projects/review/OtherProjects"
import { ProjectContent } from "@/components/projects/review/ProjectContent"
import { ProjectHeader } from "@/components/projects/review/ProjectHeader"
import { MyFooter } from "@/components/shared/footer/MyFooter"
import { getProjectById } from "@/services/projects"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'
export const runtime = 'edge' 

export default async  function Page ({ params }: { params: { id: string } }) {
  const id = params.id

  if(!id.length) redirect('/projects')

  const { project, blueprints } = await getProjectById(id)

  if(!project || !blueprints.length) redirect('/projects')

  const mainBlueprint = blueprints[0]

  return (
    <main>
      <ProjectHeader />
      <article className="px-6 sm:px-10 md:px-8 lg:px-10 xl:px-20 pt-20 md:pt-24 xl:pt-32 flex flex-col gap-8">
        <Hero 
          name={project.name} 
          photos={project.photos} 
          price={mainBlueprint.price} 
          department={project.department} 
          city={project.city} 
          address={project.address} 
        /> 
        <ProjectContent 
          companyLogo={project.company.logo_url}
          companyName={project.company.name}
          housingState={project.housingState}
          description={project.description}
          location={project.location}
          name={project.name}
          address={project.address}
          city={project.city}
          department={project.department}
        />
        <OtherProjects projectId={id} />
      </article>
      <MyFooter />
    </main>
  )
}