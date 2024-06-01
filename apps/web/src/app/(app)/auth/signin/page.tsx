import SigninForm from "@/components/custom/forms/signin-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in to your account | Dokhub",
  description: "Sign in to your account to start using Dokhub.",
};

export default function SigninPage() {
  return <SigninForm />;
}
