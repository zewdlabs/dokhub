/*
  Warnings:

  - The `emailVerified` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "email_verifications" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '3 day';

-- AlterTable
ALTER TABLE "invitations" ALTER COLUMN "expirationDate" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "password_resets" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" TIMESTAMP(3);
