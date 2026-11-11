"use client";

import { CreditRates, DEFAULT_CREDIT_RATES } from "@/lib/credit-rates";
import { createContext, PropsWithChildren, useContext } from "react";

// Defaults, so a tree without the provider still simulates with the known rates.
const CreditRatesContext = createContext<CreditRates>(DEFAULT_CREDIT_RATES);

export type CreditRatesProviderProps = PropsWithChildren<{
  rates: CreditRates;
}>;

export const CreditRatesProvider = ({
  rates,
  children,
}: CreditRatesProviderProps) => (
  <CreditRatesContext.Provider value={rates}>
    {children}
  </CreditRatesContext.Provider>
);

export function useCreditRates(): CreditRates {
  return useContext(CreditRatesContext);
}
