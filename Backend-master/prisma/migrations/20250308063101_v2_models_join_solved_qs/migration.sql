/*
  Warnings:

  - You are about to drop the column `solved` on the `UserData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserData" DROP COLUMN "solved";

-- CreateTable
CREATE TABLE "SolvedPractice" (
    "userDataId" TEXT NOT NULL,
    "practiceId" TEXT NOT NULL,

    CONSTRAINT "SolvedPractice_pkey" PRIMARY KEY ("userDataId","practiceId")
);

-- CreateTable
CREATE TABLE "WrongPractice" (
    "userDataId" TEXT NOT NULL,
    "practiceId" TEXT NOT NULL,

    CONSTRAINT "WrongPractice_pkey" PRIMARY KEY ("userDataId","practiceId")
);

-- AddForeignKey
ALTER TABLE "SolvedPractice" ADD CONSTRAINT "SolvedPractice_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolvedPractice" ADD CONSTRAINT "SolvedPractice_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WrongPractice" ADD CONSTRAINT "WrongPractice_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WrongPractice" ADD CONSTRAINT "WrongPractice_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
