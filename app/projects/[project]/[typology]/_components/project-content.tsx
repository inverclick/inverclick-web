"use client";

import { ProjectCharacteristicsSection } from "@/app/projects/[project]/[typology]/_components/project-characteristics-section";
import { ProjectContactCard } from "@/app/projects/[project]/[typology]/_components/project-contact-card";
import { ProjectCreditSimulatorSection } from "@/app/projects/[project]/[typology]/_components/project-credit-simulator-section";
import { ProjectFeaturesSection } from "@/app/projects/[project]/[typology]/_components/project-features-section";
import { ProjectInformationSection } from "@/app/projects/[project]/[typology]/_components/project-information-section";
import { ProjectLocationSection } from "@/app/projects/[project]/[typology]/_components/project-location-section";
import { ProjectValorizationSection } from "@/app/projects/[project]/[typology]/_components/project-valorization-section";
import { useGatedAction } from "@/app/projects/[project]/[typology]/_components/use-gated-action";
import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { DraftProject } from "@/app/projects/[project]/[typology]/preview/_services/get-draft-project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimpleAnalytics } from "@/services/simple-analytics/simple-analytics";
import { Lock } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
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

// Tabs other than the description need a session: load them only when opened,
// so visitors without one (and crawlers) don't download them.
const TypologiesSection = dynamic(() =>
  import(
    "@/app/projects/[project]/[typology]/_components/typologies-section"
  ).then((mod) => mod.TypologiesSection)
);
const UrbanismSection = dynamic(() =>
  import(
    "@/app/projects/[project]/[typology]/_components/urbanism-section"
  ).then((mod) => mod.UrbanismSection)
);
const CreditSimulatorSection = dynamic(() =>
  import(
    "@/app/projects/[project]/[typology]/_components/credit-simulator-section"
  ).then((mod) => mod.CreditSimulatorSection)
);

type Tab = "description" | "types" | "urban" | "credit";

const TAB_ANALYTICS: Record<Tab, (args: { projectId: string }) => void> = {
  description: (args) => SimpleAnalytics.viewProjectDescription(args),
  types: (args) => SimpleAnalytics.viewProjectTypologies(args),
  urban: (args) => SimpleAnalytics.viewProjectUrbanism(args),
  credit: (args) => SimpleAnalytics.viewProjectCreditSimulator(args),
};

export type ProjectContentProps = {
  project: Project | DraftProject;
  typology: Project["typologies"][0] | DraftProject["typologies"][0];
  /** La vista previa trabaja sobre un borrador: el formulario no envía nada. */
  isPreview?: boolean;
};

export const ProjectContent = ({
  project,
  typology,
  isPreview,
}: ProjectContentProps) => {
  const { allowed, runGated } = useGatedAction({ bypass: isPreview });
  const [tab, setTab] = useState<Tab>("description");

  const openTab = (next: Tab) => {
    if (next === tab) return;
    const show = () => {
      setTab(next);
      if (!isPreview) TAB_ANALYTICS[next]({ projectId: project.id });
    };
    // The description is open to everyone; the other tabs ask to sign in.
    if (next === "description") show();
    else runGated(show);
  };

  return (
    <article className="flex gap-4">
      <Tabs
        value={tab}
        onValueChange={(value) => openTab(value as Tab)}
        // Without a session, moving with the arrow keys shouldn't open the
        // sign-in dialog: a tab changes only on Enter or click.
        activationMode={allowed ? "automatic" : "manual"}
        className="w-full"
      >
        <TabsList className="mb-12 flex items-center">
          <TabsTrigger value="description">Descripción</TabsTrigger>
          <GatedTrigger value="types" locked={!allowed}>
            Tipologías
          </GatedTrigger>
          <GatedTrigger value="urban" locked={!allowed}>
            Urbanismo
          </GatedTrigger>
          <GatedTrigger
            value="credit"
            locked={!allowed}
            className="mx-6 rounded-lg border border-primary px-2 py-1 text-base !no-underline transition-colors ease-in hover:bg-primary-100 md:text-lg lg:text-xl"
          >
            Simulador de crédito
          </GatedTrigger>
        </TabsList>
        {/* El contenido se corre a la izquierda para dejarle ~20% a la tarjeta
            de contacto, que queda sticky y acompaña el scroll en cualquier
            pestaña. `items-start` es lo que permite el sticky: si la columna
            estirara a todo el alto, no tendría recorrido. */}
        <div className="flex items-start gap-6 2xl:gap-10">
          <div className="min-w-0 flex-1">
            <TabsContent value="description" className="mx-auto mt-0 max-w-5xl">
              {/* <ProjectVerifiedCard project={project} className="mb-12" /> */}
              <ProjectInformationSection
                project={project}
                typology={typology}
                className="mb-12"
              />
              <ProjectCharacteristicsSection
                project={project}
                className="mb-12"
              />
              <ProjectLocationSection project={project} className="mb-12" />
              <ProjectFeaturesSection project={project} className="mb-12" />
              {project.show_valuation && (
                <ProjectValorizationSection
                  typology={typology}
                  months={project.valuation_months}
                  percentage={project.valuation}
                  className="mb-12"
                />
              )}
              <GatedSimulator
                allowed={allowed}
                onRequestAccess={(focusSimulator) => runGated(focusSimulator)}
              >
                <ProjectCreditSimulatorSection typology={typology} />
              </GatedSimulator>
            </TabsContent>
            <TabsContent value="types" className="mx-auto mt-0 max-w-5xl">
              <TypologiesSection
                typologies={project.typologies}
                housingType={project.housing_type}
              />
            </TabsContent>
            <TabsContent value="urban" className="mx-auto mt-0 max-w-5xl">
              <UrbanismSection project={project} />
            </TabsContent>
            <TabsContent value="credit" className="mx-auto mt-0 max-w-5xl">
              <CreditSimulatorSection typology={typology} />
            </TabsContent>
          </div>
          <ProjectContactCard
            projectId={project.id}
            isPreview={isPreview}
            className="sticky top-24 hidden w-1/5 min-w-[260px] max-w-[340px] shrink-0 xl:block"
          />
        </div>
      </Tabs>
    </article>
  );
};

function GatedTrigger({
  locked,
  children,
  ...props
}: React.ComponentProps<typeof TabsTrigger> & { locked: boolean }) {
  return (
    <TabsTrigger
      {...props}
      aria-description={locked ? "Requiere iniciar sesión" : undefined}
    >
      <span className="inline-flex items-center gap-1.5">
        {children}
        {locked && <Lock className="h-3.5 w-3.5 opacity-60" aria-hidden />}
      </span>
    </TabsTrigger>
  );
}

/**
 * The simulator at the end of the description stays visible without a
 * session, but using it asks to sign in first; then it is focused.
 */
function GatedSimulator({
  allowed,
  onRequestAccess,
  children,
}: {
  allowed: boolean;
  onRequestAccess: (focusSimulator: () => void) => void;
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  // `inert` keeps keyboard users out of controls they can't use yet.
  useEffect(() => {
    if (contentRef.current) contentRef.current.inert = !allowed;
  }, [allowed]);

  const focusSimulator = () => {
    const content = contentRef.current;
    content?.scrollIntoView({ behavior: "smooth", block: "center" });
    content
      ?.querySelector<HTMLElement>("input, select, button, [tabindex]")
      ?.focus({ preventScroll: true });
  };

  return (
    <div className="relative">
      <div ref={contentRef}>{children}</div>
      {!allowed && (
        <button
          type="button"
          onClick={() => onRequestAccess(focusSimulator)}
          aria-label="Inicia sesión para simular tu crédito"
          className="group absolute inset-0 flex cursor-pointer items-start justify-end rounded-lg p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <Lock className="h-3.5 w-3.5" aria-hidden />
            Inicia sesión para simular
          </span>
        </button>
      )}
    </div>
  );
}

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
