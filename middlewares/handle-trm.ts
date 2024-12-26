import { TRM_COOKIE_NAME } from "@/constants/trm";
import { supabase } from "@/services/supabase/supabase";
import { TRMCookie } from "@/services/get-trm";
import { NextRequest } from "next/server";

import * as yup from "yup";

const ONE_HOUR = 1000 * 60 * 60;

/**
 * Middleware to handle TRM (Exchange Rate) cookie validation and update.
 *
 * @param {NextRequest} request - The incoming request object containing cookies.
 *
 * This function checks if the TRM cookie exists in the request. If it does not exist,
 * it fetches the TRM data from Supabase and sets a new TRM cookie. If the cookie exists,
 * it parses and validates the TRM data. If the TRM data is stale (older than one hour),
 * it fetches the updated TRM data from Supabase and updates the cookie.
 *
 * In case of any errors during the process, it fetches the TRM data from Supabase and
 * sets a new TRM cookie.
 */

export async function handleTRM(request: NextRequest) {
  try {
    const trmCookie = request.cookies.get(TRM_COOKIE_NAME);

    if (!trmCookie) {
      const newTrm = await fetchTRMFromSupabase();

      request.cookies.set(TRM_COOKIE_NAME, JSON.stringify(newTrm));

      return;
    }

    const parsedTRM = JSON.parse(trmCookie.value);

    const trm = await schema.validate(parsedTRM);

    if (trm.last_trm_update > Date.now() - ONE_HOUR) {
      // TRM Stale
      return;
    }

    const newTrm = await fetchTRMFromSupabase();

    request.cookies.set(TRM_COOKIE_NAME, JSON.stringify(newTrm));
  } catch (error) {
    const newTrm = await fetchTRMFromSupabase();

    request.cookies.set(TRM_COOKIE_NAME, JSON.stringify(newTrm));
  }
}

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

const schema = yup.object().shape({
  TRM_EUR: yup.number().required(),
  TRM_USD: yup.number().required(),
  last_trm_update: yup.number().required(),
});
