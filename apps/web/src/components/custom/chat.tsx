"use client";

import { scrollToBottom } from "@/lib/utils";
import { useChat, useCompletion } from "ai/react";
import { useEffect, useRef } from "react";
import { ChatLine } from "./chat-bubble";
import { Message } from "ai";
import { Button } from "../ui/button";

import { CornerDownLeft } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function ChatWebUI({ chatId }: { chatId: string }) {
  const session = useSession();
  const router = useRouter();

  const { complete } = useCompletion({
    api: "/api/generate",
    onFinish: async (_, completion) => {
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

      if (!res.ok) {
        console.error("An error occurred while saving the note");
        throw new Error("Network response was not ok");
      }

      router.refresh();
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
    onFinish: async () => {
      if (messages.length == 4) {
        await complete(
          messages[0].content +
            "\n" +
            messages[1].content +
            "\n" +
            messages[2].content,
        );
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
        {messages.length !== 0 ? (
          messages.map(({ id, role, content }: Message) => (
            <ChatLine key={id} role={role} content={content} sources={[]} />
          ))
        ) : (
          <ChatLine role="assistant" sources={[]} />
        )}
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
          <Button
            type="submit"
            className="ml-auto gap-1.5"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 animate-spin"
              >
                <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
              </svg>
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
