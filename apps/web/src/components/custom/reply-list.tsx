"use client";

import PostCard from "@/components/custom/post-card";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Post } from "./post-list";
import Link from "next/link";

export default function ReplyList({ postId }: { postId: string }) {
  const session = useSession();
  const replies = useQuery({
    queryKey: ["replies", postId],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:4231/api/posts/${postId}/reply`,
        {
          headers: {
            Authorization: `Bearer ${session.data?.tokens.accessToken}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("An error occurred while fetching replies");
      }

      return await res.json();
    },
  });

  if (replies.isLoading) {
    return <div className="container">Loading...</div>;
  }

  if (replies.isError) {
    return <div className="container">Error fetching replies</div>;
  }

  return (
    <div className="container flex flex-col gap-4 items-center py-8">
      {replies.data.map((reply: Post) => (
        <Link href={`/app/posts/${reply.id}`} key={reply.id} className="w-fit">
          <PostCard post={reply} tag="replies" />
        </Link>
      ))}
    </div>
  );
}
