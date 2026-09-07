import { Database } from "@/types/database";
import { SupabaseClient } from "@supabase/supabase-js";

export type AuthMode = "existing" | "signup";

export const sendOtp = (
  supabase: SupabaseClient<Database>,
  email: string,
  shouldCreateUser: boolean
) => {
  return supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser },
  });
};

export const isMissingExistingUserError = (error: unknown) => {
  const details = getAuthErrorDetails(error);
  const message = details.message.toLowerCase();
  const code = details.code.toLowerCase();

  return (
    code.includes("signup") ||
    code.includes("user_not_found") ||
    message.includes("signup") ||
    message.includes("signups") ||
    message.includes("user not found") ||
    message.includes("not found")
  );
};

export const getAuthErrorMessage = (
  error: unknown,
  action: "send" | "verify" | "profile"
) => {
  const details = getAuthErrorDetails(error);
  const message = details.message.toLowerCase();

  if (message.includes("rate") || message.includes("60")) {
    return "Espera un momento antes de solicitar otro código";
  }

  if (action === "verify") {
    return "El código no es válido o ya expiró";
  }

  if (action === "profile") {
    return "No pudimos guardar tus datos. Inténtalo de nuevo";
  }

  return "No pudimos enviar el código. Inténtalo de nuevo";
};

const getAuthErrorDetails = (error: unknown) => {
  if (error && typeof error === "object") {
    const maybeError = error as { code?: unknown; message?: unknown };

    return {
      code: typeof maybeError.code === "string" ? maybeError.code : "",
      message:
        typeof maybeError.message === "string"
          ? maybeError.message
          : String(error),
    };
  }

  return { code: "", message: String(error) };
};

export type CompleteClientSignUpParams = {
  email: string;
  firstNames: string;
  lastNames: string;
};

/**
 * Runs after a brand-new account verifies its OTP: saves the name to
 * user_metadata and upserts `users` + `user_clients` so the account shows up
 * as a client across the platform, not just in auth.users.
 */
export const completeClientSignUp = async (
  supabase: SupabaseClient<Database>,
  { email, firstNames, lastNames }: CompleteClientSignUpParams
) => {
  const fullName = `${firstNames} ${lastNames}`;

  const { error: updateUserError } = await supabase.auth.updateUser({
    data: {
      first_names: firstNames,
      last_names: lastNames,
      full_name: fullName,
    },
  });

  if (updateUserError) {
    throw updateUserError;
  }

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    throw new Error("No se pudo obtener el usuario autenticado");
  }

  const { error: upsertUserError } = await supabase.from("users").upsert(
    { id: authUser.id, email: authUser.email ?? email, name: fullName },
    { onConflict: "id" }
  );

  if (upsertUserError) {
    throw upsertUserError;
  }

  const { error: upsertClientError } = await supabase
    .from("user_clients")
    .upsert({ user_id: authUser.id }, { onConflict: "user_id" });

  if (upsertClientError) {
    throw upsertClientError;
  }

  return { authUser, fullName };
};
