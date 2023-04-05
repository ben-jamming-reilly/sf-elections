import { cache } from "react";
import { prisma } from "~/lib/prisma";

export const getCandidateFromSlug = cache(async (slug: string) => {
  const candidate = await prisma.candidate.findUnique({
    where: {
      slug,
    },
    include: {
      answers: {
        include: {
          question: true,
        },
      },
    },
  });

  if (!candidate) {
    return null;
  }

  return candidate;
});
