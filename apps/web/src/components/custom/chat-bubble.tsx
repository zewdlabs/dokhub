"use client";

import Balancer from "react-wrap-balancer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Message } from "ai/react";
import ReactMarkdown from "react-markdown";
import { formattedText } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { MemoizedReactMarkdown } from "./markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface ChatLineProps extends Partial<Message> {
  sources: string[];
}

export function ChatLine({
  role = "assistant",
  content,
  sources,
}: ChatLineProps) {
  if (!content) {
    return null;
  }
  const session = useSession();

  return (
    <div>
      <Card className="mb-2">
        <CardHeader>
          <CardTitle
            className={
              role != "assistant"
                ? "text-amber-500 dark:text-amber-200"
                : "text-blue-500 dark:text-blue-200"
            }
          >
            {role == "assistant" ? "Dokbot" : session.data?.user?.name || "you"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <Balancer>
            <MemoizedReactMarkdown
              className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-full"
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                p({ children }) {
                  return <p className="mb-2 last:mb-0">{children}</p>;
                },
                ol({ children }) {
                  return (
                    <>
                      <ol className="list-decimal list-inside">{children}</ol>
                      <br />
                    </>
                  );
                },
              }}
            >
              {content ?? (
                <span className="mt-1 cursor-default animate-pulse">▍</span>
              )}
            </MemoizedReactMarkdown>
          </Balancer>
        </CardContent>
        <CardFooter>
          {sources && sources.length ? (
            <Accordion type="single" collapsible className="w-full">
              {sources.map((source, index) => (
                <AccordionItem value={`source-${index}`} key={index}>
                  <AccordionTrigger>{`Source ${index + 1}`}</AccordionTrigger>
                  <AccordionContent>
                    <ReactMarkdown>{formattedText(source)}</ReactMarkdown>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <></>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
