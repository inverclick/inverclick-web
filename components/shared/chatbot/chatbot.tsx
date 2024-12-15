"use client";

import { ChatMessage } from "@/components/shared/chatbot/chat-message";
import { ChatbotContent } from "@/components/shared/chatbot/chatbot-content";
import { Sender } from "@/components/shared/chatbot/types";
import { usePreRegistration } from "@/contexts/pre-registration-context";
import { Button } from "@inverclick/inverclick-ui/button";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export type ChatMessage = {
  id: string;
  message: string;
  sender: Sender;
};

export type ChatbotProps = {
  messages?: ChatMessage[];
};

export const Chatbot = ({ messages: initialMessages = [] }: ChatbotProps) => {
  const { preRegistration, setIsPreRegistrationOpen } = usePreRegistration();

  const pathname = usePathname();

  return (
    <>
      {!preRegistration && (
        <Button
          type="button"
          className="fixed bottom-4 right-4 z-50"
          variant={pathname === "/" ? "secondary" : "default"}
          rounded="full"
          size="icon"
          onClick={() => setIsPreRegistrationOpen(true)}
        >
          <Icon icon={MessageCircle} />
        </Button>
      )}
      {preRegistration && <ChatbotContent messages={initialMessages} />}
    </>
  );
};
