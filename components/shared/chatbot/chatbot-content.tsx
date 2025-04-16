import { ChatMessage } from "@/components/shared/chatbot/chat-message";
import { ChatMessages } from "@/components/shared/chatbot/chat-messages";
import { ChatMessage as ChatMessageType } from "@/components/shared/chatbot/chatbot";
import {
  CHATBOT_MESSAGES_LIMIT,
  PROMPT_SYSTEM,
} from "@/components/shared/chatbot/constants";
import {
  getWelcomeMessage,
  goToProject,
  goToProjects,
  goToProjectsWithFilters,
  questionAboutInverclick,
  questionAboutProject,
  scheduleAnAppointment,
  simulateCredit,
} from "@/components/shared/chatbot/functions";
import {
  NO_CONTENT_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from "@/components/shared/chatbot/messages";
import { tools } from "@/components/shared/chatbot/tools";
import { Chatter, FunctionOutput } from "@/components/shared/chatbot/types";
import { TypingIndicator } from "@/components/shared/chatbot/typing-indicator";
import { CHATBOT_MESSAGES_LOCAL_STORAGE_KEY } from "@/constants/chatbot-messages";
import { CHATBOT_SENDER } from "@/constants/enums";
import { usePreRegistration } from "@/contexts/pre-registration-context";
import { useUser } from "@/contexts/user-context";
import { ENV_VARS } from "@/global/env";
import { LimitedQueue } from "@/lib/limited-queue";
import { clearChatbotMessagesFromLocalStorage } from "@/services/clear-chatbot-messages-from-local-storage";
import { getChatbotMessagesFromLocalStorage } from "@/services/get-chatbot-messages-from-local-storage";
import { supabase } from "@/services/supabase/supabase";
import { User } from "@/services/user/get-user";
import { PreRegistration } from "@/types/pre-registration";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@inverclick/inverclick-ui/avatar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@inverclick/inverclick-ui/popover";
import { Loader2, MessageCircle, Send } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

import OpenAI from "openai";

export const ChatbotContent = () => {
  const conversationHistoryRef = useRef<
    LimitedQueue<ChatCompletionMessageParam>
  >(new LimitedQueue(CHATBOT_MESSAGES_LIMIT + 1, 1));

  /**
   * References
   */
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const scrollAreaRefFn = useCallback((node: HTMLDivElement) => {
    scrollAreaRef.current = node;

    if (node) {
      node.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
      });
    }
  }, []);

  /**
   * States
   */
  const [openAI] = useState<OpenAI>(
    new OpenAI({
      apiKey: ENV_VARS.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    })
  );

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
  const [assistantTyping, setAssistantTyping] = useState<boolean>(false);

  /**
   * Hooks
   */
  const { user } = useUser();
  const { preRegistration } = usePreRegistration();

  const params = useParams<{ project: string; typology: string }>();
  const pathname = usePathname();
  const router = useRouter();

  /**
   * Constants
   */

  const chatter = getChatter({ user, preRegistration });

  /**
   * Effects
   */
  useEffect(() => {
    const init = async () => {
      setLoadingMessages(true);

      let messages: ChatMessageType[] = [];

      if (chatter.messagesSource === "db") {
        const { data } = await supabase
          .from("chatbot_messages")
          .select("*")
          .eq("user_id", chatter.id);

        messages =
          data && data.length > 0
            ? data.map((data) => {
                const message: ChatMessageType = {
                  id: data.id,
                  message: data.message,
                  sender: data.from === "BOT" ? "assistant" : "user",
                };

                return message;
              })
            : [];

        clearChatbotMessagesFromLocalStorage();
      } else if (chatter.messagesSource === "local") {
        messages = getChatbotMessagesFromLocalStorage();
      }

      if (messages.length === 0) {
        messages.push({
          id: uuidv4(),
          message: getWelcomeMessage(chatter.name),
          sender: "assistant",
        });
      }

      /**
       * Keep just the last (CHATBOT_MESSAGES_LIMIT) for the conversation history.
       * The conversation history is not showed to the user, is sent to the Open API,
       * so the assistant can have the context of the last messages.
       *
       * The messages showed to the users are stored in messages React state
       */
      conversationHistoryRef.current.add(PROMPT_SYSTEM);
      conversationHistoryRef.current.addMany(
        messages.map((message) => {
          const chatMessage: ChatCompletionMessageParam = {
            role: message.sender === "user" ? "user" : "assistant",
            content: message.message,
          };

          return chatMessage;
        })
      );

      setMessages(messages);
      setLoadingMessages(false);
    };

    window.goToProjects = goToProjects;
    window.goToProjectsWithFilters = goToProjectsWithFilters;
    window.simulateCredit = simulateCredit;
    window.goToProject = goToProject;
    window.questionAboutProject = questionAboutProject;
    window.questionAboutInverclick = questionAboutInverclick;
    window.scheduleAnAppointment = scheduleAnAppointment;

    init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messages.length > 0 && chatter.messagesSource === "local") {
      localStorage.setItem(
        CHATBOT_MESSAGES_LOCAL_STORAGE_KEY,
        JSON.stringify(messages)
      );
    }
  }, [messages, chatter.messagesSource]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, assistantTyping]);

  useEffect(() => {
    const projectPageRegex = /^\/projects\/[a-f0-9-]{36}\/[a-f0-9-]{36}$/;

    const contextualizeAssistant = async () => {
      if (projectPageRegex.test(pathname)) {
        // TODO: Avoid this request
        const { data: project } = await supabase
          .from("projects")
          .select("*")
          .eq("id", params.project)
          .single();

        if (project) {
          await handleSendMessage({
            openAI,
            message: `El nombre del usuario es ${chatter.name} y está en la página del proyecto ${project.name} con ID ${project.id}.`,
            conversationHistory: conversationHistoryRef.current,
            functionsRegistry: window,
            chatter,
          });
        }
      }
    };

    contextualizeAssistant();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();

    if (message.trim() === "") return;

    setMessages((messages) => [
      ...messages,
      {
        id: uuidv4(),
        message,
        sender: "user",
      },
    ]);

    setMessage("");
    setAssistantTyping(true);

    const { messageContent, functionResponse } = await handleSendMessage({
      openAI,
      message,
      conversationHistory: conversationHistoryRef.current,
      functionsRegistry: window,
      chatter,
    });

    setAssistantTyping(false);

    setMessages((messages) => [
      ...messages,
      {
        id: uuidv4(),
        message: messageContent,
        sender: "assistant",
      },
    ]);

    if (functionResponse !== null && functionResponse !== undefined) {
      try {
        await handleFunctionResponse({
          functionResponse,
          router,
          chatter,
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message || UNKNOWN_ERROR_MESSAGE);
        }
      }
    }

    await supabase.from("chatbot_messages").insert([
      {
        from: CHATBOT_SENDER.USER,
        message,
        user_id: chatter.id,
      },
      {
        from: CHATBOT_SENDER.BOT,
        message: messageContent,
        user_id: chatter.id,
      },
    ]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className="fixed bottom-4 right-4 z-50"
          variant={pathname === "/" ? "secondary" : "default"}
          rounded="full"
          size="icon"
        >
          <Icon icon={MessageCircle} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-[calc(100vw-2rem)] p-0 md:w-96"
      >
        <Card className="border-none">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/avatar-assistant.svg" alt="Asistente" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <CardTitle>Asistente</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {loadingMessages && (
              <div className="grid h-96 w-full place-content-center">
                <Loader2 className="animate-spin-clockwise repeat-infinite" />
              </div>
            )}
            {messages.length > 0 && (
              <ChatMessages ref={scrollAreaRefFn}>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message.message}
                    sender={message.sender}
                  />
                ))}
                {assistantTyping && <TypingIndicator />}
              </ChatMessages>
            )}
          </CardContent>
          <CardFooter>
            <form onSubmit={sendMessage} className="flex w-full gap-2">
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
      </PopoverContent>
    </Popover>
  );
};

/**
 * Chatter existence (user or pre-registration) is validated in chatbot.tsx component.
 * So user or pre-registration are guaranteed to exist at this point.
 */
function getChatter({
  user,
  preRegistration,
}: {
  user: User | null;
  preRegistration: PreRegistration | null;
}): Chatter {
  if (user) {
    return {
      id: user.id,
      leadId: user.lead[0].id,
      name: user.lead[0].nickname || user.name,
      email: user.email,
      messagesSource: "db",
    };
  }

  if (preRegistration) {
    return {
      id: preRegistration.id,
      leadId: preRegistration.leadId,
      name: preRegistration.nickname || preRegistration.name,
      email: preRegistration.email,
      messagesSource: "local",
    };
  }

  throw new Error("Chatter could not be returned");
}

async function handleSendMessage({
  openAI,
  message,
  chatter,
  conversationHistory,
  functionsRegistry,
}: {
  openAI: OpenAI;
  message: string;
  chatter: Chatter;
  conversationHistory: LimitedQueue<ChatCompletionMessageParam>;
  functionsRegistry: Window;
}): Promise<{ messageContent: string; functionResponse: string | null }> {
  message = `Mi nombre es ${chatter.name}. Mi pregunta es: ${message}`;

  conversationHistory.add({ role: "user", content: message });

  const response = await openAI.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: conversationHistory.getQueue(),
    functions: tools,
    function_call: "auto",
  });

  const responseMessage = response.choices[0].message;

  if (responseMessage.function_call) {
    const functionName = responseMessage.function_call.name;

    const functionArgs = JSON.parse(
      responseMessage.function_call.arguments || "{}"
    );

    if (functionsRegistry[functionName]) {
      const { messageContent, functionResponse } = await handleFunctionCall({
        openAI,
        functionName,
        functionArgs,
        conversationHistory,
        functionsRegistry,
        chatter,
      });

      return { messageContent, functionResponse };
    }
  } else {
    const messageContent = responseMessage.content || NO_CONTENT_MESSAGE;

    conversationHistory.add({ role: "assistant", content: messageContent });

    return { messageContent, functionResponse: null };
  }

  return {
    messageContent: NO_CONTENT_MESSAGE,
    functionResponse: null,
  };
}

async function handleFunctionCall({
  openAI,
  functionName,
  functionArgs,
  conversationHistory,
  functionsRegistry,
  chatter,
}: {
  openAI: OpenAI;
  functionName: string;
  functionArgs: Record<string, unknown>;
  conversationHistory: LimitedQueue<ChatCompletionMessageParam>;
  functionsRegistry: Window;
  chatter: Chatter;
}): Promise<{ messageContent: string; functionResponse: string }> {
  /*
   * "{
   *   action: "go_to_projects",,
   *   response_message: "¡Entendido, {UserName}! Estas son las opciones disponibles para apartamentos y casas. Si quieres ver más detalles de algún proyecto o aplicar otro filtro, dime y seguimos buscando juntos.",
   *   params: {
   *      filter: "city=32"
   *    }
   *  }"
   */

  if (functionName === "scheduleAnAppointment") {
    functionArgs.email = chatter.email;
  }

  const functionResponse = (await functionsRegistry[functionName](
    functionArgs
  )) as string;

  conversationHistory.add({
    role: "function",
    name: functionName,
    content: functionResponse,
  });

  const response = await openAI.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: conversationHistory.getQueue(),
  });

  const messageContent =
    response.choices[0].message.content || NO_CONTENT_MESSAGE;

  conversationHistory.add({ role: "assistant", content: messageContent });

  return { messageContent, functionResponse };
}

async function handleFunctionResponse({
  functionResponse,
  router,
  chatter,
}: {
  functionResponse: string;
  router: AppRouterInstance;
  chatter: Chatter;
}) {
  const output = JSON.parse(functionResponse) as FunctionOutput;

  if ("action" in output) {
    if (output.action === "go_to_projects" && "params" in output) {
      router.push(`/projects?${output.params.filter.replace(/,/g, "&")}`);
    } else if (output.action === "go_to_projects") {
      router.push(`/projects`);
    } else if (output.action === "go_to_project") {
      router.push(
        `/projects/${output.params.project_id}/${output.params.typology_id}`
      );
    } else if (output.action === "schedule_an_appointment") {
      const { projectId } = output.params;

      const { error } = await supabase.functions.invoke(
        "schedule-appointment",
        {
          body: {
            projectId,
            leadId: chatter.leadId,
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }
    }
  }
}
