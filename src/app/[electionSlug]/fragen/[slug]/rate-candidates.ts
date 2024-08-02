import {
  Candidate,
  CandidateQuestionAnswer,
  Question,
  VoterQuestionAnswer,
} from "@prisma/client";
import { calculateScore } from "~/data/calucate-score";

type VoterAnswer = VoterQuestionAnswer & {
  question: Question;
};

type CandidateWithAnswers = Candidate & {
  answers: (CandidateQuestionAnswer & {
    question: Question;
  })[];
};

export const rateCandidate = (
  voterAnswers: VoterAnswer[],
  candidate: CandidateWithAnswers,
) => {
  return {
    ...candidate,
    score: calculateScore(voterAnswers, candidate.answers),
  };
};

export const rateCandidates = (
  voterAnswers: VoterAnswer[],
  candidates: CandidateWithAnswers[],
) => {
  return candidates
    .map((candidate) => rateCandidate(voterAnswers, candidate))
    .sort((a, b) => b.score - a.score);
};
