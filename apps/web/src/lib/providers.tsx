"use client";

import type { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </TooltipProvider>
    </SessionProvider>
  );
}
