"use client";
import { Icons } from "../icons";
import { Input } from "../ui/input";
import { searchSchema } from "@/types/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Post } from "./post-list";
import PostCard from "./post-card";

export default function SearchForm() {
  const session = useSession();

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  const submitSearch = useMutation({
    mutationKey: ["search"],
    mutationFn: async ({ query }: { query: string }) => {
      const res = await fetch(
        `http://localhost:4231/api/posts/search/${query}`,
        {
          headers: {
            Authorization: `Bearer ${session.data?.tokens.accessToken}`,
          },
        },
      );

      if (!res.ok) {
        toast.error("Something went wrong");
        return;
      }

      return (await res.json()) as Post[];
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <>
      <Form {...form}>
        <form
          className="max-w-5xl px-2 mx-auto z-50"
          onSubmit={form.handleSubmit((data) =>
            submitSearch.mutate({ ...data }),
          )}
          ref={formRef}
        >
          <div className="relative">
            <Icons.search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="pl-8 ring-1 ring-muted-foreground/20"
                      id="query"
                      type="search"
                      placeholder="Search for posts..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          formRef.current?.requestSubmit();
                        }
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      {submitSearch.isIdle && submitSearch.isError && (
        <div className="text-red-500 text-sm text-center"></div>
      )}

      {submitSearch.isPending && (
        <div className="text-muted-foreground text-sm text-center"></div>
      )}

      {submitSearch.isSuccess && (
        <>
          <p className="text-green-500 px-8">Search results</p>
          <div className="text-green-500 text-sm text-center flex flex-col items-center">
            {submitSearch.data?.map((post) => (
              <PostCard key={post.id} post={post} tag="search" />
            ))}
          </div>
        </>
      )}
    </>
  );
}

