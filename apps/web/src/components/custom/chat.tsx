"use client";

import { scrollToBottom } from "@/lib/utils";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { ChatLine } from "./chat-bubble";
import { Message } from "ai";
import { Button } from "../ui/button";
import { Icons } from "../icons";

import { CornerDownLeft } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ChatWebUI() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
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
              <ChatLine
                key={id}
                role={role}
                content={content}
                sources={["hi there"]}
              />
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