import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { DraftProject } from "@/app/projects/[project]/[typology]/preview/_services/get-draft-project";
import { cn } from "@/lib/utils";
import { isLotProject } from "@/services/projects/is-lot-project";
import { getAssetUrl } from "@/services/utils";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { ComponentProps } from "react";

import Image from "next/image";

export type ProjectInformationSectionProps = Readonly<{
  project: Project | DraftProject;
  typology: Project["typologies"][0] | DraftProject["typologies"][0];
}> &
  ComponentProps<"section">;

export const ProjectInformationSection = ({
  project,
  typology,
  ...props
}: ProjectInformationSectionProps) => {
  // Un lote no se vende por unidades (apartamentos), así que ese dato se omite
  // y la caja sólo se pinta si queda algo que mostrar dentro.
  const showAvailableUnits = !isLotProject(project.housing_type);
  const showDeliveryDate = Boolean(typology.delivery_date);

  return (
    <section className={cn("flex flex-col gap-4", props.className)} {...props}>
      <Typography
        data-element="project-name"
        variant="h2"
        className="mb-4 text-center lg:text-left"
      >
        {project.name}
      </Typography>
      <div
        data-element="project-description"
        className="flex flex-col items-start gap-4 lg:flex-row lg:gap-6"
      >
        <Image
          data-element="project-logo"
          unoptimized
          src={
            project.logo
              ? getAssetUrl(project.logo)
              : "/building-placeholder.png"
          }
          alt={project.name ?? "N/A"}
          width={112}
          height={112}
          className="mx-auto"
        />
        <div className="flex w-full flex-col gap-4">
          <Typography data-element="project-description">
            {project.description}
          </Typography>
          {(showAvailableUnits || showDeliveryDate) && (
            <article className="flex flex-col gap-0 rounded-lg border p-4 lg:flex-row lg:justify-center lg:gap-4">
              {showAvailableUnits && (
                <Typography variant="h4" className="text-lg">
                  Unidades disponibles:{" "}
                  <span className="font-normal">
                    {project.typologies.reduce(
                      (acc, typology) => acc + typology.units,
                      0
                    )}
                    *
                  </span>
                </Typography>
              )}
              {showDeliveryDate && (
                <Typography variant="h4" className="text-lg">
                  Fecha de entrega:{" "}
                  <span className="font-normal">01/06/2026*</span>
                </Typography>
              )}
            </article>
          )}
        </div>
      </div>
    </section>
  );
};
