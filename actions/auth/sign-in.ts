"use server";

import { createClient } from "@/services/supabase/server-client";
import { signIn, SignInParams } from "@/services/user/sign-in";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInAction(signInParams: SignInParams) {
  try {
    const { error } = await signIn(createClient())(signInParams);

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/", "layout");
    redirect("/projects");
  } catch (error) {
    return {
      success: false,
      message: "Un error inesperado ha ocurrido",
    };
  }
}
