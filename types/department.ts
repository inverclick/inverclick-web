import { Tables } from "@/services/supabase";

export type Department = Tables<'departments'>['Row']