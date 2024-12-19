"use client";

import { TRM_COOKIE_NAME } from "@/constants/trm";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from "react";
import { createStore, useStore } from "zustand";

import { TRMCookie } from "@/services/get-trm";
import Cookie from "js-cookie";

export type Currency = "USD" | "EUR" | "COP";

export type CurrencyStoreProps = {
  TRM_EUR: number;
  TRM_USD: number;
  last_trm_update: number;
  currency: Currency;
};

export type CurrencyStoreState = CurrencyStoreProps & {
  convert: (amount: number) => number;
  changeCurrency: (currency: Currency) => void;
};

export const createCurrencyStore = (props: CurrencyStoreProps) => {
  return createStore<CurrencyStoreState>()((set, get) => ({
    ...props,
    convert: (amount) => {
      const to = get().currency;
      if (to === "COP") return amount;
      return amount / get()[`TRM_${to}`];
    },
    changeCurrency: (currency) => set(() => ({ currency })),
  }));
};

export type CurrencyContextType = ReturnType<typeof createCurrencyStore>;

export const CurrencyContext = createContext({} as CurrencyContextType);

export type CurrencyProviderProps = PropsWithChildren<CurrencyStoreProps>;

export const CurrencyProvider = ({
  TRM_USD,
  TRM_EUR,
  currency,
  last_trm_update,
  children,
}: CurrencyProviderProps) => {
  const storeRef = useRef<CurrencyContextType>();

  if (!storeRef.current) {
    storeRef.current = createCurrencyStore({
      TRM_USD,
      TRM_EUR,
      currency,
      last_trm_update,
    });
  }

  useEffect(() => {
    // Set cookie with information from server
    Cookie.set(
      TRM_COOKIE_NAME,
      JSON.stringify({
        TRM_USD,
        TRM_EUR,
        last_trm_update,
      } as TRMCookie)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrencyContext.Provider value={storeRef.current}>
      {children}
    </CurrencyContext.Provider>
  );
};

export function useCurrencyContext<T>(
  selector: (state: CurrencyStoreState) => T
): T {
  const store = useContext(CurrencyContext);

  if (!store) throw new Error("Missing CurrencyContext.Provider in the tree");

  return useStore(store, selector);
}
