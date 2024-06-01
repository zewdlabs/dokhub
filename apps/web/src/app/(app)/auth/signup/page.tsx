import SignupForm from "@/components/custom/signup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp | Dokhub",
};

export default function SignupPage() {
  return <SignupForm />;
}
