/*
  Warnings:

  - Made the column `electionId` on table `Candidate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `electionId` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `electionId` on table `Voter` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Election" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Election" ("description", "id", "name", "slug") SELECT "description", "id", "name", "slug" FROM "Election";
DROP TABLE "Election";
ALTER TABLE "new_Election" RENAME TO "Election";
CREATE UNIQUE INDEX "Election_slug_key" ON "Election"("slug");
CREATE TABLE "new_Candidate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileImg" TEXT,
    "description" TEXT NOT NULL,
    "hasFinished" BOOLEAN NOT NULL DEFAULT false,
    "electionId" INTEGER NOT NULL,
    CONSTRAINT "Candidate_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Candidate" ("description", "electionId", "hasFinished", "id", "name", "profileImg", "slug") SELECT "description", "electionId", "hasFinished", "id", "name", "profileImg", "slug" FROM "Candidate";
DROP TABLE "Candidate";
ALTER TABLE "new_Candidate" RENAME TO "Candidate";
CREATE UNIQUE INDEX "Candidate_slug_key" ON "Candidate"("slug");
CREATE UNIQUE INDEX "Candidate_profileImg_key" ON "Candidate"("profileImg");
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT 'YesNo',
    "order" INTEGER NOT NULL,
    "electionId" INTEGER NOT NULL,
    CONSTRAINT "Question_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("category", "description", "electionId", "id", "order", "title", "type") SELECT "category", "description", "electionId", "id", "order", "title", "type" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE TABLE "new_Voter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hash" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "state" TEXT,
    "hasAcceptedTos" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "electionId" INTEGER NOT NULL,
    CONSTRAINT "Voter_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Voter" ("age", "createdAt", "electionId", "gender", "hasAcceptedTos", "hash", "id", "state") SELECT "age", "createdAt", "electionId", "gender", "hasAcceptedTos", "hash", "id", "state" FROM "Voter";
DROP TABLE "Voter";
ALTER TABLE "new_Voter" RENAME TO "Voter";
CREATE UNIQUE INDEX "Voter_hash_key" ON "Voter"("hash");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
