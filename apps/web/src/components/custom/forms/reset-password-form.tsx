"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/types/schema";
import { z } from "zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Icons } from "@/components/icons";

export default function ResetPasswordForm() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  console.log(email);
  const token = searchParams.get("token");
  console.log(token)
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof resetPasswordSchema>) => {
      if (values.password !== values.confirmPassword) {
        toast.error("Password and confirm password do not match.");
        return;
      }
      const data = {
        email: email,
        newPassword: values.password,
        token,
      }
      const response = await fetch(
        `http://localhost:4231/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success("Account has been recovered successfully!");
      return router.push("/auth/signin");
    }
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Card className="mx-auto w-96">
          <CardHeader>
            <CardTitle className="text-2xl">Password Reset</CardTitle>
            <CardDescription>Enter Your new Password</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
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
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          type="confirmPassword"
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
                Reset Password
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
