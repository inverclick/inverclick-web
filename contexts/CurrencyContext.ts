import { ENV_VARS } from "@/global/env";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Currency = "USD" | "EUR" | "COP";

interface CurrencyContext {
  TRM_EUR: number;
  TRM_USD: number;
  last_trm_update: number;
  currency: Currency;

  loadTRM: () => Promise<void>;
  convert: (amount: number) => number;
  changeCurrency: (currency: Currency) => void;
}

export const useCurrencyContext = create(
  persist<CurrencyContext>(
    (set, get) => ({
      TRM_EUR: 0,
      TRM_USD: 0,
      last_trm_update: 0,
      currency: "USD",

      loadTRM: async () => {
        try {
          const last_trm_update = get().last_trm_update;

          if (Date.now() - last_trm_update < 1000 * 60) return;

          const response = await fetch(ENV_VARS.API + "/utils/trm");
          const responseData = await response.json();
          const { data } = responseData;

          set(() => ({
            TRM_EUR: Number(data.EUR),
            TRM_USD: Number(data.USD),
            last_trm_update: Date.now(),
          }));
        } catch (error: any) {
          console.error(error.message);
          set(() => ({ TRM_EUR: 0, TRM_USD: 0 }));
        }
      },
      convert: (amount) => {
        const to = get().currency;
        if (to === "COP") return amount;
        return amount / get()[`TRM_${to}`];
      },
      changeCurrency: (currency) => set(() => ({ currency })),
    }),
    {
      name: "inverclick-trm",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
