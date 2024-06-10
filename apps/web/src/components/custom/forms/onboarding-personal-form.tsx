"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { onboardingPersonalInfoSchema } from "@/types/schema";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function OnboardingPersonalInfoForm() {
  const session = useSession();

  const router = useRouter();
  const form = useForm<z.infer<typeof onboardingPersonalInfoSchema>>({
    resolver: zodResolver(onboardingPersonalInfoSchema),
    defaultValues: {
      occupation: "",
      speciality: "",
      medicalLicense: "",
      yearsOfExperience: 0,
    },
  });

  const disableOnboarding = useMutation({
    mutationKey: ["disableOnboarding"],
    mutationFn: async ({ onboardingStatus }: { onboardingStatus: boolean }) => {
      const res = await fetch(
        `http://localhost:4231/api/user/profile/${session?.data?.user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.tokens.accessToken}`,
          },
          body: JSON.stringify({
            onboardingStatus,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("can't disable onboarding");
      }

      return await res.json();
    },
    onSuccess: () => {
      toast.info(
        "You can always modify the information in your profile settings",
      );

      router.push("/app");
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof onboardingPersonalInfoSchema>) => {
      // NOTE: You can send the form data to the server here some api call
      const res = await fetch(
        `http://localhost:4231/api/user/profile/${session.data?.user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.tokens.accessToken}`,
          },
          body: JSON.stringify({
            yearsOfExperience: values.yearsOfExperience,
            medicalLicenseNumber: values.medicalLicense,
            specialty: values.speciality,
            occupation: values.occupation,
            onboardingStatus: true,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("This isn't supposed to happen");
      }

      router.push("/app");
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Professional Information</CardTitle>
            <CardDescription>
              Provide information regarding your professional background
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="occupation">occupation</FormLabel>
                      <FormControl>
                        <Input
                          id="occupation"
                          type="text"
                          placeholder=""
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Specify your occupation (eg. Medical Director)
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="speciality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="speciality">Specialty</FormLabel>
                      <FormControl>
                        <Input
                          id="speciality"
                          type="text"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Specify your specialty if any (eg. Oncology)
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="medicalLicense"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="medicallicense">
                        Medical License Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="medicallicense"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="yearsOfExperience">
                        Years of Experience
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="yearsOfExperience"
                          type="number"
                          required
                          {...field}
                          {...form.register("yearsOfExperience", {
                            valueAsNumber: true,
                          })}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Specify your years of experience in the field
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    disableOnboarding.mutate({ onboardingStatus: true })
                  }
                  className="w-full"
                >
                  Skip for now
                </Button>
                <Button variant="default" className="w-full" type="submit">
                  Continue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
