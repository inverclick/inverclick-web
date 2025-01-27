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
        "mx-4 mb-8 grid grid-cols-1 gap-8 md:mx-auto md:grid-cols-2 lg:mb-24",
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
