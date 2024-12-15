import { PRE_REGISTRATION_COOKIE_NAME } from "@/constants/pre-registration";
import { PreRegistration } from "@/types/pre-registration";
import { cookies } from "next/headers";

/**
 * Returns the pre-registration data from the cookies, if it exists. Otherwise, returns null.
 *
 * @returns The pre-registration data or null if it doesn't exist.
 */
export function getPreRegistration() {
  const cookieStore = cookies();

  let preRegistration: PreRegistration | null = null;

  const rawPreRegistration = cookieStore.get(
    PRE_REGISTRATION_COOKIE_NAME
  )?.value;

  if (rawPreRegistration) {
    preRegistration = JSON.parse(rawPreRegistration);
  }

  return preRegistration;
}
