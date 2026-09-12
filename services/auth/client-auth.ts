import { Database } from "@/types/database";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Single source of truth for the client (end user) authentication data flow.
 *
 * Every entry point — the "Ver información" pre-registration dialog, /auth/sign-up
 * and /auth/sign-in — funnels through these helpers so the three flows behave
 * identically no matter which UI the user came from:
 *
 * 1. Unregistered user + registration form -> `registerClient` (no OTP).
 * 2. Registered user + registration form   -> `sendSignInOtp` + `verifyEmailOtp`.
 * 3. Registered user + /auth/sign-in       -> `sendSignInOtp` + `verifyEmailOtp`.
 *
 * Registration never verifies the email, so `user_clients.is_email_confirmed`
 * starts as `false` and is flipped to `true` the first time the user completes
 * an OTP challenge (sign-in, or the "Validar correo" dialog in the profile menu).
 */

export type ClientRecord = {
  userId: string;
  name: string;
  email: string;
  isEmailConfirmed: boolean;
};

export type RegisterClientParams = {
  email: string;
  fullName: string;
  phone: string;
};

/** Outcome of a registration attempt against an unknown email. */
export type RegisterClientResult =
  | { status: "registered"; client: ClientRecord }
  /**
   * The email already exists in `auth.users` even though it had no
   * `user_clients` row (an admin or company account, or a half-finished
   * registration). We cannot silently sign them in, so the caller must fall
   * back to the OTP challenge.
   */
  | { status: "requires-otp" };

/**
 * Looks up a client by email. A user only counts as a registered client when
 * they have a row in `user_clients`; an account that only exists in `users`
 * (team/company members) is not a client of the web portal.
 */
export const findClientByEmail = async (
  supabase: SupabaseClient<Database>,
  email: string
): Promise<ClientRecord | null> => {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, user_clients!inner(user_id, is_email_confirmed)")
    .eq("email", normalizeEmail(email))
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return {
    userId: data.id,
    name: data.name,
    email: data.email,
    isEmailConfirmed: Boolean(data.user_clients?.is_email_confirmed),
  };
};

/**
 * Sends a 6-digit OTP to an account that already exists. `shouldCreateUser` is
 * always false: creating accounts is `registerClient`'s job.
 */
export const sendSignInOtp = async (
  supabase: SupabaseClient<Database>,
  email: string
) => {
  const { error } = await supabase.auth.signInWithOtp({
    email: normalizeEmail(email),
    options: { shouldCreateUser: false },
  });

  if (error) {
    throw error;
  }
};

/**
 * Creates a brand-new client account and leaves the user signed in, with no OTP
 * step. The project has `mailer_autoconfirm` enabled, so `signUp` returns a
 * usable session straight away.
 *
 * The password is random and never shown: sign-in is OTP-only, so nothing reads
 * it back. It exists purely because Supabase requires one for email sign-up.
 */
export const registerClient = async (
  supabase: SupabaseClient<Database>,
  { email, fullName, phone }: RegisterClientParams
): Promise<RegisterClientResult> => {
  const normalizedEmail = normalizeEmail(email);
  const { firstNames, lastNames } = splitFullName(fullName);

  const { data, error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password: generateRandomPassword(),
    options: {
      data: {
        first_names: firstNames,
        last_names: lastNames,
        full_name: fullName,
      },
    },
  });

  if (error) {
    // Supabase reports an existing account either as an explicit error or as an
    // obfuscated user with no session (anti-enumeration). Both mean the same
    // thing for us: hand the caller back to the OTP path.
    if (isExistingAccountError(error)) {
      return { status: "requires-otp" };
    }

    throw error;
  }

  if (!data.session) {
    return { status: "requires-otp" };
  }

  const client = await provisionClientProfile(supabase, {
    fullName,
    phone,
    isEmailConfirmed: false,
  });

  return { status: "registered", client };
};

export type VerifyEmailOtpParams = {
  email: string;
  code: string;
  /**
   * Profile data to persist once the code checks out. Present when the user
   * came from a registration form (flow 2) and absent on plain sign-in.
   */
  profile?: { fullName: string; phone: string };
};

/**
 * Verifies a 6-digit code and marks the email as confirmed. Completing an OTP
 * challenge *is* proof of ownership, so this is the moment the flag flips.
 */
export const verifyEmailOtp = async (
  supabase: SupabaseClient<Database>,
  { email, code, profile }: VerifyEmailOtpParams
): Promise<ClientRecord> => {
  const normalizedEmail = normalizeEmail(email);

  const { error } = await supabase.auth.verifyOtp({
    email: normalizedEmail,
    token: code,
    type: "email",
  });

  if (error) {
    throw error;
  }

  return provisionClientProfile(supabase, {
    fullName: profile?.fullName,
    phone: profile?.phone,
    isEmailConfirmed: true,
  });
};

type ProvisionClientProfileParams = {
  fullName?: string;
  phone?: string;
  isEmailConfirmed: boolean;
};

/**
 * Makes sure the signed-in auth user is fully represented as a client: a row in
 * `users`, a row in `user_clients`, and the name in `user_metadata`.
 *
 * Runs after both registration and OTP verification so an account can never end
 * up in auth without its public-schema counterpart.
 */
const provisionClientProfile = async (
  supabase: SupabaseClient<Database>,
  { fullName, phone, isEmailConfirmed }: ProvisionClientProfileParams
): Promise<ClientRecord> => {
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    throw new Error("No se pudo obtener el usuario autenticado");
  }

  const metadataName = authUser.user_metadata?.full_name as string | undefined;
  const email = authUser.email ?? "";
  const name = fullName?.trim() || metadataName?.trim() || email;

  if (fullName) {
    const { firstNames, lastNames } = splitFullName(fullName);

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
  }

  const { error: upsertUserError } = await supabase
    .from("users")
    .upsert({ id: authUser.id, email, name }, { onConflict: "id" });

  if (upsertUserError) {
    throw upsertUserError;
  }

  // `phone` is only sent when the user filled a registration form. On a plain
  // sign-in we must not overwrite the stored number with an empty value.
  const { error: upsertClientError } = await supabase
    .from("user_clients")
    .upsert(
      {
        user_id: authUser.id,
        is_email_confirmed: isEmailConfirmed,
        ...(phone ? { phone } : {}),
      },
      { onConflict: "user_id" }
    );

  if (upsertClientError) {
    throw upsertClientError;
  }

  return {
    userId: authUser.id,
    name,
    email,
    isEmailConfirmed,
  };
};

/**
 * Flips `is_email_confirmed` for the signed-in user. Used by the "Validar
 * correo" dialog, which runs while a session already exists.
 */
export const markEmailAsConfirmed = async (
  supabase: SupabaseClient<Database>,
  userId: string
) => {
  const { error } = await supabase
    .from("user_clients")
    .update({ is_email_confirmed: true })
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
};

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

/**
 * The forms collect a single "Nombre completo" field, but auth metadata keeps
 * names and surnames apart. First word is the name, the rest are surnames.
 */
export const splitFullName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length <= 1) {
    return { firstNames: parts[0] ?? "", lastNames: "" };
  }

  const half = Math.ceil(parts.length / 2);

  return {
    firstNames: parts.slice(0, half).join(" "),
    lastNames: parts.slice(half).join(" "),
  };
};

const generateRandomPassword = () => {
  const bytes = new Uint8Array(24);

  crypto.getRandomValues(bytes);

  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
};

const isExistingAccountError = (error: unknown) => {
  const { code, message } = getAuthErrorDetails(error);

  return (
    code.includes("user_already_exists") ||
    code.includes("email_exists") ||
    message.includes("already registered") ||
    message.includes("already been registered") ||
    message.includes("user already")
  );
};

/**
 * True when Supabase refused to send an OTP because the account does not exist.
 */
export const isMissingAccountError = (error: unknown) => {
  const { code, message } = getAuthErrorDetails(error);

  return (
    code.includes("signup") ||
    code.includes("user_not_found") ||
    message.includes("signup") ||
    message.includes("signups") ||
    message.includes("user not found") ||
    message.includes("not found")
  );
};

export type AuthAction = "send" | "verify" | "register" | "profile";

export const getAuthErrorMessage = (error: unknown, action: AuthAction) => {
  const { message } = getAuthErrorDetails(error);

  if (message.includes("rate") || message.includes("60")) {
    return "Espera un momento antes de solicitar otro código";
  }

  if (action === "verify") {
    return "El código no es válido o ya expiró";
  }

  if (action === "register") {
    return "No pudimos crear tu cuenta. Inténtalo de nuevo";
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
      code: (typeof maybeError.code === "string"
        ? maybeError.code
        : ""
      ).toLowerCase(),
      message: (typeof maybeError.message === "string"
        ? maybeError.message
        : String(error)
      ).toLowerCase(),
    };
  }

  return { code: "", message: String(error).toLowerCase() };
};
