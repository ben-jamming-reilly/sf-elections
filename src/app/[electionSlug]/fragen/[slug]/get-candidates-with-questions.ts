import { unstable_cache } from "next/cache";
import { prisma } from "~/lib/prisma";

export type CandidatesWithQuestions = Awaited<
  ReturnType<typeof getCandidatesWithQuestions>
>;

export const getCandidatesWithQuestions = unstable_cache(
  async ({ electionSlug }: { electionSlug: string }) => {
    return await prisma.candidate.findMany({
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
  },
  undefined,
  {
    revalidate: 18000,
  },
);
