import { TRM_COOKIE_NAME } from "@/constants/trm";
import { supabase } from "@/services/supabase";
import { cookies } from "next/headers";

const ONE_HOUR = 1000 * 60 * 60;

export type TRMCookie = {
  TRM_EUR: number;
  TRM_USD: number;
  last_trm_update: number;
};

export const getTRM = async (): Promise<TRMCookie> => {
  const cookieStore = cookies();

  try {
    const rawTRM = cookieStore.get(TRM_COOKIE_NAME)?.value;

    if (rawTRM) {
      const trm = JSON.parse(rawTRM) as TRMCookie;

      if (trm.last_trm_update > Date.now() - ONE_HOUR) {
        return trm;
      }
    }

    // Fetch from Supabase if the cookie is stale or doesn't exist
    return await fetchTRMFromSupabase();
  } catch {
    // Handle cookie parsing errors
    return await fetchTRMFromSupabase();
  }
};

const fetchTRMFromSupabase = async (): Promise<TRMCookie> => {
  const response = await supabase.functions.invoke("get-trm");
  const data = response.data.data;

  if (!data || response.error) {
    return {
      TRM_EUR: 0,
      TRM_USD: 0,
      last_trm_update: 0,
    };
  }

  return {
    TRM_EUR: Number(data.EUR),
    TRM_USD: Number(data.USD),
    last_trm_update: Date.now(),
  };
};
