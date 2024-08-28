import { CardService } from "@/components/shared/card-service";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
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
        "flex flex-col md:flex-row gap-8 mx-4 md:mx-auto mb-8 lg:mb-24",
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
