import { supabase } from "@/services/supabase";
import {
  PreRegistration,
  PreRegistrationValues,
} from "@/types/pre-registration";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { name, email } = (await request.json()) as PreRegistrationValues;

  let preRegistration: PreRegistration | null = null;

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

  return Response.json(preRegistration);
}
