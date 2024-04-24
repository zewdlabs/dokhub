"use client";

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
import type { Post } from "../../app/(app)/app/[workspaceSlug]/(home)/page";
import {
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card className="w-full p-4 md:pt-6">
      <Link href={`home`}>
        <div className="grid grid-cols-4">
          <CardHeader className="p-2 pb-3 col-span-3 w-full space-y-3">
            <CardTitle className="font-cal tracking-normal">
              {post.title}
            </CardTitle>
            <CardDescription className="max-w-lg leading-relaxed">
              {post.description}
            </CardDescription>
          </CardHeader>
          <div className="relative mr-4 rounded-lg h-36 overflow-hidden">
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
      </Link>
      <CardFooter className="flex justify-between items-center pt-2 pb-0 px-2 w-full">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-haspopup="true"
                variant="ghost"
                className="px-3 hover:bg-transparent hover:text-muted-foreground"
              >
                <Icons.option className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Add to library</DropdownMenuItem>
                <DropdownMenuItem>Not interested</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
