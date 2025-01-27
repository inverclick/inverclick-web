import { Sender } from "@/components/shared/chatbot/types";
import { cn } from "@/lib/utils";

import Markdown from "react-markdown";

export type ChatMessageProps = {
  message: string;
  sender: Sender;
};

export const ChatMessage = ({ message, sender }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
        {
          "ml-auto bg-primary text-white": sender === "user",
          "bg-muted": sender === "assistant",
        }
      )}
    >
      <Markdown>{message}</Markdown>
    </div>
  );
};
