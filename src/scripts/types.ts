import type {
  Candidate,
  Election,
  CandidateQuestionAnswer,
  Question,
} from "@prisma/client";

export type QuestionObject = Omit<Question, "id" | "electionId">;

export type CandidateQuestionObject = Omit<CandidateQuestionAnswer, "id">;

export type CandidateSrc = Omit<Candidate, "id" | "electionId"> & {
  urls: string[];
};

export type ElectionCandidateSrc = Omit<Election, "id"> & {
  candidates: CandidateSrc[];
};
