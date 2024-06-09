"use client";

import Link from "next/link";
import { Icons } from "@/components/icons";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import AccountButton from "@/components/custom/account";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { publishFormSchema } from "@/types/schema";

export function EditorHeader({ id }: { id: string }) {
  const { data: session, status } = useSession();

  const [publishModalOpen, setPublishModalOpen] = useState(false);

  const form = useForm<z.infer<typeof publishFormSchema>>({
    resolver: zodResolver(publishFormSchema),
    defaultValues: {
      publishPublic: false,
    },
  });

  const client = useQueryClient();

  const publishPost = useMutation({
    mutationFn: async (values: z.infer<typeof publishFormSchema>) => {
      const req = await fetch(`http://localhost:4231/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publishedAt: new Date().toJSON(),
          public: values.publishPublic,
          title: values.previewTitle,
          description: values.previewSubtitle,
        }),
      });
      if (!req.ok) throw new Error("Failed to publish post");
      return await req.json();
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["posts", "drafts", session?.user.id],
      });
    },
  });

  function onSubmit(values: z.infer<typeof publishFormSchema>) {
    publishPost.mutate(values, {
      onSuccess: () => {
        toast.success("Post published successfully");
        setPublishModalOpen(false);
      },
      onError: () => {
        toast.error("Failed to publish post");
      },
    });
  }

  return (
    <header className="sticky top-0 left-0 backdrop-blur-3xl border-b-[1px] border-border z-50 items-center">
      <div className="container px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/app">
            <Icons.logo className="w-28 h-20" />
          </Link>
          <Separator orientation="vertical" className="h-8" />
          <Input value={"Title"} readOnly />
        </div>
        <div className="flex items-center gap-4 ">
          <Dialog open={publishModalOpen} onOpenChange={setPublishModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="hidden md:flex md:gap-2 md:items-center md:justify-center rounded-full"
              >
                Publish
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Publish Post</DialogTitle>
                <DialogDescription>
                  Edit post information and choose where to publish it.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="publishPublic"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div>
                          <FormLabel>Publish mode</FormLabel>
                          <FormDescription>
                            Turn this on if you want the post to go public.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="previewTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <FormControl>
                          <Input id="title" type="text" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="previewSubtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtitle</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Small description for the post"
                            className="resize-none"
                            maxLength={200}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      variant="default"
                      className="hidden md:flex md:gap-2 md:items-center md:justify-center rounded-full"
                      type="submit"
                    >
                      Publish Now
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          {status === "authenticated" && <AccountButton session={session} />}
        </div>
      </div>
    </header>
  );
}

export function AppHeader() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 left-0 backdrop-blur-3xl gap-4 px-4 md:px-6 border-b-[1px] border-border z-50 items-center">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/app">
            {pathname.startsWith("/app/c") ? (
              <Icons.dokbot fill="none" className="w-28" />
            ) : (
              <Icons.logo className="w-28 h-16" />
            )}
          </Link>
        </div>
        <div className="flex items-center gap-4 ">
          {status === "authenticated" && !pathname.startsWith("/app/c") && (
            <Link
              href="/app/c"
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "flex items-center justify-center gap-2 rounded-lg px-2 py-4",
              )}
            >
              <Icons.chat className="w-6 h-6" />
            </Link>
          )}
          <Link
            href="/app/new"
            className={cn(
              buttonVariants({ variant: "default" }),
              "hidden md:flex md:gap-2 md:items-center md:justify-center rounded-full",
            )}
          >
            Write
          </Link>
          {status === "authenticated" && <AccountButton session={session!} />}
        </div>
      </div>
    </header>
  );
}
