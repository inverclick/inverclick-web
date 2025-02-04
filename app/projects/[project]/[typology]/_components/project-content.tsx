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
import { usePreRegistration } from "@/contexts/pre-registration-context";
import { SimpleAnalytics } from "@/services/simple-analytics/simple-analytics";
// import { cn } from "@/lib/utils";
// import { isProjectVerified } from "@/services/projects/is-project-verified";
// import { Icon } from "@inverclick/inverclick-ui/icon";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@inverclick/inverclick-ui/tooltip";
// import { Typography } from "@inverclick/inverclick-ui/typography";
// import { Info, ShieldCheck, Star } from "lucide-react";
// import { ComponentProps } from "react";

/**
 * TODO: Allow to receive as prop Project | DraftProject (Needs refactor)
 */

export type ProjectContentProps = {
  project: Project;
  typology: Project["typologies"][0];
};

export const ProjectContent = ({ project, typology }: ProjectContentProps) => {
  const { canInteractWithFeatures } = usePreRegistration();

  return (
    <article className="flex gap-4">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="mb-12 flex items-center">
          <TabsTrigger
            value="description"
            onClick={() => {
              if (canInteractWithFeatures) {
                SimpleAnalytics.viewProjectDescription({
                  projectId: project.id,
                });
              }
            }}
          >
            Descripción
          </TabsTrigger>
          <TabsTrigger
            value="types"
            onClick={() => {
              if (canInteractWithFeatures) {
                SimpleAnalytics.viewProjectTypologies({
                  projectId: project.id,
                });
              }
            }}
          >
            Tipologías
          </TabsTrigger>
          <TabsTrigger
            value="urban"
            onClick={() => {
              if (canInteractWithFeatures) {
                SimpleAnalytics.viewProjectUrbanism({
                  projectId: project.id,
                });
              }
            }}
          >
            Urbanismo
          </TabsTrigger>
          <TabsTrigger
            value="credit"
            className="mx-6 rounded-lg border border-primary px-2 py-1 text-base !no-underline transition-colors ease-in hover:bg-primary-100 md:text-lg lg:text-xl"
            onClick={() => {
              if (canInteractWithFeatures) {
                SimpleAnalytics.viewProjectCreditSimulator({
                  projectId: project.id,
                });
              }
            }}
          >
            Simulador de crédito
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mx-auto mt-0 max-w-5xl">
          {/* <ProjectVerifiedCard project={project} className="mb-12" /> */}
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
            months={project.valuation_months}
            percentage={project.valuation}
            className="mb-12"
          />
          <ProjectCreditSimulatorSection typology={typology} />
        </TabsContent>
        <TabsContent value="types" className="mx-auto mt-0 max-w-5xl">
          <TypologiesSection typologies={project.typologies} />
        </TabsContent>
        <TabsContent value="urban" className="mx-auto mt-0 max-w-5xl">
          <UrbanismSection project={project} />
        </TabsContent>
        <TabsContent value="credit" className="mx-auto mt-0 max-w-5xl">
          <CreditSimulatorSection typology={typology} />
        </TabsContent>
      </Tabs>
    </article>
  );
};

// type ProjectVerifiedCardProps = Readonly<{ project: Project }> &
//   ComponentProps<"article">;

// const ProjectVerifiedCard = ({
//   project,
//   ...props
// }: ProjectVerifiedCardProps) => {
//   return (
//     <article
//       className={cn(
//         "flex flex-col rounded-lg border p-4 lg:flex-row lg:items-center",
//         props.className
//       )}
//     >
//       {/* WARNING: project.plan can be undefined */}
//       {project.plan && isProjectVerified(project.plan.name) && (
//         <>
//           <div className="flex items-center justify-center gap-2">
//             <Icon
//               icon={ShieldCheck}
//               className={cn("size-6", {
//                 "text-green-500": isProjectVerified(project.plan.name),
//                 "text-slate-500": !isProjectVerified(project.plan.name),
//               })}
//             />
//             <Typography>Proyecto verificado</Typography>
//             <TooltipProvider>
//               <Tooltip delayDuration={200}>
//                 <TooltipTrigger asChild>
//                   <Info className="size-4" />
//                 </TooltipTrigger>
//                 <TooltipContent className="max-w-sm">
//                   <Typography>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
//                     corporis aliquid sit aspernatur, minima quidem praesentium
//                     consectetur ad. Nam vitae magnam ea nisi necessitatibus
//                     veritatis officiis, quo nobis repudiandae iure?
//                   </Typography>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           </div>
//           <div className="my-4 h-[0.5px] w-full bg-border lg:mx-4 lg:my-0 lg:h-6 lg:w-[0.5px]"></div>
//         </>
//       )}
//       <div className="flex flex-1 flex-col justify-between gap-4 lg:flex-row lg:items-center">
//         <Typography className="text-center">
//           Según nuestros usuarios, es uno de los proyectos más solicitados.
//         </Typography>
//         <div className="flex flex-col items-center">
//           <Typography variant="h4" className="text-center">
//             4.91
//           </Typography>
//           <div className="flex items-center gap-1">
//             <Icon icon={Star} />
//             <Icon icon={Star} />
//             <Icon icon={Star} />
//             <Icon icon={Star} />
//             <Icon icon={Star} />
//           </div>
//         </div>
//       </div>
//       <div className="my-4 h-[0.5px] w-full bg-border lg:mx-4 lg:my-0 lg:h-6 lg:w-[0.5px]"></div>
//       <div className="flex flex-col items-center">
//         <Typography variant="h4" className="text-center">
//           54
//         </Typography>
//         <Typography>Reseñas</Typography>
//       </div>
//     </article>
//   );
// };
