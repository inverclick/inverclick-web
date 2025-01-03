import { getForgotPasswordEmailTemplate } from "@/emails/get-forgot-password-email-template";
import { generateUniqueCode } from "@/lib/generate-unique-code";
import { supabase } from "@/services/supabase/supabase";

export async function sendRecoveryPasswordCode({ email }: { email: string }) {
  const code = generateUniqueCode();

  await supabase
    .from("users")
    .update({ recovery_password_code: code })
    .eq("email", email)
    .throwOnError();

  supabase.functions.invoke("send-email", {
    body: getForgotPasswordEmailTemplate({ to: email, code }),
  });
}
