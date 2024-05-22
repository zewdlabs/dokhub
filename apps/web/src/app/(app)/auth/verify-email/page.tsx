import SignupForm from "@/components/custom/signup";
import VerifyEmailForm from "@/components/custom/verify-email";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp | Dokhub",
};

export default function VerifyEmailPage() {
  return <VerifyEmailForm />;
}
