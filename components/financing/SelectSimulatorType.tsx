import clsx from "clsx";
import React, { useEffect, useRef } from "react";

interface Props {
  setSimulatorType: (type: "VALOR" | "CUOTA") => void;
  simulatorType: "VALOR" | "CUOTA";
}

export const SelectSimulatorType = ({
  setSimulatorType,
  simulatorType,
}: Props) => {
  const activeTabRef = useRef<HTMLButtonElement | null>(null);

  const [width, setWidth] = React.useState(0);
  const [offset, setOffset] = React.useState(0);

  useEffect(() => {
    if (activeTabRef.current) {
      setWidth(activeTabRef.current.clientWidth);
      setOffset(activeTabRef.current.offsetLeft);
    }
  }, [simulatorType, activeTabRef]);

  return (
    <div className="relative border border-primary-600 w-fit rounded-full isolate">
      <button
        ref={(ref) => {
          if (simulatorType === "VALOR") {
            activeTabRef.current = ref;
          }
        }}
        onClick={() => setSimulatorType("VALOR")}
        className={clsx(
          "px-6 py-2 rounded-full !w-[241px]",
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
          "px-6 py-2 rounded-full",
          simulatorType === "CUOTA" && activeTabRef.current && "text-white"
        )}
      >
        Cuota que quiero pagar
      </button>
      {activeTabRef.current && (
        <div
          className="absolute inset-0 h-full bg-primary-600 rounded-full transition-all -z-10 !w-[242px]"
          style={{
            width,
            transform: `translateX(${offset}px)`,
          }}
        ></div>
      )}
    </div>
  );
};
