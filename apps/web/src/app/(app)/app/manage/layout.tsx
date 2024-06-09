import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AccountButton from "@/components/custom/account";
import ChatOption from "@/components/custom/chat-option";

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

  const orgsListOfUser = (await (
    await fetch(
      `http://localhost:4231/api/organization/ofuser/${session.user.id}`,
      {
        headers: {
          Authorization: `Bearer ${session.tokens.accessToken}`,
        },
      },
    )
  ).json()) as any[];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/app" className="flex items-center gap-2 font-semibold">
              <Icons.logo />
            </Link>
          </div>
          <div className="flex-1 overflow-y-scroll">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {session.user?.id && orgsListOfUser ? (
                orgsListOfUser.map(({ id, name }) => (
                  <div className="flex justify-between items-center">
                    <Link
                      key={id}
                      href={`/app/manage/${id}`}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "w-full justify-start",
                      )}
                    >
                      <span className="max-w-48 flex-nowrap text-nowrap overflow-hidden">
                        {name}
                      </span>
                    </Link>
                    <ChatOption id={id} />
                  </div>
                ))
              ) : (
                <div className="flex justify-between items-center">
                  <span className="max-w-48 flex-nowrap text-nowrap overflow-hidden">
                    No organizations found
                  </span>
                </div>
              )}
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
                  orgsListOfUser &&
                  orgsListOfUser.map(({ id }) => (
                    <Link
                      href={`/app/manage/${id}`}
                      className={cn(
                        params.id === id
                          ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                          : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      )}
                    >
                      <span className="max-w-56 flex-nowrap text-nowrap overflow-hidden">
                        New chat
                      </span>
                    </Link>
                  ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <AccountButton session={session} />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
