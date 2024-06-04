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

export default function Page({ params }: { params: { postId: string } }) {
  const { data: postDetails, isLoading: isPostsLoading } = useQuery({
    queryKey: ["post", params.postId],
    queryFn: async () => {
      const req = await fetch(
        `http://localhost:4231/api/posts/${params.postId}`,
        { cache: "no-store" },
      );
      if (!req.ok) throw new Error("Failed to fetch posts");

      const data = await req.json();

      console.log(data);

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
      {!isPostsLoading && postDetails && (
        <EditorContent
          editor={editor}
          className="px-8 prose max-w-none md:px-24 py-12 min-h-[70vh] border border-t-0"
        />
      )}
    </>
  );
}
