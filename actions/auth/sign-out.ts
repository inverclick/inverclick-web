"use server";

import { createClient } from "@/services/supabase/server-client";
import { signOut } from "@/services/user/sign-out";
import { revalidatePath } from "next/cache";

export async function signOutAction() {
  const { error } = await signOut(createClient())();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
}
