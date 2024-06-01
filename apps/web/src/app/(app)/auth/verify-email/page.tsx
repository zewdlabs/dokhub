import VerifyEmailForm from "@/components/custom/forms/verify-email-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify your email | Dokhub",
  description: "Verify your email address to continue using Dokhub.",
};

export default function VerifyEmailPage() {
  return <VerifyEmailForm />;
}
