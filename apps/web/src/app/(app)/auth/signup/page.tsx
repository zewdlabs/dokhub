import SignupForm from "@/components/custom/forms/signup-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an account | Dokhub",
  description: "Create an account to start using Dokhub.",
};

export default function SignupPage() {
  return <SignupForm />;
}
