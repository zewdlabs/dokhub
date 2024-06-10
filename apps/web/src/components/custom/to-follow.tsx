"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { User } from "./users-table-list";
import { genFallback } from "@/lib/utils";

export default function ToFollowPeople() {
  const session = useSession();

  const { data: users, isLoading } = useQuery({
    queryKey: ["users", "to-follow"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:4231/api/user/tofollow/${session.data?.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${session.data?.tokens.accessToken}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("An error occurred while fetching users");
      }

      return ((await res.json()) as User[]).slice(0, 3);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-transparent rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Who to follow</h2>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 -mt-4">
        <div className="w-rull max-w-md rounded-lg">
          <div className="pb-4">
            <p className="text-gray-500 dark:text-gray-400">
              Suggested accounts to follow.
            </p>
          </div>
          <div>
            <div className="space-y-4">
              {users?.map((user) => <SingleCard key={user.id} user={user} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SingleCard({ user }: { user: User }) {
  const session = useSession();

  const handleFollow = useMutation({
    mutationKey: ["follow", user.id],
    mutationFn: async () => {
      const res = await fetch(`http://localhost:4231/api/user/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data?.tokens.accessToken}`,
        },
        body: JSON.stringify({
          userId: session.data?.user.id,
          userToFollowId: user.id,
        }),
      });
      if (!res.ok) {
        throw new Error("An error occurred while following user");
      }

      return (await res.json()) as User;
    },
  });
  return (
    <form onSubmit={() => handleFollow.mutate()}>
      <div
        onClick={() => handleFollow.mutate()}
        className="flex items-center space-x-4 min-w-80"
      >
        <Avatar className="flex-shrink-0">
          <AvatarImage src={user.profileUrl ?? undefined} alt={user.name} />
          <AvatarFallback>{genFallback(user.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {user.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {user.occupation}
          </div>
        </div>
        <Button variant="outline" size="sm" type="submit">
          Follow
        </Button>
      </div>
    </form>
  );
}
