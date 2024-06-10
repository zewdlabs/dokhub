import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, {
      message:
        "Password must contain at least one special character (@, $, !, %, *, ?, &)",
    }),
});

export const signUpSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&]/, {
        message:
          "Password must contain at least one special character (@, $, !, %, *, ?, &)",
      }),
    confirmPassword: z
      .string()
      .min(8)
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&]/, {
        message:
          "Password must contain at least one special character (@, $, !, %, *, ?, &)",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  code: z.string().length(6),
});

export const deletePostSchema = z.object({
  id: z.string(),
});

export const addToLibrarySchema = z.object({
  userId: z.string(),
  postId: z.string(),
});

export const deleteChatSchema = z.object({
  id: z.string(),
});

export const uploadImageSchema = z.object({
  profileImage: z.custom<File>((v) => v instanceof File, {
    message: "Image is required",
  }),
});

export const deleteUserSchema = z.object({
  id: z.string(),
});

export const deleteOrgSchema = z.object({
  id: z.string(),
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

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

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
  // urls: z
  //   .array(
  //     z.object({
  //       name: z.string().min(2).max(30),
  //       value: z.string().url({ message: "Please enter a valid URL." }),
  //     }),
  //   )
  //   .optional(),
  //TODO: add profile iamge
});

export const publishFormSchema = z.object({
  publishPublic: z.boolean().default(false),
  previewTitle: z.string().min(5).max(100),
  previewSubtitle: z.string().min(5).max(300),
});
