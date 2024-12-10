import { Tables } from "@/services/supabase";

export type Typology = Tables<'typologies'>['Row']