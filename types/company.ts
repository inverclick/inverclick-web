import { Tables } from "@/services/supabase";

export type ICOMPANY = Tables<'companies'>['Row']