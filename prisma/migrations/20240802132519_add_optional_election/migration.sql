-- CreateTable
CREATE TABLE "Election" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Candidate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileImg" TEXT,
    "description" TEXT NOT NULL,
    "hasFinished" BOOLEAN NOT NULL DEFAULT false,
    "electionId" INTEGER,
    CONSTRAINT "Candidate_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Candidate" ("description", "hasFinished", "id", "name", "profileImg", "slug") SELECT "description", "hasFinished", "id", "name", "profileImg", "slug" FROM "Candidate";
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
    "electionId" INTEGER,
    CONSTRAINT "Question_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("category", "description", "id", "order", "title", "type") SELECT "category", "description", "id", "order", "title", "type" FROM "Question";
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
    "electionId" INTEGER,
    CONSTRAINT "Voter_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Voter" ("age", "createdAt", "gender", "hasAcceptedTos", "hash", "id", "state") SELECT "age", "createdAt", "gender", "hasAcceptedTos", "hash", "id", "state" FROM "Voter";
DROP TABLE "Voter";
ALTER TABLE "new_Voter" RENAME TO "Voter";
CREATE UNIQUE INDEX "Voter_hash_key" ON "Voter"("hash");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Election_slug_key" ON "Election"("slug");
