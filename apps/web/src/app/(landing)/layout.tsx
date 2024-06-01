import Background from "@/components/custom/background";
import { MarketingFooter } from "@/components/custom/footer";
import { MarketingHeader } from "@/components/custom/header";
import type { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Background>
        <MarketingHeader />
        <main className="flex min-h-screen w-full flex-col items-center justify-center gap-8 p-4 md:p-8">
          <div className="mx-auto flex flex-1 flex-col items-start justify-center">
            {children}
          </div>
        </main>
        <MarketingFooter />
      </Background>
    </>
  );
}
