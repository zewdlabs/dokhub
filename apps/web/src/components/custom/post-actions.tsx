"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Ban, Check, Flag, Heart, Reply, Share } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function PostAction({
  postId,
  likes,
  replies,
}: {
  postId: string;
  likes?: number;
  replies?: number;
}) {
  const router = useRouter();

  const pathname = usePathname();
  const base = "http://localhost:3000";

  const session = useSession();

  const createReply = useMutation({
    mutationKey: ["createReply"],
    mutationFn: async ({ postId }: { postId: string }) => {
      const res = await fetch(
        `http://localhost:4231/api/posts/${postId}/reply`,
        {
          method: "POST",
          body: JSON.stringify({
            title: "Reply post",
            content: "<h1>Reply to the post</h1>",
            public: false,
            authorId: session.data?.user.id,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.tokens.accessToken}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create reply");
      }

      return await res.json();
    },
    onSuccess: (data: any) => {
      router.push(`/app/new/${data.id}`);
    },
  });

  return (
    <div className="container max-w-screen-lg px-24">
      <Separator orientation="horizontal" className="my-4" />
      <div className="flex  items-center justify-between">
        <div className=" flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Heart className="h-4 w-4" />
                <span className="sr-only">likes</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{likes} Likes</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => createReply.mutate({ postId })}
              >
                <Reply className="h-5 w-5" />
                <span className="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{replies} Replies</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6" />
        </div>
        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(base + pathname);
                  toast("Link copied to clipboard", {
                    icon: <Check size={"sm"} />,
                  });
                }}
              >
                <Share className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Ban className="h-5 w-5" />
                <span className="sr-only">Not interested</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Not interested</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Flag className="h-5 w-5" />
                <span className="sr-only">Report</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Report</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <Separator orientation="horizontal" className="my-2" />
    </div>
  );
}
