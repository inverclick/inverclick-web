"use client";

import { useCurrencyContext } from "@/contexts/CurrencyContext";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { cn } from "@/lib/utils";
import { ComponentProps, useEffect, useState } from "react";

export type DisplayTRMProps = ComponentProps<"div">;

export default function DisplayTRM({ className, ...props }: DisplayTRMProps) {
  // 10s
  const INTERVAL = 10000;
  const RATES = 2;

  const { TRM_USD, TRM_EUR, loadTRM } = useCurrencyContext();

  const [translationIndex, setTranslationIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTranslationIndex((prev) => (prev + 1) % RATES);
    }, INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [RATES]);

  useEffect(() => {
    loadTRM();
  }, [loadTRM]);

  return (
    <div className={cn("h-4 overflow-y-hidden", className)} {...props}>
      <div
        className="h-4 transition-transform duration-500"
        style={{
          transform: `translateY(calc(-16px * ${translationIndex}))`,
        }}
      >
        <p className="text-xs font-medium">
          USD hoy: {currencyFormatter(TRM_USD, "COP")}&nbsp;
          <span className="text-[10px]">COP</span>
        </p>
        <p className="text-xs font-medium">
          EUR hoy: {currencyFormatter(TRM_EUR, "COP")}&nbsp;
          <span className="text-[10px]">COP</span>
        </p>
      </div>
    </div>
  );
}
