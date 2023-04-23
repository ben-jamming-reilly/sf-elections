import { cache } from "react";
import { prisma } from "~/lib/prisma";

export const getCandidatesRaw = async () => {
  return await prisma.candidate.findMany({
    where: {
      hasFinished: true,
    },
  });
};

export const getCandidates = cache(getCandidatesRaw);
