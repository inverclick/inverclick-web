import { Tables } from "@/services/supabase";

export type ChatbotMessage = Tables<"chatbot_messages">["Row"];
