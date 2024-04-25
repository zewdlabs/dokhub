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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

type FormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupForm() {
const router= useRouter();
  const register = async () => {
     console.log("hellooooo")
    console.log({
      fullName: data.current.name,
      email: data.current.email,
      password: data.current.password,
    });
    if(data.current.confirmPassword != data.current.password){
      updateErrorMessages('confirmPassword', 'Passwords do not match');
      // alert("passwords do not match");
      return;
    } else {
      updateErrorMessages('confirmPassword', ''); // Clearing error message if validation passes
      // data.current.confirmPassword = value;
    }
      
    const res = await fetch("http://localhost:4231/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        fullName: data.current.name,
        email: data.current.email,
        password: data.current.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await res);
    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    const response = await res.json();
    router.push("http://localhost:3000/api/auth/signin");
    console.log({ response });
  };
  const data = useRef<FormInputs>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    confirmPassword: ''
  });

  // Function to update error messages
  const updateErrorMessages = (fieldName: any, message: any) => {
    setErrorMessages((prevState: any) => ({
      ...prevState,
      [fieldName]: message
    }));
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
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Full name</Label>
              <Input id="Full-name" placeholder="Max" required   onChange={(e) => (data.current.name = e.target.value)} />
            </div>
            {/* <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div> */}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => (data.current.email = e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password"  onChange={(e) => (data.current.password = e.target.value)}/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" onChange={(e) => (data.current.confirmPassword = e.target.value)}/>
            </div>
            <div className="w-full">
              {errorMessages.confirmPassword && (
        <span className="text-red-500">{errorMessages.confirmPassword}</span>
      )}
      </div>
          </div>
          <Button onClick={register} className="w-full">
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
      </CardContent>
    </Card>
  );
}
