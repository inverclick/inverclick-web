import { PRE_REGISTRATION_COOKIE_NAME } from "@/constants/pre-registration";
import { ENV_VARS } from "@/global/env";
import { getContextFromSupabaseFunctionError } from "@/lib/get-context-from-supabase-function-error";
import { createClient } from "@/services/supabase/server-client";
import { APIResponse, EmptyAPIResponse } from "@/types/api";
import { PreRegistration, PreRegistrationBody } from "@/types/pre-registration";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const cookieStore = cookies();

  const preRegistrationBody = (await request.json()) as PreRegistrationBody & {
    captchaToken: string;
  };

  const verifyCaptchaResponse = await verifyCaptcha(
    preRegistrationBody.captchaToken
  );

  if (!verifyCaptchaResponse.success) {
    const response: EmptyAPIResponse = {
      success: false,
      message: `Error verifying captcha: ${verifyCaptchaResponse[
        "error-codes"
      ].join(", ")}`,
      code: null,
    };

    return Response.json(response, { status: 400 });
  }

  const { data: preRegistration, error: preRegisterUserError } =
    await supabase.functions.invoke<APIResponse<PreRegistration>>(
      "pre-register-user",
      {
        body: JSON.stringify({
          name: preRegistrationBody.name,
          email: preRegistrationBody.email,
          phone: preRegistrationBody.phone,
          nickname: preRegistrationBody.nickname,
        }),
      }
    );

  if (preRegisterUserError || !preRegistration) {
    const error =
      await getContextFromSupabaseFunctionError(preRegisterUserError);

    const response: EmptyAPIResponse = {
      success: error.success,
      message: error.message,
      code: error.code,
    };

    return Response.json(response, { status: 400 });
  }

  setPreRegistrationCookie(cookieStore, preRegistration.data);

  return Response.json(preRegistration.data);
}

async function verifyCaptcha(captchaToken: string): Promise<{
  success: boolean;
  "error-codes": string[];
}> {
  const verifyURL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  const response = await fetch(verifyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      secret: ENV_VARS.TURNSTILE_SECRET_KEY,
      response: captchaToken,
    }),
  });

  return response.json();
}

function setPreRegistrationCookie(
  cookieStore: ReadonlyRequestCookies,
  preRegistration: PreRegistration
) {
  cookieStore.set(
    PRE_REGISTRATION_COOKIE_NAME,
    JSON.stringify(preRegistration)
  );
}
