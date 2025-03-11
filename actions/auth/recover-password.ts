"use server";

import { PASSWORD_COULD_NOT_BE_RECOVERED } from "@/app/auth/recover-password/_constants/messages";
import { createClient } from "@/services/supabase/server-client";

export async function recoverPasswordAction({
  email,
  code,
  password,
}: {
  email: string;
  code: string;
  password: string;
}) {
  const supabase = createClient({ withServiceRole: true });

  // Check if code is valid
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, email, recovery_password_code")
    .eq("email", email)
    .eq("recovery_password_code", code)
    .maybeSingle();

  if (userError) {
    return {
      success: false,
      message: PASSWORD_COULD_NOT_BE_RECOVERED,
    };
  }

  if (!user) {
    return {
      success: false,
      message: PASSWORD_COULD_NOT_BE_RECOVERED,
    };
  }

  // Update user password
  const { error: updateUserByIdError } =
    await supabase.auth.admin.updateUserById(user.id, {
      password,
    });

  if (updateUserByIdError) {
    return {
      success: false,
      message: PASSWORD_COULD_NOT_BE_RECOVERED,
    };
  }

  const { error: updateUserError } = await supabase
    .from("users")
    .update({ recovery_password_code: null })
    .eq("id", user.id);

  if (updateUserError) {
    return {
      success: false,
      message: PASSWORD_COULD_NOT_BE_RECOVERED,
    };
  }

  return {
    success: true,
    message: "Contraseña restablecida, intenta iniciar sesión",
  };
}
