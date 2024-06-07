"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";

export default function ChatOption({ id }: { id: string }) {
  const handleDelete = useMutation({
    mutationKey: ["chat", id],
    mutationFn: async () => {
      const req = await fetch(`http://localhost:4231/api/chat/${id}`, {
        method: "DELETE",
      });

      if (!req.ok) {
        throw new Error("Network response was not ok");
      }
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-md">
          <p className="text-lg">&middot;&middot;&middot;</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuGroup>
          <form onSubmit={() => handleDelete.mutate()}>
            <button type="submit" className="w-full">
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </button>
          </form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
