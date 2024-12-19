"use client";

import { FeeSimulator } from "@/components/financing/fee-simulator";
import { SelectSimulatorType } from "@/components/financing/select-simulator-type";
import { SimulatorResult } from "@/components/financing/simulator-result";
import { ValueSimulator } from "@/components/financing/value-simulator";
import { Typography } from "@inverclick/inverclick-ui/typography";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

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

export type SimulatorType = "VALOR" | "CUOTA";

export type CreditSimuladorProps = Readonly<{
  price: number;
}>;

export const VALUE_EFFECTIVE_ANNUAL_INTEREST = 0.1645;
export const QUOTA_EFFECTIVE_ANNUAL_INTEREST = 0.11;
export const INSURANCE = 0.06;

export const CreditSimulador = ({ price }: CreditSimuladorProps) => {
  const [simulatorType, setSimulatorType] = useState<SimulatorType>("VALOR");

  const [valueCredit, setValueCredit] = useState(0);
  const [quotaCredit, setQuotaCredit] = useState(0);

  const [type, setType] = useState<string>("Crédito hipotecario");
  const [inputValue, setInputValue] = useState<string>(price.toString());
  const [maxPercentage, setMaxPercentage] = useState(70);
  const [percentage, setPercentage] = useState(70);
  const [date, setDate] = useState<Date>();
  const [years, setYears] = useState(15);

  const [quotaInputValue, setQuotaInputValue] = useState<string>("0");
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
      <section className="flex flex-col gap-6">
        <SelectSimulatorType
          setSimulatorType={setSimulatorType}
          simulatorType={simulatorType}
        />
        <div className="flex flex-col md:flex-row gap-12 justify-between lg:h-[488px] mb-4">
          {simulatorType === "VALOR" ? (
            <ValueSimulator
              onReset={() => setValueCredit(0)}
              onSimulate={() => {
                setValueCredit(0);

                setTimeout(() => {
                  const monthlyInterestRate =
                    Math.pow(1 + VALUE_EFFECTIVE_ANNUAL_INTEREST, 1 / 12) - 1;
                  const amountFunded =
                    parseInt(inputValue) * (percentage / 100);
                  const monthsFunding = years * 12;

                  const fixedQuota =
                    (amountFunded *
                      monthlyInterestRate *
                      Math.pow(1 + monthlyInterestRate, monthsFunding)) /
                    (Math.pow(1 + monthlyInterestRate, monthsFunding) - 1);

                  const insurance = fixedQuota * INSURANCE;
                  const totalQuota = fixedQuota + insurance;

                  setValueCredit(totalQuota);
                }, 0);
              }}
            />
          ) : null}
          {simulatorType === "CUOTA" ? (
            <FeeSimulator
              onReset={() => setQuotaCredit(0)}
              onSimulate={() => {
                setQuotaCredit(0);

                setTimeout(() => {
                  const monthlyInterestRate =
                    Math.pow(1 + QUOTA_EFFECTIVE_ANNUAL_INTEREST, 1 / 12) - 1;
                  const monthsFunding = quotaYears * 12;

                  const amountFunded =
                    parseInt(quotaInputValue) *
                    ((Math.pow(1 + monthlyInterestRate, monthsFunding) - 1) /
                      (monthlyInterestRate *
                        Math.pow(1 + monthlyInterestRate, monthsFunding)));

                  setQuotaCredit(amountFunded);
                }, 0);
              }}
            />
          ) : null}
          <article
            key={simulatorType}
            className="flex-1 flex justify-center items-center animate-blurred-fade-in"
          >
            <SimulatorResult
              value={simulatorType === "VALOR" ? valueCredit : quotaCredit}
              ea={
                simulatorType === "VALOR"
                  ? VALUE_EFFECTIVE_ANNUAL_INTEREST
                  : QUOTA_EFFECTIVE_ANNUAL_INTEREST
              }
              type={simulatorType}
            />
          </article>
        </div>
        <Typography>
          Los resultados de este simulador son aproximaciones con fines
          informativos, los valores reales se establecerán con la entidad
          financiera en el momento del desembolso*
        </Typography>
      </section>
    </CreditSimuladorContext.Provider>
  );
};
