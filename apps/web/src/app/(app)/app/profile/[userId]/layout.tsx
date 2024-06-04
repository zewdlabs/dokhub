"use client";

import { AppHeader } from "@/components/custom/app-header";
import { PropsWithChildren } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";

export default function ProfileLayout({ children }: PropsWithChildren) {
  const { data: session, status } = useSession();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", session?.user?.id],
    queryFn: async () => {
      const res = await fetch(
        // `${process.env.BACKEND_URL}/api/user/${session?.data?.user?.id}`,
        `http://localhost:4231/api/user/${session?.user?.id}`,
        {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${session?.tokens?.accessToken}`,
          },
        },
      );

      if (!res.ok) return null;

      return await res.json();
    },
  });

  return (
    <>
      <AppHeader />
      <div className="container flex gap-10">
        <main className="flex min-h-screen w-4/6 flex-col gap-8 p-4 md:p-8">
          <h1 className="text-4xl font-bold">{userData?.name}</h1>
          <Separator orientation="horizontal" />
          {children}
        </main>
        <Separator orientation="vertical" className="h-screen" />
        <aside className="min-h-screen w-2/6 flex flex-col gap-4 md:p-8">
          {/*
          <Image
            width={96}
            height={96}
            src={""}
            alt={userData?.name}
            className="rounded-md w-16 h-16 object-cover 2xl:w-28 2xl:h-28"
          />
          */}
        </aside>
      </div>
    </>
  );
}
