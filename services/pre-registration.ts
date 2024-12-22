import { PRE_REGISTRATION_COOKIE_NAME } from "@/constants/pre-registration";
import { supabase } from "@/services/supabase";
import { PreRegistration } from "@/types/pre-registration";
import { cookies } from "next/headers";

import * as yup from "yup";

export async function getPreRegistration(): Promise<PreRegistration | null> {
  const cookieStore = cookies();

  try {
    const cookie = cookieStore.get(PRE_REGISTRATION_COOKIE_NAME);

    if (!cookie) {
      return null;
    }

    const parsedPreRegistration = JSON.parse(cookie.value);

    const preRegistration = await schema.validate(parsedPreRegistration);

    const { data: user, error } = await supabase
      .from("users")
      .select("id")
      .eq("id", preRegistration.id)
      .eq("email", preRegistration.email)
      .single();

    if (!user || error) {
      throw new Error("User not found");
    }

    return preRegistration;
  } catch (error) {
    return null;
  }
}

const schema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
});
