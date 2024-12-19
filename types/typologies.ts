import { Tables } from "@/services/supabase";

export type Typology = Tables<"typologies">["Row"];
export type CreateTypology = Tables<"typologies">["Insert"];
export type UpdateTypology = Tables<"typologies">["Update"];
