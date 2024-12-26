import { getUser, User } from "@/app/api/pre-registration/services/get-user";
import { PRE_REGISTRATION_COOKIE_NAME } from "@/constants/pre-registration";
import { getOnboardingEmailTemplate } from "@/emails/get-onboarding-email-template";
import { ENV_VARS } from "@/global/env";
import { supabase } from "@/services/supabase/supabase";
import { APIResponse, EmptyAPIResponse } from "@/types/api";
import { PreRegistration, PreRegistrationBody } from "@/types/pre-registration";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();

  const body = (await request.json()) as PreRegistrationBody & {
    captchaToken: string;
  };

  // Validar el token de captcha
  const captchaResponse = await verifyCaptcha(body.captchaToken);
  if (!captchaResponse.success) {
    const response: EmptyAPIResponse = {
      success: false,
      message: captchaResponse["error-codes"] as string,
    };

    return Response.json(response, { status: 400 });
  }

  // Verificar si el usuario ya está pre-registrado
  const { data: user } = await getUser({ email: body.email });

  if (!user) return handleNewUser(body, cookieStore);

  return handleExistingUser(user, body, cookieStore);
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

/**
 * Handles the case where an existing user is pre-registered.
 *
 * @param {User} user - The existing user object containing user details.
 * @param {ReadonlyRequestCookies} cookieStore - The request cookies for managing sessions.
 * @returns {Promise<Response>} A promise that resolves to a Response object indicating the result.
 *
 * If the user is confirmed, returns a response with a success message and a 303 status.
 * Otherwise, attempts to send a continuation email and update user and lead information in the database.
 * If email sending fails, returns a response with an error message and a 400 status.
 * If database updates fail, returns a response with an error message and a 400 status.
 * On successful updates, sets a pre-registration cookie and returns a success response with user data.
 */

async function handleExistingUser(
  user: User,
  body: PreRegistrationBody,
  cookieStore: ReadonlyRequestCookies
): Promise<Response> {
  const { email } = user;

  if (user.is_confirmed) {
    const response: EmptyAPIResponse = {
      success: true,
      message: "Parece que ya estás registrado, intenta iniciar sesión",
    };

    return Response.json(response, { status: 303 });
  }

  const { error: sendEmailError } = await sendOnboardingEmail({
    to: email,
    userId: user.id,
  });

  if (sendEmailError) {
    const response: EmptyAPIResponse = {
      success: false,
      message: "Error al enviar el correo",
    };

    return Response.json(response, { status: 400 });
  }

  const { data: updatedUser, error: updateUserError } = await supabase
    .from("users")
    .update({
      name: body.name,
    })
    .eq("id", user.id)
    .select("*")
    .single();

  if (!updatedUser || updateUserError) {
    const response: EmptyAPIResponse = {
      success: false,
      message: "Error al actualizar usuario",
    };

    return Response.json(response, { status: 400 });
  }

  const { data: updatedLead, error: updateLeadError } = await supabase
    .from("leads")
    .update({
      phone: body.phone,
      nickname: body.nickname,
    })
    .eq("user_id", user.id)
    .select("*")
    .single();

  if (!updatedLead || updateLeadError) {
    const response: EmptyAPIResponse = {
      success: false,
      message: "Error al actualizar lead",
    };

    return Response.json(response, { status: 400 });
  }

  const preRegistration: PreRegistration = {
    id: user.id,
    name: updatedUser.name,
    email: user.email,
    nickname: updatedLead.nickname,
  };

  setPreRegistrationCookie(cookieStore, preRegistration);

  const response: APIResponse<PreRegistration> = {
    success: true,
    message: "",
    data: preRegistration,
  };

  return Response.json(response);
}

/**
 * Handles the case where a new user is pre-registered.
 *
 * @param {PreRegistrationBody} body - The user object containing user details.
 * @param {ReadonlyRequestCookies} cookieStore - The request cookies for managing sessions.
 * @returns {Promise<Response>} A promise that resolves to a Response object indicating the result.
 *
 * If the user is inserted successfully, attempts to send a continuation email and update user and lead information in the database.
 * If email sending fails, returns a response with an error message and a 400 status.
 * If database updates fail, returns a response with an error message and a 400 status.
 * On successful updates, sets a pre-registration cookie and returns a success response with user data.
 */
async function handleNewUser(
  body: PreRegistrationBody,
  cookieStore: ReadonlyRequestCookies
): Promise<Response> {
  const { name, email, phone, nickname } = body;

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

  const { data: insertedLead, error: insertLeadError } = await supabase
    .from("leads")
    .insert({
      user_id: insertedUser.id,
      phone,
      nickname,
    })
    .select("*")
    .single();

  if (!insertedLead || insertLeadError) {
    const response: EmptyAPIResponse = {
      success: false,
      message: "Error al crear/obtener lead",
    };

    return Response.json(response, { status: 400 });
  }

  const { error: sendEmailError } = await sendOnboardingEmail({
    to: email,
    userId: insertedUser.id,
  });

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
    nickname: insertedLead.nickname,
  });

  const response: APIResponse<PreRegistration> = {
    success: true,
    message: "",
    data: {
      id: insertedUser.id,
      name: insertedUser.name,
      email: insertedUser.email,
      nickname: insertedLead.nickname,
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
    JSON.stringify(preRegistration)
  );
}

function sendOnboardingEmail({ to, userId }: { to: string; userId: string }) {
  return supabase.functions.invoke("send-email", {
    body: getOnboardingEmailTemplate({ to, userId }),
  });
}
