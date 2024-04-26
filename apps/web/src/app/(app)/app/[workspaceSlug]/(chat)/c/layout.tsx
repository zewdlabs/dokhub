import ChatHeader from "@/components/custom/chat-header";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function ChatbotLayout({
  children,
  params,
}: PropsWithChildren<{ params: { workspaceSlug: string } }>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <TooltipProvider>
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center justify-between border-b px-4 lg:h-16 lg:px-6">
              <Link
                href={`/app/${params.workspaceSlug}`}
                className="flex items-center gap-2 font-semibold"
              >
                <Icons.logo className="w-24 h-10" />
                <span className="sr-only">Dokhub</span>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    aria-label="New chat"
                    variant="outline"
                    className="rounded-lg px-3"
                  >
                    <Icons.add className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  New chat
                </TooltipContent>
              </Tooltip>
            </div>
            <ScrollArea className="flex-1">
              <div className="grid items-start px-2 text-sm font-medium gap-2 lg:px-4">
                {/* Previous chat histories */}
                {chatHistory.map((chat) => (
                  <Link
                    key={chat.chatId}
                    href={`c/${chat.chatId}`}
                    className="flex items-center gap-3 rounded-lg bg-muted-foreground/30 px-3 py-2 text-muted-foreground transition-all hover:text-primary/80"
                  >
                    {chat.chatTitle}
                  </Link>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-auto p-4">
              {/*
              <Card x-chunk="dashboard-02-chunk-0">
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
              */}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <ChatHeader />
          {children}
        </div>
      </TooltipProvider>
    </div>
  );
}

const chatHistory = [
  {
    chatId: "1",
    chatTitle: "Hello there!",
    fullChat: [
      {
        role: "user",
        prompt: "Hello there!",
      },
      {
        role: "bot",
        prompt: "Hi! How can I help you today?",
      },
    ],
  },

  {
    chatId: "2",
    chatTitle: "Chat with Jane",
    fullChat: [
      {
        role: "user",
        prompt: "Chat with Jane Doe",
      },
      {
        role: "bot",
        prompt: "Hi Jane! How can I help you today?",
      },
    ],
  },

  {
    chatId: "1",
    chatTitle: "Hello there!",
    fullChat: [
      {
        role: "user",
        prompt: "Hello there!",
      },
      {
        role: "bot",
        prompt: "Hi! How can I help you today?",
      },
    ],
  },
];
