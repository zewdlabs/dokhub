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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgotPasswordSchema } from "@/types/schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof forgotPasswordSchema>) => {
      // NOTE: Do some api calls which send verification code to the email
      // Redirect the user to the reset password page
      console.log(values);
      const res = await fetch(
        `http://localhost:4231/api/auth/request-password-reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to send verification code");
      }
      toast("Verification code sent to your email");
      // router.push("reset-password");
    }
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Forgot password</CardTitle>
            <CardDescription>
              Enter your email below to recover your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
