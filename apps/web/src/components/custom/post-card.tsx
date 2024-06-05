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

import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import { Post } from "./post-list";
import { useSession } from "next-auth/react";

export default function PostCard({ post, tag }: { post: Post; tag: string }) {
  const session = useSession();

  return (
    <Card className="w-full p-4 md:pt-6">
      <Link
        href={`/app/${
          tag !== "published" && tag !== "drafts" ? "posts" : "new"
        }/${post.id}`}
      >
        <div className="grid grid-cols-4">
          <CardHeader className="p-2 pb-3 col-span-3 w-full space-y-3">
            <CardTitle className="font-cal tracking-normal">
              {post.title}
            </CardTitle>
            <CardDescription className="max-w-lg leading-relaxed">
              {post.description || "Lorem ipsum dolor sit amet"}
            </CardDescription>
          </CardHeader>
          <div className="relative mr-4 rounded-lg h-36 overflow-hidden">
            <Image
              src={
                "https://images.unsplash.com/photo-1478144592103-25e218a04891?q=80&w=2275&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
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
            <AvatarImage src={undefined} alt={""} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <Icons.dot className="w-6 h-6 text-muted-foreground/75" />
          <span className="text-muted-foreground text-sm font-medium">
            {new Date(post.publishedAt).toLocaleDateString()}
          </span>
          <Icons.dot className="w-6 h-6 text-muted-foreground/75" />
          <span className="text-muted-foreground text-sm font-medium">
            {post.minToRead}
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
                <DropdownMenuItem
                  disabled={
                    tag === "published" &&
                    post.authorId !== session.data?.user.id
                  }
                >
                  <Link href={`/app/new/${post.id}`}>Edit</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
