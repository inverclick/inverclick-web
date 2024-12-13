import { supabase } from "@/services/supabase";
import { PreRegistrationData } from "@/types/pre-registration";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { name, email } = (await request.json()) as PreRegistrationData;

  const { data: existingPreRegistration } = await supabase
    .from("pre_registrations")
    .select("*")
    .eq("email", email)
    .single();

  if (!existingPreRegistration) {
    await supabase.from("pre_registrations").insert({
      name,
      email,
    });
  }

  if (existingPreRegistration) {
    await supabase
      .from("pre_registrations")
      .update({
        name,
      })
      .eq("email", email);
  }

  const cookieStore = cookies();
  cookieStore.set("pre-registration", JSON.stringify({ name, email }));

  return Response.json({
    name,
    email,
  });
}
