/*
  Warnings:

  - You are about to drop the column `hash` on the `Candidate` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Candidate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileImg" TEXT,
    "description" TEXT NOT NULL,
    "hasFinished" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Candidate" ("description", "hasFinished", "id", "name", "profileImg", "slug") SELECT "description", "hasFinished", "id", "name", "profileImg", "slug" FROM "Candidate";
DROP TABLE "Candidate";
ALTER TABLE "new_Candidate" RENAME TO "Candidate";
CREATE UNIQUE INDEX "Candidate_slug_key" ON "Candidate"("slug");
CREATE UNIQUE INDEX "Candidate_profileImg_key" ON "Candidate"("profileImg");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
