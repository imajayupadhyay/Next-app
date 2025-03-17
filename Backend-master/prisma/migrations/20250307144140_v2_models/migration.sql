/*
  Warnings:

  - You are about to drop the `DailyPractice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Practice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Practice" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserData" ADD COLUMN     "solved" TEXT[];

-- DropTable
DROP TABLE "DailyPractice";
