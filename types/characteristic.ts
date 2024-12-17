import { Tables } from "@/services/supabase";

export type Characteristic = Tables<"characteristics">["Row"];
export type CreateCharacteristic = Tables<"characteristics">["Insert"];
export type UpdateCharacteristic = Tables<"characteristics">["Update"];
