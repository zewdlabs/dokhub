"use client";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChangeEvent, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { uploadImageSchema } from "@/types/schema";
import { useSession } from "next-auth/react";
import { genFallback } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  dataTransfer.items.add(event.target.files![0]);

  const file = dataTransfer.files.item(0);
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { file, displayUrl };
}

export function ProfileImage({ url }: { url: string | null }) {
  const session = useSession();

  const [preview, setPreview] = useState(url ?? "");
  const form = useForm<z.infer<typeof uploadImageSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(uploadImageSchema),
  });

  const uploadProfilePictureFile = useMutation({
    mutationKey: ["user", "upload-profile-picture"],
    mutationFn: async (values: z.infer<typeof uploadImageSchema>) => {
      const formData = new FormData();
      formData.append("file", values.profileImage);

      const res = await fetch(
        `http://localhost:4231/api/user/upload-profile-picture/${session.data?.user.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.data?.tokens.accessToken}`,
            accept: "*/*",
          },
          body: formData,
        },
      );

      if (!res.ok) {
        throw new Error("image not working");
      }

      return await res.json();
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <>
      <Form {...form}>
        <form
          ref={formRef}
          className="space-y-8"
          onSubmit={form.handleSubmit((data) =>
            uploadProfilePictureFile.mutate(data),
          )}
        >
          <Avatar className="w-24 h-24">
            <AvatarImage src={preview} className="w-24 h-24 object-cover" />
            <AvatarFallback>
              {genFallback(session.data?.user.name!)}
            </AvatarFallback>
          </Avatar>
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field: { onChange, value, ...rest } }) => {
              return (
                <>
                  <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple={false}
                        {...rest}
                        onChange={(event) => {
                          const { file, displayUrl } = getImageData(event);
                          setPreview(displayUrl);
                          onChange(file);
                          formRef.current?.requestSubmit();
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose best image that bring spirits to your circle.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              );
            }}
          />
        </form>
      </Form>
    </>
  );
}
