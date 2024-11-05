import { CardService } from "@/components/shared/card-service";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

const SERVICES = [
  {
    title: "Financiación",
    description: "Crédito Hipotecario - Leasing Habitacional",
    link: "/financing",
  },
  {
    title: "Otros servicios",
    description: "Seguros - Envío de divisas - Apertura cuentas",
    link: "/",
  },
];

export type ServicesProps = ComponentProps<"ul">;

export function Services({ className, ...props }: ServicesProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-8 mx-4 md:mx-auto mb-8 lg:mb-24",
        className
      )}
      {...props}
    >
      {SERVICES.map((service) => (
        <li key={service.title}>
          <CardService {...service} />
        </li>
      ))}
    </ul>
  );
}
