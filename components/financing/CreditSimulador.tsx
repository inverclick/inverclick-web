"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { SelectSimulatorType } from "./SelectSimulatorType";
import { FeeSimulator } from "./FeeSimulator";
import { ValueSimulator } from "./ValueSimulator";
import { SimulatorResult } from "./SimulatorResult";

export type CreditSimuladorContextType = {
  value: {
    type: string;
    setType: Dispatch<SetStateAction<string>>;
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    maxPercentage: number;
    setMaxPercentage: Dispatch<SetStateAction<number>>;
    percentage: number;
    setPercentage: Dispatch<SetStateAction<number>>;
    date: Date | undefined;
    setDate: Dispatch<SetStateAction<Date | undefined>>;
    years: number;
    setYears: Dispatch<SetStateAction<number>>;
  };
  quota: {
    quotaInputValue: string;
    setQuotaInputValue: Dispatch<SetStateAction<string>>;
    quotaDate: Date | undefined;
    setQuotaDate: Dispatch<SetStateAction<Date | undefined>>;
    quotaYears: number;
    setQuotaYears: Dispatch<SetStateAction<number>>;
  };
};

export const CreditSimuladorContext = createContext(
  {} as CreditSimuladorContextType
);

export const useCreditSimulador = () => {
  return useContext(CreditSimuladorContext);
};

export const CreditSimulador = () => {
  const [simulatorType, setSimulatorType] = useState<"VALOR" | "CUOTA">(
    "VALOR"
  );

  const [valueCredit, setValueCredit] = useState(0);
  const [quotaCredit, setQuotaCredit] = useState(0);

  // VALOR
  const [type, setType] = useState<string>("Crédito hipotecario");
  const [inputValue, setInputValue] = useState<string>("1000000");
  const [maxPercentage, setMaxPercentage] = useState(70);
  const [percentage, setPercentage] = useState(70);
  const [date, setDate] = useState<Date>();
  const [years, setYears] = useState(15);

  // CUOTA
  const [quotaInputValue, setQuotaInputValue] = useState<string>("1000000");
  const [quotaDate, setQuotaDate] = useState<Date>();
  const [quotaYears, setQuotaYears] = useState(15);

  return (
    <CreditSimuladorContext.Provider
      value={{
        value: {
          type,
          setType,
          inputValue,
          setInputValue,
          maxPercentage,
          setMaxPercentage,
          percentage,
          setPercentage,
          date,
          setDate,
          years,
          setYears,
        },
        quota: {
          quotaInputValue,
          setQuotaInputValue,
          quotaDate,
          setQuotaDate,
          quotaYears,
          setQuotaYears,
        },
      }}
    >
      <section className="flex flex-col gap-6 h-[700px]">
        <SelectSimulatorType
          setSimulatorType={setSimulatorType}
          simulatorType={simulatorType}
        />
        <div className="flex flex-col md:flex-row">
          {simulatorType === "VALOR" ? (
            <ValueSimulator
              onRest={() => setValueCredit(0)}
              onSimulate={() => {
                setValueCredit(3124434000);
                setSimulatorType("VALOR");
              }}
            />
          ) : null}
          {simulatorType === "CUOTA" ? (
            <FeeSimulator
              onRest={() => setQuotaCredit(0)}
              onSimulate={() => {
                setQuotaCredit(3124434000);
                setSimulatorType("CUOTA");
              }}
            />
          ) : null}
          <article
            key={simulatorType}
            className="flex-1 flex justify-center items-center animate-blurred-fade-in"
          >
            <SimulatorResult
              value={simulatorType === "VALOR" ? valueCredit : quotaCredit}
            />
          </article>
        </div>
      </section>
    </CreditSimuladorContext.Provider>
  );
};
