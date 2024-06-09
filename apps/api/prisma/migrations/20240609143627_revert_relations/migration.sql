/*
  Warnings:

  - You are about to drop the `_ForYouToPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LibraryToPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postId` to the `for_you` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `libraries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ForYouToPost" DROP CONSTRAINT "_ForYouToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_ForYouToPost" DROP CONSTRAINT "_ForYouToPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_LibraryToPost" DROP CONSTRAINT "_LibraryToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_LibraryToPost" DROP CONSTRAINT "_LibraryToPost_B_fkey";

-- AlterTable
ALTER TABLE "email_verifications" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '3 day';

-- AlterTable
ALTER TABLE "for_you" ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "invitations" ALTER COLUMN "expirationDate" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "libraries" ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "password_resets" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- DropTable
DROP TABLE "_ForYouToPost";

-- DropTable
DROP TABLE "_LibraryToPost";

-- AddForeignKey
ALTER TABLE "for_you" ADD CONSTRAINT "for_you_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "libraries" ADD CONSTRAINT "libraries_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
