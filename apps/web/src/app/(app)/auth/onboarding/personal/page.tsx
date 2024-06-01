import OnboardingPersonalInfoForm from "@/components/custom/forms/onboarding-personal-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding - Personal Information | Dokhub",
};

export default function OnboardingPersonalInfoPage() {
  return <OnboardingPersonalInfoForm />;
}
