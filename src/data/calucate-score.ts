import {
  ScaleOptionValueType,
  WeightingValueType,
  getScaleOptionTendency,
  getWeightingTendency,
} from "~/data/answers";

import {
  CandidateQuestionAnswer,
  Question,
  VoterQuestionAnswer,
} from "@prisma/client";

const calculateWeightingRelevancy = (
  voterWeighting: WeightingValueType,
  candidateWeighting: WeightingValueType
) => {
  if (voterWeighting === candidateWeighting) return 0.15;
  if (
    getWeightingTendency(voterWeighting) ===
    getWeightingTendency(candidateWeighting)
  ) {
    return 0.075;
  }

  return 0;
};

const calculateMatchForScaleOption = (
  voterAnswer: ScaleOptionValueType,
  candidateAnswer: ScaleOptionValueType
) => {
  if (voterAnswer === candidateAnswer) return 1;
  if (
    getScaleOptionTendency(voterAnswer) ===
    getScaleOptionTendency(candidateAnswer)
  ) {
    return 0.7;
  }

  return 0;
};

export const calculateScore = (
  voterAnswers: (VoterQuestionAnswer & {
    question: Question;
  })[],
  candidateAnswers: (CandidateQuestionAnswer & {
    question: Question;
  })[]
) => {
  let score = 0;
  voterAnswers.forEach((voterAnswer) => {
    const candidateAnswer = candidateAnswers.find(
      (candidateAnswer) => candidateAnswer.questionId === voterAnswer.questionId
    );

    if (
      voterAnswer.skipped ||
      (candidateAnswer?.option === null && candidateAnswer.weighting === null)
    ) {
      return;
    }

    if (voterAnswer.question.type === "YesNo") {
      if (voterAnswer.option === candidateAnswer?.option) {
        score += 1;
      }
    }

    if (voterAnswer.question.type === "Range") {
      const matchScore = calculateMatchForScaleOption(
        voterAnswer.option! as ScaleOptionValueType,
        candidateAnswer!.option! as ScaleOptionValueType
      );

      score += matchScore;
    }

    const weightingRelevancy = calculateWeightingRelevancy(
      voterAnswer.weighting! as WeightingValueType,
      candidateAnswer!.weighting! as WeightingValueType
    );

    score += weightingRelevancy;
  });
  return score;
};
