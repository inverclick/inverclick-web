import { Tables } from "@/services/supabase";

export type ChatbotMessage = Tables<"chatbot_messages">["Row"];
export type CreateChatbotMessage = Tables<"chatbot_messages">["Insert"];
export type UpdateChatbotMessage = Tables<"chatbot_messages">["Update"];
