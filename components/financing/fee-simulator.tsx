"use client";

import { useCreditSimulador } from "@/components/financing/credit-simulator";
import { SelectCurrency } from "@/components/shared/select-currency/select-currency";
import { useCurrencyContext } from "@/contexts/currency-context";
import { Button } from "@inverclick/inverclick-ui/button";
import { Calendar } from "@inverclick/inverclick-ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@inverclick/inverclick-ui/popover";
import { Slider } from "@inverclick/inverclick-ui/slider";
import { Typography } from "@inverclick/inverclick-ui/typography";

import CurrencyInput from "react-currency-input-field";

export type FeeSimulatorProps = Readonly<{
  onSimulate: () => void;
  onReset: () => void;
}>;

export const FeeSimulator = ({ onSimulate, onReset }: FeeSimulatorProps) => {
  const { currency } = useCurrencyContext((s) => s);

  const {
    quota: {
      quotaInputValue: inputValue,
      setQuotaInputValue: setInputValue,
      quotaDate: date,
      setQuotaDate: setDate,
      quotaYears: years,
      setQuotaYears: setYears,
    },
  } = useCreditSimulador();

  let locale: string;

  if (currency === "COP") {
    locale = "es-CO";
  } else if (currency === "EUR") {
    locale = "de-DE";
  } else {
    locale = "en-US";
  }

  return (
    <article className="flex flex-1 animate-blurred-fade-in flex-col gap-6">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <Typography className="flex-shrink-0 flex-grow">
          ¿Cuál es el valor de la cuota que quiero pagar?
        </Typography>
        <SelectCurrency className="lg:max-w-20" />
      </div>
      <CurrencyInput
        key={currency}
        intlConfig={{ locale, currency }}
        decimalsLimit={2}
        value={inputValue}
        className="h-20 w-full rounded-xl border border-black px-4 text-3xl font-semibold focus:outline-none"
        onValueChange={(value) => setInputValue(String(value))}
      />
      <div className="mb-4 flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-1 flex-col">
          <Typography variant="h4" className="mb-4 text-center lg:text-left">
            ¿A cuantos años?
          </Typography>
          <div>
            <Typography variant="h3" className="mb-2 text-center lg:text-left">
              {years} años
            </Typography>
            <Slider
              defaultValue={[years]}
              onValueChange={(values) => setYears(values[0])}
              min={5}
              max={20}
              step={1}
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <Typography variant="h4" className="mb-4 text-center lg:text-left">
            Fecha de nacimiento
          </Typography>
          <Popover>
            <PopoverTrigger asChild>
              <Typography
                variant="h3"
                className="cursor-pointer text-center lg:text-left"
              >
                {formatDate(date) || "DD/MM/AAAA"}
              </Typography>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                captionLayout="dropdown-buttons"
                selected={date}
                onSelect={setDate}
                fromYear={1960}
                toYear={2030}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Button
        onClick={onSimulate}
        disabled={isNaN(Number(inputValue)) || !date}
        className="mt-auto"
      >
        Simular
      </Button>
    </article>
  );
};

function formatDate(date: Date | undefined) {
  if (!date) return "DD/MM/YYYY";
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return `${day < 10 ? "0" + day : day.toString()}/${
    month < 10 ? "0" + month : month.toString()
  }/${year}`;
}
