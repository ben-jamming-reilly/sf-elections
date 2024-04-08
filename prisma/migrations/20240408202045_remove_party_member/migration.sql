/*
  Warnings:

  - You are about to drop the column `isPartyMember` on the `Voter` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Voter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hash" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "state" TEXT,
    "hasAcceptedTos" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Voter" ("age", "createdAt", "gender", "hasAcceptedTos", "hash", "id", "state") SELECT "age", "createdAt", "gender", "hasAcceptedTos", "hash", "id", "state" FROM "Voter";
DROP TABLE "Voter";
ALTER TABLE "new_Voter" RENAME TO "Voter";
CREATE UNIQUE INDEX "Voter_hash_key" ON "Voter"("hash");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
