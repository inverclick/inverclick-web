import { supabase } from "@/services/supabase";
import {
  PreRegistration,
  PreRegistrationValues,
} from "@/types/pre-registration";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { name, email, captchaToken } = (await request.json()) as PreRegistrationValues & { captchaToken: string };

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  const verifyURL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  let preRegistration: PreRegistration | null = null;

  // Validar el token de captcha
  const response = await fetch(verifyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      secret: secretKey,
      response: captchaToken,
    }),
  });

  const captchaResponse = await response.json();

  if (!captchaResponse.success) { 
    return Response.json({ success: false, message: captchaResponse["error-codes"] }, { status: 400 });
  }

  const { data: existingPreRegistration } = await supabase
    .from("pre_registrations")
    .select("*")
    .eq("email", email)
    .single();

  if (!existingPreRegistration) {
    const { data } = await supabase
      .from("pre_registrations")
      .insert({
        name,
        email,
      })
      .select("*")
      .single();

    preRegistration = data;
  }

  if (existingPreRegistration) {
    const { data } = await supabase
      .from("pre_registrations")
      .update({
        name,
      })
      .eq("email", email)
      .select("*")
      .single();

    preRegistration = data;
  }

  const cookieStore = cookies();
  cookieStore.set("pre-registration", JSON.stringify(preRegistration));

  return Response.json(preRegistration, { status: 200 });
}
