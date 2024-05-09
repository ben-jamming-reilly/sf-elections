/*
  Warnings:

  - You are about to drop the column `scorePercentageRaw` on the `VoterCandidateMatch` table. All the data in the column will be lost.
  - Added the required column `score` to the `VoterCandidateMatch` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VoterCandidateMatch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "voterId" INTEGER NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    CONSTRAINT "VoterCandidateMatch_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "Voter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VoterCandidateMatch_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VoterCandidateMatch" ("candidateId", "id", "voterId") SELECT "candidateId", "id", "voterId" FROM "VoterCandidateMatch";
DROP TABLE "VoterCandidateMatch";
ALTER TABLE "new_VoterCandidateMatch" RENAME TO "VoterCandidateMatch";
CREATE INDEX "VoterCandidateMatch_voterId_candidateId_idx" ON "VoterCandidateMatch"("voterId", "candidateId");
CREATE INDEX "VoterCandidateMatch_voterId_idx" ON "VoterCandidateMatch"("voterId");
CREATE INDEX "VoterCandidateMatch_candidateId_idx" ON "VoterCandidateMatch"("candidateId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
