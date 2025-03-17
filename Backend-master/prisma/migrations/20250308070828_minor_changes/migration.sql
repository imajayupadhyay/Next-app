/*
  Warnings:

  - You are about to drop the column `userId` on the `AuthToken` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuthToken" DROP CONSTRAINT "AuthToken_userId_fkey";

-- AlterTable
ALTER TABLE "AuthToken" DROP COLUMN "userId";
