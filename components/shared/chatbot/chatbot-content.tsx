import { ChatMessage } from "@/components/shared/chatbot/chat-message";
import { ChatMessages } from "@/components/shared/chatbot/chat-messages";
import { ChatMessage as ChatMessageType } from "@/components/shared/chatbot/chatbot";
import goToProjects, {
  getWelcomeMessage,
  goToProject,
  goToProjectsWithFilters,
  questionAboutInverclick,
  questionAboutProject,
  simulateCreditByQuotaValue,
  simulateCreditByValueHousing,
} from "@/components/shared/chatbot/functions";
import { TypingIndicator } from "@/components/shared/chatbot/typing-indicator";
import { CHATBOT_MESSAGES_LOCAL_STORAGE_KEY } from "@/constants/chatbot-messages";
import { useChatbot } from "@/contexts/chatbot-context";
import { usePreRegistration } from "@/contexts/pre-registration-context";
import { ENV_VARS } from "@/global/env";
import { getChatbotMessagesFromLocalStorage } from "@/services/chatbot-messages-client";
import { supabase } from "@/services/supabase/supabase";
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
import { MessageCircle, Send } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import OpenAI from "openai";

const WAIT_FOR_RESPONSE_TIME = 500;

export type ChatbotContentProps = {
  messages?: ChatMessageType[];
};

export const ChatbotContent = ({
  messages: initialMessages = [],
}: ChatbotContentProps) => {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const scrollAreaRefFn = useCallback((node: HTMLDivElement) => {
    scrollAreaRef.current = node;

    if (node) {
      node.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
      });
    }
  }, []);

  const [openAI] = useState<OpenAI>(
    new OpenAI({
      apiKey: ENV_VARS.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    })
  );

  const [thread, setThread] = useState<OpenAI.Beta.Threads.Thread>();

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessageType[]>(
    getChatbotMessagesFromLocalStorage()
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isChatOpen, setIsChatOpen } = useChatbot();

  const { preRegistration } = usePreRegistration();

  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!preRegistration) {
      setIsChatOpen(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preRegistration]);

  useEffect(() => {
    const projectPageRegex = /^\/projects\/[a-f0-9\-]{36}\/[a-f0-9\-]{36}$/;

    const contextualizeAssistant = async () => {
      if (thread && preRegistration && projectPageRegex.test(pathname)) {
        // TODO: Avoid this request
        const { data: project } = await supabase
          .from("projects")
          .select("*")
          .eq("id", params.project)
          .single();

        if (project) {
          await openAI.beta.threads.messages.create(thread.id, {
            role: "assistant",
            content: `El nombre del usuario es ${preRegistration.name} y está en la página del proyecto ${project.name} con ID ${project.id}.`,
          });
        }
      }
    };

    contextualizeAssistant();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thread, pathname]);

  useEffect(() => {
    const init = async () => {
      setThread(await openAI.beta.threads.create());
    };

    window.goToProjects = goToProjects;
    window.goToProjectsWithFilters = goToProjectsWithFilters;
    window.simulateCreditByQuotaValue = simulateCreditByQuotaValue;
    window.simulateCreditByValueHousing = simulateCreditByValueHousing;
    window.goToProject = goToProject;
    window.questionAboutProject = questionAboutProject;
    window.questionAboutInverclick = questionAboutInverclick;

    init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messages.length === 0 && preRegistration) {
      setMessages((messages) => [
        ...messages,
        {
          id: uuidv4(),
          message: getWelcomeMessage(preRegistration.name),
          sender: "assistant",
        },
      ]);
    }

    localStorage.setItem(
      CHATBOT_MESSAGES_LOCAL_STORAGE_KEY,
      JSON.stringify(messages)
    );
  }, [messages, preRegistration]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const waitForResponseCompletion = async (runId: string) => {
    if (!thread) {
      throw new Error("No thread found");
    }

    let response = await openAI.beta.threads.runs.retrieve(thread.id, runId);

    while (response.status === "in_progress" || response.status === "queued") {
      await new Promise((resolve) =>
        setTimeout(resolve, WAIT_FOR_RESPONSE_TIME)
      );

      response = await openAI.beta.threads.runs.retrieve(thread.id, runId);
    }

    return response;
  };

  const handleResponseCompletion = async (runId: string) => {
    if (!thread) {
      throw new Error("No thread found");
    }

    if (!preRegistration) {
      throw new Error("No pre-registration found");
    }

    const messages = await openAI.beta.threads.messages.list(thread.id);

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

    /**
     * Save assistant message on DB
     */
    await supabase.from("chatbot_messages").insert({
      from: "BOT",
      message,
      user_id: preRegistration.id,
    });
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
    if (!thread) {
      throw new Error("No thread found");
    }

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

    await openAI.beta.threads.runs.submitToolOutputs(thread.id, runId, {
      tool_outputs: toolOutputs,
    });

    return toolOutputs.map((toolOutput) => JSON.parse(toolOutput.output!));
  };

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();

    if (!thread) {
      throw new Error("No thread found");
    }

    if (!preRegistration) {
      throw new Error("No pre-registration found");
    }

    if (message.trim().length === 0) return;

    const chatMessage: ChatMessageType = {
      id: uuidv4(),
      message,
      sender: "user",
    };

    setIsLoading(true);
    setMessages((messages) => [...messages, chatMessage]);
    setMessage("");

    /**
     * Save user message on DB
     */
    await supabase.from("chatbot_messages").insert({
      from: "USER",
      message,
      user_id: preRegistration.id,
    });

    /**
     * Create message
     */
    await openAI.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `Mi nombre es ${preRegistration.name} y mi pregunta es: ${message}`,
    });

    /**
     * Create run
     */
    const run = await openAI.beta.threads.runs.create(thread.id, {
      assistant_id: ENV_VARS.OPENAI_ASSISTANT_ID,
      tool_choice: "required",
      // tool_choice: { type: "file_search" },
    });

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

      let requiredActionResponse = await waitForResponseCompletion(run.id);

      const outputsWithActions = outputs.filter((output) => output.action);

      outputsWithActions.forEach(async (output) => {
        if (output.action === "go_to_projects" && output.params?.filter) {
          router.push(
            `/projects?${(output.params?.filter as string).replace(/,/g, "&")}`
          );
        } else if (output.action === "go_to_projects") {
          router.push(`/projects`);
        } else if (output.action === "go_to_project") {
          router.push(
            `/projects/${output.params?.project_id}/${output.params?.typology_id}`
          );
        }
      });

      if (requiredActionResponse.status === "completed") {
        return await handleResponseCompletion(run.id);
      }

      if (
        requiredActionResponse.status === "failed" ||
        requiredActionResponse.status === "expired" ||
        requiredActionResponse.status === "cancelled"
      ) {
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
    <Popover open={isChatOpen} onOpenChange={setIsChatOpen}>
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
        className="w-[calc(100vw-2rem)] md:w-96 p-0"
      >
        <Card className="border-none">
          <CardHeader>
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src="/avatar-assistant.svg" alt="Asistente" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <CardTitle>Asistente</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChatMessages ref={scrollAreaRefFn}>
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
      </PopoverContent>
    </Popover>
  );
};
