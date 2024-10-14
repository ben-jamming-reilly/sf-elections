import { unstable_cache } from "next/cache";
import { prisma } from "~/lib/prisma";

export const getCandidatesRaw = async ({
  electionSlug,
}: {
  electionSlug: string;
}) => {
  return await prisma.candidate.findMany({
    where: {
      hasFinished: true,
      election: {
        slug: electionSlug,
      },
    },
  });
};

export const getCandidates = unstable_cache(getCandidatesRaw, undefined, {
  revalidate: 60,
});
