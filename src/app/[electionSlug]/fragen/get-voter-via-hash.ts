import { cache } from "react";
import { prisma } from "~/lib/prisma";

export const getVoterViaHash = cache(async (hash: string) => {
  return prisma.voter.findUnique({
    where: {
      hash,
    },
    include: {
      answers: {
        include: {
          question: true,
        },
      },
      candidateMatches: {
        include: {
          candidate: true,
        },
      },
    },
  });
});
