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
          <Link
            href={service.link}
            className="flex flex-col p-4 rounded-xl shadow-2xl bg-white hover:scale-105 transition-transform"
          >
            <h2 className="font-bold text-lg">{service.title}</h2>
            <div className="border-l-4 border-black my-2 pl-2 flex items-center h-8">
              <h3 className=" text-xs">{service.description}</h3>
            </div>
            <button className="self-end bg-black p-1 rounded-full">
              <Plus color="white" size={16} />
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
