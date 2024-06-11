import { File, ListFilter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PropsWithChildren } from "react";
import { auth } from "@/auth";
import { Post } from "@/components/custom/post-list";
import Link from "next/link";

export default async function PostsDashboardPageLayout({
  children,
}: PropsWithChildren) {
  const session = await auth();

  const posts = (await (
    await fetch("http://localhost:4231/api/posts", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${session?.tokens.accessToken}`,
      },
    })
  ).json()) as Post[];

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
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
                {posts.map((post) => (
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {children}
    </main>
  );
}
