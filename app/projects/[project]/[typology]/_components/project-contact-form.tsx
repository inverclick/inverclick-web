"use client";

import { cn } from "@/lib/utils";
import { Button } from "@inverclick/inverclick-ui/button";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { ComponentProps } from "react";

export type ProjectContactFormProps = Omit<ComponentProps<"form">, "onSubmit">;

/**
 * Formulario de contacto del proyecto. Por ahora es un placeholder: sólo existe
 * para poder trabajar la ubicación y el comportamiento del bloque dentro de la
 * página (columna sticky en desktop, diálogo en pantallas pequeñas). Los campos
 * reales y el envío se implementan aparte.
 */
export function ProjectContactForm({
  className,
  ...props
}: ProjectContactFormProps) {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      <div className="rounded-md border border-dashed bg-muted/60 px-4 py-6 text-center">
        <Typography className="font-medium">Hola mundo</Typography>
      </div>
      <Button type="submit" className="w-full">
        Contactar
      </Button>
    </form>
  );
}
