-- CreateTable
CREATE TABLE "Candidate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileImg" TEXT,
    "description" TEXT NOT NULL,
    "hasFinished" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Voter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hash" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "state" TEXT,
    "isPartyMember" BOOLEAN,
    "hasAcceptedTos" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "VoterCandidateMatch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "voterId" INTEGER NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "scorePercentageRaw" REAL NOT NULL,
    CONSTRAINT "VoterCandidateMatch_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "Voter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VoterCandidateMatch_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CandidateQuestionAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "candidateId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "option" INTEGER,
    "weighting" INTEGER,
    "text" TEXT NOT NULL DEFAULT '',
    "changedQuestionDisclaimer" TEXT,
    CONSTRAINT "CandidateQuestionAnswer_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CandidateQuestionAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VoterQuestionAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "voterId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "option" INTEGER,
    "weighting" INTEGER,
    "skipped" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "VoterQuestionAnswer_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "Voter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VoterQuestionAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT 'YesNo',
    "order" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_slug_key" ON "Candidate"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_hash_key" ON "Candidate"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_profileImg_key" ON "Candidate"("profileImg");

-- CreateIndex
CREATE UNIQUE INDEX "Voter_hash_key" ON "Voter"("hash");

-- CreateIndex
CREATE INDEX "VoterCandidateMatch_voterId_candidateId_idx" ON "VoterCandidateMatch"("voterId", "candidateId");

-- CreateIndex
CREATE INDEX "VoterCandidateMatch_voterId_idx" ON "VoterCandidateMatch"("voterId");

-- CreateIndex
CREATE INDEX "VoterCandidateMatch_candidateId_idx" ON "VoterCandidateMatch"("candidateId");

-- CreateIndex
CREATE INDEX "CandidateQuestionAnswer_candidateId_questionId_idx" ON "CandidateQuestionAnswer"("candidateId", "questionId");

-- CreateIndex
CREATE INDEX "CandidateQuestionAnswer_candidateId_idx" ON "CandidateQuestionAnswer"("candidateId");

-- CreateIndex
CREATE INDEX "CandidateQuestionAnswer_questionId_idx" ON "CandidateQuestionAnswer"("questionId");

-- CreateIndex
CREATE INDEX "VoterQuestionAnswer_voterId_questionId_idx" ON "VoterQuestionAnswer"("voterId", "questionId");

-- CreateIndex
CREATE INDEX "VoterQuestionAnswer_voterId_idx" ON "VoterQuestionAnswer"("voterId");

-- CreateIndex
CREATE INDEX "VoterQuestionAnswer_questionId_idx" ON "VoterQuestionAnswer"("questionId");
