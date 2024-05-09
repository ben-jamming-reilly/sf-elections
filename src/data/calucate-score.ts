import {
  CandidateQuestionAnswer,
  Question,
  VoterQuestionAnswer,
} from "@prisma/client";

export const calculateScore = (
  voterAnswers: (VoterQuestionAnswer & {
    question: Question;
  })[],
  candidateAnswers: (CandidateQuestionAnswer & {
    question: Question;
  })[],
) => {
  let score = 0;
  voterAnswers.forEach((voterAnswer) => {
    const candidateAnswer = candidateAnswers.find(
      (candidateAnswer) =>
        candidateAnswer.questionId === voterAnswer.questionId,
    );

    if (
      voterAnswer.option &&
      candidateAnswer?.option &&
      voterAnswer.weighting &&
      candidateAnswer?.weighting
    ) {
      score +=
        voterAnswer.option *
        candidateAnswer.option *
        (voterAnswer.weighting * 3) *
        candidateAnswer.weighting;
    }
  });
  return score;
};
