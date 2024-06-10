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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { onboardingSocialInfoSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

export default function OnboardingSocialInfoForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof onboardingSocialInfoSchema>>({
    resolver: zodResolver(onboardingSocialInfoSchema),
    defaultValues: {
      telegram: "",
      facebook: "",
      linkedin: "",
      instagram: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof onboardingSocialInfoSchema>) => {
      // NOTE: You can send the form data to the server here some api call
      router.push("/app");
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Social Information</CardTitle>
            <CardDescription className="max-w-sm">
              Provide links to your social media profiles. This will help in
              building your network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="telegram"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel htmlFor="telegram">telegram</FormLabel>
                      <FormControl>
                        <Input
                          id="telegram"
                          type="text"
                          placeholder=""
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
                  name="facebook"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel htmlFor="facebook">facebook</FormLabel>
                      <FormControl>
                        <Input id="facebook" type="text" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel htmlFor="linkedin">LinkedIn</FormLabel>
                      <FormControl>
                        <Input id="linkedin" type="text" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel htmlFor="instagram">Instagram</FormLabel>
                      <FormControl>
                        <Input id="instagram" type="text" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Button
                  onClick={() => {
                    toast(
                      "You can always modify the informations later in your profile",
                    ) && router.push("/app");
                  }}
                  variant="default"
                  className="w-full"
                  type="submit"
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
