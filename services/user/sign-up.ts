import { COULD_NOT_FIND_INSERTED_USER } from "@/services/user/messages";
import { Database } from "@/types/database";
import { CreateLead } from "@/types/domain/leads";
import { CreateUser } from "@/types/domain/users";
import { SupabaseClient } from "@supabase/supabase-js";

export type SignUpParams = Pick<CreateUser, "email" | "name"> &
  Pick<CreateLead, "phone" | "nickname"> & { password: string };

export const signUp = (supabase: SupabaseClient<Database>) => {
  return async ({ email, phone, name, nickname, password }: SignUpParams) => {
    const { data: signUp, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!signUp.user) {
      throw new Error(COULD_NOT_FIND_INSERTED_USER);
    }

    if (signUpError) {
      throw new Error(signUpError.message);
    }

    await supabase.auth.signOut();

    const { data: insertedUser, error: insertUserError } = await supabase
      .from("users")
      .insert({
        id: signUp.user.id,
        email,
        name,
        role: "LEAD",
        is_confirmed: true,
      })
      .select("*")
      .maybeSingle();

    if (insertUserError) {
      throw new Error(insertUserError.message);
    }

    if (!insertedUser) {
      throw new Error(COULD_NOT_FIND_INSERTED_USER);
    }

    const { error: insertLeadError } = await supabase.from("leads").insert({
      user_id: insertedUser.id,
      nickname,
      phone,
    });

    if (insertLeadError) {
      throw new Error(insertLeadError.message);
    }
  };
};
