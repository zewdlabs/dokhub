"use client";

import Link from "next/link";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import AccountButton from "@/components/custom/account";

export function AppHeader() {
  return (
    <header className="sticky top-0 left-0 backdrop-blur-3xl border-b-[1px] border-border z-50 items-center">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Icons.logo className="w-28 h-20" />
          </Link>
          <Separator orientation="vertical" className="h-8" />
          <span className="text-center">Drafts in Solomon Tesfaye</span>
        </div>
        <div className="flex items-center gap-4 ">
          <Link
            href="/new"
            className={cn(
              buttonVariants({ variant: "default" }),
              "hidden md:flex md:gap-2 md:items-center md:justify-center rounded-full",
            )}
          >
            Publish
          </Link>
          <AccountButton />
        </div>
      </div>
    </header>
  );
}
