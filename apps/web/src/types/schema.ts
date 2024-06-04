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

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  code: z.string().length(6),
});

export const signUpSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword);

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    })
    .optional(),
  email: z.string().email().optional(),
  bio: z.string().max(160).min(4).optional(),
  urls: z
    .array(
      z.object({
        name: z.string().min(2).max(30),
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional(),
  //TODO: add profile iamge
});