"use client";

import goToProjects, {
  ASSISTANT_ID,
  getWelcomeMessage,
  goToProject,
  goToProjectsWithFilters,
  OPEN_AI_API_KEY,
  simulateCreditByQuotaValue,
  simulateCreditByValueHousing,
} from "@/components/shared/chatbot/functions";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@inverclick/inverclick-ui/popover";
import { usePreRegistration } from "@/contexts/pre-registration-context";
import { cn } from "@/lib/utils";
import { PreRegistrationData } from "@/types/pre-registration";
import { Button } from "@inverclick/inverclick-ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@inverclick/inverclick-ui/card";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { Input } from "@inverclick/inverclick-ui/input";
import { ScrollArea } from "@inverclick/inverclick-ui/scroll-area";
import { MessageCircle, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { OpenAI } from "openai";
import {
  FormEvent,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import Markdown from "react-markdown";
import { v4 as uuidv4 } from "uuid";

export type Sender = "user" | "assistant";

export type ChatMessage = {
  id: string;
  message: string;
  sender: Sender;
};

export const Chatbot = () => {
  const { preRegistration, ensurePreRegistration } = usePreRegistration();

  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Popover open={isChatOpen} onOpenChange={setIsChatOpen}>
      <PopoverAnchor asChild>
        <Button
          rounded="full"
          size="icon"
          className="fixed bottom-4 right-4 z-50"
          onClick={() => {
            ensurePreRegistration(() => {
              setIsChatOpen(true);
            });
          }}
        >
          <Icon icon={MessageCircle} className="text-white" />
        </Button>
      </PopoverAnchor>
      {preRegistration && (
        <PopoverContent
          side="top"
          align="end"
          className="w-[calc(100vw-2rem)] md:w-96 p-0"
        >
          <ChatbotContent preRegistration={preRegistration} />
        </PopoverContent>
      )}
    </Popover>
  );
};

type ChatbotContentProps = {
  preRegistration: PreRegistrationData;
};

const ChatbotContent = ({ preRegistration }: ChatbotContentProps) => {
  const openai = useRef<OpenAI>();
  const thread = useRef<OpenAI.Beta.Threads.Thread>();

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      openai.current = new OpenAI({
        apiKey: OPEN_AI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      thread.current = await openai.current.beta.threads.create();
    };

    window.goToProjects = goToProjects;
    window.goToProjectsWithFilters = goToProjectsWithFilters;
    window.simulateCreditByQuotaValue = simulateCreditByQuotaValue;
    window.simulateCreditByValueHousing = simulateCreditByValueHousing;
    window.goToProject = goToProject;

    init();
  }, []);

  useEffect(() => {
    setMessages((messages) => [
      ...messages,
      {
        id: uuidv4(),
        message: getWelcomeMessage(preRegistration!.name),
        sender: "assistant",
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const waitForResponseCompletion = async (runId: string) => {
    let response = await openai.current!.beta.threads.runs.retrieve(
      thread.current!.id,
      runId
    );

    while (response.status === "in_progress" || response.status === "queued") {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      response = await openai.current!.beta.threads.runs.retrieve(
        thread.current!.id,
        runId
      );
    }

    return response;
  };

  const handleResponseCompletion = async (runId: string) => {
    const messages = await openai.current!.beta.threads.messages.list(
      thread.current!.id
    );

    const lastMessage = messages.data
      .filter(
        (message) => message.run_id === runId && message.role === "assistant"
      )
      .pop();

    const message =
      lastMessage?.content[0].type === "text"
        ? lastMessage.content[0].text.value
        : "";

    setIsLoading(false);
    setMessages((messages) => [
      ...messages,
      { id: uuidv4(), message, sender: "assistant" },
    ]);
  };

  const handleFailedResponse = () => {
    setIsLoading(false);
    setMessages((messages) => [
      ...messages,
      {
        id: uuidv4(),
        message: "Lo siento, algo salió mal.",
        sender: "assistant",
      },
    ]);
  };

  const submitToolOutputs = async (
    toolCalls: OpenAI.Beta.Threads.Runs.RequiredActionFunctionToolCall[],
    runId: string
  ) => {
    const toolOutputs: OpenAI.Beta.Threads.Runs.RunSubmitToolOutputsParams.ToolOutput[] =
      [];

    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;

      const args = toolCall.function.arguments
        ? JSON.parse(toolCall.function.arguments)
        : null;

      const output = args
        ? ((await window[functionName](args)) as string)
        : ((await window[functionName]()) as string);

      toolOutputs.push({
        tool_call_id: toolCall.id,
        output,
      });
    }

    await openai.current!.beta.threads.runs.submitToolOutputs(
      thread.current!.id,
      runId,
      { tool_outputs: toolOutputs }
    );

    return toolOutputs.map((toolOutput) => JSON.parse(toolOutput.output!));
  };

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    const chatMessage: ChatMessage = {
      id: uuidv4(),
      message,
      sender: "user",
    };

    setIsLoading(true);
    setMessages((messages) => [...messages, chatMessage]);
    setMessage("");

    /**
     * Create message
     */
    await openai.current!.beta.threads.messages.create(thread.current!.id, {
      role: "user",
      content: message,
    });

    /**
     * Create run
     */
    const run = await openai.current!.beta.threads.runs.create(
      thread.current!.id,
      {
        assistant_id: ASSISTANT_ID,
        tool_choice: { type: "file_search" },
      }
    );

    /**
     * Waits for run status to be different than "in_progress" or "queued"
     */
    let response = await waitForResponseCompletion(run.id);

    if (response.status === "completed") {
      return await handleResponseCompletion(run.id);
    }

    if (response.status === "requires_action" && response.required_action) {
      const outputs = await submitToolOutputs(
        response.required_action.submit_tool_outputs.tool_calls,
        run.id
      );

      let _response = await waitForResponseCompletion(run.id);

      const outputsWithActions = outputs.filter((output) => output.action);

      outputsWithActions.forEach(async (output) => {
        if (output.action === "go_to_projects" && output.params.filter) {
          router.push(
            `/projects?${(output.params.filter as string).replace(/,/g, "&")}`
          );
        } else if (output.action === "go_to_projects") {
          router.push(`/projects`);
        } else if (output.action === "go_to_project") {
          router.push(
            `/projects/${output.params.project_id}/${output.params.typology_id}`
          );
        }
      });

      if (_response.status === "completed") {
        await handleResponseCompletion(run.id);
      } else {
        handleFailedResponse();
      }

      return;
    }

    if (
      response.status === "failed" ||
      response.status === "expired" ||
      response.status === "cancelled"
    ) {
      handleFailedResponse();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chatbot</CardTitle>
      </CardHeader>
      <CardContent>
        <ChatMessages ref={scrollAreaRef}>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.message}
              sender={message.sender}
            />
          ))}
          {isLoading && <TypingIndicator />}
        </ChatMessages>
      </CardContent>
      <CardFooter>
        <form onSubmit={sendMessage} className="flex gap-2 w-full">
          <Input
            placeholder="Escribe un mensaje"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" size="icon" className="flex-shrink-0">
            <Icon icon={Send} className="text-white" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

const TypingIndicator = () => {
  return (
    <article className="flex gap-1 bg-muted px-3 py-3 w-max max-w-[75%] rounded-lg">
      <div className="size-2 bg-gray-400 rounded-full animate-bounce"></div>
      <div
        className="size-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="size-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </article>
  );
};

export type ChatMessageProps = {
  message: string;
  sender: Sender;
};

type ChatMessagesProps = PropsWithChildren;
const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(
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

const ChatMessage = ({ message, sender }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
        {
          "bg-primary text-white ml-auto": sender === "user",
          "bg-muted": sender === "assistant",
        }
      )}
    >
      <Markdown>{message}</Markdown>
    </div>
  );
};
