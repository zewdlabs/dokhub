"use client";

import { scrollToBottom } from "@/lib/utils";
import { useChat, useCompletion } from "ai/react";
import { useEffect, useRef } from "react";
import { ChatLine } from "./chat-bubble";
import { Message } from "ai";
import { Button } from "../ui/button";
import { Icons } from "../icons";

import { CornerDownLeft } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

export default function ChatWebUI({ chatId }: { chatId: string }) {
  const session = useSession();

  const { complete, completion: cmp } = useCompletion({
    api: "/api/generate",
    onFinish: async (_, completion) => {
      console.log("received in completion", completion);
      console.log("from the top", cmp);
      const res = await fetch(
        `http://localhost:4231/api/chat/user/${session.data?.user.id}/${chatId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.tokens.accessToken}`,
          },
          body: JSON.stringify({
            title: completion,
          }),
        },
      );
      console.log("response", await res.json());

      if (!res.ok) {
        console.error("An error occurred while saving the note");
        throw new Error("Network response was not ok");
      }
    },
  });

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    body: { chatId, userId: session.data?.user?.id },
    onFinish: async (message) => {
      console.log("received in chat", message);

      console.log(messages.length);

      console.log(messages.length == 2);

      if (messages.length == 2) {
        console.log("completing and generating title", messages);

        await complete(messages[0].content);
      }
    },
  });

  const messagesFromDb = useQuery({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:4231/api/chat/user/${session.data?.user.id}/${chatId}`,
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      console.log("where are the messages", data);

      return data as Message[];
    },
  });

  useEffect(() => {
    if (messagesFromDb.data) {
      setMessages(messagesFromDb.data);
    }
  }, [messagesFromDb.data]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);

  return (
    <div className="h-[85vh] flex flex-col justify-between relative">
      <div className="p-6 h-[85%] overflow-auto" ref={containerRef}>
        {messages.length !== 0
          ? messages.map(({ id, role, content }: Message) => (
              <ChatLine key={id} role={role} content={content} sources={[]} />
            ))
          : null}
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="clear-both w-full overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring absolute -bottom-6"
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            e.key === "Enter" &&
              e.shiftKey === false &&
              formRef.current?.requestSubmit();
          }}
        />
        <div className="flex items-center p-3 pt-0">
          <Button type="submit" className="ml-auto gap-1.5">
            {isLoading ? (
              <Icons.spinner />
            ) : (
              <div className="flex items-center justify-center gap-2">
                Send Message
                <CornerDownLeft className="size-3.5" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export const getSources = (data: any[], role: string, index: number) => {
  if (role === "assistant" && index >= 2 && (index - 2) % 2 === 0) {
    const sourcesIndex = (index - 2) / 2;
    if (data[sourcesIndex] && data[sourcesIndex].sources) {
      return data[sourcesIndex].sources;
    }
  }
  return [];
};
