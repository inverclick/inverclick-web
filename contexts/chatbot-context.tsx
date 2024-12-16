"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

export type ChatbotContextType = {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  shouldOpenChatbot: boolean;
  setShouldOpenChatbot: (shouldOpenChatbot: boolean) => void;
};

export const ChatbotContext = createContext<ChatbotContextType>(
  {} as ChatbotContextType
);

export type ChatbotProviderProps = PropsWithChildren;

export const ChatbotProvider = ({ children }: ChatbotProviderProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [shouldOpenChatbot, setShouldOpenChatbot] = useState(false);

  const context: ChatbotContextType = {
    isChatOpen,
    setIsChatOpen,
    shouldOpenChatbot,
    setShouldOpenChatbot,
  };

  return (
    <ChatbotContext.Provider value={context}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => useContext(ChatbotContext);
