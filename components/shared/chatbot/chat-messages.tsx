import { ScrollArea } from "@inverclick/inverclick-ui/scroll-area";
import { forwardRef, PropsWithChildren } from "react";

export type ChatMessagesProps = PropsWithChildren;

export const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(
  ({ children }, ref) => {
    return (
      <ScrollArea
        viewportRef={ref}
        className="scroll-area-flex h-96 w-[calc((100vw-2rem)-3rem)] md:w-[calc(24rem-3rem)]"
      >
        {children}
      </ScrollArea>
    );
  }
);

ChatMessages.displayName = "ChatMessages";
