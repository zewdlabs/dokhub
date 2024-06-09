/*
  Warnings:

  - You are about to drop the column `postId` on the `for_you` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "for_you" DROP CONSTRAINT "for_you_postId_fkey";

-- AlterTable
ALTER TABLE "email_verifications" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '3 day';

-- AlterTable
ALTER TABLE "for_you" DROP COLUMN "postId";

-- AlterTable
ALTER TABLE "invitations" ALTER COLUMN "expirationDate" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "password_resets" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '1 day';

-- CreateTable
CREATE TABLE "libraries" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "libraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ForYouToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LibraryToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ForYouToPost_AB_unique" ON "_ForYouToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_ForYouToPost_B_index" ON "_ForYouToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LibraryToPost_AB_unique" ON "_LibraryToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_LibraryToPost_B_index" ON "_LibraryToPost"("B");

-- AddForeignKey
ALTER TABLE "libraries" ADD CONSTRAINT "libraries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ForYouToPost" ADD CONSTRAINT "_ForYouToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "for_you"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ForYouToPost" ADD CONSTRAINT "_ForYouToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LibraryToPost" ADD CONSTRAINT "_LibraryToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "libraries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LibraryToPost" ADD CONSTRAINT "_LibraryToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
