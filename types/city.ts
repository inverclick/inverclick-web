import { Tables } from "@/services/supabase";

export type City = Tables<"cities">["Row"];
export type CreateCity = Tables<"cities">["Insert"];
export type UpdateCity = Tables<"cities">["Update"];
