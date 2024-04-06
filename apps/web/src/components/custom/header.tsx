"use client";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 left-0 backdrop-blur-3xl border-b-[1px] border-border z-50 items-center">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <Icons.logo className="w-28 h-20" />
        </Link>
        <nav className="flex justify-between items-center">
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
          <Link
            href="#testimonials"
            className={cn(
              buttonVariants({ variant: "link", className: "no-underline" }),
              "text-base text-neutral-950 hover:text-primary ease-in transition-colors",
            )}
          >
            Testimonials
          </Link>
        </nav>
        <Link
          href="/auth/signin"
          className={cn(
            buttonVariants({ variant: "default" }),
            "rounded-full bg-primary hover:bg-primary/90",
          )}
        >
          Sign in
        </Link>
      </div>
    </header>
  );
}
