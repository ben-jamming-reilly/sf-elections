import { unstable_cache } from "next/cache";
import { prisma } from "~/lib/prisma";

export const getCandidatesRaw = async () => {
  return await prisma.candidate.findMany({
    where: {
      hasFinished: true,
    },
  });
};

export const getCandidates = unstable_cache(getCandidatesRaw, ['candidates'], {
  revalidate: 18000,
});
