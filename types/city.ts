import { Tables } from "@/services/supabase";

export type City = Tables<'cities'>['Row']