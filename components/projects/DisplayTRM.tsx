"use client";

import { useCurrencyContext } from "@/contexts/CurrencyContext";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { useEffect, useState } from "react";

export default function DisplayTRM() {
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
    <div className="h-4 overflow-y-hidden">
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
