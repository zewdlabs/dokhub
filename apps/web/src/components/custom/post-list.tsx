"use client";

import { TabsContent } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import PostCard from "@/components/custom/post-card";
import { useQuery } from "@tanstack/react-query";

export interface Post {
  id: string;
  title: string;
  description: string | null;
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
    queryKey: ["posts", tag, session?.user.id],
    queryFn: async () => {
      let res = null;
      if (tag === "published") {
        res = await fetch(
          // `${process.env.BACKEND_URL}/api/posts/published/${userId}`,
          `http://localhost:4231/api/posts/published/${session?.user.id}`,
        );
      } else if (tag === "drafts") {
        res = await fetch(
          // `${process.env.BACKEND_URL}/api/posts/drafts/${userId}`,
          `http://localhost:4231/api/posts/drafts/${session?.user.id}`,
        );
      } else if (tag === "following") {
        res = await fetch(
          `http://localhost:4231/api/posts/following/${session?.user.id}`,
          // `${process.env.BACKEND_URL}/api/posts/following/${userId}`,
        );
      } else {
        res = await fetch(
          `http://localhost:4231/api/posts/foryou/${session?.user.id}`,
          // `${process.env.BACKEND_URL}/api/posts/foryou/${userId}`,
        );
      }

      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();

      console.log("from posts of specific user", data);

      return data as Post[];
    },
  });

  return (
    <TabsContent
      value={tag || "foryou"}
      className="space-y-2 md:space-y-4 w-full"
    >
      {isPostsLoading
        ? "loading"
        : posts && posts.map((post) => <PostCard post={post} key={post.id} />)}
    </TabsContent>
  );
}
