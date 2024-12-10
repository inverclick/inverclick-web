import { createJSONStorage, persist } from "zustand/middleware";
import { supabase } from "@/services/supabase";
import { create } from "zustand";

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

          const response = await supabase.functions.invoke('get-trm');
          const data = response.data.data;

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
