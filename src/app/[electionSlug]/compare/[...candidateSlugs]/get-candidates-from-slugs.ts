import { cache } from "react";
import { prisma } from "~/lib/prisma";

export const getCandidatesFromSlugs = cache(
  async ({
    candidateSlugs,
    electionSlug,
  }: {
    candidateSlugs: string[];
    electionSlug: string;
  }) => {
    return await prisma.candidate.findMany({
      where: {
        slug: {
          in: candidateSlugs,
        },
        election: {
          slug: electionSlug,
        },
        hasFinished: true,
      },
      include: {
        election: true,
        answers: {
          include: {
            question: true,
          },
        },
      },
    });
  },
);
