"use client";

import { Copy, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { deleteOrgSchema } from "@/types/schema";
import { revalidateTag } from "next/cache";
import { Organization } from "./layout";

export default function Dashboard({
  params,
}: {
  params: { organizationId: string };
}) {
  const session = useSession();

  const removePost = useMutation({
    mutationKey: ["org", params.organizationId],
    mutationFn: async (values: z.infer<typeof deleteOrgSchema>) => {
      const req = await fetch(
        `http://localhost:4231/api/organization/${values.id}`,
        {
          method: "DELETE",
        },
      );
      if (!req.ok) throw new Error("Failed to publish post");
      return await req.json();
    },
    onSuccess: () => {
      revalidateTag("post");
    },
  });

  const { data: orgData, isLoading } = useQuery({
    queryKey: ["org", params.organizationId],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:4231/api/organization/${params.organizationId}`,
        {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${session.data?.tokens.accessToken}`,
          },
        },
      );

      if (!res.ok) {
        return null;
      }

      return (await res.json()) as Organization;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(orgData);

  return (
    <div>
      <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Organization: {orgData?.name}
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy Order ID</span>
              </Button>
            </CardTitle>
            <CardDescription>
              Date: {new Date(orgData!.createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuSeparator />
                <form
                  onClick={() =>
                    removePost.mutate({
                      id: params.organizationId,
                    })
                  }
                >
                  <DropdownMenuItem>
                    <button type="submit">Trash</button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Basic Information</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Name of Organization
                </span>
                <span>{orgData?.name}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Established Date</span>
                <span>{new Date(orgData!.createdAt).toLocaleDateString()}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Owner</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated{" "}
            <time dateTime="2023-11-23">
              {new Date(orgData!.updatedAt).toLocaleDateString()}
            </time>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
