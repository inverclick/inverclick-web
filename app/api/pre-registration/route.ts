import { PRE_REGISTRATION_COOKIE_NAME } from "@/constants/pre-registration";
import { ENV_VARS } from "@/global/env";
import { supabase } from "@/services/supabase";
import { APIResponse, EmptyAPIResponse } from "@/types/api";
import {
  PreRegistration,
  PreRegistrationValues,
} from "@/types/pre-registration";
import { User } from "@/types/user";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();

  const { name, email, captchaToken } =
    (await request.json()) as PreRegistrationValues & { captchaToken: string };

  // Validar el token de captcha
  const captchaResponse = await verifyCaptcha(captchaToken);
  if (!captchaResponse.success) {
    const response: EmptyAPIResponse = {
      success: false,
      message: captchaResponse["error-codes"] as string,
    };

    return Response.json(response, { status: 400 });
  }

  // Verificar si el usuario ya está pre-registrado
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (user) return handleExistingUser(user, email, cookieStore);

  return handleNewUser(name, email, cookieStore);
}

async function verifyCaptcha(captchaToken: string): Promise<{
  [key: string]: unknown;
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

async function handleExistingUser(
  user: User,
  email: string,
  cookieStore: ReadonlyRequestCookies
): Promise<Response> {
  if (user.is_confirmed) {
    const response: EmptyAPIResponse = {
      success: true,
      message: "Parece que ya estas registrado, intenta iniciar sesión",
    };

    return Response.json(response, { status: 303 });
  }

  const { error: sendEmailError } = await supabase.functions.invoke(
    "send-email",
    {
      body: {
        to: email,
        subject: "Continúa con tu proceso de registro en Inverclick",
        body: `<p>Completa tu registro en el siguiente enlace: <a href='/onboarding'>Completa tu registro</a></p>`,
      },
    }
  );

  if (sendEmailError) {
    const response: EmptyAPIResponse = {
      success: false,
      message: "Error al enviar el correo",
    };

    return Response.json(response, { status: 400 });
  }

  setPreRegistrationCookie(cookieStore, {
    id: user.id,
    name: user.name,
    email: user.email,
  });

  const response: APIResponse<PreRegistration> = {
    success: true,
    message: "",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };

  return Response.json(response);
}

async function handleNewUser(
  name: string,
  email: string,
  cookieStore: ReadonlyRequestCookies
): Promise<Response> {
  const { data: insertedUser, error: insertUserError } = await supabase
    .from("users")
    .insert({
      name,
      email,
      role: "LEAD",
      is_confirmed: false,
    })
    .select("*")
    .single();

  if (!insertedUser || insertUserError) {
    const response: EmptyAPIResponse = {
      success: false,
      message: "Error al crear/obtener usuario",
    };

    return Response.json(response, { status: 400 });
  }

  const { error: insertLeadError } = await supabase.from("leads").insert({
    user_id: insertedUser.id,
  });

  if (insertLeadError) {
    const response: EmptyAPIResponse = {
      success: false,
      message: "Error al crear/obtener lead",
    };

    return Response.json(response, { status: 400 });
  }

  const { error: sendEmailError } = await supabase.functions.invoke(
    "send-email",
    {
      body: {
        to: email,
        subject: "Continúa con tu proceso de registro en Inverclick",
        body: `<p>Completa tu registro en el siguiente enlace: <a href='/onboarding'>Completa tu registro</a></p>`,
      },
    }
  );

  if (sendEmailError) {
    const response: EmptyAPIResponse = {
      success: false,
      message: "Error al enviar el correo",
    };

    return Response.json(response, { status: 400 });
  }

  setPreRegistrationCookie(cookieStore, {
    id: insertedUser.id,
    name: insertedUser.name,
    email: insertedUser.email,
  });

  const response: APIResponse<PreRegistration> = {
    success: true,
    message: "",
    data: {
      id: insertedUser.id,
      name: insertedUser.name,
      email: insertedUser.email,
    },
  };

  return Response.json(response);
}

function setPreRegistrationCookie(
  cookieStore: ReadonlyRequestCookies,
  preRegistration: PreRegistration
) {
  cookieStore.set(
    PRE_REGISTRATION_COOKIE_NAME,
    JSON.stringify({
      id: preRegistration.id,
      name: preRegistration.name,
      email: preRegistration.email,
    } as PreRegistration)
  );
}
