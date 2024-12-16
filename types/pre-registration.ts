import { Tables } from "@/services/supabase";

export type PreRegistrationValues = {
  name: string;
  email: string;
};

export type PreRegistration = Tables<"pre_registrations">["Row"];
