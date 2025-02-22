"use server";

import { createClient } from "@/services/supabase/server-client";
import { signOut } from "@/services/user/sign-out";
import { revalidatePath } from "next/cache";

export async function signOutAction() {
  try {
    const { error } = await signOut(createClient())();

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/", "layout");

    return { success: true, message: "Sesión cerrada exitosamente" };
  } catch (error) {
    return {
      success: false,
      message: "Un error inesperado ha ocurrido",
    };
  }
}
