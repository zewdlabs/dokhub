/*
  Warnings:

  - A unique constraint covering the columns `[userId,organizationId]` on the table `memberships` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_organizationId_fkey";

-- AlterTable
ALTER TABLE "email_verifications" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '3 day';

-- AlterTable
ALTER TABLE "invitations" ALTER COLUMN "expirationDate" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "memberships" ALTER COLUMN "organizationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "password_resets" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "memberships_userId_organizationId_key" ON "memberships"("userId", "organizationId");

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
