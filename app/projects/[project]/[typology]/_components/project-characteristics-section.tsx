"use client";

import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { cn } from "@/lib/utils";
import { isCompanyVerified } from "@/services/companies/is-company-verified";
import { getAssetUrl } from "@/services/utils";
import { Icon } from "@inverclick/inverclick-ui/icon";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@inverclick/inverclick-ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@inverclick/inverclick-ui/tooltip";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { BadgeCheck, Info } from "lucide-react";
import { ComponentProps } from "react";

import Image from "next/image";

export type ProjectCharacteristicsProps = {
  project: Project;
} & ComponentProps<"section">;

export const ProjectCharacteristicsSection = ({
  project,
  ...props
}: ProjectCharacteristicsProps) => {
  return (
    <section className={cn(props.className)} {...props}>
      <section className="mb-12 flex flex-col">
        <Typography variant="h3" className="mb-4">
          Características del proyecto
        </Typography>
        <div className="flex gap-4">
          <Image
            unoptimized
            src={getAssetUrl(project.company.logo_url)}
            alt={project.company.name}
            width={60}
            height={60}
            className="md:w-28"
          />
          <div>
            <Typography>
              Constructora:{" "}
              <span className="font-medium">{project.company.name}</span>
            </Typography>
            {isCompanyVerified(project.company.subscription_status) && (
              <div className="flex items-center gap-1">
                <Icon icon={BadgeCheck} className="text-green-500" />
                <Typography className="font-medium">
                  Constructora verificada
                </Typography>
                <TooltipProvider>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <Info className="size-4" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ab corporis aliquid sit aspernatur, minima quidem
                        praesentium consectetur ad. Nam vitae magnam ea nisi
                        necessitatibus veritatis officiis, quo nobis repudiandae
                        iure?
                      </Typography>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="flex flex-col">
        <Typography variant="h3" className="mb-4">
          Un proyecto con espacios únicos
        </Typography>
        <ToggleGroup
          type="single"
          variant="outline"
          className="pointer-events-none grid w-full max-w-3xl grid-cols-2 md:grid-cols-4"
        >
          {project.characteristics.map((characteristic) => (
            <ToggleGroupItem
              key={characteristic.id.toString()}
              value={characteristic.id.toString()}
              className="flex h-auto flex-grow flex-col items-start gap-2 p-2 text-left"
            >
              <Image
                unoptimized
                src={getAssetUrl(characteristic.characteristic.icon)}
                alt={characteristic.characteristic.label}
                width={24}
                height={24}
              />
              {characteristic.characteristic.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </section>
    </section>
  );
};
