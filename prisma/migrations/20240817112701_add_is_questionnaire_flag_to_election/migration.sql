-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Election" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isQuestionnaire" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Election" ("description", "id", "isActive", "name", "slug") SELECT "description", "id", "isActive", "name", "slug" FROM "Election";
DROP TABLE "Election";
ALTER TABLE "new_Election" RENAME TO "Election";
CREATE UNIQUE INDEX "Election_slug_key" ON "Election"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
