import { MyMap } from "@/components/projects/MyMap";
import NavbarProjects from "@/components/projects/NavbarProjects";
import ProjectContent from "@/components/projects/ProjectContent";
import { getAllProjects } from "@/services/projects";

export default async function Projects (props: any) {
  const {searchParams} = props
  console.log({searchParams})
  const { count, data } = await getAllProjects();
  
  return (
    <main className='flex flex-col lg:flex-row'>
      <section className='flex-1'>
        <MyMap blueprints={data} />
      </section>
      <section className='z-10 shadow-xl flex-1 relative max-w-[50%]'>
        <NavbarProjects />
        <ProjectContent total={count} blueprints={data} /> 
      </section>
    </main>
  )
} 