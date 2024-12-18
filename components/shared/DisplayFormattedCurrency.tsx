"use client";

import { useCurrencyContext } from "@/contexts/currency-context";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { ComponentProps, useEffect, useState } from "react";

export type DisplayFormattedCurrencyProps = Readonly<{
  number: number;
  showAsterix?: boolean;
}> &
  ComponentProps<typeof Typography>;

export const DisplayFormattedCurrency = ({
  number,
  showAsterix,
  ...props
}: DisplayFormattedCurrencyProps) => {
  const { convert, currency } = useCurrencyContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Typography variant="h3" className={cn(props.className)} {...props}>
      {formatCurrency(convert(number), currency)} {currency}
      {showAsterix && "*"}
    </Typography>
  );
};
