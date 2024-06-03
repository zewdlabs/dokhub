import ResetPasswordForm from "@/components/custom/forms/reset-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset password | Dokhub",
  description:
    "Reset your password with your email. Enter the code you recieved in your email to recover your account",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
