/*
  Warnings:

  - You are about to drop the `subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `social_links` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SocialLinkType" AS ENUM ('TWITTER', 'LINKEDIN', 'GITHUB', 'INSTAGRAM', 'FACEBOOK', 'YOUTUBE', 'TIKTOK', 'OTHER');

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_userId_fkey";

-- AlterTable
ALTER TABLE "email_verifications" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '3 day';

-- AlterTable
ALTER TABLE "invitations" ALTER COLUMN "expirationDate" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "password_resets" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- AlterTable
ALTER TABLE "social_links" ADD COLUMN     "type" "SocialLinkType" NOT NULL;

-- DropTable
DROP TABLE "subscriptions";
