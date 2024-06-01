"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MarketingHeader() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 left-0 backdrop-blur-3xl border-b-[1px] border-border z-50 items-center">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <Icons.logo className="w-28 h-20" />
        </Link>
        {!pathname.startsWith("/pricing") && (
          <nav className={cn("hidden md:flex justify-between items-center")}>
            <Button
              variant="link"
              className={cn(
                "text-base text-neutral-950 hover:text-primary ease-in transition-colors",
              )}
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "center",
                });
              }}
            >
              Features
            </Button>
            <Link
              href="/pricing"
              className={cn(
                buttonVariants({ variant: "link", className: "no-underline" }),
                "text-base text-neutral-950 hover:text-primary ease-in transition-colors",
              )}
            >
              Pricing
            </Link>
            <Link
              href="/pricing"
              className={cn(
                buttonVariants({ variant: "link", className: "no-underline" }),
                "text-base text-neutral-950 hover:text-primary ease-in transition-colors",
              )}
            >
              Blog
            </Link>
            <Button
              variant="link"
              className={cn(
                "text-base text-neutral-950 hover:text-primary ease-in transition-colors",
              )}
              onClick={() => {
                document.getElementById("testimonials")?.scrollIntoView({
                  behavior: "smooth",
                  inline: "start",
                  block: "start",
                });
              }}
            >
              Testimonials
            </Button>
          </nav>
        )}
        {status === "authenticated" && session ? (
          <Link
            href="/app"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-full bg-primary hover:bg-primary/90 hidden md:flex items-center justify-center ease-in transition-colors",
            )}
          >
            Dashboard
          </Link>
        ) : status === "unauthenticated" ? (
          <Link
            href="/auth/signin"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-full bg-primary hover:bg-primary/90 hidden md:flex items-center justify-center ease-in transition-colors",
            )}
          >
            Sign in
          </Link>
        ) : status === "loading" ? (
          <Skeleton className="w-20 h-10" />
        ) : null}
      </div>
    </header>
  );
}
