"use client";

import { TabsContent } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { z } from "zod";
import { deleteUserSchema } from "@/types/schema";

export interface User {
  id: string;
  prefix?: string;
  name: string;
  email: string;
  followingCount: number;
  followedByCount: number;
  posts: any[];
  occupation?: string;
  createdAt: string;
  updatedAt: string;
  medicalLicenseNumber?: string;
  verificationStatus: string;
}

export default function UserTableList({ tag }: { tag?: string }) {
  const { data: session, status } = useSession();

  const { data: users, isLoading: isPostsLoading } = useQuery({
    queryKey: ["users", tag],
    queryFn: async () => {
      let res = null;
      if (tag === "not-verified") {
        res = await fetch(`http://localhost:4231/api/user/pending`, {
          headers: {
            Authorization: `Bearer ${session?.tokens.accessToken}`,
          },
        });
      } else {
        res = await fetch(`http://localhost:4231/api/user/verified`, {
          headers: {
            Authorization: `Bearer ${session?.tokens.accessToken}`,
          },
        });
      }

      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();

      return data as User[];
    },
  });

  const removeUser = useMutation({
    mutationKey: ["user"],
    mutationFn: async (values: z.infer<typeof deleteUserSchema>) => {
      const req = await fetch(`http://localhost:4231/api/user/${values.id}`, {
        headers: {
          Authorization: `Bearer ${session?.tokens.accessToken}`,
        },
        method: "DELETE",
      });
      if (!req.ok) throw new Error("Failed to publish post");
      return await req.json();
    },
  });

  const verify = useMutation({
    mutationKey: ["user"],
    mutationFn: async (values: z.infer<typeof deleteUserSchema>) => {
      const req = await fetch(`http://localhost:4231/api/user/${values.id}`, {
        headers: {
          Authorization: `Bearer ${session?.tokens.accessToken}`,
        },
        method: "PATCH",
        body: JSON.stringify({ verificationStatus: "VERIFIED" }),
      });
      if (!req.ok) throw new Error("Failed to publish post");
      return await req.json();
    },
  });

  return (
    <TabsContent
      value={tag || "verified"}
      className="space-y-2 md:space-y-4 w-full"
    >
      {isPostsLoading ? (
        "loading"
      ) : (
        <Card>
          <CardHeader className="px-7">
            <CardTitle>
              {!tag || tag === "verified" ? "Verified" : "Pending"} Users
            </CardTitle>
            <CardDescription>
              Users that are currently{" "}
              {!tag || tag === "verified" ? "Verified" : "Pending"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead> Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden sm:table-cell">Posts</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Followers
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Following
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Joined On
                  </TableHead>
                  <TableHead className="text-right">Occupation</TableHead>
                  <TableHead className="text-right">Medical License</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users &&
                  users?.map((user) => (
                    <TableRow>
                      <TableCell>
                        <Link href={`/admin/users/${user.id}`}>
                          {user.name}
                        </Link>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {user.email}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {user.posts?.length}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {user.followedByCount}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {user.followingCount}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {user.occupation}
                      </TableCell>
                      <TableCell className="text-right">
                        {user.medicalLicenseNumber}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <form
                              onSubmit={() => verify.mutate({ id: user.id })}
                            >
                              <DropdownMenuItem
                                disabled={
                                  user.verificationStatus === "VERIFIED"
                                }
                              >
                                <button type="submit">Approve</button>
                              </DropdownMenuItem>
                            </form>

                            <form
                              onSubmit={() =>
                                removeUser.mutate({ id: user.id })
                              }
                            >
                              <DropdownMenuItem>
                                <button type="submit">Remove</button>
                              </DropdownMenuItem>
                            </form>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </TabsContent>
  );
}
