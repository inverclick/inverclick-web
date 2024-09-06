"use client";

import { useCurrencyContext } from "@/contexts/CurrencyContext";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { useEffect, useState } from "react";

export default function DisplayTRM() {
  // 40s
  const INTERVAL = 40000;
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
    <div className="h-4 overflow-y-hidden">
      <div
        className="h-4 transition-transform duration-500"
        style={{
          transform: `translateY(calc(-16px * ${translationIndex}))`,
        }}
      >
        <p className="text-[10px] xl:text-[12px] font-medium">
          Dolar hoy: {currencyFormatter(TRM_USD, "COP")}&nbsp;
          <span className="text-[8px] xl:text-[10px]">COP</span>
        </p>
        <p className="text-[10px] xl:text-[12px] font-medium">
          Euro hoy: {currencyFormatter(TRM_EUR, "COP")}&nbsp;
          <span className="text-[8px] xl:text-[10px]">COP</span>
        </p>
      </div>
    </div>
  );
}
