"use client";

import Link from "next/link";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/custom/user-nav";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Icons.logo className="w-24 h-24" />
          <span className="sr-only"></span>
        </Link>
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Button
          variant="default"
          className="rounded-full flex items-center justify-center gap-2 ml-auto flex-1 sm:flex-initial"
        >
          <Icons.write className="w-4 h-4" />
          Write
        </Button>
        <UserNav />
      </div>
    </header>
  );
}
