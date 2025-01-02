"use client";

import { CreditSimulatorSection } from "@/app/projects/[project]/[typology]/_components/credit-simulator-section";
import { ProjectCharacteristicsSection } from "@/app/projects/[project]/[typology]/_components/project-characteristics-section";
import { ProjectCreditSimulatorSection } from "@/app/projects/[project]/[typology]/_components/project-credit-simulator-section";
import { ProjectFeaturesSection } from "@/app/projects/[project]/[typology]/_components/project-features-section";
import { ProjectInformationSection } from "@/app/projects/[project]/[typology]/_components/project-information-section";
import { ProjectLocationSection } from "@/app/projects/[project]/[typology]/_components/project-location-section";
import { ProjectValorizationSection } from "@/app/projects/[project]/[typology]/_components/project-valorization-section";
import { TypologiesSection } from "@/app/projects/[project]/[typology]/_components/typologies-section";
import { UrbanismSection } from "@/app/projects/[project]/[typology]/_components/urbanism-section";
import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { isProjectVerified } from "@/services/projects/is-project-verified";
import { Icon } from "@inverclick/inverclick-ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@inverclick/inverclick-ui/tooltip";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Info, ShieldCheck, Star } from "lucide-react";
import { ComponentProps } from "react";

const VALORIZATION_MONTHS = 18;
const VALORIZATION_PERCENTAGE = 0.203;

export type ProjectContentProps = {
  project: Project;
  typology: Project["typologies"][0];
};

export const ProjectContent = ({ project, typology }: ProjectContentProps) => {
  return (
    <article className="flex gap-4">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="flex items-center mb-12">
          <TabsTrigger value="description">Descripción</TabsTrigger>
          <TabsTrigger value="types">Tipologías</TabsTrigger>
          <TabsTrigger value="urban">Urbanismo</TabsTrigger>
          <TabsTrigger
            value="credit"
            className="mx-6 px-2 py-1 border border-primary rounded-lg text-base md:text-lg lg:text-xl hover:bg-primary-100 transition-colors ease-in !no-underline"
          >
            Simulador de crédito
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="max-w-5xl mx-auto mt-0">
          <ProjectVerifiedCard project={project} className="mb-12" />
          <ProjectInformationSection
            project={project}
            typology={typology}
            className="mb-12"
          />
          <ProjectCharacteristicsSection project={project} className="mb-12" />
          <ProjectLocationSection project={project} className="mb-12" />
          <ProjectFeaturesSection project={project} className="mb-12" />
          <ProjectValorizationSection
            typology={typology}
            months={VALORIZATION_MONTHS}
            percentage={VALORIZATION_PERCENTAGE}
            className="mb-12"
          />
          <ProjectCreditSimulatorSection typology={typology} />
        </TabsContent>
        <TabsContent value="types" className="max-w-5xl mx-auto mt-0">
          <TypologiesSection typologies={project.typologies} />
        </TabsContent>
        <TabsContent value="urban" className="max-w-5xl mx-auto mt-0">
          <UrbanismSection project={project} />
        </TabsContent>
        <TabsContent value="credit" className="max-w-5xl mx-auto mt-0">
          <CreditSimulatorSection typology={typology} />
        </TabsContent>
      </Tabs>
    </article>
  );
};

type ProjectVerifiedCardProps = Readonly<{ project: Project }> &
  ComponentProps<"article">;

const ProjectVerifiedCard = ({
  project,
  ...props
}: ProjectVerifiedCardProps) => {
  return (
    <article
      className={cn(
        "flex flex-col lg:flex-row lg:items-center border rounded-lg p-4 ",
        props.className
      )}
    >
      {isProjectVerified(project.plan.name) && (
        <>
          <div className="flex gap-2 justify-center items-center">
            <Icon
              icon={ShieldCheck}
              className={cn("size-6 ", {
                "text-green-500": isProjectVerified(project.plan.name),
                "text-slate-500": !isProjectVerified(project.plan.name),
              })}
            />
            <Typography>Proyecto verificado</Typography>
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Info className="size-4" />
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                    corporis aliquid sit aspernatur, minima quidem praesentium
                    consectetur ad. Nam vitae magnam ea nisi necessitatibus
                    veritatis officiis, quo nobis repudiandae iure?
                  </Typography>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="my-4 lg:mx-4 lg:my-0 w-full h-[0.5px] lg:w-[0.5px] lg:h-6 bg-border"></div>
        </>
      )}
      <div className="flex-1 flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <Typography className="text-center">
          Según nuestros usuarios, es uno de los proyectos más solicitados.
        </Typography>
        <div className="flex flex-col items-center">
          <Typography variant="h4" className="text-center">
            4.91
          </Typography>
          <div className="flex gap-1 items-center">
            <Icon icon={Star} />
            <Icon icon={Star} />
            <Icon icon={Star} />
            <Icon icon={Star} />
            <Icon icon={Star} />
          </div>
        </div>
      </div>
      <div className="my-4 lg:mx-4 lg:my-0 w-full h-[0.5px] lg:w-[0.5px] lg:h-6 bg-border"></div>
      <div className="flex flex-col items-center">
        <Typography variant="h4" className="text-center">
          54
        </Typography>
        <Typography>Reseñas</Typography>
      </div>
    </article>
  );
};
