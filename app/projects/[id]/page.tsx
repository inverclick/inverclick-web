import { Hero } from "@/components/projects/review/Hero"
import { ProjectHeader } from "@/components/projects/review/ProjectHeader"
import { MyFooter } from "@/components/shared/footer/MyFooter"
import { getProjectById } from "@/services/projects"
import { redirect } from "next/navigation"

export default async  function Page ({ params }: { params: { id: string } }) {
  const id = params.id

  if(!id.length) redirect('/projects')

  const { project, blueprints } = await getProjectById(id)

  if(!project || !blueprints.length) redirect('/projects')

  const mainBlueprint = blueprints[0]

  return (
    <main>
      <ProjectHeader />
      <article className="px-6 pt-20 md:pt-24 xl:pt-32">
        <Hero 
          name={project.name} 
          photos={project.photos} 
          price={mainBlueprint.price} 
          department={project.department} 
          city={project.city} 
          address={project.address} 
        /> 
      </article>
      <MyFooter />
    </main>
  )
}