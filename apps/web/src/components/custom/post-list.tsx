"use client";

import { TabsContent } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import PostCard from "@/components/custom/post-card";
import { useQuery } from "@tanstack/react-query";

export interface Post {
  slug: string;
  title: string;
  content: string;
  published: boolean;
  description: string;
  imageUrl: string;
  user: {
    avatarUrl: string;
    prefix?: string;
    name: string;
  };
  minutesToRead: number;
}

export default function PostList({ tag }: { tag?: string }) {
  const { data: session, status } = useSession();

  const { data: posts, isLoading: isPostsLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const req = await fetch(
        `${process.env.BACKEND_URL}/api/posts/user/clvwebzk40001thm1nq9rjqul`,
      );
      if (!req.ok) throw new Error("Failed to fetch organizations");

      return (await req.json()) as Post[];
    },
  });

  return (
    <TabsContent
      value={tag || "foryou"}
      className="space-y-2 md:space-y-4 w-full"
    >
      {posts &&
        posts.map((post) => <PostCard post={post} key={post.imageUrl} />)}
    </TabsContent>
  );
}
