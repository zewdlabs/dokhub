import { MarketingHeader } from "@/components/custom/header";
import { PropsWithChildren } from "react";

export default function WriterLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MarketingHeader />
      <main className="flex min-h-screen w-full flex-col items-center gap-8 p-4 md:p-8">
        {children}
      </main>
    </>
  );
}
