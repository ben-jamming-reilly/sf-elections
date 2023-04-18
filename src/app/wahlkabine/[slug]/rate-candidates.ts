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

const getAnsweredQuestionsLength = (
  voterAnswers: VoterAnswer[],
  candidateAnswers: CandidateWithAnswers["answers"]
) => {
  return candidateAnswers.filter((answer) => {
    const voterAnswer = voterAnswers.find(
      (voterAnswer) => voterAnswer.questionId === answer.questionId
    );

    return (
      !voterAnswer?.skipped &&
      answer.option !== null &&
      answer.weighting !== null
    );
  }).length;
};

export const rateCandidate = (
  voterAnswers: VoterAnswer[],
  candidate: CandidateWithAnswers
) => {
  const maxScore =
    getAnsweredQuestionsLength(voterAnswers, candidate.answers) * 1.15;

  const score = calculateScore(voterAnswers, candidate.answers);
  const scorePercentageRaw = (score / maxScore) * 100;
  const scorePercentage = Math.round(scorePercentageRaw);

  return {
    ...candidate,
    score,
    scorePercentage,
    scorePercentageRaw,
  };
};

export const rateCandidates = (
  voterAnswers: VoterAnswer[],
  candidates: CandidateWithAnswers[]
) => {
  return candidates
    .map((candidate) => rateCandidate(voterAnswers, candidate))
    .sort((a, b) => b.score - a.score);
};
