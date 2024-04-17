import { cache } from "react";
import { prisma } from "~/lib/prisma";

export const getCandidatesFromSlugs = cache(
  async (candidateSlugs: string[]) => {
    return await prisma.candidate.findMany({
      where: {
        slug: {
          in: candidateSlugs,
        },
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
  },
);
