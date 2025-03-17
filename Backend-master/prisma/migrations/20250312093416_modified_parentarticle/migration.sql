/*
  Warnings:

  - You are about to drop the column `parentId` on the `Article` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_parentId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "parentId",
ADD COLUMN     "parentSlug" TEXT;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_parentSlug_fkey" FOREIGN KEY ("parentSlug") REFERENCES "ParentArticle"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
