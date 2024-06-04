"use client";

import { useSession } from "next-auth/react";
import { TabsContent } from "@/components/ui/tabs";

export default function AboutCard({ tag }: { tag?: string }) {
  const session = useSession();

  return (
    <TabsContent
      value={tag || "about"}
      className="space-y-2 md:space-y-4 w-full"
    >
      <div>About card</div>
    </TabsContent>
  );
}
