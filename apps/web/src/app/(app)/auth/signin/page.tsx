import SigninForm from "@/components/custom/signin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignIn | Dokhub",
};

export default function SigninPage() {
  return <SigninForm />;
}
