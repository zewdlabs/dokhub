"use client";

import { Post } from "@/components/custom/post-list";
import { useQuery } from "@tanstack/react-query";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useEffect } from "react";
import { AppHeader } from "@/components/custom/app-header";
import PostAction from "@/components/custom/post-actions";
import PostInfo from "@/components/custom/post-info";
import { AppFooter } from "@/components/custom/footer";
import ReplyList from "@/components/custom/reply-list";
import { useSession } from "next-auth/react";

export default function Page({ params }: { params: { postId: string } }) {
  const session = useSession();

  const { data: postDetails, isLoading: isPostsLoading } = useQuery({
    queryKey: ["post", params.postId],
    queryFn: async () => {
      const req = await fetch(
        `http://localhost:4231/api/posts/${params.postId}`,
        {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${session.data?.tokens.accessToken}`,
          },
        },
      );
      if (!req.ok) throw new Error("Failed to fetch posts");

      const data = await req.json();

      return data as Post;
    },
  });

  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit.configure(),
      TextAlign.configure({
        defaultAlignment: "left",
        alignments: ["left", "center", "right", "justify"],
        types: ["heading", "paragraph"],
      }),
      Underline.configure(),
      Image.configure(),
      Link.configure({
        protocols: ["http", "https", "mailto"],
        openOnClick: "whenNotEditable",
        HTMLAttributes: {
          class: cn(
            buttonVariants({ variant: "link", className: "px-0 py-0" }),
          ),
        },
      }),
    ],
    content: postDetails?.content,
  });

  useEffect(() => {
    editor?.commands.setContent(postDetails?.content!);
  }, [editor, postDetails?.content]);

  return (
    <>
      <div className="pb-12 gap-8">
        <AppHeader />
        <PostInfo postDetails={postDetails} />
        <PostAction
          postId={params.postId}
          likes={postDetails?.postLikeCount}
          replies={postDetails?.replies.length}
        />
        {!isPostsLoading && postDetails && (
          <EditorContent
            editor={editor}
            className="px-8 prose max-w-screen-lg mx-auto md:px-24 py-12 min-h-[70vh]"
          />
        )}
        <PostAction
          postId={params.postId}
          likes={postDetails?.postLikeCount}
          replies={postDetails?.replies.length}
        />
        <ReplyList postId={params.postId} />
      </div>
      <AppFooter />
    </>
  );
}
