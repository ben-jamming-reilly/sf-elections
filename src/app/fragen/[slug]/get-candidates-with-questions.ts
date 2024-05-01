import { cache } from "react";
import { prisma } from "~/lib/prisma";

export type CandidatesWithQuestions = Awaited<
  ReturnType<typeof getCandidatesWithQuestions>
>;

export const getCandidatesWithQuestions = cache(async () => {
  return await prisma.candidate.findMany({
    where: {
      hasFinished: true,
    },
    include: {
      answers: {
        include: {
          question: true,
        },
      },
    },
  });
});
