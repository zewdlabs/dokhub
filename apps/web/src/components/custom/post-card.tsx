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
import { useMutation } from "@tanstack/react-query";
import { addToLibrarySchema, deletePostSchema } from "@/types/schema";
import { z } from "zod";
import { genFallback } from "@/lib/utils";
import { toast } from "sonner";

export default function PostCard({ post, tag }: { post: Post; tag: string }) {
  const session = useSession();

  const removePost = useMutation({
    mutationKey: ["post", post.id, "remove"],
    mutationFn: async (values: z.infer<typeof deletePostSchema>) => {
      const req = await fetch(`http://localhost:4231/api/posts/${values.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.data?.tokens.accessToken}`,
        },
      });
      if (!req.ok) throw new Error("Failed to publish post");
      return await req.json();
    },
  });

  const addToLibrary = useMutation({
    mutationKey: ["post", post.id, "add"],
    mutationFn: async (values: z.infer<typeof addToLibrarySchema>) => {
      const req = await fetch(
        `http://localhost:4231/api/posts/${values.postId}/addtolibrary/${values.userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.data?.tokens.accessToken}`,
          },
        },
      );
      if (!req.ok) throw new Error("Failed to publish post");
      return await req.json();
    },
    onSuccess: () => {
      toast.success("Post added to library");
    },
  });

  const removePostFromLibrary = useMutation({
    mutationKey: ["post", post.id, "remove"],
    mutationFn: async (values: z.infer<typeof addToLibrarySchema>) => {
      const req = await fetch(
        `http://localhost:4231/api/posts/${values.postId}/removefromlibrary/${values.userId}`,
        {
          headers: {
            Authorization: `Bearer ${session.data?.tokens.accessToken}`,
          },
          method: "DELETE",
        },
      );

      if (!req.ok) throw new Error("Failed to publish post");
      return await req.json();
    },
    onSuccess: () => {
      toast.success("Post removed from library");
    },
  });

  return (
    <Card className="w-full p-4 md:pt-6 max-w-screen-md">
      <Link href={`/app/${tag !== "drafts" ? "posts" : "new"}/${post.id}`}>
        <div className="grid grid-cols-5">
          <CardHeader className="p-2 pb-3 col-span-3 w-full space-y-3">
            <CardTitle className="font-cal tracking-normal">
              {post.title}
            </CardTitle>
            <CardDescription className="max-w-lg leading-relaxed">
              {post.description || "No description available"}
            </CardDescription>
          </CardHeader>
          <div className="relative mr-4 col-span-2 rounded-lg h-36 w-72 overflow-hidden">
            <Image
              src={post.postImage ?? "/placeholder.png"}
              fill={true}
              className="object-cover w-60 h-full"
              alt={post.title}
            />
          </div>
        </div>
      </Link>
      <CardFooter className="flex justify-between items-center pt-2 pb-0 px-2 w-full">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              src={post.author.profileUrl ?? undefined}
              alt={post.author.name}
              className="w-10 h-10 object-cover"
            />
            <AvatarFallback>{genFallback(post.author.name)}</AvatarFallback>
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
          {post.authorId != session.data?.user.id && (
            <Button
              variant="ghost"
              className="px-3 hover:bg-transparent hover:text-muted-foreground"
              onClick={() =>
                tag === "library"
                  ? removePostFromLibrary.mutate({
                      postId: post.id,
                      userId: session.data?.user.id!,
                    })
                  : addToLibrary.mutate({
                      postId: post.id,
                      userId: session.data?.user.id!,
                    })
              }
            >
              {tag === "library" ? (
                <Icons.bookmarkminus className="w-5 h-5 hover:fill-muted-foreground" />
              ) : (
                <Icons.bookmarkplus className="w-5 h-5 hover:fill-muted-foreground" />
              )}
            </Button>
          )}
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
                {post.authorId === session.data?.user.id ? (
                  <>
                    <DropdownMenuItem>
                      <Link href={`/app/new/${post.id}`}>Edit</Link>
                    </DropdownMenuItem>
                    <form
                      onSubmit={() =>
                        removePost.mutate({
                          id: post.id,
                        })
                      }
                    >
                      <DropdownMenuItem>
                        <button type="submit">Delete</button>
                      </DropdownMenuItem>
                    </form>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>Not interested</DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
