/*
  Warnings:

  - You are about to drop the column `category` on the `GlossarEntry` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GlossarEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "term" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "synonyms" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_GlossarEntry" ("createdAt", "definition", "id", "synonyms", "term", "updatedAt") SELECT "createdAt", "definition", "id", "synonyms", "term", "updatedAt" FROM "GlossarEntry";
DROP TABLE "GlossarEntry";
ALTER TABLE "new_GlossarEntry" RENAME TO "GlossarEntry";
CREATE UNIQUE INDEX "GlossarEntry_term_key" ON "GlossarEntry"("term");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
