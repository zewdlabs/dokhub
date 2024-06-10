"use client";

import { AppHeader } from "@/components/custom/app-header";
import { PropsWithChildren } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { genFallback } from "@/lib/utils";
import { User } from "@/components/custom/users-table-list";

export default function ProfileLayout({ children }: PropsWithChildren) {
  const { data: session, status } = useSession();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", session?.user?.id],
    queryFn: async () => {
      const res = await fetch(
        // `${process.env.BACKEND_URL}/api/user/${session?.data?.user?.id}`,
        `http://localhost:4231/api/user/${session?.user?.id}`,
        {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${session?.tokens?.accessToken}`,
          },
        },
      );

      if (!res.ok) return null;

      return (await res.json()) as User;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppHeader />
      <div className="container flex gap-10">
        <main className="flex min-h-screen md:w-4/6 flex-col gap-8 p-4 md:p-8">
          <h1 className="text-4xl font-bold">{userData?.name}</h1>
          <Separator orientation="horizontal" />
          {children}
        </main>
        <Separator orientation="vertical" className="h-screen" />
        <aside className="hidden md:flex min-h-screen md:w-2/6  flex-col gap-4 md:p-8">
          {/* TODO: If you can make it a placeholder, it would be better */}
          {status == "authenticated" ? (
            <div className="flex flex-col gap-4">
              <Avatar className="h-28 w-28 mb-4">
                <AvatarImage
                  src={userData?.profileUrl ?? undefined}
                  alt={userData?.name}
                  width={40}
                  height={40}
                  className="w-28 h-28 object-cover"
                />
                <AvatarFallback>
                  {genFallback(userData?.name ?? "User")}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-4xl font-bold">{userData?.name}</h1>
              <div className="flex gap-4">
                <p className="text-lg">Following: {userData?.followingCount}</p>
                <p className="text-lg">
                  Followers: {userData?.followedByCount}
                </p>
              </div>
              <Separator orientation="horizontal" />
              <p className="text-lg">{userData?.email}</p>
              <p>{userData?.bio}</p>
              <Separator orientation="horizontal" />
              <p className="text-lg">
                {userData?.yearsOfExperience} years of experience
              </p>
              <p className="text-lg font-semibold">
                Occupation:{" "}
                <span className="text-base font-normal">
                  {userData?.occupation}
                </span>
              </p>
              {userData?.verificationStatus === "VERIFIED" && (
                <p className="text-lg font-semibold">
                  Medical License Number:{" "}
                  <span className="text-base font-normal">
                    {userData?.medicalLicenseNumber}
                  </span>
                </p>
              )}
            </div>
          ) : null}
        </aside>
      </div>
    </>
  );
}
