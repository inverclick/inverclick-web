import { TRM_COOKIE_NAME } from "@/constants/trm";
import { supabase } from "@/services/supabase/supabase";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";

export type TRMCookie = {
  TRM_EUR: number;
  TRM_USD: number;
  last_trm_update: number;
};

const ONE_HOUR_IN_SECONDS = 60 * 60;

/** Asks the `get-trm` edge function, which proxies an external exchange-rate API. */
async function fetchTRM(): Promise<TRMCookie> {
  const { data, error } = await supabase.functions.invoke("get-trm");
  const rates = data?.data;
  const usd = Number(rates?.USD);
  const eur = Number(rates?.EUR);

  // Throw instead of returning zeros, so a failure is never cached.
  if (error || !(usd > 0) || !(eur > 0)) {
    throw new Error("The exchange rate service did not return valid rates");
  }

  return { TRM_USD: usd, TRM_EUR: eur, last_trm_update: Date.now() };
}

/**
 * One exchange rate for every visitor, kept in the Next data cache. After an
 * hour the stale value is still served and refreshed in the background, so no
 * page load waits for the external API (it used to block every new visitor in
 * the middleware).
 */
const getCachedTRM = unstable_cache(fetchTRM, ["trm"], {
  revalidate: ONE_HOUR_IN_SECONDS,
  tags: ["trm"],
});

const NO_TRM: TRMCookie = { TRM_EUR: 0, TRM_USD: 0, last_trm_update: 0 };

export async function getTRM(): Promise<TRMCookie> {
  try {
    return await getCachedTRM();
  } catch {
    // Service down and nothing cached yet: use the rates this browser saw last
    // time (the client keeps them in a cookie), or none.
    const cookie = cookies().get(TRM_COOKIE_NAME);
    if (!cookie) return NO_TRM;
    try {
      const saved = JSON.parse(cookie.value) as Partial<TRMCookie>;
      return {
        TRM_USD: Number(saved.TRM_USD) || 0,
        TRM_EUR: Number(saved.TRM_EUR) || 0,
        last_trm_update: Number(saved.last_trm_update) || 0,
      };
    } catch {
      return NO_TRM;
    }
  }
}
