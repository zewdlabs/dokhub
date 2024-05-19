import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import Link from "next/link";
import { CircleUser, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title:
    "Dokbot | Chat with state-of-the-art AI for diagnosis and other crucial tasks, ultimately enhancing patient care.",
};

export default async function ChatLayout({
  children,
  params,
}: PropsWithChildren<{ params: { id: string } }>) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const chatHistoryIDs: string[] = [];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Icons.dokbot fill="none" className="w-24" />
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Icons.add className="h-4 w-4" />
              <span className="sr-only">Start a new chat</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {session?.user?.id &&
                chatHistoryIDs &&
                chatHistoryIDs.map((id) => (
                  <Link
                    href={`/app/c/${id}`}
                    className={cn(
                      params.id === id
                        ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                        : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    )}
                  >
                    <span className="max-w-56 flex-nowrap text-nowrap overflow-hidden">
                      Chat with AI
                    </span>
                  </Link>
                ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {session?.user?.id &&
                  chatHistoryIDs &&
                  chatHistoryIDs.map((id) => (
                    <Link
                      href={`/app/c/${id}`}
                      className={cn(
                        params.id === id
                          ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                          : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      )}
                    >
                      <span className="max-w-56 flex-nowrap text-nowrap overflow-hidden">
                        Chat with AI
                      </span>
                    </Link>
                  ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
