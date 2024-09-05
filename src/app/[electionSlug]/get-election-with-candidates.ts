import { unstable_cache } from "next/cache";
import { prisma } from "~/lib/prisma";

export const getElectionWithCandidatesRaw = async ({
  electionSlug,
}: {
  electionSlug: string;
}) => {
  const election = await prisma.election.findUnique({
    where: {
      slug: electionSlug,
    },
    include: {
      candidates: true,
      questions: true,
    },
  });

  return election;
};

export const getElectionWithCandidates = unstable_cache(
  getElectionWithCandidatesRaw,
  undefined,
  {
    revalidate: 18000,
  },
);
