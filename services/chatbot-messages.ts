import { ChatMessage } from "@/components/shared/chatbot/chatbot";
import { supabase } from "@/services/supabase";
import { PreRegistration } from "@/types/pre-registration";

/**
 * Given a pre-registration, returns an array of its associated chatbot messages.
 *
 * @param {PreRegistration | null} preRegistration - The pre-registration to retrieve the messages from.
 * @returns {Promise<ChatMessage[]>} A promise that resolves with the array of chatbot messages associated with the pre-registration, or an empty array if the pre-registration is null.
 */
export async function getChatbotMessagesFromPreRegistration(
  preRegistration: PreRegistration | null
) {
  if (preRegistration) {
    const { data: chatbotMessages } = await supabase
      .from("chatbot_messages")
      .select("*")
      .eq("pre_registration_id", preRegistration.id)
      .order("created_at", { ascending: true });

    return (chatbotMessages || []).map((chatbotMessage) => {
      const message: ChatMessage = {
        id: chatbotMessage.id,
        message: chatbotMessage.message,
        sender: chatbotMessage.from === "USER" ? "user" : "assistant",
      };

      return message;
    });
  }

  return [] as ChatMessage[];
}
