"use client";

import { useCurrencyContext } from "@/contexts/currency-context";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import { ComponentProps, useEffect, useState } from "react";

export type DisplayTRMProps = Readonly<{ size?: "xs" | "base" }> &
  ComponentProps<"div">;

export function DisplayTRM({
  size = "xs",
  className,
  ...props
}: DisplayTRMProps) {
  // 10s
  const INTERVAL = 10000;
  const RATES = 2;

  const { currency, TRM_USD, TRM_EUR } = useCurrencyContext((s) => s);

  const [translationIndex, setTranslationIndex] = useState(0);

  useEffect(() => {
    if (currency === "COP") {
      const intervalId = setInterval(() => {
        setTranslationIndex((prev) => (prev + 1) % RATES);
      }, INTERVAL);

      return () => {
        clearInterval(intervalId);
      };
    } else if (currency === "USD") {
      setTranslationIndex(0); // Fix to USD
    } else if (currency === "EUR") {
      setTranslationIndex(1); // Fix to EUR
    }
  }, [currency, RATES]);

  const lineHeight: { [key: string]: number } = {
    xs: 16,
    base: 24,
  };

  return (
    <div
      className={cn("h-4 overflow-y-hidden", className, {
        "h-6": size === "base",
      })}
      {...props}
    >
      <div
        className={cn("h-4 transition-transform duration-500", {
          "h-6": size === "base",
        })}
        style={{
          transform: `translateY(calc(-${lineHeight[size]}px * ${translationIndex}))`,
        }}
      >
        <p
          className={cn("text-xs font-medium", {
            "text-base": size === "base",
          })}
        >
          USD hoy: {formatCurrency(TRM_USD, "COP")}&nbsp;
          <span
            className={cn("text-[10px]", {
              "text-[12px]": size === "base",
            })}
          >
            COP
          </span>
        </p>
        <p
          className={cn("text-xs font-medium", {
            "text-base": size === "base",
          })}
        >
          EUR hoy: {formatCurrency(TRM_EUR, "COP")}&nbsp;
          <span
            className={cn("text-[10px]", {
              "text-[12px]": size === "base",
            })}
          >
            COP
          </span>
        </p>
      </div>
    </div>
  );
}
