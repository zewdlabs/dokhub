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
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { Icons } from "../icons";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function SignupForm() {
  const router = useRouter(); // NEW: Initialize router for navigation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm(); // NEW: Add setError for manual error handling
  const [errorMessages, setErrorMessages] = useState({
    confirmPassword: "",
  });

  const updateErrorMessages = (fieldName: string, message: string) => {
    setErrorMessages((prevState) => ({
      ...prevState,
      [fieldName]: message,
    }));
  };
  const onSubmit = async (data: any) => {
    // UPDATED: Accept form data
    console.log("hellooooo");
    console.log({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
    });

    if (data.confirmPassword !== data.password) {
      updateErrorMessages("confirmPassword", "Passwords do not match");
      return;
    } else {
      updateErrorMessages("confirmPassword", ""); // Clear error message if validation passes
    }

    const res = await fetch("http://localhost:4231/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.message || res.statusText);
      return;
    }

    router.push("/auth/verify-email"); // UPDATED: Navigate to sign-in page
  };
  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  {...register("firstName", {
                    required: "First name is required",
                  })} // NEW: Register first name input
                />
                {errors.firstName && ( // NEW: Display error for first name
                  <span className="text-red-600">
                    {String(errors.firstName.message)}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  {...register("lastName", {
                    required: "Last name is required",
                  })} // NEW: Register last name input
                />
                {errors.lastName && ( // NEW: Display error for last name
                  <span className="text-red-600">
                    {String(errors.lastName.message)}
                  </span>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid",
                  },
                })} // NEW: Register email input with validation
              />
              {errors.email?.message && ( // NEW: Display error for email
                <span className="text-red-600">
                  {errors.email.message.toString()}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })} // NEW: Register password input with validation
                />
                {errors.password?.message && ( // NEW: Display error for password
                  <span className="text-red-600">
                    {errors.password.message.toString()}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })} // NEW: Register confirm password input with validation
                />
                {errors.confirmPassword?.message && ( // NEW: Display error for confirm password
                  <span className="text-red-600">
                    {errors.confirmPassword.message.toString()}
                  </span>
                )}
                {errorMessages.confirmPassword && ( // NEW: Display custom error for confirm password
                  <span className="text-red-600">
                    {errorMessages.confirmPassword}
                  </span>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
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
        </form>
      </CardContent>
    </Card>
  );
}
