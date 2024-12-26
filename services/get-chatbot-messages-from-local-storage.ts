import { ChatMessage } from "@/components/shared/chatbot/chatbot";
import { CHATBOT_MESSAGES_LOCAL_STORAGE_KEY } from "@/constants/chatbot-messages";

export function getChatbotMessagesFromLocalStorage(): ChatMessage[] {
  try {
    const rawChatbotMessages = localStorage.getItem(
      CHATBOT_MESSAGES_LOCAL_STORAGE_KEY
    );

    return rawChatbotMessages ? JSON.parse(rawChatbotMessages) : [];
  } catch (error) {
    return [];
  }
}
