import {
  ScaleOptionValueType,
  WahlrechtValueType,
  WeightingValueType,
  categoryHexForLabel,
  getScaleOptionTendency,
  getWahlrechtOptionTendency,
  getWeightingTendency,
  weightingLabelForValue,
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
    (voterWeighting === 0 && candidateWeighting === 3) ||
    (voterWeighting === 3 && candidateWeighting === 0)
  )
    return 0;

  if (
    getWeightingTendency(voterWeighting) ===
    getWeightingTendency(candidateWeighting)
  ) {
    return 0.075;
  } else {
    return 0.025;
  }
};

const calculateMatchForScaleOption = (
  voterAnswer: ScaleOptionValueType,
  candidateAnswer: ScaleOptionValueType
) => {
  if (voterAnswer === candidateAnswer) return 1;
  if (
    (voterAnswer === -2 && candidateAnswer === 2) ||
    (voterAnswer === 2 && candidateAnswer === -2)
  )
    return 0;

  if (
    getScaleOptionTendency(voterAnswer) ===
    getScaleOptionTendency(candidateAnswer)
  ) {
    return 0.7;
  } else {
    return 0.2;
  }
};

const calculateMatchForWahlrechtOption = (
  voterAnswer: WahlrechtValueType,
  candidateAnswer: WahlrechtValueType
) => {
  if (voterAnswer === candidateAnswer) return 1;
  if (
    (voterAnswer === -10 && [-9, -8, -7].includes(candidateAnswer)) ||
    ([-9, -8, -7].includes(voterAnswer) && candidateAnswer === -10)
  )
    return 0;

  if (
    getWahlrechtOptionTendency(voterAnswer) ===
    getWahlrechtOptionTendency(candidateAnswer)
  ) {
    return 0.7;
  } else {
    return 0.2;
  }
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

    if (voterAnswer.skipped) return;

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

    if (voterAnswer.question.type === "Wahlrecht") {
      const matchScore = calculateMatchForWahlrechtOption(
        voterAnswer.option! as WahlrechtValueType,
        candidateAnswer!.option! as WahlrechtValueType
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
