"use client";

import { useCreditSimulador } from "@/components/financing/CreditSimulador";
import { SelectCurrency } from "@/components/projects/SelectCurrency";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { NativeSlider } from "@/components/ui/slider-native";
import { useCurrencyContext } from "@/contexts/CurrencyContext";
import { Typography } from "@inverclick/inverclick-ui/typography";

import CurrencyInput from "react-currency-input-field";

export type FeeSimulatorProps = Readonly<{
  onSimulate: () => void;
  onReset: () => void;
}>;

export const FeeSimulator = ({ onSimulate, onReset }: FeeSimulatorProps) => {
  const { currency } = useCurrencyContext();

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
    <article className="flex-1 flex flex-col gap-6 animate-blurred-fade-in">
      <div className="flex gap-4 justify-between items-center">
        <Typography>¿Cuál es el valor de la cuota que quiero pagar?</Typography>
        <SelectCurrency />
      </div>
      <CurrencyInput
        key={currency}
        intlConfig={{ locale, currency }}
        decimalsLimit={2}
        value={inputValue}
        className="w-full text-3xl font-semibold h-20 border border-black rounded-xl px-4 focus:outline-none"
        onValueChange={(value) => setInputValue(String(value))}
      />
      {/* <RadioGroup className="flex items-center gap-8">
        <div className="flex  items-center gap-2">
          <Typography>Crédito hipotecario</Typography>
          <RadioGroupItem value="Crédito hipotecario" />
        </div>
        <div className="flex items-center gap-2">
          <Typography>Leasing habitacional</Typography>
          <RadioGroupItem value="Leasing habitacional" />
        </div>
      </RadioGroup> */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1 flex flex-col">
          <Typography variant="h4" className="mb-4 text-center lg:text-left">
            ¿A cuantos años?
          </Typography>
          <div>
            <Typography variant="h3" className="mb-2 text-center lg:text-left">
              {years} años
            </Typography>
            <NativeSlider
              defaultValue={[years]}
              onValueChange={(values) => setYears(values[0])}
              min={5}
              max={20}
              step={1}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col ">
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
