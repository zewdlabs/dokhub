import Background from "@/components/custom/background";
import * as React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Background>
      <div className=" grid min-h-screen grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <aside className="border-border col-span-1 flex w-full items-center justify-center border px-3 backdrop-blur-[2px] md:p-6">
          <div className="w-full max-w-lg text-left">
            <h1 className="font-cal text-foreground mb-3 text-2xl text-center md:text-start">
              Welcome to Dokhub
            </h1>
            <p className="hidden md:block text-muted-foreground">
              Dokhub enables you to collaborate with other doctors and medical
              experts. It also enables you to access a state of the art AI
              system that can help you diagnose patients.
            </p>
          </div>
        </aside>
        <main className="container col-span-1 mx-auto flex items-center justify-center md:col-span-1 xl:col-span-2">
          {children}
        </main>
      </div>
    </Background>
  );
}
