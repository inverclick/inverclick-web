"use client";

import { useProjectsPageStore } from "@/app/projects/_store";
import { Map2 } from "@/components/projects/map-2";
import { MobileProjectHeader } from "@/components/projects/mobile/mobile-project-header";
import { NavbarProjects } from "@/components/projects/navbar-projects";
import ProjectContent, {
  ProjectContentProps,
} from "@/components/projects/project-content";
import { MapSearch } from "@/components/projects/search/map-search";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { useDebounce } from "@/hooks/use-debounce";
import { filterByText } from "@/lib/project-search";
import {
  loadSessionRanks,
  orderRandomly,
  saveSessionRanks,
} from "@/lib/random-order";
import { ProjectSearchEntry } from "@/services/projects/project-search-index";
import { useEffect, useMemo, useRef, useState } from "react";
import { ImperativePanelGroupHandle, PanelGroup } from "react-resizable-panels";
import { useMediaQuery } from "usehooks-ts";

// Long enough to skip re-clustering the map on every keystroke, short enough to feel live.
const TEXT_FILTER_DELAY_MS = 200;

export type ProjectsLayoutProps = ProjectContentProps &
  Readonly<{ searchIndex: ProjectSearchEntry[] }>;

export function ProjectsLayout({ searchIndex, ...props }: ProjectsLayoutProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)", {
    initializeWithValue: false,
  });
  const panels = useRef<ImperativePanelGroupHandle>(null);

  useEffect(() => {
    panels.current?.setLayout(isDesktop ? [30, 70] : [40, 60]);
  }, [isDesktop]);

  // Random order for this tab session, read after mounting (sessionStorage
  // doesn't exist on the server).
  const [ranks, setRanks] = useState<Map<string, number> | null>(null);
  useEffect(() => setRanks(loadSessionRanks()), []);
  const orderedProjects = useMemo(
    () => (ranks ? orderRandomly(props.projects, ranks) : props.projects),
    [props.projects, ranks]
  );
  useEffect(() => {
    if (ranks) saveSessionRanks(ranks);
  }, [orderedProjects, ranks]);

  // Free text filters the loaded results in memory; it never hits the network.
  const searchText = useProjectsPageStore((state) => state.searchText);
  const debouncedText = useDebounce(searchText, TEXT_FILTER_DELAY_MS) ?? "";
  // Clearing the search shows everything right away.
  const appliedText = searchText.trim() ? debouncedText : "";
  const filtering = searchText.trim() !== "" && debouncedText !== searchText;
  const visibleProjects = useMemo(
    () => filterByText(orderedProjects, appliedText),
    [orderedProjects, appliedText]
  );

  const contentProps = {
    ...props,
    projects: visibleProjects,
    total: appliedText ? visibleProjects.length : props.total,
  };

  return (
    <main>
      {!isDesktop && <MobileProjectHeader {...contentProps} />}
      <PanelGroup
        ref={panels}
        direction={isDesktop ? "horizontal" : "vertical"}
        className="!h-screen w-full"
      >
        <ResizablePanel
          defaultSize={40}
          minSize={isDesktop ? 30 : 20}
          className="relative"
        >
          <Map2 projects={visibleProjects} filtering={filtering} />
          {/* Below the floating mobile header; at the top of the map on desktop. */}
          <div className="pointer-events-none absolute inset-x-0 top-[76px] z-10 flex justify-center px-4 lg:top-4">
            <MapSearch
              className="pointer-events-auto"
              searchIndex={searchIndex}
              projects={orderedProjects}
            />
          </div>
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
          <ProjectContent {...contentProps} showFilters={isDesktop} />
        </ResizablePanel>
      </PanelGroup>
    </main>
  );
}
