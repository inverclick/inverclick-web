"use client";

import { Map2 } from "@/components/projects/map-2";
import { MobileProjectHeader } from "@/components/projects/mobile/mobile-project-header";
import { NavbarProjects } from "@/components/projects/navbar-projects";
import ProjectContent, {
  ProjectContentProps,
} from "@/components/projects/project-content";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { useEffect, useRef } from "react";
import { ImperativePanelGroupHandle, PanelGroup } from "react-resizable-panels";
import { useMediaQuery } from "usehooks-ts";

export function ProjectsLayout(props: ProjectContentProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)", {
    initializeWithValue: false,
  });
  const panels = useRef<ImperativePanelGroupHandle>(null);

  useEffect(() => {
    panels.current?.setLayout(isDesktop ? [30, 70] : [40, 60]);
  }, [isDesktop]);

  return (
    <main>
      {!isDesktop && <MobileProjectHeader {...props} />}
      <PanelGroup
        ref={panels}
        direction={isDesktop ? "horizontal" : "vertical"}
        className="!h-screen w-full"
      >
        <ResizablePanel defaultSize={40} minSize={isDesktop ? 30 : 20}>
          <Map2 projects={props.projects} />
        </ResizablePanel>
        <ResizableHandle
          className={isDesktop ? "w-5 bg-border" : "!h-5 bg-border"}
          withHandle
        />
        <ResizablePanel
          defaultSize={60}
          minSize={isDesktop ? 30 : undefined}
          maxSize={isDesktop ? undefined : 80}
          className="relative z-10 flex flex-col"
        >
          {isDesktop && <NavbarProjects />}
          <ProjectContent {...props} showFilters={isDesktop} />
        </ResizablePanel>
      </PanelGroup>
    </main>
  );
}
