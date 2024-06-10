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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { signUpSchema } from "@/types/schema";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export default function SignupForm() {
  const router = useRouter();
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

  const submitSignup = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (values: z.infer<typeof signUpSchema>) => {
      try {
        const res = await fetch("http://localhost:4231/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            password: values.password,
          }),
        });

        if (!res.ok) {
          const error = await res.json();

          if (error.message === "User already exists") {
            form.setError("email", {
              type: "server",
              message: error.message,
            });
          } else {
            form.setError("email", {
              type: "server",
              message: error.message,
            });
          }
        }

        router.push(`/auth/verify-email?email=${values.email}`);
      } catch (error) {
        form.setError("lastName", {
          type: "server",
          message: "",
        });
        form.setError("firstName", {
          type: "server",
          message: "",
        });
        form.setError("email", {
          type: "server",
          message: "An error occurred on our side. Please try again later.",
        });
        form.setError("password", {
          type: "server",
          message: "",
        });
        form.setError("confirmPassword", {
          type: "server",
          message: "",
        });
      }
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => submitSignup.mutate(data))}>
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
              <Button
                type="submit"
                className="w-full"
                disabled={submitSignup.isPending}
              >
                Create an account
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
