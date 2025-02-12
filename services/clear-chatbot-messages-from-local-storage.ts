import { CHATBOT_MESSAGES_LOCAL_STORAGE_KEY } from "@/constants/chatbot-messages";

export function clearChatbotMessagesFromLocalStorage(): void {
  localStorage.removeItem(CHATBOT_MESSAGES_LOCAL_STORAGE_KEY);
}
