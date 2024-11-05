"use client";

import { useCreditSimulador } from "@/components/financing/CreditSimulador";
import { SelectCurrency } from "@/components/projects/SelectCurrency";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NativeSlider } from "@/components/ui/slider-native";
import { useCurrencyContext } from "@/contexts/CurrencyContext";
import CurrencyInput from "react-currency-input-field";

export type FeeSimulatorProps = Readonly<{
  onSimulate: () => void;
  onRest: () => void;
}>;

export const FeeSimulator = ({ onSimulate, onRest }: FeeSimulatorProps) => {
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

  const locale =
    currency === "COP" ? "es-CO" : currency === "EUR" ? "de-DE" : "en-US";

  return (
    <article className="flex-1 flex flex-col gap-6 animate-blurred-fade-in">
      <div className="flex gap-4 items-center">
        <p className="text-lg font-medium">
          ¿Cuál es el valor comercial de la vivienda?
        </p>
        <SelectCurrency />
      </div>
      <div className="w-fit">
        <CurrencyInput
          key={currency}
          intlConfig={{ locale, currency }}
          decimalsLimit={2}
          value={inputValue}
          className="text-3xl h-20 border border-black rounded-xl px-4 focus:outline-none"
          onValueChange={(value) => setInputValue(String(value))}
        />
      </div>
      <div className="flex items-center gap-8">
        <div className="flex  items-center gap-2">
          <p className="font-light">Crédito hipotecario</p>
          <Checkbox />
        </div>
        <div className="flex items-center gap-2">
          <p className="font-light">Leasing Habitacional</p>
          <Checkbox />
        </div>
      </div>
      <div className="flex gap-10">
        <div className="flex-1 text-center">
          <p className="font-medium text-lg mb-4">¿A cuantos años?</p>
          <p className="font-medium text-3xl mb-4 ">{years} años</p>
          <NativeSlider
            defaultValue={[years]}
            onValueChange={(values) => setYears(values[0])}
            max={15}
            step={1}
          />
        </div>
        <div className="flex-1 text-center">
          <p className="font-medium text-lg mb-4">Fecha de nacimiento</p>
          <Popover>
            <PopoverTrigger asChild>
              <p className="cursor-pointer text-2xl">
                {formatDate(date) || "DD/MM/AAAA"}
              </p>
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
      <div className="mt-4 self-center flex gap-3">
        <button
          onClick={onSimulate}
          className="text-sm md:text-base px-6 text-white py-2 rounded-full bg-primary-600 hover:bg-primary-700"
        >
          Simular
        </button>
        <button
          onClick={onRest}
          className="text-sm md:text-base px-6 py-2 rounded-full bg-slate-300 text-slate-600 hover:bg-slate-200 transition-colors ease-in"
        >
          Reiniciar
        </button>
      </div>
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
