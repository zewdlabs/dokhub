"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function Overview() {
  const session = useSession();

  const { data: usersMonthly, isLoading: isUserMonthlyLoading } = useQuery({
    queryKey: ["users", "new", "monthly"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4231/api/user/stats/year`, {
        headers: {
          Authorization: `Bearer ${session.data?.tokens.accessToken}`,
        },
      });

      if (!res.ok) {
        return null;
      }

      const result = await res.json();
      console.log(result);

      return result as { newUsersThisMonth: number }[];
    },
  });

  if (isUserMonthlyLoading) {
    return <div>Loading ...</div>;
  }

  const fullData = data.map((entry, idx) => {
    return {
      name: entry.name,
      total: usersMonthly ? usersMonthly[idx].newUsersThisMonth : 0,
    };
  });

  return (
    <>
      <h2 className="text-2xl font-semibold p-2 pb-6">Overview</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={fullData}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
