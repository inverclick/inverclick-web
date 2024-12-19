"use client";

import { useCreditSimulador } from "@/components/financing/credit-simulator";
import { SelectCurrency } from "@/components/shared/select-currency/select-currency";
import { useCurrencyContext } from "@/contexts/currency-context";
import { formatCurrency } from "@/lib/format-currency";
import { Button } from "@inverclick/inverclick-ui/button";
import { Calendar } from "@inverclick/inverclick-ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@inverclick/inverclick-ui/popover";
import {
  RadioGroup,
  RadioGroupItem,
} from "@inverclick/inverclick-ui/radio-group";
import { Slider } from "@inverclick/inverclick-ui/slider";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { useEffect } from "react";

import CurrencyInput from "react-currency-input-field";

export type ValueSimulatorProps = Readonly<{
  onSimulate: () => void;
  onReset: () => void;
}>;

export const ValueSimulator = ({
  onSimulate,
  onReset,
}: ValueSimulatorProps) => {
  const { currency } = useCurrencyContext((s) => s);

  const {
    value: {
      type,
      setType,
      inputValue,
      setInputValue,
      maxPercentage,
      setMaxPercentage,
      percentage,
      setPercentage,
      date,
      setDate,
      years,
      setYears,
    },
  } = useCreditSimulador();

  useEffect(() => {
    if (type === "Crédito hipotecario") {
      setMaxPercentage(70);
      if (percentage > 70) setPercentage(70);
    }

    if (type === "Leasing habitacional") {
      setMaxPercentage(80);
      if (percentage > 80) setPercentage(80);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  let locale: string;

  if (currency === "COP") {
    locale = "es-CO";
  } else if (currency === "EUR") {
    locale = "de-DE";
  } else {
    locale = "en-US";
  }

  return (
    <article className="flex-1 flex flex-col gap-6 animate-blurred-fade-in">
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
        <Typography className="flex-grow flex-shrink-0">
          ¿Cuál es el valor comercial de la vivienda?
        </Typography>
        <SelectCurrency className="lg:max-w-20" />
      </div>
      <CurrencyInput
        key={currency}
        intlConfig={{ locale, currency }}
        decimalsLimit={2}
        value={inputValue}
        className="w-full text-3xl font-semibold h-20 border border-black rounded-xl px-4 focus:outline-none"
        onValueChange={(value) => setInputValue(String(value))}
      />
      <RadioGroup
        value={type}
        onValueChange={setType}
        className="flex items-center gap-4"
      >
        <div className="flex  items-center gap-2">
          <Typography>Crédito hipotecario</Typography>
          <RadioGroupItem value="Crédito hipotecario" />
        </div>
        <div className="flex items-center gap-2">
          <Typography>Leasing habitacional</Typography>
          <RadioGroupItem value="Leasing habitacional" />
        </div>
      </RadioGroup>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col w-full">
          <Typography variant="h4" className="mb-4 text-center lg:text-left">
            ¿Cuanto dinero necesitas?
          </Typography>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Typography
                variant="h3"
                className="mb-2 text-center lg:text-left"
              >
                {percentage}%
              </Typography>
              <Slider
                defaultValue={[percentage]}
                onValueChange={(values) => setPercentage(values[0])}
                max={maxPercentage}
                step={1}
              />
            </div>
            <Typography
              variant="h3"
              className="w-full lg:w-4 text-center lg:text-left"
            >
              =
            </Typography>
            <Typography
              variant="h3"
              className="flex-1 text-center lg:text-left"
            >
              {isNaN(Number(inputValue))
                ? ""
                : formatCurrency(
                    (Number(inputValue) * percentage) / 100,
                    currency
                  )}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-[calc(2rem+1rem)] mb-4">
        <div className="flex-1 flex flex-col">
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
        <div className="flex-1 flex flex-col">
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
