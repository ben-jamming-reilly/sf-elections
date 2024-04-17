/*
  Warnings:

  - Added the required column `synonyms` to the `GlossarEntry` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GlossarEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "term" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "synonyms" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_GlossarEntry" ("category", "createdAt", "definition", "id", "term", "updatedAt") SELECT "category", "createdAt", "definition", "id", "term", "updatedAt" FROM "GlossarEntry";
DROP TABLE "GlossarEntry";
ALTER TABLE "new_GlossarEntry" RENAME TO "GlossarEntry";
CREATE UNIQUE INDEX "GlossarEntry_term_key" ON "GlossarEntry"("term");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
