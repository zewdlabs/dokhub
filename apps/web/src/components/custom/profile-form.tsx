"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { profileFormSchema } from "@/types/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ProfileImage } from "./upload-profile";
import { User } from "./users-table-list";
import { toast } from "sonner";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const session = useSession();

  const { data: userData } = useQuery({
    queryKey: ["user", "profile", session.data?.user.id],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:4231/api/user/${session.data?.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${session.data?.tokens.accessToken}`,
          },
        },
      );

      if (!res.ok) return null;

      const data = await res.json();

      return data as User;
    },
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
      bio: userData?.bio,
      medicalLicense: userData?.medicalLicenseNumber
    },
    mode: "onChange",
  });

  const updateProfile = useMutation({
    mutationKey: ["user", "update"],
    mutationFn: async (values: ProfileFormValues) => {
      const res = await fetch(
        `http://localhost:4231/api/user/profile/${session.data?.user.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${session.data?.tokens.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            bio: values.bio,
            medicalLicenseNumber: values.medicalLicense,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      return await res.json();
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
  });

  if (!userData) {
    return null;
  }

  return (
    <>
      <ProfileImage url={userData.profileUrl} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => updateProfile.mutate(data))}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input defaultValue={userData?.name} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input defaultValue={userData?.email} {...field} readOnly />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    defaultValue={userData?.bio}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Add a short bio to tell other users about yourself.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="medicalLicense"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medical License</FormLabel>
                <FormControl>
                  { userData.medicalLicenseNumber ? 
                    <Input defaultValue={userData?.medicalLicenseNumber} {...field} readOnly  /> :
                    <Input defaultValue={userData?.medicalLicenseNumber} {...field}  />
                  }
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </>
  );
}
