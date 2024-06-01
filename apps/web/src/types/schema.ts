import { z } from "zod";

export const verifyEmailSchema = z.object({
  code: z.string().length(6),
});

export const onboardingPersonalInfoSchema = z.object({
  occupation: z.string(),
  speciality: z.string(),
  medicalLicense: z.string(),
  yearsOfExperience: z.number(),
});

export const onboardingSocialInfoSchema = z.object({
  telegram: z.string(),
  facebook: z.string(),
  linkedin: z.string(),
  instagram: z.string(),
});
