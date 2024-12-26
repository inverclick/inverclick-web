import { PRE_REGISTRATION_COOKIE_NAME } from "@/constants/pre-registration";
import { PreRegistration } from "@/types/pre-registration";
import { cookies } from "next/headers";

export async function getPreRegistration(): Promise<PreRegistration | null> {
  // Cookie validated in middleware

  const cookieStore = cookies();

  const preRegistrationCookie = cookieStore.get(PRE_REGISTRATION_COOKIE_NAME);

  if (!preRegistrationCookie) {
    return null;
  }

  const preRegistration = JSON.parse(preRegistrationCookie.value);

  return preRegistration;
}
