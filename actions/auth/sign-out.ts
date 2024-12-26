"use server";

import { signOutServerSide } from "@/services/user/sign-out-server-side";
import { revalidatePath } from "next/cache";

export async function signOutAction() {
  const { error } = await signOutServerSide();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
}
