"use client";

import { ProjectContactForm } from "@/app/projects/[project]/[typology]/_components/project-contact-form";
import { DisplayFormattedCurrency } from "@/components/shared/display-formatted-currency";
import { Button } from "@inverclick/inverclick-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@inverclick/inverclick-ui/dialog";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { useState } from "react";

export type ProjectContactBarProps = Readonly<{
  price: number;
}>;

/**
 * Alternativa a la tarjeta sticky para tablet y móvil, donde no cabe una
 * columna lateral: una barra fija abajo con el precio y un botón que abre el
 * formulario en un diálogo. Por encima de `xl` desaparece y manda la tarjeta.
 *
 * Va montada a nivel de página (no dentro del contenido de las pestañas) para
 * que acompañe todo el scroll; el `<main>` que la incluye compensa su alto con
 * padding inferior para que no tape el footer.
 */
export function ProjectContactBar({ price }: ProjectContactBarProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div
        data-element="project-contact-bar"
        className="fixed inset-x-0 bottom-0 z-40 border-t bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] sm:px-6 xl:hidden"
      >
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-baseline gap-2">
            <Typography className="shrink-0 text-xs sm:text-sm">
              Desde:
            </Typography>
            <DisplayFormattedCurrency
              number={price}
              showAsterix
              className="truncate text-base sm:text-lg"
            />
          </div>
          <Button className="shrink-0" onClick={() => setIsDialogOpen(true)}>
            Contactar
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">
              Te asesoramos
            </DialogTitle>
            <DialogDescription className="text-center text-xs">
              Déjanos tus datos y pronto estaremos en contacto.
            </DialogDescription>
          </DialogHeader>
          <ProjectContactForm className="mt-2" />
        </DialogContent>
      </Dialog>
    </>
  );
}
