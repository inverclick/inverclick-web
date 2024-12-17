"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrencyContext } from "@/contexts/CurrencyContext";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export type SelectCurrencyProps = ComponentProps<typeof SelectTrigger>;

export const SelectCurrency = ({ ...props }: SelectCurrencyProps) => {
  const { currency, changeCurrency } = useCurrencyContext();

  return (
    <Select value={currency} onValueChange={changeCurrency}>
      <SelectTrigger className={cn(props.className, "min-w-20")} {...props}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="COP">COP</SelectItem>
        <SelectItem value="USD">USD</SelectItem>
        <SelectItem value="EUR">EUR</SelectItem>
      </SelectContent>
    </Select>
  );
};
