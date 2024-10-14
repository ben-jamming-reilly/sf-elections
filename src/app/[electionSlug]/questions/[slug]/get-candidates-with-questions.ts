import { unstable_cache } from "next/cache";
import { prisma } from "~/lib/prisma";

export type CandidatesWithQuestions = Awaited<
  ReturnType<typeof getCandidatesWithQuestions>
>;

export const getCandidatesWithQuestions = unstable_cache(
  async ({ electionSlug }: { electionSlug: string }) => {
    const candidates = await prisma.candidate.findMany({
      where: {
        hasFinished: true,
        election: {
          slug: electionSlug,
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

    return candidates;
  },
  undefined,
  {
    revalidate: 5,
  },
);
