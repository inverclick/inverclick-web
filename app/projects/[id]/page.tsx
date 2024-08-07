import { Hero } from "@/components/projects/review/Hero"
import OtherProjects from "@/components/projects/review/OtherProjects"
import { ProjectContent } from "@/components/projects/review/ProjectContent"
import { ProjectHeader } from "@/components/projects/review/ProjectHeader"
import { MyFooter } from "@/components/shared/footer/MyFooter"
import { ENV_VARS } from "@/global/env"
import { getProjectById } from "@/services/projects"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'
export const runtime = 'edge' 

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id
  const { project } = await getProjectById(id)

  return {
    title: project?.name,
    description: project?.description,
    alternates: {
      canonical: ENV_VARS.BASE_URL + '/projects/' + id
    },
    openGraph: {
      url: ENV_VARS.BASE_URL + '/projects/' + id,
      title: project?.name,
      description: project?.description
    }
  }
  
}

export default async  function Page ({ params }: { params: { id: string } }) {
  const id = params.id

  if(!id.length) return (
    <div>
      Id: { id }
    </div>
  )


  const { project, blueprints } = await getProjectById(id)

  if(!project || !blueprints.length) return (
    <div>
      Project: { JSON.stringify(project) }
      <br />
      <br />
      <br />
      Blueprints: { JSON.stringify(blueprints) }
    </div>
  )

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
          characteristics={project.characteristics}
          companyLogo={project.company.logo_url}
          companyName={project.company.name}
          housingState={project.housingState}
          description={project.description}
          location={project.location}
          name={project.name}
          address={project.address}
          city={project.city}
          department={project.department}
          projectLogo={project.logo}
          projectId={project.id}
          stratum={project.stratum}
          units={blueprints.reduce((acc, b) => acc + b.units, 0)}
          deadline={project?.deadline}
          typologies={blueprints}
          urbanismFiles={project.urbanism}
        />
        <OtherProjects projectId={id} />
      </article>
      <MyFooter />
    </main>
  )
}