import { Tables } from "@/services/supabase";

export type User = Tables<"users">["Row"];
