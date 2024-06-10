"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { User } from "./users-table-list";

export default function RecommendedTopics() {
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
          <h2 className="text-lg font-semibold">Who to follow</h2>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="w-rull max-w-md rounded-lg">
          <div className="px-6 pt-6 pb-4">
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
      <div className="bg-transparent rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recommended Topics</h2>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Button variant={"ghost"} key={topic.title}>
            {topic.title}
          </Button>
        ))}
      </div>
    </form>
  );
}
