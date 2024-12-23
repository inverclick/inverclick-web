import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { useCurrencyContext } from "@/contexts/currency-context";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { ComponentProps } from "react";

export type ValorizaGraphSectionProps = {
  typology: Project["typologies"][0];
  percentage: number;
  months: number;
} & ComponentProps<"section">;

export const ProjectValorizationSection = ({
  typology,
  percentage,
  months,
  ...props
}: ValorizaGraphSectionProps) => {
  const { currency, convert } = useCurrencyContext((s) => s);

  const valorization = typology.price + typology.price * percentage;
  const gain = typology.price * percentage;

  return (
    <section className={cn(props.className)} {...props}>
      <Typography variant="h3" className="mb-12 lg:mb-24">
        Este proyecto potencia tu inversión y tu patrimonio*
      </Typography>
      <div className="lg:hidden flex flex-col gap-4 mb-12">
        <div className="flex items-start gap-1">
          <div className="mt-1 size-4 aspect-square bg-slate-500 rounded-full"></div>
          <div className="flex flex-col">
            <Typography>Precio actual:</Typography>
            <Typography className="font-semibold">
              {formatCurrency(convert(typology.price), currency)} {currency}
            </Typography>
          </div>
        </div>
        <div className="flex items-start gap-1">
          <div className="mt-1 size-4 aspect-square bg-teal-500 rounded-full"></div>
          <div className="flex flex-col">
            <Typography>Valor proyectado en 18 meses:</Typography>
            <Typography className="font-semibold">
              {formatCurrency(convert(valorization), currency)} {currency}
            </Typography>
          </div>
        </div>
        <div className="flex items-start gap-1">
          <div className="mt-1 size-4 aspect-square bg-green-500 rounded-full"></div>
          <div className="flex flex-col">
            <Typography>Podrías ganar en valoración:</Typography>
            <Typography className="font-semibold">
              {formatCurrency(convert(gain), currency)} {currency}{" "}
              {`(${percentage * 100}%)`}
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative flex items-end gap-4 w-full h-56 lg:h-96 mb-4 border-b">
        <div
          data-element="current-price-bar"
          className="absolute w-10 md:w-20 left-[30%] -translate-x-1/2"
          style={{
            height: `calc(100% - (${percentage} * 100%))`,
          }}
        >
          <div className="w-full h-full bg-slate-500"></div>
          <div className="hidden lg:block absolute bottom-full right-full">
            <Typography className="whitespace-nowrap text-right">
              Precio actual:
            </Typography>
            <Typography variant="h4" className="whitespace-nowrap text-right">
              {formatCurrency(convert(typology.price), currency)} {currency}
            </Typography>
          </div>
        </div>
        <div
          className="hidden lg:block absolute lg:left-[calc(30%+2.5rem)] h-[0.5px] right-[30%] bg-black"
          style={{
            bottom: `calc(100% - (${percentage} * 100%))`,
          }}
        >
          <div className="hidden lg:block absolute bottom-0 left-full">
            <Typography className="whitespace-nowrap text-right">
              Podrías ganar en valorización:
            </Typography>
            <Typography variant="h4" className="whitespace-nowrap text-right">
              {formatCurrency(convert(gain), currency)} {currency}
            </Typography>
            <Typography variant="h4" className="whitespace-nowrap text-right">
              {percentage * 100}%
            </Typography>
          </div>
        </div>
        <div
          data-element="valorization-price-bar"
          className="absolute w-10 md:w-20 h-full left-[50%] -translate-x-1/2"
        >
          <div className="w-full h-full bg-teal-500"></div>
          <div className="hidden lg:block absolute bottom-full right-full">
            <Typography className="whitespace-nowrap text-right">
              Valor proyectado en {months} meses:
            </Typography>
            <Typography variant="h4" className="whitespace-nowrap text-right">
              {formatCurrency(convert(valorization), currency)} {currency}
            </Typography>
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-full lg:left-[calc(50%+2.5rem)] h-[0.5px] right-[30%] bg-black"></div>
      </div>
      <Typography>
        Estos valores son de referencia y representan cálculos estimados que
        pueden variar según las condiciones del mercado*
      </Typography>
    </section>
  );
};
