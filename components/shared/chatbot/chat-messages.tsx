import { ScrollArea } from "@inverclick/inverclick-ui/scroll-area";
import { forwardRef, PropsWithChildren } from "react";

type ChatMessagesProps = PropsWithChildren;

export const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(
  ({ children }, ref) => {
    return (
      <ScrollArea
        viewportRef={ref}
        className="[&_div]:!flex [&_div]:!flex-col [&_div]:!gap-4 w-[calc((100vw-2rem)-3rem)] md:w-[calc(24rem-3rem)] h-96"
      >
        {children}
      </ScrollArea>
    );
  }
);

ChatMessages.displayName = "ChatMessages";
