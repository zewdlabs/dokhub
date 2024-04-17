import { AppHeader } from "@/components/custom/app-header";
import { PropsWithChildren } from "react";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppHeader />
      <main className="flex min-h-screen w-full flex-col items-center gap-8 p-4 md:p-8">
        {children}
      </main>
    </>
  );
}
