"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { z } from "zod";

const signUpSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword);

export default function SignupForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof signUpSchema>) => {
      // TODO: call the backend api to create a new user. Then it should send an email to the user for confirmation
      console.log(values);
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="first-name">First name</FormLabel>
                        <FormControl>
                          <Input
                            id="first-name"
                            type="text"
                            placeholder="John"
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="last-name">Last name</FormLabel>
                        <FormControl>
                          <Input
                            id="last-name"
                            type="text"
                            placeholder="Doe"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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
                          placeholder="johndoe@example.com"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                        <FormLabel htmlFor="confirm-password">
                          Confirm password
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="confirm-password"
                            type="password"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
              <Button
                onClick={async () => {
                  await signIn("google");
                }}
                variant="outline"
                className="w-full"
              >
                <Icons.google className="w-5 h-5 mr-2" />
                Sign up with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/signin" className="underline">
                Sign in
              </Link>
            </div>
            <div className="mt-6 text-center text-sm">
              <p>
                By continuing, you agree to our{" "}
                <Link
                  href="/terms-of-service"
                  className={buttonVariants({
                    variant: "link",
                    className: "px-0 py-0",
                  })}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className={buttonVariants({
                    variant: "link",
                    className: "px-0 py-0",
                  })}
                >
                  Privacy Policy.
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
