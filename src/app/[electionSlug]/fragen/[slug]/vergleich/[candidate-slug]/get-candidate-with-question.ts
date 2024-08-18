import { cache } from "react";
import { prisma } from "~/lib/prisma";

export const getCandidateWithQuestions = cache(
  async ({ slug, electionSlug }: { slug: string; electionSlug: string }) => {
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

    return await prisma.candidate.findUnique({
      where: {
        electionId_slug: {
          electionId: election.id,
          slug: slug,
        },
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
