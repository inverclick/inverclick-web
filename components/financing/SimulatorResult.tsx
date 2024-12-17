"use client";

import { CountUp } from "@/components/shared/CountUp";
import { useCurrencyContext } from "@/contexts/CurrencyContext";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { Button } from "@inverclick/inverclick-ui/button";

import "./financing.css";

export type SimulatorResultProps = {
  value: number;
  ea: number;
  type: "VALOR" | "CUOTA";
};

export const SimulatorResult = ({ value, ea, type }: SimulatorResultProps) => {
  const { currency, convert } = useCurrencyContext();

  const _ea = ea * 100;
  const _nvm = (Math.pow(1 + ea, 1 / 12) - 1) * 100;

  return (
    <section>
      <div className="circular-progress-container mb-6">
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          className={`circular-progress ${
            value !== 0 ? "circular-progress-animation" : ""
          }`}
        >
          <circle className="bg"></circle>
          <circle className="fg"></circle>
        </svg>
        <div className="flex flex-col absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 min-w-64">
          <p className="text-2xl font-medium mb-2 text-center">
            <CountUp
              initial={0}
              final={value}
              decimals={2}
              formatter={(newValue) =>
                currencyFormatter(convert(Number(newValue)), currency)
              }
            />
            *
          </p>
          <div className="flex gap-8 justify-between mx-10">
            <p className="text-sm">Tasa e.a.</p>
            <p className="text-sm">{_ea.toFixed(2)}%*</p>
          </div>
          <div className="flex gap-8 justify-between mx-10">
            <p className="text-sm">Tasa n.m.v</p>
            <p className="text-sm">{_nvm.toFixed(2)}%*</p>
          </div>
        </div>
        <svg
          viewBox="0 0 300 300"
          width="300"
          height="300"
          className="absolute top-[53%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rotate-180"
        >
          <path
            id="curve"
            d="M 150 30 A 120 120 0 1 1 150 270 A 120 120 0 1 1 150 30"
            className="fill-transparent"
          />
          <text>
            <textPath
              href="#curve"
              startOffset="50%"
              textAnchor="middle"
              lengthAdjust="spacingAndGlyphs"
              fontSize={12}
              className="fill-gray-400"
            >
              {type === "VALOR"
                ? "Cuota mensual fija a pagar*"
                : "Te podrían prestar un valor aproximado de*"}
            </textPath>
          </text>
        </svg>
      </div>
      <div className="flex flex-col gap-4">
        <Button disabled={isNaN(value) || value === 0}>
          Solicitar preaprobado
        </Button>
        <Button variant="link" disabled={isNaN(value) || value === 0}>
          Ver detalle
        </Button>
      </div>
    </section>
  );
};
