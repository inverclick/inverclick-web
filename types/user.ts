import { Tables } from "@/services/supabase/supabase";

export type User = Tables<"users">["Row"];
