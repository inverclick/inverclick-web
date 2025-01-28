import { SimulatorType } from "@/components/financing/credit-simulator";
import { useEffect, useRef, useState } from "react";

import clsx from "clsx";

export type SelectSimulatorTypeProps = {
  setSimulatorType: (type: SimulatorType) => void;
  simulatorType: SimulatorType;
};

export const SelectSimulatorType = ({
  setSimulatorType,
  simulatorType,
}: SelectSimulatorTypeProps) => {
  const activeTabRef = useRef<HTMLButtonElement | null>(null);

  const [width, setWidth] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (activeTabRef.current) {
      setWidth(activeTabRef.current.clientWidth);
      setOffset(activeTabRef.current.offsetLeft);
    }
  }, [simulatorType, activeTabRef]);

  return (
    <div className="relative isolate flex w-full rounded-full border border-primary md:w-fit">
      <button
        ref={(ref) => {
          if (simulatorType === "VALOR") {
            activeTabRef.current = ref;
          }
        }}
        onClick={() => setSimulatorType("VALOR")}
        className={clsx(
          "flex-1 rounded-full px-6 py-2 text-xs md:whitespace-nowrap lg:text-base",
          simulatorType === "VALOR" && activeTabRef.current && "text-white"
        )}
      >
        Valor de la vivienda
      </button>
      <button
        ref={(ref) => {
          if (simulatorType === "CUOTA") {
            activeTabRef.current = ref;
          }
        }}
        onClick={() => setSimulatorType("CUOTA")}
        className={clsx(
          "flex-1 rounded-full px-6 py-2 text-xs md:whitespace-nowrap lg:text-base",
          simulatorType === "CUOTA" && activeTabRef.current && "text-white"
        )}
      >
        Cuota que quiero pagar
      </button>
      {activeTabRef.current && (
        <div
          className="absolute inset-0 -z-10 h-full rounded-full bg-primary transition-all"
          style={{
            width,
            transform: `translateX(${offset}px)`,
          }}
        ></div>
      )}
    </div>
  );
};
