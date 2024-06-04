import { File, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import Link from "next/link";

export interface Organization {
  id: string;
  name: string;
  institutionLicenseNumber?: string;
  memberships: any[];
  posts: any[];
  createdAt: string;
  updatedAt: string;
}

export default async function PostsDashboardPageLayout({
  children,
}: PropsWithChildren) {
  const session = await auth();

  const orgs = (await (
    await fetch("http://localhost:4231/api/organization", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${session?.tokens.accessToken}`,
      },
    })
  ).json()) as Organization[];

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-1/2 rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Organizations</CardTitle>
            <CardDescription>All organizations in the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization Name</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Membership Count
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Post Count
                  </TableHead>
                  <TableHead className="text-right">Established Date</TableHead>
                  <TableHead className="text-right">Owner Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orgs.map((org) => (
                  <TableRow>
                    <TableCell>
                      <Link href={`/admin/posts/${org.id}`}>
                        <div className="font-medium">{org.name}</div>
                      </Link>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {org.memberships.length}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {org.posts.length}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Date(org.createdAt).toLocaleDateString()}
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
