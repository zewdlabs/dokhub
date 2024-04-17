-- AlterTable
ALTER TABLE "email_verifications" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '3 day';

-- AlterTable
ALTER TABLE "invitations" ALTER COLUMN "expirationDate" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "password_resets" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 month';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "coverUrl" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "website" TEXT;
