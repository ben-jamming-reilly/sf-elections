import { cache } from "react";
import { prisma } from "~/lib/prisma";

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
