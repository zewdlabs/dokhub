"use client";

import { TabsContent } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import PostCard from "@/components/custom/post-card";
import { useQuery } from "@tanstack/react-query";

export interface Post {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  minToRead: string;
  public: boolean;
  authorId: string;
  replyToPostId: string | null;
  postLikeCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function PostList({ tag }: { tag?: string }) {
  const { data: session, status } = useSession();

  const { data: posts, isLoading: isPostsLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const req = await fetch(
        `http://localhost:4231/api/posts/user/clw89boh10000ssl1b3m9azg6`,
      );
      if (!req.ok) throw new Error("Failed to fetch posts");

      const data = await req.json();

      console.log("from posts of specific user", data);

      return data as Post[];
    },
  });

  return (
    <TabsContent
      value={tag || "foryou"}
      className="space-y-2 md:space-y-4 w-full"
    >
      {posts && posts.map((post) => <PostCard post={post} key={post.id} />)}
    </TabsContent>
  );
}
