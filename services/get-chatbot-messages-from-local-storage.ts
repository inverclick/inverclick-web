import { ChatMessage } from "@/components/shared/chatbot/chatbot";
import { CHATBOT_MESSAGES_LOCAL_STORAGE_KEY } from "@/constants/chatbot-messages";

export function getChatbotMessagesFromLocalStorage(): ChatMessage[] {
  try {
    const rawChatbotMessages = localStorage.getItem(
      CHATBOT_MESSAGES_LOCAL_STORAGE_KEY
    );

    const messages = rawChatbotMessages
      ? (JSON.parse(rawChatbotMessages) as ChatMessage[])
      : [];

    return messages;
  } catch (error) {
    return [];
  }
}
