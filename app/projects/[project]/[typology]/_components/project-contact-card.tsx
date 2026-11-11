"use client";

import { ProjectContactForm } from "@/app/projects/[project]/[typology]/_components/project-contact-form";
import { useGatedAction } from "@/app/projects/[project]/[typology]/_components/use-gated-action";
import { cn } from "@/lib/utils";
import { Button } from "@inverclick/inverclick-ui/button";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { ComponentProps, useRef } from "react";

export type ProjectContactCardProps = Readonly<{
  projectId: string;
  isPreview?: boolean;
}> &
  ComponentProps<"aside">;

/**
 * Tarjeta "Te asesoramos" que acompaña al contenido del proyecto en desktop.
 * Se queda fija mientras el usuario recorre las pestañas gracias al `sticky`
 * que le aplica quien la monta (ver `project-content.tsx`).
 *
 * Sin sesión muestra un botón «Contactar» que pide iniciar sesión; al entrar
 * aparece el formulario (precargado con los datos del usuario) y se enfoca.
 */
export function ProjectContactCard({
  projectId,
  isPreview,
  className,
  ...props
}: ProjectContactCardProps) {
  const { allowed, runGated } = useGatedAction({ bypass: isPreview });
  const formRef = useRef<HTMLDivElement>(null);

  const focusForm = () => {
    // The form mounts in the render that follows the session; wait a frame.
    requestAnimationFrame(() =>
      formRef.current?.querySelector<HTMLElement>("input")?.focus()
    );
  };

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
      {allowed ? (
        <div ref={formRef}>
          <ProjectContactForm
            projectId={projectId}
            isPreview={isPreview}
            className="mt-5"
          />
        </div>
      ) : (
        <Button className="mt-5 w-full" onClick={() => runGated(focusForm)}>
          Contactar
        </Button>
      )}
    </aside>
  );
}
