import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { useCurrencyContext } from "@/contexts/currency-context";
import { formatCurrency } from "@/lib/format-currency";
import { fixDecimals } from "@/lib/round-to-decimals";
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

  const valorization = typology.price * (1 + percentage);
  const gain = typology.price * percentage;

  return (
    <section className={cn(props.className)} {...props}>
      <Typography variant="h3" className="mb-12 lg:mb-24">
        Este proyecto potencia tu inversión y tu patrimonio*
      </Typography>

      <div className="mb-12 flex flex-col gap-4 lg:hidden">
        <InfoBlock
          label="Valor actual:"
          value={`${formatCurrency(convert(typology.price), currency)} ${currency}`}
          color="bg-slate-500"
        />
        <InfoBlock
          label={`Valor proyectado en ${months} meses:`}
          value={`${formatCurrency(convert(valorization), currency)} ${currency}`}
          color="bg-teal-500"
        />
        <InfoBlock
          label="Podrías ganar en valoración:"
          value={`${formatCurrency(convert(gain), currency)} ${currency} (${fixDecimals(percentage * 100)}%)`}
          color="bg-green-500"
        />
      </div>

      <div className="relative mb-4 flex h-56 w-full items-end gap-4 border-b lg:h-96">
        <PriceBar
          label="Valor actual"
          value={`${formatCurrency(convert(typology.price), currency)} ${currency}`}
          color="bg-slate-500"
          position="left-[30%]"
          height={`calc(100% - (${percentage} * 100%))`}
        />
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
        <PriceBar
          label={`Valor proyectado en ${months} meses`}
          value={`${formatCurrency(convert(valorization), currency)} ${currency}`}
          color="bg-teal-500"
          position="left-[50%] h-full"
        />
        <div className="absolute bottom-full right-[30%] hidden h-[0.5px] bg-black lg:left-[calc(50%+2.5rem)] lg:block"></div>
      </div>

      <Typography>
        Estos valores son de referencia y representan cálculos estimados que
        pueden variar según las condiciones del mercado*
      </Typography>
    </section>
  );
};

const InfoBlock = function ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-start gap-1">
      <div className={`mt-1 aspect-square size-4 rounded-full ${color}`}></div>
      <div className="flex flex-col">
        <Typography>{label}</Typography>
        <Typography className="font-semibold">{value}</Typography>
      </div>
    </div>
  );
};

const PriceBar = function ({
  label,
  value,
  color,
  position,
  height,
}: {
  label: string;
  value: string;
  color: string;
  position: string;
  height?: string;
}) {
  return (
    <div
      className={`absolute ${position} w-10 -translate-x-1/2 md:w-20`}
      style={{ height }}
    >
      <div className={`h-full w-full ${color}`}></div>
      <div className="absolute bottom-full right-full hidden lg:block">
        <Typography className="whitespace-nowrap text-right">
          {label}
        </Typography>
        <Typography variant="h4" className="whitespace-nowrap text-right">
          {value}
        </Typography>
      </div>
    </div>
  );
};
