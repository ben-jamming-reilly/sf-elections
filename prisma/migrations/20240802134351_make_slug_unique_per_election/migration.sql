/*
  Warnings:

  - A unique constraint covering the columns `[electionId,slug]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Candidate_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_electionId_slug_key" ON "Candidate"("electionId", "slug");
