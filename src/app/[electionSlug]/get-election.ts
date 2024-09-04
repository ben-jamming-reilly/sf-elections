import { unstable_cache } from "next/cache";
import { prisma } from "~/lib/prisma";

export const getElectionRaw = async ({
  electionSlug,
}: {
  electionSlug: string;
}) => {
  const election = await prisma.election.findUnique({
    where: {
      slug: electionSlug,
    },
  });

  return election;
};

export const getElection = unstable_cache(getElectionRaw, undefined, {
  revalidate: 18000,
});