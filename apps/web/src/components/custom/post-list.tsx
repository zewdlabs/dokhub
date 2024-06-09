"use client";

import { TabsContent } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import PostCard from "@/components/custom/post-card";
import { useQuery } from "@tanstack/react-query";

export interface Post {
  author: {
    name: string;
    email: string;
    yearsOfExperience: string;
  };
  id: string;
  reportedAmount: number;
  replies: any[];
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
  const { data: session } = useSession();

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
      } else if (tag === "library") {
        res = await fetch(
          `http://localhost:4231/api/posts/library/${session?.user.id}`,
          // `${process.env.BACKEND_URL}/api/posts/library/${userId}`,
        );
      } else {
        res = await fetch(
          `http://localhost:4231/api/posts/foryou/${session?.user.id}`,
          // `${process.env.BACKEND_URL}/api/posts/foryou/${userId}`,
        );
      }

      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();

      return data as Post[];
    },
  });

  return (
    <TabsContent
      value={tag || "foryou"}
      className="space-y-2 md:space-y-4 w-full"
    >
      {isPostsLoading ? (
        "loading"
      ) : posts?.length ? (
        posts.map((post) => (
          <PostCard tag={tag || "foryou"} post={post} key={post.id} />
        ))
      ) : (
        <div className="px-4 text-base">No posts found in {tag}</div>
      )}
    </TabsContent>
  );
}
