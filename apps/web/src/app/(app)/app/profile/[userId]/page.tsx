"use client";

import { useQuery } from "@tanstack/react-query";

export default function Page({ params }: { params: { userId: string } }) {
  const { data: userInformation, status } = useQuery({
    queryKey: ["user", params.userId],
    queryFn: async () => {
      const req = await fetch(
        `${process.env.BACKEND_URL}/api/users/${params.userId}`,
      );

      if (!req.ok) return null;

      return await req.json();
    },
  });

  return <div>{params.userId}</div>;
}
