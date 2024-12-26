import { PRE_REGISTRATION_COOKIE_NAME } from "@/constants/pre-registration";
import { supabase } from "@/services/supabase/supabase";
import { NextRequest } from "next/server";

import * as yup from "yup";

/**
 * Handle pre-registration cookie.
 *
 * This middleware checks for a pre-registration cookie and logs the user in if the cookie is valid.
 * If the cookie is invalid, it is deleted.
 */
export async function handlePreRegistration(request: NextRequest) {
  try {
    const preRegistrationCookie = request.cookies.get(
      PRE_REGISTRATION_COOKIE_NAME
    );

    if (!preRegistrationCookie) {
      return;
    }

    const parsedPreRegistration = JSON.parse(preRegistrationCookie.value);

    const preRegistration = await schema.validate(parsedPreRegistration);

    const { data: user, error } = await supabase
      .from("users")
      .select("id")
      .eq("id", preRegistration.id)
      .eq("email", preRegistration.email)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!user) {
      throw new Error("User not found");
    }
  } catch (error) {
    request.cookies.delete(PRE_REGISTRATION_COOKIE_NAME);
  }
}

const schema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  nickname: yup.string().nullable().defined(),
});
