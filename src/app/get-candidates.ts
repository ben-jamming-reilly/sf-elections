import { cache } from "react";
import { prisma } from "~/lib/prisma";

export const getCandidates = cache(async () => {
  return await prisma.candidate.findMany({
    where: {
      hasFinished: true,
    },
  });
});
