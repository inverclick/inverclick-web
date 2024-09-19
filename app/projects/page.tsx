import { MobileProjectHeader } from "@/components/projects/mobile/MobileProjectHeader";
import { MyMap2 } from "@/components/projects/MyMap2";
import ProjectContent from "@/components/projects/ProjectContent";
import { ContactButton } from "@/components/shared/ContactButton";
import { Header } from "@/components/shared/header/header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  DefaultResizableHandle,
  DefaultResizablePanel,
  DefaultResizablePanelGroup,
} from "@/components/ui/resizable-default";
import { ENV_VARS } from "@/global/env";
import { getAllProjects } from "@/services/projects";
import { Metadata } from "next";
import NavbarProjects from "../../components/projects/NavbarProjects";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Conoce todos los proyectos de Inverclick",
  openGraph: {
    url: ENV_VARS.BASE_URL + "/projects",
    title: "Proyectos",
    description:
      "Accede a un mapa dinámico de opciones inmobiliarias en toda Colombia, explora las mejores alternativas de inversión.",
  },
};

export default async function Projects(props: any) {
  const { searchParams } = props;

  const parsedSearchParams = new URLSearchParams(searchParams);

  const { count, data } = await getAllProjects(
    `?${parsedSearchParams.toString()}`
  );

  return (
    <main>
      <ContactButton className="absolute right-4 bottom-4" />
      <section className="hidden lg:block">
        <DefaultResizablePanelGroup
          direction="horizontal"
          className="!h-screen"
        >
          <DefaultResizablePanel defaultSize={32}>
            <MyMap2 blueprints={data} />
          </DefaultResizablePanel>
          <DefaultResizableHandle withHandle />
          <DefaultResizablePanel
            defaultSize={68}
            minSize={25}
            className="z-10 relative flex flex-col"
          >
            <NavbarProjects />
            <ProjectContent total={count} blueprints={data} />
          </DefaultResizablePanel>
        </DefaultResizablePanelGroup>
      </section>
      <section className="lg:hidden">
        <MobileProjectHeader total={count} />
        <div className="h-screen">
          <ResizablePanelGroup direction="vertical" className="!h-screen">
            <ResizablePanel defaultSize={50}>
              <MyMap2 blueprints={data} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              defaultSize={50}
              maxSize={60}
              className="flex flex-col"
            >
              <ProjectContent total={count} blueprints={data} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </section>
    </main>
  );
}
