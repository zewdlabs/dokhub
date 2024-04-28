import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/lib/query-provider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <QueryProvider>{children}</QueryProvider>
    </SessionProvider>
  );
}
