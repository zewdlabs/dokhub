"use client";

import { Poppins } from "next/font/google";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Post } from "../../app/(app)/[workspaceSlug]/(home)/page";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card className="w-full p-4 md:pt-6">
      <div className="grid grid-cols-4 h-32">
        <CardHeader className="p-2 pb-3 col-span-3 w-full">
          <CardTitle className={poppins.className}>{post.title}</CardTitle>
          <CardDescription className="max-w-lg leading-relaxed">
            {post.description}
          </CardDescription>
        </CardHeader>
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src={post.imageUrl}
            fill={true}
            alt={post.title}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <CardFooter className="flex justify-between items-center pt-4">
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={post.user.avatarUrl}
              alt={`${post.user.prefix} ${post.user.name}`.trim()}
            />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <Icons.dot className="w-6 h-6 text-muted-foreground/75" />
          <span className="text-muted-foreground text-sm font-medium">
            {format(post.publishedAt, "MMM dd, yyyy")}
          </span>
          <Icons.dot className="w-6 h-6 text-muted-foreground/75" />
          <span className="text-muted-foreground text-sm font-medium">
            {post.minutesToRead}
          </span>
        </div>
        <div>
          <Button
            variant="ghost"
            className="px-3 hover:bg-transparent hover:text-muted-foreground"
          >
            <Icons.bookmarkplus className="w-5 h-5 hover:fill-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            className="px-3 hover:bg-transparent hover:text-muted-foreground"
          >
            <Icons.add className="w-5 h-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
