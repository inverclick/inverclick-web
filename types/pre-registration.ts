import { Tables } from "@/services/supabase";

export type PreRegistrationValues = {
  name: string;
  email: string;
};

export type PreRegistration = Tables<"pre_registrations">["Row"];
export type CreatePreRegistration = Tables<"pre_registrations">["Insert"];
export type UpdatePreRegistration = Tables<"pre_registrations">["Update"];
