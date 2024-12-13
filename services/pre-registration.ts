import { PreRegistrationData } from "@/types/pre-registration";
import { cookies } from "next/headers";

/**
 * Returns the pre-registration data from the cookies, if it exists. Otherwise, returns null.
 *
 * @returns The pre-registration data or null if it doesn't exist.
 */
export function getPreRegistration() {
  const cookieStore = cookies();

  let preRegistration: PreRegistrationData | null = null;

  if (cookieStore.has("pre-registration")) {
    const rawPreRegistration = cookieStore.get("pre-registration")?.value;

    if (rawPreRegistration) {
      preRegistration = JSON.parse(rawPreRegistration);
    }
  }

  return preRegistration;
}
