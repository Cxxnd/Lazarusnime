/*
  Warnings:

  - A unique constraint covering the columns `[animeId,user_email]` on the table `History` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `animeId` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "History_slug_user_email_key";

-- AlterTable
ALTER TABLE "History" ADD COLUMN     "animeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "History_animeId_user_email_key" ON "History"("animeId", "user_email");
