import { cache } from "react";
import { prisma } from "~/lib/prisma";

export const getCandidateWithQuestions = cache(async (slug: string) => {
  return await prisma.candidate.findUnique({
    where: {
      slug: slug,
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
