import OnboardingSocialInfoForm from "@/components/custom/forms/onboarding-socials-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding - Socials information | Dokhub",
};

export default function UserSocialInformationPage() {
  return <OnboardingSocialInfoForm />;
}
