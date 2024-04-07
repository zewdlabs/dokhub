import { z } from 'zod';

export const envValidationSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.string().default('development'),
  DATABASE_URL: z.string().default(''),
});
