"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Ban, Check, Flag, Heart, Reply, Share } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { object } from "zod";

export default function PostAction({
  likes,
  replies,
}: {
  likes?: number;
  replies?: number;
}) {
  const pathname = usePathname();
  const base = "http://localhost:3000";
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
              <Button variant="ghost" size="icon">
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
