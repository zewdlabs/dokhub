import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight } from "lucide-react";

export default function ChatbotPage() {
  const userName = "Dr. John Doe";
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <Icons.dokbot fill="none" className="w-48 h-24" />
          <h3 className="text-2xl font-bold tracking-tight">
            Hi <span>{userName}</span>, {` `} How can I help you today?
          </h3>
        </div>
      </div>
      <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          className="resize-none border-0 p-3 text-base shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </form>
    </main>
  );
}
