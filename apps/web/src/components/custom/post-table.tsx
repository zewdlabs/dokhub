"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Post } from "./post-list";
import Link from "next/link";

export default function PostTable() {
  const session = useSession();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", "published"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4231/api/posts", {
        headers: {
          Authorization: `Bearer ${session.data?.tokens.accessToken}`,
        },
      });

      if (!res.ok) {
        return [];
      }

      return (await res.json()) as Post[];
    },
  });

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Posts</CardTitle>
        <CardDescription>All posts in the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PostName</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">
                Published Date
              </TableHead>
              <TableHead className="text-right">Writer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading ? (
              posts ? (
                posts.map((post) => (
                  <TableRow
                  // className={cn("bg-accent")}
                  >
                    <TableCell>
                      <Link href={`/admin/posts/${post.id}`}>
                        <div className="font-medium">{post.title}</div>
                      </Link>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {post.public ? "Public" : "Private"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {post.author.name}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <div>No posts</div>
              )
            ) : (
              <div>Loading...</div>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
