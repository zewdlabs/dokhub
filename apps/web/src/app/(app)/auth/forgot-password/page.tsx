import ForgotPasswordForm from "@/components/custom/forms/forgot-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot your password? | Dokhub",
  description: "Forgot your password? reset your password with your email",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
