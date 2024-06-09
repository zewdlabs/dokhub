/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `libraries` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "unique_library";

-- AlterTable
ALTER TABLE "email_verifications" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '3 day';

-- AlterTable
ALTER TABLE "invitations" ALTER COLUMN "expirationDate" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "password_resets" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "onboardingStatus" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "libraries_userId_postId_key" ON "libraries"("userId", "postId");
