import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { useCurrencyContext } from "@/contexts/currency-context";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { ComponentProps } from "react";
import { fixDecimals } from "@/lib/round-to-decimals";

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
      <div className="mb-12 flex flex-col gap-4 lg:hidden">
        <div className="flex items-start gap-1">
          <div className="mt-1 aspect-square size-4 rounded-full bg-slate-500"></div>
          <div className="flex flex-col">
            <Typography>Valor actual:</Typography>
            <Typography className="font-semibold">
              {formatCurrency(convert(typology.price), currency)} {currency}
            </Typography>
          </div>
        </div>
        <div className="flex items-start gap-1">
          <div className="mt-1 aspect-square size-4 rounded-full bg-teal-500"></div>
          <div className="flex flex-col">
            <Typography>Valor proyectado en {months} meses:</Typography>
            <Typography className="font-semibold">
              {formatCurrency(convert(valorization), currency)} {currency}
            </Typography>
          </div>
        </div>
        <div className="flex items-start gap-1">
          <div className="mt-1 aspect-square size-4 rounded-full bg-green-500"></div>
          <div className="flex flex-col">
            <Typography>Podrías ganar en valoración:</Typography>
            <Typography className="font-semibold">
              {formatCurrency(convert(gain), currency)} {currency}{" "}
              {`(${fixDecimals(percentage * 100)}%)`}
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative mb-4 flex h-56 w-full items-end gap-4 border-b lg:h-96">
        <div
          data-element="current-price-bar"
          className="absolute left-[30%] w-10 -translate-x-1/2 md:w-20"
          style={{
            height: `calc(100% - (${percentage} * 100%))`,
          }}
        >
          <div className="h-full w-full bg-slate-500"></div>
          <div className="absolute bottom-full right-full hidden lg:block">
            <Typography className="whitespace-nowrap text-right">
              Valor actual:
            </Typography>
            <Typography variant="h4" className="whitespace-nowrap text-right">
              {formatCurrency(convert(typology.price), currency)} {currency}
            </Typography>
          </div>
        </div>
        <div
          className="absolute right-[30%] hidden h-[0.5px] bg-black lg:left-[calc(30%+2.5rem)] lg:block"
          style={{
            bottom: `calc(100% - (${percentage} * 100%))`,
          }}
        >
          <div className="absolute bottom-0 left-full hidden lg:block">
            <Typography className="whitespace-nowrap text-right">
              Podrías ganar en valorización:
            </Typography>
            <Typography variant="h4" className="whitespace-nowrap text-right">
              {formatCurrency(convert(gain), currency)} {currency}
            </Typography>
            <Typography variant="h4" className="whitespace-nowrap text-right">
              {fixDecimals(percentage * 100)}%
            </Typography>
          </div>
        </div>
        <div
          data-element="valorization-price-bar"
          className="absolute left-[50%] h-full w-10 -translate-x-1/2 md:w-20"
        >
          <div className="h-full w-full bg-teal-500"></div>
          <div className="absolute bottom-full right-full hidden lg:block">
            <Typography className="whitespace-nowrap text-right">
              Valor proyectado en {months} meses:
            </Typography>
            <Typography variant="h4" className="whitespace-nowrap text-right">
              {formatCurrency(convert(valorization), currency)} {currency}
            </Typography>
          </div>
        </div>
        <div className="absolute bottom-full right-[30%] hidden h-[0.5px] bg-black lg:left-[calc(50%+2.5rem)] lg:block"></div>
      </div>
      <Typography>
        Estos valores son de referencia y representan cálculos estimados que
        pueden variar según las condiciones del mercado*
      </Typography>
    </section>
  );
};
