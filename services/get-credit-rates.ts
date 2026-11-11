import {
  CREDIT_RATE_KEY_LIST,
  CreditRates,
  DEFAULT_CREDIT_RATES,
  parseCreditRates,
} from "@/lib/credit-rates";
import { supabase } from "@/services/supabase/supabase";
import { unstable_cache } from "next/cache";

const FIVE_MINUTES_IN_SECONDS = 5 * 60;
const REQUEST_TIMEOUT_MS = 3_000;

/** Reads the simulator rates from `app_config` (public read, anon key). */
async function fetchCreditRates(): Promise<CreditRates> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const { data, error } = await supabase
      .from("app_config")
      .select("key, value")
      .in("key", CREDIT_RATE_KEY_LIST)
      .abortSignal(controller.signal);

    // Throw instead of returning defaults, so a failure is never cached.
    if (error) throw error;

    return parseCreditRates(data);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * One set of rates for every visitor, kept in the Next data cache. A change
 * made in the database shows up within five minutes.
 */
const getCachedCreditRates = unstable_cache(fetchCreditRates, ["credit-rates"], {
  revalidate: FIVE_MINUTES_IN_SECONDS,
  tags: ["credit-rates"],
});

/**
 * The simulator rates. Never throws: if the table is missing, has no rows yet
 * or the request fails, the previous hardcoded rates are used.
 */
export async function getCreditRates(): Promise<CreditRates> {
  try {
    return await getCachedCreditRates();
  } catch {
    return DEFAULT_CREDIT_RATES;
  }
}
