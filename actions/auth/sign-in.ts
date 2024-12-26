"use server";

import {
  signInServerSide,
  SignInServerSideParams,
} from "@/services/user/sign-in-server-side";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInAction(
  signInServerSideParams: SignInServerSideParams
) {
  const { error } = await signInServerSide(signInServerSideParams);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/projects");
}
