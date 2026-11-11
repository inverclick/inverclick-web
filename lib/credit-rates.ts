/** Rates of one simulation mode, as fractions (0.1645 = 16.45 %). */
export type ModeRates = {
  /** Effective annual rate (E.A.). */
  ea: number;
  /** Monthly periodic rate equivalent to the E.A. (N.M.V.): (1 + ea)^(1/12) - 1. */
  nmv: number;
};

/** `value`: simulate from the home's value. `quota`: from the monthly quota. */
export type CreditRates = {
  value: ModeRates;
  quota: ModeRates;
};

/** `app_config` keys that hold the simulator rates. */
export const CREDIT_RATE_KEYS = {
  value: { ea: "app_credit_ea_by_value", nmv: "app_credit_nmv_by_value" },
  quota: { ea: "app_credit_ea_by_quota", nmv: "app_credit_nmv_by_quota" },
} as const;

export const CREDIT_RATE_KEY_LIST: string[] = [
  CREDIT_RATE_KEYS.value.ea,
  CREDIT_RATE_KEYS.value.nmv,
  CREDIT_RATE_KEYS.quota.ea,
  CREDIT_RATE_KEYS.quota.nmv,
];

/**
 * The rates the simulator used before they moved to the database. They are
 * used when `app_config` is unreachable or does not have the rows yet, so the
 * simulator never stops working.
 */
export const DEFAULT_CREDIT_RATES: CreditRates = {
  value: { ea: 0.1645, nmv: 0.012771856489323164 },
  quota: { ea: 0.11, nmv: 0.008734593823551902 },
};

// Same format the database enforces (app_config_credit_rate_format): a decimal
// fraction below 1, never a percentage ("16.45") or a comma ("0,1645").
const RATE_FORMAT = /^0\.[0-9]{1,18}$/;

function parseRate(raw: string | undefined): number | null {
  if (typeof raw !== "string" || !RATE_FORMAT.test(raw)) return null;
  const rate = Number(raw);
  return Number.isFinite(rate) && rate > 0 ? rate : null;
}

/**
 * Builds the rates from `app_config` rows. A mode takes the database values
 * only when both its E.A. and its N.M.V. are valid; otherwise that mode keeps
 * its defaults, so a pair is never half old and half new.
 *
 * @param rows The `{ key, value }` rows read from `app_config`
 * @returns The rates for both modes
 */
export function parseCreditRates(
  rows: ReadonlyArray<{ key: string; value: string }> | null | undefined
): CreditRates {
  const values = new Map((rows ?? []).map((row) => [row.key, row.value]));

  const pick = (mode: keyof CreditRates): ModeRates => {
    const ea = parseRate(values.get(CREDIT_RATE_KEYS[mode].ea));
    const nmv = parseRate(values.get(CREDIT_RATE_KEYS[mode].nmv));
    return ea !== null && nmv !== null ? { ea, nmv } : DEFAULT_CREDIT_RATES[mode];
  };

  return { value: pick("value"), quota: pick("quota") };
}
