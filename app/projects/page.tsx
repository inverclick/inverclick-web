import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { MyMap } from "@/components/projects/MyMap";
import NavbarProjects from "@/components/projects/NavbarProjects";
import ProjectContent from "@/components/projects/ProjectContent";
import { getAllProjects } from "@/services/projects";
import { MobileProjectHeader } from '@/components/projects/mobile/MobileProjectHeader';
import { ContactButton } from '@/components/shared/ContactButton';
import { DefaultResizableHandle, DefaultResizablePanel, DefaultResizablePanelGroup } from '@/components/ui/resizable-default';

export const dynamic = 'force-dynamic'
export const runtime = 'edge' 

export default async function Projects (props: any) {
  const {searchParams} = props
  const parsedSearchParams = new URLSearchParams(searchParams)
  const { count, data } = await getAllProjects(`?${parsedSearchParams.toString()}`);
  
  return (
    <main>
      <ContactButton />
  
      <section className='hidden lg:block'>
        <DefaultResizablePanelGroup direction="horizontal" >
          <DefaultResizablePanel defaultSize={50}>
            <MyMap blueprints={data} />
          </DefaultResizablePanel>
          <DefaultResizableHandle withHandle />
          <DefaultResizablePanel defaultSize={50} minSize={25} className='z-10 relative'>
            <NavbarProjects />
            <ProjectContent total={count} blueprints={data} /> 
          </DefaultResizablePanel>
        </DefaultResizablePanelGroup>
      </section>
      <section className='lg:hidden'>
        <MobileProjectHeader total={count}  /> 
        <div className='h-screen'>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={80}>
              <MyMap blueprints={data} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={20} maxSize={60}>
              <ProjectContent total={count} blueprints={data}  /> 
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </section>
    </main>
  )
} 