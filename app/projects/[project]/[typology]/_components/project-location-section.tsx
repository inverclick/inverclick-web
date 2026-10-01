"use client";

import { ProjectLocationMapPlaceholder } from "@/app/projects/[project]/[typology]/_components/project-location-map-placeholder";
import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { DraftProject } from "@/app/projects/[project]/[typology]/preview/_services/get-draft-project";
import { LazyMount } from "@/components/shared/lazy-mount";
import { cn } from "@/lib/utils";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { ComponentProps } from "react";

import dynamic from "next/dynamic";

const ProjectLocationMap = dynamic(
  () =>
    import(
      "@/app/projects/[project]/[typology]/_components/project-location-map"
    ),
  { ssr: false, loading: () => <ProjectLocationMapPlaceholder /> }
);

export type ProjectLocationProps = {
  project: Project | DraftProject;
} & ComponentProps<"section">;

export const ProjectLocationSection = ({
  project,
  ...props
}: ProjectLocationProps) => {
  return (
    <section className={cn("flex flex-col", props.className)} {...props}>
      <Typography variant="h3" className="mb-4">
        Ubicación
      </Typography>
      <Typography className="mb-4">
        Colombia, {project.department?.name ?? "N/A"},{" "}
        {project.city?.name ?? "N/A"} / {project.address}
      </Typography>
      {project.latitude && project.longitude && (
        <LazyMount
          placeholder={<ProjectLocationMapPlaceholder />}
          rootMargin="300px 0px"
        >
          <ProjectLocationMap
            latitude={project.latitude}
            longitude={project.longitude}
          />
        </LazyMount>
      )}
    </section>
  );
};
