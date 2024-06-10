"use client";

import { Post } from "@/components/custom/post-list";
import Tiptap from "@/components/custom/tiptap";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function WriterPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();

  const { data: postDetails, isLoading: isPostsLoading } = useQuery({
    queryKey: ["post", params.id],
    queryFn: async () => {
      const req = await fetch(`http://localhost:4231/api/posts/${params.id}`, {
        headers: {
          Authorization: `Bearer ${session?.tokens.accessToken}`,
        },
      });

      if (!req.ok) throw new Error("Failed to fetch posts");

      const data = (await req.json()) as Post;
      return data;
    },
  });

  if (isPostsLoading || status === "loading") return <div>Loading...</div>;

  return (
    <Tiptap
      id={params.id}
      title={postDetails?.title!}
      content={postDetails?.content!}
    />
  );
}
