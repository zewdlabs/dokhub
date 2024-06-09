"use client";

import AboutCard from "@/components/custom/about-card";
import PostList from "@/components/custom/post-list";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function Page() {
  const session = useSession();
  const { data: userInformation, status } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      const req = await fetch(
        // `${process.env.BACKEND_URL}/api/user/${session.data?.user.id}`,
        `http://localhost:4231/api/user/${session.data?.user.id}`,
        {
          cache: "no-cache",
          headers: {
            Authorization: `Bearer ${session.data?.tokens.accessToken}`,
          },
        },
      );

      if (!req.ok) return null;

      return await req.json();
    },
  });

  return (
    <>
      <Tabs
        defaultValue="library"
        className="flex flex-col items-start gap-4 w-full"
      >
        <TabsList className="z-40 bg-transparent w-full flex justify-start">
          <TabsTrigger
            value="library"
            className="px-3 text-base py-2 bg-transparent"
          >
            Library
          </TabsTrigger>
          <TabsTrigger
            value="published"
            className="px-3 text-base py-2 bg-transparent"
          >
            Published
          </TabsTrigger>
          <Separator orientation="vertical" />
          <TabsTrigger
            value="drafts"
            className="px-3 text-base py-2 bg-transparent"
          >
            Drafts
          </TabsTrigger>
          <Separator orientation="vertical" />
        </TabsList>
        <PostList tag="published" />
        <PostList tag="drafts" />
        <PostList tag="library" />
      </Tabs>
    </>
  );
}
