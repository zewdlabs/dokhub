"use client";

import Link from "next/link";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Suspense } from "react";

export default function Hero() {
  return (
    <div className="my-10 flex w-full flex-col justify-center gap-1 px-3 py-4 text-center max-w-screen-xl mx-auto md:my-20 md:p-6">
      <div>
        <Badge variant="outline" className="backdrop-blur-[2px]">
          <Link
            href="#"
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
          >
            Announcing Dokhub v1.0
            <Icons.chevronRight className="ml-1 h-3 w-3" />
          </Link>
        </Badge>
      </div>
      <div className="flex flex-col gap-6">
        <h1
          className={cn(
            "text-foreground font-cal text-4xl md:text-6xl",
            "bg-gradient-to-tl from-[hsl(var(--muted))] from-0% to-[hsl(var(--foreground))] to-40% bg-clip-text text-transparent",
          )}
        >
          Collaborate with others, get assistance from state-of-the-art AI
        </h1>
        <p className="text-muted-foreground mx-auto max-w-md text-lg md:max-w-xl md:text-xl">
          Connect with other doctors and medical experts from all over the world
          and get access to a state-of-the-art AI system that can help you with
          diagnosis among other crucial tasks.
        </p>
      </div>
      <div className="my-4 grid gap-2 sm:grid-cols-2">
        <div className="text-center sm:block sm:text-right">
          <Link
            href="/auth/signup"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-48 rounded-full sm:w-auto",
            )}
          >
            Get Started
          </Link>
        </div>
        <div className="text-center sm:block sm:text-left">
          <Button
            variant="outline"
            className="w-48 rounded-full sm:w-auto"
            onClick={() => {
              document.getElementById("testimonials")?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "center",
              });
            }}
          >
            See what others are saying
            <Suspense
              fallback={
                <Badge variant="secondary" className="ml-1">
                  ~
                </Badge>
              }
            ></Suspense>
          </Button>
        </div>
      </div>
    </div>
  );
}
