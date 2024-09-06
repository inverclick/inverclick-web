"use client";

import { useProjectsPageStore } from "@/app/projects/_store";
import { IBLUEPRINT_POPULATED } from "@/types/blueprint";
import React from "react";
import { ProjectCard } from "../shared/ProjectCard";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  blueprints: IBLUEPRINT_POPULATED[];
}

export const ProjectInfinityScroll = ({ blueprints }: Props) => {
  const _blueprints = useProjectsPageStore((state) => state.blueprints);

  return (
    <ScrollArea className="h-[500px] lg:h-[calc(100vh_-_125px)]">
      <div className="mt-4 w-full gap-y-4 pb-10 grid justify-items-center [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))] lg:[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))] 2xl:[grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]">
        {_blueprints.map((blueprint) => (
          <ProjectCard key={blueprint._id} blueprint={blueprint} />
        ))}
      </div>
    </ScrollArea>
  );
};
