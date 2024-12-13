import { Tables } from "@/services/supabase";

export type PreRegistrationData = {
  name: string;
  email: string;
};

export type PreRegistration = Tables<"pre_registrations">["Row"];
