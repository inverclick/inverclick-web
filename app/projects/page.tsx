import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { MyMap } from "@/components/projects/MyMap";
import NavbarProjects from "@/components/projects/NavbarProjects";
import ProjectContent from "@/components/projects/ProjectContent";
import { getAllProjects } from "@/services/projects";
import { MobileProjectHeader } from '@/components/projects/mobile/MobileProjectHeader';
import { LoginButton } from '@/components/shared/LoginButton';
import { ContactButton } from '@/components/shared/ContactButton';

export const dynamic = 'force-dynamic'

export default async function Projects (props: any) {
  const {searchParams} = props
  const parsedSearchParams = new URLSearchParams(searchParams)
  const { count, data } = await getAllProjects(`?${parsedSearchParams.toString()}`);
  
  const department = parsedSearchParams.get('department')
  
  return (
    <main>
      <LoginButton />
      <ContactButton />
  
      <div className='hidden lg:flex flex-col lg:flex-row '>
        <section className='flex-1'>
          <MyMap blueprints={data} />
        </section>
        <section className='z-10 shadow-xl flex-1 relative max-w-[50%]'>
          <NavbarProjects />
          <ProjectContent total={count} blueprints={data} department={department} /> 
        </section>
      </div>
      <section className='lg:hidden'>
        <MobileProjectHeader total={count} department={department} /> 
        <div className='h-screen'>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={80}>
              <MyMap blueprints={data} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={20} maxSize={60}>
              <ProjectContent total={count} blueprints={data} department={department} /> 
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </section>
    </main>
  )
} 