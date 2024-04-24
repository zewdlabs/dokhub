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
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "../icons";
import SignInButton from "../SigninButton";
import { useRef } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
 
// import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

export default function SigninForm(props: Props) {
  const router = useRouter();
  const email = useRef("");
  const pass = useRef("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("fafeafa");
    const res = await signIn("credentials", {
      username: email.current,
      password: pass.current,
      redirect: true,
      callbackUrl: props.callbackUrl ?? 'http://localhost:3000',
    });
    // if(res?.ok){
    //   router.push(props.callbackUrl ?? "http://localhost:3000");
    // }
    // if (!res?.error) {
    //   router.push(props.callbackUrl ?? "http://localhost:3000/api/auth/signin");
    // }
  };
  // const form = useForm<z.infer<typeof signInSchema>>({
  //   resolver: zodResolver(signInSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });

  // const onSubmit = form.handleSubmit((values: z.infer<typeof signInSchema>) => {
  //   console.log(values);
  // });

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Enter your email below to Sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
   
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
          {!!props.error && (
        <p className="bg-red-100 text-red-600 text-center p-2">
          Authentication Failed
        </p>
      )}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => (email.current = e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required
              onChange={(e) => (pass.current = e.target.value)}
            />
            <div className="flex items-center">
              <Link
                href="/auth/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Continue
          </Button>
          {/* <SignInButton></SignInButton> */}
          <Button variant="outline" className="w-full">
            <Icons.google className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline">
            Sign up
          </Link>
        </div>
        </form>
      </CardContent>
    </Card>
  );
}
