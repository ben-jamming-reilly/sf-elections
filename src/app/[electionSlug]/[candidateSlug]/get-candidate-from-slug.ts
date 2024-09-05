import { cache } from "react";
import { prisma } from "~/lib/prisma";

export const getCandidateFromSlug = cache(
  async ({
    candidateSlug: slug,
    electionSlug,
  }: {
    candidateSlug: string;
    electionSlug: string;
  }) => {
    const election = await prisma.election.findUnique({
      where: {
        slug: electionSlug,
      },
      select: {
        id: true,
      },
    });

    if (!election) {
      return null;
    }

    const candidate = await prisma.candidate.findUnique({
      where: {
        electionId_slug: {
          electionId: election.id,
          slug,
        },
      },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
        election: true,
      },
    });

    if (!candidate) {
      return null;
    }

    return candidate;
  },
);
