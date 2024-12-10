import { Tables } from "@/services/supabase";

export type Characteristic = Tables<'characteristics'>['Row']