"use client";

import { useCurrencyContext } from "@/contexts/currency-context";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@inverclick/inverclick-ui/select";
import { ComponentProps } from "react";

export type SelectCurrencyProps = ComponentProps<typeof SelectTrigger>;

export const SelectCurrency = ({ ...props }: SelectCurrencyProps) => {
  const { currency, changeCurrency } = useCurrencyContext();

  return (
    <Select value={currency} onValueChange={changeCurrency}>
      <SelectTrigger className={cn(props.className, "w-20")} {...props}>
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
