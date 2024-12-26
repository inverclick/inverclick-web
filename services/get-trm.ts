import { TRM_COOKIE_NAME } from "@/constants/trm";
import { cookies } from "next/headers";

export type TRMCookie = {
  TRM_EUR: number;
  TRM_USD: number;
  last_trm_update: number;
};

export async function getTRM(): Promise<TRMCookie> {
  // Cookie validated in middleware

  const cookieStore = cookies();

  const trmCookie = cookieStore.get(TRM_COOKIE_NAME)!;

  const trm = JSON.parse(trmCookie.value);

  return trm;
}
