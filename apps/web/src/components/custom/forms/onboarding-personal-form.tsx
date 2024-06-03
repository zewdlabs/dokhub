"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { onboardingPersonalInfoSchema } from "@/types/schema";
import { useRouter } from "next/navigation";

export default function OnboardingPersonalInfoForm() {
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

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof onboardingPersonalInfoSchema>) => {
      // NOTE: You can send the form data to the server here some api call
      console.log(values);

      router.push("/auth/onboarding/socials");
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
                          required
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
                <Link
                  href="/auth/onboarding/socials"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full",
                  )}
                >
                  Skip for now
                </Link>
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
