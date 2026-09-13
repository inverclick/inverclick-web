"use client";

import { ProjectContactForm } from "@/app/projects/[project]/[typology]/_components/project-contact-form";
import { cn } from "@/lib/utils";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { ComponentProps } from "react";

export type ProjectContactCardProps = Readonly<{
  projectId: string;
  isPreview?: boolean;
}> &
  ComponentProps<"aside">;

/**
 * Tarjeta "Te asesoramos" que acompaña al contenido del proyecto en desktop.
 * Se queda fija mientras el usuario recorre las pestañas gracias al `sticky`
 * que le aplica quien la monta (ver `project-content.tsx`).
 */
export function ProjectContactCard({
  projectId,
  isPreview,
  className,
  ...props
}: ProjectContactCardProps) {
  return (
    <aside
      data-element="project-contact-card"
      className={cn(
        "rounded-xl border bg-white p-5 shadow-sm 2xl:p-6",
        className
      )}
      {...props}
    >
      <Typography variant="h4" className="text-center text-lg">
        Te asesoramos
      </Typography>
      <Typography className="mt-1 text-center text-xs text-muted-foreground">
        Déjanos tus datos y pronto estaremos en contacto.
      </Typography>
      <ProjectContactForm
        projectId={projectId}
        isPreview={isPreview}
        className="mt-5"
      />
    </aside>
  );
}
